const express = require('express');
const ServiceController = require('../controllers/service_controller');
const authMiddleware = require('../middlewares/auth_middleware');
const adminMiddleware = require('../middlewares/admin_middleware');

const router = express.Router();
const serviceController = new ServiceController();

router.get('/', serviceController.getAllServices);
router.get('/type/:type', serviceController.getServiceByType);
router.get('/:id', serviceController.getServiceById);
router.post('/', authMiddleware, adminMiddleware, serviceController.createService);
router.put('/:id', authMiddleware, serviceController.updateService);
router.delete('/:id', authMiddleware, adminMiddleware, serviceController.deleteService);
router.get('/:id/reservations', authMiddleware, serviceController.getReservationsByServiceId);
router.get('/:id/reservations/:user_id', authMiddleware, serviceController.getReservationByServiceIdAndUserId);

module.exports = router;
