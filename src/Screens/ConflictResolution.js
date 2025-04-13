import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
// Imports adjusted: Added getDoc, removed getDocs, query, where, addDoc, storage
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

// Define questions array outside the component
const conflictResolutionQuestions = [
    // Training and Skills
    { name: "conflictResolutionTraining", label: "Are security personnel trained in conflict resolution techniques, including de-escalation strategies?" },
    { name: "specializedTraining", label: "Have they received specialized training to handle diverse conflict scenarios effectively?" },
    { name: "personnelSkills", label: "Do security personnel possess the necessary communication and interpersonal skills to manage conflicts professionally?" }, // Simplified label
    // Recognition and Assessment
    { name: "recognizeEarlySigns", label: "Are security personnel trained to recognize early signs of potential conflicts or escalating situations?" }, // Simplified label
    { name: "assessSeverity", label: "Do they assess the nature and severity of conflicts quickly and accurately?" }, // Simplified label
    { name: "responseProtocolsExist", label: "Are appropriate response protocols in place based on the level of conflict and potential risks involved?" }, // Changed to Yes/No, details in comment
    // De-escalation Techniques
    { name: "deescalationTechniquesEmployed", label: "Do security personnel employ de-escalation techniques to defuse tensions?" }, // Simplified label
    { name: "remainCalmTraining", label: "Are they trained to remain calm and composed while interacting with individuals in conflicts?" }, // Simplified label
    { name: "activeListeningEmpathy", label: "Do personnel use active listening, empathy, and effective communication to resolve conflicts peacefully?" }, // Simplified label
    // Physical Restraint and Intervention
    { name: "restraintTechniquesTraining", label: "Are security personnel trained in safe and effective physical restraint techniques, if necessary?" },
    { name: "physicalInterventionLastResort", label: "Do they use physical intervention only as a last resort after other strategies are exhausted?" }, // Simplified label
    { name: "interventionProtocolsExist", label: "Are protocols in place to minimize injury risk during physical intervention?" }, // Changed to Yes/No, details in comment
    // Teamwork and Collaboration
    { name: "collaborateTraining", label: "Are personnel trained to work collaboratively with colleagues, responders, and stakeholders during crises?" }, // Simplified label
    { name: "coordinateEfforts", label: "Do they coordinate efforts effectively to manage conflicts and ensure safety?" }, // Simplified label
    { name: "clearCommunicationCoordination", label: "Is there clear communication and coordination between security and other emergency teams?" }, // Simplified label
    // Documentation and Reporting
    { name: "documentationProcess", label: "Are incidents involving conflict resolution documented accurately and promptly?" }, // Simplified label
    { name: "reportingProcessStandardized", label: "Is there a standardized reporting process for conflict details, interventions, and outcomes?" }, // Changed to Yes/No, details in comment
    { name: "reportsReviewed", label: "Are reports reviewed regularly to identify trends and areas for improvement?" }, // Simplified label
    // Continuous Improvement
    { name: "ongoingTraining", label: "Is there ongoing training and development for personnel to enhance conflict resolution skills?" }, // Simplified label
    { name: "debriefingsConducted", label: "Are debriefings conducted after incidents to evaluate responses and identify lessons learned?" },
    { name: "feedbackUsed", label: "Is feedback from personnel and stakeholders used to improve strategies and procedures?" }, // Simplified label
];


function ConflictResolutionFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    // Correct httpsCallable definition
    const uploadImage = httpsCallable(functions, 'uploadConflictResolutionFormPageImage'); // Renamed var

    // Updated state variables
    const [formData, setFormData] = useState({});
    const [imageData, setImageData] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(null); // Added loadError state

    // useEffect using getDoc based on buildingId as document ID
    useEffect(() => {
        if (!buildingId) {
            alert('No building selected. Redirecting to Building Info...');
            navigate('/BuildingandAddress');
            return;
        }

        const fetchFormData = async () => {
            setLoading(true);
            setLoadError(null);
            // Assume buildingId is the document ID in this subcollection
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Conflict Resolution', buildingId);

            try {
                console.log("Fetching data for doc:", formDocRef.path);
                const docSnapshot = await getDoc(formDocRef);
                if (docSnapshot.exists()) {
                    console.log("Document data:", docSnapshot.data());
                    const existingData = docSnapshot.data().formData || {};
                    setFormData(existingData);
                    if (existingData.imageUrl) {
                        setImageUrl(existingData.imageUrl);
                    }
                } else {
                    console.log("No such document!");
                    setFormData({}); // Initialize empty if no doc found
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

    // handleChange saves data immediately using setDoc on the specific doc ID
    const handleChange = async (e) => {
        const { name, value } = e.target;
        const newFormData = { ...formData, [name]: value };
        setFormData(newFormData);

        if (buildingId) {
            try {
                const buildingRef = doc(db, 'Buildings', buildingId);
                // Use buildingId directly as the document ID
                const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Conflict Resolution', buildingId);
                const dataToSave = {
                     ...newFormData,
                     building: buildingRef,
                     ...(imageUrl && { imageUrl: imageUrl })
                 };
                // Use setDoc with merge to create or update the specific document
                await setDoc(formDocRef, { formData: dataToSave }, { merge: true });
                 // console.log("Form data updated:", dataToSave);
            } catch (error) {
                console.error("Error saving form data:", error);
            }
        }
    };

    // handleImageChange uses base64
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

    // handleBack is simplified
    const handleBack = () => {
        navigate(-1);
    };

    // handleSubmit uses Cloud Function and setDoc on the specific doc ID
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
                const uploadResult = await uploadImage({ // Use correct var name
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
             imageUrl: finalImageUrl
        };
        setFormData(finalFormData);

        try {
            console.log("Saving final form data to Firestore...");
            const buildingRef = doc(db, 'Buildings', buildingId);
             // Use buildingId directly as the document ID
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Conflict Resolution', buildingId);
            // Use setDoc with merge to create or update the specific document
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
    if (loading) { // Simplified loading check
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
                <h1>Conflict Resolution Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Conflict Resolution Assessment Questions</h2>

                    {/* Single .map call for all questions */}
                    {conflictResolutionQuestions.map((question, index) => (
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
                                name={`${question.name}Comment`}
                                placeholder="Additional comments"
                                value={formData[`${question.name}Comment`] || ''}
                                onChange={handleChange}
                            />
                        </div>
                    ))}

                    {/* Image upload section */}
                    <div className="form-section">
                        <label htmlFor="imageUploadConflict">Upload Image (Optional):</label>
                        <input id="imageUploadConflict" type="file" onChange={handleImageChange} accept="image/*" />
                        {imageUrl && !imageData && <img src={imageUrl} alt="Uploaded Conflict Resolution related" style={{ maxWidth: '200px', marginTop: '10px' }} />}
                        {imageData && <img src={imageData} alt="Preview Conflict Resolution related" style={{ maxWidth: '200px', marginTop: '10px' }} />}
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

export default ConflictResolutionFormPage;