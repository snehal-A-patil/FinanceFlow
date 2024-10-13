import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { toast } from 'react-toastify';

// Predefined options for categories and payment methods
const categories = ['Food', 'Transport', 'Utilities', 'Entertainment', 'Health', 'Other'];
const paymentMethods = ['Cash', 'Credit Card', 'Debit Card', 'Online Payment', 'Bank Transfer'];

const Transactions = ({ usdToInr = 1 }) => {
  const [transactions, setTransactions] = useState([]);
  const [newTransaction, setNewTransaction] = useState({
    description: '',
    amount: '',
    date: '',
    category: '',
    paymentMethod: '',
  });
  const [editTransaction, setEditTransaction] = useState(null);
  const [filter, setFilter] = useState('all');

  // Fetch transactions from the backend
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/transactions');
        if (!response.ok) throw new Error('Failed to fetch transactions');
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  // Add new transaction
  const addTransaction = async () => {
    if (!newTransaction.description || !newTransaction.amount || !newTransaction.date || !newTransaction.category) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newTransaction }), // Spread operator to include all fields
      });

      if (!response.ok) throw new Error('Failed to add transaction');
      const addedTransaction = await response.json();
      
      // Update the budget spending
      await updateBudget(newTransaction.category, newTransaction.amount);

      setTransactions([...transactions, addedTransaction]);
      toast.success('Transaction added successfully!');
      resetForm();
    } catch (error) {
      console.error('Error adding transaction:', error);
      toast.error('Error adding transaction');
    }
  };

  // Update transaction
  const updateTransaction = async () => {
    if (!newTransaction.description || newTransaction.amount === 0 || !newTransaction.date || !newTransaction.category) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/transactions/${editTransaction._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTransaction),
      });

      if (!response.ok) throw new Error('Failed to update transaction');

      const updatedTransaction = await response.json();
      setTransactions(transactions.map((t) => (t._id === updatedTransaction._id ? updatedTransaction : t)));
      toast.success('Transaction updated successfully!');
      resetForm();
      setEditTransaction(null);
    } catch (error) {
      console.error('Error updating transaction:', error);
      toast.error('Error updating transaction');
    }
  };

  // Delete a transaction
  const deleteTransaction = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/transactions/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete transaction');

      setTransactions(transactions.filter((transaction) => transaction._id !== id));
      toast.success('Transaction deleted successfully!');
    } catch (error) {
      console.error('Error deleting transaction:', error);
      toast.error('Error deleting transaction');
    }
  };

  // Update budget function
  const updateBudget = async (category, amount) => {
    try {
      const response = await fetch('http://localhost:5000/api/budgets/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: category.toLowerCase(), amount }),
      });

      if (!response.ok) throw new Error('Failed to update budget');
      const updatedBudget = await response.json();
      console.log('Budget updated successfully:', updatedBudget);
    } catch (error) {
      console.error('Error updating budget:', error);
      toast.error('Error updating budget');
    }
  };

  // Filter transactions
  const filterTransactions = (type) => {
    const now = new Date();
    switch (type) {
      case 'day':
        return transactions.filter((t) => new Date(t.date).toDateString() === now.toDateString());
      case 'week':
        const oneWeekAgo = new Date(now.setDate(now.getDate() - 7));
        return transactions.filter((t) => new Date(t.date) >= oneWeekAgo);
      case 'month':
        return transactions.filter((t) => new Date(t.date).getMonth() === now.getMonth());
      case 'large':
        return transactions.filter((t) => Math.abs(t.amount) >= 500);
      case 'small':
        return transactions.filter((t) => Math.abs(t.amount) < 500);
      default:
        return transactions;
    }
  };

  const filteredTransactions = filterTransactions(filter);

  const resetForm = () => {
    setNewTransaction({ description: '', amount: '', date: '', category: '', paymentMethod: '' });
  };

  return (
    <div className='flex'>
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100 ml-64">
        <h2 className="text-3xl font-bold mb-6">Recent Transactions</h2>

        {/* Add New Transaction Form */}
        <div className="mb-6 p-4 bg-white rounded-lg shadow">
          <h3 className="font-bold mb-2">{editTransaction ? 'Edit Transaction' : 'Add New Transaction'}</h3>
          <form onSubmit={(e) => { e.preventDefault(); editTransaction ? updateTransaction() : addTransaction(); }}>
            <div className="flex flex-col md:flex-row mb-4 space-y-2 md:space-y-0 md:space-x-2">
              <input
                type="text"
                placeholder="Description (e.g., Lunch at Cafe XYZ)"
                value={newTransaction.description}
                onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
                className="border rounded p-2 flex-1"
                required
              />
              <input
                type="number"
                placeholder="Amount"
                value={newTransaction.amount}
                onChange={(e) => setNewTransaction({ ...newTransaction, amount: parseFloat(e.target.value) })}
                className="border rounded p-2 flex-1"
                required
              />
              <input
                type="date"
                value={newTransaction.date}
                onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
                className="border rounded p-2 flex-1"
                required
              />
              <select
                value={newTransaction.category}
                onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
                className="border rounded p-2 flex-1"
                required
              >
                <option value="" disabled>Select Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <select
                value={newTransaction.paymentMethod}
                onChange={(e) => setNewTransaction({ ...newTransaction, paymentMethod: e.target.value })}
                className="border rounded p-2 flex-1"
                required
              >
                <option value="" disabled>Select Payment Method</option>
                {paymentMethods.map((method) => (
                  <option key={method} value={method}>{method}</option>
                ))}
              </select>
              <button type="submit" className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition">
                {editTransaction ? 'Update' : 'Add'}
              </button>
            </div>
          </form>
        </div>

        {/* Filter Buttons */}
        <div className="mb-6">
          <h3 className="font-bold mb-2">Filter Transactions</h3>
          <div className="flex flex-wrap">
            {['day', 'week', 'month', 'large', 'small', 'all'].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`bg-blue-500 text-white p-2 mr-2 mb-2 rounded hover:bg-blue-600 transition ${filter === type ? 'opacity-75' : ''}`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* List of Transactions */}
        <ul className="bg-white p-4 rounded-lg shadow-lg divide-y divide-gray-200">
          {filteredTransactions.map((transaction) => (
            <li key={transaction._id} className="flex justify-between items-center py-3">
              <div className="flex flex-col">
                <span className="font-semibold">{transaction.description}</span>
                <span className="text-gray-600">{transaction.date}</span>
              </div>
              <div className="flex items-center">
                <span className={`font-bold ${transaction.amount >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {transaction.amount >= 0 ? '+' : '-'} {Math.abs(transaction.amount).toFixed(2)} INR
                </span>
                <button onClick={() => {
                  setNewTransaction(transaction);
                  setEditTransaction(transaction);
                }} className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 ml-2">
                  Edit
                </button>
                <button onClick={() => deleteTransaction(transaction._id)} className="bg-red-500 text-white p-2 rounded hover:bg-red-600 ml-2">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Transactions;
