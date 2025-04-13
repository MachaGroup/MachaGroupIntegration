import React, { useState, useEffect } from 'react';
// Firestore imports aligned with the standard pattern
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'; // Removed unused 'collection'
// Firebase Functions imports
import { getFunctions, httpsCallable } from "firebase/functions";
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css'; // Assuming same CSS file
import logo from '../assets/MachaLogo.png'; // Assuming same logo
import Navbar from "./Navbar"; // Assuming same Navbar

// Define questions array outside the component
const fireDrillQuestions = [
    // Drill Frequency
    // Adapted from text input
    { name: "conductedFireDrillsRegularly", label: "Are fire drills conducted regularly?" },
    { name: "regularDrillSchedule", label: "Are fire drills scheduled regularly for occupant familiarity?" }, // Simplified
    { name: "varyingDrillTimes", label: "Are drills conducted at different times (day/shifts)?" }, // Simplified
    // Notification Procedures
    // Adapted from text input
    { name: "drillInitiationProtocolExists", label: "Is there a defined protocol for initiating fire drills and notifying occupants?" },
    { name: "notificationTesting", label: "Are notification methods tested during drills?" }, // Simplified
    // Adapted from text input
    { name: "absentIndividualSystemExists", label: "Is there a system to account for individuals absent during scheduled drills?" },
    // Drill Procedures
    { name: "definedDrillProcedures", label: "Are fire drill procedures clearly defined and communicated?" },
    { name: "occupantSpecificActions", label: "Do drills include specific actions (evacuation routes, assembly points)?" }, // Corrected typo in original name
    { name: "scenarioBasedDrills", label: "Are drills conducted simulating different scenarios (fire location, obstacles)?" }, // Simplified
    // Evacuation Routes and Assembly Points
    { name: "markedEvacRoutes", label: "Are designated evacuation routes and assembly points clearly marked?" },
    { name: "safeEvacKnowledge", label: "Do occupants know how to quickly/safely evacuate during drills?" }, // Simplified
    { name: "altEvacRoutes", label: "Are alternative evacuation routes available and known?" },
    // Accountability and Monitoring
    // Adapted from text input
    { name: "occupantAccountProcessExists", label: "Is there a defined process for accounting for occupants during drills?" },
    // Adapted from text input
    { name: "staffDrillResponsibilitiesAssigned", label: "Are staff assigned roles for accountability/monitoring during drills?" },
    { name: "drillFeedbackCollection", label: "Is feedback gathered from participants after drills?" },
    // Evaluation and Improvement
    // Adapted from text input
    { name: "effectivenessEvaluationMechanism", label: "Is there a mechanism for evaluating drill effectiveness?" },
    { name: "postDrillDebriefing", label: "Are debriefing sessions held after drills to review performance/lessons learned?" }, // Simplified
    { name: "recommendationImplementation", label: "Are recommendations from evaluations implemented to enhance preparedness?" }, // Simplified
    // Documentation and Records
    { name: "drillRecordKeeping", label: "Are records maintained for all drills (date, time, participants, observations)?" },
    { name: "recordPeriodicReview", label: "Are drill records reviewed periodically for compliance/trends?" }, // Simplified
    { name: "correctiveActionDocumentation", label: "Are deficiencies documented and corrective actions taken?" } // Simplified - Renamed 'deficienciesAddressed'
];


function FireDrillFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
     // Renamed variable for clarity
    const uploadFireDrillFormImage = httpsCallable(functions, 'uploadFireDrillFormImage');

    // State aligned with the standard pattern - Looks good
    const [formData, setFormData] = useState({});
    const [imageData, setImageData] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);

    // useEffect for fetching data on load - Looks good
    useEffect(() => {
        if (!buildingId) {
            alert('No building selected. Redirecting to Building Info...');
            navigate('/BuildingandAddress');
            return;
        }

        const fetchFormData = async () => {
            setLoading(true);
            setLoadError(null);
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Fire Drill', buildingId);

            try {
                const docSnapshot = await getDoc(formDocRef);
                if (docSnapshot.exists()) {
                    const existingData = docSnapshot.data().formData || {};
                    setFormData(existingData);
                    setImageUrl(existingData.imageUrl || null); // Use optional chaining
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

    // handleChange saves data on every change with correct structure
    const handleChange = async (e) => {
        const { name, value } = e.target;
         // Value is already 'yes' or 'no' from radio buttons
        const newFormData = { ...formData, [name]: value };
        setFormData(newFormData);

        if (buildingId) {
            try {
                const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Fire Drill', buildingId);
                const buildingRef = doc(db, 'Buildings', buildingId);
                // Include existing imageUrl in save data
                const dataToSave = {
                    ...newFormData,
                    building: buildingRef,
                    ...(imageUrl && { imageUrl: imageUrl }) // Preserve existing imageUrl
                };
                await setDoc(formDocRef, { formData: dataToSave }, { merge: true });
                // console.log("Form data auto-saved:", dataToSave);
            } catch (error) {
                console.error("Error auto-saving form data:", error);
                // Optionally show a non-blocking error to the user
            }
        }
    };

    // handleImageChange using FileReader - Looks good
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

    // handleBack now only navigates - Looks good
    const handleBack = () => {
        navigate(-1);
    };

    // handleSubmit using Cloud Function for upload with correct structure
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!buildingId) {
            alert('Building ID is missing. Please start from the Building Information page.');
            return;
        }

        setLoading(true);
        let finalImageUrl = formData.imageUrl || null;
        let submissionError = null;

        if (imageData) {
             setImageUploadError(null);
            try {
                console.log("Uploading image...");
                 // Use correct function variable name
                const uploadResult = await uploadFireDrillFormImage({
                    imageData: imageData,
                    buildingId: buildingId
                 });
                finalImageUrl = uploadResult.data.imageUrl;
                setImageUrl(finalImageUrl);
                console.log("Image uploaded successfully:", finalImageUrl);
            } catch (error) {
                console.error('Error uploading image via Cloud Function:', error);
                setImageUploadError(error.message || "Failed to upload image.");
                submissionError = `Image upload failed: ${error.message || "Unknown error"}`;
                 finalImageUrl = formData.imageUrl || null;
                // alert(submissionError); // Alert moved after save attempt
            }
        }

         // Prepare final data object including definitive image URL
        const finalFormData = { ...formData, imageUrl: finalImageUrl };
        setFormData(finalFormData); // Update state to final version

        try {
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Fire Drill', buildingId);
            const buildingRef = doc(db, 'Buildings', buildingId);
             // Save final data with correct structure, including building ref
            await setDoc(formDocRef, { formData: { ...finalFormData, building: buildingRef } }, { merge: true });

            console.log('Form data submitted successfully!');
             if (!submissionError) {
                 alert('Form submitted successfully!');
             } else {
                 alert(submissionError); // Show image error now if save succeeded anyway
             }
            navigate('/Form');
        } catch (error) {
            console.error("Error submitting final form data:", error);
            alert("Failed to submit the form. Please check your connection and try again.");
        } finally {
             setLoading(false);
        }
    };

    // Loading and Error display - Looks good
    if (loading) {
        return <div>Loading...</div>;
    }
    if (loadError) {
        return <div>Error: {loadError}</div>;
    }

    return (
        // Removed outer wrapper div
        <div className="form-page">
            <header className="header">
                <Navbar />
                <button className="back-button" onClick={handleBack}>←</button>
                <h1>Fire Drill Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                     <h2>Fire Drill Questions</h2> {/* Added main heading */}
                    {/* Render questions dynamically using single map */}
                    {fireDrillQuestions.map((question, index) => (
                        <div key={question.name} className="form-section"> {/* Use name for key */}
                            <label htmlFor={`${question.name}_yes`}>{question.label}</label> {/* Associate label */}

                             {/* Standard Yes/No Radio + Comment Input */}
                            <div>
                                <input
                                    type="radio"
                                    id={`${question.name}_yes`}
                                    name={question.name}
                                    value="yes" // Standardized value
                                    checked={formData[question.name] === "yes"}
                                    onChange={handleChange}
                                />
                                <label htmlFor={`${question.name}_yes`}> Yes</label>

                                <input
                                    type="radio"
                                    id={`${question.name}_no`}
                                    name={question.name}
                                    value="no" // Standardized value
                                    checked={formData[question.name] === "no"}
                                    onChange={handleChange}
                                />
                                <label htmlFor={`${question.name}_no`}> No</label>
                            </div>
                            <input
                                type="text"
                                id={`${question.name}Comment`}
                                name={`${question.name}Comment`} // Standard comment name
                                placeholder="Additional comments"
                                value={formData[`${question.name}Comment`] || ''}
                                onChange={handleChange}
                                className='comment-input' // Use consistent class
                            />
                        </div>
                    ))}

                    {/* File Input for Image Upload */}
                    <div className="form-section">
                         <label htmlFor="imageUploadFireDrill">Upload Image (Optional):</label>
                         <input id="imageUploadFireDrill" type="file" onChange={handleImageChange} accept="image/*" />
                         {imageUrl && !imageData && <img src={imageUrl} alt="Uploaded Fire Drill Context" style={{ maxWidth: '200px', marginTop: '10px' }}/>}
                         {imageData && <img src={imageData} alt="Preview Fire Drill Context" style={{ maxWidth: '200px', marginTop: '10px' }}/>}
                         {imageUploadError && <p style={{ color: 'red' }}>{imageUploadError}</p>}
                    </div>

                    {/* Submit Button */}
                    <button type="submit" disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit Final'}
                    </button>
                </form>
            </main>
        </div>
    );
}

export default FireDrillFormPage;