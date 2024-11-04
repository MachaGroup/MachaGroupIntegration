import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateanAccount.css';

function CreateAccount() {
  const navigate = useNavigate();

  return (
    <div className="create-account-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        ←
      </button>
      <h1 className="create-account-title">Create Account</h1>
      
      <form className="account-form">
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

export default CreateAccount;
