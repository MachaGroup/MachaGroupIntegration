import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
// Corrected Firestore imports
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
// Added Functions imports
import { getFunctions, httpsCallable } from "firebase/functions";
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import Navbar from "./Navbar";

// Define questions array outside the component
const parentCommIntegrationQuestions = [
    // Corrected names to camelCase
    // Adapted from text input
    { name: "integratingMechanismExists", label: "Is a mechanism in place to integrate alerts with parent communication systems?" },
    // Adapted from text input
    { name: "connectionProtocolsEstablished", label: "Are established protocols/interfaces defined for connecting alerting systems with parent platforms?" },
    { name: "automaticNotificationConfigurations", label: "Are automatic notification configurations set up for including parent contacts?" }, // Simplified
    // Adapted from text input
    { name: "syncProceduresEstablished", label: "Are procedures established for syncing/updating parent contact details between systems?" },
    { name: "optInOptOutMechanisms", label: "Are mechanisms in place for parents to opt-in/opt-out of alerts?" }, // Simplified
    // Adapted from text input
    { name: "consentProcessExists", label: "Is there a process for obtaining parental consent for emergency notifications?" },
    { name: "implementingSafeguardMeasures", label: "Are appropriate measures implemented to safeguard parent contact information?" }, // Simplified
    { name: "integrationMechanismsCompliant", label: "Do integration mechanisms comply with relevant privacy regulations/policies?" }, // Simplified - Renamed 'integrationMechanisms'
    // Adapted from text input
    { name: "coordinationProtocolsEstablished", label: "Are communication protocols established for coordination with parents during emergencies?" },
    // Adapted from text input
    { name: "parentCommunicationChannelDefined", label: "Is there a designated method/channel for communicating updates/addressing concerns with parents?" },
    { name: "informingParentsIntegration", label: "Are parents informed about the integration and notification procedures?" }, // Simplified
    { name: "helpingParentsResources", label: "Are resources provided to help parents manage preferences/contact info?" }, // Simplified
    // Adapted from text input
    { name: "feedbackMechanismsExist", label: "Are feedback mechanisms in place to solicit parent input on alert effectiveness?" },
    { name: "evaluatingParentFeedback", label: "Is parent feedback used to evaluate and improve the integrated system?" }, // Simplified
    { name: "testingIntegrationMechanisms", label: "Are integration mechanisms tested periodically for accuracy/reliability?" }, // Simplified
    { name: "testingScenarios", label: "Are test scenarios conducted to assess the reliability of the integrated system?" } // Simplified
];


function IntegrationWithParentCommunicationFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    // Define httpsCallable function matching component name
    const uploadIntegrationWithParentCommunicationImage = httpsCallable(functions, 'uploadIntegrationWithParentCommunicationImage');

    // Corrected state variables
    const [formData, setFormData] = useState({});
    const [imageData, setImageData] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(null); // Added loadError

    // useEffect using getDoc by ID with CORRECT path
    useEffect(() => {
        if (!buildingId) {
            alert('No building selected. Redirecting to Building Info...');
            navigate('/BuildingandAddress');
            return;
        }

        const fetchFormData = async () => {
            setLoading(true);
            setLoadError(null);
            // Correct Firestore path for this component
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Integration with Parent Communication', buildingId);

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

    // handleChange saves immediately using setDoc by ID with correct structure
    const handleChange = async (e) => {
        const { name, value } = e.target;
        const newFormData = { ...formData, [name]: value };
        setFormData(newFormData);

        if (buildingId) {
            try {
                const buildingRef = doc(db, 'Buildings', buildingId);
                 // Correct Firestore path
                const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Integration with Parent Communication', buildingId);
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

    // handleImageChange using base64
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

    // handleBack simplified
    const handleBack = () => {
        navigate(-1);
    };

    // handleSubmit uses Cloud Function and setDoc by ID with correct structure
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
                const uploadResult = await uploadIntegrationWithParentCommunicationImage({
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
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Integration with Parent Communication', buildingId);
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
                <h1>Integration with Parent Communication Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                     <h2>Parent Communication Integration Questions</h2> {/* Added main heading */}

                    {/* Single .map call for all questions with standardized rendering */}
                    {parentCommIntegrationQuestions.map((question, index) => (
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
                         <label htmlFor="imageUploadParentComm">Upload Image (Optional):</label>
                         <input id="imageUploadParentComm" type="file" onChange={handleImageChange} accept="image/*" />
                         {imageUrl && !imageData && <img src={imageUrl} alt="Uploaded Parent Comm. Integration related" style={{ maxWidth: '200px', marginTop: '10px' }} />}
                         {imageData && <img src={imageData} alt="Preview Parent Comm. Integration related" style={{ maxWidth: '200px', marginTop: '10px' }} />}
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

export default IntegrationWithParentCommunicationFormPage;