import React, { useState } from 'react';
import { getFirestore, doc, setDoc, collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './FormQuestions.css';

function SecurityGatesPage() {
    const navigate = useNavigate();
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

        try {
            // Reference to Physical Security document
            const physicalSecurityRef = doc(db, 'Physical Security', 'SecurityGatesAssessment');
            
            // Create a subcollection "Security Gates" within the Physical Security document
            const subCollectionRef = collection(physicalSecurityRef, 'Security Gates');

            // Add the form data to the Security Gates subcollection
            await addDoc(subCollectionRef, formData);

            console.log('Form data submitted successfully!');
            alert('Form submitted successfully!');

            navigate('/Main'); // Navigate to another page after submission
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to submit the form. Please try again.');
        }
    };

    return (
        <div className="form-page">
            <header className="header">
                <button className="back-button" onClick={handleBack}>←</button>
                <h1>Security Gates Assessment</h1>
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>1.1.1.1.1.1 Functionality and Operation:</h2>
                    <div className="form-section">
                        <label>Are the security gates operational and functioning as intended?</label>
                        <div>
                            <input type="radio" name="gatesOperational" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="gatesOperational" value="no" onChange={handleChange} /> No
                        </div>
                    </div>

                    {/* Other inputs follow the same pattern */}
                    <div className="form-section">
                        <label>Do the gates open and close smoothly without any mechanical issues?</label>
                        <div>
                            <input type="radio" name="gatesSmooth" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="gatesSmooth" value="no" onChange={handleChange} /> No
                        </div>
                    </div>

                    <div className="form-section">
                        <label>Are there any signs of wear or damage that could affect the gate's functionality?</label>
                        <div>
                            <input
                                type="text"
                                name="gatesDamage"
                                placeholder="Describe any wear or damage"
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Add the rest of the form sections here, following the same pattern */}
                    
                    <button type="submit">Submit</button>
                </form>
            </main>
        </div>
    );
}

export default SecurityGatesPage;

