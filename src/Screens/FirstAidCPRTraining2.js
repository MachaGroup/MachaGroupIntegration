import React, { useState, useEffect } from 'react';
// Firestore imports aligned with the standard pattern
import { getFirestore, doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'; // Removed collection, kept serverTimestamp
// Firebase Functions imports
import { getFunctions, httpsCallable } from "firebase/functions";
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css'; // Assuming same CSS file
import logo from '../assets/MachaLogo.png'; // Assuming same logo
import Navbar from "./Navbar"; // Assuming same Navbar

// Define questions array outside the component
const firstAidCprTrainingQuestions = [
    // Corrected names to camelCase
    // Training Program Effectiveness
    // Adapted from text input
    { name: "trainingEffectivenessEvaluated", label: "Is the effectiveness of First Aid/CPR training evaluated/monitored?" },
    { name: "trainingOutcomesMeasurement", label: "Are outcomes measured (assessments, simulations) to verify proficiency?" }, // Simplified
    // Training Frequency and Recertification
    // Adapted from text input
    { name: "trainingFrequencyDefined", label: "Is there an established frequency for training/refresher courses?" },
    { name: "recertificationSchedules", label: "Are recertification schedules established, communicated, and adhered to?" },
    // Integration with Emergency Response Plans
    // Adapted from text input
    { name: "trainingIntegratedWithPlans", label: "Is training integrated into broader emergency response plans/protocols?" },
    { name: "standardizedProtocolsTraining", label: "Are staff trained on standardized protocols for various medical/cardiac emergencies?" },
    // Accessibility of Training Resources
    // Adapted from text input
    { name: "trainingResourcesProvided", label: "Are appropriate resources/materials provided for training (manuals, manikins, AED trainers)?" },
    { name: "accessibleTrainingResources", label: "Are resources accessible and accommodations made for diverse needs?" }, // Simplified
    // Training Delivery Methods
    // Adapted from text input
    { name: "variedTrainingDeliveryMethods", label: "Are various delivery methods offered (in-person, online, blended)?" },
    { name: "certifiedInstructorFacilitation", label: "Are sessions facilitated by certified/qualified instructors?" } // Simplified
];


function FirstAidCPRTraining2FormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    // Renamed variable for clarity
    const uploadFirstAidCPRTraining2FormImage = httpsCallable(functions, 'uploadFirstAidCPRTraining2FormImage');

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
            // Correct Firestore path
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'First Aid CPR Training', buildingId);

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
                const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'First Aid CPR Training', buildingId);
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
                const uploadResult = await uploadFirstAidCPRTraining2FormImage({
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
        // Removed updatedAt from here, add within the object if needed
        setFormData(finalFormData); // Update state to final version

        try {
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'First Aid CPR Training', buildingId);
            const buildingRef = doc(db, 'Buildings', buildingId);
             // Add timestamp within formData if required by your schema
             // finalFormData.updatedAt = serverTimestamp();
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
                 {/* Title uses the numbering from original code */}
                <h1>3.1.1.2.4 First-Aid/CPR Training Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                     <h2>First Aid/CPR Training Questions</h2> {/* Added main heading */}
                    {/* Render questions dynamically using single map */}
                    {firstAidCprTrainingQuestions.map((question, index) => (
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
                         <label htmlFor="imageUploadCprTraining">Upload Image (Optional):</label>
                         <input id="imageUploadCprTraining" type="file" onChange={handleImageChange} accept="image/*" />
                         {imageUrl && !imageData && <img src={imageUrl} alt="Uploaded CPR Training Context" style={{ maxWidth: '200px', marginTop: '10px' }}/>}
                         {imageData && <img src={imageData} alt="Preview CPR Training Context" style={{ maxWidth: '200px', marginTop: '10px' }}/>}
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

export default FirstAidCPRTraining2FormPage;