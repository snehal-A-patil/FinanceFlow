const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  month: { type: String, required: true },
  category: { type: String, required: true },
  spent: { type: Number, required: true },
  limit: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Reference to the user
});

const Budget = mongoose.model('Budget', budgetSchema);

module.exports = Budget;
