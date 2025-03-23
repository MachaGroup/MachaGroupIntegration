import React, { useState, useEffect } from 'react';
import { getFirestore, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function SecurityGatesPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadImage = httpsCallable(functions, 'uploadSecurityGateImage');


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
            setLoadError(null); // Clear previous errors

            try {
                const formDocRef = doc(db, 'forms', 'Physical Security', 'Security Gates', buildingId);
                const docSnapshot = await getDoc(formDocRef);

                if (docSnapshot.exists()) {
                    setFormData(docSnapshot.data().formData || {});
                } else {
                    setFormData({}); // Initialize if document doesn't exist
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
            // Persist data to Firestore on every change
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Security Gates', buildingId);
            await setDoc(formDocRef, { formData: newFormData }, { merge: true }); // Use merge to preserve existing fields
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
        navigate(-1); // Just navigate back
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
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Security Gates', buildingId);
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
        <div>
            <div className="form-page">
                <header className="header">
                    <Navbar />
                    <button className="back-button" onClick={handleBack}>←</button>
                    <h1>Security Gates Assessment</h1>
                    <img src={logo} alt="Logo" className="logo" />
                </header>

                <main className="form-container">
                    <form onSubmit={handleSubmit}>
                        <h2>Security Gates Assessment</h2>
                        {[
                            { name: "authMechanisms", label: "Are there authentication mechanisms, such as keypads, card readers, or biometric scanners, to restrict entry?" },
                            { name: "integratedSystems", label: "Are access control systems integrated with other security measures, such as surveillance cameras or intrusion detection systems?" },
                            { name: "logEntries", label: "Is there a log of entries and exits through the security gates for monitoring and auditing purposes?" },
                            { name: "safetyFeatures", label: "Are there safety features in place to prevent accidents or injuries, such as sensors to detect obstructions or emergency stop buttons?" },
                            { name: "trapHazards", label: "Are the gates equipped with safety mechanisms to prevent trapping or crushing hazards?" },
                            { name: "safetySignage", label: "Are there clear instructions or signage to inform users about safety procedures and precautions when using the gates?" },
                            { name: "complianceRegulations", label: "Do the security gates comply with relevant safety and security regulations, codes, and standards?" },
                            { name: "inspectionsCertifications", label: "Have the gates undergone any inspections or certifications to verify compliance with applicable standards?" },
                            { name: "maintenanceSchedule", label: "Is there a regular maintenance schedule in place for the security gates?" },
                            { name: "maintenanceTasks", label: "Are maintenance tasks, such as lubrication, inspection of components, and testing of safety features, performed according to schedule?" },
                            { name: "maintenanceRecords", label: "Are there records documenting maintenance activities, repairs, and any issues identified during inspections?" },
                            { name: "userTraining", label: "Have users, such as security personnel or authorized staff, received training on how to operate the security gates safely and effectively?" },
                            { name: "instructionsGuidelines", label: "Are there instructions or guidelines available to users regarding proper gate usage and emergency procedures?" },
                            { name: "reportingProcess", label: "Is there a process for reporting malfunctions, damage, or security incidents related to the gates?" }
                        ].map((question, index) => (
                            <div key={index} className="form-section">
                                <label>{question.label}</label>
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
                                </div>
                                <input
                                    type="text"
                                    name={`${question.name}Comment`}
                                    placeholder="Additional comments"
                                    value={formData[`${question.name}Comment`] || ''}
                                    onChange={handleChange}
                                />
                            </div>
                        ))}
                        <input type="file" onChange={handleImageChange} accept="image/*" />
                        {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
                        {imageUploadError && <p style={{ color: 'red' }}>{imageUploadError}</p>}
                        <button type="submit">Submit</button>
                    </form>
                </main>
            </div>
        </div>
    );
}

export default SecurityGatesPage;
