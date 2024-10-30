import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
// import './EditProfile.css';  // Ensure this links to your CSS file
import logo from '../assets/MachaLogo.png';  // Adjust the path relative to the current file location

function EditProfile() {
    const navigate = useNavigate();  // Initialize useNavigate hook
    const [profilePic, setProfilePic] = useState(null); // Start with no picture, null by default
  
    // Handle back navigation
    const handleBack = () => {
      navigate(-1);  // Navigate back to the previous page
    };

    // Handle image upload and preview
    const handleImageUpload = (e) => {
        const file = e.target.files[0]; // Get the first file selected
        if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            setProfilePic(reader.result); // Set the preview to the uploaded image
        };
        reader.readAsDataURL(file); // Convert file to a data URL for preview
        }
    };

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [phone_number, setPhoneNumber] = useState('');

    return (
        <div className="editprofile-page">
            {/* Header Section */}
            <header className="header">
                <button className="back-button" onClick={handleBack}>←</button>
                <h1 className="title">The MACHA Group</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>
      
            {/* Edit Profile Section */}
            <main className="editprofile-container">
                <h2>Edit Profile</h2>

                {/* Profile Picture */}
                <div className="profile-pic-container">
                    <img
                        src={profilePic || 'https://via.placeholder.com/100'} // Use a placeholder when no profilePic is available
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
            <div className="form-group">
                <label>Username</label>
                <input
                    type="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                />
            </div>
            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
            </div>
            <div className="form-group">
                <label>Phone Number (Optional) </label>
                <input
                    type="phone number"
                    value={phone_number}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Ex. (123)456-7890"
                />
            </div>

            {/* Save Changes button */}
            <button className="savechanges-button">Save Changes</button>
            </main>
        </div>
    );
}

export default EditProfile;