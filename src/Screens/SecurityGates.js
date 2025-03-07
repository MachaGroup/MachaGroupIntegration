import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, updateDoc, Timestamp, query, where, getDocs, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; 
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function SecurityGatesPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();

    // Initialize formData with comment fields
    const [formData, setFormData] = useState({
        gatesOperational: '',
        gatesOperationalComment: '',
        gatesSmooth: '',
        gatesSmoothComment: '',
        gatesDamage: '',
        gatesDamageComment: '',
        backupSystems: '',
        backupSystemsComment: '',
        accessControlMethods: '',
        accessControlMethodsComment: '',
        authMechanisms: '',
        authMechanismsComment: '',
        integratedSystems: '',
        integratedSystemsComment: '',
        logEntries: '',
        logEntriesComment: '',
        safetyFeatures: '',
        safetyFeaturesComment: '',
        trapHazards: '',
        trapHazardsComment: '',
        safetySignage: '',
        safetySignageComment: '',
        complianceRegulations: '',
        complianceRegulationsComment: '',
        regulatoryRequirements: '',
        regulatoryRequirementsComment: '',
        inspectionsCertifications: '',
        inspectionsCertificationsComment: '',
        maintenanceSchedule: '',
        maintenanceScheduleComment: '',
        maintenanceTasks: '',
        maintenanceTasksComment: '',
        maintenanceRecords: '',
        maintenanceRecordsComment: '',
        userTraining: '',
        userTrainingComment: '',
        instructionsGuidelines: '',
        instructionsGuidelinesComment: '',
        reportingProcess: '',
        reportingProcessComment: '',
    });

    const [formDocId, setFormDocId] = useState(null);

    useEffect(() => {
        if (!buildingId) {
            alert('No building selected. Redirecting to Building Info...');
            navigate('/BuildingandAddress');
        }
    }, [buildingId, navigate]);

    // Autosave every 15 seconds
    useEffect(() => {
        const autosaveInterval = setInterval(() => {
            console.log('Autosaving form data...');
            handleAutoSave();
        }, 15000);

        return () => clearInterval(autosaveInterval);
    }, [formData]);

    // Handle both radio button and comment field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAutoSave = async () => {
        if (!buildingId) {
            console.log('Autosave skipped: No building ID set.');
            return;
        }

        try {
            const buildingRef = doc(db, 'Buildings', buildingId);
            const formsRef = collection(db, 'forms/PhysicalSecurity/SecurityGates');

            if (formDocId) {
                const formRef = doc(db, 'forms/PhysicalSecurity/SecurityGates', formDocId);
                await updateDoc(formRef, {
                    building: buildingRef,
                    formData,
                    timestamp: Timestamp.now(),
                });
                console.log('Autosave: Updated existing form.');
            } else {
                const q = query(formsRef, where('building', '==', buildingRef));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const existingForm = querySnapshot.docs[0];
                    setFormDocId(existingForm.id);
                    const formRef = doc(db, 'forms/PhysicalSecurity/SecurityGates', existingForm.id);
                    await updateDoc(formRef, {
                        formData,
                        timestamp: Timestamp.now(),
                    });
                    console.log('Autosave: Found and updated existing form.');
                } else {
                    const newFormRef = await addDoc(formsRef, {
                        building: buildingRef,
                        formData,
                        timestamp: Timestamp.now(),
                    });
                    setFormDocId(newFormRef.id);
                    console.log('Autosave: New form created in Firestore.');
                }
            }
        } catch (error) {
            console.error('Error autosaving form:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleAutoSave();
        alert('Form submitted successfully!');
        navigate('/Form');
    };

    return (
        <div className="form-page">
            <header className="header">
                <Navbar />
                <button className="back-button" onClick={() => navigate(-1)}>←</button>
                <h1>Security Gates Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>1.1.1.1.1 Security Gates (e.g., automated sliding gates)</h2>

                    {/* Functionality and Operation */}
                    <h3>Functionality and Operation:</h3>
                    <div className="form-section">
                        <label>Are the security gates operational and functioning as intended?</label>
                        <div>
                            <input type="radio" name="gatesOperational" value="yes" checked={formData.gatesOperational === "yes"} onChange={handleChange} /> Yes
                            <input type="radio" name="gatesOperational" value="no" checked={formData.gatesOperational === "no"} onChange={handleChange} /> No
                        </div>
                        <textarea name="gatesOperationalComment" placeholder="Add a comment" onChange={handleChange} value={formData.gatesOperationalComment}></textarea>
                    </div>

                    <div className="form-section">
                        <label>Do the gates open and close smoothly without mechanical issues?</label>
                        <div>
                            <input type="radio" name="gatesSmooth" value="yes" checked={formData.gatesSmooth === "yes"} onChange={handleChange} /> Yes
                            <input type="radio" name="gatesSmooth" value="no" checked={formData.gatesSmooth === "no"} onChange={handleChange} /> No
                        </div>
                        <textarea name="gatesSmoothComment" placeholder="Add a comment" onChange={handleChange} value={formData.gatesSmoothComment}></textarea>
                    </div>

                    {/* Compliance with Regulations */}
                    <h3>Compliance with Regulations:</h3>
                    <div className="form-section">
                        <label>Do the security gates comply with regulations?</label>
                        <div>
                            <input type="radio" name="complianceRegulations" value="yes" checked={formData.complianceRegulations === "yes"} onChange={handleChange} /> Yes
                            <input type="radio" name="complianceRegulations" value="no" checked={formData.complianceRegulations === "no"} onChange={handleChange} /> No
                        </div>
                        <textarea name="complianceRegulationsComment" placeholder="Add a comment" onChange={handleChange} value={formData.complianceRegulationsComment}></textarea>
                    </div>

                    {/* Maintenance and Upkeep */}
                    <h3>Maintenance and Upkeep:</h3>
                    <div className="form-section">
                        <label>Is there a regular maintenance schedule?</label>
                        <div>
                            <input type="radio" name="maintenanceSchedule" value="yes" checked={formData.maintenanceSchedule === "yes"} onChange={handleChange} /> Yes
                            <input type="radio" name="maintenanceSchedule" value="no" checked={formData.maintenanceSchedule === "no"} onChange={handleChange} /> No
                        </div>
                        <textarea name="maintenanceScheduleComment" placeholder="Add a comment" onChange={handleChange} value={formData.maintenanceScheduleComment}></textarea>
                    </div>

                    {/* Submit Button */}
                    <button type="submit">Submit</button>
                </form>
            </main>
        </div>
    );
}

export default SecurityGatesPage;
