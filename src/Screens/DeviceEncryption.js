import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png'; // Adjust the path if necessary

function DeviceEncryptionPage() {
    const navigate = useNavigate();
    const { setBuildingId, buildingId } = useBuilding(); // Access and update buildingId from context
    const db = getFirestore();

    const [formData, setFormData] = useState({});

    useEffect(() => {
        const fetchBuildingIdFromBuildings = async () => {
            if (!buildingId) {
                try {
                    const buildingDocRef = doc(db, 'Buildings', 'BuildingDocumentID');
                    const buildingSnapshot = await getDoc(buildingDocRef);

                    if (buildingSnapshot.exists()) {
                        const buildingData = buildingSnapshot.data();
                        setBuildingId(buildingData.buildingId);
                    } else {
                        alert('Building information not found. Redirecting...');
                        navigate('/BuildingandAddress');
                    }
                } catch (error) {
                    console.error('Error fetching building ID:', error);
                    alert('Error fetching building information.');
                }
            }
        };

        fetchBuildingIdFromBuildings();
    }, [buildingId, navigate, setBuildingId, db]);

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
            alert('Building ID is missing. Please start from the Building Information page.');
            return;
        }

        try {
            const buildingRef = doc(db, 'Buildings', buildingId);
            const formsRef = collection(db, 'forms/Cybersecurity/Device Encryption');
            await addDoc(formsRef, {
                building: buildingRef,
                formData: formData,
            });

            console.log('Form data submitted successfully!');
            alert('Form submitted successfully!');
            navigate('/Form');
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to submit the form. Please try again.');
        }
    };

    return (
        <div className="form-page">
            <header className="header">
                <button className="back-button" onClick={handleBack}>←</button>
                <h1>Device Encryption Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>4.1.2.2.2 Device Encryption (e.g., encrypting data on laptops)</h2>

                    {/* Encryption Standards and Protocols */}
                    <h3>4.1.2.2.2.1 Encryption Standards and Protocols:</h3>
                    <div className="form-section">
                        <label>4.1.2.2.2.1.1. What encryption algorithms and protocols are used to secure data on laptops, and do they meet industry standards (e.g., AES-256)?</label>
                        <textarea name="encryptionAlgorithms" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>4.1.2.2.2.1.2. Are there specific policies that dictate the minimum encryption standards required for different types of data stored on laptops?</label>
                        <div>
                            <input type="radio" name="encryptionPolicies" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="encryptionPolicies" value="no" onChange={handleChange} /> No
                        </div>
                    </div>

                    <div className="form-section">
                        <label>4.1.2.2.2.1.3. How are encryption keys managed, stored, and rotated to ensure they remain secure and uncompromised?</label>
                        <textarea name="keyManagement" onChange={handleChange}></textarea>
                    </div>

                    {/* Implementation and Coverage */}
                    <h3>4.1.2.2.2.2 Implementation and Coverage:</h3>
                    <div className="form-section">
                        <label>4.1.2.2.2.2.1. Is encryption automatically enabled on all laptops, or does it require manual activation by the user?</label>
                        <div>
                            <input type="radio" name="automaticEncryption" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="automaticEncryption" value="no" onChange={handleChange} /> No
                        </div>
                    </div>

                    <div className="form-section">
                        <label>4.1.2.2.2.2.2. Are all storage devices on the laptops, including external drives and USB devices, encrypted by default?</label>
                        <div>
                            <input type="radio" name="defaultEncryption" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="defaultEncryption" value="no" onChange={handleChange} /> No
                        </div>
                    </div>

                    <div className="form-section">
                        <label>4.1.2.2.2.2.3. What processes are in place to ensure that encryption is uniformly applied across all devices, including new and reissued laptops?</label>
                        <textarea name="encryptionProcesses" onChange={handleChange}></textarea>
                    </div>

                    {/* User Awareness and Training */}
                    <h3>4.1.2.2.2.3 User Awareness and Training:</h3>
                    <div className="form-section">
                        <label>4.1.2.2.2.3.1. Are users trained on the importance of device encryption and instructed on how to verify that their devices are properly encrypted?</label>
                        <div>
                            <input type="radio" name="userTraining" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="userTraining" value="no" onChange={handleChange} /> No
                        </div>
                    </div>

                    <div className="form-section">
                        <label>4.1.2.2.2.3.2. How are users informed about best practices for handling encrypted devices, such as maintaining strong passwords and avoiding unauthorized software installations?</label>
                        <textarea name="userBestPractices" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>4.1.2.2.2.3.3. Are there periodic refreshers or updates provided to ensure ongoing user compliance and awareness regarding encryption policies?</label>
                        <div>
                            <input type="radio" name="userRefreshers" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="userRefreshers" value="no" onChange={handleChange} /> No
                        </div>
                    </div>

                    {/* Compliance and Monitoring */}
                    <h3>4.1.2.2.2.4 Compliance and Monitoring:</h3>
                    <div className="form-section">
                        <label>4.1.2.2.2.4.1. How is compliance with device encryption policies monitored and enforced across the organization?</label>
                        <textarea name="complianceMonitoring" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>4.1.2.2.2.4.2. Are there tools or systems in place to regularly audit devices to confirm that encryption is enabled and functioning correctly?</label>
                        <div>
                            <input type="radio" name="auditTools" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="auditTools" value="no" onChange={handleChange} /> No
                        </div>
                    </div>

                    <div className="form-section">
                        <label>4.1.2.2.2.4.3. What steps are taken if a device is found to be non-compliant or if encryption is accidentally or deliberately disabled?</label>
                        <textarea name="nonComplianceSteps" onChange={handleChange}></textarea>
                    </div>

                    {/* Data Recovery and Contingency Planning */}
                    <h3>4.1.2.2.2.5 Data Recovery and Contingency Planning:</h3>
                    <div className="form-section">
                        <label>4.1.2.2.2.5.1. What procedures are in place for data recovery in the event of a lost or damaged device that is encrypted?</label>
                        <textarea name="dataRecoveryProcedures" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>4.1.2.2.2.5.2. How does the organization handle encryption in cases where devices are decommissioned or repurposed to ensure that sensitive data is not accessible?</label>
                        <textarea name="decommissionedDevices" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>4.1.2.2.2.5.3. Are there contingency plans to access encrypted data in cases where users forget their passwords or lose access to encryption keys?</label>
                        <textarea name="contingencyPlans" onChange={handleChange}></textarea>
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </main>
        </div>
    );
}

export default DeviceEncryptionPage;
