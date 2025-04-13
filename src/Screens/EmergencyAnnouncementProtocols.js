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
const announcementProtocolQuestions = [
    // Corrected names to camelCase
    { name: "standardizedMessageTemplates", label: "Are standardized message templates developed for various emergencies?" }, // Simplified
    { name: "essentialInfoIncluded", label: "Do templates include essential info (nature, actions, instructions)?" }, // Simplified - Made Yes/No
    { name: "scriptedEmergencyAnnouncements", label: "Are emergency announcements scripted for clarity and conciseness?" }, // Simplified
    { name: "scriptsAvoidConfusion", label: "Do scripts avoid jargon or ambiguous language?" }, // Simplified
    { name: "appropriateAnnouncements", label: "Are announcements tailored to the audience (age, language, ability)?" }, // Simplified
    { name: "structuredScriptedMessages", label: "Do messages follow a structured format (emergency type, location, actions)?" }, // Simplified
    { name: "messagesProvideGuidance", label: "Are messages designed to provide actionable guidance?" }, // Simplified
    { name: "reviewedScripts", label: "Are scripts reviewed/approved by appropriate authorities (safety, emergency mgmt)?" }, // Simplified
    // Adapted from special rendering
    { name: "consistencyProcessExists", label: "Is there a process for ensuring consistency/accuracy (incl. periodic updates)?" },
    { name: "trainedIndividuals", label: "Are individuals delivering announcements trained on scripts/protocols?" }, // Simplified
    { name: "trainingProgramsIncludePractice", label: "Do training programs include practice sessions for different emergencies?" }, // Simplified - Renamed 'trainingPrograms'
    { name: "resourcesProvided", label: "Are operators provided resources (cue cards, guides) for accurate delivery?" }, // Simplified - Renamed 'deliveringMessagesResources'
    { name: "adaptableScriptedMessages", label: "Are scripted messages adaptable to variations in scenarios?" },
    { name: "flexibilityInTemplates", label: "Is flexibility built into templates for real-time updates?" }, // Simplified
    { name: "evaluatedEffectiveness", label: "Are scripted messages evaluated for effectiveness during drills/emergencies?" },
    { name: "feedbackSolicited", label: "Is feedback solicited from occupants/stakeholders on message clarity/usefulness?" }, // Simplified
    { name: "recommendationsRefineMessages", label: "Are recommendations used to refine messages and improve efficacy?" } // Simplified
];


function EmergencyAnnouncementProtocolsFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
     // Renamed variable for clarity
    const uploadEmergencyAnnouncementProtocolsImage = httpsCallable(functions, 'uploadEmergencyAnnouncementProtocolsImage');

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
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Emergency Announcement Protocols', buildingId);

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

    // handleChange saves data immediately with correct structure
    const handleChange = async (e) => {
        const { name, value } = e.target;
        const newFormData = { ...formData, [name]: value };
        setFormData(newFormData);

        if (buildingId) {
            try {
                const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Emergency Announcement Protocols', buildingId);
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

    // handleSubmit uses Cloud Function for upload with correct structure
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
                const uploadResult = await uploadEmergencyAnnouncementProtocolsImage({
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

        const finalFormData = { ...formData, imageUrl: finalImageUrl };
        setFormData(finalFormData); // Update state to final version

        try {
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Emergency Announcement Protocols', buildingId);
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
                <h1>Emergency Announcement Protocols Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                     <h2>Announcement Protocol Questions</h2> {/* Added main heading */}
                    {/* Render questions dynamically using single map */}
                    {announcementProtocolQuestions.map((question, index) => (
                        <div key={question.name} className="form-section"> {/* Use name for key */}
                            <label htmlFor={`${question.name}_yes`}>{question.label}</label> {/* Associate label */}

                             {/* Standard Yes/No Radio + Comment Input */}
                            <div>
                                <input
                                    type="radio"
                                    id={`${question.name}_yes`}
                                    name={question.name}
                                    value="yes"
                                    checked={formData[question.name] === "yes"}
                                    onChange={handleChange}
                                />
                                <label htmlFor={`${question.name}_yes`}> Yes</label>

                                <input
                                    type="radio"
                                    id={`${question.name}_no`}
                                    name={question.name}
                                    value="no"
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
                         <label htmlFor="imageUploadAnnounceProto">Upload Image (Optional):</label>
                         <input id="imageUploadAnnounceProto" type="file" onChange={handleImageChange} accept="image/*" />
                         {imageUrl && !imageData && <img src={imageUrl} alt="Uploaded Announcement Protocol related" style={{ maxWidth: '200px', marginTop: '10px' }}/>}
                         {imageData && <img src={imageData} alt="Preview Announcement Protocol related" style={{ maxWidth: '200px', marginTop: '10px' }}/>}
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

export default EmergencyAnnouncementProtocolsFormPage;