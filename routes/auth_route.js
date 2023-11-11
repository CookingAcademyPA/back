const express = require('express');
const AuthController = require('../controllers/auth_controller');

const router = express.Router();
const authController = new AuthController();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

module.exports = router;
