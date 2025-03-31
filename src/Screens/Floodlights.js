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

function FloodlightsPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions(); // Initialize Firebase Functions
    // Define callable function with the requested naming convention
    const uploadImage = httpsCallable(functions, 'uploadFloodlightsImage');

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
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Floodlights', buildingId);

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
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Floodlights', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Floodlights', buildingId);
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
        // Placement and Coverage
        { name: "strategicPlacement", label: "Are floodlights strategically placed throughout the parking lots to provide uniform illumination?", type: "radio" },
        { name: "coverageAreas", label: "Do the floodlights cover all areas of the parking lots, including entrances, exits, pathways, and blind spots?", type: "radio" },
        { name: "inadequateCoverage", label: "Are there any areas where lighting coverage is inadequate, posing potential security risks?", type: "text" },
        // Brightness and Visibility
        { name: "brightness", label: "Are the floodlights sufficiently bright to illuminate the parking lots effectively?", type: "radio" },
        { name: "clearVisibility", label: "Do they provide clear visibility for pedestrians and vehicles to navigate safely?", type: "radio" },
        { name: "glareShadows", label: "Are there measures in place to prevent glare or shadows that could affect visibility?", type: "text" },
        // Timers and Controls
        { name: "timers", label: "Are floodlights equipped with timers or controls to activate and deactivate them at specific times?", type: "radio" },
        { name: "lightingSchedules", label: "Are lighting schedules adjusted based on usage patterns and security requirements, such as during non-operating hours?", type: "radio" },
        { name: "controlFlexibility", label: "Is there flexibility in controlling individual floodlights or zones to optimize energy usage and security coverage?", type: "radio" },
        // Integration with Security Systems
        { name: "integratedSystems", label: "Are floodlights integrated with other security systems, such as surveillance cameras or intrusion detection systems?", type: "radio" },
        { name: "triggerRecording", label: "Do they trigger recording or alerting mechanisms upon activation to provide real-time notification of potential security threats?", type: "radio" },
        { name: "coordination", label: "Is there coordination between floodlight controls and security personnel to respond to security incidents effectively?", type: "radio" },
        // Energy Efficiency
        { name: "energyEfficient", label: "Are the floodlights energy-efficient, utilizing LED technology or other low-power lighting solutions?", type: "radio" },
        { name: "energyOptimization", label: "Are there measures in place to optimize energy consumption, such as dimming or motion-sensing capabilities during periods of low activity?", type: "radio" },
        { name: "monitoringSystem", label: "Is there a monitoring system in place to track energy usage and identify opportunities for further efficiency improvements?", type: "radio" },
        // Maintenance and Upkeep
        { name: "maintenanceSchedule", label: "Is there a regular maintenance schedule in place for floodlights?", type: "radio" },
        { name: "maintenanceTasks", label: "Are maintenance tasks, such as cleaning, bulb replacement, and inspection of wiring and fixtures, performed according to schedule?", type: "radio" },
        { name: "maintenanceRecords", label: "Are there records documenting maintenance activities, repairs, and any issues identified during inspections?", type: "radio" },
        // Safety and Security
        { name: "secureInstallations", label: "Are floodlight installations secure from tampering or vandalism?", type: "radio" },
        { name: "reinforcedStructures", label: "Are fixtures and mounting structures adequately reinforced to withstand environmental conditions and potential impact?", type: "radio" },
        { name: "unauthorizedAccess", label: "Are there measures in place to prevent unauthorized access to floodlight controls or wiring?", type: "radio" }
    ];


    return (
        <div> {/* Outer wrapper div */}
            <div className="form-page">
                <header className="header">
                    <Navbar />
                    <button className="back-button" onClick={handleBack}>←</button>
                    <h1>Floodlights Assessment</h1>
                    <img src={logo} alt="Logo" className="logo" />
                </header>

                <main className="form-container">
                    <form onSubmit={handleSubmit}>
                        {/* Render questions dynamically */}
                        {questions.map((question, index) => (
                            <div key={index} className="form-section">
                                {/* Conditionally render section titles */}
                                {index === 0 && <h2>Placement and Coverage:</h2>}
                                {index === 3 && <h2>Brightness and Visibility:</h2>}
                                {index === 6 && <h2>Timers and Controls:</h2>}
                                {index === 9 && <h2>Integration with Security Systems:</h2>}
                                {index === 12 && <h2>Energy Efficiency:</h2>}
                                {index === 15 && <h2>Maintenance and Upkeep:</h2>}
                                {index === 18 && <h2>Safety and Security:</h2>}


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
                                            type="text" // Using input type="text" for comment consistency
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
                                        placeholder="Enter details here" // Placeholder for text inputs
                                        className='comment-box' // Reusing class, adjust if needed
                                    />
                                )}
                            </div>
                        ))}

                        {/* File Input for Image Upload */}
                        <div className="form-section">
                            <label>Upload Image (Optional):</label>
                             <input type="file" onChange={handleImageChange} accept="image/*" />
                             {imageUrl && <img src={imageUrl} alt="Uploaded Floodlight Context" style={{ maxWidth: '200px', marginTop: '10px' }}/>}
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

export default FloodlightsPage;