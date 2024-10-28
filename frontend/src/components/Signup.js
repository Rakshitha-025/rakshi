// src/components/Signup.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
import './Signup.css';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmailid] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    setError('');

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Prepare data for the API call
    const userData = {
      username,
      email,
      password,
    };

    try {
      // Make API call to sign up the user
      const response = await axios.post('http://localhost:5000/api/auth/signup', userData);
      alert('User created successfully');
      navigate('/login'); // Redirect to login page on success
    } catch (error) {
      setError('Signup failed, please try again');
      console.error('Signup error:', error);
    }
  };

  return (
    <div className="container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSignup} className="form">
        <div className="inputGroup">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            placeholder='Enter your username'
            onChange={(e) => setUsername(e.target.value)}
            className="input"
            required
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            placeholder='Enter your email'
            onChange={(e) => setEmailid(e.target.value)}
            className="input"
            required
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            placeholder='Enter your password'
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            required
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            placeholder='Re-enter your password'
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input"
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="button">Sign Up</button>
        <p className="link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
