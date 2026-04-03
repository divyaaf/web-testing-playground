import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    
    // Simulate Authentication with Delay
    setLoading(true);
    const delay = Math.floor(Math.random() * 2000) + 1000; // 1 to 3 seconds

    setTimeout(() => {
      if (email === 'qa@test.com' && password === 'password123') {
        setLoading(false);
        navigate('/dashboard');
      } else {
        setLoading(false);
        setError('Invalid email or password');
      }
    }, delay);
  };

  return (
    <div className="max-w-md w-full mx-auto bg-white p-8 border border-gray-200 rounded-lg shadow-md mt-10" data-testid="login-container">
      <h2 className="text-2xl font-bold mb-6 text-center" data-testid="login-heading">Login</h2>
      <div className="mb-2 text-sm text-gray-500" data-testid="login-hint">
        Hint: Use <strong>qa@test.com</strong> / <strong>password123</strong>
      </div>
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4" data-testid="login-error-message">
          {error}
        </div>
      )}
      <form onSubmit={handleLogin} data-testid="login-form">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email" data-testid="email-label">Email Address</label>
          <input 
            type="email" 
            id="email" 
            data-testid="login-email-input"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="password" data-testid="password-label">Password</label>
          <input 
            type="password" 
            id="password" 
            data-testid="login-password-input"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          data-testid="login-submit-btn"
          disabled={loading}
          className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none flex justify-center items-center"
        >
          {loading ? (
            <svg data-testid="login-spinner" className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            'Login'
          )}
        </button>
      </form>
    </div>
  );
};

export default Login;