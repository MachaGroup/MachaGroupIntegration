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
const commPlatformQuestions = [
    // Corrected names to camelCase
    // Availability of Communication Platforms
    // Adapted from text input
    { name: "commPlatformEstablished", label: "Are designated communication platforms established for parent/guardian communication?" },
    { name: "platformChannelsUsed", label: "Do platforms include various channels (phone, messaging, email, web)?" }, // Simplified - Renamed 'PlatformChannelsUse'
    // Designation of Phone Lines
    { name: "phoneLineDesignated", label: "Are specific phone lines designated for parent communication during emergencies?" },
    { name: "commRedundancyAvailable", label: "Is there a clear process for parents to access designated phone lines?" }, // Simplified - Renamed 'CommRedundancyAvail'
    // Redundancy and Backup Options
    // Adapted from text input
    { name: "backupOptionsAvailable", label: "Are redundant communication options available (messaging, email)?" }, // Simplified - Renamed 'BackupOptionsDesc'
    { name: "backupPlatformsUsed", label: "Are backup platforms used to supplement primary channels?" }, // Simplified - Renamed 'BackupPlatformsUse'
    // Accessibility and Usability
    { name: "platformAccessibility", label: "Are communication platforms accessible and user-friendly for diverse backgrounds/abilities?" },
    { name: "languageFormatsAvailable", label: "Is information provided in multiple languages/formats?" }, // Simplified - Renamed 'LanguageFormatsAvail'
    // Integration with Emergency Plans
    { name: "integrationWithPlans", label: "Are communication platforms integrated into broader emergency plans?" }, // Simplified - Renamed 'IntegrationPlans'
    { name: "proceduresForPlatformUse", label: "Are procedures established for using platforms for emergency notifications/updates?" }, // Simplified - Renamed 'EmergencyProcedures'
    // Testing and Verification
    { name: "platformTesting", label: "Are communication platforms tested periodically for functionality/reliability?" },
    { name: "scenarioSimulations", label: "Are test scenarios conducted to assess platform responsiveness/effectiveness?" },
    // Training and Familiarization
    { name: "staffTrainedOnPlatforms", label: "Are staff trained on using designated platforms for parent communication?" }, // Simplified - Renamed 'StaffTrainingComm'
    { name: "staffGuidelinesProvided", label: "Are resources/guidelines provided to assist staff in communicating effectively?" }, // Simplified - Renamed 'StaffGuidelines'
    // Feedback and Evaluation
    // Adapted from text input
    { name: "parentFeedbackMechanismExists", label: "Are feedback mechanisms in place to gather parent input on platform effectiveness?" },
    { name: "protocolEnhancementsImplemented", label: "Are recommendations implemented based on feedback?" } // Simplified - Renamed 'ProtocolEnhancements'
];

// Renamed component
function CommunicationPlatformsFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    // Renamed variable to match function name string
    const uploadCommunicationPlatformsFormPageImage = httpsCallable(functions, 'uploadCommunicationPlatformsFormPageImage');

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
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Communication Platforms', buildingId);

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
                const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Communication Platforms', buildingId);
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
                const uploadResult = await uploadCommunicationPlatformsFormPageImage({
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
            // Correct Firestore path - VERIFY NAME
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Communication Platforms', buildingId);
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
        // Removed outer div
        <div className="form-page">
            <header className="header">
                <Navbar />
                <button className="back-button" onClick={handleBack}>←</button>
                <h1>Communication Platforms Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Communication Platform Questions</h2> {/* Added main heading */}

                    {/* Single .map call for all questions with standardized rendering */}
                    {commPlatformQuestions.map((question, index) => (
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
                         <label htmlFor="imageUploadCommPlatform">Upload Image (Optional):</label>
                         <input id="imageUploadCommPlatform" type="file" onChange={handleImageChange} accept="image/*" />
                         {imageUrl && !imageData && <img src={imageUrl} alt="Uploaded Comm Platform related" style={{ maxWidth: '200px', marginTop: '10px' }} />}
                         {imageData && <img src={imageData} alt="Preview Comm Platform related" style={{ maxWidth: '200px', marginTop: '10px' }} />}
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

// Corrected export name
export default CommunicationPlatformsFormPage;