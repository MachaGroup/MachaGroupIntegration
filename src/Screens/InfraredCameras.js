import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'; // Correct Firestore imports
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions"; // Functions imports

// Define questions array outside the component
const infraredCameraQuestions = [
    { name: "lowLightPerformance", label: "Do the infrared cameras effectively capture images in low-light or nighttime conditions?" },
    { name: "infraredLEDs", label: "Are they equipped with infrared LEDs or other illumination technology to enhance visibility in darkness?" },
    { name: "lowLightAdjustments", label: "Are there adjustments or settings available to optimize camera performance in varying levels of low-light conditions?" },
    { name: "imageQuality", label: "Do the infrared cameras capture high-quality images with sufficient resolution for identification and analysis, even in low-light environments?" },
    { name: "imageClarity", label: "Are there adjustments or settings available to enhance image clarity and detail in low-light conditions?" },
    { name: "clearImages", label: "Are images clear and detailed, allowing for easy identification of individuals and activities in low-light environments?" },
    { name: "systemIntegration", label: "Are the infrared cameras integrated with the overall surveillance system?" },
    { name: "softwareCommunication", label: "Do they communicate seamlessly with surveillance software and monitoring stations?" },
    { name: "realTimeMonitoring", label: "Is there real-time monitoring and recording of camera feeds from areas with low-light conditions?" },
    { name: "coverageAreas", label: "Do the infrared cameras cover the desired areas with low-light conditions, providing comprehensive surveillance coverage?" },
    { name: "strategicPositioning", label: "Are they positioned strategically to monitor critical areas, such as dark corners, alleys, or building perimeters, effectively?" },
    { name: "blindSpots", label: "Are there any blind spots or areas where camera coverage is insufficient in low-light environments?" },
    { name: "weatherResistance", label: "Are the infrared cameras designed to withstand outdoor environmental factors such as rain, humidity, and temperature fluctuations?" },
    { name: "durableMaterials", label: "Are they constructed from durable materials capable of withstanding harsh outdoor conditions?" },
    { name: "weatherProofingCertification", label: "Have the cameras undergone testing or certification to verify weatherproofing and durability?" },
    { name: "remoteAccess", label: "Is there remote access and control functionality for the infrared cameras?" },
    { name: "remoteAdjustments", label: "Can security personnel adjust camera angles, zoom levels, and other settings remotely as needed?" },
    { name: "secureProtocols", label: "Is there secure authentication and encryption protocols in place to prevent unauthorized access to camera controls?" },
    { name: "maintenanceSchedule", label: "Is there a regular maintenance schedule in place for the infrared cameras?" },
    { name: "maintenanceTasks", label: "Are maintenance tasks, such as cleaning, inspection of camera lenses and housings, and testing of camera functionalities, performed according to schedule?" },
    { name: "maintenanceRecords", label: "Are there records documenting maintenance activities, repairs, and any issues identified during inspections?" }
];

function InfraredCamerasPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    // Correctly defined httpsCallable function name
    const uploadImage = httpsCallable(functions, 'uploadInfraredCamerasImage'); // Renamed variable for clarity

    const [formData, setFormData] = useState({});
    const [imageData, setImageData] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);

    // useEffect for fetching data - Looks good
    useEffect(() => {
        if (!buildingId) {
            alert('No building selected. Redirecting to Building Info...');
            // Ensure navigation path is correct for your app
            navigate('/BuildingandAddress');
            return;
        }

        const fetchFormData = async () => {
            setLoading(true);
            setLoadError(null);
            // Correct Firestore path
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Infrared Cameras', buildingId);

            try {
                const docSnapshot = await getDoc(formDocRef);
                if (docSnapshot.exists()) {
                    const existingData = docSnapshot.data().formData || {};
                    setFormData(existingData);
                    // Set existing image URL from loaded data
                    if (existingData.imageUrl) {
                        setImageUrl(existingData.imageUrl);
                    }
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

    // handleChange for immediate saving - Looks good, minor refinement for clarity
    const handleChange = async (e) => {
        const { name, value } = e.target;
        const newFormData = { ...formData, [name]: value };
        setFormData(newFormData);

        // Save changes immediately
        if (buildingId) {
            try {
                const buildingRef = doc(db, 'Buildings', buildingId);
                const formDocRef = doc(db, 'forms', 'Physical Security', 'Infrared Cameras', buildingId);
                // Ensure existing imageUrl is included if present
                const dataToSave = {
                     ...newFormData,
                     building: buildingRef,
                     ...(imageUrl && { imageUrl: imageUrl }) // Keep existing imageUrl
                 };
                await setDoc(formDocRef, { formData: dataToSave }, { merge: true });
                // console.log("Form data updated:", dataToSave); // Optional console log
            } catch (error) {
                console.error("Error saving form data:", error);
                // Avoid alerting on every change, maybe add a subtle save indicator
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
                 setImageUrl(null); // Clear existing URL preview if new image selected
                 setImageUploadError(null); // Clear previous errors
             };
             reader.readAsDataURL(file);
        } else {
             setImageData(null);
        }
    };

    // handleBack - Looks good
    const handleBack = () => {
        navigate(-1);
    };

    // handleSubmit using Cloud Function and setDoc - Refined logic
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!buildingId) {
            alert('Building ID is missing. Cannot submit.');
            return;
        }

        setLoading(true); // Indicate submission process
        let finalImageUrl = formData.imageUrl || null; // Start with existing URL
        let submissionError = null;

        // Upload image if new image data exists
        if (imageData) {
            try {
                console.log("Uploading image via Cloud Function...");
                const uploadResult = await uploadImage({ // Use the correct variable name
                    imageData: imageData,
                    buildingId: buildingId // Pass ID if needed by function
                });
                finalImageUrl = uploadResult.data.imageUrl;
                setImageUrl(finalImageUrl); // Update display URL state
                setImageUploadError(null);
                console.log("Image uploaded successfully:", finalImageUrl);
            } catch (error) {
                console.error('Error uploading image via function:', error);
                setImageUploadError(`Image upload failed: ${error.message}`);
                submissionError = "Image upload failed. Form data saved without new image.";
                finalImageUrl = formData.imageUrl || null; // Revert to original URL on failure
            }
        }

        // Prepare the final data object THIS time, including the final image URL
        const finalFormData = {
             ...formData, // Include all existing answers
             imageUrl: finalImageUrl // Set the correct image URL (new or existing)
        };
        // Update state to reflect the final data being saved (optional but good practice)
        setFormData(finalFormData);

        // Save final form data to Firestore
        try {
            console.log("Saving final form data to Firestore...");
            const buildingRef = doc(db, 'Buildings', buildingId);
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Infrared Cameras', buildingId);
            // Save the fully constructed finalFormData object
            await setDoc(formDocRef, { formData: { ...finalFormData, building: buildingRef } }, { merge: true });
            console.log('Form data submitted successfully!');
            if (!submissionError) {
                alert('Form submitted successfully!');
            } else {
                alert(submissionError); // Show upload error if occurred
            }
            navigate('/Form'); // Navigate after successful save
        } catch (error) {
            console.error("Error saving final form data to Firestore:", error);
            alert("Failed to save final form data. Please check connection and try again.");
        } finally {
             setLoading(false); // Stop loading indicator
        }
    };

    // Loading/Error Display - Looks good
    if (loading && !formData) { // Initial load check
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
                <h1>Infrared Cameras Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Infrared Camera Assessment Questions</h2>

                    {/* Map over the questions array */}
                    {infraredCameraQuestions.map((question, index) => (
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
                            {/* Changed textarea to input type="text" for consistency */}
                            <input
                                className='comment-input' // Ensure this class is styled if needed
                                type="text"
                                name={`${question.name}Comment`}
                                placeholder="Additional comments"
                                value={formData[`${question.name}Comment`] || ''}
                                onChange={handleChange}
                            />
                        </div>
                    ))}

                    {/* Image upload section - Looks good */}
                    <div className="form-section">
                        <label htmlFor="imageUploadInfrared">Upload Image (Optional):</label>
                        <input id="imageUploadInfrared" type="file" onChange={handleImageChange} accept="image/*" />
                        {imageUrl && !imageData && <img src={imageUrl} alt="Uploaded Infrared Camera" style={{ maxWidth: '200px', marginTop: '10px' }} />}
                        {imageData && <img src={imageData} alt="Preview Infrared Camera" style={{ maxWidth: '200px', marginTop: '10px' }} />}
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

export default InfraredCamerasPage;