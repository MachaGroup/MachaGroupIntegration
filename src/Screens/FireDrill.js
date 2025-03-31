import React, { useState, useEffect } from 'react';
// Firestore imports aligned with the standard pattern
import { getFirestore, collection, doc, getDoc, setDoc } from 'firebase/firestore';
// Firebase Functions imports
import { getFunctions, httpsCallable } from "firebase/functions";
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css'; // Assuming same CSS file
import logo from '../assets/MachaLogo.png'; // Assuming same logo
import Navbar from "./Navbar"; // Assuming same Navbar

function FireDrillFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions(); // Initialize Firebase Functions
    // Define callable function with the requested naming convention
    const uploadImage = httpsCallable(functions, 'uploadFireDrillFormImage');

    // State aligned with the standard pattern
    const [formData, setFormData] = useState({}); // Initialize as empty object
    const [imageData, setImageData] = useState(null); // For base64 image data
    const [imageUrl, setImageUrl] = useState(null); // For storing uploaded image URL
    const [imageUploadError, setImageUploadError] = useState(null); // For image upload errors
    const [loading, setLoading] = useState(true); // Loading state for initial fetch
    const [loadError, setLoadError] = useState(null); // Error state for initial fetch

    // useEffect for fetching data on load
    useEffect(() => {
        if (!buildingId) {
            alert('No building selected. Redirecting to Building Info...');
            navigate('/BuildingandAddress'); // Ensure navigation path is correct
            return;
        }

        const fetchFormData = async () => {
            setLoading(true);
            setLoadError(null);
            // Correct Firestore document path for this form
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Fire Drill', buildingId);

            try {
                const docSnapshot = await getDoc(formDocRef);
                if (docSnapshot.exists()) {
                    setFormData(docSnapshot.data().formData || {});
                    setImageUrl(docSnapshot.data().formData?.imageUrl || null);
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

    // handleChange saves data on every change
    const handleChange = async (e) => {
        const { name, value } = e.target;
        // Standardize radio button values
        const standardizedValue = (value === 'yes' || value === 'no') ? value : value;
        const newFormData = { ...formData, [name]: standardizedValue };
        setFormData(newFormData);

        if (!buildingId) {
            console.error("Building ID is missing, cannot save data.");
            return;
        }

        try {
            // Correct Firestore document path
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Fire Drill', buildingId);
            const buildingRef = doc(db, 'Buildings', buildingId);
            // Save data using setDoc with merge: true
            await setDoc(formDocRef, { formData: { ...newFormData, building: buildingRef } }, { merge: true });
            console.log("Form data auto-saved:", { ...newFormData, building: buildingRef });
        } catch (error) {
            console.error("Error auto-saving form data:", error);
            // Optionally show a non-blocking error to the user
        }
    };

    // handleImageChange using FileReader
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
        }
    };

    // handleBack now only navigates
    const handleBack = () => {
        navigate(-1);
    };

    // handleSubmit using Cloud Function for upload
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!buildingId) {
            alert('Building ID is missing. Please start from the Building Information page.');
            return;
        }

        let finalImageUrl = formData.imageUrl || null;

        // Upload new image if imageData exists
        if (imageData) {
             setImageUploadError(null);
            try {
                console.log("Uploading image...");
                const uploadResult = await uploadImage({ imageData: imageData });
                finalImageUrl = uploadResult.data.imageUrl;
                setImageUrl(finalImageUrl);
                console.log("Image uploaded successfully:", finalImageUrl);
            } catch (error) {
                console.error('Error uploading image via Cloud Function:', error);
                setImageUploadError(error.message || "Failed to upload image.");
                alert(`Image upload failed: ${error.message || "Unknown error"}`);
                // return; // Optional: Stop submission on image upload failure
            }
        }

        // Correct typo 'buildling' to 'building' and prepare final data
        const finalFormData = { ...formData, imageUrl: finalImageUrl };


        try {
            // Correct Firestore document path
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Fire Drill', buildingId);
            const buildingRef = doc(db, 'Buildings', buildingId);
            // Save final data using setDoc with merge: true, ensure 'building' field is correct
            await setDoc(formDocRef, { formData: { ...finalFormData, building: buildingRef } }, { merge: true });

            console.log('Form data submitted successfully!');
            alert('Form submitted successfully!');
            navigate('/Form');
        } catch (error) {
            console.error("Error submitting final form data:", error);
            alert("Failed to submit the form. Please check your connection and try again.");
        }
    };

    // Loading and Error display
    if (loading) {
        return <div>Loading...</div>;
    }

    if (loadError) {
        return <div>Error: {loadError}</div>;
    }

    // Define questions, converting composite questions to standard types
    const questions = [
        // Drill Frequency
        { name: "conductedFireDrills", label: "How often are fire drills conducted within the facility?", type: "text" },
        { name: "regularDrillSchedule", label: "Are fire drills scheduled regularly to ensure all occupants are familiar with fire evacuation procedures?", type: "radio" },
        { name: "varyingDrillTimes", label: "Are drills conducted at different times of the day to account for varying occupancy levels and staff shifts?", type: "radio" },
        // Notification Procedures
        { name: "drillInitiationProtocol", label: "Is there a protocol for initiating fire drills, including how and when occupants are notified?", type: "radio" }, // Was composite
        { name: "notificationTesting", label: "Are notification methods tested during drills to ensure timely dissemination of fire alarm alerts?", type: "radio" },
        { name: "absentIndividualSystem", label: "Is there a system in place to account for individuals who may not be present during scheduled drills?", type: "radio" }, // Was composite
        // Drill Procedures
        { name: "definedDrillProcedures", label: "Are fire drill procedures clearly defined and communicated to all occupants?", type: "radio" },
        { name: "occupantSpecificActions", label: "Do drills include specific actions to be taken by occupants, such as following evacuation routes and assembly points?", type: "radio" }, // Corrected typo in name
        { name: "scenarioBasedDrills", label: "Are drills conducted to simulate different scenarios, such as varying locations of fire origin or evacuation obstacles?", type: "radio" },
        // Evacuation Routes and Assembly Points
        { name: "markedEvacRoutes", label: "Are designated evacuation routes and assembly points identified and clearly marked throughout the facility?", type: "radio" }, // Was composite
        { name: "safeEvacKnowledge", label: "Do occupants know how to quickly and safely evacuate the building during fire drills?", type: "radio" },
        { name: "altEvacRoutes", label: "Are there alternative evacuation routes available in case primary routes are obstructed?", type: "radio" }, // Was composite
        // Accountability and Monitoring
        { name: "occupantAccountProcess", label: "Is there a process for accounting for all occupants during fire drills?", type: "radio" }, // Was composite
        { name: "staffDrillResponsibilities", label: "Are staff members assigned roles and responsibilities to assist with accountability and monitoring efforts?", type: "radio" }, // Was composite
        { name: "drillFeedbackCollection", label: "Is feedback gathered from participants after drills to identify any issues or concerns with procedures?", type: "radio" },
        // Evaluation and Improvement
        { name: "effectivenessEvaluation", label: "Is there a mechanism for evaluating the effectiveness of fire drills and identifying areas for improvement?", type: "radio" }, // Was composite
        { name: "postDrillDebriefing", label: "Are debriefing sessions held after drills to review performance and discuss lessons learned?", type: "radio" },
        { name: "recommendationImplementation", label: "Are recommendations from drill evaluations implemented to enhance fire preparedness and response procedures?", type: "radio" },
        // Documentation and Records
        { name: "drillRecordKeeping", label: "Are records maintained for all fire drills, including dates, times, participants, and observations?", type: "radio" },
        { name: "recordPeriodicReview", label: "Are drill records reviewed periodically to ensure compliance with regulations and identify trends or patterns?", type: "radio" },
        { name: "correctiveActionDocumentation", label: "Are deficiencies or issues identified during drills documented, with corrective actions implemented as needed?", type: "radio" }
    ];


    return (
        <div> {/* Outer wrapper div */}
            <div className="form-page">
                <header className="header">
                    <Navbar />
                    <button className="back-button" onClick={handleBack}>←</button>
                    <h1>Fire Drill Assessment</h1>
                    <img src={logo} alt="Logo" className="logo" />
                </header>

                <main className="form-container">
                    <form onSubmit={handleSubmit}>
                         {/* Render questions dynamically */}
                         {questions.map((question, index) => (
                             <div key={index} className="form-section">
                                {/* Conditionally render section titles */}
                                {index === 0 && <h2>Drill Frequency:</h2>}
                                {index === 3 && <h2>Notification Procedures:</h2>}
                                {index === 6 && <h2>Drill Procedures:</h2>}
                                {index === 9 && <h2>Evacuation Routes and Assembly Points:</h2>}
                                {index === 12 && <h2>Accountability and Monitoring:</h2>}
                                {index === 15 && <h2>Evaluation and Improvement:</h2>}
                                {index === 18 && <h2>Documentation and Records:</h2>}

                                <label htmlFor={question.name}>{question.label}</label>

                                {question.type === "radio" ? (
                                    // Render Yes/No radio buttons + comment input
                                    <>
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
                                            name={`${question.name}Comment`}
                                            placeholder="Additional comments (Optional)"
                                            value={formData[`${question.name}Comment`] || ''}
                                            onChange={handleChange}
                                            className='comment-box'
                                        />
                                    </>
                                ) : (
                                    // Render single text input for text-based questions
                                    <input
                                        type="text"
                                        id={question.name}
                                        name={question.name}
                                        value={formData[question.name] || ''}
                                        onChange={handleChange}
                                        placeholder="Enter details here"
                                        className='comment-box' // Reusing class, adjust if needed
                                    />
                                )}
                            </div>
                        ))}

                        {/* File Input for Image Upload */}
                        <div className="form-section">
                            <label>Upload Image (Optional):</label>
                             <input type="file" onChange={handleImageChange} accept="image/*" />
                             {imageUrl && <img src={imageUrl} alt="Uploaded Fire Drill Context" style={{ maxWidth: '200px', marginTop: '10px' }}/>}
                             {imageUploadError && <p style={{ color: 'red' }}>{imageUploadError}</p>}
                        </div>

                        {/* Submit Button */}
                        <button type="submit">Submit Assessment</button>
                    </form>
                </main>
            </div>
        </div>
    );
}

export default FireDrillFormPage;