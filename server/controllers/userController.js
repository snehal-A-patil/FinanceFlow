const User = require('../models/User');

// User registration
exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new User({ name, email, password });
        await user.save();
        const { password: _, ...userData } = user.toObject();
        res.status(201).json(userData);
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// User login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = user.generateAuthToken();
        const { password: _, ...userData } = user.toObject();
        res.status(200).json({ ...userData, token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update user data
exports.updateUser = async (req, res) => {
    const { name, email, phone, address, age } = req.body;
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user fields
        user.name = name || user.name;
        user.email = email || user.email;
        user.phone = phone || user.phone;
        user.address = address || user.address;
        user.age = age !== undefined ? Number(age) : user.age; // Ensure age is a number

        await user.save();

        const { password: _, ...updatedUserData } = user.toObject();
        res.json(updatedUserData);
    } catch (error) {
        console.error('Error updating user data:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get user dashboard data
exports.getUserDashboardData = async (req, res) => {
    res.status(200).json({ message: 'Dashboard data not implemented yet.' });
};
