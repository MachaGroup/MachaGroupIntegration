import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { firestore } from '../firebaseConfig';
import { doc, updateDoc } from '@firebase/firestore';
import './EditProfile.css';
import logo from '../assets/MachaLogo.png';

function EditProfile() {
  const navigate = useNavigate();

  // State variables for controlled inputs
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // Refs for form inputs
  const userNameRef = useRef();
  const emailRef = useRef();
  const phoneNumberRef = useRef();
  const buildingNameRef = useRef();
  const addressRef = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const countryRef = useRef();
  const zipCodeRef = useRef();

  // Handle form submission to update profile in Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct data object from refs
    const profileData = {
      username: userNameRef.current.value,
      email: emailRef.current.value,
      phoneNumber: phoneNumberRef.current.value,
      buildingName: buildingNameRef.current.value,
      streetAddress: addressRef.current.value,
      city: cityRef.current.value,
      state: stateRef.current.value,
      country: countryRef.current.value,
      zipCode: zipCodeRef.current.value,
    };

    try {
      const userDoc = doc(firestore, 'users', 'user_id'); // Replace 'user_id' with actual user document ID
      await updateDoc(userDoc, profileData);
      console.log('Profile updated successfully');
      // Optionally, navigate to a confirmation page or show a success message
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="edit-profile-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        ←
      </button>
      <h1 className="edit-profile-title">Edit Profile</h1>
      <img src={logo} alt="Logo" className="logo" />

      <form onSubmit={handleSubmit} className="profile-form">
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
          <label htmlFor="email">Email</label>
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
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            ref={phoneNumberRef}
            id="phoneNumber"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="buildingName">Building Name (Optional)</label>
          <input type="text" ref={buildingNameRef} id="buildingName" placeholder="Enter Here" />
        </div>

        <div className="address-section">
          <h3>Address</h3>
          <div>
            <label htmlFor="street">Street</label>
            <input type="text" ref={addressRef} id="street" placeholder="Enter Here" />
          </div>

          <div>
            <label htmlFor="city">City</label>
            <input type="text" ref={cityRef} id="city" placeholder="Enter Here" />
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

        <button type="submit" className="save-profile-button">Save Changes</button>
        <a href="/" className="cancel-link">Cancel</a>
      </form>
    </div>
  );
}

export default EditProfile;

 