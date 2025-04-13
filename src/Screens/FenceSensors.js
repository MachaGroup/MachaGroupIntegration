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
const fenceSensorQuestions = [
    { name: "strategicPlacement", label: "Are fence sensors strategically placed to detect tampering/unauthorized access?" }, // Simplified
    { name: "fullCoverage", label: "Do they cover the entire perimeter fence line and potential entry points?" }, // Simplified
    { name: "coverageSufficient", label: "Is sensor coverage sufficient across the entire fence line?" },
    { name: "sensitivityLevel", label: "Are sensors set to an appropriate sensitivity level for cutting/climbing/lifting?" }, // Simplified
    { name: "falseAlarmAdjustments", label: "Have adjustments been made to minimize false alarms (wind, vegetation, wildlife)?" },
    { name: "quickResponse", label: "Do sensors respond quickly and trigger alarms promptly upon detection?" }, // Simplified
    { name: "differentiationMechanism", label: "Is a mechanism in place to differentiate normal vs. suspicious activity?" }, // Simplified
    { name: "realTimeTransmission", label: "Are alarms transmitted to monitoring stations/security in real-time?" },
    { name: "integratedAlarmSystem", label: "Are fence sensors integrated with the overall perimeter alarm system?" },
    { name: "seamlessCommunication", label: "Do they communicate seamlessly with alarm panels/monitoring stations?" }, // Simplified
    { name: "coordinationWithOtherDevices", label: "Is there coordination between sensor activations and other alarm devices (sirens, lights)?" }, // Simplified
    { name: "remoteMonitoring", label: "Is remote access and monitoring functionality available?" }, // Simplified
    { name: "remoteAdjustments", label: "Can personnel remotely view status, receive alerts, and adjust settings?" }, // Simplified
    { name: "secureProtocols", label: "Are secure authentication/encryption protocols in place for remote access?" }, // Simplified
    { name: "durableDesign", label: "Are sensors designed to withstand relevant outdoor environmental factors?" }, // Simplified
    { name: "durableMaterials", label: "Are they constructed from durable materials resistant to elements/tampering?" }, // Simplified
    { name: "testingCertification", label: "Have sensors undergone testing/certification for reliability/durability?" },
    { name: "maintenanceSchedule", label: "Is there a regular maintenance schedule for fence sensors?" },
    { name: "maintenanceTasks", label: "Are scheduled maintenance tasks (testing, battery replacement, inspection) performed?" }, // Simplified
    { name: "maintenanceRecords", label: "Are records documenting maintenance, repairs, and issues kept?" }, // Simplified
];


function FenceSensorsPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
     // Renamed variable for clarity
    const uploadFenceSensorsImage = httpsCallable(functions, 'uploadFenceSensorsImage');

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
             // Added current date to alert as per guidelines (though not explicitly asked for)
            alert(`No building selected (as of ${new Date().toLocaleDateString()}). Redirecting to Building Info...`);
            navigate('/BuildingandAddress');
            return;
        }

        const fetchFormData = async () => {
            setLoading(true);
            setLoadError(null);
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Fence Sensors', buildingId);

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
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Fence Sensors', buildingId);
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
                const uploadResult = await uploadFenceSensorsImage({
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
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Fence Sensors', buildingId);
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
                <h1>Fence Sensors Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Fence Sensor Assessment Questions</h2> {/* Added main heading */}
                    {/* Render questions dynamically */}
                    {fenceSensorQuestions.map((question, index) => (
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
                         <label htmlFor="imageUploadFenceSensor">Upload Image (Optional):</label>
                         <input id="imageUploadFenceSensor" type="file" onChange={handleImageChange} accept="image/*" />
                         {imageUrl && !imageData && <img src={imageUrl} alt="Uploaded Fence Sensor Context" style={{ maxWidth: '200px', marginTop: '10px' }}/>}
                         {imageData && <img src={imageData} alt="Preview Fence Sensor Context" style={{ maxWidth: '200px', marginTop: '10px' }}/>}
                         {imageUploadError && <p style={{ color: 'red' }}>{imageUploadError}</p>}
                    </div>

                    {/* Submit Button */}
                     <button type="submit" disabled={loading}>
                         {loading ? 'Submitting...' : 'Submit Final'} {/* Indicate loading on submit */}
                     </button>
                </form>
            </main>
        </div>
    );
}

export default FenceSensorsPage;