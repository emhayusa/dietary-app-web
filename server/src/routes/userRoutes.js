const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/profile', userController.saveProfile);
router.get('/profile', userController.getProfile);
router.post('/favorites', userController.toggleFavorite);
router.get('/favorites', userController.getFavorites);
router.get('/meal-plan', userController.getMealPlan);
router.post('/meal-plan', userController.updateMealPlan);
router.delete('/meal-plan', userController.clearMealPlan);
router.post('/meal-plan/random', userController.randomizeMealPlan);
router.get('/grocery-list', userController.getGroceryList);

module.exports = router;
