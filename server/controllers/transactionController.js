// controllers/transactionController.js
const Transaction = require('../models/Transaction');

// Get all transactions
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch transactions' });
  }
};

// Add a new transaction
const addTransaction = async (req, res) => {
  const { description, amount, date, category, paymentMethod } = req.body;

  const newTransaction = new Transaction({
    description,
    amount,
    date,
    category,
    paymentMethod,
  });

  try {
    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add transaction' });
  }
};

// Update a transaction
const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const { description, amount, date, category, paymentMethod } = req.body;

  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      { description, amount, date, category, paymentMethod },
      { new: true }
    );

    if (!updatedTransaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update transaction' });
  }
};

// Delete a transaction
const deleteTransaction = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(id);
    if (!deletedTransaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete transaction' });
  }
};

module.exports = {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
};
