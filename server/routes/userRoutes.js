const express = require('express');
const { register, login, getUserDashboardData, updateUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Ensure the User model is imported correctly
const User = require('../models/User');

const router = express.Router();

// User registration and login routes
router.post('/register', register);
router.post('/login', login);

// Protected route to get user dashboard data
router.get('/dashboard', protect, getUserDashboardData);

// Protected route to update user data
router.put('/me', protect, updateUser);

// Get current user profile information
router.get('/me', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // Exclude password
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
