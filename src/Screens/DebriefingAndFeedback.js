import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
// Corrected Firestore imports
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
// Firebase Functions imports
import { getFunctions, httpsCallable } from "firebase/functions";
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css'; // Assuming same CSS file
import Navbar from "./Navbar"; // Assuming same Navbar

// Define questions array outside the component
const debriefingQuestions = [
    // Corrected names to camelCase
    // Debriefing Process
    { name: "structuredDebriefing", label: "Is there a structured process for post-drill debriefing (timeframe, location)?" }, // Details in comments now
    { name: "facilitatorTraining", label: "Are debriefing sessions facilitated by trained personnel (e.g., safety officers)?" },
    { name: "stakeholderParticipation", label: "Are all relevant stakeholders (staff, occupants, management) invited?" }, // Simplified
    { name: "objectiveEstablishment", label: "Are clear objectives established for debriefings (assess, identify, capture lessons)?" }, // Details in comments now
    { name: "outcomeFocus", label: "Are debriefings focused on specific outcomes (enhance preparedness, refine procedures)?" }, // Simplified
    // Feedback and Participation
    { name: "participantContribution", label: "Are participants encouraged to actively contribute observations/feedback?" }, // Simplified
    { name: "feedbackSolicitation", label: "Is feedback solicited on drill execution aspects (communication, coordination, etc.)?" }, // Simplified
    { name: "facilitatorSkills", label: "Are facilitators skilled in promoting open communication?" }, // Simplified
    // Documentation and Records
    { name: "observationRecords", label: "Are detailed notes/records maintained during debriefings?" }, // Simplified
    { name: "structuredDocumentation", label: "Are observations documented in a structured format for analysis/follow-up?" },
    { name: "stakeholderAccess", label: "Are debriefing records accessible to relevant stakeholders?" }, // Simplified
    // Action Items and Follow-Up
    { name: "actionableItems", label: "Are actionable items identified during debriefings to address issues?" }, // Simplified
    { name: "priorityAssessment", label: "Are action items prioritized based on urgency/impact/feasibility?" },
    { name: "responsibilityAssignment", label: "Are responsible parties assigned to action items with target dates?" }, // Simplified
    // Adapted from text input
    { name: "trackingProcessExists", label: "Is there a process for tracking the implementation of action items?" },
    { name: "accountabilityMechanism", label: "Are responsible parties held accountable for completing action items?" },
    { name: "progressUpdates", label: "Are progress updates provided to stakeholders on action item status?" },
    // Continuous Improvement
    { name: "drivingImprovements", label: "Are debriefing recommendations used for continuous improvement?" }, // Simplified
    { name: "feedbackIntegration", label: "Are debriefings integrated into a broader feedback loop for training/planning?" }, // Simplified
    { name: "insightSharing", label: "Are insights/best practices shared with relevant stakeholders?" } // Simplified
];


function DebriefingAndFeedbackFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    // Correct httpsCallable definition - Name matches component
    const uploadDebriefingAndFeedbackFormPageImage = httpsCallable(functions, 'uploadDebriefingAndFeedbackFormPageImage');

    // Corrected state variables
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
            // Correct Firestore path
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Debriefing and Feedback', buildingId);

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
                const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Debriefing and Feedback', buildingId);
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
                const uploadResult = await uploadDebriefingAndFeedbackFormPageImage({
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
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Debriefing and Feedback', buildingId);
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
        // Removed outer div
        <div className="form-page">
            <header className="header">
                <Navbar />
                <button className="back-button" onClick={handleBack}>←</button>
                <h1>Debriefing and Feedback Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Debriefing & Feedback Questions</h2> {/* Added main heading */}

                    {/* Single .map call for all questions with standardized rendering */}
                    {debriefingQuestions.map((question, index) => (
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
                         <label htmlFor="imageUploadDebrief">Upload Image (Optional):</label>
                         <input id="imageUploadDebrief" type="file" onChange={handleImageChange} accept="image/*" />
                         {imageUrl && !imageData && <img src={imageUrl} alt="Uploaded Debriefing related" style={{ maxWidth: '200px', marginTop: '10px' }} />}
                         {imageData && <img src={imageData} alt="Preview Debriefing related" style={{ maxWidth: '200px', marginTop: '10px' }} />}
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

export default DebriefingAndFeedbackFormPage;