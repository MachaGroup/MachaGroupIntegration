import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
// Correct Firestore imports
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
// Removed unused Storage imports
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import Navbar from "./Navbar";
// Correct Functions imports
import { getFunctions, httpsCallable } from "firebase/functions";

// Define questions array outside the component
const doorAlarmQuestions = [
    // Placement and Coverage
    { name: "entryPointCoverage", label: "2.1.2.2. Door Alarms: Are the door alarms installed on all intended entry points, including doors to restricted areas?" },
    { name: "doorCoverage", label: "2.1.2.2. Door Alarms: Do they cover all necessary exterior doors, internal doors, and other access points?" },
    // Adapted from text input
    { name: "uncoveredPointsIdentified", label: "2.1.2.2. Door Alarms: Are any required doors or entry points identified as being without alarm coverage?" },
    // Sensor Type and Activation
    // Adapted from text input
    { name: "sensorTypeAppropriate", label: "2.1.2.2. Door Alarms: Are the sensor types appropriate for the door types and environment (e.g., magnetic reed, contact)?" },
    // Adapted from multi-option radio
    { name: "sensorActivationCorrect", label: "2.1.2.2. Door Alarms: Are the sensors configured to activate appropriately when the door status changes (e.g., opened)?" },
    { name: "delayMechanism", label: "2.1.2.2. Door Alarms: Is there an appropriate delay mechanism (if required) to allow authorized personnel to disarm the alarm?" },
    // Response Time and Alarm Triggering
    { name: "responseTime", label: "2.1.2.2. Door Alarms: Do the door alarms respond quickly when triggered by unauthorized entry attempts?" },
    { name: "alarmIndication", label: "2.1.2.2. Door Alarms: Is there a clear audible alarm and/or visual indication (e.g., flashing lights)?" },
    { name: "alarmTransmission", label: "2.1.2.2. Door Alarms: Are alarms transmitted to monitoring stations or security personnel in real-time?" },
    // Integration with Alarm Systems
    { name: "systemIntegration", label: "2.1.2.2. Door Alarms: Are the door alarms integrated with the overall intrusion alarm system?" },
    { name: "alarmCommunication", label: "2.1.2.2. Door Alarms: Do they communicate seamlessly with alarm control panels and monitoring stations?" },
    { name: "alarmCoordination", label: "2.1.2.2. Door Alarms: Is there coordination between door alarm activations and other alarm devices (sirens, strobes, notifications)?" },
    // Remote Monitoring and Management
    { name: "remoteMonitoring", label: "2.1.2.2. Door Alarms: Is there remote access and monitoring functionality for the door alarms?" },
    { name: "remoteAcknowledge", label: "2.1.2.2. Door Alarms: Can security personnel remotely view status, receive alerts, and acknowledge alarms?" },
    { name: "secureProtocolsRemote", label: "2.1.2.2. Door Alarms: Are secure authentication and encryption protocols in place for remote access?" }, // Renamed for clarity
    // Durability and Reliability
    { name: "tamperProof", label: "2.1.2.2. Door Alarms: Are the door alarms designed to withstand potential tampering attempts?" },
    { name: "durableMaterials", label: "2.1.2.2. Door Alarms: Are they constructed from durable materials suitable for their environment?" },
    { name: "alarmTestingCertification", label: "2.1.2.2. Door Alarms: Have the alarms undergone testing or certification for reliability?" }, // Renamed for clarity
    // Maintenance and Upkeep
    { name: "maintenanceSchedule", label: "2.1.2.2. Door Alarms: Is there a regular maintenance schedule in place?" },
    { name: "maintenanceTasks", label: "2.1.2.2. Door Alarms: Are scheduled maintenance tasks (testing, battery replacement, inspection) performed?" },
    { name: "maintenanceRecords", label: "2.1.2.2. Door Alarms: Are there records documenting maintenance activities, repairs, and issues?" },
];


function DoorAlarmsPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    // Correct httpsCallable definition
    const uploadImage = httpsCallable(functions, 'uploadDoorAlarmsImage'); // Renamed var

    // Updated state variables
    const [formData, setFormData] = useState({});
    const [imageData, setImageData] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);

    // useEffect for fetching data
    useEffect(() => {
        if (!buildingId) {
            alert('No building selected. Redirecting to Building Info...');
            navigate('/BuildingandAddress');
            return;
        }

        const fetchFormData = async () => {
            setLoading(true);
            setLoadError(null);
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Door Alarms', buildingId);

            try {
                const docSnapshot = await getDoc(formDocRef);
                if (docSnapshot.exists()) {
                    const existingData = docSnapshot.data().formData || {};
                    setFormData(existingData);
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

    // handleChange saves data immediately
    const handleChange = async (e) => {
        const { name, value } = e.target;
        const newFormData = { ...formData, [name]: value };
        setFormData(newFormData);

        if (buildingId) {
            try {
                const buildingRef = doc(db, 'Buildings', buildingId);
                const formDocRef = doc(db, 'forms', 'Physical Security', 'Door Alarms', buildingId);
                const dataToSave = {
                     ...newFormData,
                     building: buildingRef,
                     ...(imageUrl && { imageUrl: imageUrl })
                 };
                await setDoc(formDocRef, { formData: dataToSave }, { merge: true });
                // console.log("Form data updated:", dataToSave);
            } catch (error) {
                console.error("Error saving form data:", error);
            }
        }
    };

    // handleImageChange uses base64
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

    // handleBack is simplified
    const handleBack = () => {
        navigate(-1);
    };

    // handleSubmit uses Cloud Function and setDoc
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!buildingId) {
            alert('Building ID is missing. Cannot submit.');
            return;
        }

        setLoading(true);
        let finalImageUrl = formData.imageUrl || null;
        let submissionError = null;

        if (imageData) {
            try {
                console.log("Uploading image via Cloud Function...");
                const uploadResult = await uploadImage({ // Use correct var name
                    imageData: imageData,
                    buildingId: buildingId
                 });
                finalImageUrl = uploadResult.data.imageUrl;
                setImageUrl(finalImageUrl);
                setImageUploadError(null);
                console.log("Image uploaded successfully:", finalImageUrl);
            } catch (error) {
                console.error('Error uploading image via function:', error);
                setImageUploadError(`Image upload failed: ${error.message}`);
                submissionError = "Image upload failed. Form data saved without new image.";
                 finalImageUrl = formData.imageUrl || null;
            }
        }

        const finalFormData = {
             ...formData,
             imageUrl: finalImageUrl
        };
        setFormData(finalFormData); // Update state to final data

        try {
            console.log("Saving final form data to Firestore...");
            const buildingRef = doc(db, 'Buildings', buildingId);
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Door Alarms', buildingId);
            await setDoc(formDocRef, { formData: { ...finalFormData, building: buildingRef } }, { merge: true });
            console.log('Form data submitted successfully!');
            if (!submissionError) {
                alert('Form submitted successfully!');
            } else {
                alert(submissionError);
            }
            navigate('/Form');
        } catch (error) {
            console.error("Error saving final form data to Firestore:", error);
            alert("Failed to save final form data. Please check connection and try again.");
        } finally {
             setLoading(false);
        }
    };

    // Loading/Error Display
    if (loading && !formData) {
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
                <h1>Door Alarms Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Door Alarm Assessment Questions</h2>

                    {/* Single .map call for all questions */}
                    {doorAlarmQuestions.map((question, index) => (
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
                            {/* Use input type="text" for comments */}
                            <input
                                className='comment-input'
                                type="text"
                                name={`${question.name}Comment`}
                                placeholder="Additional comments"
                                value={formData[`${question.name}Comment`] || ''}
                                onChange={handleChange}
                            />
                        </div>
                    ))}

                    {/* Image upload section */}
                    <div className="form-section">
                        <label htmlFor="imageUploadDoorAlarm">Upload Image (Optional):</label>
                        <input id="imageUploadDoorAlarm" type="file" onChange={handleImageChange} accept="image/*" />
                        {imageUrl && !imageData && <img src={imageUrl} alt="Uploaded Door Alarm" style={{ maxWidth: '200px', marginTop: '10px' }} />}
                        {imageData && <img src={imageData} alt="Preview Door Alarm" style={{ maxWidth: '200px', marginTop: '10px' }} />}
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

export default DoorAlarmsPage;