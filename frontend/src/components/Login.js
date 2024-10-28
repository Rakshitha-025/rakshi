import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
import './Login.css';

function Login() {
  const [username, setUsername] = useState(''); // Assuming username is still needed
  const [email, setEmailid] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(''); // Reset error message

    try {
      // Make a POST request to the backend API
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      // Handle successful login (you can customize this part based on your needs)
      alert('Login successful'); // You might want to replace this with a nicer notification

      // Save the token if your backend returns it (assuming your response returns a token)
      localStorage.setItem('token', response.data.token); // Store token in localStorage
      navigate('/MenuPage'); // Redirect to the main page after successful login
    } catch (error) {
      // Handle error (show message)
      setError('Login failed, please check your credentials');
      console.error('Login error:', error);
    }
  };

  return (
    <div className='container'>
      <h1>Login</h1>
      <form onSubmit={handleLogin} className="form">
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
            placeholder='Enter your registered email id'
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
        {error && <p className="error">{error}</p>}
        <button type="submit" className="button">Login</button>
        <p className="link">
          Don't have an account? <Link to="/signup" style={{ color: 'white' }} >Sign up</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
