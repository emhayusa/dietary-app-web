const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001; // 3001 to avoid conflict with Vite 5173 or default 3000

app.use(cors());
app.use(express.json());

app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/recipes', require('./routes/recipeRoutes'));

app.get('/', (req, res) => {
    res.json({ message: 'NutriRecipe API is running', status: 'OK' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
