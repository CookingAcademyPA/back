const express = require('express');
const RecipeController = require('../controllers/recipe_controller');
const authMiddleware = require('../middlewares/auth_middleware');
const adminMiddleware = require('../middlewares/admin_middleware');

const router = express.Router();
const recipeController = new RecipeController();

router.get('/', recipeController.getAllRecipes);
router.get('/:id', recipeController.getRecipeById);
router.post('/', authMiddleware, adminMiddleware, recipeController.createRecipe);
router.put('/:id', authMiddleware, adminMiddleware, recipeController.updateRecipe);
router.delete('/:id', authMiddleware, adminMiddleware, recipeController.deleteRecipe);

module.exports = router;
