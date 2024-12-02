import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Login.css';
import logo from '../assets/MachaLogo.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handleLogin = (e) => {
    e.preventDefault();
    // Add logic for handling login (e.g., Firebase Authentication)
    console.log('Email:', email);
    console.log('Password:', password);
  };

  const handleCreateanAccount = () => {
    // Redirect to CreateAccount page
    navigate('/CreateanAccount'); // Assumes the route path is "/create-account"
  };

  return (
    <div className="login-container">
      {/* Logo image */}
      <img src={logo} alt="Logo" className="logo" />

      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit">Login</button>

        {/* or text */}
        <p className="or-text">or</p>

        {/* Create Account button */}
        <button type="button" onClick={handleCreateanAccount}>Create an Account</button>
      </form>
    </div>
  );
}

export default Login;
