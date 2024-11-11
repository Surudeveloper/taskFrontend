import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token')
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-logo">
        <Link to="/">MyApp</Link>
      </div>
      <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <Link to="/dashboard">Home</Link>
        <Link to="/product-list">Product List</Link>
        {user.role === 'admin' && <Link to="/product-form">Add Product</Link>}
        {isAuthenticated ? (
          <div className="user-menu">
            <img src={user.profilePicture || 'https://www.kasandbox.org/programming-images/avatars/cs-hopper-cool.png'} alt="User" className="user-avatar" />
            <div className="dropdown">
              {/* <button className="dropdown-btn">{user.name}</button> */}
              <button className="dropdown-btn">Account</button>
              <div className="dropdown-content">
                {/* <button onClick={() => navigate('/settings')}>Settings</button> */}
                <button onClick={handleLogout}>Logout</button>
              </div>
            </div>
          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
      <button className="menu-toggle" onClick={toggleMenu}>
        &#9776;
      </button>
    </header>
  );
};

export default Header;
