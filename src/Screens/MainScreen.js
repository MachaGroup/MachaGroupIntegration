import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainScreen.css';
import logo from '../assets/MachaLogo.png';
import { signOut, getAuth, onAuthStateChanged } from 'firebase/auth';

function MainScreen() {
  const navigate = useNavigate();
  const auth = getAuth(); // Initialize Firebase Authentication
  const [user, setUser] = useState(null); // State to track the logged-in user

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if(!user){
        navigate('/login');
      }
    })

    return () => unsubscribe(); // Clean up the listener
  });

  const navigateTo = (path) => {
    navigate(path);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user
      setUser(null); // Clear the user state
      navigate('/Login'); // Redirect to the login page
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="main-container">
      <header className="header">
        <button className="back-button" onClick={handleBack}>←</button>
        <h1>The MACHA Group</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <div className="welcome-message">
        <h2>Welcome Back!</h2>
      </div>

      <div className="buttons-container">
        <button onClick={() => navigateTo('/BuildingandAddress')}>Create a Form</button>
        <button onClick={() => navigateTo('/pricing')}>Pricing</button>
        <button onClick={() => navigateTo('/about')}>About Us</button>
        <button onClick={() => navigateTo('/faq')}>FAQ</button>
        <button onClick={() => navigateTo('/contactus')}>Contact Us</button>
        <button onClick={() => navigateTo('/settings')}>Settings</button>
      </div>

      <footer>
        {user ? ( // Only show the logout link if a user is logged in
          <a href="#logout" onClick={handleLogout}>Log out</a>
        ) : null}
      </footer>
    </div>
  );
}

export default MainScreen;