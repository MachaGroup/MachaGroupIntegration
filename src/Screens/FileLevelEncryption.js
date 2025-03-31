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

function FileLevelEncryptionPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions(); // Initialize Firebase Functions
    // Define callable function with the requested naming convention
    const uploadImage = httpsCallable(functions, 'uploadFileLevelEncryptionImage');

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
            const formDocRef = doc(db, 'forms', 'Cybersecurity', 'File Level Encryption', buildingId);

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
        const newFormData = { ...formData, [name]: value };
        setFormData(newFormData);

        if (!buildingId) {
            console.error("Building ID is missing, cannot save data.");
            return;
        }

        try {
            // Correct Firestore document path
            const formDocRef = doc(db, 'forms', 'Cybersecurity', 'File Level Encryption', buildingId);
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

        const finalFormData = { ...formData, imageUrl: finalImageUrl };

        try {
            // Correct Firestore document path
            const formDocRef = doc(db, 'forms', 'Cybersecurity', 'File Level Encryption', buildingId);
            const buildingRef = doc(db, 'Buildings', buildingId);
            // Save final data using setDoc with merge: true
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

    // Define questions, distinguishing between radio and text types
    // Using 'text' type for original textarea fields, rendered as input type="text"
    const questions = [
        // Implementation and Coverage
        { name: "fileEncryptionImplementation", label: "How is file-level encryption implemented for sensitive files and folders, and are specific policies defined for which files require encryption?", type: "text" },
        { name: "encryptionConsistency", label: "Are there procedures in place to ensure that file-level encryption is consistently applied across all relevant types of data and across various storage locations (e.g., local drives, cloud storage)?", type: "radio" },
        { name: "encryptionTools", label: "What tools or software are used for file-level encryption, and how are they integrated into existing workflows?", type: "text" },
        // Encryption Standards and Configuration
        { name: "encryptionStandards", label: "What encryption standards are used for file-level encryption (e.g., AES-256), and do they meet industry best practices and regulatory requirements?", type: "text" },
        { name: "encryptionSettings", label: "How are encryption settings configured, and are there guidelines for determining the level of encryption required based on the sensitivity of the data?", type: "text" },
        { name: "keyManagement", label: "Are encryption keys managed securely, and how are they distributed and protected to prevent unauthorized access?", type: "text" },
        // Access Controls and Permissions
        { name: "accessControls", label: "How are access controls managed for encrypted files and folders, and what authentication mechanisms are in place to ensure only authorized users can access encrypted data?", type: "text" },
        { name: "permissionsReview", label: "Are permissions regularly reviewed and updated to reflect changes in user roles or employment status?", type: "radio" },
        { name: "sharedAccessControl", label: "How is encryption access controlled in shared environments, such as collaborative workspaces or cloud storage, where multiple users may need access?", type: "text" },
        // Compliance and Monitoring
        { name: "complianceMonitoring", label: "How is compliance with file-level encryption policies monitored and enforced within the organization?", type: "text" },
        { name: "auditsRegular", label: "Are there regular audits or checks to ensure that file-level encryption is applied consistently and that no sensitive files are left unencrypted?", type: "radio" },
        { name: "detectionMechanisms", label: "What mechanisms are in place for detecting and addressing any unauthorized access or encryption failures?", type: "text" },
        // Recovery and Management
        { name: "recoveryProcedures", label: "What procedures are in place for recovering encrypted files in the event of data loss or corruption, and how is data recovery managed while maintaining encryption?", type: "text" },
        { name: "keyManagementStrategies", label: "How are encryption keys and passwords managed for file-level encryption, and what steps are taken to ensure they are protected against loss or compromise?", type: "text" },
        { name: "contingencyPlans", label: "Are there contingency plans for handling situations where files need to be decrypted, such as during legal investigations or audits, and how is data security maintained during these processes?", type: "text" }
    ];

    return (
        <div> {/* Outer wrapper div */}
            <div className="form-page">
                <header className="header">
                    <Navbar />
                    <button className="back-button" onClick={handleBack}>←</button>
                    <h1>File-Level Encryption Assessment</h1>
                    <img src={logo} alt="Logo" className="logo" />
                </header>

                <main className="form-container">
                    <form onSubmit={handleSubmit}>
                        {/* Section titles can be adjusted or removed if redundant */}
                        {/* <h2>File-Level Encryption Details</h2> */}

                        {questions.map((question, index) => (
                            <div key={index} className="form-section">
                                <label htmlFor={question.name}>{question.label}</label> {/* Added htmlFor */}

                                {question.type === "radio" ? (
                                    // Render Yes/No radio buttons + comment input
                                    <>
                                        <div>
                                            <input
                                                type="radio"
                                                id={`${question.name}_yes`}
                                                name={question.name}
                                                value="yes" // Standardize value to 'yes'/'no'
                                                checked={formData[question.name] === "yes"}
                                                onChange={handleChange}
                                            />
                                            <label htmlFor={`${question.name}_yes`}> Yes</label>

                                            <input
                                                type="radio"
                                                id={`${question.name}_no`}
                                                name={question.name}
                                                value="no" // Standardize value to 'yes'/'no'
                                                checked={formData[question.name] === "no"}
                                                onChange={handleChange}
                                            />
                                             <label htmlFor={`${question.name}_no`}> No</label>
                                        </div>
                                        <input
                                            type="text"
                                            id={`${question.name}Comment`} // Add id
                                            name={`${question.name}Comment`}
                                            placeholder="Additional comments (Optional)"
                                            value={formData[`${question.name}Comment`] || ''}
                                            onChange={handleChange}
                                            className='comment-box' // Keep className if needed
                                        />
                                    </>
                                ) : (
                                    // Render single text input for text-based questions
                                    <input
                                        type="text" // Changed from textarea
                                        id={question.name} // Add id matching label's htmlFor
                                        name={question.name}
                                        value={formData[question.name] || ''}
                                        onChange={handleChange}
                                        placeholder="Enter details here" // Generic placeholder
                                        className='comment-box' // Reuse class or use a different one
                                    />
                                )}
                            </div>
                        ))}

                        {/* File Input for Image Upload */}
                        <div className="form-section">
                            <label>Upload Image (Optional):</label>
                             <input type="file" onChange={handleImageChange} accept="image/*" />
                             {imageUrl && <img src={imageUrl} alt="Uploaded File Encryption Context" style={{ maxWidth: '200px', marginTop: '10px' }}/>}
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

export default FileLevelEncryptionPage;