import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./signup.css"; 
import Toaster from '../components/Toaster/Toaster';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const url = 'http://localhost:8191'


const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginClick = () =>{
    navigate('/login')
  }

  const handleSignup = async (e) => {
    e.preventDefault();
    const userData = { name, email, password };

    try {
      console.log("Signing up:", userData);
      const response = await fetch(`${url}/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if(response.ok && !data.error){
        navigate('/login'); 
        toast.success('Signup successful! You can now log in.');
      } else {
        // setError(`Register failed. ${data.error}. Please try again.`);
        toast.error(data.error || 'Signup failed');
      }
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="button-container">
          <button type="submit" className="btn btn-primary">Sign Up</button>
          <button onClick={handleLoginClick} className="btn-dashboard">Go to Login</button>
        </div>
      </form>
      {error && <Toaster message={error} onClose={() => setError('')} />}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default Signup;
