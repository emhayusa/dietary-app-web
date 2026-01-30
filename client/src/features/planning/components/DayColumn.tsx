import React from 'react';
import { MealSlot } from './MealSlot';

interface DayColumnProps {
    day: string;
    onAddMeal: (slotId: string) => void;
}

const MEAL_TYPES = ['Main']; // Single slot/day

export const DayColumn: React.FC<DayColumnProps> = ({ day, onAddMeal }) => {
    return (
        <div className="day-column">
            <h3 className="day-header">{day}</h3>
            <div className="day-slots">
                {MEAL_TYPES.map(type => (
                    <MealSlot
                        key={type}
                        day={day}
                        type={type} // "Main"
                        onAddClick={() => onAddMeal(`${day}-${type}`.toLowerCase())}
                    />
                ))}
            </div>
        </div>
    );
};
