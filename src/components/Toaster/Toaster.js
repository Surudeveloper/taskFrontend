// Toaster.js
import React, { useEffect } from 'react';
import './Toaster.css';

const Toaster = ({ message, onClose }) => {
    useEffect(() => {
      const timer = setTimeout(onClose, 3000); // Auto-close toaster after 3 seconds
      return () => clearTimeout(timer); // Cleanup timer on component unmount
    }, [onClose]);
  
    return (
      <div className="toaster">
        <div className="toaster-content">
          <span className="toaster-icon">⚠️</span>
          <p className="toaster-message">{message}</p>
        </div>
        <button onClick={onClose} className="toaster-close-button">✕</button>
      </div>
    );
  };
  

export default Toaster;
