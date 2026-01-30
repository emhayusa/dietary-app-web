import React from 'react';
import './Badge.css';

export interface BadgeProps {
    label: string;
    variant?: 'primary' | 'secondary' | 'accent' | 'neutral' | 'outline';
    icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ label, variant = 'primary', icon }) => {
    return (
        <span className={`badge badge-${variant}`}>
            {icon && <span className="badge-icon">{icon}</span>}
            {label}
        </span>
    );
};
