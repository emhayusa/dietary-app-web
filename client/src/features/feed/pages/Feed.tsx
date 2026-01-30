import { useState, useEffect, useCallback } from 'react';
import { type Recipe, RecipeCard } from '../../../components/DataDisplay/RecipeCard';
import { api } from '../../../services/api';
import { useToast } from '../../../context/ToastContext';
import './Feed.css';

import { useNavigate, useSearchParams } from 'react-router-dom';

const MEAL_TYPES = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

export const Feed = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const searchQuery = searchParams.get('search') || '';
    const activeFilter = searchParams.get('type') || '';

    useEffect(() => {
        const fetchRecipes = async () => {
            setLoading(true);
            try {
                const data = await api.getRecipes(searchQuery, activeFilter);
                setRecipes(data);
            } catch (err) {
                console.error("Failed to fetch recipes", err);
                setError("Failed to load recipes. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, [searchQuery, activeFilter]);

    const handleFilterClick = (type: string) => {
        const newParams = new URLSearchParams(searchParams);
        if (activeFilter === type) {
            newParams.delete('type'); // Toggle off
        } else {
            newParams.set('type', type);
        }
        setSearchParams(newParams);
    };

    const { showToast } = useToast();

    const toggleFavorite = useCallback(async (id: string) => {
        // Find current status to determine action
        // Note: we use functional update for state safety, but need current val for toast.
        // We can check the previous state by finding it in the current 'recipes' closure
        // However, 'recipes' might be stale if dep array is empty.
        // Better to use a functional update that DOES NOT trigger side effects,
        // and determine 'isNowFavorite' logic slightly loosely or by adding recipes to dep array.
        // Adding recipes to dep array is safest for correctness here.

        const recipe = recipes.find(r => r.id === id);
        if (!recipe) return;

        const isNowFavorite = !recipe.isFavorite;

        // Optimistic update
        setRecipes(prev => prev.map(r =>
            r.id === id ? { ...r, isFavorite: isNowFavorite } : r
        ));

        // Toast
        if (isNowFavorite) {
            showToast('Saved to favorites', 'success');
        } else {
            showToast('Removed from favorites', 'info');
        }

        try {
            await api.toggleFavorite(id);
        } catch (error) {
            console.error("Failed to toggle favorite", error);
            showToast('Failed to update favorite', 'error');
            // Revert on error
            setRecipes(prev => prev.map(r =>
                r.id === id ? { ...r, isFavorite: !isNowFavorite } : r
            ));
        }
    }, [recipes, showToast]);

    const handleView = useCallback((id: string) => {
        navigate(`/recipe/${id}`);
    }, [navigate]);

    if (loading && recipes.length === 0) {
        return <div style={{ padding: '40px', textAlign: 'center' }}>Loading your personalized feed...</div>;
    }

    if (error) {
        return <div style={{ padding: '40px', textAlign: 'center', color: 'red' }}>{error}</div>;
    }

    return (
        <div className="feed-page">
            <header className="feed-header">
                <h1>Curated Recipes for You</h1>
                <p>Based on your KETO goal and preferences.</p>
                <div className="filter-bar">
                    <button
                        className={`filter-pill ${!activeFilter ? 'active' : ''}`}
                        onClick={() => {
                            const newParams = new URLSearchParams(searchParams);
                            newParams.delete('type');
                            setSearchParams(newParams);
                        }}
                    >
                        All
                    </button>
                    {MEAL_TYPES.map(type => (
                        <button
                            key={type}
                            className={`filter-pill ${activeFilter === type ? 'active' : ''}`}
                            onClick={() => handleFilterClick(type)}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </header>

            {recipes.length === 0 ? (
                <div className="no-results" style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px' }}>
                    <p>No recipes found matching your criteria.</p>
                </div>
            ) : (
                <div className="recipe-grid">
                    {recipes.map(recipe => (
                        <RecipeCard
                            key={recipe.id}
                            recipe={recipe}
                            onToggleFavorite={toggleFavorite}
                            onView={handleView}
                        />
                    ))}
                </div>
            )}

            <section className="meal-plan-promo">
                <div className="promo-content">
                    <h2>Want a custom meal plan for next week?</h2>
                    <p>Based on your activity and Keto goal, we can generate a complete grocery list.</p>
                </div>
                <button className="promo-btn" onClick={() => navigate('/meal-plan')}>Generate Weekly Plan</button>
            </section>
        </div>
    );
};
