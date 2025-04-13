import React, { useState, useEffect } from 'react';
// Updated Firestore imports to match securitygates pattern (getDoc, setDoc)
import { getFirestore, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
// Removed unused Storage imports
import { getFunctions, httpsCallable } from "firebase/functions";

// Renamed component to match filename convention if needed, kept original for consistency
function DocumentationOfPolicyChangesPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    // Updated httpsCallable variable name and function name string
    const uploadImage = httpsCallable(functions, 'uploadDocumentationOfPolicyChangesPageImage');

    const [formData, setFormData] = useState({});
    // Adapted image state to match securitygates
    const [imageData, setImageData] = useState(null);
    const [imageUrl, setImageUrl] = useState(null); // Store final URL here
    const [imageUploadError, setImageUploadError] = useState(null);
    // Added loading/error state for fetching data
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);

    // Firestore document path (adapted from securitygates)
    const formDocPath = 'forms/Policy and Compliance/Documentation Of Policy Changes'; // Define path structure

    useEffect(() => {
        if (!buildingId) {
            alert('No building selected. Redirecting to Building Info...');
            // Ensure navigation target is correct for your app structure
            navigate('/BuildingandAddress');
            return;
        }

        const fetchFormData = async () => {
            setLoading(true);
            setLoadError(null);
            setImageUrl(null); // Reset image URL on load

            try {
                // Use doc() with buildingId to get/set specific building data
                const formDocRef = doc(db, formDocPath, buildingId);
                const docSnapshot = await getDoc(formDocRef);

                if (docSnapshot.exists()) {
                    const data = docSnapshot.data();
                    setFormData(data.formData || {});
                    // Load existing image URL if present
                    if (data.formData && data.formData.imageUrl) {
                       setImageUrl(data.formData.imageUrl);
                    }
                } else {
                    setFormData({}); // Start fresh if no data exists
                }
            } catch (error) {
                console.error("Error fetching form data:", error);
                setLoadError("Failed to load form data. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchFormData();
        // Dependencies: buildingId, db, navigate, formDocPath
    }, [buildingId, db, navigate, formDocPath]);

    // handleChange now saves data immediately (like securitygates)
    const handleChange = async (e) => {
        const { name, value } = e.target;
        // Update local state optimistically
        const newFormData = { ...formData, [name]: value };
        setFormData(newFormData);

        // Auto-save to Firestore
        if (buildingId) {
            try {
                const buildingRef = doc(db, 'Buildings', buildingId);
                const formDocRef = doc(db, formDocPath, buildingId);
                // Use setDoc with merge: true to update or create the document
                await setDoc(formDocRef, {
                    // Ensure building ref is included/updated
                    formData: { ...newFormData, building: buildingRef, imageUrl: imageUrl } // Persist current imageUrl too
                }, { merge: true });
                console.log("Form data auto-saved:", { ...newFormData, building: buildingRef, imageUrl: imageUrl });
            } catch (error) {
                console.error("Error auto-saving form data:", error);
                // Optionally alert user or handle error differently
                // alert("Failed to save changes. Please check your connection.");
            }
        }
    };

    // handleImageChange adapted from securitygates (uses FileReader)
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageData(reader.result); // Set base64 data for upload
                setImageUrl(null); // Clear previous final URL when new image is selected
                setImageUploadError(null); // Clear previous errors
            };
            reader.readAsDataURL(file);
        } else {
            setImageData(null);
        }
    };

    // handleBack simplified (data saved on change)
    const handleBack = () => {
        navigate(-1);
    };

    // handleSubmit adapted from securitygates
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!buildingId) {
            alert('Building ID is missing. Cannot submit.');
            return;
        }

        let finalImageUrl = imageUrl; // Keep existing URL unless new image uploaded

        // Upload image using Cloud Function if new image data exists
        if (imageData) {
            setLoading(true); // Indicate activity
            setImageUploadError(null);
            try {
                const uploadResult = await uploadImage({ imageData: imageData, buildingId: buildingId, formType: 'DocumentationOfPolicyChanges' }); // Pass relevant info
                finalImageUrl = uploadResult.data.imageUrl;
                setImageUrl(finalImageUrl); // Update state with the new URL
                console.log('Image uploaded successfully:', finalImageUrl);
            } catch (error) {
                console.error('Error uploading image:', error);
                setImageUploadError(`Image upload failed: ${error.message}. Please try again.`);
                setLoading(false); // Stop loading indicator on error
                return; // Stop submission if image upload fails
            } finally {
              setLoading(false); // Ensure loading indicator stops
            }
        }

        // Save final form data including the image URL
        try {
            setLoading(true); // Indicate saving activity
            const buildingRef = doc(db, 'Buildings', buildingId);
            const formDocRef = doc(db, formDocPath, buildingId);
            // Create final data object including the potentially updated imageUrl
            const finalFormData = { ...formData, imageUrl: finalImageUrl, building: buildingRef };
            await setDoc(formDocRef, { formData: finalFormData }, { merge: true });

            console.log('Form data submitted successfully!');
            alert('Form submitted successfully!');
            navigate('/Form'); // Navigate after successful submission
        } catch (error) {
            console.error("Error submitting final form data:", error);
            alert("Failed to submit form. Please check your connection and try again.");
            setLoading(false); // Stop loading indicator on error
        }
        // No finally setLoading(false) here as navigate happens on success
    };

    // Loading and error state rendering
    if (loading) {
        // Added distinct message for saving vs loading if needed, generic for now
        return <div>Loading...</div>;
    }

    if (loadError) {
        return <div>Error: {loadError}</div>;
    }

    return (
        <div> {/* Added outer div for potential future styling */}
            <div className="form-page">
                <header className="header">
                    <Navbar />
                    <button className="back-button" onClick={handleBack}>←</button>
                    {/* Consistent heading style */}
                    <h1>Documentation of Policy Changes Assessment</h1>
                    <img src={logo} alt="Logo" className="logo" />
                </header>

                <main className="form-container">
                    <form onSubmit={handleSubmit}>
                        {/* Consistent subheading */}
                        <h2>Documentation Of Policy Changes</h2>
                        {[
                            // Questions updated to Yes/No format
                            { name: "changeFormatDocumented", label: "Is the format used for documenting changes to policies clearly defined and consistently used?" },
                            { name: "reasonsRecorded", label: "Are the reasons for each policy change consistently recorded?" },
                            { name: "responsibilityAssigned", label: "Is there a designated person or team responsible for maintaining the documentation of policy changes?" },
                            { name: "historicalRecordAccessible", label: "Is the historical record of policy changes accessible to relevant stakeholders?" },
                            { name: "documentationUpToDate", label: "Are there procedures in place to ensure documentation of policy changes is kept up-to-date and accurate?" },

                        ].map((question, index) => (
                            // Rendering logic directly from securitygates
                            <div key={index} className="form-section">
                                <label>{question.label}</label>
                                <div>
                                    <input
                                        type="radio"
                                        name={question.name}
                                        value="yes"
                                        // Check state for this question's value
                                        checked={formData[question.name] === "yes"}
                                        onChange={handleChange}
                                        // Add required if necessary: required={!formData[question.name]}
                                    /> Yes
                                    <input
                                        type="radio"
                                        name={question.name}
                                        value="no"
                                        checked={formData[question.name] === "no"}
                                        onChange={handleChange}
                                    /> No
                                </div>
                                <input
                                    type="text"
                                    // Comment field name convention from securitygates
                                    name={`${question.name}Comment`}
                                    placeholder="Additional comments"
                                    // Value from state, ensuring controlled component
                                    value={formData[`${question.name}Comment`] || ''}
                                    onChange={handleChange}
                                    className="comment-box" // Apply styling if needed
                                />
                            </div>
                        ))}
                        {/* Image Upload Section - adapted from securitygates */}
                        <div className="form-section"> {/* Wrap file input for consistent spacing */}
                            <label>Upload Supporting Image (Optional):</label>
                            <input type="file" onChange={handleImageChange} accept="image/*" />
                            {/* Display existing/newly uploaded image */}
                             {imageUrl && !imageData && <img src={imageUrl} alt="Current" style={{maxWidth: '200px', marginTop: '10px'}}/>}
                             {/* Display preview of selected image */}
                             {imageData && <img src={imageData} alt="Preview" style={{maxWidth: '200px', marginTop: '10px'}}/>}
                            {/* Display image upload error */}
                            {imageUploadError && <p style={{ color: 'red' }}>{imageUploadError}</p>}
                        </div>
                        <button type="submit" disabled={loading}>
                            {/* Indicate activity on button */}
                            {loading ? 'Submitting...' : 'Submit'}
                        </button>
                    </form>
                </main>
            </div>
        </div>
    );
}

export default DocumentationOfPolicyChangesPage;