import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css'; // Import custom CSS for styling

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleDashboardClick = () => {
    navigate('/dashboard');
  };

  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1 className="landing-title">Welcome to Our Product Management App</h1>
        <p className="landing-description">
          Manage your products with ease! Track, add, and update product details in a simple and intuitive interface.
        </p>
        <div className="button-container">
          <button onClick={handleLoginClick} className="btn-login">Login</button>
          <button onClick={handleDashboardClick} className="btn-dashboard">Go to Dashboard</button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
