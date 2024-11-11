import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice'; 
import { useNavigate } from 'react-router-dom';
import './Login.css'; 
import Loader from '../components/Loader/loader';
import Toaster from '../components/Toaster/Toaster';
const url = 'http://localhost:8191'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isShowLoader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoader(true)
      const userData = { email, password };
      const Result = await fetch(`${url}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (Result.ok) {
        const data = await Result.json();
        const token = data.token;
        dispatch(login({ email, password , role:data.role }));
        navigate('/dashboard'); 
        localStorage.setItem('token', token);
        localStorage.setItem('role', data.role);
      } else {
        setError('Login failed. Please check your credentials.');
      }
      
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoader(false)
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-heading">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field"
              placeholder="Enter your email"
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field"
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
        <div className="footer-text">
          <p>Don't have an account? <a href="/signup">Sign up</a></p>
        </div>
      </div>
        {error && <Toaster message={error} onClose={() => setError('')} />}
        {isShowLoader && <Loader/>}
    </div>
  );
};

export default Login;
