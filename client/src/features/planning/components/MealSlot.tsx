import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, X } from 'lucide-react';
import { usePlanner } from '../context/PlannerContext';
import { ConfirmationModal } from '../../../components/Feedback/ConfirmationModal';

interface MealSlotProps {
    day: string;
    type: string;
    label?: string;
    onAddClick: () => void;
}

export const MealSlot: React.FC<MealSlotProps> = ({ day, type, label, onAddClick }) => {
    const navigate = useNavigate();
    const { mealPlan, removeFromSlot } = usePlanner();
    const [showConfirm, setShowConfirm] = React.useState(false);

    const slotId = `${day}-${type}`.toLowerCase();
    const recipe = mealPlan[slotId];

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowConfirm(true);
    };

    const handleConfirmDelete = async () => {
        await removeFromSlot(slotId);
        setShowConfirm(false);
    };

    return (
        <>
            <div className={`meal-slot ${recipe ? 'filled' : 'empty'}`}>
                {label && <div className="slot-label">{label}</div>}

                {recipe ? (
                    <div
                        className="slot-card"
                        style={{ backgroundImage: `url(${recipe.imageUrl})`, cursor: 'pointer' }}
                        onClick={() => navigate(`/recipe/${recipe.id}`)}
                    >
                        <div className="slot-overlay">
                            <span className="slot-title">{recipe.title}</span>
                            <div className="slot-actions">
                                <span className="cal-badge">{recipe.calories} kcal</span>
                                <button className="remove-btn" onClick={handleDeleteClick}>
                                    <X size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <button className="add-meal-btn" onClick={onAddClick}>
                        <Plus size={16} />
                    </button>
                )}
            </div>

            <ConfirmationModal
                isOpen={showConfirm}
                title="Remove Meal?"
                message="Are you sure you want to remove this meal from your plan?"
                onConfirm={handleConfirmDelete}
                onCancel={() => setShowConfirm(false)}
                confirmText="Remove"
                cancelText="Keep it"
                theme="success"
            />
        </>
    );
};
