import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {firestore, auth} from "../firebaseConfig";
import { addDoc, collection, Timestamp } from '@firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import './CreateanAccount.css';
/**/
function CreateanAccount() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const userNameRef = useRef();
  const emailRef = useRef();
  const buildingNameRef = useRef();
  const AddressRef = useRef();
  const cityAddressRef = useRef();
  const stateRef = useRef();
  const countryRef = useRef();
  const zipCodeRef = useRef();
  const ref = collection(firestore, "users");

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle account creation logic here
    try {
        await createUserWithEmailAndPassword(auth, email, password);
    } catch(e) {
        console.log('Account creation error:', e)
    }
    console.log('Account created:', { username, email, password, confirmPassword });

    let data = {
        Username: userNameRef.current.value,
        Email: emailRef.current.value,
        BuildingName: buildingNameRef.current.value,
        StreetAddress: AddressRef.current.value,
        City: cityAddressRef.current.value,
        State: stateRef.current.value,
        Country: countryRef.current.value,
        ZipCode: zipCodeRef.current.value,
        AccountCreation_timestamp: Timestamp.now(),
    };

    try {
      await addDoc(ref, data); // Add document to "contact-us" collection
      console.log('Data added successfully:', data);

      // Attempt to navigate to the main page
      navigate('/Main');

      // Check if navigation didn't occur and alert if necessary
      setTimeout(() => {
        if (window.location.pathname !== '/Main') {
          alert('Redirection failed. Please try again.');
        }
      }, 1000); // 1 second delay to verify navigation
    } catch (e) {
      console.log('Error adding document:', e);
      alert('There was an error creating your account. Please try again.');
    }
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
            ref={userNameRef}
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
            ref={emailRef}
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
          <label htmlFor="optionalInfo">This part of the form is optional*</label>
        </div>
        <input type="text" ref={buildingNameRef} id="buildingName" placeholder="Enter Here" />

        <div className="address-section">
          <h3>Address</h3>
          
          <div className="address-inputs">
            <div className="form-group">
              <label htmlFor="street">Street</label>
              <input type="text" ref={AddressRef} id="street" placeholder="Enter Here" />
            </div>

            <div>
              <label htmlFor="city">City</label>
              <input type="text" ref={cityAddressRef} id="city" placeholder="Enter Here" />
            </div>

            <div>
              <label htmlFor="state">State</label>
              <input type="text" ref={stateRef} id="state" placeholder="Enter Here" />
            </div>

            <div>
              <label htmlFor="country">Country</label>
              <input type="text" ref={countryRef} id="country" placeholder="Enter Here" />
            </div>

            <div>
              <label htmlFor="zipCode">ZIP Code</label>
              <input type="text" ref={zipCodeRef} id="zipCode" placeholder="Enter Here" />
            </div>
          </div>
        </div>

        <button type="submit" className="create-account-button">Create Account</button>
        <a href="/" className="cancel-link">Cancel</a>
      </form>
    </div>
  );
}

export default CreateanAccount;
