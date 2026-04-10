const express = require('express');
const router = express.Router();
const {
  createReview,
  getGigReviews,
  getSellerReviews,
  deleteReview
} = require('../controllers/reviewController');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, createReview);
router.get('/gig/:gigId', getGigReviews);
router.get('/seller/:sellerId', getSellerReviews);
router.delete('/:id', authMiddleware, deleteReview);

module.exports = router;