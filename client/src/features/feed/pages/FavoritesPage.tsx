import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../../context/ToastContext';
import { type Recipe, RecipeCard } from '../../../components/DataDisplay/RecipeCard';
import { api } from '../../../services/api';
import './Feed.css'; // Re-use Feed styles

export const FavoritesPage = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const data = await api.getFavorites();
                setRecipes(data);
            } catch (err) {
                console.error("Failed to fetch favorites", err);
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, []);

    const { showToast } = useToast();

    const toggleFavorite = async (id: string) => {
        try {
            // Optimistic update
            // For favorites page, toggling always means removing
            const updatedRecipes = recipes.filter(r => r.id !== id);
            setRecipes(updatedRecipes);

            showToast('Removed from favorites', 'info');

            // API call
            await api.toggleFavorite(id);
        } catch (error) {
            console.error("Failed to untoggle", error);
            showToast('Failed to remove favorite', 'error');
            // Revert (reload favorites)
            const data = await api.getFavorites();
            setRecipes(data);
        }
    };

    if (loading) {
        return <div style={{ padding: '40px', textAlign: 'center' }}>Loading favorites...</div>;
    }

    if (recipes.length === 0) {
        return (
            <div className="feed-page" style={{ textAlign: 'center', marginTop: '40px' }}>
                <h2>No favorites yet</h2>
                <p>Heart some recipes to save them here!</p>
            </div>
        );
    }

    return (
        <div className="feed-page">
            <header className="feed-header">
                <h1>Your Favorites</h1>
                <p>Recipes you've saved for later.</p>
            </header>

            <div className="recipe-grid">
                {recipes.map(recipe => (
                    <RecipeCard
                        key={recipe.id}
                        recipe={recipe}
                        onToggleFavorite={toggleFavorite}
                        onView={(id) => navigate(`/recipe/${id}`)}
                    />
                ))}
            </div>
        </div>
    );
};
