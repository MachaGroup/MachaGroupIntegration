import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { firestore, auth } from '../firebaseConfig';
import { doc, updateDoc, getDoc } from '@firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import './EditProfile.css';
import logo from '../assets/MachaLogo.png';

function EditProfile() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [buildingName, setBuildingName] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [userDocId, setUserDocId] = useState(null);

  // Fetch user's document ID and profile data on component mount
  useEffect(() => {
    const fetchUserProfile = async (userId) => {
      const userRef = doc(firestore, 'users', userId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        setUserDocId(userId); // Set document ID to the user's UID
        setUsername(userData.username || '');
        setEmail(userData.email || '');
        setPhoneNumber(userData.phoneNumber || '');
        setBuildingName(userData.buildingName || '');
        setStreet(userData.street || '');
        setCity(userData.city || '');
        setState(userData.state || '');
        setCountry(userData.country || '');
        setZipCode(userData.zipCode || '');
      } else {
        console.log('No user document found');
      }
    };

    const authUnsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserProfile(user.uid);
      } else {
        console.log('User not authenticated');
      }
    });

    return () => authUnsubscribe(); // Cleanup on component unmount
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userDocId) {
      console.error('User document ID is not set');
      return;
    }

    const profileData = {
      username,
      email,
      phoneNumber,
      buildingName,
      street,
      city,
      state,
      country,
      zipCode,
    };

    try {
      const userDoc = doc(firestore, 'users', userDocId);
      await updateDoc(userDoc, profileData);
      console.log('Profile updated successfully');
      navigate('/Main'); // Redirect to the main screen after a successful update
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
            id="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            readOnly // Make email non-editable if preferred
          />
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            id="phoneNumber"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="buildingName">Building Name</label>
          <input
            type="text"
            id="buildingName"
            placeholder="Enter Here"
            value={buildingName}
            onChange={(e) => setBuildingName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="street">Street</label>
          <input
            type="text"
            id="street"
            placeholder="Enter Here"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
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
            id="zipCode"
            placeholder="Enter Here"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </div>

        <button type="submit" className="save-profile-button">Save Changes</button>
        <a href="/" className="cancel-link">Cancel</a>
      </form>
    </div>
  );
}

export default EditProfile;

