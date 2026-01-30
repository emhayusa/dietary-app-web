import React, { type ReactNode } from 'react';
import { useOnboarding } from '../context/OnboardingContext';
import './OnboardingLayout.css';
import { ArrowLeft } from 'lucide-react';

interface Props {
    children: ReactNode;
    title: string;
    subtitle?: string;
    showBack?: boolean;
}

export const OnboardingLayout: React.FC<Props> = ({ children, title, subtitle, showBack = true }) => {
    const { currentStep, totalSteps, prevStep } = useOnboarding();

    // Calculate progress percentage
    // We use currentStep + 1 for visual progress 1/5, but internal is 0-indexed
    const progress = ((currentStep + 1) / totalSteps) * 100;

    return (
        <div className="onboarding-layout">
            <div className="onboarding-header">
                {showBack && currentStep > 0 && (
                    <button onClick={prevStep} className="back-button">
                        <ArrowLeft size={24} />
                    </button>
                )}
                <div className="progress-container">
                    <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                </div>
            </div>

            <div className="onboarding-content">
                <h1 className="onboarding-title">{title}</h1>
                {subtitle && <p className="onboarding-subtitle">{subtitle}</p>}
                {children}
            </div>
        </div>
    );
};
