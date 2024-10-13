const express = require('express');
const {
  getAllTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} = require('../controllers/transactionController');

const router = express.Router();

// Routes for transactions
router.get('/', getAllTransactions);
router.post('/', addTransaction);
router.put('/:id', updateTransaction);
router.delete('/:id', deleteTransaction);

module.exports = router;
