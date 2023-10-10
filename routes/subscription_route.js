const express = require('express');
const SubscriptionController = require('../controllers/subscription_controller');
const authMiddleware = require('../middlewares/auth_middleware');
const adminMiddleware = require('../middlewares/admin_middleware');

const router = express.Router();
const subscriptionController = new SubscriptionController();

router.get('/', subscriptionController.getAllSubscriptions);
router.get('/:id', subscriptionController.getSubscriptionById);
router.post('/', authMiddleware, adminMiddleware, subscriptionController.createSubscription);
router.put('/:id', authMiddleware, adminMiddleware, subscriptionController.updateSubscription);
router.delete('/:id', authMiddleware, adminMiddleware, subscriptionController.deleteSubscription);

module.exports = router;
