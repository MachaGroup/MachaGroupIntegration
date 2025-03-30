import React, { useState, useEffect } from 'react';
import { getFirestore, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function IntrusionDetectionSystems2Page() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadIntrusionDetectionSystems2Image = httpsCallable(functions, 'uploadIntrusionDetectionSystems2Image');

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
                const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Intrusion Detection System2', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Intrusion Detection System2', buildingId);
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
                const uploadResult = await uploadIntrusionDetectionSystems2Image({ imageData: imageData });
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
            const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Intrusion Detection System2', buildingId);
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
                <h1>Intrusion Detection Systems (IDS)</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Intrusion Detection Systems (IDS)</h2>
                    {[
                        { name: "idsDeployment", label: "How are IDS solutions deployed across the network (e.g., inline, passive, distributed) and what areas or segments do they cover?" },
                        { name: "idsConfigSettings", label: "What are the key configuration settings for the IDS, and how are they tuned to match the organization’s security requirements?" },
                        { name: "idsBlindSpots", label: "Are there any known limitations or blind spots in the IDS deployment that need to be addressed?" },
                        { name: "idsDetectionTypes", label: "What types of intrusions and attacks does the IDS aim to detect (e.g., network-based attacks, host-based attacks, zero-day exploits)?" },
                        { name: "idsFalsePositivesHandling", label: "How does the IDS differentiate between legitimate and malicious activities to minimize false positives and false negatives?" },
                        { name: "idsDetectionMethods", label: "Are there specific signatures, heuristics, or anomaly detection methods used to identify potential threats?" },
                        { name: "realTimeMonitoring", label: "Does the IDS provide real-time monitoring of network and system activities to identify suspicious or malicious behavior?" },
                        { name: "idsAlertManagement", label: "How are alerts generated and managed, and what processes are in place to ensure timely response to detected threats?" },
                        { name: "alertEscalationProcedure", label: "What is the procedure for escalating alerts to the appropriate response teams or individuals?" },
                        { name: "idsIncidentIntegration", label: "How is the IDS integrated with incident response processes and tools, such as SIEM systems or ticketing systems?" },
                        { name: "incidentProtocols", label: "Are there predefined incident response protocols for handling alerts and incidents detected by the IDS?" },
                        { name: "idsIncidentEffectiveness", label: "How are the effectiveness and accuracy of the IDS in supporting incident response efforts evaluated?" },
                        { name: "idsLogCollection", label: "What types of data and logs are collected by the IDS, and how are they stored and managed?" },
                        { name: "idsLogAnalysis", label: "How are IDS logs analyzed to identify trends, patterns, or recurring issues related to security incidents?" },
                        { name: "logCorrelation", label: "Are there tools or processes in place to correlate IDS data with other security logs or events?" },
                        { name: "idsMaintenance", label: "What is the process for updating and maintaining IDS signatures, rules, and configurations to stay current with emerging threats?" },
                        { name: "idsUpdatesFrequency", label: "How often are system updates and patches applied to the IDS, and how is the impact on system performance and security assessed?" },
                        { name: "updateValidation", label: "Are there procedures for testing and validating updates to ensure they do not disrupt normal operations?" },
                        { name: "idsPerformanceMonitoring", label: "How is the performance of the IDS monitored, and are there metrics or benchmarks used to assess its effectiveness?" },
                        { name: "periodicAssessment", label: "Are there periodic reviews or assessments conducted to evaluate the IDS’s ability to detect and respond to threats?" },
                        { name: "feedbackIncorporation", label: "How are feedback and lessons learned from past incidents incorporated into the IDS configuration and deployment strategy?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.name === "idsBlindSpots" || question.name === "realTimeMonitoring" || question.name === "incidentProtocols" || question.name === "logCorrelation" || question.name === "updateValidation" || question.name === "periodicAssessment" ? (
                                    <>
                                        <input
                                            type="radio"
                                            name={question.name}
                                            value="Yes"
                                            checked={formData[question.name] === "Yes"}
                                            onChange={handleChange}
                                        /> Yes
                                        <input
                                            type="radio"
                                            name={question.name}
                                            value="No"
                                            checked={formData[question.name] === "No"}
                                            onChange={handleChange}
                                        /> No
                                        <textarea
                                            className='comment-box'
                                            name={`${question.name}Comment`}
                                            placeholder="Comment (Optional)"
                                            value={formData[`${question.name}Comment`] || ''}
                                            onChange={handleChange}
                                        />
                                    </>
                                ) : (
                                    <textarea
                                        name={question.name}
                                        value={formData[question.name] || ''}
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

export default IntrusionDetectionSystems2Page;