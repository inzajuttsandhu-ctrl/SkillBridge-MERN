const Order = require('../models/Order');
const Gig = require('../models/Gig');

exports.createOrder = async (req, res) => {
  try {
    const { gigId, requirements } = req.body;
    
    const gig = await Gig.findById(gigId);
    if (!gig) {
      return res.status(404).json({ success: false, message: 'Gig not found' });
    }
    
    const order = await Order.create({
      gig: gigId,
      buyer: req.user.id,
      seller: gig.seller,
      price: gig.price,
      requirements
    });
    
    res.status(201).json({ success: true, data: order });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user.id })
      .populate('gig', 'title images price')
      .populate('seller', 'name email');
    res.status(200).json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getMySales = async (req, res) => {
  try {
    const orders = await Order.find({ seller: req.user.id })
      .populate('gig', 'title images price')
      .populate('buyer', 'name email');
    res.status(200).json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status, delivery } = req.body;
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    
    if (order.seller.toString() !== req.user.id) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }
    
    order.status = status;
    if (delivery) order.delivery = delivery;
    if (status === 'completed') order.completedAt = Date.now();
    if (delivery) order.deliveredAt = Date.now();
    
    await order.save();
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};