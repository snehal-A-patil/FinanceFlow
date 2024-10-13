import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link to="/" className="hover:text-gray-400">FinanceFlow</Link>
        </div>
        <ul className="flex space-x-6">
          <li>
            <Link to="/login" className="hover:text-gray-400">Login</Link>
          </li>
          <li>
            <Link to="/signup" className="hover:text-gray-400">Sign Up</Link>
          </li>
          <li>
            <Link to="/login" className="hover:text-gray-400">Dashboard</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
