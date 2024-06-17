const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config()

// Middleware to check authentication
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { userid, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ userid, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: 'User registration failed' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { userid, password } = req.body;
  try {
    const user = await User.findOne({ userid });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Update user details
router.put('/update', authMiddleware, async (req, res) => {
  const { name, age } = req.body;
  try {
    const user = req.user; // getting from authMiddleware
    user.name = name;
    user.age = age;
    await user.save();
    res.json({ message: 'User details updated' });
  } catch (error) {
    res.status(500).json({ error: 'Update failed' });
  }
});

module.exports = router;

