import React, { useEffect, useState } from 'react';
import Sidebar from '../components/dashboardcomp/Sidebar';
import Chart from '../components/dashboardcomp/chart';
import DashNavbar from '../components/dashboardcomp/DashNavbar';

const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from local storage
        const response = await fetch('http://localhost:5000/api/transactions', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Send token for authentication
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch transactions');
        }

        const transactions = await response.json();
        setRecentTransactions(transactions);

        // Calculate the balance based on transactions
        const calculatedBalance = transactions.reduce((acc, transaction) => {
          return acc + transaction.amount; // Add income and subtract expenses
        }, 0);
        setBalance(calculatedBalance);

      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchData();
  }, []);

  // Helper function to format amounts
  const formatAmount = (amount) => {
    return `₹${Math.abs(amount).toLocaleString()}`;
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100 ml-64">
        <DashNavbar />
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-xl font-semibold mb-2">Account Balance</h2>
          <p className="text-3xl font-bold text-green-500">₹{balance.toLocaleString()}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
          <ul>
            {recentTransactions.map((transaction) => (
              <li key={transaction._id} className="flex justify-between mb-3">
                <span>{transaction.description}</span>
                <span className="text-gray-500">
                  {new Date(transaction.date).toLocaleDateString()}
                </span>
                <span className={`font-bold ${transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}`}>
                  {transaction.amount < 0 ? '-' : '+'} {formatAmount(transaction.amount)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Expense Overview</h2>
          <Chart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
