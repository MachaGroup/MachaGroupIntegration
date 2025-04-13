import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
// Import useLocation
import { useNavigate, useLocation } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function SRORolesAndResponsibilitiesPage() {
    const navigate = useNavigate();
    const location = useLocation(); // Hook to get location object
    const { buildingId: contextBuildingId } = useBuilding(); // Get ID from context, renamed
    const db = getFirestore();
    const functions = getFunctions();
    // Ensure Cloud Function name follows the rule
    const uploadImage = httpsCallable(functions, 'uploadSRORolesAndResponsibilitiesPageImage');

    const [formData, setFormData] = useState({});
    const [imageData, setImageData] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);
    const [currentBuildingId, setCurrentBuildingId] = useState(null); // State to hold the effective ID

    // Define Firestore path consistently
    const formDocPath = 'forms/Community Partnership/SRO Roles and Responsibilities';

    useEffect(() => {
        // --- Get buildingId from URL Params ---
        const queryParams = new URLSearchParams(location.search);
        const urlBuildingId = queryParams.get('buildingId');

        // --- Determine effective Building ID (URL param first, then context) ---
        const effectiveBuildingId = urlBuildingId || contextBuildingId;

        // --- Check if an ID was found ---
        if (!effectiveBuildingId) {
            console.error("SRORolesAndResponsibilitiesPage: Building ID is missing from context and URL params.");
            // Use absolute path for navigation
            alert('No building selected. Redirecting to Building Info...');
            navigate('/BuildingandAddress'); // Corrected navigation path
            return;
        }

        // Store the ID being used in state
        setCurrentBuildingId(effectiveBuildingId);
        console.log(`SRORolesAndResponsibilitiesPage: Using Building ID: ${effectiveBuildingId}`);

        const fetchFormData = async () => {
            setLoading(true);
            setLoadError(null);
            setImageUrl(null); // Reset image URL on load

            try {
                // --- Use effectiveBuildingId and formDocPath to fetch data ---
                const formDocRef = doc(db, formDocPath, effectiveBuildingId);
                const docSnapshot = await getDoc(formDocRef);

                if (docSnapshot.exists()) {
                    const data = docSnapshot.data();
                    setFormData(data.formData || {});
                     // Load existing image URL if present
                    if (data.formData && data.formData.imageUrl) {
                        setImageUrl(data.formData.imageUrl);
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
        // Updated dependencies
    }, [location.search, contextBuildingId, db, navigate, formDocPath]);

    // --- Update handlers to use currentBuildingId from state ---

    const handleChange = async (e) => {
        const { name, value } = e.target;
        const newFormData = { ...formData, [name]: value };
        setFormData(newFormData);

        // Use currentBuildingId from state for auto-saving
        if (currentBuildingId) {
            try {
                const buildingRef = doc(db, 'Buildings', currentBuildingId); // Use currentBuildingId
                const formDocRef = doc(db, formDocPath, currentBuildingId); // Use currentBuildingId
                // Persist current imageUrl if available during auto-save
                await setDoc(formDocRef, {
                    formData: { ...newFormData, building: buildingRef, imageUrl: imageUrl }
                 }, { merge: true });
                console.log("Form data auto-saved for building:", currentBuildingId);
            } catch (error) {
                console.error("Error auto-saving form data:", error);
                alert("Failed to save changes. Please check your connection and try again.");
            }
        } else {
             console.warn("handleChange called but currentBuildingId is not set.");
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if(file){
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageData(reader.result); // Set base64 data for preview/upload
                setImageUrl(null); // Clear existing image URL display
                setImageUploadError(null); // Reset upload error
            };
            reader.readAsDataURL(file);
        } else {
             setImageData(null); // Clear image data if no file selected
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Use currentBuildingId from state
        if (!currentBuildingId) {
            alert('Building ID is missing. Cannot submit.');
            return;
        }

        let finalImageUrl = imageUrl; // Keep existing URL unless new image is uploaded

        // Upload new image if present
        if (imageData) {
             setLoading(true); // Indicate loading during upload
             setImageUploadError(null);
            try {
                // Pass currentBuildingId and formType to the Cloud Function
                const uploadResult = await uploadImage({
                    imageData: imageData,
                    buildingId: currentBuildingId,
                    formType: 'SRORolesAndResponsibilitiesPage' // Pass form type identifier
                });
                finalImageUrl = uploadResult.data.imageUrl;
                setImageUrl(finalImageUrl); // Update display URL
                 // Update local formData state immediately with new URL for saving
                setFormData(prev => ({ ...prev, imageUrl: finalImageUrl }));
                console.log('Image uploaded successfully:', finalImageUrl);
            } catch (error) {
                console.error('Error uploading image:', error);
                setImageUploadError(`Image upload failed: ${error.message}. Please try again.`);
                setLoading(false); // Stop loading on error
                return; // Stop submission if upload fails
            } finally {
                 setLoading(false); // Ensure loading stops
            }
        }

        // Save final form data
        try {
            setLoading(true); // Indicate loading during final save
            const buildingRef = doc(db, 'Buildings', currentBuildingId); // Use currentBuildingId
            const formDocRef = doc(db, formDocPath, currentBuildingId); // Use currentBuildingId
            // Ensure the final data includes the correct image URL and building reference
            const finalFormData = { ...formData, imageUrl: finalImageUrl, building: buildingRef };
            await setDoc(formDocRef, { formData: finalFormData }, { merge: true });

            console.log('Form data submitted successfully!');
            alert('Form submitted successfully!');
            navigate('/Form'); // Navigate after successful submission
        } catch (error) {
            console.error("Error saving final form data:", error);
            alert("Failed to save changes. Please check your connection and try again.");
            setLoading(false); // Stop loading on error
        }
        // No finally setLoading(false) here, as it's handled within try/catch or after navigation
    };

    // --- Update Loading/Error Checks ---
    // Show loading until ID is confirmed and initial data fetch attempt finishes
    if (loading || !currentBuildingId) {
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
                <h1>SRO Roles and Responsibilities</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>SRO Roles and Responsibilities</h2>
                    {[
                        { name: "sroDuties", label: "What specific duties do School Resource Officers (SROs) perform within the school environment?" },
                        { name: "srosCollaborating", label: "How do SROs collaborate with school administration and staff to enhance safety?" },
                        { name: "requiredTraining", label: "What training or qualifications are required for SROs working in schools?" },
                        { name: "sroEmergencyPrepareness", label: "How do SROs contribute to emergency preparedness and response planning?" },
                        { name: "sroEngagingWithStudents", label: "In what ways do SROs engage with students to build trust and rapport within the school community?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <input
                                type="text"
                                name={question.name}
                                value={formData[question.name] || ''}
                                onChange={handleChange}
                                placeholder="Enter details here" // Changed placeholder
                                className="comment-box" // Use standard class if desired
                            />
                        </div>
                    ))}

                     {/* Image Upload Section - Standardized */}
                     <div className="form-section">
                         <label>Upload Supporting Image (Optional):</label>
                         <input type="file" onChange={handleImageChange} accept="image/*" />
                         {/* Show existing image if available and no new image is selected */}
                         {imageUrl && !imageData && <img src={imageUrl} alt="Current" style={{maxWidth: '200px', marginTop: '10px'}}/>}
                         {/* Show preview of the newly selected image */}
                         {imageData && <img src={imageData} alt="Preview" style={{maxWidth: '200px', marginTop: '10px'}}/>}
                         {/* Show upload error message */}
                         {imageUploadError && <p style={{ color: 'red' }}>{imageUploadError}</p>}
                     </div>

                    <button type="submit" disabled={loading}>
                         {/* Dynamic button text */}
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
            </main>
        </div>
    );
}

export default SRORolesAndResponsibilitiesPage;