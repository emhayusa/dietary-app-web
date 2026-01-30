import React from 'react';

interface SelectableCardProps {
    label: string;
    selected: boolean;
    onClick: () => void;
}

export const SelectableCard: React.FC<SelectableCardProps> = ({ label, selected, onClick }) => {
    return (
        <button
            onClick={onClick}
            style={{
                padding: '16px',
                border: `2px solid ${selected ? 'var(--color-primary)' : 'var(--color-border)'}`,
                borderRadius: 'var(--border-radius-md)',
                backgroundColor: selected ? '#E8F5E9' : 'white',
                color: selected ? 'var(--color-primary)' : 'var(--color-text-primary)',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 500,
                textAlign: 'center',
                transition: 'all 0.2s',
            }}
        >
            {label}
        </button>
    );
};
