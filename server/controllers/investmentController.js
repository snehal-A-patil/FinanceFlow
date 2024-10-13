const Investment = require('../models/investment');

// Get investments for logged-in user
const getInvestmentsByUser = async (req, res) => {
  try {
    const investments = await Investment.find({ userId: req.user.id });
    res.json(investments);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Add a new investment
const addInvestment = async (req, res) => {
  const { type, name, amountInvested, currentValue, unitsOwned } = req.body;

  try {
    const newInvestment = new Investment({
      userId: req.user.id,
      type,
      name,
      amountInvested,
      currentValue,
      unitsOwned,
    });
    
    const savedInvestment = await newInvestment.save();
    res.status(201).json(savedInvestment);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

// Update an existing investment
const updateInvestment = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedInvestment = await Investment.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedInvestment) return res.status(404).json({ message: 'Investment not found' });
    res.json(updatedInvestment);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

// Delete an investment
const deleteInvestment = async (req, res) => {
  const { id } = req.params;

  try {
    const investment = await Investment.findByIdAndDelete(id);
    if (!investment) return res.status(404).json({ message: 'Investment not found' });
    res.json({ message: 'Investment deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getInvestmentsByUser,
  addInvestment,
  updateInvestment,
  deleteInvestment,
};
