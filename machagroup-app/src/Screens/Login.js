import React, { useState } from 'react';
import './Login.css';  // Assume the CSS is already updated
import logo from '../assets/MachaLogo.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Add logic for handling login (e.g., Firebase Authentication)
    console.log('Email:', email);
    console.log('Password:', password);
  };

  const handleCreateAccount = () => {
    // Add logic for handling account creation
    console.log('Redirect to Create Account');
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
        <button type="button" onClick={handleCreateAccount}>Create an Account</button>
      </form>

    </div>
  );
}

export default Login;
