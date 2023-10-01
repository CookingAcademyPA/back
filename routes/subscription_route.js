const express = require('express');
const SubscriptionController = require('../controllers/subscription_controller');
const authMiddleware = require('../middlewares/auth_middleware');

const router = express.Router();
const subscriptionController = new SubscriptionController();

router.get('/', authMiddleware, subscriptionController.getAllSubscriptions);
router.get('/:id', authMiddleware, subscriptionController.getSubscriptionById);
router.put('/:id', authMiddleware, subscriptionController.updateSubscription);
router.delete('/:id', authMiddleware, subscriptionController.deleteSubscription);

module.exports = router;
