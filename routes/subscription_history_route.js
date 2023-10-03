const express = require('express');
const SubscriptionHistoryController = require('../controllers/subscription_history_controller');
const authMiddleware = require('../middlewares/auth_middleware');
const adminMiddleware = require('../middlewares/admin_middleware');

const router = express.Router();
const subscriptionController = new SubscriptionHistoryController();

router.get('/', authMiddleware, subscriptionController.getAllSubscriptionsHistory);
router.get('/:id', authMiddleware, subscriptionController.getSubscriptionHistoryById);
router.get('/user/:id', authMiddleware, subscriptionController.getSubscriptionHistoryByUserId);
router.get('/subscription/:id', authMiddleware, subscriptionController.getSubscriptionHistoryBySubscriptionId);
router.post('/', authMiddleware, subscriptionController.saveSubscriptionHistory);
router.put('/:id', authMiddleware, subscriptionController.updateSubscriptionHistory);
router.delete('/:id', authMiddleware, adminMiddleware, subscriptionController.deleteSubscriptionHistory);

module.exports = router;
