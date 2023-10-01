// routes/todoRoutes.js

const express = require('express');
const UserController = require('../controllers/user_controller');

const router = express.Router();
const userController = new UserController();

// Routes pour les tâches (todos)
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
