// routes/items.js
const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const User = require('../models/User');

// Middleware to check authentication
const authMiddleware = require('../middleware/auth');
const optionalAuthMiddleware = require('../middleware/optionalAuth');

// Create an item
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, description, img_url, price } = req.body;
    const item = new Item({
      name,
      description,
      img_url,
      price,
      seller: req.user._id // Assuming req.user is set by the auth middleware
    });
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all items
router.get('/',optionalAuthMiddleware, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const user = req.user || {_id: null};
    const items = await Item.find({ available: true, seller: { $ne: user._id } })
      .populate('seller', 'userid name')
      .skip(skip)
      .limit(limit);
    const totalItems = await Item.countDocuments({ available: true, seller: { $ne: user._id } });

    res.status(200).json({
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page,
      items
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Buy an item (simplified)
router.post('/:id/buy', authMiddleware, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item || !item.available) {
      return res.status(404).json({ error: 'Item not found' });
    }

    // Add item to buyer's bought array
    req.user.bought.push({ itemId: item._id });
    await req.user.save();

    // Add item to seller's sold array
    const seller = await User.findById(item.seller);
    seller.sold.push({ itemId: item._id });
    await seller.save();

    // make item not available for purchase anymore
    item.available = false;
    await item.save();

    // Logic for buying the item can be added here (e.g., payment processing)
    res.status(200).json({ message: 'Item bought successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
