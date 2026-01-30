import { useState } from 'react';
import { DayColumn } from '../components/DayColumn';
import { usePlanner } from '../context/PlannerContext';
import { Button } from '../../../components/Button/Button';
import './MealPlannerPage.css';
import { ConfirmationModal } from '../../../components/Feedback/ConfirmationModal';

// Reuse RecipeSelector logic eventually, for now just a placeholder alert or simple list
// We will need a simple modal to select a recipe.
// Let's create a minimal inline modal for MVP.
import { api } from '../../../services/api';
import type { Recipe } from '../../../components/DataDisplay/RecipeCard';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const MealPlannerPage = () => {
    const { refreshPlan } = usePlanner(); // Destructure refreshPlan
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [showSelector, setShowSelector] = useState(false);

    const [showClearConfirm, setShowClearConfirm] = useState(false);
    const [showRandomConfirm, setShowRandomConfirm] = useState(false);

    // Fetch recipes for selector when opening
    const openSelector = async (slotId: string) => {
        setSelectedSlot(slotId);
        setShowSelector(true);
        try {
            const data = await api.getRecipes();
            setRecipes(data);
        } catch (e) {
            console.error(e);
        }
    };

    const handleClearPlan = async () => {
        await api.clearMealPlan();
        await refreshPlan(); // Use context refresh instead of reload
        setShowClearConfirm(false); // Close modal
    };

    const handleRandomizePlan = async () => {
        await api.randomizePlan();
        await refreshPlan(); // Use context refresh instead of reload
        setShowRandomConfirm(false); // Close modal
    };

    return (
        <div className="planner-page">
            <header className="planner-header">
                <div className="planner-header-content">
                    <div>
                        <h1>Weekly Meal Plan</h1>
                        <p>Drag and drop or click to add meals to your schedule.</p>
                    </div>
                    <div className="planner-actions">
                        <Button variant="secondary" onClick={() => setShowRandomConfirm(true)}>Pick Randomly</Button>
                        <Button variant="outline" onClick={() => setShowClearConfirm(true)}>Clear Plan</Button>
                    </div>
                </div>
            </header>

            <div className="planner-grid">
                {DAYS.map(day => (
                    <DayColumn
                        key={day}
                        day={day}
                        onAddMeal={(slotId) => openSelector(slotId)}
                    />
                ))}
            </div>

            {showSelector && (
                <RecipeSelectorModal
                    recipes={recipes}
                    onClose={() => setShowSelector(false)}
                    onSelect={() => {
                        setShowSelector(false);
                    }}
                    targetSlot={selectedSlot}
                />
            )}

            <ConfirmationModal
                isOpen={showClearConfirm}
                title="Clear Meal Plan"
                message="Are you sure you want to clear the entire plan? This action cannot be undone."
                confirmText="Yes, clear plan"
                theme="danger"
                onConfirm={handleClearPlan}
                onCancel={() => setShowClearConfirm(false)}
            />

            <ConfirmationModal
                isOpen={showRandomConfirm}
                title="Randomize Meal Plan"
                message="This will replace your current weekly plan with random meals. Are you sure?"
                confirmText="Yes, randomize plan"
                onConfirm={handleRandomizePlan}
                onCancel={() => setShowRandomConfirm(false)}
            />
        </div>
    );
};

// Sub-component for selector (MVP)
const RecipeSelectorModal = ({ recipes, onClose, onSelect, targetSlot }: any) => {
    const { addToSlot } = usePlanner();

    const handleSelect = async (recipeId: string) => {
        if (targetSlot) {
            await addToSlot(targetSlot, recipeId);
        }
        onSelect(recipeId);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h3>Select a Recipe</h3>
                <div className="selector-list">
                    {recipes.map((r: Recipe) => (
                        <div key={r.id} className="selector-item" onClick={() => handleSelect(r.id)}>
                            <img src={r.imageUrl} alt={r.title} />
                            <span>{r.title}</span>
                        </div>
                    ))}
                </div>
                <Button onClick={onClose} variant="secondary">Cancel</Button>
            </div>
        </div>
    );
};
