import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getFunctions, httpsCallable } from "firebase/functions";
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function UserBehaviorAnalyticsPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadImage = httpsCallable(functions, 'uploadUserBehaviorAnalyticsImage');

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
                const formDocRef = doc(db, 'forms', 'Cybersecurity', 'User Behavior Analytics', buildingId);
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
            const buildingRef = doc(db, 'Buildings', buildingId); // Create buildingRef
            const formDocRef = doc(db, 'forms', 'Cybersecurity', 'User Behavior Analytics', buildingId);
            await setDoc(formDocRef, { formData: { ...newFormData, building: buildingRef } }, { merge: true }); // Use merge and add building
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
            const formDocRef = doc(db, 'forms', 'Cybersecurity', 'User Behavior Analytics', buildingId);
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
                <h1>User Behavior Analytics (UBA)</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>User Behavior Analytics</h2>
                    {[
                        { name: "userActivityData", label: "What types of user activity data are collected and analyzed (e.g., login times, access patterns, application usage)?" },
                        { name: "dataCollectionProcess", label: "How is user behavior data collected, and are there any privacy considerations or limitations in the data collection process?" },
                        { name: "analysisMethods", label: "What methods are used to analyze user behavior data to identify deviations from normal patterns?" },
                        { name: "baselineEstablishment", label: "How are baseline behaviors for users or user groups established, and how are these baselines maintained and updated?" },
                        { name: "criteriaMetrics", label: "What criteria or metrics are used to define normal versus anomalous behavior?" },
                        { name: "mechanismsForChanges", label: "Are there mechanisms in place to account for changes in user behavior due to legitimate reasons (e.g., role changes, seasonal variations)?" },
                        { name: "anomalyDetection", label: "How does UBA identify deviations from established baseline behaviors, and what algorithms or techniques are used for anomaly detection?" },
                        { name: "thresholdsForAlerts", label: "What thresholds or criteria trigger alerts for anomalous behavior, and how are these thresholds set?" },
                        { name: "falsePositivesHandling", label: "How are false positives and false negatives managed to minimize disruptions and ensure accurate detection?" },
                        { name: "alertingProcess", label: "How are alerts generated for detected anomalies, and what is the process for investigating and responding to these alerts?" },
                        { name: "responseProtocols", label: "Are there predefined response protocols or escalation procedures for different types of anomalies detected by UBA?" },
                        { name: "alertPrioritization", label: "How are alerts prioritized and managed to ensure timely and appropriate response to potential security incidents?" },
                        { name: "ubaIntegration", label: "How is UBA integrated with other security systems, such as Security Information and Event Management (SIEM) solutions or Intrusion Detection Systems (IDS)?" },
                        { name: "correlationMechanisms", label: "Are there mechanisms in place to correlate UBA data with other security events or incidents for a comprehensive view of potential threats?" },
                        { name: "ubaEnhancements", label: "How is information from UBA used to enhance overall security posture and incident response capabilities?" },
                        { name: "privacyCompliance", label: "How does UBA ensure user privacy and comply with relevant regulations and policies (e.g., GDPR, CCPA)?" },
                        { name: "dataAnonymization", label: "What measures are in place to anonymize or protect user data during collection and analysis?" },
                        { name: "userConsent", label: "How are users informed about the monitoring of their behavior, and how are their consent and privacy rights managed?" },
                        { name: "performanceMetrics", label: "How is the effectiveness of UBA assessed, and what metrics or benchmarks are used to evaluate its performance?" },
                        { name: "regularReviews", label: "Are there regular reviews or assessments of UBA systems to ensure they are functioning as expected and adapting to evolving threats?" },
                        { name: "feedbackIncorporation", label: "How are feedback and lessons learned from previous incidents incorporated into the UBA strategy to improve detection and response?" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <textarea
                                name={question.name}
                                value={formData[question.name] || ''}
                                onChange={handleChange}
                                placeholder={question.label}
                            />
                        </div>
                    ))}
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
                    {imageUploadError && <p style={{ color: "red" }}>{imageUploadError}</p>}
                    <button type="submit">Submit</button>
                </form>
            </main>
        </div>
    );
}

export default UserBehaviorAnalyticsPage;