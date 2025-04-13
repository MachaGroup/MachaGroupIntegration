import React, { useState, useEffect } from 'react';
// Corrected Firestore imports
import { getFirestore, doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'; // Keep serverTimestamp if needed inside formData
// Added Functions imports
import { getFunctions, httpsCallable } from "firebase/functions";
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

// Define questions array outside the component
const postIncidentSupportQuestions = [
    // Corrected names to camelCase
    // Adapted from text input
    { name: "supportServicesAvailable", label: "Are post-incident support services readily available and easily accessible?" },
    { name: "mentalHealthResourcesAvailability", label: "Are counseling, peer support, or other mental health resources offered?" }, // Simplified
    // Adapted from text input
    { name: "supportServicesCommunicated", label: "Are support services promoted/communicated effectively to staff?" },
    // Adapted from text input
    { name: "externalSupportPartnerships", label: "Are external partnerships established for supplemental support?" },
    // Adapted from text input
    { name: "counselingOptionsAvailable", label: "Are various counseling/psychological support options available?" },
    { name: "licensedMentalHealthAvailability", label: "Are licensed professionals (trauma-informed) available?" }, // Simplified
    // Adapted from text input
    { name: "confidentialityProtected", label: "Is confidentiality/privacy protected for staff seeking support?" },
     // Adapted from text input
    { name: "mentalHealthAssessmentProtocols", label: "Are protocols in place for assessing staff mental health needs post-incident?" },
    { name: "peerSupportEstablished", label: "Are peer support programs established?" }, // Simplified
     // Adapted from text input
    { name: "peerSupporterProcess", label: "Is there a defined process for selecting/training/supporting peer supporters?" },
    { name: "peerSupportIntegration", label: "Is peer support integrated into broader crisis management/EAP?" }, // Simplified
    // Adapted from text input
    { name: "peerSupportEffectivenessEnsured", label: "Are measures in place to ensure peer support effectiveness/sustainability?" },
     // Adapted from text input
    { name: "familyAssistanceProvided", label: "Are family members of affected staff supported/informed about resources?" },
    // Adapted from text input
    { name: "familyCommunicationChannels", label: "Are communication channels established for family updates?" },
    // Adapted from text input
    { name: "familyResourcesReferralsAvailable", label: "Are resources/referrals available for family support (counseling, financial)?" },
    { name: "familyAssistancePlans", label: "Are family assistance plans included in the overall emergency framework?" },
    { name: "postIncidentSupportTraining", label: "Are staff trained on availability/utilization of support services?" },
    // Adapted from text input
    { name: "stressRecognitionEducation", label: "Are staff educated on recognizing signs of stress/trauma (self/colleagues)?" },
    { name: "resilienceTrainingWorkshops", label: "Are resilience/coping skills training/workshops conducted?" }, // Simplified
     // Adapted from text input
    { name: "supportSeekingComfortMeasures", label: "Are measures in place to ensure staff feel comfortable seeking help?" },
    // Adapted from text input
    { name: "evaluationEffectivenessConducted", label: "Are support services evaluated for effectiveness/responsiveness?" },
    // Adapted from text input
    { name: "feedbackMechanismExists", label: "Are feedback mechanisms used to gather staff input on support services?" },
     // Adapted from text input
    { name: "impactAssessmentMetricsUsed", label: "Are metrics used to assess support impact on well-being/recovery?" },
    { name: "lessonsLearnedUsed", label: "Are lessons learned used to improve crisis management/EAPs?" }
];


function PostIncidentSupportFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    // Renamed variable for clarity
    const uploadPostIncidentSupportImage = httpsCallable(functions, 'uploadPostIncidentSupportImage');

    // State variables look good
    const [formData, setFormData] = useState({});
    const [imageData, setImageData] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);

    // useEffect for fetching data - Adjusted imageUrl fetch
    useEffect(() => {
        if (!buildingId) {
            alert('No building selected. Redirecting to Building Info...');
            navigate('/BuildingandAddress');
            return;
        }

        const fetchFormData = async () => {
            setLoading(true);
            setLoadError(null);
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Post-Incident Support', buildingId);

            try {
                const docSnapshot = await getDoc(formDocRef);
                if (docSnapshot.exists()) {
                    const existingData = docSnapshot.data().formData || {};
                    setFormData(existingData);
                     // Fetch imageUrl from within formData
                    setImageUrl(existingData.imageUrl || null);
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
                const buildingRef = doc(db, 'Buildings', buildingId);
                const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Post-Incident Support', buildingId);
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

    // handleBack - Looks good
    const handleBack = () => {
        navigate(-1);
    };

    // handleSubmit uses Cloud Function and setDoc with correct structure
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
                const uploadResult = await uploadPostIncidentSupportImage({
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

         // Prepare final data object including definitive image URL
        const finalFormData = {
             ...formData,
             imageUrl: finalImageUrl,
             // Add timestamp if needed HERE, not at top level
             // updatedAt: serverTimestamp()
        };
        setFormData(finalFormData); // Update state to final version

        try {
            console.log("Saving final form data to Firestore...");
            const buildingRef = doc(db, 'Buildings', buildingId);
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Post-Incident Support', buildingId);
             // Save final data with correct structure, including building ref INSIDE formData
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
        // Removed outer div
        <div className="form-page">
            <header className="header">
                <Navbar />
                <button className="back-button" onClick={handleBack}>←</button>
                <h1>Post-Incident Support Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                     <h2>Post-Incident Support Questions</h2> {/* Added main heading */}

                    {/* Single .map call for all questions with standardized rendering */}
                    {postIncidentSupportQuestions.map((question, index) => (
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
                        <label htmlFor="imageUploadPostIncident">Upload Image (Optional):</label>
                        <input id="imageUploadPostIncident" type="file" onChange={handleImageChange} accept="image/*" />
                        {imageUrl && !imageData && <img src={imageUrl} alt="Uploaded Post-Incident Support related" style={{ maxWidth: '200px', marginTop: '10px' }} />}
                        {imageData && <img src={imageData} alt="Preview Post-Incident Support related" style={{ maxWidth: '200px', marginTop: '10px' }} />}
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

export default PostIncidentSupportFormPage;