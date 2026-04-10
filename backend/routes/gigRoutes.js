const express = require('express');
const router = express.Router();
const {
  createGig,
  getAllGigs,
  getGigById,
  updateGig,
  deleteGig,
  getMyGigs,
} = require('../controllers/gigController');
const authMiddleware = require('../middleware/auth');

router.route('/').get(getAllGigs).post(authMiddleware, createGig);
router.get('/my-gigs', authMiddleware, getMyGigs);
router
  .route('/:id')
  .get(getGigById)
  .put(authMiddleware, updateGig)
  .delete(authMiddleware, deleteGig);

module.exports = router;