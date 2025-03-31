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

function GateAlarmsPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions(); // Initialize Firebase Functions
    // Define callable function with the requested naming convention
    const uploadImage = httpsCallable(functions, 'uploadGateAlarmsImage');

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
            alert(`No building selected (as of ${new Date().toLocaleDateString()}). Redirecting to Building Info...`);
            navigate('/BuildingandAddress'); // Ensure navigation path is correct
            return;
        }

        const fetchFormData = async () => {
            setLoading(true);
            setLoadError(null);
            // Correct Firestore document path for this form
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Gate Alarms', buildingId);

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
        const standardizedValue = (value === 'yes' || value === 'no') ? value : value; // Assuming values are already lowercase yes/no or specific options
        const newFormData = { ...formData, [name]: standardizedValue };
        setFormData(newFormData);

        if (!buildingId) {
            console.error("Building ID is missing, cannot save data.");
            return;
        }

        try {
            // Correct Firestore document path
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Gate Alarms', buildingId);
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

        // Prepare final data, ensuring building ref is included
        const finalFormData = { ...formData, imageUrl: finalImageUrl };

        try {
            // Correct Firestore document path
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Gate Alarms', buildingId);
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
        { name: "installedOnAllGates", label: "Are the gate alarms installed on all entry gates, including vehicle and pedestrian gates?", type: "radio" },
        { name: "coverageAllOpenings", label: "Do they cover all gate openings and potential access points?", type: "radio" },
        { name: "noCoverageGates", label: "Are there any gates or entry points without alarm coverage?", type: "text" },
        // Sensor Type and Activation
        { name: "sensorType", label: "What type of sensors are used for gate alarms (e.g., magnetic switches, contact sensors)?", type: "text" },
        { name: "sensorActivation", label: "Are the sensors activated when the gate is opened, closed, or both?", type: "radio", options: ["opened", "closed", "both"] },
        { name: "delayMechanism", label: "Is there a delay mechanism in place to allow authorized personnel to disarm the alarm before it triggers?", type: "radio" },
        // Response Time and Alarm Triggering
        { name: "quickResponse", label: "Do the gate alarms respond quickly when triggered by unauthorized access attempts?", type: "radio" },
        { name: "audibleVisualAlarm", label: "Is there a loud audible alarm or visual indication (e.g., flashing lights) to alert occupants and deter intruders?", type: "radio" },
        { name: "realTimeResponse", label: "Are alarms transmitted to monitoring stations or security personnel in real-time for immediate response?", type: "radio" },
        // Integration with Alarm Systems
        { name: "integratedWithPerimeterSystem", label: "Are the gate alarms integrated with the overall perimeter alarm system?", type: "radio" },
        { name: "seamlessCommunication", label: "Do they communicate seamlessly with alarm control panels and monitoring stations?", type: "radio" },
        { name: "coordinationWithDevices", label: "Is there coordination between gate alarm activations and other alarm devices such as sirens, strobe lights, or notification systems?", type: "radio" },
        // Remote Monitoring and Management
        { name: "remoteMonitoring", label: "Is there remote access and monitoring functionality for the gate alarms?", type: "radio" },
        { name: "remoteAccessAcknowledge", label: "Can security personnel view alarm status, receive alerts, and acknowledge alarms remotely as needed?", type: "radio" },
        { name: "secureProtocols", label: "Is there secure authentication and encryption protocols in place to prevent unauthorized access to alarm controls?", type: "radio" },
        // Durability and Reliability
        { name: "durability", label: "Are the gate alarms designed to withstand frequent use and potential tampering attempts?", type: "radio" },
        { name: "outdoorDurability", label: "Are they constructed from durable materials capable of withstanding outdoor conditions?", type: "radio" },
        { name: "testingCertification", label: "Have the alarms undergone testing or certification to verify reliability and durability?", type: "radio" },
        // Maintenance and Upkeep
        { name: "maintenanceSchedule", label: "Is there a regular maintenance schedule in place for the gate alarms?", type: "radio" },
        { name: "maintenanceTasks", label: "Are maintenance tasks, such as testing alarm functionality, replacing batteries, and inspecting sensor connections, performed according to schedule?", type: "radio" },
        { name: "maintenanceRecords", label: "Are there records documenting maintenance activities, repairs, and any issues identified during inspections?", type: "radio" }
    ];

    return (
        <div> {/* Outer wrapper div */}
            <div className="form-page">
                <header className="header">
                    <Navbar />
                    <button className="back-button" onClick={handleBack}>←</button>
                    <h1>Gate Alarms Assessment</h1>
                    <img src={logo} alt="Logo" className="logo" />
                </header>

                <main className="form-container">
                    <form onSubmit={handleSubmit}>
                        {/* Render questions dynamically */}
                        {questions.map((question, index) => (
                            <div key={index} className="form-section">
                                {/* Conditionally render section titles */}
                                {index === 0 && <h2>Placement and Coverage:</h2>}
                                {index === 3 && <h2>Sensor Type and Activation:</h2>}
                                {index === 6 && <h2>Response Time and Alarm Triggering:</h2>}
                                {index === 9 && <h2>Integration with Alarm Systems:</h2>}
                                {index === 12 && <h2>Remote Monitoring and Management:</h2>}
                                {index === 15 && <h2>Durability and Reliability:</h2>}
                                {index === 18 && <h2>Maintenance and Upkeep:</h2>}

                                <label htmlFor={question.name}>{question.label}</label>

                                {question.type === "radio" && question.options ? (
                                    // Render specific radio options (e.g., opened/closed/both)
                                    <div>
                                        {question.options.map(option => (
                                            <span key={option} style={{ marginRight: '15px' }}> {/* Added span for spacing */}
                                                <input
                                                    type="radio"
                                                    id={`${question.name}_${option}`}
                                                    name={question.name}
                                                    value={option}
                                                    checked={formData[question.name] === option}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor={`${question.name}_${option}`} style={{ textTransform: 'capitalize', marginLeft: '5px' }}> {/* Capitalize and add space */}
                                                    {option}
                                                </label>
                                            </span>
                                        ))}
                                    </div>
                                ) : question.type === "radio" ? (
                                    // Render standard Yes/No radio buttons + comment input
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
                                            name={`${question.name}Comment`} // Standard comment name
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
                             {imageUrl && <img src={imageUrl} alt="Uploaded Gate Alarm Context" style={{ maxWidth: '200px', marginTop: '10px' }}/>}
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

export default GateAlarmsPage;