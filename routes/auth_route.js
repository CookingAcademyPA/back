const express = require('express');
const AuthController = require('../controllers/auth_controller');

const router = express.Router();
const authController = new AuthController();

// Routes pour les tâches (todos)
router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router;
