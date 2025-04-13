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
const parentInvolvementQuestions = [
    // Corrected names to camelCase
    // Information Sessions
    // Adapted from text input
    { name: "parentsInformed", label: "Are parents informed about emergency procedures/protocols?" },
    { name: "parentWorkshops", label: "Are information sessions or workshops organized for parents?" },
    // Adapted from text input
    { name: "sessionTopicsRelevant", label: "Are topics covered relevant to parent needs/concerns?" },
    { name: "parentEngagement", label: "Are opportunities provided for parents to ask questions/provide feedback?" },
    // Communication Channels
    // Adapted from text input
    { name: "multipleCommChannelsUsed", label: "Are multiple communication channels used to disseminate info to parents?" },
    { name: "writtenCommunication", label: "Are newsletters, emails, etc., regularly sent with updates/reminders?" },
     // Adapted from text input
    { name: "onlinePlatformsUtilized", label: "Are social media/websites utilized to share info/resources?" },
     // Adapted from text input
    { name: "notificationSystemsInPlace", label: "Are emergency notification systems used to alert parents in real-time?" },
    // Parent Education Resources
    { name: "parentalResourcesProvided", label: "Are educational materials/resources provided to support parent understanding?" },
    // Adapted from text input
    { name: "resourcesAccessible", label: "Are resources available and accessible (pamphlets, online guides)?" },
    { name: "homeDiscussionEncouraged", label: "Are parents encouraged/guided to discuss procedures with children at home?" },
    // Adapted from text input
    { name: "homeReinforcementEncouraged", label: "Are parents encouraged/guided to reinforce preparedness concepts at home?" },
    // Parent Feedback and Engagement
    // Adapted from text input
    { name: "parentFeedbackMechanism", label: "Are mechanisms in place to solicit parent feedback on procedures/effectiveness?" },
     // Adapted from text input
    { name: "parentConcernsAddressed", label: "Are parent perspectives/concerns considered and addressed?" },
    { name: "parentInvolvementOpportunities", label: "Are parents invited to participate in planning committees/advisory groups?" },
    // Adapted from text input
    { name: "ongoingCollaborationFostered", label: "Are measures taken to foster ongoing parent/stakeholder collaboration?" },
    // Participation in Drills and Exercises
    { name: "parentParticipationEncouraged", label: "Are parents encouraged/invited to participate in drills/exercises?" },
     // Adapted from text input
    { name: "drillCommunicationToParents", label: "Are parents informed about upcoming drills and expectations?" },
    { name: "parentalObservationOffered", label: "Are opportunities provided for parents to observe/volunteer during drills?" },
     // Adapted from text input
    { name: "parentFeedbackMechanismDrills", label: "Are feedback mechanisms used to gather parent observations during drills?" }
];


function ParentInvolvement2FormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    // Renamed variable for clarity
    const uploadParentInvolvement2FormPageImage = httpsCallable(functions, 'uploadParentInvolvement2FormPageImage');

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
            // Correct Firestore path for this component
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Parent Involvement', buildingId);

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
                 // Correct Firestore path
                const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Parent Involvement', buildingId);
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
                const uploadResult = await uploadParentInvolvement2FormPageImage({
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
             // Correct Firestore path
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Parent Involvement', buildingId);
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
                <h1>Parent Notification Procedures Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                     <h2>Parent Notification Procedures Questions</h2> {/* Added main heading */}

                    {/* Single .map call for all questions with standardized rendering */}
                    {parentInvolvementQuestions.map((question, index) => (
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
                        <label htmlFor="imageUploadParentInvolve">Upload Image (Optional):</label>
                        <input id="imageUploadParentInvolve" type="file" onChange={handleImageChange} accept="image/*" />
                        {imageUrl && !imageData && <img src={imageUrl} alt="Uploaded Parent Involvement related" style={{ maxWidth: '200px', marginTop: '10px' }} />}
                        {imageData && <img src={imageData} alt="Preview Parent Involvement related" style={{ maxWidth: '200px', marginTop: '10px' }} />}
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

export default ParentInvolvement2FormPage;