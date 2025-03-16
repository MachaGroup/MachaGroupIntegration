import React, { useState } from 'react';
import { getFirestore, collection, addDoc, Timestamp, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
 
function BuildingInfoPage() {
    const [buildingName, setBuildingName] = useState('');
    const [buildingAddress, setBuildingAddress] = useState('');
    const [companyName, setCompanyName] = useState('');
    const { setBuildingId } = useBuilding();
    const navigate = useNavigate();
    const db = getFirestore();
 
    const handleBack = () => {
        navigate(-1);
    };
 
    const handleSubmit = async (e) => {
        e.preventDefault();
 
        if (!buildingName || !buildingAddress || !companyName) {
            alert('Please fill in all fields before proceeding.');
            return;
        }
 
        try {
            // Check for existing building with matching data
            const q = query(
                collection(db, 'Buildings'),
                where('buildingName', '==', buildingName),
                where('buildingAddress', '==', buildingAddress),
                where('companyName', '==', companyName)
            );
            const querySnapshot = await getDocs(q);
 
            if (!querySnapshot.empty) {
                // Existing building found
                const existingBuildingDoc = querySnapshot.docs[0];
                setBuildingId(existingBuildingDoc.id);
                navigate('/form'); // Navigate to the form page
                return; // Stop further processing
            }
 
            // No existing building found, create a new one
            const buildingId = generateUniqueBuildingId();
            const buildingRef = await addDoc(collection(db, 'Buildings'), {
                buildingId,
                buildingName,
                buildingAddress,
                companyName,
                timestamp: Timestamp.now()
            });
 
            console.log('Building info submitted successfully! Document ID:', buildingRef.id);
            setBuildingId(buildingRef.id);
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