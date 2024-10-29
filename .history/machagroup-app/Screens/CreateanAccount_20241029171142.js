import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {firestore} from "../firebaseConfig";
import { addDoc, collection } from '@firebase/firestore';
import './CreateanAccount.css';
 
function CreateanAccount() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const buildingNameRef = useRef();
  const streetAddressRef = useRef();
  const cityAddressRef = useRef();
  const stateRef= useRef();
  const countryRef = useRef();
  const zipCodeRef = useRef();
  const ref = collection(firestore, "users")
 
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle account creation logic here
    console.log('Account created:', { username, email, password, confirmPassword });
 
    let data = {
        Username: userNameRef.current.value,
        Email: emailRef.current.value,
        Password: passwordRef.current.value,
        ConfirmPassword: confirmPasswordRef.current.value,
        BuildingName: buildingNameRef.current.value,
        StreetAddress: streetAddressRef.current.value,
        City: cityAddressRef.current.value,
        State: stateRef.current.value,
        Country: countryRef.current.value,
        ZipCode: zipCodeRef.current.value,
    };
 
    try {
        addDoc(ref, data);
    } catch(e) {
        console.log(e)
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
            ref={passwordRef}
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
            ref={confirmPasswordRef}
            id="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
 
       <div>
        <label htmlfor="This part of the form is optional">This part of the form is optional*</label>
       </div>
        {/* Existing Form Fields */}
        <div>
        <label htmlFor="buildingName">Building Name</label>
        </div>
        <input type="text" ref={buildingNameRef} id="buildingName" placeholder="Enter Here" />
 
        <div className="address-section">
          <h3>Address</h3>
         
          <div className="address-inputs">
            <div>
              <label htmlFor="street">Street</label>
              <input type="text" ref={streetAddressRef} id="street" placeholder="Enter Here" />
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
 