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
const fireAlarmQuestions = [
    // Functionality and Reliability
    { name: "alarmsInstalled", label: "2.2.1.1.3.1.1. Are fire alarm systems installed for comprehensive coverage?" }, // Simplified
    { name: "regularAlarmTesting", label: "2.2.1.1.3.1.2. Are alarm systems regularly tested for correct function?" }, // Simplified
    { name: "malfunctionsAddressed", label: "2.2.1.1.3.1.3. Is there a process to promptly address malfunctions/deficiencies found during testing?" }, // Simplified - Renamed 'malfunctions'
    // Testing Schedule
    // Adapted from text input
    { name: "testingScheduleExists", label: "2.2.1.1.3.2.1. Is there a defined schedule for testing fire alarm systems?" },
    { name: "testingIntervals", label: "2.2.1.1.3.2.2. Are testing intervals based on regulations, standards, and manufacturer recommendations?" },
    { name: "comprehensiveTesting", label: "2.2.1.1.3.2.3. Are tests conducted comprehensively (e.g., during/after hours)?" }, // Simplified
    // Testing Procedures
    { name: "standardizedProcedures", label: "2.2.1.1.3.3.1. Are testing procedures standardized and followed by trained personnel?" }, // Simplified - Renamed 'standardized'
    { name: "fireAlarmTestingIncludes", label: "2.2.1.1.3.3.2. Do tests include device activation, alert testing, and signal transmission verification?" }, // Simplified - Renamed 'fireAlarmTesting' (corrected typo)
    // Adapted from text input
    { name: "testingCoordinationProtocols", label: "2.2.1.1.3.3.3. Are protocols in place for coordinating testing with occupants/responders?" },
    // Documentation and Records
    { name: "alarmRecordsMaintained", label: "2.2.1.1.3.4.1. Are records maintained for all fire alarm tests (date, time, personnel, results)?" }, // Simplified - Renamed 'alarmRecords'
    { name: "retainedRecordsAccessible", label: "2.2.1.1.3.4.2. Are test records retained as required and readily accessible?" }, // Simplified - Renamed 'retainedRecords'
     // Adapted from text input
    { name: "issueTrackingSystem", label: "2.2.1.1.3.4.3. Is there a system to track/follow up on deficiencies identified during testing?" },
    // Notification and Communication
     // Adapted from text input
    { name: "notificationProcessExists", label: "2.2.1.1.3.5.1. Is there a process for notifying occupants in advance of scheduled tests?" },
    { name: "notificationChannels", label: "2.2.1.1.3.5.2. Are notifications provided through appropriate channels (email, signage, announcements)?" },
    { name: "fireDepartmentCoordination", label: "2.2.1.1.3.5.3. Is testing coordinated with the local fire department/monitoring agencies?" }, // Simplified
    // Emergency Response Integration
    { name: "alarmIntegrationPlan", label: "2.2.1.1.3.6.1. Are fire alarm systems integrated into the overall emergency response plan?" }, // Simplified - Renamed 'alarmIntegration'
    { name: "evacuationCoordination", label: "2.2.1.1.3.6.2. Do alarm tests coordinate with evacuation drills for comprehensive evaluation?" }, // Simplified
    { name: "trainedPersonnelResponse", label: "2.2.1.1.3.6.3. Are designated personnel trained to respond to alarms and initiate emergency actions?" },
    // System Maintenance and Upkeep
    { name: "maintenanceSchedule", label: "2.2.1.1.3.7.1. Is there a maintenance schedule for inspecting/servicing alarm systems?" }, // Simplified
    { name: "maintenanceActivities", label: "2.2.1.1.3.7.2. Are maintenance activities conducted by qualified technicians per standards?" }, // Simplified
    { name: "maintenanceIssuesAddressed", label: "2.2.1.1.3.7.3. Are deficiencies found during maintenance promptly addressed/documented?" }, // Simplified - Renamed 'maintenanceIssues'
];

function FireAlarmSystemsPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    // Renamed variable for clarity
    const uploadFireAlarmSystemsImage = httpsCallable(functions, 'uploadFireAlarmSystemsImage');

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
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Fire Alarm Systems', buildingId);

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
         // Use lowercase 'yes'/'no' directly in radio button value attributes
        const newFormData = { ...formData, [name]: value };
        setFormData(newFormData);

        if (!buildingId) {
            console.error("Building ID is missing, cannot save data.");
            return;
        }

        try {
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Fire Alarm Systems', buildingId);
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
                const uploadResult = await uploadFireAlarmSystemsImage({
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
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Fire Alarm Systems', buildingId);
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
                <h1>Fire Alarm Systems Assessment</h1> {/* Simplified title */}
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                     <h2>Fire Alarm System Questions</h2> {/* Added main heading */}
                    {/* Render questions dynamically using single map */}
                    {fireAlarmQuestions.map((question, index) => (
                        <div key={question.name} className="form-section"> {/* Use name for key */}
                            <label htmlFor={`${question.name}_yes`}>{question.label}</label> {/* Associate label */}

                             {/* Standard Yes/No Radio + Comment Input */}
                            <div>
                                <input
                                    type="radio"
                                    id={`${question.name}_yes`}
                                    name={question.name}
                                    value="yes" // Ensure value is lowercase
                                    checked={formData[question.name] === "yes"}
                                    onChange={handleChange}
                                />
                                <label htmlFor={`${question.name}_yes`}> Yes</label>

                                <input
                                    type="radio"
                                    id={`${question.name}_no`}
                                    name={question.name}
                                    value="no" // Ensure value is lowercase
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
                         <label htmlFor="imageUploadFireAlarm">Upload Image (Optional):</label>
                         <input id="imageUploadFireAlarm" type="file" onChange={handleImageChange} accept="image/*" />
                         {imageUrl && !imageData && <img src={imageUrl} alt="Uploaded Fire Alarm Context" style={{ maxWidth: '200px', marginTop: '10px' }}/>}
                         {imageData && <img src={imageData} alt="Preview Fire Alarm Context" style={{ maxWidth: '200px', marginTop: '10px' }}/>}
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

export default FireAlarmSystemsPage;