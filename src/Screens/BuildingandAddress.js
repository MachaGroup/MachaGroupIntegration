import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, updateDoc, Timestamp, query, where, getDocs, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; 
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png'; 
/**/
function BuildingInfoPage() {
    const [buildingName, setBuildingName] = useState('');
    const [buildingAddress, setBuildingAddress] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [buildingDocId, setBuildingDocId] = useState(null); // Store existing document ID if found
    const { setBuildingId } = useBuilding(); 
    const navigate = useNavigate();
    const db = getFirestore();
    
    /*
    useEffect(() => {
        if (buildingName || buildingAddress || companyName) {
            const delayDebounceFn = setTimeout(() => {
                handleAutoSave();
            }, 2000); // Autosave after 2 seconds of inactivity

            return () => clearTimeout(delayDebounceFn);
        }
    }, [buildingName, buildingAddress, companyName]); // Runs when any of these change

    const handleAutoSave = async () => {
        if (!buildingName || !buildingAddress || !companyName) return; // Don't autosave empty fields

        try {
            if (buildingDocId) {
                // If document exists, update it
                const buildingRef = doc(db, 'Buildings', buildingDocId);
                await updateDoc(buildingRef, {
                    buildingName,
                    buildingAddress,
                    companyName,
                    timestamp: Timestamp.now()
                });
                console.log('Autosaved existing building:', buildingDocId);
            } else {
                // Check for an existing building first
                const q = query(
                    collection(db, 'Buildings'),
                    where('buildingName', '==', buildingName),
                    where('buildingAddress', '==', buildingAddress),
                    where('companyName', '==', companyName)
                );
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    // If found, update the state with the document ID
                    const existingBuildingDoc = querySnapshot.docs[0];
                    setBuildingDocId(existingBuildingDoc.id);
                    setBuildingId(existingBuildingDoc.id);
                    console.log('Building already exists, autosave updated ID:', existingBuildingDoc.id);
                } else {
                    // If not found, create a new one
                    const newBuildingRef = await addDoc(collection(db, 'Buildings'), {
                        buildingId: generateUniqueBuildingId(),
                        buildingName,
                        buildingAddress,
                        companyName,
                        timestamp: Timestamp.now()
                    });
                    setBuildingDocId(newBuildingRef.id);
                    setBuildingId(newBuildingRef.id);
                    console.log('Autosaved new building:', newBuildingRef.id);
                }
            }
        } catch (error) {
            console.error('Error autosaving building info:', error);
        }
    };
    
*/
    const handleSubmit = async (e) => {
        e.preventDefault();
        /*await handleAutoSave();*/ // Ensure final save on submit
        navigate('/form');
    };
    

    const handleBack = () => {
        navigate(-1); 
    };

    const generateUniqueBuildingId = () => {
        const timestamp = Date.now().toString().slice(-8); 
        const randomPart = Math.floor(Math.random() * 100000).toString().padStart(3, '0'); 
        return `B-${timestamp}-${randomPart}`; 
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
