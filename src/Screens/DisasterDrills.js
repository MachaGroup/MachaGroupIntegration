import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
// Imports adjusted: Added getDoc, removed getDocs, query, where, addDoc, storage
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

// Define questions array outside the component
const disasterDrillQuestions = [
    // Drill Frequency
    // Adapted from text input
    { name: "drillsConductedRegularly", label: "2.2.1.3.1. Disaster Drills: Are disaster drills conducted regularly (e.g., annually, quarterly)?" },
    { name: "scheduledDrillsRegularly", label: "2.2.1.3.1. Disaster Drills: Are drills scheduled consistently to ensure occupant familiarity?" }, // Slightly rephrased
    { name: "drillRotation", label: "2.2.1.3.1. Disaster Drills: Are different types of disaster drills (e.g., tornado, earthquake, fire) rotated?" }, // Simplified label
    // Scenario Variety
    { name: "scenarioRelevance", label: "2.2.1.3.1. Disaster Drills: Do drills cover scenarios relevant to the facility's location and risk profile?" },
    { name: "realisticScenarios", label: "2.2.1.3.1. Disaster Drills: Are drills tailored to simulate realistic scenarios, including varied severity?" }, // Simplified label
    { name: "lessonsLearnedApplied", label: "2.2.1.3.1. Disaster Drills: Are lessons learned from past incidents/drills used to inform future drill scenarios?" }, // Consistent name
    // Participant Engagement
    { name: "occupantParticipation", label: "2.2.1.3.1. Disaster Drills: Are all occupants (staff, visitors, etc.) actively involved in drills?" }, // Simplified label
    { name: "actionPractice", label: "2.2.1.3.1. Disaster Drills: Do drills engage participants in practicing specific actions (evacuation, sheltering)?" }, // Simplified label
    // Adapted from text input
    { name: "rolesAssignedDuringDrills", label: "2.2.1.3.1. Disaster Drills: Are designated individuals assigned specific roles/responsibilities during drills?" },
    // Evacuation Procedures
    { name: "evacuationPractice", label: "2.2.1.3.1. Disaster Drills: Are evacuation procedures clearly communicated and practiced during drills?" },
    { name: "routeReview", label: "2.2.1.3.1. Disaster Drills: Are evacuation routes identified, marked, and regularly reviewed?" }, // Simplified label
    { name: "conditionTesting", label: "2.2.1.3.1. Disaster Drills: Are drills conducted under various conditions (time of day, occupancy)?" }, // Simplified label
    // Sheltering Protocols
     // Adapted from text input
    { name: "shelteringProceduresEstablished", label: "2.2.1.3.1. Disaster Drills: Are sheltering procedures established for scenarios where evacuation isn't feasible/safe?" },
    // Adapted from text input
    { name: "shelterAreasDesignated", label: "2.2.1.3.1. Disaster Drills: Are designated shelter areas identified and equipped with necessary supplies?" },
    { name: "drillShelteringPractice", label: "2.2.1.3.1. Disaster Drills: Are drills conducted to practice sheltering procedures and assess shelter suitability?" }, // Simplified label
    // Communication and Notification
    // Adapted from text input
    { name: "drillNotificationProtocolExists", label: "2.2.1.3.1. Disaster Drills: Is there a defined protocol for initiating and communicating drills to occupants?" },
    { name: "systemTestingDuringDrills", label: "2.2.1.3.1. Disaster Drills: Are communication systems (PA, notifications) tested during drills?" },
    { name: "externalCoordinationPractice", label: "2.2.1.3.1. Disaster Drills: Are drills used to practice communication/coordination with external responders?" }, // Simplified label
    // Evaluation and Improvement
    // Adapted from text input
    { name: "drillEvaluationProcessExists", label: "2.2.1.3.1. Disaster Drills: Is there a defined process for evaluating drill effectiveness and identifying improvements?" },
    // Adapted from text input
    { name: "feedbackCollectionMechanismExists", label: "2.2.1.3.1. Disaster Drills: Are feedback mechanisms (e.g., surveys, debriefs) in place to gather input on drill performance?" },
    { name: "outcomesUpdatePlans", label: "2.2.1.3.1. Disaster Drills: Are drill outcomes used to update plans, procedures, and training?" }, // Simplified label
];


function DisasterDrillsFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    // Correct httpsCallable definition
    const uploadDisasterDrillsFormPageImage = httpsCallable(functions, 'uploadDisasterDrillsFormPageImage');

    // Updated state variables
    const [formData, setFormData] = useState({});
    const [imageData, setImageData] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(null); // Added loadError

    // useEffect using getDoc by ID
    useEffect(() => {
        if (!buildingId) {
            alert('No building selected. Redirecting to Building Info...');
            navigate('/BuildingandAddress');
            return;
        }

        const fetchFormData = async () => {
            setLoading(true);
            setLoadError(null);
             // Use buildingId directly as document ID
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Disaster Drills', buildingId);

            try {
                const docSnapshot = await getDoc(formDocRef);
                if (docSnapshot.exists()) {
                    const existingData = docSnapshot.data().formData || {};
                    setFormData(existingData);
                    if (existingData.imageUrl) {
                        setImageUrl(existingData.imageUrl);
                    }
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

    // handleChange saves immediately using setDoc by ID with correct structure
    const handleChange = async (e) => {
        const { name, value } = e.target;
        const newFormData = { ...formData, [name]: value };
        setFormData(newFormData);

        if (buildingId) {
            try {
                const buildingRef = doc(db, 'Buildings', buildingId);
                const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Disaster Drills', buildingId);
                const dataToSave = {
                     ...newFormData,
                     building: buildingRef,
                     ...(imageUrl && { imageUrl: imageUrl })
                 };
                await setDoc(formDocRef, { formData: dataToSave }, { merge: true });
                // console.log("Form data updated:", dataToSave);
            } catch (error) {
                console.error("Error saving form data:", error);
            }
        }
    };

    // handleImageChange using base64 - Looks good
    const handleImageChange = (e) => {
        const file = e.target.files[0];
         if (file) {
             const reader = new FileReader();
             reader.onloadend = () => {
                 setImageData(reader.result);
                 setImageUrl(null);
                 setImageUploadError(null);
             };
             reader.readAsDataURL(file);
         } else {
             setImageData(null);
         }
    };

    // handleBack is simplified
    const handleBack = () => {
        navigate(-1);
    };

    // handleSubmit uses Cloud Function and setDoc by ID with correct structure
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!buildingId) {
            alert('Building ID is missing. Cannot submit.');
            return;
        }

        setLoading(true);
        let finalImageUrl = formData.imageUrl || null;
        let submissionError = null;

        if (imageData) {
            try {
                console.log("Uploading image via Cloud Function...");
                // Use correct function variable name
                const uploadResult = await uploadDisasterDrillsFormPageImage({
                    imageData: imageData,
                    buildingId: buildingId
                 });
                finalImageUrl = uploadResult.data.imageUrl;
                setImageUrl(finalImageUrl);
                setImageUploadError(null);
                console.log("Image uploaded successfully:", finalImageUrl);
            } catch (error) {
                console.error('Error uploading image via function:', error);
                setImageUploadError(`Image upload failed: ${error.message}`);
                submissionError = "Image upload failed. Form data saved without new image.";
                 finalImageUrl = formData.imageUrl || null;
            }
        }

        const finalFormData = {
             ...formData,
             imageUrl: finalImageUrl,
        };
        setFormData(finalFormData);

        try {
            console.log("Saving final form data to Firestore...");
            const buildingRef = doc(db, 'Buildings', buildingId);
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Disaster Drills', buildingId);
            await setDoc(formDocRef, { formData: { ...finalFormData, building: buildingRef } }, { merge: true });
            console.log('Form data submitted successfully!');
            if (!submissionError) {
                alert('Form submitted successfully!');
            } else {
                alert(submissionError);
            }
            navigate('/Form');
        } catch (error) {
            console.error("Error saving final form data to Firestore:", error);
            alert("Failed to save final form data. Please check connection and try again.");
        } finally {
             setLoading(false);
        }
    };

    // Loading/Error Display - Looks good
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
                <h1>Disaster Drills Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Disaster Drills Assessment Questions</h2>

                    {/* Single .map call for all questions with standardized rendering */}
                    {disasterDrillQuestions.map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                <input
                                    type="radio"
                                    id={`${question.name}_yes`}
                                    name={question.name}
                                    value="yes"
                                    checked={formData[question.name] === "yes"}
                                    onChange={handleChange}
                                /> <label htmlFor={`${question.name}_yes`}>Yes</label>
                                <input
                                    type="radio"
                                    id={`${question.name}_no`}
                                    name={question.name}
                                    value="no"
                                    checked={formData[question.name] === "no"}
                                    onChange={handleChange}
                                /> <label htmlFor={`${question.name}_no`}>No</label>
                            </div>
                            {/* Use input type="text" for comments */}
                            <input
                                className='comment-input'
                                type="text"
                                name={`${question.name}Comment`}
                                placeholder="Additional comments"
                                value={formData[`${question.name}Comment`] || ''}
                                onChange={handleChange}
                            />
                        </div>
                    ))}

                    {/* Image upload section - Looks good */}
                    <div className="form-section">
                         <label htmlFor="imageUploadDisasterDrill">Upload Image (Optional):</label>
                         <input id="imageUploadDisasterDrill" type="file" onChange={handleImageChange} accept="image/*" />
                         {imageUrl && !imageData && <img src={imageUrl} alt="Uploaded Disaster Drill related" style={{ maxWidth: '200px', marginTop: '10px' }} />}
                         {imageData && <img src={imageData} alt="Preview Disaster Drill related" style={{ maxWidth: '200px', marginTop: '10px' }} />}
                         {imageUploadError && <p style={{ color: 'red' }}>{imageUploadError}</p>}
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit Final'}
                    </button>
                </form>
            </main>
        </div>
    );
}

export default DisasterDrillsFormPage;