import React, { useState, useEffect } from 'react';
import { getFirestore, doc, updateDoc, query, where, getDocs, collection } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/MachaLogo.png'; // Adjust the path to your logo

function EditProfile() {
    const navigate = useNavigate();
    const [profilePicURL, setProfilePicURL] = useState(null); // Keep the state
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState(''); // Store email in lowercase
    const [phone_number, setPhoneNumber] = useState('');
    const [buildingName, setBuildingName] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [StreetAddress, setStreetAddress] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [userId, setUserId] = useState(null); //State to store the user's document ID

    const auth = getAuth();
    const db = getFirestore();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setEmail(currentUser.email.toLowerCase()); // Set email from the logged-in user
                const q = query(collection(db, 'users'), where('Email', '==', currentUser.email.toLowerCase()));
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    const userDoc = querySnapshot.docs[0];
                    setUserId(userDoc.id); // Store the document ID
                }
            }
        });

        return () => unsubscribe();
    }, [auth, db]); // Include `auth` and `db` as dependencies

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

    const validatePhoneNumber = (number) => {
        const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
        return phoneRegex.test(number);
    };

    const handleSaveChanges = async () => {
        if (phone_number && !validatePhoneNumber(phone_number)) {
            alert("Please enter the phone number in the format (843) 290-4585.");
            return;
        }

        try {
            if (userId) {
                const userDocRef = doc(db, 'users', userId);
                const updateData = {};

                // Update only the fields that have values (skipping empty fields)
                if (username) updateData.Username = username;
                if (phone_number) updateData.phone_number = phone_number;
                if (buildingName) updateData.BuildingName = buildingName;
                if (city) updateData.City = city;
                if (country) updateData.Country = country;
                if (state) updateData.State = state;
                if (StreetAddress) updateData.StreetAddress = StreetAddress;
                if (zipCode) updateData.ZipCode = zipCode;

                await updateDoc(userDocRef, updateData);

                console.log('Document updated successfully!');
                alert("Profile updated successfully!");

                // Clear the input fields
            setUsername('');
            setPhoneNumber('');
            setBuildingName('');
            setCity('');
            setCountry('');
            setState('');
            setStreetAddress('');
            setZipCode('');
            
                navigate('/Main'); // Navigate back to main page after saving
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
                    <label>Phone Number (Optional)</label>
                    <input
                        type="text"
                        value={phone_number}
                        onChange={(e) => {
                            const value = e.target.value;
                            setPhoneNumber(value);
                            if (value && !validatePhoneNumber(value)) {
                                console.log("Invalid phone number format");
                            }
                        }}
                        placeholder="Ex. (123) 456-7890"
                    />
                    {!validatePhoneNumber(phone_number) && phone_number && (
                        <small style={{ color: 'red' }}>Please use the format (843) 290-4585</small>
                    )}
                </div>

                <div className="form-group">
                    <label>Building Name (Optional)</label>
                    <input
                        type="text"
                        value={buildingName}
                        onChange={(e) => setBuildingName(e.target.value)}
                        placeholder="Ex. 1500 Main"
                    />
                </div>
                <div className="form-group">
                    <label>City (Optional)</label>
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Ex. Columbia"
                    />
                </div>
                <div className="form-group">
                    <label>Country (Optional)</label>
                    <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder="Ex. United States"
                    />
                </div>
                <div className="form-group">
                    <label>State (Optional)</label>
                    <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="Ex. South Carolina"
                    />
                </div>
                <div className="form-group">
                    <label>Street Address (Optional)</label>
                    <input
                        type="text"
                        value={StreetAddress}
                        onChange={(e) => setStreetAddress(e.target.value)}
                        placeholder="Ex. 1500 Main Street"
                    />
                </div>
                <div className="form-group">
                    <label>Zip Code (Optional)</label>
                    <input
                        type="text"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        placeholder="Ex. 29201"
                    />
                </div>

                <button className="savechanges-button" onClick={handleSaveChanges}>Save Changes</button>
            </main>
        </div>
    );
}

export default EditProfile;
