import React, { useState, useEffect } from 'react';
import { getFirestore, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function SevereWeatherMonitoringFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadImage = httpsCallable(functions, 'uploadSevereWeatherMonitoringImage');


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
                const formDocRef = doc(db, 'forms','Emergency Preparedness','Severe Weather Monitoring', buildingId);
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
            const formDocRef = doc(db, 'forms','Emergency Preparedness','Severe Weather Monitoring', buildingId);
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
            const formDocRef = doc(db, 'forms','Emergency Preparedness','Severe Weather Monitoring', buildingId);
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
                <h1>Severe Weather Monitoring Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Weather Alert Systems:</h2>
                    {[
                        { name: "Alert Systems Operational", label: "Are weather alert systems installed and operational within the facility?" },
                        { name: "Timely Notifications Provided", label: "Do alert systems provide timely notifications of severe weather events, including tornadoes, thunderstorms, hurricanes, or other hazards?" },
                        { name: "Multi-Channel Broadcasts", label: "Are alert systems capable of broadcasting alerts through various communication channels, such as sirens, public address systems, text messages, or mobile apps?" },
                        { name: "External Source Link", label: "Is the facility connected to external weather monitoring services or agencies for receiving up-to-date weather forecasts and warnings?" },
                        { name: "Automatic Alert Relay", label: "Are alert systems configured to automatically receive and relay weather alerts issued by national or local weather authorities?" },
                        { name: "alertSystemRedundancy", label: "Is there redundancy built into alert systems to ensure reliable reception and dissemination of weather alerts, even during power outages or network disruptions?" },
                        { name: "Activation Protocols Set", label: "Are there established protocols for activating weather alert systems based on the severity and proximity of approaching weather events?" },
                        { name: "Designated Personnel Authority", label: "Do designated personnel have the authority and training to initiate alert activations in accordance with established protocols?" },
                        { name: "Alert Verification Process", label: "Is there a process for verifying the authenticity and reliability of weather alerts before activating alert systems?" },
                        { name: "Prompt Alert Communication", label: "Are weather alerts communicated promptly to all occupants and stakeholders within the facility?" },
                        { name: "Tailored Communication Methods", label: "Are communication methods used to relay weather alerts tailored to the preferences and accessibility needs of different occupants, such as visual, auditory, or text-based alerts?" },
                        { name: "authenticityVerification", label: "Is there a process for verifying the authenticity and reliability of weather alerts before activating alert systems?" },
                        { name: "Response Procedures Set", label: "Are response procedures established for different types of severe weather events, such as tornadoes, hurricanes, floods, or lightning storms?" },
                        { name: "Specific Actions Defined", label: "Do response procedures outline specific actions to be taken by occupants, staff members, and security personnel in response to weather alerts?" },
                        { name: "Procedure Review Cycle", label: "Are response procedures regularly reviewed and updated based on lessons learned from past incidents or changes in weather patterns?" },
                        { name: "Occupant Training Provided", label: "Are staff members and occupants trained on how to interpret weather alerts and respond appropriately during severe weather events?" },
                        { name: "Training Material Availability", label: "Are training materials and resources provided to educate occupants on sheltering procedures, evacuation routes, and other safety measures related to severe weather?" },
                        { name: "Drill Simulation Conducted", label: "Are drills or simulations conducted periodically to practice response procedures and ensure readiness for severe weather emergencies?" },
                        { name: "System Evaluation Process", label: "Is there a process for evaluating the effectiveness of weather alert systems and response procedures?" },
                        { name: "Feedback Mechanisms Active", label: "Are feedback mechanisms in place to gather input from occupants and stakeholders on the timeliness and clarity of weather alerts and response efforts?" },
                        { name: "Improvement Recommendations Used", label: "Are recommendations from evaluations and feedback used to improve weather monitoring systems, communication protocols, and preparedness for future severe weather events?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.name === "Alert Systems Operational" || question.name === "Timely Notifications Provided" || question.name === "Multi-Channel Broadcasts" || question.name === "External Source Link" || question.name === "Automatic Alert Relay" || question.name === "Activation Protocols Set" || question.name === "Designated Personnel Authority" || question.name === "Alert Verification Process" || question.name === "Prompt Alert Communication" || question.name === "Tailored Communication Methods" || question.name === "Authenticity Verification" || question.name === "Response Procedures Set" || question.name === "Specific Actions Defined" || question.name === "Procedure Review Cycle" || question.name === "Occupant Training Provided" || question.name === "Training Material Availability" || question.name === "Drill Simulation Conducted" || question.name === "System Evaluation Process" || question.name === "Feedback Mechanisms Active" || question.name === "Improvement Recommendations Used" ? (
                                    <>
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
                            
                                    </>
                                ) : (
                                    <input
                                        type="text"
                                        name={question.name}
                                        value={formData[question.name] || ''}
                                        onChange={handleChange}
                                    />
                                )}
                            </div>
                            <div>
                            <input
                                            type="text"
                                            name={`${question.name}Comment`}
                                            placeholder="Comments"
                                            value={formData[`${question.name}Comment`] || ''}
                                            onChange={handleChange}
                                        />
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

export default SevereWeatherMonitoringFormPage;