import { Check, Circle } from 'lucide-react';
import './GroceryItem.css';

interface GroceryItemProps {
    name: string;
    checked: boolean;
    onToggle: () => void;
}

export const GroceryItem: React.FC<GroceryItemProps> = ({ name, checked, onToggle }) => {
    return (
        <div className={`grocery-item ${checked ? 'checked' : ''}`} onClick={onToggle}>
            <div className={`checkbox ${checked ? 'checked' : ''}`}>
                {checked ? <Check size={14} color="white" /> : <Circle size={14} className="unchecked-icon" />}
            </div>
            <span className="item-name">{name}</span>
        </div>
    );
};
