import React from 'react';
import './SectionStyles.css';

interface PreferencesSectionProps {
    dietaryGoal: string;
    dietaryPreferences: string[];
    cookingTime: string;
    allergies: string[];
    onGoalChange: (goal: string) => void;
    onPreferenceToggle: (pref: string) => void;
    onTimeChange: (time: string) => void;
    onAllergyToggle: (allergy: string) => void;
}

const GOALS = [
    { id: 'weight_loss', label: 'Weight Loss', icon: '⚖️' },
    { id: 'muscle_gain', label: 'Muscle Gain', icon: '💪' },
    { id: 'maintenance', label: 'Maintenance', icon: '🧘' },
    { id: 'healthy_eating', label: 'Eat Better', icon: '🥗' },
];

const COOKING_TIMES = [
    { id: '15', label: 'Under 15 mins' },
    { id: '30', label: '15-30 mins' },
    { id: '45', label: '30-45 mins' },
    { id: '60', label: '45+ mins' },
];

const COMMON_ALLERGIES = ['Peanuts', 'Dairy', 'Gluten', 'Soy', 'Eggs', 'Shellfish'];
const DIET_TYPES = ['Keto', 'Vegan', 'Vegetarian', 'Paleo', 'Gluten-Free', 'Dairy-Free', 'Low Carb', 'Mediterranean'];

export const PreferencesSection: React.FC<PreferencesSectionProps> = ({
    dietaryGoal,
    dietaryPreferences,
    cookingTime,
    allergies,
    onGoalChange,
    onPreferenceToggle,
    onTimeChange,
    onAllergyToggle
}) => {
    return (
        <div className="profile-section">
            <h2 className="section-title">Preferences & Habits</h2>

            <div className="form-group">
                <label>Primary Goal</label>
                <div className="chip-grid">
                    {GOALS.map(goal => (
                        <button
                            key={goal.id}
                            className={`chip ${dietaryGoal === goal.id ? 'active' : ''}`}
                            onClick={() => onGoalChange(goal.id)}
                            title={goal.label}
                        >
                            <span style={{ marginRight: '8px' }}>{goal.icon}</span>
                            {goal.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="form-group">
                <label>Dietary Preferences</label>
                <div className="chip-grid">
                    {DIET_TYPES.map(type => (
                        <button
                            key={type}
                            className={`chip ${dietaryPreferences.includes(type) ? 'active' : ''}`}
                            onClick={() => onPreferenceToggle(type)}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            <div className="form-group">
                <label>Typical Cooking Time</label>
                <select
                    value={cookingTime}
                    onChange={(e) => onTimeChange(e.target.value)}
                    style={{ width: '100%' }}
                >
                    <option value="">Select time...</option>
                    {COOKING_TIMES.map(option => (
                        <option key={option.id} value={option.id}>{option.label}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>Allergies & Intolerances</label>
                <div className="chip-grid">
                    {COMMON_ALLERGIES.map(allergy => (
                        <button
                            key={allergy}
                            className={`chip ${allergies.includes(allergy) ? 'active' : ''}`}
                            onClick={() => onAllergyToggle(allergy)}
                        >
                            {allergy}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
