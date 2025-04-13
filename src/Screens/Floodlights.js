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
const floodlightQuestions = [
    // Placement and Coverage
    { name: "strategicPlacement", label: "Are floodlights strategically placed for uniform illumination in parking lots?" }, // Simplified
    { name: "coverageAreas", label: "Do floodlights cover all areas (entrances, exits, pathways, blind spots)?" }, // Simplified
    // Adapted from text input
    { name: "inadequateCoverageIdentified", label: "Are any areas identified where lighting coverage is inadequate?" },
    // Brightness and Visibility
    { name: "brightness", label: "Are the floodlights sufficiently bright for effective illumination?" },
    { name: "clearVisibility", label: "Do they provide clear visibility for pedestrians and vehicles?" }, // Simplified
    // Adapted from text input
    { name: "glareShadowsPrevented", label: "Are measures in place to prevent glare or shadows affecting visibility?" },
    // Timers and Controls
    { name: "timers", label: "Are floodlights equipped with timers or controls for activation/deactivation?" }, // Simplified
    { name: "lightingSchedules", label: "Are lighting schedules adjusted based on usage patterns and security needs?" }, // Simplified
    { name: "controlFlexibility", label: "Is there flexibility to control individual lights or zones?" }, // Simplified
    // Integration with Security Systems
    { name: "integratedSystems", label: "Are floodlights integrated with other security systems (cameras, IDS)?" }, // Simplified
    { name: "triggerRecording", label: "Do activations trigger recording or alerting mechanisms?" }, // Simplified
    { name: "coordination", label: "Is there coordination between lighting controls and security personnel response?" }, // Simplified
    // Energy Efficiency
    { name: "energyEfficient", label: "Are the floodlights energy-efficient (e.g., LED)?" }, // Simplified
    { name: "energyOptimization", label: "Are measures like dimming or motion-sensing used to optimize energy consumption?" }, // Simplified
    { name: "monitoringSystem", label: "Is energy usage monitored for efficiency improvements?" }, // Simplified
    // Maintenance and Upkeep
    { name: "maintenanceSchedule", label: "Is there a regular maintenance schedule for floodlights?" },
    { name: "maintenanceTasks", label: "Are scheduled maintenance tasks (cleaning, bulb replacement, inspection) performed?" }, // Simplified
    { name: "maintenanceRecords", label: "Are records documenting maintenance, repairs, and issues kept?" }, // Simplified
    // Safety and Security
    { name: "secureInstallations", label: "Are floodlight installations secure from tampering or vandalism?" },
    { name: "reinforcedStructures", label: "Are fixtures/mounting structures adequately reinforced?" }, // Simplified
    { name: "unauthorizedAccessPrevented", label: "Are measures in place to prevent unauthorized access to controls/wiring?" }, // Simplified label - Renamed 'unauthorizedAccess'
];


function FloodlightsPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    // Renamed variable for clarity
    const uploadFloodlightsImage = httpsCallable(functions, 'uploadFloodlightsImage');

    // State aligned with the standard pattern
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
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Floodlights', buildingId);

            try {
                const docSnapshot = await getDoc(formDocRef);
                if (docSnapshot.exists()) {
                    const existingData = docSnapshot.data().formData || {};
                    setFormData(existingData);
                    // Set existing image URL from loaded data
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
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Floodlights', buildingId);
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
               setImageUrl(null); // Clear preview of previously uploaded URL
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

        setLoading(true); // Indicate submission process start
        let finalImageUrl = formData.imageUrl || null; // Use existing URL as default
        let submissionError = null;

        // Upload new image if imageData exists
        if (imageData) {
             setImageUploadError(null);
            try {
                console.log("Uploading image...");
                 // Use correct function variable name
                const uploadResult = await uploadFloodlightsImage({
                    imageData: imageData,
                    buildingId: buildingId // Pass ID if needed
                });
                finalImageUrl = uploadResult.data.imageUrl;
                setImageUrl(finalImageUrl); // Update state with new URL
                console.log("Image uploaded successfully:", finalImageUrl);
            } catch (error) {
                console.error('Error uploading image via Cloud Function:', error);
                setImageUploadError(error.message || "Failed to upload image.");
                submissionError = `Image upload failed: ${error.message || "Unknown error"}`;
                 finalImageUrl = formData.imageUrl || null; // Revert to old URL on error
                // alert(submissionError); // Alert moved after save attempt
                // return; // Decide if submission should stop on image fail
            }
        }

        // Prepare final data including the definitive image URL
        const finalFormData = { ...formData, imageUrl: finalImageUrl };
        setFormData(finalFormData); // Update state to reflect what will be saved

        try {
            // Correct Firestore document path
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Floodlights', buildingId);
            const buildingRef = doc(db, 'Buildings', buildingId);
            // Save final data with correct structure
            await setDoc(formDocRef, { formData: { ...finalFormData, building: buildingRef } }, { merge: true });

            console.log('Form data submitted successfully!');
             if (!submissionError) {
                 alert('Form submitted successfully!');
             } else {
                 alert(submissionError); // Alert image error now if save succeeded anyway
             }
            navigate('/Form');
        } catch (error) {
            console.error("Error submitting final form data:", error);
            alert("Failed to submit the form. Please check your connection and try again.");
        } finally {
            setLoading(false); // Indicate submission process end
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
                <h1>Floodlights Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Floodlight Assessment Questions</h2>
                    {/* Render questions dynamically using single map */}
                    {floodlightQuestions.map((question, index) => (
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
                                name={`${question.name}Comment`}
                                placeholder="Additional comments"
                                value={formData[`${question.name}Comment`] || ''}
                                onChange={handleChange}
                                className='comment-input' // Use consistent class
                            />
                        </div>
                    ))}

                    {/* File Input for Image Upload */}
                    <div className="form-section">
                        <label htmlFor="imageUploadFloodlight">Upload Image (Optional):</label>
                        <input id="imageUploadFloodlight" type="file" onChange={handleImageChange} accept="image/*" />
                        {imageUrl && !imageData && <img src={imageUrl} alt="Uploaded Floodlight Context" style={{ maxWidth: '200px', marginTop: '10px' }}/>}
                        {imageData && <img src={imageData} alt="Preview Floodlight Context" style={{ maxWidth: '200px', marginTop: '10px' }}/>}
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

export default FloodlightsPage;