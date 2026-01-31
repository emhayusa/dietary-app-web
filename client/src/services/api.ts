const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const api = {
    saveProfile: async (data: any) => {
        const response = await fetch(`${API_BASE_URL}/user/profile`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            let errorMessage = 'Failed to save profile';
            try {
                const errorData = await response.json();
                errorMessage = errorData.message || errorMessage;
            } catch (e) { /* ignore json parse error */ }
            throw new Error(errorMessage);
        }

        return response.json();
    },

    getProfile: async () => {
        const response = await fetch(`${API_BASE_URL}/user/profile`);
        if (!response.ok) return null;
        return response.json();
    },

    getRecipes: async (query?: string, type?: string) => {
        const params = new URLSearchParams();
        if (query) params.append('q', query);
        if (type) params.append('type', type);

        const response = await fetch(`${API_BASE_URL}/recipes/feed?${params.toString()}`);
        if (!response.ok) throw new Error('Failed to fetch recipes');
        return response.json();
    },

    getRecipeById: async (id: string) => {
        const response = await fetch(`${API_BASE_URL}/recipes/${id}`);
        if (!response.ok) throw new Error('Failed to fetch recipe');
        return response.json();
    },

    toggleFavorite: async (recipeId: string) => {
        const response = await fetch(`${API_BASE_URL}/user/favorites`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ recipeId })
        });
        if (!response.ok) throw new Error('Failed to toggle favorite');
        return response.json();
    },

    getFavorites: async () => {
        const response = await fetch(`${API_BASE_URL}/user/favorites`);
        if (!response.ok) throw new Error('Failed to fetch favorites');
        return response.json();
    },

    getMealPlan: async () => {
        const response = await fetch(`${API_BASE_URL}/user/meal-plan`);
        if (!response.ok) throw new Error('Failed to fetch meal plan');
        return response.json();
    },

    updateMealPlan: async (slotId: string, recipeId: string | null, action: 'add' | 'remove') => {
        const response = await fetch(`${API_BASE_URL}/user/meal-plan`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ slotId, recipeId, action })
        });
        if (!response.ok) throw new Error('Failed to update meal plan');
        return response.json();
    },

    clearMealPlan: async () => {
        const response = await fetch(`${API_BASE_URL}/user/meal-plan`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to clear meal plan');
        return response.json();
    },

    randomizePlan: async () => {
        const response = await fetch(`${API_BASE_URL}/user/meal-plan/random`, {
            method: 'POST',
        });
        if (!response.ok) {
            const text = await response.text();
            console.error('Randomize Plan Error:', text);
            throw new Error(`Failed to randomize meal plan: ${text}`);
        }
        return response.json();
    },

    getGroceryList: async () => {
        const response = await fetch(`${API_BASE_URL}/user/grocery-list`);
        if (!response.ok) throw new Error('Failed to fetch grocery list');
        return response.json();
    }
};
