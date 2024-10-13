import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

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
        if (!response.ok) {
          throw new Error('Failed to fetch transactions');
        }
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
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTransaction),
      });

      if (!response.ok) {
        throw new Error('Failed to add transaction');
      }

      const addedTransaction = await response.json();
      setTransactions([...transactions, addedTransaction]);
      alert('Transaction added successfully!');
      setNewTransaction({ description: '', amount: '', date: '', category: '', paymentMethod: '' });
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  // Update transaction
  const updateTransaction = async () => {
    if (!newTransaction.description || newTransaction.amount === 0 || !newTransaction.date || !newTransaction.category) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/transactions/${editTransaction._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTransaction),
      });

      if (!response.ok) {
        throw new Error('Failed to update transaction');
      }

      const updatedTransaction = await response.json();
      setTransactions(transactions.map((t) => (t._id === updatedTransaction._id ? updatedTransaction : t)));
      alert('Transaction updated successfully!');
      setNewTransaction({ description: '', amount: '', date: '', category: '', paymentMethod: '' });
      setEditTransaction(null);
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };

  // Delete a transaction
  const deleteTransaction = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/transactions/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Failed to delete transaction');
      }
      setTransactions(transactions.filter((transaction) => transaction._id !== id));
      alert('Transaction deleted successfully!');
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  // Filter transactions by day, week, month, or amount
  const filterTransactions = (type) => {
    let now = new Date();
    let filtered;

    switch (type) {
      case 'day':
        filtered = transactions.filter(
          (t) => new Date(t.date).toDateString() === now.toDateString()
        );
        break;
      case 'week':
        const oneWeekAgo = new Date(now.setDate(now.getDate() - 7));
        filtered = transactions.filter((t) => new Date(t.date) >= oneWeekAgo);
        break;
      case 'month':
        filtered = transactions.filter(
          (t) => new Date(t.date).getMonth() === now.getMonth()
        );
        break;
      case 'large':
        filtered = transactions.filter((t) => Math.abs(t.amount) >= 500);
        break;
      case 'small':
        filtered = transactions.filter((t) => Math.abs(t.amount) < 500);
        break;
      default:
        filtered = transactions;
        break;
    }
    return filtered;
  };

  const filteredTransactions = filterTransactions(filter);

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-1/4">
        <Sidebar />
      </div>

      {/* Transactions Section */}
      <div className="flex-1 bg-gray-50 p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-3xl font-bold mb-6">Recent Transactions</h2>

        {/* Add New Transaction Form */}
        <div className="mb-6 p-4 bg-white rounded-lg shadow">
          <h3 className="font-bold mb-2">{editTransaction ? 'Edit Transaction' : 'Add New Transaction'}</h3>
          <form onSubmit={(e) => { e.preventDefault(); editTransaction ? updateTransaction() : addTransaction(); }}>
            <div className="flex flex-col md:flex-row mb-4">
              <input
                type="text"
                placeholder="Description (e.g., Lunch at Cafe XYZ)"
                value={newTransaction.description}
                onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
                className="border rounded p-2 mr-2 flex-1 mb-2 md:mb-0"
                required
              />
              <input
                type="number"
                placeholder="Amount"
                value={newTransaction.amount}
                onChange={(e) => setNewTransaction({ ...newTransaction, amount: parseFloat(e.target.value) })}
                className="border rounded p-2 mr-2 flex-1 mb-2 md:mb-0"
                required
              />
              <input
                type="date"
                value={newTransaction.date}
                onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
                className="border rounded p-2 mr-2 flex-1 mb-2 md:mb-0"
                required
              />
              
              {/* Dropdown for Category */}
              <select
                value={newTransaction.category}
                onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
                className="border rounded p-2 mr-2 flex-1 mb-2 md:mb-0"
                required
              >
                <option value="" disabled>Select Category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>

              {/* Dropdown for Payment Method */}
              <select
                value={newTransaction.paymentMethod}
                onChange={(e) => setNewTransaction({ ...newTransaction, paymentMethod: e.target.value })}
                className="border rounded p-2 mr-2 flex-1 mb-2 md:mb-0"
                required
              >
                <option value="" disabled>Select Payment Method</option>
                {paymentMethods.map((method, index) => (
                  <option key={index} value={method}>{method}</option>
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
        <ul className="divide-y divide-gray-200">
          {filteredTransactions.map((transaction) => (
            <li key={transaction._id} className="flex justify-between items-center py-3">
              <div className="flex flex-col">
                <span className="font-medium">{transaction.description}</span>
                <p className="text-sm text-gray-500">{transaction.category || 'Miscellaneous'}</p>
              </div>
              <span className={`font-semibold ${transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}`}>
                ₹{(transaction.amount * (usdToInr || 1)).toFixed(2)}
              </span>
              <span className="text-gray-500 text-sm">
                {new Date(transaction.date).toLocaleDateString()}
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => deleteTransaction(transaction._id)}
                  className="bg-red-500 text-white p-1 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    setNewTransaction(transaction);
                    setEditTransaction(transaction);
                  }}
                  className="bg-yellow-500 text-white p-1 rounded hover:bg-yellow-600 transition"
                >
                  Edit
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
