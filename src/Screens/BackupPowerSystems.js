import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function BackupPowerSystemsFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadImage = httpsCallable(functions, 'uploadBackupPowerSystemsImage');

    const [formData, setFormData] = useState({});
    const [imageData, setImageData] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);

    useEffect(() => {
        if (!buildingId) {
            alert('No building selected. Redirecting to Building Info...');
            navigate('BuildingandAddress');
            return;
        }

        const fetchFormData = async () => {
            setLoading(true);
            setLoadError(null);

            try {
                const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Backup Power Systems', buildingId);
                const docSnapshot = await getDoc(formDocRef);

                if (docSnapshot.exists()) {
                    setFormData(docSnapshot.data().formData || {});
                } else {
                    setFormData({});
                }
            } catch (error) {
                console.error("Error fetching form data:", error);
                setLoadError("Failed to load form data. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchFormData();
    }, [buildingId, db, navigate]);

    const handleChange = async (e) => {
        const { name, value } = e.target;
        const newFormData = { ...formData, [name]: value };
        setFormData(newFormData);

        try {
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Backup Power Systems', buildingId);
            await setDoc(formDocRef, { formData: newFormData }, { merge: true });
            console.log("Form data saved to Firestore:", newFormData);
        } catch (error) {
            console.error("Error saving form data to Firestore:", error);
            alert("Failed to save changes. Please check your connection and try again.");
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageData(reader.result);
        };
        reader.readAsDataURL(file);
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

        if (imageData) {
            try {
                const uploadResult = await uploadImage({ imageData: imageData });
                setImageUrl(uploadResult.data.imageUrl);
                setFormData({ ...formData, imageUrl: uploadResult.data.imageUrl });
                setImageUploadError(null);
            } catch (error) {
                console.error('Error uploading image:', error);
                setImageUploadError(error.message);
            }
        }

        try {
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Backup Power Systems', buildingId);
            await setDoc(formDocRef, { formData: formData }, { merge: true });
            console.log('Form data submitted successfully!');
            alert('Form submitted successfully!');
            navigate('/Form');
        } catch (error) {
            console.error("Error saving form data to Firestore:", error);
            alert("Failed to save changes. Please check your connection and try again.");
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (loadError) {
        return <div>Error: {loadError}</div>;
    }

    return (
        <div className="form-page">
            <header className="header">
                <Navbar />
                <button className="back-button" onClick={handleBack}>←</button>
                <h1>Backup Power Systems Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Backup Power Systems Assessment</h2>
                    {[
                        { name: "installedBackupPowerSystem", label: "Is there a backup power system, such as an Uninterruptible Power Supply (UPS), installed to support the operation of the public address (PA) system during power outages or disruptions?" },
                        { name: "capicityOfSystem", label: "What is the capacity of the backup power system in terms of providing sufficient power to operate the PA system?" },
                        { name: "backup-system", label: "How long can the backup power system sustain the PA system in operation during a power outage or disruption before requiring recharge or replacement?" },
                        { name: "uninterruptedTransitions", label: "Is the backup power system seamlessly integrated with the PA system to ensure uninterrupted operation during transitions between primary and backup power sources?" },
                        { name: "automaticSwitchoverMechanisms", label: "Are there automatic switchover mechanisms in place to activate the backup power system in the event of a power failure without manual intervention?" },
                        { name: "regularTests", label: "Is the backup power system regularly tested to verify its functionality and performance, including its ability to support the PA system under simulated outage conditions?" },
                        { name: "routineMaintenanceActivities", label: "Are routine maintenance activities conducted on the backup power system to ensure reliability and readiness for use during emergencies?" },
                        { name: "mitigatingRisks", label: "Are redundant backup power systems or multiple layers of redundancy implemented to mitigate the risk of power failure affecting the PA system?" },
                        { name: "withstandingExternalThreats", label: "Are backup power systems designed to withstand environmental factors or external threats that could impact their reliability during emergencies?" },
                        { name: "notifiedAdministrators", label: "Are system administrators or operators notified when the backup power system is activated or when there are issues with its performance?" },
                        { name: "capableRemoteMonitoring", label: "Is there remote monitoring capability to track the status of the backup power system and receive alerts or notifications in real-time?" },
                        { name: "backupSystemIncludedInPlans", label: "Are backup power systems included in emergency preparedness plans and protocols, specifying their roles and procedures for activation during power-related emergencies?" },
                        { name: "trainedStaffMembers", label: "Are staff members trained on the use of backup power systems and familiar with protocols for managing power-related incidents affecting the PA system?" },
                        { name: "maintainingRecords", label: "Are records maintained to document the installation, testing, maintenance, and performance of backup power systems supporting the PA system?" },
                        { name: "accessibleRecords", label: "Are records accessible for review, audit, and reporting purposes, including compliance assessments and performance evaluations?" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.name === "installedBackupPowerSystem" || question.name === "capicityOfSystem" || question.name === "backup-system" || question.name === "mitigatingRisks" ? (
                                <input
                                    type="text"
                                    name={`${question.name}Text`}
                                    placeholder={question.label}
                                    value={formData[`${question.name}Text`] || ''}
                                    onChange={handleChange}
                                />
                            ) : (
                                <div>
                                    <input
                                        type="radio"
                                        name={question.name}
                                        value="yes"
                                        checked={formData[question.name] === "yes"}
                                        onChange={handleChange}
                                    /> Yes
                                    <input
                                        type="radio"
                                        name={question.name}
                                        value="no"
                                        checked={formData[question.name] === "no"}
                                        onChange={handleChange}
                                    /> No
                                    <textarea
                                        name={`${question.name}Comment`}
                                        placeholder="Comment (Optional)"
                                        value={formData[`${question.name}Comment`] || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                    <input type="file" onChange={handleImageChange} accept="image/*" />
                    {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
                    {imageUploadError && <p style={{ color: 'red' }}>{imageUploadError}</p>}
                    <button type="submit">Submit</button>
                </form>
            </main>
        </div>
    );
}

export default BackupPowerSystemsFormPage;