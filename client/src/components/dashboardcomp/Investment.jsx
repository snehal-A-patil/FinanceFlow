import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

function Investment() {
  const [investments, setInvestments] = useState([]);
  const [newInvestment, setNewInvestment] = useState({
    type: '',
    name: '',
    amountInvested: '',
    currentValue: '',
    unitsOwned: '',
    id: '', // To store investment ID for editing
  });
  const [isEditing, setIsEditing] = useState(false);

  const investmentTypes = ['Stocks', 'Mutual Funds', 'Real Estate', 'Cryptocurrency', 'Bonds'];

  // Fetch investments for the logged-in user
  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
        const response = await fetch('http://localhost:5000/api/investments', {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in request header
          },
        });
        
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setInvestments(data);
      } catch (error) {
        console.error('Error fetching investments:', error);
      }
    };

    fetchInvestments();
  }, []);

  // Function to add or update investments
  const addOrUpdateInvestment = async () => {
    const investmentData = {
      type: newInvestment.type,
      name: newInvestment.name,
      amountInvested: Number(newInvestment.amountInvested) || 0,
      currentValue: Number(newInvestment.currentValue) || 0,
      unitsOwned: Number(newInvestment.unitsOwned) || 0,
    };

    try {
      const token = localStorage.getItem('token');
      let response;

      if (isEditing) {
        response = await fetch(`http://localhost:5000/api/investments/${newInvestment.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(investmentData),
        });
      } else {
        response = await fetch('http://localhost:5000/api/investments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(investmentData),
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Network response was not ok');
      }

      const newInvestmentResponse = await response.json();
      if (isEditing) {
        setInvestments(investments.map(i => (i._id === newInvestmentResponse._id ? newInvestmentResponse : i)));
      } else {
        setInvestments(prev => [...prev, newInvestmentResponse]);
      }
      resetForm();
    } catch (error) {
      console.error('Error adding/updating investment:', error);
    }
  };

  const resetForm = () => {
    setNewInvestment({
      type: '',
      name: '',
      amountInvested: '',
      currentValue: '',
      unitsOwned: '',
      id: '',
    });
    setIsEditing(false);
  };

  const renderInvestmentOverview = () => {
    return investments.map(investment => (
      <div key={investment._id} className="bg-white shadow-md rounded-lg p-4 mb-4">
        <h4 className="font-bold">{investment.name} ({investment.type})</h4>
        <p>Amount Invested: ₹{investment.amountInvested.toFixed(2)}</p>
        <p>Current Value: ₹{investment.currentValue.toFixed(2)}</p>
        <p>Units Owned: {investment.unitsOwned}</p>
        <button 
          onClick={() => {
            setNewInvestment({
              type: investment.type,
              name: investment.name,
              amountInvested: investment.amountInvested,
              currentValue: investment.currentValue,
              unitsOwned: investment.unitsOwned,
              id: investment._id, // Set ID for editing
            });
            setIsEditing(true);
          }}
          className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 ml-2"
        >
          Edit
        </button>
      </div>
    ));
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100 ml-64">
        <h1 className="text-3xl font-bold mb-6 text-center">Investment Overview</h1>

        {/* Add New Investment Form */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h3 className="font-bold mb-4 text-lg">{isEditing ? 'Edit Investment' : 'Add New Investment'}</h3>
          <div className="mb-4">
            <label className="block font-bold mb-2">Investment Type:</label>
            <select
              value={newInvestment.type}
              onChange={(e) => setNewInvestment({ ...newInvestment, type: e.target.value })}
              className="border p-2 rounded w-full"
            >
              <option value="">Select Investment Type</option>
              {investmentTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">Investment Name:</label>
            <input
              type="text"
              value={newInvestment.name}
              onChange={(e) => setNewInvestment({ ...newInvestment, name: e.target.value })}
              className="border p-2 rounded w-full"
              placeholder="Enter investment name"
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">Amount Invested (INR):</label>
            <input
              type="number"
              value={newInvestment.amountInvested}
              onChange={(e) => setNewInvestment({ ...newInvestment, amountInvested: e.target.value })}
              className="border p-2 rounded w-full"
              placeholder="Enter amount invested"
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">Current Value (INR):</label>
            <input
              type="number"
              value={newInvestment.currentValue}
              onChange={(e) => setNewInvestment({ ...newInvestment, currentValue: e.target.value })}
              className="border p-2 rounded w-full"
              placeholder="Enter current value"
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">Units Owned:</label>
            <input
              type="number"
              value={newInvestment.unitsOwned}
              onChange={(e) => setNewInvestment({ ...newInvestment, unitsOwned: e.target.value })}
              className="border p-2 rounded w-full"
              placeholder="Enter units owned"
            />
          </div>
          <button onClick={addOrUpdateInvestment} className="bg-green-500 text-white p-2 rounded">
            {isEditing ? 'Update Investment' : 'Add Investment'}
          </button>
        </div>

        {/* Investment Overview */}
        {renderInvestmentOverview()}
      </div>
    </div>
  );
}

export default Investment;
