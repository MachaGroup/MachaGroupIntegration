import React, { useState, useEffect } from 'react';
import { getFirestore, collection, doc, getDoc, setDoc } from 'firebase/firestore';
// Import useLocation
import { useNavigate, useLocation } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function SecurityGatesPage() {
    const navigate = useNavigate();
    const location = useLocation(); // Hook to get location object
    const { buildingId: contextBuildingId } = useBuilding(); // Get ID from context, renamed to avoid conflict
    const db = getFirestore();
    const functions = getFunctions();
    const uploadImage = httpsCallable(functions, 'uploadSecurityGateImage');

    const [formData, setFormData] = useState({});
    const [imageData, setImageData] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);
    const [currentBuildingId, setCurrentBuildingId] = useState(null); // State to hold the effective ID

    // Define Firestore path consistently
    const formDocPath = 'forms/Physical Security/Security Gates';

    useEffect(() => {
        // --- Get buildingId from URL Params ---
        const queryParams = new URLSearchParams(location.search);
        const urlBuildingId = queryParams.get('buildingId');

        // --- Determine effective Building ID (URL param first, then context) ---
        const effectiveBuildingId = urlBuildingId || contextBuildingId;

        // --- Check if an ID was found ---
        if (!effectiveBuildingId) {
            console.error("SecurityGatesPage: Building ID is missing from context and URL params.");
            alert('No building selected. Redirecting to Building Info...');
            navigate('/BuildingandAddress'); // Use absolute path
            return;
        }

        // Store the ID being used in state
        setCurrentBuildingId(effectiveBuildingId);
        console.log(`SecurityGatesPage: Using Building ID: ${effectiveBuildingId}`);

        const fetchFormData = async () => {
            setLoading(true);
            setLoadError(null);
            setImageUrl(null); // Reset image URL on load

            try {
                // --- Use effectiveBuildingId to fetch data ---
                const formDocRef = doc(db, formDocPath, effectiveBuildingId);
                const docSnapshot = await getDoc(formDocRef);

                if (docSnapshot.exists()) {
                    const data = docSnapshot.data();
                    setFormData(data.formData || {});
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
    // Add location.search and contextBuildingId to dependencies
    }, [location.search, contextBuildingId, db, navigate, formDocPath]);

    // --- Update handlers to use currentBuildingId from state ---

    const handleChange = async (e) => {
        const { name, value } = e.target;
        const newFormData = { ...formData, [name]: value };
        setFormData(newFormData);

        // Use currentBuildingId from state
        if (currentBuildingId) {
            try {
                const buildingRef = doc(db, 'Buildings', currentBuildingId); // Use currentBuildingId
                const formDocRef = doc(db, formDocPath, currentBuildingId); // Use currentBuildingId
                // Persist current imageUrl if available
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
                setImageData(reader.result);
                setImageUrl(null);
                setImageUploadError(null);
            };
            reader.readAsDataURL(file);
        } else {
             setImageData(null);
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

        let finalImageUrl = imageUrl;

        // Upload new image if present
        if (imageData) {
             setLoading(true);
             setImageUploadError(null);
            try {
                // Pass currentBuildingId if function needs it
                const uploadResult = await uploadImage({ imageData: imageData, buildingId: currentBuildingId, formType: 'SecurityGates' });
                finalImageUrl = uploadResult.data.imageUrl;
                setImageUrl(finalImageUrl);
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
            setLoading(true);
            const buildingRef = doc(db, 'Buildings', currentBuildingId); // Use currentBuildingId
            const formDocRef = doc(db, formDocPath, currentBuildingId); // Use currentBuildingId
             // Ensure the final data includes the correct image URL
            const finalFormData = { ...formData, imageUrl: finalImageUrl, building: buildingRef }; // Use finalImageUrl
            await setDoc(formDocRef, { formData: finalFormData }, { merge: true });

            console.log('Form data submitted successfully!');
            alert('Form submitted successfully!');
            navigate('/Form'); // Adjust as needed
        } catch (error) {
            console.error("Error saving final form data:", error);
            alert("Failed to save changes. Please check your connection and try again.");
            setLoading(false); // Stop loading on error
        }
    };

    // --- Update Loading/Error Checks ---
    if (loading || !currentBuildingId) { // Show loading until ID is confirmed and initial data fetch attempt finishes
        return <div>Loading...</div>;
    }

    if (loadError) {
        return <div>Error: {loadError}</div>;
    }

    return (
        // --- Keep existing JSX structure ---
        <div>
            <div className="form-page">
                <header className="header">
                    <Navbar />
                    <button className="back-button" onClick={handleBack}>←</button>
                    <h1>Security Gates Assessment</h1>
                    <img src={logo} alt="Logo" className="logo" />
                </header>

                <main className="form-container">
                    <form onSubmit={handleSubmit}>
                        <h2>Security Gates Assessment</h2>
                        {[
                            { name: "authMechanisms", label: "Are there authentication mechanisms, such as keypads, card readers, or biometric scanners, to restrict entry?" },
                            { name: "integratedSystems", label: "Are access control systems integrated with other security measures, such as surveillance cameras or intrusion detection systems?" },
                            { name: "logEntries", label: "Is there a log of entries and exits through the security gates for monitoring and auditing purposes?" },
                            { name: "safetyFeatures", label: "Are there safety features in place to prevent accidents or injuries, such as sensors to detect obstructions or emergency stop buttons?" },
                            { name: "trapHazards", label: "Are the gates equipped with safety mechanisms to prevent trapping or crushing hazards?" },
                            { name: "safetySignage", label: "Are there clear instructions or signage to inform users about safety procedures and precautions when using the gates?" },
                            { name: "complianceRegulations", label: "Do the security gates comply with relevant safety and security regulations, codes, and standards?" },
                            { name: "inspectionsCertifications", label: "Have the gates undergone any inspections or certifications to verify compliance with applicable standards?" },
                            { name: "maintenanceSchedule", label: "Is there a regular maintenance schedule in place for the security gates?" },
                            { name: "maintenanceTasks", label: "Are maintenance tasks, such as lubrication, inspection of components, and testing of safety features, performed according to schedule?" },
                            { name: "maintenanceRecords", label: "Are there records documenting maintenance activities, repairs, and any issues identified during inspections?" },
                            { name: "userTraining", label: "Have users, such as security personnel or authorized staff, received training on how to operate the security gates safely and effectively?" },
                            { name: "instructionsGuidelines", label: "Are there instructions or guidelines available to users regarding proper gate usage and emergency procedures?" },
                            { name: "reportingProcess", label: "Is there a process for reporting malfunctions, damage, or security incidents related to the gates?" }
                        ].map((question, index) => (
                            <div key={index} className="form-section">
                                <label>{question.label}</label>
                                <div>
                                    <input
                                        type="radio"
                                        name={question.name}
                                        value="yes"
                                        checked={formData[question.name] === "yes"}
                                        onChange={handleChange}
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
                                    name={`${question.name}Comment`}
                                    placeholder="Additional comments"
                                    value={formData[`${question.name}Comment`] || ''}
                                    onChange={handleChange}
                                    className="comment-box" // Added class for consistency
                                />
                            </div>
                        ))}
                        {/* Image Upload Section */}
                         <div className="form-section">
                             <label>Upload Supporting Image (Optional):</label>
                             <input type="file" onChange={handleImageChange} accept="image/*" />
                             {imageUrl && !imageData && <img src={imageUrl} alt="Current" style={{maxWidth: '200px', marginTop: '10px'}}/>}
                             {imageData && <img src={imageData} alt="Preview" style={{maxWidth: '200px', marginTop: '10px'}}/>}
                             {imageUploadError && <p style={{ color: 'red' }}>{imageUploadError}</p>}
                         </div>

                        <button type="submit" disabled={loading}>
                            {loading ? 'Submitting...' : 'Submit'}
                        </button>
                    </form>
                </main>
            </div>
        </div>
    );
}

export default SecurityGatesPage;