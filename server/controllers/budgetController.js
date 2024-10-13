const Budget = require('../models/budget');

// Get budgets for logged-in user
const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({ user: req.user.id }); // Only find budgets for logged-in user
    res.status(200).json(budgets);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Add a new budget for the logged-in user
const addBudget = async (req, res) => {
  const { month, category, spent, limit } = req.body;

  if (!month || !category) {
    return res.status(400).json({ message: 'Month and category are required' });
  }

  try {
    const budget = new Budget({
      user: req.user.id, // Associate budget with the logged-in user
      month,
      category,
      spent,
      limit,
    });

    const createdBudget = await budget.save();
    res.status(201).json(createdBudget);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update budget
const updateBudget = async (req, res) => {
  const { month, category, spent, limit } = req.body;

  try {
    const budget = await Budget.findById(req.params.id);

    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    // Make sure logged-in user matches the budget owner
    if (budget.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    budget.month = month || budget.month;
    budget.category = category || budget.category;
    budget.spent = spent || budget.spent;
    budget.limit = limit || budget.limit;

    const updatedBudget = await budget.save();
    res.status(200).json(updatedBudget);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete budget
const deleteBudget = async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id);

    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    // Make sure logged-in user matches the budget owner
    if (budget.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await budget.remove();
    res.status(200).json({ message: 'Budget removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getBudgets, addBudget, updateBudget, deleteBudget };
