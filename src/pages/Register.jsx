import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess('');
    
    let currentErrors = {};

    // Basic Validations
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      currentErrors.email = 'Invalid email format';
    }
    
    if (formData.password.length < 6) {
      currentErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      currentErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.termsAccepted) {
      currentErrors.termsAccepted = 'You must accept the terms and conditions';
    }

    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      return;
    }

    setSuccess('Registration successful! Redirecting to login...');
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  return (
    <div className="max-w-md w-full mx-auto bg-white p-8 border border-gray-200 rounded-lg shadow-md mt-10" data-testid="register-container">
      <h2 className="text-2xl font-bold mb-6 text-center" data-testid="register-heading">Register</h2>
      
      {success && (
        <div className="bg-green-100 text-green-700 p-3 rounded mb-4" data-testid="register-success-message">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} data-testid="register-form">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="fullName" data-testid="fullname-label">Full Name</label>
          <input 
            type="text" 
            id="fullName" 
            name="fullName"
            data-testid="register-fullname-input"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email" data-testid="register-email-label">Email Address</label>
          <input 
            type="email" 
            id="email" 
            name="email"
            data-testid="register-email-input"
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : ''}`}
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="text-red-500 text-sm mt-1" data-testid="register-email-error">{errors.email}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="password" data-testid="register-password-label">Password</label>
          <input 
            type="password" 
            id="password" 
            name="password"
            data-testid="register-password-input"
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? 'border-red-500' : ''}`}
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p className="text-red-500 text-sm mt-1" data-testid="register-password-error">{errors.password}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="confirmPassword" data-testid="confirm-password-label">Confirm Password</label>
          <input 
            type="password" 
            id="confirmPassword" 
            name="confirmPassword"
            data-testid="register-confirm-password-input"
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.confirmPassword ? 'border-red-500' : ''}`}
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm mt-1" data-testid="register-confirm-password-error">{errors.confirmPassword}</p>}
        </div>

        <div className="mb-6 flex items-center">
          <input
            type="checkbox"
            id="termsAccepted"
            name="termsAccepted"
            data-testid="register-terms-checkbox"
            className="mr-2"
            checked={formData.termsAccepted}
            onChange={handleChange}
          />
          <label htmlFor="termsAccepted" className="text-gray-700 text-sm" data-testid="terms-label">
            I accept the Terms and Conditions
          </label>
        </div>
        {errors.termsAccepted && <p className="text-red-500 text-sm mb-4 mt-[-1rem]" data-testid="register-terms-error">{errors.termsAccepted}</p>}

        <button
          type="submit"
          data-testid="register-submit-btn"
          className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none flex justify-center items-center"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
