import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Settings.css';
import logo from '../assets/MachaLogo.png';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Import Firebase Authentication

function Settings() {
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState(null); // State for preview
  const [profilePicUrl, setProfilePicUrl] = useState(null); // State for uploaded URL
  const [user, setUser] = useState(null); // State to store the current user

  const auth = getAuth(); // Initialize Firebase Authentication

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const navigateTo = (path) => {
    navigate(path);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleLogout = () => {
<<<<<<< HEAD
    navigate('/Login');  // Navigate to the login page after logging out
=======
    navigate('/login');
>>>>>>> 1ad06898d43e67f7144c15e8fc9cf79d92079f77
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePic(reader.result); // Set the preview image
      };
      reader.readAsDataURL(file); // Convert to data URL for preview

      // Upload to Firebase Storage
      const storage = getStorage();
      const storageRef = ref(storage, `profilePictures/${user?.uid}/${file.name}`);
      uploadBytes(storageRef, file)
        .then((snapshot) => {
          getDownloadURL(snapshot.ref)
            .then((url) => {
              setProfilePicUrl(url); // Update the uploaded URL
            })
            .catch((error) => {
              console.error('Error getting download URL:', error);
            });
        })
        .catch((error) => {
          console.error('Error uploading file:', error);
        });
    }
  };

  // Removed handleSubmit function

  return (
    <div className="settings-page">
      <header className="header">
        <button className="back-button" onClick={handleBack}>←</button>
        <h1 className="title">The MACHA Group</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="settings-container">
        <h2>Settings</h2>

        {/* Profile Picture */}
        <div className="profile-pic-container">
          <img
            src={profilePic || profilePicUrl || 'https://via.placeholder.com/100'} // Use preview or uploaded URL
            alt="Profile"
            className="profile-pic"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="file-input"
          />
        </div>

        {/* Settings Options */}
        <div className="settings-options">
          <button className="settings-button" onClick={() => navigateTo('/editprofile')}>Edit Profile</button>
          <button className="settings-button" onClick={() => navigateTo('/notifications')}>Notifications</button>
          <button className="settings-button">Privacy & Security</button>
          <button className="settings-button">Contact Us</button>
        </div>

        {/* Log out Link */}
        <a href="#logout" className="logout-link" onClick={handleLogout}>Log out</a>
      </main>
    </div>
  );
}

export default Settings;