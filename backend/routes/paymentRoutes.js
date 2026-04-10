
const express = require('express');
const router = express.Router();
const { createPaymentIntent, confirmPayment } = require('../controllers/paymentController');
const authMiddleware = require('../middleware/auth');

router.post('/create-payment-intent', authMiddleware, createPaymentIntent);
router.post('/confirm-payment', authMiddleware, confirmPayment);

module.exports = router;