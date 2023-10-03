const express = require('express');
const ServiceController = require('../controllers/service_controller');
const authMiddleware = require('../middlewares/auth_middleware');
const adminMiddleware = require('../middlewares/admin_middleware');

const router = express.Router();
const serviceController = new ServiceController();

router.get('/', authMiddleware, serviceController.getAllServices);
router.get('/:type', authMiddleware, serviceController.getServiceByType);
router.get('/:id', authMiddleware, serviceController.getServiceById);
router.post('/', authMiddleware, adminMiddleware, serviceController.createService);
router.put('/:id', authMiddleware, serviceController.updateService);
router.delete('/:id', authMiddleware, adminMiddleware, serviceController.deleteService);

module.exports = router;
