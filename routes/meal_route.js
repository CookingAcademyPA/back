const express = require('express');
const MealController = require('../controllers/meal_controller');
const authMiddleware = require('../middlewares/auth_middleware');
const adminMiddleware = require('../middlewares/admin_middleware');

const router = express.Router();
const mealController = new MealController();

router.get('/', mealController.getAllMeals);
router.get('/:id', mealController.getMealById);
router.post('/', authMiddleware, adminMiddleware, mealController.createMeal);
router.put('/:id', authMiddleware, adminMiddleware, mealController.updateMeal);
router.delete('/:id', authMiddleware, adminMiddleware, mealController.deleteMeal);

module.exports = router;
