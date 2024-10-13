const express = require('express');
const {
  getBudgets,
  addBudget,
  updateBudget,
  deleteBudget,
} = require('../controllers/budgetController');
const { protect } = require('../middleware/authMiddleware'); // Protect middleware ensures user authentication

const router = express.Router();

// Route to get budgets for the logged-in user
router.get('/', protect, getBudgets);

// Route to add a new budget for the logged-in user
router.post('/', protect, addBudget);

// Route to update an existing budget for the logged-in user
router.put('/:id', protect, updateBudget);

// Route to delete a budget for the logged-in user
router.delete('/:id', protect, deleteBudget);

module.exports = router;
