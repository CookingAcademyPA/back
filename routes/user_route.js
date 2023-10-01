// routes/todoRoutes.js

const express = require('express');
const UserController = require('../controllers/user_controller');
const authMiddleware = require('../middlewares/auth_middleware');

const router = express.Router();
const userController = new UserController();


// Routes pour les tâches (todos)
router.get('/', authMiddleware, userController.getAllUsers);
router.get('/:id', authMiddleware, userController.getUserById);
router.put('/:id', authMiddleware, userController.updateUser);
router.delete('/:id', authMiddleware, userController.deleteUser);

module.exports = router;
