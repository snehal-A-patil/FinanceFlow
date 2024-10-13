import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State for error messages
  const [loading, setLoading] = useState(false); // State for loading indication
  const navigate = useNavigate(); // Initialize navigate function

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error state before login attempt
    setLoading(true); // Start loading state

    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json(); // Get error message from response
        throw new Error(errorData.message || 'Login failed'); // Provide more context for the error
      }

      const data = await response.json();
      console.log('Login successful:', data);
      localStorage.setItem('token', data.token); // Store the token for authentication

      // Redirect to the dashboard after successful login
      navigate('/dashboard'); // Use navigate to redirect to the dashboard
    } catch (error) {
      setError(error.message); // Set error state with the error message
      console.error('Error during login:', error.message);
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login to FinanceFlow</h2>
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-2 ${loading ? 'bg-gray-400' : 'bg-blue-500'} text-white font-bold rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out`}
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-500 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
