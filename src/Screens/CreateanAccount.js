import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import { firestore } from "../firebaseConfig";  // Import Firestore config
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
=======
import {firestore, auth} from "../firebaseConfig";
import { addDoc, collection, Timestamp } from '@firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
>>>>>>> 1ad06898d43e67f7144c15e8fc9cf79d92079f77
import './CreateanAccount.css';

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
<<<<<<< HEAD
  const ref = collection(firestore, "users"); // Use "users" collection

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = {
      Username: userNameRef.current.value,
      Email: emailRef.current.value,
      BuildingName: buildingNameRef.current.value,
      StreetAddress: AddressRef.current.value,
      City: cityAddressRef.current.value,
      State: stateRef.current.value,
      Country: countryRef.current.value,
      ZipCode: zipCodeRef.current.value,
=======
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
        Timestamp: Timestamp.now(),
>>>>>>> 1ad06898d43e67f7144c15e8fc9cf79d92079f77
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
<<<<<<< HEAD

=======
      
>>>>>>> 1ad06898d43e67f7144c15e8fc9cf79d92079f77
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

<<<<<<< HEAD
=======
       <div>
        <label htmlfor="This part of the form is optional">This part of the form is optional*</label>
       </div>
        {/* Existing Form Fields */}
>>>>>>> 1ad06898d43e67f7144c15e8fc9cf79d92079f77
        <div>
          <label htmlFor="optionalInfo">This part of the form is optional*</label>
        </div>
<<<<<<< HEAD

        <div className="form-group">
          <label htmlFor="buildingName">Building Name</label>
          <input type="text" ref={buildingNameRef} id="buildingName" placeholder="Enter Here" />
        </div>

        <div className="address-section">
          <h3>Address</h3>

=======
        <input type="text" ref={buildingNameRef} id="buildingName" placeholder="Enter Here" />

        <div className="address-section">
          <h3>Address</h3>
          
>>>>>>> 1ad06898d43e67f7144c15e8fc9cf79d92079f77
          <div className="address-inputs">
            <div className="form-group">
              <label htmlFor="street">Street</label>
              <input type="text" ref={AddressRef} id="street" placeholder="Enter Here" />
            </div>

<<<<<<< HEAD
            <div className="form-group">
=======
            <div>
>>>>>>> 1ad06898d43e67f7144c15e8fc9cf79d92079f77
              <label htmlFor="city">City</label>
              <input type="text" ref={cityAddressRef} id="city" placeholder="Enter Here" />
            </div>

<<<<<<< HEAD
            <div className="form-group">
=======
            <div>
>>>>>>> 1ad06898d43e67f7144c15e8fc9cf79d92079f77
              <label htmlFor="state">State</label>
              <input type="text" ref={stateRef} id="state" placeholder="Enter Here" />
            </div>

<<<<<<< HEAD
            <div className="form-group">
=======
            <div>
>>>>>>> 1ad06898d43e67f7144c15e8fc9cf79d92079f77
              <label htmlFor="country">Country</label>
              <input type="text" ref={countryRef} id="country" placeholder="Enter Here" />
            </div>

<<<<<<< HEAD
            <div className="form-group">
=======
            <div>
>>>>>>> 1ad06898d43e67f7144c15e8fc9cf79d92079f77
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

<<<<<<< HEAD
export default CreateanAccount;


 
=======
export default CreateanAccount;
>>>>>>> 1ad06898d43e67f7144c15e8fc9cf79d92079f77
