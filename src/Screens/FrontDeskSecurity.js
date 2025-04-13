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
const frontDeskQuestions = [
    // Visitor Registration and Verification
    { name: "visitorLog", label: "Do front desk personnel maintain a visitor log/system?" }, // Simplified
    { name: "visitorIdSignIn", label: "Are visitors required to provide ID and sign in?" }, // Simplified
    { name: "verifyCredentials", label: "Is there a process for verifying visitor credentials and purpose?" }, // Simplified
    // Access Control
    { name: "enforceAccessControl", label: "Do personnel enforce access control policies for authorized individuals/visitors?" }, // Simplified
    { name: "challengeIndividuals", label: "Are they trained to challenge individuals without proper ID/authorization?" },
    { name: "visitorBadges", label: "Are temporary visitor badges/passes provided and used?" }, // Simplified
    // Screening and Security Checks
    { name: "screeningProcedures", label: "Are screening procedures (bag checks, metal detection) conducted if required?" }, // Simplified
    { name: "securityThreatProtocols", label: "Are protocols in place to identify/address prohibited items or threats?" },
    { name: "professionalChecks", label: "Are checks conducted professionally and non-intrusively?" }, // Simplified
    // Visitor Assistance and Customer Service
    { name: "visitorAssistance", label: "Are personnel trained to provide assistance and guidance to visitors?" },
    { name: "professionalGreeting", label: "Do they greet visitors professionally while maintaining security awareness?" },
    { name: "visitorInquiries", label: "Are personnel responsive to visitor inquiries and requests?" }, // Simplified
    // Emergency Response Preparedness
    { name: "emergencyResponseTraining", label: "Are personnel trained for effective emergency response (security, medical, fire)?" }, // Simplified
    { name: "emergencyProcedures", label: "Do they know emergency procedures, evacuation routes, and how to contact services?" }, // Simplified
    { name: "emergencyEquipment", label: "Are personnel equipped with necessary communication/emergency equipment?" }, // Simplified
    // Communication and Coordination
    { name: "communicationBetweenPersonnel", label: "Is there effective communication between front desk, other security, and staff?" },
    { name: "coordinationTraining", label: "Are personnel trained to coordinate with response teams and agencies?" }, // Simplified
    { name: "centralizedCommunication", label: "Is there a centralized system/protocol for relaying information?" }, // Simplified
    // Documentation and Reporting
    { name: "visitorRecords", label: "Are records of visitor activity and security incidents maintained?" }, // Simplified
    { name: "reportingProcess", label: "Is there a standardized reporting process for incidents/issues?" }, // Simplified
    { name: "reportReview", label: "Are reports reviewed regularly by management for trends/risks?" } // Simplified
];

function FrontDeskSecurityPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    // Renamed variable for clarity
    const uploadFrontDeskSecurityImage = httpsCallable(functions, 'uploadFrontDeskSecurityImage');

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
             // Using current date in alert as per guideline example
            alert(`No building selected (as of ${new Date().toLocaleDateString()}). Redirecting to Building Info...`);
            navigate('/BuildingandAddress');
            return;
        }

        const fetchFormData = async () => {
            setLoading(true);
            setLoadError(null);
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Front Desk Security', buildingId);

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
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Front Desk Security', buildingId);
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
                const uploadResult = await uploadFrontDeskSecurityImage({
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
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Front Desk Security', buildingId);
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
                <h1>Front Desk Security Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Front Desk Security Questions</h2> {/* Added main heading */}
                    {/* Render questions dynamically using single map */}
                    {frontDeskQuestions.map((question, index) => (
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
                         <label htmlFor="imageUploadFrontDesk">Upload Image (Optional):</label>
                         <input id="imageUploadFrontDesk" type="file" onChange={handleImageChange} accept="image/*" />
                         {imageUrl && !imageData && <img src={imageUrl} alt="Uploaded Front Desk Context" style={{ maxWidth: '200px', marginTop: '10px' }}/>}
                         {imageData && <img src={imageData} alt="Preview Front Desk Context" style={{ maxWidth: '200px', marginTop: '10px' }}/>}
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

export default FrontDeskSecurityPage;