import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { firestore } from '../firebaseConfig';
import { addDoc, collection } from '@firebase/firestore';
import './CreateanAccount.css';

function CreateanAccount() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [buildingName, setBuildingName] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [zipCode, setZipCode] = useState('');
  const userNameRef = useRef();
  const emailRef = useRef();
  const buildingNameRef = useRef();
  const AddressRef = useRef();
  const cityAddressRef = useRef();
  const stateRef= useRef();
  const countryRef = useRef();
  const zipCodeRef = useRef();

  const ref = collection(firestore, 'users');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const data = {
      Username: username,
      Email: email,
      Password: password,
      BuildingName: buildingName,
      StreetAddress: streetAddress,
      City: city,
      State: state,
      Country: country,
      ZipCode: zipCode,
    };

    try {
      await addDoc(ref, data);
      console.log('Account created successfully');
      navigate('/Main'); // Redirect to the main screen
    } catch (e) {
      console.error('Error creating account:', e);
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
            ref={username}
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
            ref={email}
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
        <label>This part of the form is optional*</label>
       </div>
       
       {/* Address Fields */}
        <div className="form-group">
          <label htmlFor="buildingName">Building Name</label>
          <input
            type="text"
            ref={buildingName}
            id="buildingName"
            placeholder="Enter Here"
            value={buildingName}
            onChange={(e) => setBuildingName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="streetAddress">Street</label>
          <input
            type="text"
            ref={streetAddress}
            id="streetAddress"
            placeholder="Enter Here"
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            ref={city}
            id="city"
            placeholder="Enter Here"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="state">State</label>
          <input
            type="text"
            ref={city}
            id="state"
            placeholder="Enter Here"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            ref={country}
            id="country"
            placeholder="Enter Here"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="zipCode">ZIP Code</label>
          <input
            type="text"
            ref={zipCode}
            id="zipCode"
            placeholder="Enter Here"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </div>

        <button type="submit" className="create-account-button">Create Account</button>
        <a href="/" className="cancel-link">Cancel</a>
      </form>
    </div>
  );
}

export default CreateanAccount;
