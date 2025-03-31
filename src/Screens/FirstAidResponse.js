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

function FirstAidResponseFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions(); // Initialize Firebase Functions
    // Define callable function with the requested naming convention
    const uploadImage = httpsCallable(functions, 'uploadFirstAidResponseFormImage');

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
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'First aid Response', buildingId);

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
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'First aid Response', buildingId);
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
             const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'First aid Response', buildingId);
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

    // Define questions with standardized names and types
    const questions = [
        // Availability of First Aid Supplies
        { name: "suppliesAvailable", label: "Are first aid supplies readily available throughout the premises, including in designated first aid stations and easily accessible locations?", type: "radio" },
        { name: "adequateStock", label: "Is there an adequate stock of essential items such as bandages, gauze, antiseptics, gloves, and basic medical equipment?", type: "radio" },
        { name: "kitsInspected", label: "Are first aid kits regularly inspected, replenished, and maintained according to industry standards and regulatory requirements?", type: "radio" },
        // Trained Personnel
        { name: "staffTrained", label: "Are staff members trained in basic first aid procedures, including CPR, wound care, splinting, and treatment for common injuries?", type: "radio" },
        { name: "personnelCertified", label: "Do designated personnel possess valid certifications or qualifications in first aid and cardiopulmonary resuscitation (CPR)?", type: "radio" },
        { name: "sufficientPersonnel", label: "Is there a sufficient number of trained personnel available to provide first aid assistance during all operational hours?", type: "radio" },
        // Response Procedures
        { name: "proceduresEstablished", label: "Are there established procedures for responding to medical emergencies and providing initial first aid assistance?", type: "radio" }, // Was composite
        { name: "staffKnowsProcedures", label: "Do staff members know how to assess the situation, prioritize actions, and summon additional assistance if needed?", type: "radio" },
        { name: "clearCommunicationChannels", label: "Are there clear communication channels and protocols for alerting emergency medical services and coordinating response efforts?", type: "radio" },
        // Accessibility of Medical Assistance
        { name: "designatedContactExists", label: "Is there a designated point of contact or responsible individual for coordinating medical assistance during emergencies?", type: "radio" }, // Was composite
        { name: "emergencyContactsDisplayed", label: "Are contact details for emergency medical services (e.g., ambulance services) readily available and prominently displayed?", type: "radio" },
        { name: "staffTrainedToInformEMS", label: "Are staff members trained to provide accurate information to emergency medical services regarding the nature and severity of the medical emergency?", type: "radio" },
        // Documentation and Reporting
        { name: "incidentsDocumented", label: "Are incidents requiring first aid assistance documented accurately and promptly?", type: "radio" },
        { name: "standardizedReportingProcessExists", label: "Is there a standardized reporting process for recording details of medical emergencies, treatments provided, and outcomes?", type: "radio" }, // Was composite
        { name: "reportsReviewed", label: "Are reports reviewed regularly to identify trends, areas for improvement, and opportunities for further training or intervention?", type: "radio" },
        // Medical Equipment and Facilities
        { name: "designatedAidAreas", label: "Are there designated areas or facilities equipped for administering first aid, such as treatment rooms or medical stations?", type: "radio" },
        { name: "equipmentMaintained", label: "Is medical equipment, such as automated external defibrillators (AEDs) or oxygen tanks, maintained in working condition and regularly inspected for functionality?", type: "radio" }, // Corrected typo
        { name: "staffTrainedOnEquipment", label: "Are staff members trained in the proper use and maintenance of medical equipment?", type: "radio" },
        // Continuous Training and Improvement
        { name: "ongoingTrainingProvided", label: "Is there ongoing training and education provided to staff members to refresh and enhance their first aid skills?", type: "radio" },
        { name: "drillsPracticeResponse", label: "Are regular drills or simulations conducted to practice response procedures and assess the effectiveness of first aid protocols?", type: "radio" },
        { name: "feedbackUsedForImprovement", label: "Are feedback and lessons learned from past incidents used to improve first aid response capabilities and procedures?", type: "radio" }
    ];


    return (
        <div> {/* Outer wrapper div */}
            <div className="form-page">
                <header className="header">
                    <Navbar />
                    <button className="back-button" onClick={handleBack}>←</button>
                    <h1>First Aid Response Assessment</h1>
                    <img src={logo} alt="Logo" className="logo" />
                </header>

                <main className="form-container">
                    <form onSubmit={handleSubmit}>
                        {/* Render questions dynamically */}
                         {questions.map((question, index) => (
                             <div key={index} className="form-section">
                                {/* Conditionally render section titles */}
                                {index === 0 && <h2>Availability of First Aid Supplies:</h2>}
                                {index === 3 && <h2>Trained Personnel:</h2>}
                                {index === 6 && <h2>Response Procedures:</h2>}
                                {index === 9 && <h2>Accessibility of Medical Assistance:</h2>}
                                {index === 12 && <h2>Documentation and Reporting:</h2>}
                                {index === 15 && <h2>Medical Equipment and Facilities:</h2>}
                                {index === 18 && <h2>Continuous Training and Improvement:</h2>}


                                <label htmlFor={question.name}>{question.label}</label>

                                {/* Render Yes/No radio buttons + comment input for all questions */}
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
                                        type="text" // Using input type="text" for comment consistency
                                        id={`${question.name}Comment`} // Standard comment name
                                        name={`${question.name}Comment`} // Standard comment name
                                        placeholder="Additional comments (Optional)"
                                        value={formData[`${question.name}Comment`] || ''}
                                        onChange={handleChange}
                                        className='comment-box'
                                    />
                                </>
                            </div>
                        ))}

                        {/* File Input for Image Upload */}
                        <div className="form-section">
                            <label>Upload Image (Optional):</label>
                             <input type="file" onChange={handleImageChange} accept="image/*" />
                             {imageUrl && <img src={imageUrl} alt="Uploaded First Aid Context" style={{ maxWidth: '200px', marginTop: '10px' }}/>}
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

export default FirstAidResponseFormPage;