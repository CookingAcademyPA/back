const express = require('express');
const UserController = require('../controllers/user_controller');
const authMiddleware = require('../middlewares/auth_middleware');
const adminMiddleware = require('../middlewares/admin_middleware');

const router = express.Router();
const userController = new UserController();

router.get('/', authMiddleware, userController.getAllUsers);
router.get('/admins', authMiddleware, adminMiddleware, userController.getAllAdmins);
router.get('/admins/:id', userController.getAdminById);
router.get('/:id', authMiddleware, userController.getUserById);
router.put('/:id', authMiddleware, userController.updateUserInfo);
router.put('/:id/changePassword', authMiddleware, userController.updateUserPassword);
router.get('/:id/cart', authMiddleware, userController.getUserCurrentCart);
router.get('/:id/carts', authMiddleware, userController.getUserCarts);
router.get('/:id/carts/paid', authMiddleware, userController.getUserPaidCarts);
router.delete('/:id', authMiddleware, adminMiddleware, userController.deleteUser);

module.exports = router;
