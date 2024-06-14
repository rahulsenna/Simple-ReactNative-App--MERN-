const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

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

    const token = jwt.sign({ id: user._id }, 'secretkey', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Update user details
router.put('/update', async (req, res) => {
  const { token, name, age } = req.body;
  try {
    const decoded = jwt.verify(token, 'secretkey');
    await User.findByIdAndUpdate(decoded.id, { name, age });
    res.json({ message: 'User details updated' });
  } catch (error) {
    res.status(500).json({ error: 'Update failed' });
  }
});

module.exports = router;

