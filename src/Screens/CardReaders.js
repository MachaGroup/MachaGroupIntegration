import React, { useState, useEffect } from 'react';
// Step 1: Import useLocation
import { useNavigate, useLocation } from 'react-router-dom';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getFunctions, httpsCallable } from "firebase/functions";
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

// Define questions array outside the component
const cardReaderQuestions = [
    { name: "operationalCardReader", label: "Are the card readers operational and functioning as intended?" },
    { name: "authentication", label: "Do the card readers accurately read and authenticate access credentials?" }, // Simplified label
    { name: "malfunction", label: "Are there any signs of malfunction or errors in card reader operations?" },
    { name: "backupSystems", label: "Are there backup systems in place in case of power outages or malfunctions?" },
    // Adapted from text input
    { name: "accessControlMethodsImplemented", label: "Are appropriate access control methods (e.g., card issuance, credential validation) used with the card readers?" },
    { name: "issuedCards", label: "Are access credentials (e.g., cards) issued to authorized personnel and visitors?" }, // Simplified label
    { name: "restrictedAccess", label: "Is access restricted to individuals with valid/authorized credentials?" }, // Simplified label
    { name: "deactivationProcess", label: "Is there a process to deactivate lost/stolen credentials promptly?" }, // Simplified label
    { name: "integration", label: "Are the card readers integrated with the overall access control system?" },
    { name: "communication", label: "Do they communicate seamlessly with access control software/databases?" }, // Simplified label
    { name: "monitoring", label: "Is there real-time monitoring and logging of access events from card readers?" }, // Simplified label
    { name: "centralManagement", label: "Are access rights managed centrally and synchronized with the card reader system?" },
    { name: "securityFeatures", label: "Are the card readers equipped with security features against tampering?" }, // Simplified label
    { name: "encryption", label: "Do they support encryption and secure communication protocols?" }, // Simplified label
    { name: "physicalSecurity", label: "Are physical security measures in place to protect reader components/wiring?" }, // Simplified label
    { name: "compliance", label: "Do the card readers comply with relevant regulations, standards, and best practices?" },
    // Adapted from text input
    { name: "regulatoryRequirementsMet", label: "Are specific regulatory requirements or guidelines for card reader systems being met?" },
    { name: "testingCertification", label: "Have the card readers undergone testing or certification for compliance?" }, // Simplified label
    { name: "maintenanceSchedule", label: "Is there a regular maintenance schedule in place?" }, // Simplified label
    { name: "maintenanceTasks", label: "Are scheduled maintenance tasks (cleaning, calibration, updates) performed?" }, // Simplified label
    { name: "maintenanceRecords", label: "Are records documenting maintenance activities, repairs, and issues kept?" }, // Simplified label
    { name: "userTraining", label: "Have users (security, staff, cardholders) received training on proper card reader usage?" }, // Simplified label
    { name: "instructions", label: "Are instructions or guidelines available regarding proper card usage and access procedures?" },
    { name: "reportingProcess", label: "Is there a process for reporting malfunctions, damage, or security incidents?" }, // Simplified label
];


function CardReadersPage() {
    const navigate = useNavigate();
    // Step 1: Use useLocation
    const location = useLocation();
    // Step 2: Get buildingId from context, renamed to contextBuildingId
    const { buildingId: contextBuildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    // Cloud Function Naming Rule: upload + FilenameWithoutExtension + Image
    const uploadImage = httpsCallable(functions, 'uploadCardReadersPageImage'); // Corrected Cloud Function name and variable name

    // State variables
    const [formData, setFormData] = useState({});
    const [imageData, setImageData] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);
    // Step 3: Add state for currentBuildingId
    const [currentBuildingId, setCurrentBuildingId] = useState(null);

    // Step 4: Modify useEffect for buildingId handling and data fetching
    useEffect(() => {
        // Extract buildingId from URL query parameters
        const queryParams = new URLSearchParams(location.search);
        const urlBuildingId = queryParams.get('buildingId');

        // Prioritize URL buildingId over context buildingId
        const idToUse = urlBuildingId || contextBuildingId;

        if (idToUse) {
            // Set the currentBuildingId state
            setCurrentBuildingId(idToUse);
            setLoading(true); // Ensure loading is true while fetching for the new ID
            setLoadError(null);

            const fetchFormData = async () => {
                // Use idToUse for Firestore path
                const formDocRef = doc(db, 'forms', 'Physical Security', 'Card Readers', idToUse); // Correct Firestore path using idToUse

                try {
                    const docSnapshot = await getDoc(formDocRef);
                    if (docSnapshot.exists()) {
                        const existingData = docSnapshot.data().formData || {};
                        setFormData(existingData);
                        if (existingData.imageUrl) {
                            setImageUrl(existingData.imageUrl);
                        } else {
                            setImageUrl(null); // Reset image URL if not present
                        }
                    } else {
                        setFormData({}); // Reset form data if doc doesn't exist
                        setImageUrl(null);
                    }
                } catch (error) {
                    console.error("Error fetching form data:", error);
                    setLoadError("Failed to load form data. Please try again.");
                    setFormData({}); // Reset form data on error
                    setImageUrl(null);
                } finally {
                    setLoading(false);
                }
            };

            fetchFormData();
        } else {
            // No building ID found in URL or context
            console.warn("No buildingId found in URL query params or context.");
            setLoadError("No building selected. Please access this page via a link containing the building ID.");
            setLoading(false);
            setCurrentBuildingId(null); // Ensure state is null
            setFormData({}); // Clear form data
            setImageUrl(null);
            // Optionally, redirect or show a clearer message
            // navigate('/some-error-or-selection-page');
        }

        // Step 4: Correct dependency array
    }, [location.search, contextBuildingId, db]); // Removed navigate, as it's stable

    // Step 5: Modify handleChange to use currentBuildingId state
    const handleChange = async (e) => {
        const { name, value } = e.target;
        const newFormData = { ...formData, [name]: value };
        setFormData(newFormData);

        // Use currentBuildingId for check and Firestore path
        if (currentBuildingId) {
            try {
                const buildingRef = doc(db, 'Buildings', currentBuildingId);
                const formDocRef = doc(db, 'forms', 'Physical Security', 'Card Readers', currentBuildingId); // Correct Firestore path
                const dataToSave = {
                    ...newFormData,
                    building: buildingRef,
                    ...(imageUrl && { imageUrl: imageUrl }) // Keep existing image URL if present
                };
                await setDoc(formDocRef, { formData: dataToSave }, { merge: true });
            } catch (error) {
                console.error("Error saving form data on change:", error);
                // Add user feedback if necessary, e.g., a small non-blocking status indicator
            }
        } else {
            console.warn("handleChange called without a currentBuildingId.");
            // Optionally disable inputs or show a warning if currentBuildingId is missing
        }
    };

    // handleImageChange - No changes needed for buildingId logic
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageData(reader.result); // Set base64 data
                setImageUrl(null); // Clear existing URL display
                setImageUploadError(null);
            };
            reader.readAsDataURL(file);
        } else {
            setImageData(null);
        }
    };

    // handleBack - No changes needed
    const handleBack = () => {
        navigate(-1);
    };

    // Step 5: Modify handleSubmit to use currentBuildingId state
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Use currentBuildingId for check
        if (!currentBuildingId) {
            alert('Building ID is missing. Cannot submit.');
            return;
        }

        setLoading(true);
        let finalImageUrl = imageUrl || null; // Start with potentially existing URL
        let submissionError = null;

        // Upload new image if one was selected
        if (imageData) {
            try {
                console.log("Uploading image via Cloud Function...");
                // Pass currentBuildingId to Cloud Function
                const uploadResult = await uploadImage({ // Use the correctly named callable variable
                    imageData: imageData,
                    buildingId: currentBuildingId // Pass currentBuildingId
                });
                finalImageUrl = uploadResult.data.imageUrl;
                setImageUrl(finalImageUrl); // Update display URL
                setImageData(null); // Clear base64 data after successful upload
                setImageUploadError(null);
                console.log("Image uploaded successfully:", finalImageUrl);
            } catch (error) {
                console.error('Error uploading image via function:', error);
                setImageUploadError(`Image upload failed: ${error.message}`);
                submissionError = "Image upload failed. Form data saved without new image.";
                finalImageUrl = imageUrl; // Keep the old URL if upload fails
            }
        }

        // Prepare final data, including the potentially updated image URL
        const finalFormData = {
            ...formData,
            imageUrl: finalImageUrl,
        };
        setFormData(finalFormData); // Update local state to reflect final data being saved

        try {
            console.log("Saving final form data to Firestore...");
            // Use currentBuildingId for Firestore refs
            const buildingRef = doc(db, 'Buildings', currentBuildingId);
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Card Readers', currentBuildingId); // Correct Firestore path
            // Ensure the building reference is included in the final save
            await setDoc(formDocRef, { formData: { ...finalFormData, building: buildingRef } }, { merge: true });
            console.log('Form data submitted successfully!');
            if (!submissionError) {
                alert('Form submitted successfully!');
            } else {
                alert(submissionError); // Inform user if image upload failed but data saved
            }
            navigate('/Form'); // Navigate after successful submission
        } catch (error) {
            console.error("Error saving final form data to Firestore:", error);
            alert("Failed to save final form data. Please check connection and try again.");
            // Do not navigate away if save fails
        } finally {
            setLoading(false);
        }
    };

    // Step 6: Update loading check condition
    if (loading || !currentBuildingId) {
        return (
            <div className="form-page">
                 <header className="header">
                    <Navbar />
                    {/* Optionally add back button even in loading state */}
                    <h1>Card Readers Assessment</h1>
                    <img src={logo} alt="Logo" className="logo" />
                </header>
                <main className="form-container">
                    {loading && <div>Loading building data...</div>}
                    {!loading && !currentBuildingId && <div>{loadError || "No building specified. Please ensure you have accessed this page correctly."}</div>}
                </main>
            </div>
        );
    }

    // Removed the separate loadError check here as it's handled above or within useEffect

    return (
        <div className="form-page">
            <header className="header">
                <Navbar />
                <button className="back-button" onClick={handleBack}>←</button>
                <h1>Card Readers Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                {/* Display load error if it occurred but we have a buildingId */}
                {loadError && <p style={{ color: 'red' }}>Error: {loadError}</p>}

                <form onSubmit={handleSubmit}>
                    <h2>Card Readers Assessment Questions</h2>

                    {cardReaderQuestions.map((question, index) => (
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
                                    disabled={!currentBuildingId} // Disable if no building ID
                                /> <label htmlFor={`${question.name}_yes`}>Yes</label>
                                <input
                                    type="radio"
                                    id={`${question.name}_no`}
                                    name={question.name}
                                    value="no"
                                    checked={formData[question.name] === "no"}
                                    onChange={handleChange}
                                    disabled={!currentBuildingId} // Disable if no building ID
                                /> <label htmlFor={`${question.name}_no`}>No</label>
                            </div>
                            <input
                                className='comment-input'
                                type="text"
                                name={`${question.name}Comment`}
                                placeholder="Additional comments"
                                value={formData[`${question.name}Comment`] || ''}
                                onChange={handleChange}
                                disabled={!currentBuildingId} // Disable if no building ID
                            />
                        </div>
                    ))}

                    <div className="form-section">
                        <label htmlFor="imageUploadCardReader">Upload Image (Optional):</label>
                        <input
                            id="imageUploadCardReader"
                            type="file"
                            onChange={handleImageChange}
                            accept="image/*"
                            disabled={!currentBuildingId} // Disable if no building ID
                         />
                        {/* Display existing image URL if available and no new image is staged */}
                        {imageUrl && !imageData && <img src={imageUrl} alt="Uploaded Card Reader" style={{ maxWidth: '200px', marginTop: '10px' }} />}
                        {/* Display preview of newly selected image */}
                        {imageData && <img src={imageData} alt="Preview Card Reader" style={{ maxWidth: '200px', marginTop: '10px' }} />}
                        {imageUploadError && <p style={{ color: 'red' }}>{imageUploadError}</p>}
                    </div>

                    <button type="submit" disabled={loading || !currentBuildingId}>
                        {loading ? 'Submitting...' : 'Submit Final'}
                    </button>
                </form>
            </main>
        </div>
    );
}

export default CardReadersPage;