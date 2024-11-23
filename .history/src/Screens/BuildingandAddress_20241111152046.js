import React, { useState } from 'react';
import { getFirestore, collection, doc, setDoc, runTransaction } from 'firebase/firestore';
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
            const counterRef = doc(db, 'Counters', 'BuildingCounter');

            const newBuildingId = await runTransaction(db, async (transaction) => {
                const counterDoc = await transaction.get(counterRef);
                if (!counterDoc.exists()) {
                    transaction.set(counterRef, { count: 1 }); // Initialize the counter if it doesn't exist
                    return 1;
                }

                const newCount = counterDoc.data().count + 1;
                transaction.update(counterRef, { count: newCount });
                return newCount;
            });

            const buildingRef = doc(db, 'Buildings', `Building-${newBuildingId}`);
            await setDoc(buildingRef, {
                buildingName,
                buildingAddress,
                companyName,
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




