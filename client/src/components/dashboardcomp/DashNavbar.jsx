import React from 'react';
import { Link } from 'react-router-dom';

const DashNavbar = () => {
  return (
    <nav className="bg-gray-800 p-4 shadow-lg">
      <div className="container mx-auto flex justify-end items-center">
        <div className="flex space-x-6"> 
          <Link to="/" className="text-white hover:text-gray-300 transition-colors duration-200">Home</Link>
          <Link to="/profile" className="text-white hover:text-gray-300 transition-colors duration-200">Profile</Link>
        </div>
      </div>
    </nav>
  );
};

export default DashNavbar;
