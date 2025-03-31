import React, { useState, useEffect } from 'react';
// Firestore imports aligned with SecurityGatesPage
import { getFirestore, collection, doc, getDoc, setDoc } from 'firebase/firestore';
// Firebase Functions imports (replacing Storage imports)
import { getFunctions, httpsCallable } from "firebase/functions";
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css'; // Assuming same CSS file
import logo from '../assets/MachaLogo.png'; // Assuming same logo
import Navbar from "./Navbar"; // Assuming same Navbar

function FenceSensorsPage() {
    const navigate = useNavigate(); // Initialize useNavigate hook for navigation
    const { buildingId } = useBuilding(); // Access buildingId from context
    const db = getFirestore();
    const functions = getFunctions(); // Initialize Firebase Functions
    // Define callable function with the requested naming convention
    const uploadImage = httpsCallable(functions, 'uploadFenceSensorsImage');

    // State aligned with SecurityGatesPage
    const [formData, setFormData] = useState({}); // Initialize as empty object
    const [imageData, setImageData] = useState(null); // For base64 image data
    const [imageUrl, setImageUrl] = useState(null); // For storing uploaded image URL
    const [imageUploadError, setImageUploadError] = useState(null); // For image upload errors
    const [loading, setLoading] = useState(true); // Loading state for initial fetch
    const [loadError, setLoadError] = useState(null); // Error state for initial fetch

    // useEffect for fetching data on load (like SecurityGatesPage)
    useEffect(() => {
        if (!buildingId) {
            alert('No building selected. Redirecting to Building Info...');
            // Corrected navigation path if needed, ensure it matches your routes
            navigate('/BuildingandAddress');
            return;
        }

        const fetchFormData = async () => {
            setLoading(true);
            setLoadError(null);
            // Document path structure aligned with SecurityGatesPage
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Fence Sensors', buildingId);

            try {
                const docSnapshot = await getDoc(formDocRef);
                if (docSnapshot.exists()) {
                    // Set formData from Firestore or default to empty object
                    setFormData(docSnapshot.data().formData || {});
                    // Optionally load existing image URL if stored
                    setImageUrl(docSnapshot.data().formData?.imageUrl || null);
                } else {
                    setFormData({}); // Initialize if no document exists
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

    // handleChange now saves data on every change (like SecurityGatesPage)
    const handleChange = async (e) => {
        const { name, value } = e.target;
        const newFormData = { ...formData, [name]: value };
        setFormData(newFormData);

        if (!buildingId) {
            console.error("Building ID is missing, cannot save data.");
            // Optionally alert the user or handle differently
            return;
        }

        try {
            // Document path structure aligned with SecurityGatesPage
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Fence Sensors', buildingId);
            // Create buildingRef (Reference to the building document)
            const buildingRef = doc(db, 'Buildings', buildingId);
            // Save data using setDoc with merge: true
            await setDoc(formDocRef, { formData: { ...newFormData, building: buildingRef } }, { merge: true });
            console.log("Form data auto-saved:", { ...newFormData, building: buildingRef });
        } catch (error) {
            console.error("Error auto-saving form data:", error);
            // Consider showing a non-blocking error message to the user
            // alert("Failed to save changes. Please check your connection.");
        }
    };

    // handleImageChange using FileReader (like SecurityGatesPage)
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageData(reader.result); // Store base64 data
                setImageUrl(null); // Clear previous image URL if a new file is selected
                setImageUploadError(null); // Clear previous errors
            };
            reader.readAsDataURL(file);
        }
    };

    // handleBack now only navigates (like SecurityGatesPage)
    const handleBack = () => {
        navigate(-1); // Simple navigation back
    };

    // handleSubmit aligned with SecurityGatesPage (using Cloud Function for upload)
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!buildingId) {
            alert('Building ID is missing. Please start from the Building Information page.');
            return;
        }

        let finalImageUrl = formData.imageUrl || null; // Keep existing URL unless new image uploaded

        // Upload new image if imageData exists
        if (imageData) {
             // Show loading state for upload if desired
             setImageUploadError(null);
            try {
                console.log("Uploading image...");
                const uploadResult = await uploadImage({ imageData: imageData });
                finalImageUrl = uploadResult.data.imageUrl; // Get URL from function response
                setImageUrl(finalImageUrl); // Update display URL
                console.log("Image uploaded successfully:", finalImageUrl);
            } catch (error) {
                console.error('Error uploading image via Cloud Function:', error);
                setImageUploadError(error.message || "Failed to upload image.");
                alert(`Image upload failed: ${error.message || "Unknown error"}`);
                 // Decide if submission should proceed without the image
                 // return; // Uncomment this to stop submission if image upload fails
            }
        }

        // Prepare final data, including the building reference and image URL
        const finalFormData = { ...formData, imageUrl: finalImageUrl };

        try {
            // Document path structure aligned with SecurityGatesPage
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Fence Sensors', buildingId);
            // Create buildingRef
            const buildingRef = doc(db, 'Buildings', buildingId);
            // Save final data using setDoc with merge: true
            await setDoc(formDocRef, { formData: { ...finalFormData, building: buildingRef } }, { merge: true });

            console.log('Form data submitted successfully!');
            alert('Form submitted successfully!');
            navigate('/Form'); // Navigate after successful submission
        } catch (error) {
            console.error("Error submitting final form data:", error);
            alert("Failed to submit the form. Please check your connection and try again.");
        }
    };

    // Loading and Error display (like SecurityGatesPage)
    if (loading) {
        return <div>Loading...</div>;
    }

    if (loadError) {
        return <div>Error: {loadError}</div>;
    }

    // Define questions in the structured format
    const questions = [
        { name: "strategicPlacement", label: "Are the fence sensors strategically placed along the perimeter to detect tampering or unauthorized access attempts?" },
        { name: "fullCoverage", label: "Do they cover the entire perimeter, including all fence lines and potential entry points?" },
        // Note: The 'insufficientCoverage' question was a text input, adapting it to Yes/No + Comment
        { name: "coverageSufficient", label: "Is sensor coverage sufficient across the entire fence line?" },
        { name: "sensitivityLevel", label: "Are the fence sensors set to an appropriate sensitivity level to detect tampering, such as cutting, climbing, or lifting of the fence?" },
        { name: "falseAlarmAdjustments", label: "Have adjustments been made to minimize false alarms caused by environmental factors such as wind, vegetation, or wildlife?" },
        { name: "quickResponse", label: "Do the fence sensors respond quickly to detected tampering and trigger alarms promptly?" },
        { name: "differentiationMechanism", label: "Is there a mechanism in place to differentiate between normal activities (e.g., wind-induced movements) and suspicious behaviors to minimize false alarms?" },
        { name: "realTimeTransmission", label: "Are alarms transmitted to monitoring stations or security personnel in real-time for immediate response?" },
        { name: "integratedAlarmSystem", label: "Are the fence sensors integrated with the overall perimeter alarm system?" },
        { name: "seamlessCommunication", label: "Do they communicate seamlessly with alarm control panels and monitoring stations?" },
        { name: "coordinationWithOtherDevices", label: "Is there coordination between fence sensor activations and other alarm devices such as sirens, strobe lights, or notification systems?" },
        { name: "remoteMonitoring", label: "Is there remote access and monitoring functionality for the fence sensors?" },
        { name: "remoteAdjustments", label: "Can security personnel view sensor status, receive alerts, and adjust settings remotely as needed?" },
        { name: "secureProtocols", label: "Is there secure authentication and encryption protocols in place to prevent unauthorized access to sensor controls?" },
        { name: "durableDesign", label: "Are the fence sensors designed to withstand outdoor environmental factors such as temperature variations, moisture, and physical impact?" },
        { name: "durableMaterials", label: "Are they constructed from durable materials capable of withstanding exposure to the elements and potential tampering attempts?" },
        { name: "testingCertification", label: "Have the sensors undergone testing or certification to verify reliability and durability?" },
        { name: "maintenanceSchedule", label: "Is there a regular maintenance schedule in place for the fence sensors?" },
        { name: "maintenanceTasks", label: "Are maintenance tasks, such as testing sensor functionality, replacing batteries, and inspecting sensor connections, performed according to schedule?" },
        { name: "maintenanceRecords", label: "Are there records documenting maintenance activities, repairs, and any issues identified during inspections?" }
    ];


    return (
        <div> {/* Added wrapper div like in SecurityGatesPage */}
            <div className="form-page">
                <header className="header">
                    <Navbar />
                    <button className="back-button" onClick={handleBack}>←</button>
                    {/* Title specific to this page */}
                    <h1>Fence Sensors Assessment</h1>
                    <img src={logo} alt="Logo" className="logo" />
                </header>

                <main className="form-container">
                    {/* Form submission handler */}
                    <form onSubmit={handleSubmit}>
                        {/* Title specific to this page */}
                        <h2>Fence Sensors Assessment Details</h2>

                        {/* Map through questions array */}
                        {questions.map((question, index) => (
                            <div key={index} className="form-section">
                                <label>{question.label}</label>
                                <div>
                                    {/* Yes Radio Button */}
                                    <input
                                        type="radio"
                                        id={`${question.name}_yes`} // Added id for label association
                                        name={question.name}
                                        value="yes"
                                        // Use checked to control state based on formData
                                        checked={formData[question.name] === "yes"}
                                        onChange={handleChange}
                                    />
                                     <label htmlFor={`${question.name}_yes`}> Yes</label> {/* Added label text */}

                                    {/* No Radio Button */}
                                    <input
                                        type="radio"
                                        id={`${question.name}_no`} // Added id for label association
                                        name={question.name}
                                        value="no"
                                         // Use checked to control state based on formData
                                        checked={formData[question.name] === "no"}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor={`${question.name}_no`}> No</label> {/* Added label text */}
                                </div>
                                {/* Text Input for Comments */}
                                <input
                                    type="text" // Changed from textarea to input type text
                                    name={`${question.name}Comment`} // Naming convention for comment field
                                    placeholder="Additional comments (Optional)" // Placeholder text
                                    // Control input value using formData
                                    value={formData[`${question.name}Comment`] || ''}
                                    onChange={handleChange}
                                    className='comment-box' // Keep className if styles are needed
                                />
                            </div>
                        ))}

                        {/* File Input for Image Upload */}
                        <div className="form-section"> {/* Optional: wrap file input in a section */}
                            <label>Upload Image (Optional):</label>
                             <input type="file" onChange={handleImageChange} accept="image/*" />
                             {/* Display uploaded image preview */}
                             {imageUrl && <img src={imageUrl} alt="Uploaded Fence Sensor" style={{ maxWidth: '200px', marginTop: '10px' }}/>} {/* Added style for preview size */}
                             {/* Display image upload error */}
                             {imageUploadError && <p style={{ color: 'red' }}>{imageUploadError}</p>}
                             {/* Removed progress bar as Cloud Function call doesn't provide granular progress */}
                        </div>

                        {/* Submit Button */}
                        <button type="submit">Submit Assessment</button>
                    </form>
                </main>
            </div>
        </div>
    );
}

export default FenceSensorsPage;