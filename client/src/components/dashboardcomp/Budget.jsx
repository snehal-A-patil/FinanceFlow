import React, { useState } from 'react';
import Sidebar from './Sidebar';

function Budget() {
  // Dummy budget data
  const initialBudgets = [
    { id: 1, month: 'October', category: 'Food', spent: 200 * 82, limit: 300 * 82 },
    { id: 2, month: 'October', category: 'Transport', spent: 50 * 82, limit: 100 * 82 },
    { id: 3, month: 'October', category: 'Entertainment', spent: 80 * 82, limit: 150 * 82 }
  ];

  const [budgets, setBudgets] = useState(initialBudgets); // State to manage budgets
  const [newBudget, setNewBudget] = useState({ month: '', category: '', spent: '', limit: '' });
  const [editBudget, setEditBudget] = useState({ id: null, month: '', category: '', spent: '', limit: '' });

  const calculatePercentage = (spent, limit) => {
    return Math.min((spent / limit) * 100, 100).toFixed(1);
  };

  const getProgressBarColor = (percentage) => {
    if (percentage < 50) {
      return 'bg-green-500';
    } else if (percentage >= 50 && percentage < 90) {
      return 'bg-yellow-500';
    } else {
      return 'bg-red-500';
    }
  };

  // Function to add a new budget
  const addBudget = () => {
    if (!newBudget.month || !newBudget.category || !newBudget.spent || !newBudget.limit) return;

    const updatedBudgets = [
      ...budgets,
      {
        id: budgets.length + 1,
        month: newBudget.month,
        category: newBudget.category,
        spent: parseFloat(newBudget.spent),
        limit: parseFloat(newBudget.limit),
      },
    ];
    setBudgets(updatedBudgets);
    setNewBudget({ month: '', category: '', spent: '', limit: '' });
  };

  // Function to update a budget
  const updateBudget = (id) => {
    const updatedBudgets = budgets.map((bud) => 
      bud.id === id 
        ? { ...bud, month: editBudget.month, category: editBudget.category, spent: parseFloat(editBudget.spent), limit: parseFloat(editBudget.limit) } 
        : bud
    );
    setBudgets(updatedBudgets);
    setEditBudget({ id: null, month: '', category: '', spent: '', limit: '' });
  };

  // Function to remove a budget
  const removeBudget = (id) => {
    const updatedBudgets = budgets.filter((bud) => bud.id !== id);
    setBudgets(updatedBudgets);
  };

  // Function to reset budgets for the month
  const resetBudgets = () => {
    setBudgets([]);
    setNewBudget({ month: '', category: '', spent: '', limit: '' });
    setEditBudget({ id: null, month: '', category: '', spent: '', limit: '' });
  };

  // Calculate total spent and remaining for all budgets
  const totalSpent = budgets.reduce((acc, bud) => acc + bud.spent, 0);
  const totalLimit = budgets.reduce((acc, bud) => acc + bud.limit, 0);
  const totalRemaining = totalLimit - totalSpent;

  return (
    <div className='flex'>
      <Sidebar />
      
      <div className="flex-1 p-6 bg-gray-100 ml-64">
        <h1 className="text-3xl font-bold mb-6">Budget Overview</h1>

        {/* Add New Budget Form */}
        <div className="mb-6">
          <h3 className="font-bold mb-2">Add New Budget</h3>
          <input
            type="text"
            placeholder="Month (e.g., October)"
            value={newBudget.month}
            onChange={(e) => setNewBudget({ ...newBudget, month: e.target.value })}
            className="border rounded p-2 mr-2"
          />
          <input
            type="text"
            placeholder="Category"
            value={newBudget.category}
            onChange={(e) => setNewBudget({ ...newBudget, category: e.target.value })}
            className="border rounded p-2 mr-2"
          />
          <input
            type="number"
            placeholder="Spent (in INR)"
            value={newBudget.spent}
            onChange={(e) => setNewBudget({ ...newBudget, spent: e.target.value })}
            className="border rounded p-2 mr-2"
          />
          <input
            type="number"
            placeholder="Limit (in INR)"
            value={newBudget.limit}
            onChange={(e) => setNewBudget({ ...newBudget, limit: e.target.value })}
            className="border rounded p-2 mr-2"
          />
          <button onClick={addBudget} className="bg-green-500 text-white p-2 rounded">
            Add
          </button>
        </div>

        {/* Total Spent and Remaining */}
        <div className="bg-gray-200 p-4 rounded-lg mb-6">
          <h3 className="font-bold mb-2">Total Overview</h3>
          <p>Total Spent: ₹{totalSpent.toFixed(2)}</p>
          <p>Total Limit: ₹{totalLimit.toFixed(2)}</p>
          <p className={`font-bold ${totalRemaining < 0 ? 'text-red-500' : 'text-green-600'}`}>
            Total Remaining: ₹{totalRemaining.toFixed(2)}
          </p>
        </div>

        {/* List of Budgets */}
        <ul className="bg-white p-6 rounded-lg shadow-lg space-y-6">
          {budgets.map((bud) => {
            const percentageUsed = calculatePercentage(bud.spent, bud.limit);
            const progressBarColor = getProgressBarColor(percentageUsed);
            const remaining = bud.limit - bud.spent;

            return (
              <li key={bud.id} className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-lg">{bud.category} ({bud.month})</span>
                  <span>
                    <span className={`font-bold ${bud.spent > bud.limit ? 'text-red-500' : 'text-green-500'}`}>
                      ₹{bud.spent.toFixed(2)}
                    </span>
                    <span className="text-gray-500"> / ₹{bud.limit.toFixed(2)}</span>
                    <span className="ml-2 text-sm text-gray-600">({percentageUsed}%)</span>
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className={`${progressBarColor} h-4 rounded-full`}
                    style={{ width: `${percentageUsed}%` }}
                  ></div>
                </div>

                {/* Show remaining budget */}
                <div className={`mt-2 text-sm ${remaining < 0 ? 'text-red-500' : 'text-gray-600'}`}>
                  {remaining < 0
                    ? `You are over budget by ₹${Math.abs(remaining).toFixed(2)}!`
                    : `Remaining budget: ₹${remaining.toFixed(2)}`}
                </div>

                {/* Alert if over budget */}
                {bud.spent > bud.limit && (
                  <div className="text-red-600 mt-2 text-sm">
                    Warning: You have exceeded your budget for {bud.category}!
                  </div>
                )}

                {/* Edit and Remove Buttons */}
                <div className="mt-2">
                  <button
                    onClick={() => {
                      setEditBudget({ id: bud.id, month: bud.month, category: bud.category, spent: bud.spent, limit: bud.limit });
                    }}
                    className="bg-blue-500 text-white p-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => removeBudget(bud.id)}
                    className="bg-red-500 text-white p-1 rounded"
                  >
                    Remove
                  </button>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Edit Budget Form */}
        {editBudget.id && (
          <div className="mt-6">
            <h3 className="font-bold mb-2">Edit Budget</h3>
            <input
              type="text"
              placeholder="Month"
              value={editBudget.month}
              onChange={(e) => setEditBudget({ ...editBudget, month: e.target.value })}
              className="border rounded p-2 mr-2"
            />
            <input
              type="text"
              placeholder="Category"
              value={editBudget.category}
              onChange={(e) => setEditBudget({ ...editBudget, category: e.target.value })}
              className="border rounded p-2 mr-2"
            />
            <input
              type="number"
              placeholder="Spent (in INR)"
              value={editBudget.spent}
              onChange={(e) => setEditBudget({ ...editBudget, spent: e.target.value })}
              className="border rounded p-2 mr-2"
            />
            <input
              type="number"
              placeholder="Limit (in INR)"
              value={editBudget.limit}
              onChange={(e) => setEditBudget({ ...editBudget, limit: e.target.value })}
              className="border rounded p-2 mr-2"
            />
            <button onClick={() => updateBudget(editBudget.id)} className="bg-yellow-500 text-white p-2 rounded">
              Update
            </button>
          </div>
        )}

        {/* Reset Budgets Button */}
        <div className="mt-6">
          <button onClick={resetBudgets} className="bg-red-600 text-white p-2 rounded">
            Reset Budgets
          </button>
        </div>
      </div>
    </div>
  );
}

export default Budget;
