import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import './Login.css';
import logo from '../assets/MachaLogo.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/Main');
      }
    });
    return () => unsubscribe();
  }, [auth, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful');
      navigate('/Main');
    } catch (error) {
      console.error('Error logging in:', error.message);
      if (error.code === 'auth/user-not-found') {
        alert('No user found with that email');
      } else if (error.code === 'auth/wrong-password') {
        alert('Incorrect password.');
      } else {
        alert('An error occurred. Please try again later');
      }
    }
  };

  const handleCreateanAccount = () => {
    navigate('/CreateanAccount');
  };

  const handleForgotPassword = () => {
    navigate('/ForgotPassword');
  };

  return (
    <div className="login-container">
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

        <button type="button" onClick={handleCreateanAccount}>Create an Account</button>
      </form>

      {/* Forgot Password link - moved below the form */}
      <p className="forgot-password-text">
        <button type="button" className="forgot-password-link" onClick={handleForgotPassword}>
          Forgot Password?
        </button>
      </p>
    </div>
  );
}

export default Login;


