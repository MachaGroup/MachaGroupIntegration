import React, { useState, useEffect } from 'react';
// Firestore imports aligned with the standard pattern
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'; // Removed unused 'collection'
// Firebase Functions imports
import { getFunctions, httpsCallable } from "firebase/functions";
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css'; // Assuming same CSS file
import logo from '../assets/MachaLogo.png'; // Assuming same logo
import Navbar from "./Navbar"; // Assuming same Navbar

// Define questions array outside the component
const fireExtinguisherQuestions = [
    // Visibility and Accessibility
    { name: "extinguishersAccessible", label: "Are fire extinguishers located in easily accessible locations?" }, // Simplified
    { name: "placementDeterminedByHazards", label: "Is placement based on fire hazards, occupancy, and regulations?" }, // Simplified
    { name: "locationsClearlyMarked", label: "Are locations clearly marked and visible?" }, // Simplified
    { name: "extinguishersMountedAppropriately", label: "Are extinguishers mounted at appropriate heights/locations for quick retrieval?" },
    // Distribution and Coverage
    { name: "strategicDistribution", label: "Are extinguishers distributed strategically for adequate coverage (incl. high-risk zones)?" }, // Simplified
    { name: "placementMeetsRegulations", label: "Does placement meet relevant regulations/standards?" }, // Simplified - Note: Similar to placementDeterminedByHazards, consider merging or clarifying
    { name: "sufficientNumber", label: "Is the number of extinguishers sufficient for building size/occupancy?" }, // Simplified
    // Proper Mounting and Maintenance
    { name: "securelyMounted", label: "Are extinguishers securely mounted to prevent displacement/damage?" }, // Simplified
    { name: "regularlyInspected", label: "Are extinguishers inspected regularly for working condition?" }, // Simplified
    { name: "maintenanceScheduleInPlace", label: "Is there a maintenance schedule for servicing (inspections, testing, recharging)?" }, // Corrected typo
    // Identification and Signage
    { name: "clearlyLabeled", label: "Are extinguishers clearly labeled with type and intended use signage?" },
    { name: "locationsOnMaps", label: "Are locations identified on building maps/evacuation plans?" },
    { name: "occupantTrainingProvided", label: "Are occupants trained on locating and using extinguishers?" }, // Simplified
    // Training and Education
    { name: "staffTrainedInUse", label: "Are staff/occupants trained in proper extinguisher use?" }, // Simplified
    { name: "occupantsUnderstandLimitations", label: "Do occupants understand extinguisher limitations and when to evacuate instead?" },
    { name: "drillsReinforceTraining", label: "Are fire drills used to reinforce training on locations/procedures?" }, // Simplified
    // Emergency Response Integration
    { name: "integratedInEmergencyPlan", label: "Are extinguishers integrated into the overall emergency response plan?" },
    { name: "useCoordinatedWithResponse", label: "Is extinguisher use coordinated with other response actions (evacuation, alarms)?" },
    { name: "personnelTrainedToAssess", label: "Are designated personnel trained to assess fire situations before extinguisher use?" }, // Simplified
    // Record Keeping and Documentation
    { name: "recordKeepingSystemExists", label: "Is there a system for recording location, inspection, and maintenance history?" },
    { name: "recordsMaintainedPerRegulations", label: "Are records maintained per regulations and readily accessible?" }, // Simplified
    { name: "deficienciesAddressed", label: "Are deficiencies identified during inspections promptly addressed and documented?" } // Simplified
];


function FireExtinguisherLocationsFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    // Renamed variable for clarity
    const uploadFireExtinguisherLocationsFormImage = httpsCallable(functions, 'uploadFireExtinguisherLocationsFormImage');

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
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Fire Extinguisher Locations', buildingId);

            try {
                const docSnapshot = await getDoc(formDocRef);
                if (docSnapshot.exists()) {
                    const existingData = docSnapshot.data().formData || {};
                    setFormData(existingData);
                    setImageUrl(existingData.imageUrl || null); // Use optional chaining
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

    // handleChange saves data on every change with correct structure
    const handleChange = async (e) => {
        const { name, value } = e.target;
        const newFormData = { ...formData, [name]: value };
        setFormData(newFormData);

        if (!buildingId) {
            console.error("Building ID is missing, cannot save data.");
            return;
        }

        try {
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Fire Extinguisher Locations', buildingId);
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
    };

    // handleImageChange using FileReader - Looks good
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
                const uploadResult = await uploadFireExtinguisherLocationsFormImage({
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
        setFormData(finalFormData); // Update state to final version

        try {
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Fire Extinguisher Locations', buildingId);
            const buildingRef = doc(db, 'Buildings', buildingId);
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
                <h1>Fire Extinguisher Locations Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Extinguisher Location Questions</h2> {/* Added main heading */}
                    {/* Render questions dynamically using single map */}
                    {fireExtinguisherQuestions.map((question, index) => (
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
                         <label htmlFor="imageUploadExtinguisherLoc">Upload Image (Optional):</label>
                         <input id="imageUploadExtinguisherLoc" type="file" onChange={handleImageChange} accept="image/*" />
                         {imageUrl && !imageData && <img src={imageUrl} alt="Uploaded Extinguisher Location Context" style={{ maxWidth: '200px', marginTop: '10px' }}/>}
                         {imageData && <img src={imageData} alt="Preview Extinguisher Location Context" style={{ maxWidth: '200px', marginTop: '10px' }}/>}
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

export default FireExtinguisherLocationsFormPage;