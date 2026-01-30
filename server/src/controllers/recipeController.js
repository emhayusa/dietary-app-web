const { recipes, currentUser } = require('../data/store');

exports.getFeed = (req, res) => {
    try {
        // Map recipes to include isFavorite status based on current user
        if (!recipes || !currentUser || !currentUser.favorites) {
            return res.status(500).json({ message: 'Data store error' });
        }

        let feed = recipes.map(recipe => ({
            ...recipe,
            isFavorite: currentUser.favorites.includes(recipe.id)
        }));

        // Filter by Search Query
        if (req.query.q) {
            const query = req.query.q.toLowerCase();
            feed = feed.filter(r => r.title.toLowerCase().includes(query));
        }

        // Filter by Meal Type
        if (req.query.type) {
            const type = req.query.type;
            feed = feed.filter(r => r.mealType && r.mealType.includes(type));
        }

        res.json(feed);
    } catch (error) {
        console.error('Error fetching feed:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getRecipeById = (req, res) => {
    try {
        const recipe = recipes.find(r => r.id === req.params.id);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        // inject dynamic favorite status
        const recipeWithFav = {
            ...recipe,
            isFavorite: currentUser.favorites ? currentUser.favorites.includes(recipe.id) : false
        };
        res.json(recipeWithFav);
    } catch (error) {
        console.error('Error fetching recipe:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
