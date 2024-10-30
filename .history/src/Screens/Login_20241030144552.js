import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import './Login.css';
import logo from '../assets/MachaLogo.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful');
      navigate('/main');  // Redirect to the main screen on successful login
    } catch (error) {
      console.error('Error logging in:', error.message);
      // Optionally, display an error message to the user here
    }
  };

  const handleCreateAccount = () => {
    navigate('/create-account');  // Redirect to the create account page
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
