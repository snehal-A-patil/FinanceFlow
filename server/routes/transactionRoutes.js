// routes/transactionRoutes.js
const express = require('express');
const {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} = require('../controllers/transactionController');

const router = express.Router();

// Define the routes
router.get('/', getTransactions); // GET all transactions
router.post('/', addTransaction);   // POST a new transaction
router.put('/:id', updateTransaction); // PUT to update a transaction
router.delete('/:id', deleteTransaction); // DELETE a transaction

module.exports = router;
