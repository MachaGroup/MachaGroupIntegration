import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
// Corrected Firestore imports
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
// Added Functions imports
import { getFunctions, httpsCallable } from "firebase/functions";
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import Navbar from "./Navbar";

// Define questions array outside the component
const commLanguageQuestions = [
    // Corrected names to camelCase
    // Language Diversity Assessment
    { name: "languageAssessConducted", label: "Has an assessment identified language diversity among parents/guardians?" }, // Simplified
    { name: "languagePrevalenceIdentified", label: "Are prevalent non-primary languages identified?" }, // Details in comment
    // Multilingual Notification Capability
    { name: "multiLangNotifyCapable", label: "Can the communication system send notifications in multiple languages?" },
    { name: "notifyLangCustomizable", label: "Can notification language be customized based on recipient preference/profile?" }, // Simplified
    // Translation Services
    { name: "translationServicesAvailable", label: "Are translation services/resources available for emergency notifications?" }, // Simplified - Renamed 'TranslationServicesAvail'
    { name: "translationProcessDefined", label: "Is there a process for obtaining professional translation or using bilingual staff?" }, // Details in comment
    // Standardized Message Templates
    { name: "templatesMultiLangReady", label: "Are standardized message templates developed/translated in multiple languages?" },
    { name: "translationAccuracyMaintained", label: "Do translated messages maintain consistency/accuracy?" }, // Simplified
    // Accessibility and Inclusivity
    { name: "limitedEnglishAccessibility", label: "Are efforts made to ensure notifications are accessible for limited English proficiency parents?" }, // Simplified
    // Adapted from text input
    { name: "altCommunicationMethodsAvailable", label: "Are alternative communication methods/formats provided for those needing assistance?" }, // Renamed 'AltCommunicationMethods'
    // Community Engagement
    { name: "parentsInformedMultilang", label: "Are parents informed about multilingual notification availability and preferences?" }, // Simplified
    { name: "communityEngagementEfforts", label: "Are efforts made to engage community orgs/liaisons for feedback on language accessibility?" },
    // Testing and Verification
    { name: "multiLangTestingDone", label: "Are multilingual notification capabilities tested periodically?" }, // Simplified
    { name: "translationTestScenarios", label: "Are test scenarios conducted to assess translated message clarity/appropriateness?" },
    // Continuous Improvement
     // Adapted from text input
    { name: "feedbackMechanismsExist", label: "Are feedback mechanisms in place regarding multilingual notification accessibility/effectiveness?" },
    { name: "enhancementFeedbackUsed", label: "Are recommendations implemented based on feedback?" } // Simplified - Renamed 'EnhancementFeedbackUsed'
];


function CommunicationLanguageFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    // Renamed variable to match function name string
    const uploadCommunicationLanguageFormPageImage = httpsCallable(functions, 'uploadCommunicationLanguageFormPageImage');

    // Corrected state variables
    const [formData, setFormData] = useState({});
    const [imageData, setImageData] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(null); // Added loadError

    // useEffect using getDoc by ID with CORRECT path
    useEffect(() => {
        if (!buildingId) {
            alert('No building selected. Redirecting to Building Info...');
            navigate('/BuildingandAddress');
            return;
        }

        const fetchFormData = async () => {
            setLoading(true);
            setLoadError(null);
            // Correct Firestore path for this component - VERIFY NAME
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Communication Language', buildingId);

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
                 // Correct Firestore path - VERIFY NAME
                const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Communication Language', buildingId);
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
               setImageData(reader.result); // Set base64 data
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

        if (imageData) { // Check base64 data
            try {
                console.log("Uploading image via Cloud Function...");
                 // Use correct function variable name
                const uploadResult = await uploadCommunicationLanguageFormPageImage({
                    imageData: imageData, // Send base64 data
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
             // Correct Firestore path - VERIFY NAME
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Communication Language', buildingId);
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
        // Removed outer div
        <div className="form-page">
            <header className="header">
                <Navbar />
                <button className="back-button" onClick={handleBack}>←</button>
                <h1>Communication Language Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                     <h2>Communication Language Questions</h2> {/* Added main heading */}

                    {/* Single .map call for all questions with standardized rendering */}
                    {commLanguageQuestions.map((question, index) => (
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
                         <label htmlFor="imageUploadCommLang">Upload Image (Optional):</label>
                         <input id="imageUploadCommLang" type="file" onChange={handleImageChange} accept="image/*" />
                         {imageUrl && !imageData && <img src={imageUrl} alt="Uploaded Comm Lang related" style={{ maxWidth: '200px', marginTop: '10px' }} />}
                         {imageData && <img src={imageData} alt="Preview Comm Lang related" style={{ maxWidth: '200px', marginTop: '10px' }} />}
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

// Corrected export name to match component
export default CommunicationLanguageFormPage;