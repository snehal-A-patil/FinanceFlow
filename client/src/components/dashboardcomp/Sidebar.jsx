import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-64 h-screen p-5 fixed top-0 left-0">
      <h2 className="text-2xl font-bold text-center mb-8">FinanceFlow</h2>
      <ul>
        <li>
          <Link
            to="/dashboard"
            className="block py-2 px-4 rounded hover:bg-gray-600 transition duration-300 ease-in-out"
          >
            Dashboard
          </Link>
        </li>
        <li>
  <Link
    to="/budgets"
    className="block py-2 px-4 rounded hover:bg-gray-600 transition duration-300 ease-in-out"
  >
    Budgets
  </Link>
</li>
<li>
  <Link
    to="/investments"
    className="block py-2 px-4 rounded hover:bg-gray-600 transition duration-300 ease-in-out"
  >
    Investments
  </Link>
</li>


        <li>
          <Link
            to="/transactions"
            className="block py-2 px-4 rounded hover:bg-gray-600 transition duration-300 ease-in-out"
          >
            Transactions
          </Link>
        </li>
        <li>
          <Link
            to="/goals"
            className="block py-2 px-4 rounded hover:bg-gray-600 transition duration-300 ease-in-out"
          >
            Financial Goals
          </Link>
        </li>
        <li>
          <Link
            to="/settings"
            className="block py-2 px-4 rounded hover:bg-gray-600 transition duration-300 ease-in-out"
          >
            Settings
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
