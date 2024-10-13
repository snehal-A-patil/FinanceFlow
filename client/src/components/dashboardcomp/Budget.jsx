import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

function Budget() {
  const [budgets, setBudgets] = useState([]);
  const [newBudget, setNewBudget] = useState({ month: '', category: '', spent: '', limit: '' });
  const [totalSpent, setTotalSpent] = useState(0);
  const [totalLimit, setTotalLimit] = useState(0);
  const [editingBudget, setEditingBudget] = useState(null);

  // Month and category options
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const categories = [
    'Food', 'Transportation', 'Entertainment', 'Utilities', 'Healthcare',
    'Savings', 'Others'
  ];

  // Fetch budgets
  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
        const response = await fetch('http://localhost:5000/api/budgets', {
          headers: {
            Authorization: `Bearer ${token}` // Pass token in request header
          }
        });
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setBudgets(data);
        calculateTotals(data);
      } catch (error) {
        console.error('Error fetching budgets:', error);
      }
    };

    fetchBudgets();
  }, []);

  const calculateTotals = (budgets) => {
    const spent = budgets.reduce((acc, bud) => acc + bud.spent, 0);
    const limit = budgets.reduce((acc, bud) => acc + bud.limit, 0);
    setTotalSpent(spent);
    setTotalLimit(limit);
  };

  const addOrUpdateBudget = async () => {
    const budgetData = {
      month: newBudget.month,
      category: newBudget.category,
      spent: Number(newBudget.spent) || 0,
      limit: Number(newBudget.limit) || 0,
    };

    try {
      const token = localStorage.getItem('token');
      let response;
      if (editingBudget) {
        response = await fetch(`http://localhost:5000/api/budgets/${editingBudget._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Pass token in request header
          },
          body: JSON.stringify(budgetData),
        });
      } else {
        response = await fetch('http://localhost:5000/api/budgets', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Pass token in request header
          },
          body: JSON.stringify(budgetData),
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Network response was not ok');
      }

      const newBudgetResponse = await response.json();
      if (editingBudget) {
        setBudgets(budgets.map(b => (b._id === newBudgetResponse._id ? newBudgetResponse : b)));
      } else {
        setBudgets((prev) => [...prev, newBudgetResponse]);
      }
      resetForm();
      calculateTotals([...budgets, newBudgetResponse]);
    } catch (error) {
      console.error('Error adding/updating budget:', error);
    }
  };

  const deleteBudget = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/budgets/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`, // Pass token in request header
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Network response was not ok');
      }

      setBudgets(budgets.filter(b => b._id !== id));
      calculateTotals(budgets.filter(b => b._id !== id));
    } catch (error) {
      console.error('Error deleting budget:', error);
    }
  };

  const resetForm = () => {
    setNewBudget({ month: '', category: '', spent: '', limit: '' });
    setEditingBudget(null);
  };

  const startEditing = (budget) => {
    setNewBudget({
      month: budget.month,
      category: budget.category,
      spent: budget.spent,
      limit: budget.limit,
    });
    setEditingBudget(budget);
  };

  const renderBudgetOverview = () => {
    return budgets.map(budget => {
      const spentPercentage = budget.limit > 0 
        ? Math.min((budget.spent / budget.limit) * 100, 100) 
        : 0; // If limit is 0, set percentage to 0 to avoid division by zero

      return (
        <div key={budget._id} className="bg-white shadow-md rounded-lg p-4 mb-4">
          <h4 className="font-bold">{budget.month} - {budget.category}</h4>
          <p>Spent: ₹{budget.spent.toFixed(2)} / Limit: ₹{budget.limit.toFixed(2)}</p>
          <div className="h-4 bg-gray-200 rounded">
            <div
              className="h-full bg-green-500 rounded"
              style={{ width: `${spentPercentage}%` }}
            />
          </div>
          <p className="text-sm">{spentPercentage.toFixed(2)}% spent</p>
        </div>
      );
    });
  };

  return (
    <div className='flex'>
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100 ml-64">
        <h1 className="text-3xl font-bold mb-6 text-center">Budget Overview</h1>

        {/* Add New Budget Form */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h3 className="font-bold mb-4 text-lg">{editingBudget ? 'Edit Budget' : 'Add New Budget'}</h3>
          <div className="flex flex-col md:flex-row mb-4">
            <select
              value={newBudget.month}
              onChange={(e) => setNewBudget({ ...newBudget, month: e.target.value })}
              className="border rounded p-2 mr-2 mb-2 md:mb-0"
            >
              <option value="">Select Month</option>
              {months.map((month, index) => (
                <option key={index} value={month}>{month}</option>
              ))}
            </select>

            <select
              value={newBudget.category}
              onChange={(e) => setNewBudget({ ...newBudget, category: e.target.value })}
              className="border rounded p-2 mr-2 mb-2 md:mb-0"
            >
              <option value="">Select Category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col md:flex-row mb-4">
            <input
              type="number"
              placeholder="Spent (in INR)"
              value={newBudget.spent}
              onChange={(e) => setNewBudget({ ...newBudget, spent: e.target.value })}
              className="border rounded p-2 mr-2 mb-2 md:mb-0"
            />
            <input
              type="number"
              placeholder="Limit (in INR)"
              value={newBudget.limit}
              onChange={(e) => setNewBudget({ ...newBudget, limit: e.target.value })}
              className="border rounded p-2 mr-2 mb-2 md:mb-0"
            />
            <button onClick={addOrUpdateBudget} className="bg-green-500 text-white p-2 rounded">
              {editingBudget ? 'Update Budget' : 'Add Budget'}
            </button>
          </div>
        </div>

        {/* Total Spent and Remaining */}
        <div className="bg-white shadow-md rounded-lg p-4 mb-6">
          <h3 className="font-bold mb-2 text-lg">Total Overview</h3>
          <p>Total Spent: <span className="font-bold">₹{totalSpent.toFixed(2)}</span></p>
          <p>Total Limit: <span className="font-bold">₹{totalLimit.toFixed(2)}</span></p>
          <p className={`font-bold ${totalLimit - totalSpent < 0 ? 'text-red-500' : 'text-green-500'}`}>
            Remaining: ₹{(totalLimit - totalSpent).toFixed(2)}
          </p>
        </div>

        {/* Budget Overview */}
        {renderBudgetOverview()}
      </div>
    </div>
  );
}

export default Budget;
