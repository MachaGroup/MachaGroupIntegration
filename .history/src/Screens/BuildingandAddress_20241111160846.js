import React, { useState, useEffect } from 'react';
import { getFirestore, doc, collection, setDoc, getDoc, increment } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png'; // Adjust the path if necessary

function SecurityGatesPage() {
    const navigate = useNavigate();
    const { buildingId, setBuildingId } = useBuilding(); // Access and update buildingId from context
    const db = getFirestore();

    const [formData, setFormData] = useState({
        gatesOperational: '',
        gatesSmooth: '',
        gatesDamage: '',
        backupSystems: '',
        accessControlMethods: '',
        authMechanisms: '',
        integratedSystems: '',
        logEntries: '',
        safetyFeatures: '',
        trapHazards: '',
        safetySignage: '',
        complianceRegulations: '',
        regulatoryRequirements: '',
        inspectionsCertifications: '',
        maintenanceSchedule: '',
        maintenanceTasks: '',
        maintenanceRecords: '',
        userTraining: '',
        instructionsGuidelines: '',
        reportingProcess: '',
    });

    useEffect(() => {
        if (!buildingId) {
            alert('No building selected. Redirecting to Building Info...');
            navigate('/BuildingandAddress');
        }
    }, [buildingId, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleBack = () => {
        navigate(-1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!buildingId) {
            alert('Building ID is missing. Please start the assessment from the correct page.');
            return;
        }

        try {
            // Increment form count for Security Gates under PhysicalSecurity of the current building
            const counterRef = doc(db, `Physical Security/${buildingId}/FormCounter`, 'Security Gates');
            const counterSnapshot = await getDoc(counterRef);

            let formNumber;
            if (counterSnapshot.exists()) {
                const currentCounter = counterSnapshot.data().count;
                formNumber = currentCounter + 1;
                await setDoc(counterRef, { count: increment(1) }, { merge: true });
            } else {
                formNumber = 1;
                await setDoc(counterRef, { count: 1 });
            }

            // Save the form data in the correct building under PhysicalSecurity collection
            const formRef = doc(db,`forms-${formNumber}`, `Physical Security/${buildingId}/Security Gates`);
            await setDoc(formRef, formData);

            console.log(`Form data submitted successfully under Form-${formNumber}!`);
            alert(`Form submitted successfully as Form-${formNumber}!`);
            navigate('/Main');
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to submit the form. Please try again.');
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
