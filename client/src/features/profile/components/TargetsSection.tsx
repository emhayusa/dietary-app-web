import React from 'react';
import './SectionStyles.css';

interface TargetsSectionProps {
    targets: {
        calories: number;
        protein: number;
        carbs: number;
        fats: number;
    };
    onChange: (field: string, value: number) => void;
}

export const TargetsSection: React.FC<TargetsSectionProps> = ({ targets, onChange }) => {
    return (
        <div className="profile-section">
            <h2 className="section-title">Daily Nutrition Targets</h2>
            <div className="grid-form">
                <div className="form-group">
                    <label>Calories (kcal)</label>
                    <input
                        type="number"
                        value={targets?.calories || 0}
                        onChange={(e) => onChange('calories', parseInt(e.target.value) || 0)}
                    />
                </div>
                <div className="form-group">
                    <label>Protein (g)</label>
                    <input
                        type="number"
                        value={targets?.protein || 0}
                        onChange={(e) => onChange('protein', parseInt(e.target.value) || 0)}
                    />
                </div>
                <div className="form-group">
                    <label>Carbs (g)</label>
                    <input
                        type="number"
                        value={targets?.carbs || 0}
                        onChange={(e) => onChange('carbs', parseInt(e.target.value) || 0)}
                    />
                </div>
                <div className="form-group">
                    <label>Fats (g)</label>
                    <input
                        type="number"
                        value={targets?.fats || 0}
                        onChange={(e) => onChange('fats', parseInt(e.target.value) || 0)}
                    />
                </div>
            </div>
        </div>
    );
};
