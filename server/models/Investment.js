const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  name: { type: String, required: true },
  amountInvested: { type: Number, required: true },
  currentValue: { type: Number, required: true },
  unitsOwned: { type: Number, required: true },
}, {
  timestamps: true,
});

const Investment = mongoose.model('Investment', investmentSchema);
module.exports = Investment;
