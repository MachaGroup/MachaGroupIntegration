import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

// Define questions array outside the component
const lockdownCommunicationQuestions = [
    // Adapted from text input
    { name: "dedicatedSystemsExist", label: "Are dedicated communication systems established to alert authorities/personnel during lockdowns?" },
    { name: "variousChannels", label: "Do these systems include appropriate channels (e.g., silent alarms, intercoms, mobile alerts)?" }, // Simplified label
    { name: "systemsTestedRegularly", label: "Are communication systems tested regularly to ensure function and reliability?" }, // Simplified label
    { name: "silentAlarmsInstalled", label: "Are silent alarm systems installed throughout the premises?" }, // Simplified label
    { name: "silentAlarmsActivateDiscreetly", label: "Do silent alarms activate without audible alerts to avoid escalating situations?" }, // Simplified label
    // Adapted from text input
    { name: "personnelTrainedOnSilentAlarms", label: "Are designated personnel trained to recognize and respond promptly to silent alarm activations?" },
    // Adapted from text input
    { name: "activationProtocolsExist", label: "Are established protocols defined for activating silent alarms in different scenarios (e.g., intruder, medical)?" },
    { name: "staffTrainedOnActivation", label: "Are staff members trained on when and how to activate silent alarms and follow response procedures?" }, // Simplified label
    // Adapted from text input
    { name: "centralizedMonitoringExists", label: "Is a centralized monitoring system established to receive/respond to silent alarm activations?" },
    { name: "personnelAssignedMonitoring", label: "Are designated personnel or security teams tasked with monitoring silent alarms and coordinating response?" }, // Simplified label
    { name: "verificationEscalationProcess", label: "Is there a process for verifying alarm activations and escalating responses as needed?" }, // Simplified label
    { name: "silentAlarmsIntegrated", label: "Are silent alarms integrated into the overall emergency response plan?" }, // Simplified label
    { name: "alarmsTriggerResponse", label: "Do alarm activations trigger appropriate response actions (e.g., lockdown, notifications)?" }, // Simplified label
    { name: "coordinationWithSecurity", label: "Is there coordination between silent alarms and other security measures for a comprehensive response?" }, // Simplified label
    { name: "staffOccupantTraining", label: "Are staff/occupants trained on the purpose and function of silent alarms?" }, // Simplified label
    { name: "trainingIncludesScenarios", label: "Do training programs include scenarios/simulations for activating and responding to alarms?" }, // Simplified label
    { name: "drillsEvaluateEffectiveness", label: "Are regular drills conducted to evaluate the effectiveness of silent alarm systems/procedures?" }, // Simplified label
    { name: "activationRecordsMaintained", label: "Are records maintained for all silent alarm activations (date, time, location, response)?" }, // Simplified label
    { name: "recordsReviewed", label: "Are activation records reviewed regularly to identify trends and areas for improvement?" }, // Simplified label
    { name: "deficienciesAddressed", label: "Are deficiencies identified during testing/drills addressed promptly with corrective actions?" }, // Simplified label
];

function LockdownCommunicationProtocolsFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    // Correct httpsCallable definition
    const uploadLockdownCommunicationProtocolsImage = httpsCallable(functions, 'uploadLockdownCommunicationProtocolsImage');

    // State variables look good
    const [formData, setFormData] = useState({});
    const [imageData, setImageData] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);

    // useEffect fetching data from the CORRECT path
    useEffect(() => {
        if (!buildingId) {
            alert('No building selected. Redirecting to Building Info...');
            navigate('/BuildingandAddress'); // Ensure path is correct
            return;
        }

        const fetchFormData = async () => {
            setLoading(true);
            setLoadError(null);
            // Correct Firestore path
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Lockdown Communication Protocols', buildingId);

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

    // handleChange saves data immediately to the CORRECT path with CORRECT structure
    const handleChange = async (e) => {
        const { name, value } = e.target;
        const newFormData = { ...formData, [name]: value };
        setFormData(newFormData);

        if (buildingId) {
            try {
                const buildingRef = doc(db, 'Buildings', buildingId);
                // Correct Firestore path
                const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Lockdown Communication Protocols', buildingId);
                const dataToSave = {
                     ...newFormData,
                     building: buildingRef,
                     ...(imageUrl && { imageUrl: imageUrl })
                 };
                await setDoc(formDocRef, { formData: dataToSave }, { merge: true });
                // console.log("Form data updated:", dataToSave);
            } catch (error) {
                console.error("Error saving form data to Firestore:", error);
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
                 setImageUrl(null);
                 setImageUploadError(null);
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

    // handleSubmit uses Cloud Function and setDoc on CORRECT path with CORRECT structure
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
                // Use correct function variable name
                const uploadResult = await uploadLockdownCommunicationProtocolsImage({
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
             imageUrl: finalImageUrl,
        };
        setFormData(finalFormData);

        try {
            console.log("Saving final form data to Firestore...");
            const buildingRef = doc(db, 'Buildings', buildingId);
             // Correct Firestore path
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Lockdown Communication Protocols', buildingId);
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

    // Loading/Error Display - Looks good
    if (loading) {
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
                <h1>Lockdown Communication Protocols Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Lockdown Communication Protocols Assessment Questions</h2>

                    {/* Single .map call for all questions with standardized rendering */}
                    {lockdownCommunicationQuestions.map((question, index) => (
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

                    {/* Image upload section - Looks good */}
                    <div className="form-section">
                         <label htmlFor="imageUploadLockdownComm">Upload Image (Optional):</label>
                         <input id="imageUploadLockdownComm" type="file" onChange={handleImageChange} accept="image/*" />
                         {imageUrl && !imageData && <img src={imageUrl} alt="Uploaded Lockdown Comm related" style={{ maxWidth: '200px', marginTop: '10px' }} />}
                         {imageData && <img src={imageData} alt="Preview Lockdown Comm related" style={{ maxWidth: '200px', marginTop: '10px' }} />}
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

export default LockdownCommunicationProtocolsFormPage;