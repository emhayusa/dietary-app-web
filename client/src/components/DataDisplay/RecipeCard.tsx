import React from 'react';
import { Heart, Clock, User, Flame } from 'lucide-react';
import { Badge } from '../DataDisplay/Badge';
import './RecipeCard.css';

export interface Recipe {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    prepTime: number; // mins
    calories: number;
    servings: number;
    tags: string[];
    isFavorite?: boolean;
}

interface RecipeCardProps {
    recipe: Recipe;
    onView?: (id: string) => void;
    onToggleFavorite?: (id: string) => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onView, onToggleFavorite }) => {
    return (
        <div className="recipe-card">
            <div className="card-image-container">
                <img src={recipe.imageUrl} alt={recipe.title} className="card-image" loading="lazy" />

                {/* Badges Overlay */}
                <div className="card-badges">
                    {recipe.tags.map(tag => (
                        <Badge key={tag} label={tag} variant="primary" /> // Logic for variant color mapping could go here
                    ))}
                    <Badge label={`${recipe.prepTime} MINS`} variant="neutral" icon={<Clock size={10} />} />
                </div>

                {/* Favorite Button */}
                <button
                    className={`card-favorite-btn ${recipe.isFavorite ? 'active' : ''}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite?.(recipe.id);
                    }}
                >
                    <Heart size={18} fill={recipe.isFavorite ? "currentColor" : "none"} />
                </button>
            </div>

            <div className="card-content">
                <h3 className="card-title">{recipe.title}</h3>
                <p className="card-description">{recipe.description}</p>

                <div className="card-meta">
                    <div className="meta-item">
                        <Flame size={14} className="meta-icon" />
                        <span>{recipe.calories} Cal</span>
                    </div>
                    <div className="meta-item">
                        <User size={14} className="meta-icon" />
                        <span>{recipe.servings} Servings</span>
                    </div>
                </div>

                <button className="view-recipe-btn" onClick={() => onView?.(recipe.id)}>
                    View Recipe
                </button>
            </div>
        </div>
    );
};
