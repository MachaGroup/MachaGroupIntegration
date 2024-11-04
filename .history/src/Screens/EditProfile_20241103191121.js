import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/MachaLogo.png';

function EditProfile() {
    const navigate = useNavigate();

    // State variables for profile information
    const [profilePic, setProfilePic] = useState(null);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [buildingName, setBuildingName] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [zipCode, setZipCode] = useState('');

    // Handle back navigation
    const handleBack = () => {
        navigate(-1);
    };

    // Handle image upload and preview
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setProfilePic(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

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
                        src={profilePic || 'https://via.placeholder.com/100'}
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

                {/* Profile Form Fields */}
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
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
                    <label>Phone Number (Optional)</label>
                    <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Ex. (123)456-7890"
                    />
                </div>
                <div className="form-group">
                    <label>Building Name (Optional)</label>
                    <input
                        type="text"
                        value={buildingName}
                        onChange={(e) => setBuildingName(e.target.value)}
                        placeholder="Enter Here"
                    />
                </div>
                <div className="form-group">
                    <label>Street (Optional)</label>
                    <input
                        type="text"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        placeholder="Enter Here"
                    />
                </div>
                <div className="form-group">
                    <label>City (Optional)</label>
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Enter Here"
                    />
                </div>
                <div className="form-group">
                    <label>State (Optional)</label>
                    <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="Enter Here"
                    />
                </div>
                <div className="form-group">
                    <label>Country (Optional)</label>
                    <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder="Enter Here"
                    />
                </div>
                <div className="form-group">
                    <label>Zip Code (Optional)</label>
                    <input
                        type="text"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        placeholder="Enter Here"
                    />
                </div>

                {/* Save Changes button */}
                <button className="savechanges-button">Save Changes</button>
            </main>
        </div>
    );
}

export default EditProfile;
