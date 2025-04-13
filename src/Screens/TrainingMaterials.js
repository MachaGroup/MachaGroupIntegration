import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
// Corrected Firestore imports
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
// Added Functions imports
import { getFunctions, httpsCallable } from "firebase/functions";
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import Navbar from "./Navbar";

// Define questions array outside the component
const trainingMaterialQuestions = [
    // Corrected names to camelCase
    { name: "materialsAvailability", label: "Are appropriate training materials (kits, AEDs, manikins) readily available?" }, // Simplified
    // Adapted from text input
    { name: "materialsStorageOrganized", label: "Are materials stored/organized for easy access during training?" },
    // Adapted from text input
    { name: "storageAreaDesignated", label: "Is there a designated, accessible storage area for materials?" },
    { name: "backupMaterials", label: "Are backup supplies maintained for essential materials?" }, // Simplified
    // Adapted from text input
    { name: "materialsCommunication", label: "Are participants informed about material location/availability?" },
    // Adapted from text input
    { name: "inspectionFrequencyAdequate", label: "Are materials inspected regularly for condition/safety compliance?" },
    { name: "maintenanceSchedule", label: "Is there a documented maintenance schedule for materials?" }, // Simplified
    // Adapted from text input
    { name: "issueResolutionProtocols", label: "Are protocols in place for promptly addressing issues found during inspections?" },
    { name: "maintenanceRecords", label: "Are maintenance/inspection records kept for materials?" }, // Simplified
    // Adapted from text input
    { name: "staffTrainedOnMaintenance", label: "Are staff trained on proper handling/maintenance of materials?" },
    { name: "materialsStocking", label: "Are materials regularly stocked with necessary supplies?" },
    // Adapted from text input
    { name: "inventoryManagementProcess", label: "Is there a process for managing inventory (replenishing expired/expended items)?" },
    { name: "stockMonitoring", label: "Are stock levels monitored (real-time or periodic audits)?" }, // Simplified
    // Adapted from text input
    { name: "replenishmentCriteria", label: "Are criteria/thresholds established for reordering materials?" },
    // Adapted from text input
    { name: "supplierSelectionProcess", label: "Is there a process for selecting suppliers (quality, delivery)?" },
    { name: "materialsQualitySuitability", label: "Are materials selected based on quality, durability, and suitability?" }, // Simplified - Renamed 'materialsQuality'
    // Adapted from text input
    { name: "procurementGuidelines", label: "Are guidelines/criteria used for selecting/procuring materials?" },
    { name: "participantFeedbackConsidered", label: "Is participant feedback considered when choosing materials?" }, // Simplified - Renamed 'participantFeedback'
    // Adapted from text input
    { name: "materialsEvaluationProcess", label: "Are materials evaluated for effectiveness/relevance?" },
    // Adapted from text input
    { name: "monitoringProcessForIssues", label: "Are mechanisms in place for monitoring/addressing concerns about materials?" },
    { name: "usageTraining", label: "Are participants trained on using materials effectively in exercises?" }, // Simplified
    // Adapted from text input
    { name: "materialsIntegrationEffective", label: "Are materials effectively integrated into sessions for hands-on learning?" },
    { name: "usabilityFeedbackConsidered", label: "Is participant feedback on usability used for improvements?" }, // Simplified - Renamed 'usabilityFeedback'
    // Adapted from text input
    { name: "storageHandlingDisposalProtocols", label: "Are guidelines/protocols established for safe storage, handling, and disposal?" },
    // Adapted from text input
    { name: "materialsCustomization", label: "Are materials adapted/customized for specific participant needs?" },
    { name: "materialsRecordsMaintained", label: "Are records kept for materials (purchase, maintenance, usage)?" }, // Simplified - Renamed 'materialsRecords'
    // Adapted from text input
    { name: "inventoryDocumentationAccessible", label: "Is inventory documented/updated and records accessible?" },
    // Adapted from text input
    { name: "trackingProceduresExist", label: "Are procedures in place for tracking material movement/usage?" },
    // Adapted from text input
    { name: "inventoryDiscrepanciesResolved", label: "Are inventory discrepancies identified and resolved?" },
     // Adapted from text input
    { name: "incidentProtocolsExist", label: "Are protocols established for documenting incidents involving materials?" },
    { name: "securityMeasures", label: "Are measures in place to secure materials against theft/loss/unauthorized access?" },
     // Adapted from text input
    { name: "securityProceduresDefined", label: "Are procedures defined for securing materials during non-training hours?" },
    { name: "accessControls", label: "Are access controls or restricted areas implemented?" }, // Simplified
    // Adapted from text input
    { name: "sensitiveMaterialsProtection", label: "Are sensitive/valuable materials protected (locks, surveillance)?" },
    { name: "staffSecurityTraining", label: "Are staff trained on security protocols for safeguarding materials?" }
];


function TrainingMaterialsFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    // Renamed variable for clarity
    const uploadTrainingMaterialsImage = httpsCallable(functions, 'uploadTrainingMaterialsImage');

    // State variables look good
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
            navigate('/BuildingandAddress');
            return;
        }

        const fetchFormData = async () => {
            setLoading(true);
            setLoadError(null);
             // Correct Firestore path
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Training Materials', buildingId);

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
                const buildingRef = doc(db, 'Buildings', buildingId);
                const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Training Materials', buildingId);
                const dataToSave = {
                     ...newFormData,
                     building: buildingRef,
                     ...(imageUrl && { imageUrl: imageUrl })
                 };
                await setDoc(formDocRef, { formData: dataToSave }, { merge: true });
                // console.log("Form data updated:", dataToSave);
            } catch (error) {
                console.error("Error saving form data to Firestore:", error);
                // Avoid alerting on every change
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
                const uploadResult = await uploadTrainingMaterialsImage({
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
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Training Materials', buildingId);
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
                <h1>Training Materials Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Training Material Questions</h2> {/* Added main heading */}

                    {/* Single .map call for all questions with standardized rendering */}
                    {trainingMaterialQuestions.map((question, index) => (
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
                        <label htmlFor="imageUploadTrainingMaterial">Upload Image (Optional):</label>
                        <input id="imageUploadTrainingMaterial" type="file" onChange={handleImageChange} accept="image/*" />
                        {imageUrl && !imageData && <img src={imageUrl} alt="Uploaded Training Material related" style={{ maxWidth: '200px', marginTop: '10px' }} />}
                        {imageData && <img src={imageData} alt="Preview Training Material related" style={{ maxWidth: '200px', marginTop: '10px' }} />}
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

export default TrainingMaterialsFormPage;