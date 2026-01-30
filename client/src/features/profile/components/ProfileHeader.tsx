import React from 'react';
import { User, Edit2 } from 'lucide-react';
import './ProfileHeader.css';

interface ProfileHeaderProps {
    name: string;
    avatarUrl?: string;
    goal: string;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ name, goal }) => {
    return (
        <div className="profile-header">
            <div className="avatar-large">
                <User size={40} />
            </div>
            <div className="header-info">
                <h1>{name}</h1>
                <span className="goal-badge">{goal} GOAL ACTIVE</span>
            </div>
            <button className="edit-profile-btn">
                <Edit2 size={16} />
                <span>Edit</span>
            </button>
        </div>
    );
};
