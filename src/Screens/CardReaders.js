import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function CardReadersPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadImage = httpsCallable(functions, 'uploadCardReadersImage');

    const [formData, setFormData] = useState({});
    const [imageData, setImageData] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);

    useEffect(() => {
        if (!buildingId) {
            alert('No building selected. Redirecting to Building Info...');
            navigate('/BuildingandAddress');
            return;
        }

        const fetchFormData = async () => {
            setLoading(true);
            setLoadError(null);

            try {
                const formDocRef = doc(db, 'forms', 'Physical Security', 'Card Readers', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Card Readers', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Card Readers', buildingId);
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
                <h1>Card Readers Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Card Readers Assessment</h2>
                    {[
                        { name: "operationalCardReader", label: "Are the card readers operational and functioning as intended?" },
                        { name: "authentication", label: "Do the card readers accurately read and authenticate proximity cards or other access credentials?" },
                        { name: "malfunction", label: "Are there any signs of malfunction or errors in card reader operations?" },
                        { name: "backupSystems", label: "Are there backup systems in place in case of power outages or malfunctions?" },
                        { name: "accessControlMethods", label: "How is access to the secondary entrances controlled using card readers?" },
                        { name: "issuedCards", label: "Are proximity cards issued to authorized personnel and visitors for access?" },
                        { name: "restrictedAccess", label: "Is access restricted to individuals with valid proximity cards or authorized credentials?" },
                        { name: "deactivationProcess", label: "Is there a process in place to deactivate lost or stolen proximity cards to prevent unauthorized access?" },
                        { name: "integration", label: "Are the card readers integrated with the overall access control system?" },
                        { name: "communication", label: "Do they communicate seamlessly with access control software and databases?" },
                        { name: "monitoring", label: "Is there real-time monitoring and logging of access events captured by the card readers?" },
                        { name: "centralManagement", label: "Are access rights managed centrally and synchronized with the card reader system?" },
                        { name: "securityFeatures", label: "Are the card readers equipped with security features to prevent tampering or unauthorized access attempts?" },
                        { name: "encryption", label: "Do they support encryption and secure communication protocols to protect access credentials?" },
                        { name: "physicalSecurity", label: "Is there physical security measures in place to prevent unauthorized access to card reader components or wiring?" },
                        { name: "compliance", label: "Do the card readers comply with relevant regulations, standards, and industry best practices?" },
                        { name: "regulatoryRequirements", label: "Are there any specific requirements or guidelines for card reader systems outlined by regulatory authorities or industry associations?" },
                        { name: "testingCertification", label: "Have the card readers undergone testing or certification to verify compliance with applicable standards?" },
                        { name: "maintenanceSchedule", label: "Is there a regular maintenance schedule in place for the card readers?" },
                        { name: "maintenanceTasks", label: "Are maintenance tasks, such as cleaning, calibration, and firmware updates, performed according to schedule?" },
                        { name: "maintenanceRecords", label: "Are there records documenting maintenance activities, repairs, and any issues identified during inspections?" },
                        { name: "userTraining", label: "Have users, such as security personnel, staff, and authorized cardholders, received training on how to use the card readers properly?" },
                        { name: "instructions", label: "Are there instructions or guidelines available to users regarding proper card usage and access procedures?" },
                        { name: "reportingProcess", label: "Is there a process for reporting malfunctions, damage, or security incidents related to the card readers?" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.name === "operationalCardReader" || question.name === "authentication" || question.name === "malfunction" || question.name === "backupSystems" || question.name === "issuedCards" || question.name === "restrictedAccess" || question.name === "deactivationProcess" || question.name === "integration" || question.name === "communication" || question.name === "monitoring" || question.name === "centralManagement" || question.name === "securityFeatures" || question.name === "encryption" || question.name === "physicalSecurity" || question.name === "compliance" || question.name === "testingCertification" || question.name === "maintenanceSchedule" || question.name === "maintenanceTasks" || question.name === "maintenanceRecords" || question.name === "userTraining" || question.name === "instructions" || question.name === "reportingProcess" ? (
                                <><div>
                            <input
                              type="radio"
                              name={question.name}
                              value="yes"
                              checked={formData[question.name] === "yes"}
                              onChange={handleChange} /> Yes
                            <input
                              type="radio"
                              name={question.name}
                              value="no"
                              checked={formData[question.name] === "no"}
                              onChange={handleChange} /> No

                          </div><textarea
                              name={`${question.name}Comment`}
                              placeholder="Comment (Optional)"
                              value={formData[`${question.name}Comment`] || ''}
                              onChange={handleChange} /></>
                            ) : (
                                <input
                                    type="text"
                                    name={question.name}
                                    value={formData[question.name] || ''}
                                    onChange={handleChange}
                                    placeholder={question.label}
                                />
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

export default CardReadersPage;