const { currentUser, recipes } = require('../data/store');

const saveProfile = (req, res) => {
    try {
        const profileData = req.body;

        if (!profileData || typeof profileData !== 'object') {
            return res.status(400).json({ message: 'Invalid profile data' });
        }

        // Basic validation
        if (!profileData.dietaryGoal) {
            return res.status(400).json({ message: 'Dietary goal is required' });
        }

        currentUser.profile = profileData;

        console.log('Saved user profile:', profileData);

        res.status(200).json({
            message: 'Profile saved successfully',
            profile: currentUser.profile
        });
    } catch (error) {
        console.error('Error saving profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getProfile = (req, res) => {
    if (!currentUser.profile) {
        return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(currentUser.profile);
};

const toggleFavorite = (req, res) => {
    const { recipeId } = req.body;
    if (!recipeId) return res.status(400).json({ message: 'Recipe ID required' });

    const index = currentUser.favorites.indexOf(recipeId);
    let isFavorite = false;

    if (index === -1) {
        currentUser.favorites.push(recipeId);
        isFavorite = true;
    } else {
        currentUser.favorites.splice(index, 1);
        isFavorite = false;
    }

    res.json({ message: 'Success', isFavorite, favorites: currentUser.favorites });
};

const getFavorites = (req, res) => {
    // Filter full recipe objects
    const favoriteRecipes = recipes.filter(r => currentUser.favorites.includes(r.id));

    const feed = favoriteRecipes.map(recipe => ({
        ...recipe,
        isFavorite: true
    }));

    res.json(feed);
};

const getMealPlan = (req, res) => {
    // Populate recipe details
    const plan = {};
    const planData = currentUser.mealPlan || {};

    Object.keys(planData).forEach(key => {
        const recipeId = planData[key];
        const recipe = recipes.find(r => r.id === recipeId);
        if (recipe) {
            plan[key] = recipe;
        }
    });

    res.json(plan);
};

const updateMealPlan = (req, res) => {
    const { slotId, recipeId, action } = req.body;
    // action: 'add' | 'remove'

    if (!slotId) return res.status(400).json({ message: 'Slot ID required' });

    if (action === 'remove') {
        if (currentUser.mealPlan && currentUser.mealPlan[slotId]) {
            delete currentUser.mealPlan[slotId];
        }
    } else {
        if (!recipeId) return res.status(400).json({ message: 'Recipe ID required for add' });
        currentUser.mealPlan[slotId] = recipeId;
    }

    // Return updated full plan
    getMealPlan(req, res);
};

const clearMealPlan = (req, res) => {
    currentUser.mealPlan = {};
    res.json({});
};

const randomizeMealPlan = (req, res) => {
    // Determine days and meal types
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const types = ['Main'];
    const newPlan = {};

    // Get all available recipe IDs
    const recipeIds = recipes.map(r => r.id);
    if (recipeIds.length === 0) {
        return res.status(400).json({ message: 'No recipes available to randomize' });
    }

    days.forEach(day => {
        types.forEach(type => {
            const slotId = `${day}-${type}`.toLowerCase();
            // Simple random selection
            const randomId = recipeIds[Math.floor(Math.random() * recipeIds.length)];
            newPlan[slotId] = randomId;
        });
    });

    currentUser.mealPlan = newPlan;

    // Return the new plan directly so frontend can update immediately
    getMealPlan(req, res);
};

const getGroceryList = (req, res) => {
    try {
        const mealPlan = currentUser.mealPlan || {};
        const ingredients = [];

        // Return all items separately with source metadata
        // Frontend will handle grouping/deduplication
        Object.keys(mealPlan).forEach(slotId => {
            const recipeId = mealPlan[slotId];
            const recipe = recipes.find(r => r.id === recipeId);

            if (recipe && recipe.ingredients) {
                recipe.ingredients.forEach(item => {
                    // Item is now an object { name, amount, unit }
                    ingredients.push({
                        // Mapping back to what frontend expects
                        // We will send the full structured object as 'original' for now to match interface,
                        // or we should update frontend interface.
                        // Let's make 'original' the structured object to allow aggregation.
                        original: item,
                        checked: false,
                        sourceRecipe: {
                            id: recipe.id,
                            title: recipe.title,
                            slotId: slotId
                        }
                    });
                });
            }
        });

        res.json(ingredients);
    } catch (error) {
        console.error("Error generating grocery list:", error);
        res.status(500).json({ message: "Failed to generate grocery list" });
    }
};

module.exports = {
    saveProfile,
    getProfile,
    toggleFavorite,
    getFavorites,
    getMealPlan,
    updateMealPlan,
    clearMealPlan,
    randomizeMealPlan,
    getGroceryList
};