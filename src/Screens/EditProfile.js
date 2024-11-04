import React, { useState, useEffect } from 'react';
import { getFirestore, doc, updateDoc, query, where, getDocs, collection } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/MachaLogo.png'; // Adjust the path to your logo

function EditProfile() {
    const navigate = useNavigate();
    const [profilePicURL, setProfilePicURL] = useState(null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState(''); // Store email in lowercase
    const [phone_number, setPhoneNumber] = useState('');

    const auth = getAuth();
    const db = getFirestore();
    const storage = getStorage();

    // Removed the section that fetches existing user data from Firestore

    const handleBack = () => {
        navigate(-1);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setProfilePicURL(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveChanges = async () => {
        const userEmail = auth.currentUser.email.toLowerCase(); // Get the logged-in user's email

        // Create a query to find the document with the matching email
        const q = query(collection(db, 'users'), where('Email', '==', userEmail));

        try {
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                console.log('No matching document found.');
                return; // Or handle the case where no document is found
            }

            // Get the first matching document (assuming there's only one)
            const docRef = querySnapshot.docs[0].ref;

            // Update the document
            await updateDoc(docRef, {
                username: username, // Update username without forcing lowercase
                phone_number: phone_number,
                profilePictureURL: profilePicURL,
            });

            console.log('Document updated successfully!');
        } catch (error) {
            console.error('Error updating document:', error);
        }
    };

    return (
        <div className="editprofile-page">
            <header className="header">
                <button className="back-button" onClick={handleBack}>←</button>
                <h1 className="title">The MACHA Group</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="editprofile-container">
                <h2>Edit Profile</h2>

                <div className="profile-pic-container">
                    <img
                        src={profilePicURL || 'https://via.placeholder.com/100'}
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
                        onChange={(e) => setEmail(e.target.value.toLowerCase())} // Convert to lowercase on input
                        placeholder="Email"
                        required
                        disabled // Make email field read-only
                    />
                </div>
                <div className="form-group">
                    <label>Phone Number (Optional) </label>
                    <input
                        type="phone number"
                        value={phone_number}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Ex. (123) 456-7890"
                    />
                </div>

                <button className="savechanges-button" onClick={handleSaveChanges}>Save Changes</button>
            </main>
        </div>
    );
}

export default EditProfile;