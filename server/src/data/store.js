// Shared in-memory data store for MVP

exports.recipes = [
    {
        id: '1',
        title: 'Avocado Quinoa Bowl',
        description: 'High protein, fiber-rich foundation with creamy avocado dressing and roasted chickpeas.',
        imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800',
        prepTime: 20,
        calories: 420,
        servings: 2,
        tags: ['KETO', 'VEGAN'],
        mealType: ['Lunch', 'Dinner'],
        ingredients: [
            { name: "Cooked Quinoa", amount: 1, unit: "cup" },
            { name: "Ripe Avocado", amount: 1, unit: "pcs" },
            { name: "Roasted Chickpeas", amount: 0.5, unit: "cup" },
            { name: "Fresh Spinach", amount: 1, unit: "cup" },
            { name: "Olive Oil", amount: 2, unit: "tbsp" },
            { name: "Lemon Juice", amount: 1, unit: "pcs" }
        ],
        instructions: [
            "Cook quinoa according to package instructions.",
            "Roast chickpeas in the oven with olive oil and spices at 400°F for 20 mins.",
            "Assemble the bowl with quinoa base, topped with avocado, chickpeas, and spinach.",
            "Drizzle with olive oil and lemon juice before serving."
        ]
    },
    {
        id: '2',
        title: 'Spicy Tofu Stir-fry',
        description: 'A low-carb delight featuring extra-firm tofu and garden fresh seasonal vegetables.',
        imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800',
        prepTime: 25,
        calories: 310,
        servings: 1,
        tags: ['VEGAN', 'KETO'],
        mealType: ['Dinner', 'Lunch'],
        ingredients: [
            { name: "Extra Firm Tofu", amount: 1, unit: "block" },
            { name: "Broccoli Florets", amount: 1, unit: "cup" },
            { name: "Red Bell Pepper", amount: 1, unit: "pcs" },
            { name: "Soy Sauce", amount: 2, unit: "tbsp" },
            { name: "Chili Flakes", amount: 1, unit: "tsp" },
            { name: "Sesame Oil", amount: 1, unit: "tbsp" }
        ],
        instructions: [
            "Press tofu to remove excess water, then cube.",
            "Heat sesame oil in a wok and stir-fry tofu until golden.",
            "Add vegetables and stir-fry for another 5-7 minutes.",
            "Add soy sauce and chili flakes, toss well, and serve hot."
        ]
    },
    {
        id: '3',
        title: 'Lemon Garlic Salmon',
        description: 'Omega-3 rich pan-seared salmon with a zest lemon butter reduction and asparagus.',
        imageUrl: 'https://images.unsplash.com/photo-1614627293113-e7e68163d958?auto=format&fit=crop&q=80&w=800',
        prepTime: 15,
        calories: 540,
        servings: 2,
        tags: ['GF', 'HIGH PROTEIN'],
        mealType: ['Dinner'],
        ingredients: [
            { name: "Salmon Fillets", amount: 2, unit: "pcs" },
            { name: "Asparagus", amount: 1, unit: "bunch" },
            { name: "Butter", amount: 3, unit: "tbsp" },
            { name: "Garlic Cloves", amount: 3, unit: "pcs" },
            { name: "Lemon", amount: 1, unit: "pcs" },
            { name: "Salt & Pepper", amount: 1, unit: "pinch" }
        ],
        instructions: [
            "Season salmon fillets with salt and pepper.",
            "Melt butter in a pan over medium heat and add garlic.",
            "Sear salmon for 4-5 minutes per side until cooked through.",
            "Add asparagus to the pan and cook for 3-4 minutes.",
            "Squeeze lemon juice over the dish and serve."
        ]
    },
    {
        id: '4',
        title: 'Mediterranean Salad',
        description: 'Fresh, vibrant Greek-style salad with Kalamata olives, feta, and extra virgin olive oil.',
        imageUrl: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=800',
        prepTime: 10,
        calories: 280,
        servings: 4,
        tags: ['VEGETARIAN'],
        mealType: ['Lunch', 'Snacks'],
        ingredients: [
            { name: "Cucumber", amount: 2, unit: "cup" },
            { name: "Tomatoes", amount: 2, unit: "cup" },
            { name: "Kalamata Olives", amount: 0.5, unit: "cup" },
            { name: "Feta Cheese", amount: 0.5, unit: "cup" },
            { name: "Red Onion", amount: 0.25, unit: "cup" },
            { name: "Olive Oil", amount: 2, unit: "tbsp" }
        ],
        instructions: [
            "Combine cucumber, tomatoes, olives, and onion in a large bowl.",
            "Toss gently to mix.",
            "Top with crumbled feta cheese.",
            "Drizzle generously with olive oil and season with salt and oregano."
        ]
    },
    {
        id: '5',
        title: 'Zucchini Pesto Pasta',
        description: 'Low-carb noodle alternative made with spiralized zucchini and walnut pesto sauce.',
        imageUrl: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&q=80&w=800',
        prepTime: 12,
        calories: 190,
        servings: 1,
        tags: ['KETO', 'GF'],
        mealType: ['Dinner', 'Lunch'],
        ingredients: [
            { name: "Zucchini", amount: 2, unit: "large" },
            { name: "Basil Pesto", amount: 0.5, unit: "cup" },
            { name: "Walnuts", amount: 0.25, unit: "cup" },
            { name: "Cherry Tomatoes", amount: 0.5, unit: "cup" },
            { name: "Parmesan Cheese", amount: 2, unit: "tbsp" }
        ],
        instructions: [
            "Spiralize zucchini into noodles.",
            "Sauté zucchini noodles in a pan for 2-3 minutes until just tender.",
            "Remove from heat and toss with pesto sauce.",
            "Garnish with walnuts and tomatoes before serving."
        ]
    },
    {
        id: '6',
        title: 'Berry Smoothie Bowl',
        description: 'A nutrient-dense blend of antioxidants topped with toasted hemp hearts and seeds.',
        imageUrl: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&q=80&w=800',
        prepTime: 5,
        calories: 340,
        servings: 1,
        tags: ['VEGAN', 'GF'],
        mealType: ['Breakfast', 'Snacks'],
        ingredients: [
            { name: "Mixed Berries", amount: 1, unit: "cup" },
            { name: "Banana", amount: 1, unit: "pcs" },
            { name: "Almond Milk", amount: 0.5, unit: "cup" },
            { name: "Chia Seeds", amount: 1, unit: "tbsp" },
            { name: "Hemp Hearts", amount: 1, unit: "tbsp" },
            { name: "Granola", amount: 0.25, unit: "cup" }
        ],
        instructions: [
            "Blend berries, banana, and almond milk until smooth and thick.",
            "Pour into a bowl.",
            "Top with chia seeds, hemp hearts, granoloa, and fresh fruit slices.",
            "Serve immediately."
        ]
    }
];

// Single user session store
exports.currentUser = {
    profile: {
        name: "Yusa",
        dietaryGoal: "Keto",
        allergies: ["Peanuts"],
        weight: "70",
        height: "175",
        age: "25",
        activityLevel: "moderate",
        gender: "female",
        cookingTime: "30"
    },
    favorites: ['3'], // Pre-populate with one favorite for demo (Lemon Garlic Salmon)
    mealPlan: {} // format: { "monday-breakfast": "recipeId" }
};
