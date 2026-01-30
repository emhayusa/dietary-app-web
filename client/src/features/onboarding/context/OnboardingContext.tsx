import React, { createContext, useContext, useState, type ReactNode, useMemo, useCallback } from 'react';

export interface OnboardingData {
    dietaryGoal: string;
    dietaryPreferences: string[];
    allergies: string[];
    dailyTargets: {
        calories: number;
        protein: number;
        carbs: number;
        fats: number;
    };
    cookingTime: string;
}

interface OnboardingContextType {
    data: OnboardingData;
    updateData: (updates: Partial<OnboardingData>) => void;
    nextStep: () => void;
    prevStep: () => void;
    currentStep: number;
    totalSteps: number;
}

const defaultData: OnboardingData = {
    dietaryGoal: '',
    dietaryPreferences: [],
    allergies: [],
    dailyTargets: {
        calories: 2000,
        protein: 150,
        carbs: 200,
        fats: 70,
    },
    cookingTime: '',
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [data, setData] = useState<OnboardingData>(defaultData);
    const [currentStep, setCurrentStep] = useState(0);
    const totalSteps = 6;

    const updateData = useCallback((updates: Partial<OnboardingData>) => {
        setData((prev) => ({ ...prev, ...updates }));
    }, []);

    const nextStep = useCallback(() => setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1)), [totalSteps]);
    const prevStep = useCallback(() => setCurrentStep((prev) => Math.max(prev - 1, 0)), []);

    const contextValue = useMemo(() => ({
        data,
        updateData,
        nextStep,
        prevStep,
        currentStep,
        totalSteps
    }), [data, updateData, nextStep, prevStep, currentStep, totalSteps]);

    return (
        <OnboardingContext.Provider value={contextValue}>
            {children}
        </OnboardingContext.Provider>
    );
};

export const useOnboarding = () => {
    const context = useContext(OnboardingContext);
    if (!context) throw new Error('useOnboarding must be used within OnboardingProvider');
    return context;
};
