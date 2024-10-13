const express = require('express');
const User = require('../models/User'); // Adjust the path based on your project structure
const { authenticateToken } = require('../middleware/auth'); // Adjust the path based on your project structure

const router = express.Router();

// Get user profile information
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // Fetch the user from the database
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);  // Send user data as response
  } catch (err) {
    console.error(err); // Log error for debugging
    res.status(500).json({ message: 'Server error' });
  }
});

// Export the router
module.exports = router;
