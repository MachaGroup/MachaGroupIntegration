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

function FrontDeskSecurityPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions(); // Initialize Firebase Functions
    // Define callable function with the requested naming convention
    const uploadImage = httpsCallable(functions, 'uploadFrontDeskSecurityImage');

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
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Front Desk Security', buildingId);

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
        const standardizedValue = (value === 'yes' || value === 'no') ? value : value;
        const newFormData = { ...formData, [name]: standardizedValue };
        setFormData(newFormData);

        if (!buildingId) {
            console.error("Building ID is missing, cannot save data.");
            return;
        }

        try {
            // Correct Firestore document path
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Front Desk Security', buildingId);
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
             const formDocRef = doc(db, 'forms', 'Physical Security', 'Front Desk Security', buildingId);
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

    // Define questions - all are radio type
    const questions = [
        // Visitor Registration and Verification
        { name: "visitorLog", label: "Do front desk security personnel maintain a visitor log or electronic system to record details of incoming visitors?", type: "radio" },
        { name: "visitorIdSignIn", label: "Are visitors required to provide identification and sign in before gaining access to the premises?", type: "radio" },
        { name: "verifyCredentials", label: "Is there a process for verifying visitor credentials and ensuring that they have legitimate reasons for entry?", type: "radio" },
        // Access Control
        { name: "enforceAccessControl", label: "Do front desk security personnel enforce access control policies to restrict entry to authorized individuals and visitors?", type: "radio" },
        { name: "challengeIndividuals", label: "Are they trained to challenge individuals without proper identification or authorization?", type: "radio" },
        { name: "visitorBadges", label: "Are visitors provided with temporary access badges or passes to indicate their authorized status while on the premises?", type: "radio" },
        // Screening and Security Checks
        { name: "screeningProcedures", label: "Do front desk security personnel conduct screening procedures, such as bag checks or metal detection, for incoming visitors?", type: "radio" },
        { name: "securityThreatProtocols", label: "Are there protocols in place to identify and address prohibited items or potential security threats brought by visitors?", type: "radio" },
        { name: "professionalChecks", label: "Are security checks conducted in a professional and non-intrusive manner to maintain a positive visitor experience?", type: "radio" },
        // Visitor Assistance and Customer Service
        { name: "visitorAssistance", label: "Are front desk security personnel trained to provide assistance and guidance to visitors, including directions, information, and support?", type: "radio" },
        { name: "professionalGreeting", label: "Do they greet visitors in a friendly and professional manner while maintaining security awareness?", type: "radio" },
        { name: "visitorInquiries", label: "Are security personnel responsive to visitor inquiries and requests for assistance?", type: "radio" },
        // Emergency Response Preparedness
        { name: "emergencyResponseTraining", label: "Are front desk security personnel trained to respond quickly and effectively to security incidents, medical emergencies, or other crises?", type: "radio" },
        { name: "emergencyProcedures", label: "Do they know emergency procedures, evacuation routes, and protocols for contacting emergency services?", type: "radio" },
        { name: "emergencyEquipment", label: "Are security personnel equipped with necessary communication devices or emergency response equipment?", type: "radio" },
        // Communication and Coordination
        { name: "communicationBetweenPersonnel", label: "Is there effective communication between front desk security personnel and other security personnel, as well as with management and staff?", type: "radio" },
        { name: "coordinationTraining", label: "Are security personnel trained to coordinate with response teams, law enforcement agencies, and emergency services during critical incidents?", type: "radio" },
        { name: "centralizedCommunication", label: "Is there a centralized communication system or protocol for relaying information and coordinating responses between front desk security personnel and other security stakeholders?", type: "radio" },
        // Documentation and Reporting
        { name: "visitorRecords", label: "Are front desk security personnel required to maintain records of visitor activity, security incidents, or other notable events?", type: "radio" },
        { name: "reportingProcess", label: "Is there a standardized reporting process for documenting security incidents, suspicious activities, or visitor-related issues?", type: "radio" },
        { name: "reportReview", label: "Are reports reviewed regularly by security management to identify trends, areas for improvement, or security risks related to visitor access?", type: "radio" }
    ];


    return (
        <div> {/* Outer wrapper div */}
            <div className="form-page">
                <header className="header">
                    <Navbar />
                    <button className="back-button" onClick={handleBack}>←</button>
                    <h1>Front Desk Security Assessment</h1>
                    <img src={logo} alt="Logo" className="logo" />
                </header>

                <main className="form-container">
                    <form onSubmit={handleSubmit}>
                        {/* Render questions dynamically */}
                        {questions.map((question, index) => (
                            <div key={index} className="form-section">
                                {/* Conditionally render section titles */}
                                {index === 0 && <h2>Visitor Registration and Verification:</h2>}
                                {index === 3 && <h2>Access Control:</h2>}
                                {index === 6 && <h2>Screening and Security Checks:</h2>}
                                {index === 9 && <h2>Visitor Assistance and Customer Service:</h2>}
                                {index === 12 && <h2>Emergency Response Preparedness:</h2>}
                                {index === 15 && <h2>Communication and Coordination:</h2>}
                                {index === 18 && <h2>Documentation and Reporting:</h2>}

                                <label htmlFor={question.name}>{question.label}</label>

                                {/* Render Yes/No radio buttons + comment input for all questions */}
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
                                        id={`${question.name}Comment`} // Standard comment name
                                        name={`${question.name}Comment`} // Standard comment name
                                        placeholder="Additional comments (Optional)"
                                        value={formData[`${question.name}Comment`] || ''}
                                        onChange={handleChange}
                                        className='comment-box'
                                    />
                                </>
                            </div>
                        ))}

                        {/* File Input for Image Upload */}
                        <div className="form-section">
                            <label>Upload Image (Optional):</label>
                             <input type="file" onChange={handleImageChange} accept="image/*" />
                             {imageUrl && <img src={imageUrl} alt="Uploaded Front Desk Context" style={{ maxWidth: '200px', marginTop: '10px' }}/>}
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

export default FrontDeskSecurityPage;