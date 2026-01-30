import React from 'react';
import './SectionStyles.css';

interface StatsSectionProps {
    weight: string;
    height: string;
    age: string;
    activityLevel: string;
    onChange: (field: string, value: string) => void;
}

export const StatsSection: React.FC<StatsSectionProps> = ({ weight, height, age, activityLevel, onChange }) => {
    return (
        <div className="profile-section">
            <h2 className="section-title">Body Stats</h2>
            <div className="grid-form">
                <div className="form-group">
                    <label>Weight (kg)</label>
                    <input
                        type="number"
                        value={weight}
                        onChange={(e) => onChange('weight', e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Height (cm)</label>
                    <input
                        type="number"
                        value={height}
                        onChange={(e) => onChange('height', e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Age</label>
                    <input
                        type="number"
                        value={age}
                        onChange={(e) => onChange('age', e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Activity Level</label>
                    <select
                        value={activityLevel}
                        onChange={(e) => onChange('activityLevel', e.target.value)}
                    >
                        <option value="sedentary">Sedentary</option>
                        <option value="light">Lightly Active</option>
                        <option value="moderate">Moderately Active</option>
                        <option value="very">Very Active</option>
                    </select>
                </div>
            </div>
        </div>
    );
};
