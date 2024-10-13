import React, { useState } from 'react';
import Sidebar from './Sidebar';
import PortfolioChart from './PortfolioChart';
import Transactions from './Transactions';
import { Link } from 'react-router-dom';

function Investment() {
  // State to manage new investment details
  const [newInvestment, setNewInvestment] = useState({
    type: '',
    name: '',
    amountInvested: 0,
    currentValue: 0,
    returnPercentage: 0,
  });

  // State to store the list of investments
  const [investments, setInvestments] = useState([]);

  // List of investment types
  const investmentTypes = ['Stocks', 'Mutual Funds', 'Real Estate', 'Cryptocurrency', 'Bonds'];

  // Handle input changes for the investment form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInvestment((prev) => ({ ...prev, [name]: value }));
  };

  // Handle adding a new investment
  const handleAddInvestment = (e) => {
    e.preventDefault();
    // Validation to ensure all fields are filled
    if (!newInvestment.type || !newInvestment.name || !newInvestment.amountInvested || !newInvestment.currentValue || !newInvestment.returnPercentage) {
      alert("Please fill out all fields correctly.");
      return;
    }
    // Add the new investment to the investments list
    setInvestments((prev) => [...prev, newInvestment]);
    // Reset the input fields
    setNewInvestment({
      type: '',
      name: '',
      amountInvested: 0,
      currentValue: 0,
      returnPercentage: 0,
    });
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6 bg-gray-100 ml-64">
        <h1 className="text-3xl font-bold mb-6">Investment Portfolio</h1>

        {/* Investment Input Form */}
        <div className="mb-6 bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Add New Investment</h2>
          <form onSubmit={handleAddInvestment}>
            <div className="flex flex-col mb-4">
              <label className="mb-1" htmlFor="type">Select Investment Type:</label>
              <select
                name="type"
                id="type"
                value={newInvestment.type}
                onChange={handleInputChange}
                className="p-2 border rounded mb-2"
                required
              >
                <option value="" disabled>Select Investment Type</option>
                {investmentTypes.map((type, index) => (
                  <option key={index} value={type}>{type}</option>
                ))}
              </select>

              <label className="mb-1" htmlFor="name">Investment Name:</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="e.g., Apple Stock"
                value={newInvestment.name}
                onChange={handleInputChange}
                className="border rounded p-2 mb-2"
                required
              />

              <label className="mb-1" htmlFor="amountInvested">Amount Invested (INR):</label>
              <input
                type="number"
                name="amountInvested"
                id="amountInvested"
                placeholder="e.g., 10000"
                value={newInvestment.amountInvested}
                onChange={handleInputChange}
                className="border rounded p-2 mb-2"
                required
              />

              <label className="mb-1" htmlFor="currentValue">Current Value (INR):</label>
              <input
                type="number"
                name="currentValue"
                id="currentValue"
                placeholder="e.g., 12000"
                value={newInvestment.currentValue}
                onChange={handleInputChange}
                className="border rounded p-2 mb-2"
                required
              />

              <label className="mb-1" htmlFor="returnPercentage">Expected Return (%):</label>
              <input
                type="number"
                name="returnPercentage"
                id="returnPercentage"
                placeholder="e.g., 15"
                value={newInvestment.returnPercentage}
                onChange={handleInputChange}
                className="border rounded p-2 mb-2"
                required
              />

              <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">
                Add Investment
              </button>
            </div>
          </form>
        </div>

        {/* Investment Breakdown */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Investment Breakdown</h2>
          <ul>
            {investments.map((inv, index) => (
              <li key={index} className="mb-4">
                <span className="font-semibold text-lg">{inv.name} ({inv.type})</span>
                <span className="ml-2">
                  <span className="font-bold text-green-500">₹{inv.currentValue}</span>
                  <span className="text-gray-500"> (₹{inv.amountInvested} invested)</span>
                  <span className="ml-2 text-sm text-gray-600">({inv.returnPercentage >= 0 ? '+' : ''}{inv.returnPercentage}%)</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Additional Content Like Portfolio Chart and Transactions can follow here */}
        <PortfolioChart investments={investments} />
        <Transactions transactions={recentTransactions} />
      </div>
    </div>
  );
}

export default Investment;
