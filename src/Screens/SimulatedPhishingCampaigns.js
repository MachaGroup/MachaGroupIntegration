import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function SimulatedPhishingCampaignsPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadSimulatedPhishingCampaignsImage = httpsCallable(functions, 'uploadSimulatedPhishingCampaignsImage');

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
                const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Simulated Phishing Campaigns', buildingId);
                const docSnapshot = await getDoc(formDocRef);

                if (docSnapshot.exists()) {
                    setFormData(docSnapshot.data().formData || {});
                    setImageUrl(docSnapshot.data().imageUrl || null);
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
            const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Simulated Phishing Campaigns', buildingId);
            await setDoc(formDocRef, { formData: { ...newFormData, building: buildingRef } }, { merge: true });
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
                const uploadResult = await uploadSimulatedPhishingCampaignsImage({ imageData: imageData });
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
            const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Simulated Phishing Campaigns', buildingId);
            await setDoc(formDocRef, { formData: { ...formData, building: buildingRef }, imageUrl: imageUrl, updatedAt: serverTimestamp() }, { merge: true });
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
                <h1>Simulated Phishing Campaigns Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Simulated Phishing Campaigns Assessment</h2>
                    {[
                        { name: "phishingDesign", label: "How are simulated phishing campaigns designed to reflect realistic phishing threats and tactics?" },
                        { name: "phishingCriteria", label: "What criteria are used to select the timing, frequency, and targets of these simulated phishing campaigns?" },
                        { name: "emailDifficultyVariety", label: "Are the simulated phishing emails varied in difficulty to test different levels of user awareness and susceptibility?" },
                        { name: "userResponseTracking", label: "How are user responses to simulated phishing attempts tracked and analyzed to identify trends and common vulnerabilities?" },
                        { name: "feedbackMechanism", label: "Is there an immediate feedback mechanism in place to inform users whether they have successfully identified a phishing attempt or fallen for the simulation?" },
                        { name: "userFeedbackIncorporation", label: "How is user feedback incorporated into improving the design and effectiveness of future simulated phishing campaigns?" },
                        { name: "trainingResources", label: "Are users provided with training or resources after a simulated phishing campaign to help them better identify phishing attempts in the future?" },
                        { name: "trainingUpdateFrequency", label: "How often is phishing awareness training updated to reflect the latest phishing tactics and trends?" },
                        { name: "followUpTraining", label: "Is there a follow-up process to ensure that users who fail the simulation receive additional training or support?" },
                        { name: "campaignMetrics", label: "What metrics are used to evaluate the effectiveness of simulated phishing campaigns (e.g., click rates, reporting rates, repeat offenders)?" },
                        { name: "metricsReporting", label: "How are these metrics reported to stakeholders, and are they used to inform cybersecurity policies and procedures?" },
                        { name: "benchmarkingProcess", label: "Is there a process for benchmarking these metrics against industry standards or previous campaign results to measure improvement over time?" },
                        { name: "campaignResultsImprovement", label: "How are the results of simulated phishing campaigns used to continuously improve phishing awareness and training programs?" },
                        { name: "simulationUpdates", label: "Are there regular reviews and updates to the simulation content to adapt to new phishing techniques and emerging threats?" },
                        { name: "campaignEngagement", label: "How does the organization ensure that the simulated phishing campaigns remain challenging and engaging for users to prevent complacency?" },
                        { name: "itSecurityInvolvement", label: "How are the IT and security teams involved in the planning and execution of simulated phishing campaigns?" },
                        { name: "securityAnalysisProcess", label: "Is there a process for these teams to analyze data from simulations to identify potential security gaps or areas for improvement?" },
                        { name: "teamCoordination", label: "How does coordination with these teams enhance the overall effectiveness of the phishing simulation program?" },
                        { name: "phishingImpactStrategy", label: "How do simulated phishing campaigns contribute to the organization’s broader cybersecurity strategy?" },
                        { name: "impactAssessment", label: "Are there measures in place to assess the impact of these campaigns on reducing real-world phishing incidents?" },
                        { name: "phishingProgramSuccess", label: "How is the success of the phishing simulation program linked to other user awareness and cybersecurity initiatives within the organization?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.name === "emailDifficultyVariety" || question.name === "feedbackMechanism" || question.name === "trainingResources" || question.name === "followUpTraining" || question.name === "benchmarkingProcess" || question.name === "simulationUpdates" || question.name === "securityAnalysisProcess" || question.name === "impactAssessment" ? (
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
                                        <input
                                            type="text"
                                            name={`${question.name}Comment`}
                                            placeholder="Comments"
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
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
                    {imageUploadError && <p style={{ color: "red" }}>{imageUploadError}</p>}
                    <button type="submit">Submit</button>
                </form>
            </main>
        </div>
    );
}

export default SimulatedPhishingCampaignsPage;