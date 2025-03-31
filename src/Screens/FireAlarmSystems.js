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

function FireAlarmSystemsPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions(); // Initialize Firebase Functions
    // Define callable function with the requested naming convention
    const uploadImage = httpsCallable(functions, 'uploadFireAlarmSystemsImage');

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
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Fire Alarm Systems', buildingId);

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
        // Handle potential capitalization inconsistency in radio button values
        const standardizedValue = (value === 'Yes' || value === 'No') ? value.toLowerCase() : value;
        const newFormData = { ...formData, [name]: standardizedValue };
        setFormData(newFormData);


        if (!buildingId) {
            console.error("Building ID is missing, cannot save data.");
            return;
        }

        try {
            // Correct Firestore document path
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Fire Alarm Systems', buildingId);
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

        const finalFormData = { ...formData, imageUrl: finalImageUrl };

        try {
            // Correct Firestore document path
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Fire Alarm Systems', buildingId);
            const buildingRef = doc(db, 'Buildings', buildingId);
            // Save final data using setDoc with merge: true
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

    // Define questions, keeping original numbering in labels and specifying type
    const questions = [
        // Functionality and Reliability
        { name: "alarmsInstalled", label: "2.2.1.1.3.1.1. Are the fire alarm systems installed throughout the premises to provide comprehensive coverage?", type: "radio" },
        { name: "regularAlarmTesting", label: "2.2.1.1.3.1.2. Are alarm systems regularly tested to ensure they are functioning correctly and capable of detecting fires prompty?", type: "radio" },
        { name: "malfunctions", label: "2.2.1.1.3.1.3. Is there a process in place to address any malfunctions or deficiencies indentified during testing promptly?", type: "radio" },
        // Testing Schedule
        { name: "testingSchedule", label: "2.2.1.1.3.2.1. Is there a schdule for testing fire alarm systems, including frquency and procudres?", type: "text" },
        { name: "testingIntervals", label: "2.2.1.1.3.2.2. Are testing intervals established based on relevant regulations, industry standards, and manufacturer recommendations?", type: "radio" },
        { name: "comprehensiveTesting", label: "2.2.1.1.3.2.3. Are tests conducted during both regular business hours and after hours to ensure all components of the system are thoroughly evaluated?", type: "radio" },
        // Testing Procedures
        { name: "standardized", label: "2.2.1.1.3.3.1. Are testing procedures standardized and followed consistently by trained personnel?", type: "radio" },
        { name: "fireAlarmTesting", label: "2.2.1.1.3.3.2. Do tests include activation of alarm devices, testing of audible and visual alerts, and verification of signal transmission to monitoring stations?", type: "radio" }, // Corrected typo in name
        { name: "testingProtocols", label: "2.2.1.1.3.3.3. Are there protocols in place for coordinating testing with building occupants, security personnel, and emergency responders to minimize disruptions?", type: "text" },
        // Documentation and Records
        { name: "alarmRecords", label: "2.2.1.1.3.4.1. Are records maintained for all fire alarm test, including dates, times, personnel involved, and results?", type: "radio" },
        { name: "retainedRecords", label: "2.2.1.1.3.4.2. Are test records retained for the required duration and readily accessible for review by authorities or inspectors?", type: "radio" },
        { name: "issueTracking", label: "2.2.1.1.3.4.3. Is there a system in place to track and follow up on any deficiencies or issues identified during testing?", type: "text" },
        // Notification and Communication
        { name: "notificationProcess", label: "2.2.1.1.3.5.1. Is there a process for notifying building occupants in advance of scheduled fire alarm tests?", type: "text" },
        { name: "notificationChannels", label: "2.2.1.1.3.5.2. Are notifications provided thorugh appropriate channels, such as email, signage, or verbal announcements?", type: "radio" },
        { name: "fireDepartmentCoordination", label: "2.2.1.1.3.5.3. Is there coordination with local fire departments or monitoring agencies to ensure they are aware of scheduled tests and can responds appropriately to any alarms?", type: "radio" },
        // Emergency Response Integration
        { name: "alarmIntegration", label: "2.2.1.1.3.6.1. Are fire alarm systems integrated into the overall emergency response plan for the premises?", type: "radio" },
        { name: "evacuationCoordination", label: "2.2.1.1.3.6.2. Do alarm tests include coordination with evacuation drills and other repsonse actions to ensure a comprehensive evaluation of emergency preparedness?", type: "radio" },
        { name: "trainedPersonnelResponse", label: "2.2.1.1.3.6.3. Are designated personnel trained to respond to alarm activations and follow established procedures for verifying alarms and initiating emergency response actions?", type: "radio" },
        // System Maintenance and Upkeep
        { name: "maintenanceSchedule", label: "2.2.1.1.3.7.1. Is there a maintenance schedule in place for inspecting, servicing, and maintaining fire alarm systems?", type: "radio" },
        { name: "maintenanceActivities", label: "2.2.1.1.3.7.2. Are maintenance activities conducted by qualified technicians in compliance with manufacturer recommendations and industry standards?", type: "radio" },
        { name: "maintenanceIssues", label: "2.2.1.1.3.7.3. Are deficiencies or issues identified during maintenance promptly addressed and documented, with corrective actions implemented as needed?", type: "radio" }
    ];


    return (
        <div> {/* Outer wrapper div */}
            <div className="form-page">
                <header className="header">
                    <Navbar />
                    <button className="back-button" onClick={handleBack}>←</button>
                    <h1>Fire Alarm Systems Assessment</h1> {/* Simplified title */}
                    <img src={logo} alt="Logo" className="logo" />
                </header>

                <main className="form-container">
                    <form onSubmit={handleSubmit}>
                         {/* Optional: Add a general title if needed */}
                         {/* <h2>Fire Alarm System Details</h2> */}

                        {questions.map((question, index) => (
                            <div key={index} className="form-section">
                                <label htmlFor={question.name}>{question.label}</label> {/* Use label from question object */}

                                {question.type === "radio" ? (
                                    // Render Yes/No radio buttons + comment input
                                    <>
                                        <div>
                                            <input
                                                type="radio"
                                                id={`${question.name}_yes`}
                                                name={question.name}
                                                value="yes" // Standardized value
                                                checked={formData[question.name] === "yes"}
                                                onChange={handleChange}
                                            />
                                             <label htmlFor={`${question.name}_yes`}> Yes</label>

                                            <input
                                                type="radio"
                                                id={`${question.name}_no`}
                                                name={question.name}
                                                value="no" // Standardized value
                                                checked={formData[question.name] === "no"}
                                                onChange={handleChange}
                                            />
                                             <label htmlFor={`${question.name}_no`}> No</label>
                                        </div>
                                        <input
                                            type="text"
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
                             {imageUrl && <img src={imageUrl} alt="Uploaded Fire Alarm Context" style={{ maxWidth: '200px', marginTop: '10px' }}/>}
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

export default FireAlarmSystemsPage;