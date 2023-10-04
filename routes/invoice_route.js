const express = require('express');
const InvoiceController = require('../controllers/invoice_controller');
const authMiddleware = require('../middlewares/auth_middleware');
const adminMiddleware = require('../middlewares/admin_middleware');

const router = express.Router();
const invoiceController = new InvoiceController();

router.get('/', authMiddleware, invoiceController.getAllInvoices);
router.get('/user/:user_id', authMiddleware, invoiceController.getAllInvoicesByUserId);
router.get('/cart/:cart_id', authMiddleware, invoiceController.getInvoiceByCartId);
router.get('/:id', authMiddleware, invoiceController.getInvoiceById);
router.post('/', authMiddleware, invoiceController.createInvoice);
router.put('/:id', authMiddleware, adminMiddleware, invoiceController.updateInvoice);
router.delete('/:id', authMiddleware, adminMiddleware, invoiceController.deleteInvoice);

module.exports = router;
