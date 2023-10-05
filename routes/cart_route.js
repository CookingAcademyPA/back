const express = require('express');
const CartController = require('../controllers/cart_controller');
const authMiddleware = require('../middlewares/auth_middleware');
const adminMiddleware = require('../middlewares/admin_middleware');

const router = express.Router();
const cartController = new CartController();

router.get('/', authMiddleware, adminMiddleware, cartController.getAllCarts);
router.get('/:id', authMiddleware, cartController.getCartById);
router.get('/:id/meal', authMiddleware, cartController.getBuyMealByCartId);
router.get('/:id/product', authMiddleware, cartController.getBuyProductByCartId);
router.get('/:id/service', authMiddleware, cartController.getBuyServiceByCartId);
router.post('/:id/meal', authMiddleware, adminMiddleware, cartController.addBuyMealToCart);
router.post('/:id/product', authMiddleware, adminMiddleware, cartController.addBuyProductToCart);
router.post('/:id/service', authMiddleware, adminMiddleware, cartController.addBuyServiceToCart);
router.post('/', authMiddleware, cartController.createCart);
router.put('/:id', authMiddleware, cartController.updateCartState);
router.delete('/:id', authMiddleware, adminMiddleware, cartController.deleteCart);

module.exports = router;
