const Gig = require('../models/Gig');

// @desc    Create a new gig
// @route   POST /api/gigs
// @access  Private (Seller only)
exports.createGig = async (req, res) => {
  try {
    req.body.seller = req.user.id;
    const gig = await Gig.create(req.body);
    res.status(201).json({ success: true, data: gig });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get all gigs
// @route   GET /api/gigs
// @access  Public
exports.getAllGigs = async (req, res) => {
  try {
    const { category, minPrice, maxPrice, search } = req.query;
    let query = { isActive: true };

    if (category) query.category = category;
    if (minPrice) query.price = { $gte: minPrice };
    if (maxPrice) query.price = { ...query.price, $lte: maxPrice };
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const gigs = await Gig.find(query).populate('seller', 'name email profilePicture rating');
    res.status(200).json({ success: true, count: gigs.length, data: gigs });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get single gig
// @route   GET /api/gigs/:id
// @access  Public
exports.getGigById = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id).populate('seller', 'name email profilePicture rating bio');
    if (!gig) {
      return res.status(404).json({ success: false, message: 'Gig not found' });
    }
    res.status(200).json({ success: true, data: gig });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update gig
// @route   PUT /api/gigs/:id
// @access  Private (Seller who owns the gig)
exports.updateGig = async (req, res) => {
  try {
    let gig = await Gig.findById(req.params.id);
    if (!gig) {
      return res.status(404).json({ success: false, message: 'Gig not found' });
    }
    if (gig.seller.toString() !== req.user.id) {
      return res.status(401).json({ success: false, message: 'Not authorized to update this gig' });
    }
    gig = await Gig.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(200).json({ success: true, data: gig });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete gig
// @route   DELETE /api/gigs/:id
// @access  Private (Seller who owns the gig)
exports.deleteGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) {
      return res.status(404).json({ success: false, message: 'Gig not found' });
    }
    if (gig.seller.toString() !== req.user.id) {
      return res.status(401).json({ success: false, message: 'Not authorized to delete this gig' });
    }
    await gig.deleteOne();
    res.status(200).json({ success: true, message: 'Gig deleted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get seller's gigs
// @route   GET /api/gigs/seller/my-gigs
// @access  Private
exports.getMyGigs = async (req, res) => {
  try {
    const gigs = await Gig.find({ seller: req.user.id });
    res.status(200).json({ success: true, count: gigs.length, data: gigs });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};