const express = require('express');
const CommentController = require('../controllers/comment_controller');
const authMiddleware = require('../middlewares/auth_middleware');
const adminMiddleware = require('../middlewares/admin_middleware');

const router = express.Router();
const commentController = new CommentController();

router.get('/', commentController.getAllComments);
router.get('/user/:user_id', authMiddleware, commentController.getAllCommentsByUserId);
router.get('/service/:service_id', commentController.getAllCommentsByServiceId);
router.get('/:id', authMiddleware, commentController.getCommentById);
router.post('/', authMiddleware, commentController.createComment);
router.put('/:id', authMiddleware, commentController.updateComment);
router.delete('/:id', authMiddleware, adminMiddleware, commentController.deleteComment);

module.exports = router;
