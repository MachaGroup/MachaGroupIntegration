import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

// Define questions array outside the component
const evacuationQuestions = [
    // Evacuation Routes and Procedures
    { name: "definedEvacuationRoutes", label: "Are there clearly defined evacuation routes posted throughout the premises, indicating primary and secondary exit paths?" },
    // Adapted from text input
    { name: "proceduresEstablishedForScenarios", label: "Have specific evacuation procedures been established for different scenarios (e.g., fire, bomb threat, natural disaster)?" },
    { name: "staffTrainedOnProcedures", label: "Are staff members trained on evacuation procedures and their roles during evacuations?" },
    // Assembly Points
    { name: "designatedAssemblyPoints", label: "Have designated assembly points been identified outside the building where occupants should gather after evacuating?" },
    { name: "assemblyPointSafety", label: "Are assembly points located at safe distances from the building and away from potential hazards?" },
    { name: "assemblyPointSpace", label: "Do assembly points provide adequate space for occupants to gather?" }, // Simplified label
    // Communication and Alert Systems
    { name: "effectiveAlertSystem", label: "Is there an effective communication system in place to alert occupants of the need to evacuate?" },
    { name: "alertingDevicesInstalled", label: "Are fire alarms, strobe lights, or other alerting devices installed and regularly tested?" }, // Simplified label
    // Adapted from text input
    { name: "broadcastingMechanismExists", label: "Is a mechanism available for broadcasting instructions/updates to all occupants (incl. disabilities/language barriers)?" },
    // Evacuation Procedures for Special Needs
    { name: "disabilityProcedures", label: "Are there specific procedures in place to assist occupants with disabilities or special needs during evacuations?" },
    { name: "disabilityAssistanceTraining", label: "Are staff members trained to provide assistance to individuals requiring additional support?" }, // Simplified label
    { name: "disabilityAccessibility", label: "Are evacuation routes and assembly points accessible to individuals with mobility impairments or other disabilities?" },
    // Accountability
    // Adapted from text input
    { name: "accountabilitySystemExists", label: "Is a system (e.g., head count, check-in) in place to account for occupants post-evacuation?" },
     // Adapted from text input
    { name: "accountabilityCheckersAssigned", label: "Are designated individuals (e.g., floor wardens) assigned accountability check roles?" },
    { name: "buildingReentryProcedure", label: "Are clear procedures in place for re-entry into the building after it's deemed safe?" }, // Clarified label
    // Training and Drills
    { name: "regularEvacuationDrills", label: "Are regular evacuation drills conducted to familiarize occupants with procedures and routes?" },
    { name: "differentScenarioDrills", label: "Are drills tailored to address different scenarios and challenges?" }, // Simplified label
    { name: "drillsFeedbackUsed", label: "Are feedback and lessons learned from drills used to improve procedures?" }, // Simplified label
    // Review and Updates
    { name: "proceduresReviewedRegularly", label: "Are evacuation procedures regularly reviewed and updated based on changes (layout, occupancy, protocols)?" }, // Simplified label
    { name: "inputSolicited", label: "Is input from occupants, responders, and stakeholders solicited for improvements?" }, // Simplified label
    { name: "updateCommunicationEffective", label: "Are updates communicated effectively to all occupants and staff?" }, // Simplified label
];


function EvacuationProceduresFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    // Renamed variable for clarity, matches function name string
    const uploadEvacuationProceduresFormImage = httpsCallable(functions, 'uploadEvacuationProceduresFormImage');

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
            navigate('/BuildingandAddress'); // Ensure path is correct
            return;
        }

        const fetchFormData = async () => {
            setLoading(true);
            setLoadError(null);
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Evacuation Procedures', buildingId);

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

    // handleChange saves data immediately, including buildingRef and imageUrl
    const handleChange = async (e) => {
        const { name, value } = e.target;
        const newFormData = { ...formData, [name]: value };
        setFormData(newFormData);

        if (buildingId) {
            try {
                const buildingRef = doc(db, 'Buildings', buildingId);
                const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Evacuation Procedures', buildingId);
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

    // handleSubmit uses Cloud Function and setDoc - Corrected save structure
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
                // Use the correctly named function variable
                const uploadResult = await uploadEvacuationProceduresFormImage({
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
        setFormData(finalFormData); // Update state to final version

        try {
            console.log("Saving final form data to Firestore...");
            const buildingRef = doc(db, 'Buildings', buildingId);
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Evacuation Procedures', buildingId);
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
        // Removed extra outer div from original if present
        <div className="form-page">
            <header className="header">
                <Navbar />
                <button className="back-button" onClick={handleBack}>←</button>
                <h1>Evacuation Procedures Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Evacuation Procedures Assessment Questions</h2>

                    {/* Single .map call for all questions with standardized rendering */}
                    {evacuationQuestions.map((question, index) => (
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
                            {/* Use input type="text" for comments with correct name */}
                            <input
                                className='comment-input'
                                type="text"
                                name={`${question.name}Comment`} // Corrected name format
                                placeholder="Additional comments"
                                value={formData[`${question.name}Comment`] || ''}
                                onChange={handleChange}
                            />
                        </div>
                    ))}

                    {/* Image upload section - Looks good */}
                    <div className="form-section">
                        <label htmlFor="imageUploadEvacuation">Upload Image (Optional):</label>
                        <input id="imageUploadEvacuation" type="file" onChange={handleImageChange} accept="image/*" />
                        {imageUrl && !imageData && <img src={imageUrl} alt="Uploaded Evacuation related" style={{ maxWidth: '200px', marginTop: '10px' }} />}
                        {imageData && <img src={imageData} alt="Preview Evacuation related" style={{ maxWidth: '200px', marginTop: '10px' }} />}
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

export default EvacuationProceduresFormPage;