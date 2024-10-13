const Transaction = require('../models/Transaction');

// Get all transactions
const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 }); // Sort by date descending
    res.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'Failed to fetch transactions' });
  }
};

// Add a new transaction
const addTransaction = async (req, res) => {
  const { description, amount, date, category, paymentMethod } = req.body;

  const transaction = new Transaction({
    description,
    amount,
    date,
    category,
    paymentMethod,
  });

  try {
    const savedTransaction = await transaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    console.error('Error adding transaction:', error);
    res.status(400).json({ message: 'Failed to add transaction' });
  }
};

// Update transaction
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
    console.error('Error updating transaction:', error);
    res.status(400).json({ message: 'Failed to update transaction' });
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
    console.error('Error deleting transaction:', error);
    res.status(500).json({ message: 'Failed to delete transaction' });
  }
};

module.exports = {
  getAllTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
};
