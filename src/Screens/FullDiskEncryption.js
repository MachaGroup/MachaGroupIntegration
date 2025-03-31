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

function FullDiskEncryptionPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions(); // Initialize Firebase Functions
    // Define callable function with the requested naming convention
    const uploadImage = httpsCallable(functions, 'uploadFullDiskEncryptionImage');

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
            const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Full Disk Encryption', buildingId);

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
        const standardizedValue = (value === 'Yes' || value === 'No') ? value.toLowerCase() : value;
        const newFormData = { ...formData, [name]: standardizedValue };
        setFormData(newFormData);

        if (!buildingId) {
            console.error("Building ID is missing, cannot save data.");
            return;
        }

        try {
            // Correct Firestore document path
             const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Full Disk Encryption', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Full Disk Encryption', buildingId);
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

    // Define questions with standardized names and types
    const questions = [
        // Implementation and Coverage
        { name: "fullDiskEncryptionEnabled", label: "Is full disk encryption enabled on all company-issued devices, including laptops and desktops, without exceptions?", type: "radio" },
        { name: "encryptionCoverage", label: "How is encryption applied to ensure that it covers all types of data, including the operating system, applications, and user files?", type: "text" },
        { name: "autoEnableEncryption", label: "What procedures are in place to ensure that encryption is automatically enabled on newly issued or re-imaged devices?", type: "text" },
        // Encryption Standards and Configuration
        { name: "encryptionStandards", label: "What encryption standards are used (e.g., AES-256), and do they comply with industry best practices and regulatory requirements?", type: "text" },
        { name: "encryptionSettings", label: "Are the encryption settings configured to balance security and performance, and are there specific configurations for different types of data or device usage?", type: "text" },
        { name: "keyManagement", label: "How are encryption keys managed, and what methods are used to ensure they are securely stored and protected?", type: "text" },
        // User Access and Management
        { name: "userAccessManagement", label: "How is user access to encrypted devices managed, and what authentication methods are required to unlock the devices (e.g., passwords, biometrics)?", type: "text" },
        { name: "userTraining", label: "Are users trained on the importance of full disk encryption and how to handle their credentials securely?", type: "radio" },
        { name: "forgottenPasswordProcedures", label: "What procedures are in place for managing encryption in cases where users forget their passwords or lose access to their accounts?", type: "text" },
        // Compliance and Monitoring
        { name: "encryptionComplianceMonitoring", label: "How is compliance with full disk encryption policies monitored and enforced across the organization?", type: "text" },
        { name: "regularAudits", label: "Are there regular audits or checks to ensure that encryption is functioning correctly on all devices and that no devices are left unencrypted?", type: "radio" },
        { name: "nonComplianceActions", label: "What steps are taken if a device is found to be non-compliant or if encryption fails to activate properly?", type: "text" },
        // Recovery and Contingency Planning
        { name: "recoveryProcedures", label: "What recovery procedures are in place for encrypted devices in the event of hardware failure, loss, or theft?", type: "text" },
        { name: "dataRecovery", label: "How does the organization handle data recovery in cases where encryption might prevent access to critical information?", type: "text" },
        { name: "contingencyPlans", label: "Are there contingency plans to ensure that data on decommissioned or repurposed devices is securely wiped and no longer accessible?", type: "text" }
    ];


    return (
        <div> {/* Outer wrapper div */}
            <div className="form-page">
                <header className="header">
                    <Navbar />
                    <button className="back-button" onClick={handleBack}>←</button>
                    <h1>Full Disk Encryption Assessment</h1>
                    <img src={logo} alt="Logo" className="logo" />
                </header>

                <main className="form-container">
                    <form onSubmit={handleSubmit}>
                        {/* Render questions dynamically */}
                        {questions.map((question, index) => (
                             <div key={index} className="form-section">
                                {/* Conditionally render section titles */}
                                {index === 0 && <h2>4.2.1.1.1.1 Implementation and Coverage:</h2>}
                                {index === 3 && <h2>4.2.1.1.1.2 Encryption Standards and Configuration:</h2>}
                                {index === 6 && <h2>4.2.1.1.1.3 User Access and Management:</h2>}
                                {index === 9 && <h2>4.2.1.1.1.4 Compliance and Monitoring:</h2>}
                                {index === 12 && <h2>4.2.1.1.1.5 Recovery and Contingency Planning:</h2>}

                                <label htmlFor={question.name}>{question.label}</label>

                                {question.type === "radio" ? (
                                    // Render Yes/No radio buttons + comment input
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
                                            id={`${question.name}Comment`}
                                            name={`${question.name}Comment`}
                                            placeholder="Additional comments (Optional)"
                                            value={formData[`${question.name}Comment`] || ''}
                                            onChange={handleChange}
                                            className='comment-box'
                                        />
                                    </>
                                ) : (
                                    // Render single text input for text-based questions (changed from textarea)
                                    <input
                                        type="text"
                                        id={question.name}
                                        name={question.name}
                                        value={formData[question.name] || ''}
                                        onChange={handleChange}
                                        placeholder="Enter details here"
                                        className='comment-box' // Reusing class, adjust if needed
                                    />
                                )}
                            </div>
                        ))}

                        {/* File Input for Image Upload */}
                        <div className="form-section">
                            <label>Upload Image (Optional):</label>
                             <input type="file" onChange={handleImageChange} accept="image/*" />
                             {imageUrl && <img src={imageUrl} alt="Uploaded Encryption Context" style={{ maxWidth: '200px', marginTop: '10px' }}/>}
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

export default FullDiskEncryptionPage;