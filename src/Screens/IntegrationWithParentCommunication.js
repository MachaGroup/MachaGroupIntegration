import React, { useState, useEffect } from 'react';
import { getFirestore, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function IntegrationWithParentCommunicationFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadIntegrationWithParentCommunicationImage = httpsCallable(functions, 'uploadIntegrationWithParentCommunicationImage');

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
                const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Drill Frequency', buildingId);
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
            const buildingRef = doc(db, 'Buildings', buildingId);
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Drill Frequency', buildingId);
            await setDoc(formDocRef, { formData: { ...newFormData, building: buildingRef } }, { merge: true });
            console.log("Form data saved to Firestore:", { ...newFormData, building: buildingRef });
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
                const uploadResult = await uploadIntegrationWithParentCommunicationImage({ imageData: imageData });
                setImageUrl(uploadResult.data.imageUrl);
                setFormData({ ...formData, imageUrl: uploadResult.data.imageUrl });
                setImageUploadError(null);
            } catch (error) {
                console.error('Error uploading image:', error);
                setImageUploadError(error.message);
            }
        }

        try {
            const buildingRef = doc(db, 'Buildings', buildingId);
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Drill Frequency', buildingId);
            await setDoc(formDocRef, { formData: { ...formData, building: buildingRef } }, { merge: true });
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
                <h1>Integration with Parent Communication Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Integration with Parent Communication Assessment</h2>
                    {[
                        { name: "integratingMechanism", label: "Is there a mechanism in place to integrate text/email alerts with parent communication systems to facilitate automatic notifications during emergencies?" },
                        { name: "connectingAlertSystem", label: "Are there established protocols or interfaces for connecting the alerting system with parent communication platforms or databases?" },
                        { name: "automaticNotificationConfigurations", label: "Are automatic notification configurations set up to ensure that parent contact information is automatically included in text/email alerts during emergencies?" },
                        { name: "syncingContactDetails", label: "Are procedures established for syncing or updating parent contact details between the alerting system and parent communication databases?" },
                        { name: "optInOptOutAlerts", label: "Are parents provided with opportunities to opt in or opt out of receiving text/email alerts, and are their preferences documented and respected?" },
                        { name: "obtainingConsent", label: "Is there a process for obtaining consent from parents for the inclusion of their contact information in emergency notifications?" },
                        { name: "implementingSafeguardMeasures", label: "Are appropriate measures implemented to safeguard the security and privacy of parent contact information stored or transmitted through the alerting system?" },
                        { name: "integrationMechanisms", label: "Do integration mechanisms comply with relevant privacy regulations and organizational policies governing the handling of sensitive data?" },
                        { name: "facilitatingCoordination", label: "Are communication protocols established to facilitate coordination between school authorities and parents during emergency situations?" },
                        { name: "communicationWithParents", label: "Is there a designated method or channel for communicating with parents, providing updates, and addressing concerns or inquiries?" },
                        { name: "informingParentsIntegration", label: "Are parents informed about the integration of text/email alerts with parent communication systems and the procedures for receiving emergency notifications?" },
                        { name: "helpingParentsResources", label: "Are resources or educational materials provided to help parents understand how to opt in or opt out of receiving alerts and how to update their contact information?" },
                        { name: "effectivenessMechanismsFeedback", label: "Are feedback mechanisms in place to solicit input from parents regarding the effectiveness and usefulness of text/email alerts during emergencies?" },
                        { name: "evaluatingParentFeedback", label: "Is parent feedback used to evaluate and improve the integration of alerting systems with parent communication platforms over time?" },
                        { name: "testingIntegrationMechanisms", label: "Are integration mechanisms tested and verified periodically to ensure that parent contact information is accurately included in text/email alerts and that notifications are delivered as intended?" },
                        { name: "testingScenarios", label: "Are test scenarios conducted to simulate emergency situations and assess the reliability and responsiveness of the integrated alerting system?" }
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
                                {question.name === "integratingMechanism" || question.name === "connectingAlertSystem" || question.name === "syncingContactDetails" || question.name === "obtainingConsent" || question.name === "facilitatingCoordination" || question.name === "communicationWithParents" || question.name === "effectivenessMechanismsFeedback" ? (
                                    <input
                                        type="text"
                                        name={`${question.name}Text`}
                                        placeholder={`Describe the ${question.label.toLowerCase().split(' ').pop()}`}
                                        value={formData[`${question.name}Text`] || ''}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <textarea
                                        className='comment-box'
                                        name={`${question.name}Comment`}
                                        placeholder="Comment (Optional)"
                                        value={formData[`${question.name}Comment`] || ''}
                                        onChange={handleChange}
                                    />
                                )}
                            </div>
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

export default IntegrationWithParentCommunicationFormPage;