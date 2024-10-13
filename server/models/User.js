const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: false,
    },
    address: {
        type: String,
        required: false,
    },
    age: {
        type: Number,
        required: false,
    },
}, {
    timestamps: true,
});

// Hash password before saving
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Method to generate JWT
UserSchema.methods.generateAuthToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
