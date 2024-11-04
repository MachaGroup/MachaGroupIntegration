import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateanAccount.css';

function CreateanAccount() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle account creation logic here
    console.log('Account created:', { username, email, password, confirmPassword });
  };

  return (
    <div className="create-account-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        ←
      </button>
      <h1 className="create-account-title">Create Account</h1>
      
      <form onSubmit={handleSubmit} className="account-form">
        {/* User Information Fields */}
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

       <div>
        <label htmlfor="This part of the form is optional">This part of the form is optional</label>
       </div>
        {/* Existing Form Fields */}
        <label htmlFor="schoolName">School Name</label>
        <input type="text" id="schoolName" placeholder="Enter Here" />

        <div className="address-section">
          <h3>Address</h3>
          
          <div className="address-inputs">
            <div>
              <label htmlFor="street">Street</label>
              <input type="text" id="street" placeholder="Enter Here" />
            </div>

            <div>
              <label htmlFor="city">City</label>
              <input type="text" id="city" placeholder="Enter Here" />
            </div>

            <div>
              <label htmlFor="state">State</label>
              <input type="text" id="state" placeholder="Enter Here" />
            </div>

            <div>
              <label htmlFor="country">Country</label>
              <input type="text" id="country" placeholder="Enter Here" />
            </div>

            <div>
              <label htmlFor="zipCode">ZIP Code</label>
              <input type="text" id="zipCode" placeholder="Enter Here" />
            </div>
          </div>
        </div>

        <button type="submit" className="create-account-button">Create Account</button>
        <a href="/" className="skip-link">Skip for now</a>
        <a href="/" className="cancel-link">Cancel</a>
      </form>
    </div>
  );
}

export default CreateanAccount;

