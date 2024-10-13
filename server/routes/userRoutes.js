// routes/userRoutes.js
const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { authenticateToken } = require('../middleware/auth'); // Import the authentication middleware

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({ username, email, password });
    const savedUser = await newUser.save();

    res.status(201).json({
      _id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// User login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user data (balance and transactions)
router.get('/me/data', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id; // Get the user ID from the token
    const user = await User.findById(userId).select('-password'); // Exclude password

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      balance: user.balance,
      transactions: user.transactions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
