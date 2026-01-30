import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Flame, User, Heart } from 'lucide-react';
import { api } from '../../../services/api';
import { useToast } from '../../../context/ToastContext';
import { Badge } from '../../../components/DataDisplay/Badge';
import { Button } from '../../../components/Button/Button';
import { CookingMode } from '../components/CookingMode';
import './RecipeDetail.css';

interface RecipeDetail {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    prepTime: number;
    calories: number;
    servings: number;
    tags: string[];
    isFavorite: boolean;
    ingredients: {
        name: string;
        amount: number;
        unit: string;
    }[];
    instructions: string[];
}

export const RecipeDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState<RecipeDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [isCooking, setIsCooking] = useState(false);

    const { showToast } = useToast();

    const toggleFavorite = async () => {
        if (!recipe) return;
        const newStatus = !recipe.isFavorite;

        // Optimistic update
        setRecipe(prev => prev ? { ...prev, isFavorite: newStatus } : null);

        // Toast
        if (newStatus) {
            showToast('Saved to favorites', 'success');
        } else {
            showToast('Removed from favorites', 'info');
        }

        try {
            await api.toggleFavorite(recipe.id);
        } catch (error) {
            console.error("Failed to toggle", error);
            showToast('Failed to update favorite', 'error');
            // Revert
            setRecipe(prev => prev ? { ...prev, isFavorite: !newStatus } : null);
        }
    };

    useEffect(() => {
        const fetchRecipe = async () => {
            if (!id) return;
            try {
                const data = await api.getRecipeById(id);
                setRecipe(data);
            } catch (error) {
                console.error("Failed to load recipe", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);

    const handleFinishCooking = () => {
        setIsCooking(false);
        showToast('Meal completed! Great job!', 'success');
    };

    if (loading) return <div>Loading...</div>;
    if (!recipe) return <div>Recipe not found</div>;

    if (isCooking) {
        return (
            <CookingMode
                title={recipe.title}
                instructions={recipe.instructions || []}
                onClose={handleFinishCooking}
            />
        );
    }

    return (
        <div className="recipe-detail-page">
            <button className="back-btn" onClick={() => navigate(-1)}>
                <ArrowLeft size={20} /> Back
            </button>

            <div className="hero-section">
                <img src={recipe.imageUrl} alt={recipe.title} className="hero-image" loading="lazy" />
                <div className="hero-content">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div className="hero-badges">
                            {recipe.tags.map(tag => (
                                <Badge key={tag} label={tag} variant="secondary" />
                            ))}
                        </div>
                        <button
                            className="card-favorite-btn"
                            style={{ position: 'static', border: '1px solid var(--color-border)' }}
                            onClick={toggleFavorite}
                        >
                            <Heart size={18} fill={recipe.isFavorite ? "#F44336" : "none"} color={recipe.isFavorite ? "#F44336" : "#9E9E9E"} />
                        </button>
                    </div>
                    <h1>{recipe.title}</h1>
                    <p className="hero-desc">{recipe.description}</p>

                    <div className="hero-meta">
                        <div className="meta-pill">
                            <Clock size={16} /> {recipe.prepTime} min
                        </div>
                        <div className="meta-pill">
                            <Flame size={16} /> {recipe.calories} Cal
                        </div>
                        <div className="meta-pill">
                            <User size={16} /> {recipe.servings} Servings
                        </div>
                    </div>
                </div>
            </div>

            <div className="content-grid">
                <div className="ingredients-section">
                    <h2>Ingredients</h2>
                    <ul className="ingredients-list">
                        {recipe.ingredients?.map((item, index) => (
                            <li key={index}>
                                <input type="checkbox" id={`ing-${index}`} />
                                <label htmlFor={`ing-${index}`}>
                                    <strong>{item.amount} {item.unit}</strong> {item.name}
                                </label>
                            </li>
                        )) || <p>Ingredients not available.</p>}
                    </ul>
                </div>

                <div className="instructions-section">
                    <h2>Instructions</h2>
                    <div className="instructions-list">
                        {recipe.instructions?.map((step, index) => (
                            <div key={index} className="instruction-step">
                                <div className="step-number">{index + 1}</div>
                                <p>{step}</p>
                            </div>
                        )) || <p>Instructions not available.</p>}
                    </div>
                </div>
            </div>

            <div className="floating-action">
                <Button onClick={() => setIsCooking(true)}>Start Cooking Mode</Button>
            </div>
        </div>
    );
};
