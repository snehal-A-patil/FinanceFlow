const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  category: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
