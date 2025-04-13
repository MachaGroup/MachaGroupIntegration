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
const backupPowerQuestions = [
    // Corrected names to camelCase
    // Adapted from text input
    { name: "backupPowerSystemInstalled", label: "Is a backup power system (e.g., UPS) installed for the PA system?" },
    // Adapted from text input
    { name: "capacitySufficient", label: "Is the capacity of the backup power system sufficient for PA operation?" },
    // Adapted from text input (fixed name)
    { name: "backupSystemDurationSufficient", label: "Can the backup power sustain the PA system for a sufficient duration?" },
    { name: "uninterruptedTransitions", label: "Is the system seamlessly integrated for uninterrupted transitions?" }, // Simplified
    { name: "automaticSwitchoverMechanisms", label: "Are automatic switchover mechanisms in place?" }, // Simplified
    { name: "regularTests", label: "Is the backup system regularly tested for functionality/performance?" }, // Simplified
    { name: "routineMaintenanceActivities", label: "Are routine maintenance activities conducted for reliability?" }, // Simplified
    // Adapted from text input
    { name: "redundancyImplemented", label: "Are redundant backup systems or multiple layers implemented?" },
    { name: "withstandingExternalThreats", label: "Is the backup system designed to withstand environmental factors/threats?" },
    { name: "notifiedAdministrators", label: "Are administrators/operators notified upon backup activation or issues?" }, // Simplified
    { name: "capableRemoteMonitoring", label: "Is remote monitoring capability available for status/alerts?" }, // Simplified
    { name: "backupSystemIncludedInPlans", label: "Are backup systems included in emergency plans/protocols?" }, // Simplified
    { name: "trainedStaffMembers", label: "Are staff trained on backup system use and related incident protocols?" }, // Simplified
    { name: "maintainingRecords", label: "Are records maintained for installation, testing, maintenance, and performance?" },
    { name: "accessibleRecords", label: "Are records accessible for review, audit, and reporting?" },
];


function BackupPowerSystemsFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
     // Renamed variable for clarity
    const uploadBackupPowerSystemsImage = httpsCallable(functions, 'uploadBackupPowerSystemsImage');

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
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Backup Power Systems', buildingId);

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

    // handleChange saves data immediately with correct structure
    const handleChange = async (e) => {
        const { name, value } = e.target;
        const newFormData = { ...formData, [name]: value };
        setFormData(newFormData);

        if (buildingId) {
            try {
                const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Backup Power Systems', buildingId);
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

    // handleSubmit uses Cloud Function and setDoc with correct structure
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
                const uploadResult = await uploadBackupPowerSystemsImage({
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
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Backup Power Systems', buildingId);
            const buildingRef = doc(db, 'Buildings', buildingId);
             // Save final data with correct structure, including building ref
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
        // Removed outer div if present
        <div className="form-page">
            <header className="header">
                <Navbar />
                <button className="back-button" onClick={handleBack}>←</button>
                <h1>Backup Power Systems Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                     <h2>Backup Power Questions</h2> {/* Added main heading */}

                    {/* Single .map call for all questions with standardized rendering */}
                    {backupPowerQuestions.map((question, index) => (
                        <div key={question.name} className="form-section"> {/* Use name for key */}
                            <label>{question.label}</label>
                            {/* Div for radio buttons */}
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
                            {/* Input for comments */}
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
                         <label htmlFor="imageUploadBackupPower">Upload Image (Optional):</label>
                         <input id="imageUploadBackupPower" type="file" onChange={handleImageChange} accept="image/*" />
                         {imageUrl && !imageData && <img src={imageUrl} alt="Uploaded Backup Power System" style={{ maxWidth: '200px', marginTop: '10px' }} />}
                         {imageData && <img src={imageData} alt="Preview Backup Power System" style={{ maxWidth: '200px', marginTop: '10px' }} />}
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

export default BackupPowerSystemsFormPage;