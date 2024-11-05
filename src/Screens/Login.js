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

  // Check if the user is already logged in on component mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in, redirect to the main screen
        navigate('/Main');
      } else {
        // User is not logged in, stay on the login page
        // You might want to display a login form here
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful');
      navigate('/Main');  // Redirect to the main screen on successful login
    } catch (error) {
      console.error('Error logging in:', error.message);
      // Optionally, display an error message to the user here
      if (error.code == 'auth/user-not-found') {
        alert('No user found with that email')
      } else if (error.code == 'auth/wrong-password') {
        alert('Incorrect password.')
      } else {
        alert('An error occurred. Please try again later')
      }
    }
  };

  const handleCreateanAccount = () => {
    navigate('/CreateanAccount');  // Redirect to the create account page
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
