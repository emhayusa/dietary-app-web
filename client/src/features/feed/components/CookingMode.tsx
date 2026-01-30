import { useState } from 'react';
import { X, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '../../../components/Button/Button';
import './CookingMode.css';

interface CookingModeProps {
    title: string;
    instructions: string[];
    onClose: () => void;
}

export const CookingMode = ({ title, instructions, onClose }: CookingModeProps) => {
    const [currentStep, setCurrentStep] = useState(0);

    const isLastStep = currentStep === instructions.length - 1;
    const progress = ((currentStep + 1) / instructions.length) * 100;

    const handleNext = () => {
        if (!isLastStep) setCurrentStep(c => c + 1);
        else onClose(); // Or show a completion screen first
    };

    const handleBack = () => {
        if (currentStep > 0) setCurrentStep(c => c - 1);
    };

    return (
        <div className="cooking-mode-overlay">
            <div className="cooking-header">
                <div className="cooking-progress">
                    <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="header-content">
                    <span className="step-indicator">Step {currentStep + 1} of {instructions.length}</span>
                    <button className="close-btn" onClick={onClose}><X size={24} /></button>
                </div>
            </div>

            <div className="cooking-content">
                <h2 className="recipe-title">{title}</h2>
                <div className="step-card">
                    <div className="step-large-number">{currentStep + 1}</div>
                    <p className="step-text">{instructions[currentStep]}</p>
                </div>
            </div>

            <div className="cooking-footer">
                <Button
                    variant="secondary"
                    onClick={handleBack}
                    disabled={currentStep === 0}
                    className="nav-btn"
                >
                    <ArrowLeft size={20} /> Previous
                </Button>

                <Button
                    variant={isLastStep ? "primary" : "outline"}
                    onClick={handleNext}
                    className="nav-btn next-btn"
                >
                    {isLastStep ? (
                        <>Finish <CheckCircle size={20} /></>
                    ) : (
                        <>Next <ArrowRight size={20} /></>
                    )}
                </Button>
            </div>
        </div>
    );
};
