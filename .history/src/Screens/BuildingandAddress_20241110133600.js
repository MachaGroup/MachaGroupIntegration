import React, { useState } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png'; // Adjust the path if necessary

function BuildingInfoPage() {
    const [buildingName, setBuildingName] = useState('');
    const [buildingAddress, setBuildingAddress] = useState('');
    const [companyName, setCompanyName] = useState('');
    const navigate = useNavigate();
    const db = getFirestore();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!buildingName || !buildingAddress || !companyName) {
            alert('Please fill in all fields before proceeding.');
            return;
        }

        try {
            // Add a new building document in the Buildings collection with a unique ID
            const buildingRef = await addDoc(collection(db, 'Buildings'), {
                buildingName,
                buildingAddress,
                companyName,
            });

            console.log('Building info submitted successfully! Document ID:', buildingRef.id);

            // Pass the building document ID to the next form
            navigate('/forms', {
                state: { buildingId: buildingRef.id }, // Pass the unique building document ID
            });
        } catch (error) {
            console.error('Error saving building info:', error);
            alert('Failed to save building info. Please try again.');
        }
    };

    return (
        <div className="form-page">
            <header className="header">
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

                    <button type="submit">Start Assessment</button>
                </form>
            </main>
        </div>
    );
}

export default BuildingInfoPage;

