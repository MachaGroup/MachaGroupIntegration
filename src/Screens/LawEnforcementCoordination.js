import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

// Define questions array outside the component
const lawEnforcementCoordinationQuestions = [
    // Adapted from original text input
    { name: "communicationChannelsEstablished", label: "Are established communication channels (e.g., direct lines, email lists) in place between the facility and local law enforcement?" },
    // Corrected name attribute
    { name: "facilityLawPOCs", label: "Are there designated points of contact within the facility and law enforcement for emergency coordination?" },
     // Adapted from original text input
    { name: "protocolsAccessible", label: "Are communication protocols documented and readily accessible to relevant facility personnel?" },
    // Adapted from original text input
    { name: "notificationProtocolExists", label: "Is a clear protocol defined for notifying law enforcement agencies during emergencies?" },
     // Adapted from original text input
    { name: "contactMethodsDefined", label: "Are specific methods (e.g., phone, emergency line) predefined for contacting law enforcement?" },
    { name: "staffLawComTraining", label: "Are staff members trained on when and how to initiate contact with law enforcement and what information to provide?" },
    { name: "responseTimeDefined", label: "Are response time expectations clearly defined and communicated with law enforcement agencies?" },
    { name: "responseTimeBenchmarks", label: "Have response time benchmarks been established based on facility location, size, and risks?" },
    { name: "responseTimeTracking", label: "Is there a mechanism for tracking and evaluating law enforcement response times?" },
    { name: "collabPlanningMeetings", label: "Are regular meetings or exercises conducted with law enforcement to review plans and procedures?" },
    { name: "tabletopExercises", label: "Do joint tabletop exercises or simulations involve law enforcement for various scenarios?" },
    { name: "exerciseFeedbackUsage", label: "Are feedback and lessons learned from joint exercises used to improve coordination?" },
    // Adapted from original text input
    { name: "infoSharingProtocolExists", label: "Is a protocol defined for sharing relevant information (layout, incident details) with law enforcement during emergencies?" },
    { name: "infoSharingTraining", label: "Are staff members trained to provide accurate and timely information to responders?" },
    // Adapted from original text input
    { name: "secureInfoSharingMethod", label: "Is a secure method available for sharing sensitive/confidential information with law enforcement if necessary?" },
    { name: "mutualAidExistence", label: "Does the facility have mutual aid agreements or partnerships with neighboring law enforcement agencies?" },
    { name: "mutualAidReview", label: "Are mutual aid agreements documented and reviewed periodically?" },
    // Adapted from original text input
    { name: "mutualAidActivationProcess", label: "Is a clear process defined for activating mutual aid support?" },
    { name: "postIncidentDebriefs", label: "Are debriefing sessions conducted after emergency incidents to review coordination effectiveness?" },
    { name: "lawEnforcementInvolvementDebrief", label: "Are law enforcement representatives involved in post-incident debriefings?" }, // Simplified label
    { name: "debriefingRecommendationsImplemented", label: "Are recommendations from debriefings implemented to improve future procedures?" }, // Simplified label
];


function LawEnforcementCoordinationFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    // Correct httpsCallable definition
    const uploadLawEnforcementCoordinationImage = httpsCallable(functions, 'uploadLawEnforcementCoordinationImage');

    // State variables look good
    const [formData, setFormData] = useState({});
    const [imageData, setImageData] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);

    // useEffect for fetching data - Looks good
    useEffect(() => {
        if (!buildingId) {
            alert('No building selected. Redirecting to Building Info...');
            navigate('/BuildingandAddress'); // Ensure path is correct
            return;
        }

        const fetchFormData = async () => {
            setLoading(true);
            setLoadError(null);
            // Correct Firestore path
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Law Enforcement Coordination', buildingId);

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
                const buildingRef = doc(db, 'Buildings', buildingId);
                const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Law Enforcement Coordination', buildingId);
                const dataToSave = {
                     ...newFormData,
                     building: buildingRef,
                     ...(imageUrl && { imageUrl: imageUrl })
                 };
                await setDoc(formDocRef, { formData: dataToSave }, { merge: true });
                // console.log("Form data updated:", dataToSave);
            } catch (error) {
                console.error("Error saving form data to Firestore:", error);
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

        if (imageData) {
            try {
                console.log("Uploading image via Cloud Function...");
                // Use correct function variable name
                const uploadResult = await uploadLawEnforcementCoordinationImage({
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
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Law Enforcement Coordination', buildingId);
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
                <h1>Law Enforcement Coordination Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Law Enforcement Coordination Assessment Questions</h2>

                    {/* Single .map call for all questions with standardized rendering */}
                    {lawEnforcementCoordinationQuestions.map((question, index) => (
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
                                name={`${question.name}Comment`} // Corrected name format
                                placeholder="Additional comments"
                                value={formData[`${question.name}Comment`] || ''}
                                onChange={handleChange}
                            />
                        </div>
                    ))}

                    {/* Image upload section - Looks good */}
                     <div className="form-section">
                         <label htmlFor="imageUploadLawCoord">Upload Image (Optional):</label>
                         <input id="imageUploadLawCoord" type="file" onChange={handleImageChange} accept="image/*" />
                         {imageUrl && !imageData && <img src={imageUrl} alt="Uploaded Law Coord. related" style={{ maxWidth: '200px', marginTop: '10px' }} />}
                         {imageData && <img src={imageData} alt="Preview Law Coord. related" style={{ maxWidth: '200px', marginTop: '10px' }} />}
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

export default LawEnforcementCoordinationFormPage;