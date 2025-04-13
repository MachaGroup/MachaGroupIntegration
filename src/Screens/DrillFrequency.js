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
const drillFrequencyQuestions = [
    // Corrected names to camelCase
    // Adapted from text input
    { name: "plannedFrequencyDefined", label: "1. Is there a defined plan regarding the frequency of emergency drills?" },
    { name: "predefinedSchedule", label: "2. Is there a predefined schedule for conducting drills (e.g., monthly, quarterly)?" }, // Typo fixed
    { name: "regulationBasedFrequency", label: "3. Are drill frequencies based on regulations, policies, and best practices?" },
    { name: "scheduleConsistency", label: "4. Are drills conducted consistently according to the established schedule?" },
    { name: "deviationDocumentation", label: "5. Are deviations from the schedule documented and justified?" },
    // Adapted from text input
    { name: "complianceProcessExists", label: "6. Is there a process for ensuring compliance with scheduled frequencies?" },
    { name: "scenarioDiversity", label: "7. Are different types of drills included to cover various scenarios/hazards?" },
    { name: "multiSituationCoverage", label: "8. Do drills address various emergencies (fire, earthquake, active threat, etc.)?" },
    { name: "locationCoverage", label: "9. Are drills conducted in different areas of the facility?" },
    { name: "stakeholderInvolvement", label: "10. Are all relevant stakeholders (staff, occupants, management) involved?" },
    { name: "agencyCoordination", label: "11. Are drills coordinated with external agencies (e.g., emergency responders)?" },
    { name: "stakeholderEngagement", label: "12. Are drills used to engage/educate stakeholders on procedures/roles?" },
    { name: "drillEffectivenessEvaluation", label: "13. Are drills evaluated for effectiveness in achieving objectives?" }, // Renamed 'Drill Effectiveness'
    // Adapted from text input
    { name: "feedbackMechanismsExist", label: "14. Are feedback mechanisms (surveys, debriefs) in place to capture observations?" },
    { name: "outcomeAnalysis", label: "15. Are drill outcomes analyzed to identify strengths/areas for improvement?" },
    { name: "frequencyAdjustment", label: "16. Is drill frequency adjusted based on risks, needs, regulations, and lessons learned?" },
    { name: "scheduleFlexibility", label: "17. Is the drill schedule flexible to accommodate emerging threats/changes?" },
    // Adapted from text input
    { name: "feedbackIntegrationProcessExists", label: "18. Is there a process for incorporating feedback into future planning?" },
    { name: "drillRecordkeeping", label: "19. Are records maintained documenting drill scheduling, execution, and outcomes?" },
    { name: "recordsAccessibility", label: "20. Are drill records accessible for review, analysis, and compliance checks?" }, // Simplified
    { name: "retentionPolicy", label: "21. Are drill schedules/records retained according to regulations/policies?" } // Simplified
];


function DrillFrequencyFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    // Define httpsCallable function for this component
    const uploadDrillFrequencyImage = httpsCallable(functions, 'uploadDrillFrequencyImage');

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
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Drill Frequency', buildingId);

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
                const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Drill Frequency', buildingId);
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
                const uploadResult = await uploadDrillFrequencyImage({
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
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Drill Frequency', buildingId);
            // Save final data with correct structure, including building ref
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
                <h1>Drill Frequency Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                     <h2>Drill Frequency Questions</h2> {/* Added main heading */}

                    {/* Single .map call for all questions with standardized rendering */}
                    {drillFrequencyQuestions.map((question, index) => (
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
                                name={`${question.name}Comment`} // Corrected comment name format
                                placeholder="Additional comments"
                                value={formData[`${question.name}Comment`] || ''}
                                onChange={handleChange}
                            />
                        </div>
                    ))}

                    {/* Image upload section - Looks good */}
                     <div className="form-section">
                         <label htmlFor="imageUploadDrillFreq">Upload Image (Optional):</label>
                         <input id="imageUploadDrillFreq" type="file" onChange={handleImageChange} accept="image/*" />
                         {imageUrl && !imageData && <img src={imageUrl} alt="Uploaded Drill Freq. related" style={{ maxWidth: '200px', marginTop: '10px' }} />}
                         {imageData && <img src={imageData} alt="Preview Drill Freq. related" style={{ maxWidth: '200px', marginTop: '10px' }} />}
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

export default DrillFrequencyFormPage;