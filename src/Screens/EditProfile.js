import React, { useState, useEffect } from 'react';
import { getFirestore, doc, updateDoc, query, where, getDocs, collection } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'; // Commented out
import { useNavigate } from 'react-router-dom';
import logo from '../assets/MachaLogo.png'; // Adjust the path to your logo

function EditProfile() {
    const navigate = useNavigate();
    const [profilePicURL, setProfilePicURL] = useState(null); // Keep the state
    const [username, setUsername] = useState(''); // Start with empty string
    const [email, setEmail] = useState(''); // Store email in lowercase
    const [phone_number, setPhoneNumber] = useState(''); // Start with empty string
    const [userId, setUserId] = useState(null); //State to store the user's document ID

    const auth = getAuth();
    const db = getFirestore();
    // const storage = getStorage(); // Code to be used in the Future, for storing the profile pictures.

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setEmail(currentUser.email.toLowerCase()); // Set email from the logged-in user
                // Fetch the user's document ID based on their email
                const q = query(collection(db, 'users'), where('Email', '==', currentUser.email.toLowerCase()));
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    const userDoc = querySnapshot.docs[0];
                    setUserId(userDoc.id); // Store the document ID
                }
            }
        });

        return () => unsubscribe();
    }, [auth, db]);

    const handleBack = () => {
        // Clear input fields when navigating back
        setUsername('');
        setPhoneNumber('');
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
        try {
            if (userId) { // Make sure userId is defined before updating
                const userDocRef = doc(db, 'users', userId); // Use the fetched document ID
                const updateData = {}; // Create an empty object to store updates

                // Only add the field to the updateData object if it has changed
                if (username !== '') {
                    updateData.Username = username;
                }
                if (phone_number !== '') {
                    updateData.phone_number = phone_number;
                }

                // Update only the fields that have changed
                await updateDoc(userDocRef, updateData);

                console.log('Document updated successfully!');
                // Clear the input fields immediately after saving
                setUsername('');
                setPhoneNumber('');
                // setProfilePicURL(null); // Clear the profile picture if needed
                navigate('/Main');
            } else {
                console.error('User ID not found. Cannot update document.');
            }
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
                        value={email} // Display the logged-in user's email
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