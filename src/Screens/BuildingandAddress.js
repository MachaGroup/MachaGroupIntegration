import React, { useState } from 'react';
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Import the custom hook
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png'; // Adjust the path if necessary

function BuildingInfoPage() {
    const [buildingName, setBuildingName] = useState('');
    const [buildingAddress, setBuildingAddress] = useState('');
    const [companyName, setCompanyName] = useState('');
    const { setBuildingId } = useBuilding(); // Get the setBuildingId function from context
    const navigate = useNavigate();
    const db = getFirestore();

    const handleBack = () => {
        navigate(-1); // Navigate to the previous page
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!buildingName || !buildingAddress || !companyName) {
            alert('Please fill in all fields before proceeding.');
            return;
        }

        try {
            // Generate a unique building ID (you can use a library or a custom function)
            const buildingId = generateUniqueBuildingId(); // Implement this function

            // Add a new building document in the Buildings collection
            const buildingRef = await addDoc(collection(db, 'Buildings'), {
                buildingId, // Include the generated ID
                buildingName,
                buildingAddress,
                companyName,
                timestamp: Timestamp.now()
            });

            console.log('Building info submitted successfully! Document ID:', buildingRef.id);

            // Set the buildingId in context
            setBuildingId(buildingRef.id);

            // Navigate to the form page
            navigate('/form');
        } catch (error) {
            console.error('Error saving building info:', error);
            alert('Failed to save building info. Please try again.');
        }
    };

    // Function to generate a unique building ID (you can customize this)
    const generateUniqueBuildingId = () => {
        // Option 1: Using a library like `uuid`
        // import { v4 as uuidv4 } from 'uuid';
        // return uuidv4().slice(0, 10); // Shorten the UUID
      
        // Option 2: Create a custom ID generator
        const timestamp = Date.now().toString().slice(-8); // Get last 8 digits of timestamp
        const randomPart = Math.floor(Math.random() * 100000).toString().padStart(3, '0'); // Pad with zeros
        return `B-${timestamp}-${randomPart}`; // Customize the format
      };

    return (
        <div className="form-page">
            <header className="header">
                <button className="back-button" onClick={handleBack}>←</button> {/* Back Button */}
                <img src={logo} alt="Logo" className="logo" />
                <h1>Building Information</h1>
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <div className="form-section">
                        <label>Building Name</label>
                        <input
                            type="text"
                            value={buildingName}
                            onChange={(e) => setBuildingName(e.target.value)}
                            placeholder="Enter building name"
                            required
                        />
                    </div>

                    <div className="form-section">
                        <label>Building Address</label>
                        <input
                            type="text"
                            value={buildingAddress}
                            onChange={(e) => setBuildingAddress(e.target.value)}
                            placeholder="Enter building address"
                            required
                        />
                    </div>

                    <div className="form-section">
                        <label>Company Name</label>
                        <input
                            type="text"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            placeholder="Enter company name"
                            required
                        />
                    </div>

                    <button type="submit">Submit and Start Assessment</button>
                </form>
            </main>
        </div>
    );
}

export default BuildingInfoPage;