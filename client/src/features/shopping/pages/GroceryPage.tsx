import { useEffect, useState, useMemo } from 'react';
import { api } from '../../../services/api';
import './GroceryPage.css';
import { GroceryItem } from '../components/GroceryItem';
import { ShoppingBag, Printer, CheckSquare, Square, Layers, List as ListIcon } from 'lucide-react';
import { Button } from '../../../components/Button/Button';

interface SourceRecipe {
    id: string;
    title: string;
    slotId: string;
}

interface IngredientData {
    name: string;
    amount: number;
    unit: string;
}

interface Ingredient {
    original: IngredientData; // Now an object
    checked: boolean;
    sourceRecipe?: SourceRecipe;
}

export const GroceryPage = () => {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<'total' | 'recipe'>('total');

    useEffect(() => {
        const fetchList = async () => {
            try {
                const data = await api.getGroceryList();
                const savedState = JSON.parse(localStorage.getItem('groceryState') || '{}');

                // Apply saved checked state by name (global check)
                const mergedData = data.map((item: Ingredient) => ({
                    ...item,
                    checked: savedState[item.original.name] || false // Persist by name
                }));

                setIngredients(mergedData);
            } catch (err) {
                setError('Failed to load grocery list');
            } finally {
                setLoading(false);
            }
        };

        fetchList();
    }, []);

    // Persist state helper
    const saveState = (newIngredients: Ingredient[]) => {
        const stateToSave = newIngredients.reduce((acc, item) => ({
            ...acc,
            [item.original.name]: item.checked
        }), {});
        localStorage.setItem('groceryState', JSON.stringify(stateToSave));
    };

    const toggleByName = (name: string) => {
        const newIngredients = ingredients.map(i =>
            i.original.name === name ? { ...i, checked: !i.checked } : i
        );
        setIngredients(newIngredients);
        saveState(newIngredients);
    };

    const toggleBySlot = (name: string, slotId: string) => {
        const newIngredients = ingredients.map(i =>
            (i.original.name === name && i.sourceRecipe?.slotId === slotId)
                ? { ...i, checked: !i.checked }
                : i
        );
        setIngredients(newIngredients);
        saveState(newIngredients);
    };

    const setAllState = (checked: boolean) => {
        const newIngredients = ingredients.map(i => ({ ...i, checked }));
        setIngredients(newIngredients);
        saveState(newIngredients);
    };

    // Grouping Logic
    const groupedItems = useMemo(() => {
        if (viewMode === 'total') {
            // Group by name AND unit for accurate summing
            const groups: Record<string, { name: string, unit: string, amount: number, checked: boolean }> = {};

            ingredients.forEach(i => {
                const key = `${i.original.name}-${i.original.unit}`;
                if (!groups[key]) {
                    groups[key] = {
                        name: i.original.name,
                        unit: i.original.unit,
                        amount: 0,
                        checked: i.checked
                    };
                }
                groups[key].amount += i.original.amount;
                // If any instance is unchecked, show result as unchecked (for "Total" view logic)
                if (!i.checked) groups[key].checked = false;
            });

            return Object.values(groups).map(data => ({
                display: `${data.amount} ${data.unit} ${data.name}`,
                name: data.name, // used for toggling
                checked: data.checked
            }));
        } else {
            // Group by Recipe
            const groups: Record<string, Ingredient[]> = {};
            ingredients.forEach(i => {
                const key = i.sourceRecipe?.title || 'Other';
                if (!groups[key]) groups[key] = [];
                groups[key].push(i);
            });
            return groups; // returns Record<string, Ingredient[]>
        }
    }, [ingredients, viewMode]);

    if (loading) return <div className="loading-state">Loading list...</div>;
    if (error) return <div className="error-state">{error}</div>;

    const checkedCount = ingredients.filter(i => i.checked).length;
    const progress = ingredients.length > 0 ? (checkedCount / ingredients.length) * 100 : 0;

    return (
        <div className="grocery-page">
            <div className="grocery-header">
                <div>
                    <h1>Grocery List</h1>
                    <p className="subtitle">Generated from your meal plan</p>
                </div>
                <div className="grocery-controls">
                    <div className="view-toggle">
                        <button
                            className={`toggle-btn ${viewMode === 'total' ? 'active' : ''}`}
                            onClick={() => setViewMode('total')}
                            title="All Items"
                        >
                            <Layers size={18} /> All items
                        </button>
                        <button
                            className={`toggle-btn ${viewMode === 'recipe' ? 'active' : ''}`}
                            onClick={() => setViewMode('recipe')}
                            title="By Recipe"
                        >
                            <ListIcon size={18} /> By Recipe
                        </button>
                    </div>
                    <button className="print-btn" onClick={() => window.print()}>
                        <Printer size={20} />
                    </button>
                </div>
            </div>

            {ingredients.length === 0 ? (
                <div className="empty-state">
                    <ShoppingBag size={48} />
                    <h3>Your list is empty</h3>
                    <p>Add meals to your plan to generate a shopping list.</p>
                </div>
            ) : (
                <>
                    <div className="progress-bar-container">
                        <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
                    </div>
                    <p className="progress-text">
                        {checkedCount} / {ingredients.length} items purchased
                    </p>

                    <div className="grocery-content">
                        {viewMode === 'total' ? (
                            <div className="grocery-list">
                                {(groupedItems as any[]).map((item) => (
                                    <GroceryItem
                                        key={item.display}
                                        name={item.display}
                                        checked={item.checked}
                                        onToggle={() => toggleByName(item.name)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="recipe-groups">
                                {Object.entries(groupedItems as Record<string, Ingredient[]>).map(([recipe, items]) => (
                                    <div key={recipe} className="recipe-group">
                                        <h3 className="group-title">{recipe}</h3>
                                        <div className="grocery-list">
                                            {items.map((item, idx) => (
                                                <GroceryItem
                                                    key={`${item.original.name}-${idx}`}
                                                    name={`${item.original.amount} ${item.original.unit} ${item.original.name}`}
                                                    checked={item.checked}
                                                    onToggle={() => toggleBySlot(item.original.name, item.sourceRecipe?.slotId || '')}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="grocery-actions-footer">
                        {checkedCount === ingredients.length ? (
                            <Button
                                variant="outline"
                                onClick={() => setAllState(false)}
                                className="footer-action-btn"
                            >
                                <Square size={18} /> Uncheck All
                            </Button>
                        ) : (
                            <Button
                                variant="primary"
                                onClick={() => setAllState(true)}
                                className="footer-action-btn"
                            >
                                <CheckSquare size={18} /> Check All
                            </Button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};
