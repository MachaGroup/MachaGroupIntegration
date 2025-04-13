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
const speakerLocationQuestions = [
    { name: "strategicallyLocatedSpeakers", label: "Are PA speakers strategically located for comprehensive coverage?" }, // Simplified
    { name: "minimizingDeadZones", label: "Have locations been assessed to minimize dead zones/poor sound quality?" }, // Simplified
    { name: "speakerPositioning", label: "Are speakers positioned in key areas (classrooms, hallways, common areas, outdoors)?" }, // Simplified
    { name: "deliveringAudioMessages", label: "Is the PA system capable of delivering clear/intelligible audio messages?" }, // Simplified
    { name: "announcementMeasures", label: "Are measures taken to ensure announcements are audible over ambient noise?" }, // Simplified
    { name: "adjustedSpeakerVolumes", label: "Are speaker volumes adjusted appropriately (no discomfort/distortion)?" }, // Simplified
    { name: "redundancyFeatures", label: "Is the PA system equipped with redundancy features for equipment/power failures?" },
    { name: "backupPowerSources", label: "Are backup power sources (batteries, generators) available?" }, // Simplified
    { name: "reliabilityTesting", label: "Is the PA system regularly tested for reliability/functionality?" }, // Simplified
    { name: "draftingProcedures", label: "Are procedures established for drafting/delivering emergency messages?" }, // Simplified
    { name: "trainedSystemOperators", label: "Are operators trained on message content, delivery, and alert protocols?" }, // Simplified
    { name: "standardizedEmergencyMessages", label: "Is there a standardized format for emergency messages?" }, // Simplified
    { name: "integratedSystem", label: "Is the PA system integrated into broader emergency plans?" }, // Simplified
    { name: "coordinatedAlerts", label: "Are PA alerts coordinated with other communication channels?" }, // Simplified
    { name: "systemProceduresAligned", label: "Are PA procedures aligned with protocols for specific scenarios (evacuation, lockdown)?" }, // Simplified - Renamed 'systemProcedures'
    { name: "emergencyMessagingAccommodations", label: "Are accommodations made for individuals with disabilities?" }, // Simplified
    { name: "alternativeCommunicationMethods", label: "Are alternative communication methods available (for hearing impaired, etc.)?" },
    { name: "languageBarrierProcedures", label: "Are procedures established to address language barriers?" },
    { name: "maintainingSpeakers", label: "Is the PA system regularly maintained?" }, // Simplified
    { name: "routineTests", label: "Are routine tests/inspections conducted (speaker performance, audio quality)?" }, // Simplified
    { name: "maintainingDocuments", label: "Are records kept for maintenance, tests, and corrective actions?" } // Simplified
];

function SpeakerLocationsFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
     // Renamed variable for clarity
    const uploadSpeakerLocationsImage = httpsCallable(functions, 'uploadSpeakerLocationsImage');

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
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Speaker Locations', buildingId);

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

        if (buildingId) {
            try {
                const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Speaker Locations', buildingId);
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
                const uploadResult = await uploadSpeakerLocationsImage({
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
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Speaker Locations', buildingId);
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
        // Removed outer wrapper div if present
        <div className="form-page">
            <header className="header">
                <Navbar />
                <button className="back-button" onClick={handleBack}>←</button>
                <h1>Speaker Locations Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Speaker Location Questions</h2> {/* Added main heading */}
                    {/* Render questions dynamically using single map */}
                    {speakerLocationQuestions.map((question, index) => (
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
                         <label htmlFor="imageUploadSpeakerLoc">Upload Image (Optional):</label>
                         <input id="imageUploadSpeakerLoc" type="file" onChange={handleImageChange} accept="image/*" />
                         {imageUrl && !imageData && <img src={imageUrl} alt="Uploaded Speaker Location Context" style={{ maxWidth: '200px', marginTop: '10px' }}/>}
                         {imageData && <img src={imageData} alt="Preview Speaker Location Context" style={{ maxWidth: '200px', marginTop: '10px' }}/>}
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

export default SpeakerLocationsFormPage;