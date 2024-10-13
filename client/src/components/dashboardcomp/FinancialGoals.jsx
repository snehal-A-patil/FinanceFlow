import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

const FinancialGoals = () => {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState({
    id: null,
    name: '',
    targetAmount: '',
    savedAmount: '',
    deadline: ''
  });

  // Fetch goals from the backend when the component mounts
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/goals');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setGoals(data);
      } catch (error) {
        console.error('Error fetching goals:', error);
      }
    };

    fetchGoals();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    setNewGoal({ ...newGoal, [e.target.name]: e.target.value });
  };

  const handleSaveGoal = async (e) => {
    e.preventDefault();

    try {
      let response;
      if (newGoal.id) {
        // Update existing goal
        response = await fetch(`http://localhost:5000/api/goals/${newGoal.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newGoal),
        });
      } else {
        // Add new goal
        response = await fetch('http://localhost:5000/api/goals', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newGoal),
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newGoalData = await response.json();
      if (newGoal.id) {
        setGoals(goals.map((goal) => (goal._id === newGoal.id ? newGoalData : goal)));
      } else {
        setGoals([...goals, newGoalData]);
      }

      // Reset form
      setNewGoal({ id: null, name: '', targetAmount: '', savedAmount: '', deadline: '' });
    } catch (error) {
      console.error('Error saving goal:', error);
      alert('An error occurred while saving the goal. Please try again.');
    }
  };

  // Delete a goal
  const handleDeleteGoal = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/goals/${id}`, {
        method: 'DELETE',
      });
      setGoals(goals.filter((goal) => goal._id !== id));
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  };

  // Edit a goal
  const handleEditGoal = (goal) => {
    setNewGoal({ ...goal, id: goal._id });
  };

  const calculateProgress = (savedAmount, targetAmount) => {
    const progress = (savedAmount / targetAmount) * 100;
    return Math.min(progress, 100).toFixed(2);
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6 bg-gray-100 ml-64">
        <h1 className="text-3xl font-bold mb-6">Financial Goals</h1>

        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">{newGoal.id ? 'Edit Goal' : 'Add a New Goal'}</h2>
          <form onSubmit={handleSaveGoal} className="space-y-4">
            <div>
              <label className="block font-semibold mb-2">Goal Name</label>
              <input
                type="text"
                name="name"
                value={newGoal.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                placeholder="E.g., Buy a House"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Target Amount (₹)</label>
              <input
                type="number"
                name="targetAmount"
                value={newGoal.targetAmount}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                placeholder="E.g., 2000000"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Saved Amount (₹)</label>
              <input
                type="number"
                name="savedAmount"
                value={newGoal.savedAmount}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                placeholder="E.g., 500000"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Deadline</label>
              <input
                type="date"
                name="deadline"
                value={newGoal.deadline}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              {newGoal.id ? 'Update Goal' : 'Add Goal'}
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Your Goals</h2>
          {goals.length === 0 ? (
            <p>No financial goals set yet. Start by adding one!</p>
          ) : (
            <ul>
              {goals.map((goal) => (
                <li key={goal._id} className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-lg">{goal.name}</span>
                    <span className="font-semibold text-green-500">
                      ₹{goal.savedAmount} / ₹{goal.targetAmount}
                    </span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                    <div
                      className="bg-green-500 h-4 rounded-full"
                      style={{ width: `${calculateProgress(goal.savedAmount, goal.targetAmount)}%` }}
                    ></div>
                  </div>

                  <div className="text-sm text-gray-500">
                    Progress: {calculateProgress(goal.savedAmount, goal.targetAmount)}%
                    <br />
                    Deadline: {new Date(goal.deadline).toLocaleDateString()}
                  </div>

                  <div className="mt-4 flex space-x-4">
                    <button
                      onClick={() => handleEditGoal(goal)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteGoal(goal._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinancialGoals;
