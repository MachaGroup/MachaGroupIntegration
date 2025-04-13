import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
// Corrected Firestore imports
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
// Added Functions imports
import { getFunctions, httpsCallable } from "firebase/functions";
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import Navbar from "./Navbar";

// Define questions array outside the component
const earthquakeDrillQuestions = [
    // Drill Frequency
    // Adapted from text input
    { name: "conductedRegularly", label: "Are earthquake drills conducted regularly?" },
    { name: "drillFrequencyScheduled", label: "Are drills scheduled regularly for occupant familiarity?" }, // Corrected name and simplified
    { name: "drillTimingVariability", label: "Are drills conducted at different times (day/shifts)?" }, // Corrected name and simplified
    // Notification Procedures
    // Adapted from text input
    { name: "notificationProtocolExists", label: "Is there a defined protocol for initiating drills and notifying occupants?" },
    { name: "notificationTesting", label: "Are notification methods tested during drills for timely dissemination?" },
    // Adapted from text input
    { name: "absentOccupantSystemExists", label: "Is there a system to account for individuals absent during drills?" },
    // Drill Procedures
    { name: "procedureClarity", label: "Are earthquake drill procedures clearly defined and communicated?" },
    { name: "occupantDrillActions", label: "Do drills include specific actions ('Drop, Cover, Hold On')?" }, // Corrected name
    { name: "scenarioSimulation", label: "Are drills conducted simulating different scenarios (intensity, duration)?" }, // Corrected name
    // Safe Zones and Evacuation Routes
    { name: "safeZoneMarking", label: "Are designated safe zones and evacuation routes clearly marked?" },
    { name: "safeZoneMovement", label: "Do occupants know how to quickly/safely move to safe zones during drills?" },
    // Adapted from text input
    { name: "alternateRoutesAvailable", label: "Are alternative evacuation routes available and known?" },
    // Accountability and Monitoring
    // Adapted from text input
    { name: "occupantAccountingProcessExists", label: "Is there a defined process for accounting for occupants during drills?" },
    { name: "staffResponsibilities", label: "Are staff assigned roles for accountability/monitoring?" }, // Corrected name
    { name: "participantFeedbackCollection", label: "Is feedback gathered from participants after drills?" },
    // Evaluation and Improvement
     // Adapted from text input
    { name: "drillEvaluationMechanismExists", label: "Is there a defined mechanism for evaluating drill effectiveness?" },
    { name: "debriefSessions", label: "Are debriefing sessions held after drills to review performance/lessons learned?" }, // Corrected name
    { name: "recommendationImplementation", label: "Are recommendations from evaluations implemented to enhance preparedness?" }, // Corrected name
    // Documentation and Records
    { name: "drillRecordKeeping", label: "Are records maintained for all drills (date, time, participants, observations)?" },
    { name: "recordReview", label: "Are drill records reviewed periodically for compliance/trends?" },
    { name: "deficiencyDocumentation", label: "Are deficiencies documented and corrective actions taken?" } // Corrected name
];


function EarthquakeDrillsPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    // Define httpsCallable function
    const uploadEarthquakeDrillsImage = httpsCallable(functions, 'uploadEarthquakeDrillsImage');

    // Corrected state variables
    const [formData, setFormData] = useState({});
    const [imageData, setImageData] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);

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
             // Correct Firestore path
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Earthquake Drills', buildingId);

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
                const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Earthquake Drills', buildingId);
                const dataToSave = {
                     ...newFormData,
                     building: buildingRef,
                     ...(imageUrl && { imageUrl: imageUrl })
                 };
                await setDoc(formDocRef, { formData: dataToSave }, { merge: true });
                // console.log("Form data updated:", dataToSave);
            } catch (error) {
                console.error("Error saving form data to Firestore:", error);
                // Avoid alerting on every change
            }
        }
    };

    // handleImageChange using base64
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

    // handleBack simplified
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
                const uploadResult = await uploadEarthquakeDrillsImage({
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
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Earthquake Drills', buildingId);
            // Corrected typo: buildling -> building
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

    // Loading/Error Display
    if (loading) {
        return <div>Loading...</div>;
    }
    if (loadError) {
        return <div>Error: {loadError}</div>;
    }

    return (
         // Removed outer div if it existed
        <div className="form-page">
            <header className="header">
                <Navbar />
                <button className="back-button" onClick={handleBack}>←</button>
                <h1>Earthquake Drills Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                     <h2>Earthquake Drill Questions</h2> {/* Added main heading */}

                    {/* Single .map call for all questions with standardized rendering */}
                    {earthquakeDrillQuestions.map((question, index) => (
                        <div key={question.name} className="form-section"> {/* Use name for key */}
                            <label>{question.label}</label>
                            {/* Div for radio buttons */}
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
                            {/* Input for comments */}
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
                         <label htmlFor="imageUploadEarthquake">Upload Image (Optional):</label>
                         <input id="imageUploadEarthquake" type="file" onChange={handleImageChange} accept="image/*" />
                         {imageUrl && !imageData && <img src={imageUrl} alt="Uploaded Earthquake Drill related" style={{ maxWidth: '200px', marginTop: '10px' }} />}
                         {imageData && <img src={imageData} alt="Preview Earthquake Drill related" style={{ maxWidth: '200px', marginTop: '10px' }} />}
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

export default EarthquakeDrillsPage;