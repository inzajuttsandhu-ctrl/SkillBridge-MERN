const express = require('express');
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getMySales,
  updateOrderStatus
} = require('../controllers/orderController');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, createOrder);
router.get('/my-orders', authMiddleware, getMyOrders);
router.get('/my-sales', authMiddleware, getMySales);
router.put('/:id', authMiddleware, updateOrderStatus);

module.exports = router;