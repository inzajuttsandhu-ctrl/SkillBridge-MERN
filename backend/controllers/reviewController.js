const Review = require('../models/Review');
const Order = require('../models/Order');
const Gig = require('../models/Gig');

// Create a review (after order is completed)
exports.createReview = async (req, res) => {
  try {
    const { gigId, orderId, rating, comment } = req.body;
    const reviewerId = req.user.id;

    // Check if order exists and is completed
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    if (order.status !== 'completed') {
      return res.status(400).json({ message: 'Can only review completed orders' });
    }
    if (order.buyer.toString() !== reviewerId) {
      return res.status(403).json({ message: 'Only buyer can review this order' });
    }

    // Check if already reviewed
    const existingReview = await Review.findOne({ order: orderId });
    if (existingReview) {
      return res.status(400).json({ message: 'Already reviewed this order' });
    }

    // Create review
    const review = await Review.create({
      gig: gigId,
      order: orderId,
      reviewer: reviewerId,
      reviewee: order.seller,
      rating,
      comment
    });

    // Update gig rating
    const gig = await Gig.findById(gigId);
    const allReviews = await Review.find({ gig: gigId });
    const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
    await Gig.findByIdAndUpdate(gigId, {
      rating: avgRating,
      totalReviews: allReviews.length
    });

    res.status(201).json({ success: true, data: review });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get reviews for a gig
exports.getGigReviews = async (req, res) => {
  try {
    const { gigId } = req.params;
    const reviews = await Review.find({ gig: gigId, isPublic: true })
      .populate('reviewer', 'name profilePicture')
      .sort('-createdAt');
    res.json({ success: true, count: reviews.length, data: reviews });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get reviews for a seller
exports.getSellerReviews = async (req, res) => {
  try {
    const { sellerId } = req.params;
    const reviews = await Review.find({ reviewee: sellerId, isPublic: true })
      .populate('reviewer', 'name profilePicture')
      .populate('gig', 'title')
      .sort('-createdAt');
    res.json({ success: true, count: reviews.length, data: reviews });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete review (admin or owner)
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    if (review.reviewer.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    await review.deleteOne();
    res.json({ success: true, message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};