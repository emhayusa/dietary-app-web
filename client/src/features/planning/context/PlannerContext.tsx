import React, { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { api } from '../../../services/api';
import { useToast } from '../../../context/ToastContext';
import type { Recipe } from '../../../components/DataDisplay/RecipeCard';

// Structure: { "monday-breakfast": Recipe, "monday-lunch": Recipe, ... }
export type MealPlanMap = Record<string, Recipe>;

interface PlannerContextType {
    mealPlan: MealPlanMap;
    loading: boolean;
    refreshPlan: () => Promise<void>;
    addToSlot: (slotId: string, recipeId: string) => Promise<void>;
    removeFromSlot: (slotId: string) => Promise<void>;
}

const PlannerContext = createContext<PlannerContextType | undefined>(undefined);

export const PlannerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [mealPlan, setMealPlan] = useState<MealPlanMap>({});
    const [loading, setLoading] = useState(true);

    const refreshPlan = useCallback(async () => {
        try {
            const data = await api.getMealPlan();
            setMealPlan(data);
        } catch (error) {
            console.error("Failed to fetch meal plan", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        refreshPlan();
    }, [refreshPlan]);

    const { showToast } = useToast();

    const addToSlot = async (slotId: string, recipeId: string) => {
        try {
            const updatedPlan = await api.updateMealPlan(slotId, recipeId, 'add');
            setMealPlan(updatedPlan);
            showToast('Meal added to plan', 'success');
        } catch (error) {
            console.error("Failed to add to slot", error);
            showToast('Failed to add meal', 'error');
        }
    };

    const removeFromSlot = async (slotId: string) => {
        try {
            const updatedPlan = await api.updateMealPlan(slotId, null, 'remove');
            setMealPlan(updatedPlan);
            showToast('Meal removed from plan', 'info');
        } catch (error) {
            console.error("Failed to remove from slot", error);
            showToast('Failed to remove meal', 'error');
        }
    };

    return (
        <PlannerContext.Provider value={{ mealPlan, loading, refreshPlan, addToSlot, removeFromSlot }}>
            {children}
        </PlannerContext.Provider>
    );
};

export const usePlanner = () => {
    const context = useContext(PlannerContext);
    if (!context) throw new Error('usePlanner must be used within PlannerProvider');
    return context;
};
