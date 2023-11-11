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
router.post('/:id/meal/:meal_id', authMiddleware, cartController.addBuyMealToCart);
router.post('/:id/product/:product_id', authMiddleware, cartController.addBuyProductToCart);
router.post('/:id/service/:service_id', authMiddleware, cartController.addBuyServiceToCart);
router.put('/:id/meal/:meal_id', authMiddleware, cartController.updateBuyMeal);
router.put('/:id/product/:product_id', authMiddleware, cartController.updateBuyProduct);
router.put('/:id/service/:service_id', authMiddleware, cartController.updateBuyService);
router.delete('/:id/meal/:meal_id', authMiddleware, cartController.removeMealFromCart);
router.delete('/:id/product/:product_id', authMiddleware, cartController.removeProductFromCart);
router.delete('/:id/service/:service_id', authMiddleware, cartController.removeServiceFromCart);
router.post('/', authMiddleware, cartController.createCart);
router.put('/:id', authMiddleware, cartController.updateCartState);
router.delete('/:id', authMiddleware, adminMiddleware, cartController.deleteCart);

module.exports = router;
