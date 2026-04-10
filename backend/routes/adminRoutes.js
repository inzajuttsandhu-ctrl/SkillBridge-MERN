const express = require('express');
const router = express.Router();
const { adminLogin } = require('../controllers/adminAuthController');
const {
  getStats,
  getAllUsers,
  deleteUser,
  getAllGigs,
  deleteGig,
  getAllOrders,
  updateOrderStatus
} = require('../controllers/adminController');
const authMiddleware = require('../middleware/auth');

// Admin Auth
router.post('/login', adminLogin);

// Admin Protected Routes
router.get('/stats', authMiddleware, getStats);
router.get('/users', authMiddleware, getAllUsers);
router.delete('/users/:id', authMiddleware, deleteUser);
router.get('/gigs', authMiddleware, getAllGigs);
router.delete('/gigs/:id', authMiddleware, deleteGig);
router.get('/orders', authMiddleware, getAllOrders);
router.put('/orders/:id', authMiddleware, updateOrderStatus);

module.exports = router;