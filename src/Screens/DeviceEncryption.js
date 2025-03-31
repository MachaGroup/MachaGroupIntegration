import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function DeviceEncryptionPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadDeviceEncryptionPageImage = httpsCallable(functions, 'uploadDeviceEncryptionPageImage');

    const [formData, setFormData] = useState({});
    const storage = getStorage();
    const [image, setImage] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [imageUrl, setImageUrl] = useState(null);
    const [uploadError, setUploadError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!buildingId) {
            alert('No building selected. Redirecting to Building Info...');
            navigate('/BuildingandAddress');
        } else {
            loadFormData();
        }
    }, [buildingId, navigate]);

    const loadFormData = async () => {
        setLoading(true);
        try {
            const buildingRef = doc(db, 'Buildings', buildingId);
            const formsRef = collection(db, 'forms/Cybersecurity/Device Encryption');
            const q = query(formsRef, where('building', '==', buildingRef));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const docData = querySnapshot.docs[0].data().formData;
                setFormData(docData);
            }
        } catch (error) {
            console.error('Error loading form data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleBack = async () => {
        if (formData && buildingId) {
            try {
                const buildingRef = doc(db, 'Buildings', buildingId);
                const formsRef = collection(db, 'forms/Cybersecurity/Device Encryption');
                const q = query(formsRef, where('building', '==', buildingRef));
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    await addDoc(formsRef, {
                        building: buildingRef,
                        formData: formData,
                    });
                } else {
                    const docId = querySnapshot.docs[0].id;
                    const formDocRef = doc(db, 'forms/Cybersecurity/Device Encryption', docId);
                    await setDoc(formDocRef, {
                        building: buildingRef,
                        formData: formData,
                    }, { merge: true });
                }
                console.log('Form Data submitted successfully on back!');
                alert('Form data saved before navigating back!');
            } catch (error) {
                console.error('Error saving form data:', error);
                alert('Failed to save form data before navigating back. Some data may be lost.');
            }
        }
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
            const q = query(formsRef, where('building', '==', buildingRef));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                await addDoc(formsRef, {
                    building: buildingRef,
                    formData: formData,
                });
            } else {
                const docId = querySnapshot.docs[0].id;
                const formDocRef = doc(db, 'forms/Cybersecurity/Device Encryption', docId);
                await setDoc(formDocRef, {
                    building: buildingRef,
                    formData: formData,
                }, { merge: true });
            }

            console.log('Form data submitted successfully!');
            alert('Form submitted successfully!');
            navigate('/Form');
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to submit the form. Please try again.');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="form-page">
            <header className="header">
                <Navbar />
                <button className="back-button" onClick={handleBack}>←</button>
                <h1>Device Encryption Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>4.1.2.2.2.1 Encryption Standards and Protocols:</h2>
                    {[
                        { name: "encryptionAlgorithms", label: "4.1.2.2.2.1. Encryption Standards and Protocols: What encryption algorithms and protocols are used to secure data on laptops, and do they meet industry standards (e.g., AES-256)?", type: "text", securityGatesFormat: true },
                        { name: "encryptionPolicies", label: "4.1.2.2.2.1. Encryption Standards and Protocols: Are there specific policies that dictate the minimum encryption standards required for different types of data stored on laptops?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "keyManagement", label: "4.1.2.2.2.1. Encryption Standards and Protocols: How are encryption keys managed, stored, and rotated to ensure they remain secure and uncompromised?", type: "text", securityGatesFormat: true },
                    ]}

                    <h2>4.1.2.2.2.2 Implementation and Coverage:</h2>
                    {[
                        { name: "automaticEncryption", label: "4.1.2.2.2.2. Implementation and Coverage: Is encryption automatically enabled on all laptops, or does it require manual activation by the user?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "defaultEncryption", label: "4.1.2.2.2.2. Implementation and Coverage: Are all storage devices on the laptops, including external drives and USB devices, encrypted by default?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "encryptionProcesses", label: "4.1.2.2.2.2. Implementation and Coverage: What processes are in place to ensure that encryption is uniformly applied across all devices, including new and reissued laptops?", type: "text", securityGatesFormat: true },
                    ]}

                    <h2>4.1.2.2.2.3 User Awareness and Training:</h2>
                    {[
                        { name: "userTraining", label: "4.1.2.2.2.3. User Awareness and Training: Are users trained on the importance of device encryption and instructed on how to verify that their devices are properly encrypted?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "userBestPractices", label: "4.1.2.2.2.3. User Awareness and Training: How are users informed about best practices for handling encrypted devices, such as maintaining strong passwords and avoiding unauthorized software installations?", type: "text", securityGatesFormat: true },
                        { name: "userRefreshers", label: "4.1.2.2.2.3. User Awareness and Training: Are there periodic refreshers or updates provided to ensure ongoing user compliance and awareness regarding encryption policies?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                    ]}

                    <h2>4.1.2.2.2.4 Compliance and Monitoring:</h2>
                    {[
                        { name: "complianceMonitoring", label: "4.1.2.2.2.4. Compliance and Monitoring: How is compliance with device encryption policies monitored and enforced across the organization?", type: "text", securityGatesFormat: true },
                        { name: "auditTools", label: "4.1.2.2.2.4. Compliance and Monitoring: Are there tools or systems in place to regularly audit devices to confirm that encryption is enabled and functioning correctly?", type: "radio", options: ["yes", "no"], securityGatesFormat: true },
                        { name: "nonComplianceSteps", label: "4.1.2.2.2.4. Compliance and Monitoring: What steps are taken if a device is found to be non-compliant or if encryption is accidentally or deliberately disabled?", type: "text", securityGatesFormat: true },
                    ]}

                    <h2>4.1.2.2.2.5 Data Recovery and Contingency Planning:</h2>
                    {[
                        { name: "dataRecoveryProcedures", label: "4.1.2.2.2.5. Data Recovery and Contingency Planning: What procedures are in place for data recovery in the event of a lost or damaged device that is encrypted?", type: "text", securityGatesFormat: true },
                        { name: "decommissionedDevices", label: "4.1.2.2.2.5. Data Recovery and Contingency Planning: How does the organization handle encryption in cases where devices are decommissioned or repurposed to ensure that sensitive data is not accessible?", type: "text", securityGatesFormat: true },
                        { name: "contingencyPlans", label: "4.1.2.2.2.5. Data Recovery and Contingency Planning: Are there contingency plans to access encrypted data in cases where users forget their passwords or lose access to encryption keys?", type: "text", securityGatesFormat: true },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.type === "text" && <input type="text" name={question.name} value={formData[question.name] || ''} placeholder={question.placeholder} onChange={handleChange} />}
                                {question.type === "radio" && (
                                    <div>
                                        <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                                        <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                                        <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                                    </div>
                                )}
                                {question.securityGatesFormat && <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>}
                            </div>
                        </div>
                    ))}

                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    {uploadProgress > 0 && <p>Upload Progress: {uploadProgress.toFixed(2)}%</p>}
                    {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
                    {uploadError && <p style={{ color: "red" }}>{uploadError}</p>}
                    <button type="submit">Submit</button>
                </form>
            </main>
        </div>
    );
}

export default DeviceEncryptionPage;