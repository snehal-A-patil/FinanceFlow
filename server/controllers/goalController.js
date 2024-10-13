const Goal = require('../models/Goal'); 

// Get all goals
exports.getGoals = async (req, res) => {
  try {
    const goals = await Goal.find();
    res.json(goals);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Add a goal
exports.addGoal = async (req, res) => {
  const { name, targetAmount, savedAmount, deadline } = req.body;
  const newGoal = new Goal({ name, targetAmount, savedAmount, deadline });

  try {
    const savedGoal = await newGoal.save();
    res.status(201).json(savedGoal);
  } catch (error) {
    res.status(400).json({ message: 'Failed to add goal' });
  }
};

// Update a goal
exports.updateGoal = async (req, res) => {
  const { id } = req.params;
  const { name, targetAmount, savedAmount, deadline } = req.body;

  try {
    const updatedGoal = await Goal.findByIdAndUpdate(id, { name, targetAmount, savedAmount, deadline }, { new: true });
    res.json(updatedGoal);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update goal' });
  }
};

// Delete a goal
exports.deleteGoal = async (req, res) => {
  const { id } = req.params;

  try {
    await Goal.findByIdAndDelete(id);
    res.json({ message: 'Goal deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete goal' });
  }
};
