const express = require('express');
const {
  getInvestmentsByUser,
  addInvestment,
  updateInvestment,
  deleteInvestment,
} = require('../controllers/investmentController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Route to get investments for the logged-in user
router.get('/', protect, getInvestmentsByUser);

// Route to add a new investment for the logged-in user
router.post('/', protect, addInvestment);

// Route to update an existing investment for the logged-in user
router.put('/:id', protect, updateInvestment);

// Route to delete an investment for the logged-in user
router.delete('/:id', protect, deleteInvestment);

module.exports = router;
