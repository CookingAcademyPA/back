const express = require('express');
const BuyController = require('../controllers/buy_controller');
const authMiddleware = require('../middlewares/auth_middleware');
const adminMiddleware = require('../middlewares/admin_middleware');

const router = express.Router();
const buyController = new BuyController();

router.get('/meal', authMiddleware, buyController.getAllBuyMeal);
router.get('/product', authMiddleware, buyController.getAllBuyProduct);
router.get('/service', authMiddleware, buyController.getAllBuyService);
router.post('/meal/:id', authMiddleware, buyController.buyMeal);
router.post('/product/:id', authMiddleware, buyController.buyProduct);
router.post('/service/:id', authMiddleware, buyController.buyService);

module.exports = router;
