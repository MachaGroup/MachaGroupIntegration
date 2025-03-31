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

function FireExtinguisherLocationsFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions(); // Initialize Firebase Functions
    // Define callable function with the requested naming convention
    const uploadImage = httpsCallable(functions, 'uploadFireExtinguisherLocationsFormImage');

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
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Fire Extinguisher Locations', buildingId);

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
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Fire Extinguisher Locations', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Fire Extinguisher Locations', buildingId);
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
        // Visibility and Accessibility
        { name: "extinguishersAccessible", label: "Are fire extinguishers located in easily accessible locations throughout the premises?", type: "radio" },
        { name: "placementDeterminedByHazards", label: "Have extinguisher placement been determined based on fire hazards, occupancy types, and relevant regulations or standards?", type: "radio" },
        { name: "locationsClearlyMarked", label: "Are extinguisher locations clearly marked and visible to occupants, including visitors and employees?", type: "radio" },
        { name: "extinguishersMountedAppropriately", label: "Are extinguishers mounted at appropriate heights and locations to facilitate quick retrieval in case of fire emergencies?", type: "radio" },
        // Distribution and Coverage
        { name: "strategicDistribution", label: "Are fire extinguishers distributed strategically to provide adequate coverage of all areas, including high-risk zones and confined spaces?", type: "radio" },
        { name: "placementMeetsRegulations", label: "Have extinguisher placement been determined based on fire hazards, occupancy types, and relevant regulations or standards?", type: "radio" }, // Note: Similar to placementDeterminedByHazards
        { name: "sufficientNumber", label: "Are there sufficient numbers of extinguishers available to meet the needs of the building size and occupancy load?", type: "radio" },
        // Proper Mounting and Maintenance
        { name: "securelyMounted", label: "Are fire extinguishers securely mounted on brackets or stands to prevent accidental displacement or damage?", type: "radio" },
        { name: "regularlyInspected", label: "Are extinguishers inspected regularly to ensure they are in good working condition and free from damage or tampering?", type: "radio" },
        { name: "maintenanceScheduleInPlace", label: "Is there a maintenance schedule in place for servicing extinguishers, including inspections, testing, and recharging as needed?", type: "radio" }, // Corrected typo
        // Identification and Signage
        { name: "clearlyLabeled", label: "Are fire extinguishers clearly labeled with appropriate signage indicating the type of extinguisher and its intended use?", type: "radio" },
        { name: "locationsOnMaps", label: "Are extinguisher locations identified on building maps or evacuation plans, both in physical form and electronically if applicable?", type: "radio" },
        { name: "occupantTrainingProvided", label: "Is there training provided to occupants on how to locate and use fire extinguishers effectively during emergencies?", type: "radio" },
        // Training and Education
        { name: "staffTrainedInUse", label: "Are staff members and occupants trained in the proper use of fire extinguishers as part of their fire safety training?", type: "radio" },
        { name: "occupantsUnderstandLimitations", label: "Do occupants understand the types of fires that can be safely extinguished with portable extinguishers and when to evacuate instead?", type: "radio" },
        { name: "drillsReinforceTraining", label: "Are regular fire drills conducted to reinforce training and familiarize occupants with fire extinguisher locations and procedures?", type: "radio" },
        // Emergency Response Integration
        { name: "integratedInEmergencyPlan", label: "Are fire extinguishers integrated into the overall emergency response plan for the premises?", type: "radio" },
        { name: "useCoordinatedWithResponse", label: "Is there coordination between fire extinguisher use and other response actions such as evacuation, alarm activation, and contacting emergency services?", type: "radio" },
        { name: "personnelTrainedToAssess", label: "Are designated personnel trained to assess fire situations and determine when it is safe and appropriate to use extinguishers before evacuation?", type: "radio" },
        // Record Keeping and Documentation
        { name: "recordKeepingSystemExists", label: "Is there a record keeping system in place to document the location, inspection dates, and maintenance history of fire extinguishers?", type: "radio" }, // Was composite
        { name: "recordsMaintainedPerRegulations", label: "Are records maintained in compliance with relevant regulations and standards, and are they readily accessible for review by authorities or inspectors?", type: "radio" },
        { name: "deficienciesAddressed", label: "Are deficiencies or issues identified during inspections promptly addressed and documented, with corrective actions implemented as needed?", type: "radio" }
    ];


    return (
        <div> {/* Outer wrapper div */}
            <div className="form-page">
                <header className="header">
                    <Navbar />
                    <button className="back-button" onClick={handleBack}>←</button>
                    <h1>Fire Extinguisher Locations Assessment</h1>
                    <img src={logo} alt="Logo" className="logo" />
                </header>

                <main className="form-container">
                    <form onSubmit={handleSubmit}>
                        {/* Render questions dynamically */}
                         {questions.map((question, index) => (
                             <div key={index} className="form-section">
                                {/* Conditionally render section titles */}
                                {index === 0 && <h2>Visibility and Accessibility:</h2>}
                                {index === 4 && <h2>Distribution and Coverage:</h2>}
                                {index === 7 && <h2>Proper Mounting and Maintenance:</h2>}
                                {index === 10 && <h2>Identification and Signage:</h2>}
                                {index === 13 && <h2>Training and Education:</h2>}
                                {index === 16 && <h2>Emergency Response Integration:</h2>}
                                {index === 19 && <h2>Record Keeping and Documentation:</h2>}

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
                             {imageUrl && <img src={imageUrl} alt="Uploaded Extinguisher Location Context" style={{ maxWidth: '200px', marginTop: '10px' }}/>}
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

export default FireExtinguisherLocationsFormPage;