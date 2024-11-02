import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
// import './EditProfile.css';  // Ensure this links to your CSS file
import logo from '../assets/MachaLogo.png';  // Adjust the path relative to the current file location
import { updateDoc, collection } from '@firebase/firestore';
import {firestore} from "../firebaseConfig";

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
    const userNameRef = useRef();
    const emailRef = useRef();
    const buildingNameRef = useRef();
    const AddressRef = useRef();
    const cityAddressRef = useRef();
    const stateRef= useRef();
    const countryRef = useRef();
    const zipCodeRef = useRef();
    const phoneNumberRef = useRef();
    const ref = collection(firestore, "users")

    const handleSubmit = (e) => {
        e.preventDefault();
        //handle account update logic here
        console.log('Account Update:', {username, email})
    
        let data = {
            Username: userNameRef.current.value,
            Email: emailRef.current.value,
            BuildingName: buildingNameRef.current.value,
            StreetAddress: AddressRef.current.value,
            City: cityAddressRef.current.value,
            State: stateRef.current.value,
            Country: countryRef.current.value,
            ZipCode: zipCodeRef.current.value,
            phoneNumber: phoneNumberRef.current.value
        };
    
        try{
            updateDoc(ref, data);
        } catch(e) {
            console.log(e)
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
                    ref={userNameRef}
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
                    ref={emailRef}
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
                    ref={phoneNumberRef}
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