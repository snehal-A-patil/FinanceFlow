const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  targetAmount: {
    type: Number,
    required: true,
  },
  savedAmount: {
    type: Number,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  }
});

module.exports = mongoose.model('Goal', GoalSchema);
