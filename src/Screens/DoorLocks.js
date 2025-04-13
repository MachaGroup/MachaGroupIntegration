import React, { useState, useEffect } from 'react';
// Firestore imports adjusted to match SecurityGatesPage
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
// Firebase Functions import added
import { getFunctions, httpsCallable } from "firebase/functions";
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

// Define questions in an array like SecurityGatesPage
const doorLockQuestions = [
    { name: "operational", label: "1. Are the electronic door locks operational and functioning as intended?" },
    { name: "secureLocks", label: "2. Do the locks reliably secure doors to prevent unauthorized access?" },
    { name: "malfunction", label: "3. Are there any signs of malfunction or errors in the locking mechanisms?" },
    { name: "backupSystems", label: "4. Are backup systems in place in case of power outages or malfunctions?" },
    // Question 5 adapted to Yes/No format
    { name: "authMethodsDefined", label: "5. Are specific authentication methods (e.g., RFID, key codes, biometrics) defined and used?" },
    { name: "authSecure", label: "6. Are these authentication methods secure and resistant to unauthorized duplication or bypass?" },
    { name: "mfa", label: "7. Is multi-factor authentication implemented to enhance security (e.g., combining a PIN code with a biometric scan)?" },
    // Question 8 adapted to Yes/No format
    { name: "accessRightsManaged", label: "8. Is there a defined process for managing and enforcing access rights through the locks?" },
    { name: "validCredentials", label: "9. Is access restricted to individuals with valid credentials or authorization?" },
    { name: "accessPermissionsProcess", label: "10. Is there a process for granting, modifying, or revoking access permissions as needed?" },
    { name: "integrationSecuritySystems", label: "11. Are the electronic door locks integrated with other security systems (e.g., access control software, cameras, alarms)?" },
    { name: "realTimeMonitoring", label: "12. Do they communicate seamlessly with integrated systems for real-time monitoring and response?" },
    { name: "accessEventsLogging", label: "13. Are access events logged and recorded for audit and analysis purposes?" },
    { name: "durability", label: "14. Are the locks made from durable materials designed to withstand tampering or forced entry?" },
    { name: "antiTamper", label: "15. Are there anti-tamper features or sensors to detect/respond to unauthorized manipulation?" },
    { name: "environmentalResistance", label: "16. Are the locks resistant to environmental factors (e.g., moisture, temperature, wear)?" },
    { name: "maintenanceSchedule", label: "17. Is there a regular maintenance schedule in place for the electronic door locks?" },
    { name: "maintenanceTasks", label: "18. Are scheduled maintenance tasks (e.g., battery replacement, updates, inspections) performed?" },
    { name: "maintenanceRecords", label: "19. Are there records documenting maintenance activities, repairs, and issues?" },
    { name: "userTraining", label: "20. Have users (security, staff, authorized individuals) received training on proper lock usage?" },
    { name: "userInstructions", label: "21. Are instructions or guidelines available to users regarding access procedures and protocols?" },
    { name: "reportingProcess", label: "22. Is there a process for reporting malfunctions, damage, or security incidents related to the locks?" }
];


function DoorLocksPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    // Firebase Functions setup added
    const functions = getFunctions();
    // httpsCallable setup - NameOfFile = DoorLocks
    const uploadImage = httpsCallable(functions, 'uploadDoorLocksImage');

    const [formData, setFormData] = useState({});
    // State for base64 image data, like SecurityGatesPage
    const [imageData, setImageData] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    // Renamed error state for consistency
    const [imageUploadError, setImageUploadError] = useState(null);
    // Loading/Error states for fetching data added
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);

    // useEffect to fetch data, similar to SecurityGatesPage
    useEffect(() => {
        if (!buildingId) {
            alert('No building selected. Redirecting to Building Info...');
            navigate('/BuildingandAddress'); // Ensure path is correct
            return;
        }

        const fetchFormData = async () => {
            setLoading(true);
            setLoadError(null);
            // Define the specific document reference for this form/building
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Door Locks', buildingId);

            try {
                const docSnapshot = await getDoc(formDocRef);

                if (docSnapshot.exists()) {
                    const existingData = docSnapshot.data().formData || {};
                    setFormData(existingData);
                    // If image URL was previously saved, set it
                    if (existingData.imageUrl) {
                         setImageUrl(existingData.imageUrl);
                    }
                } else {
                    setFormData({}); // Initialize empty if no data exists
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

    // handleChange updated to save data immediately, like SecurityGatesPage
    const handleChange = async (e) => {
        const { name, value } = e.target;
        const newFormData = { ...formData, [name]: value };
        setFormData(newFormData);

        // Save changes to Firestore immediately
        if (buildingId) {
            try {
                const buildingRef = doc(db, 'Buildings', buildingId); // Get building reference
                const formDocRef = doc(db, 'forms', 'Physical Security', 'Door Locks', buildingId);
                 // Include buildingRef and potentially existing imageUrl
                const dataToSave = {
                     ...newFormData,
                     building: buildingRef,
                     ...(imageUrl && { imageUrl: imageUrl }) // Keep existing imageUrl if present
                 };
                await setDoc(formDocRef, { formData: dataToSave }, { merge: true });
                console.log("Form data updated in Firestore:", dataToSave);
            } catch (error) {
                console.error("Error saving form data to Firestore:", error);
                // Optionally alert user, but avoid excessive alerts on every change
                // alert("Failed to save changes. Please check connection.");
            }
        }
    };

    // handleImageChange updated to use base64, like SecurityGatesPage
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageData(reader.result); // Store as base64
                 setImageUrl(null); // Clear previous preview if a new file is selected
                 setImageUploadError(null); // Clear previous errors
            };
            reader.readAsDataURL(file);
        } else {
             setImageData(null);
        }
    };

    // handleBack simplified, data saved on change
    const handleBack = () => {
        navigate(-1);
    };

    // handleSubmit updated to use Cloud Function and setDoc
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!buildingId) {
            alert('Building ID is missing. Cannot submit.');
            return;
        }

        setLoading(true); // Indicate submission process
        let finalImageUrl = formData.imageUrl || null; // Start with existing URL if any
        let submissionError = null;

        // Upload image via Cloud Function if new image data exists
        if (imageData) {
            try {
                console.log("Uploading image via Cloud Function...");
                // Ensure imageData includes the base64 prefix if necessary for your function
                const uploadResult = await uploadImage({
                    imageData: imageData,
                    buildingId: buildingId // Pass buildingId if needed by function for path/naming
                 });
                finalImageUrl = uploadResult.data.imageUrl; // Get URL from function response
                setImageUrl(finalImageUrl); // Update display URL
                setImageUploadError(null);
                console.log("Image uploaded successfully:", finalImageUrl);
            } catch (error) {
                console.error('Error uploading image via function:', error);
                setImageUploadError(`Image upload failed: ${error.message}`);
                submissionError = "Image upload failed. Form data saved without new image.";
                // Decide if you want to stop submission or save form data without the image
                // Set finalImageUrl back to existing URL if upload failed
                 finalImageUrl = formData.imageUrl || null;
                 // setLoading(false); // Stop loading indicator if stopping submission
                 // return; // Stop submission if image upload is critical
            }
        }

        // Prepare final form data including the image URL
         const finalFormData = {
             ...formData,
             imageUrl: finalImageUrl // Use the result from upload attempt or existing URL
         };
         setFormData(finalFormData); // Update state

        // Save final form data to Firestore
        try {
            console.log("Saving final form data to Firestore...");
            const buildingRef = doc(db, 'Buildings', buildingId);
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Door Locks', buildingId);
            await setDoc(formDocRef, { formData: { ...finalFormData, building: buildingRef } }, { merge: true });
            console.log('Form data submitted successfully!');
             // Only show success alert if no previous submission error occurred
             if (!submissionError) {
                 alert('Form submitted successfully!');
             } else {
                 alert(submissionError); // Show the earlier error message
             }
            navigate('/Form'); // Navigate after successful save
        } catch (error) {
            console.error("Error saving final form data to Firestore:", error);
            alert("Failed to save final form data. Please check connection and try again.");
             submissionError = "Failed to save final form data."; // Update error status
        } finally {
             setLoading(false); // Stop loading indicator
        }
    };

    // Loading and error display added
    if (loading && !formData) { // Show initial loading state
        return <div>Loading...</div>;
    }

    if (loadError) {
        return <div>Error: {loadError}</div>;
    }

    return (
        // Outer div removed to match SecurityGatesPage structure
        <div className="form-page">
            <header className="header">
                <Navbar />
                <button className="back-button" onClick={handleBack}>←</button>
                {/* Title updated slightly for consistency */}
                <h1>Door Locks Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    {/* Added h2 like SecurityGatesPage */}
                    <h2>Door Locks Assessment Questions</h2>

                    {/* Use .map to render questions */}
                    {doorLockQuestions.map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                <input
                                    type="radio"
                                    id={`${question.name}_yes`} // Add unique ID for label association
                                    name={question.name}
                                    value="yes"
                                    checked={formData[question.name] === "yes"}
                                    onChange={handleChange}
                                /> <label htmlFor={`${question.name}_yes`}>Yes</label> {/* Label for radio */}
                                <input
                                    type="radio"
                                    id={`${question.name}_no`} // Add unique ID
                                    name={question.name}
                                    value="no"
                                    checked={formData[question.name] === "no"}
                                    onChange={handleChange}
                                /> <label htmlFor={`${question.name}_no`}>No</label> {/* Label for radio */}
                            </div>
                             {/* Text input for comments like SecurityGatesPage */}
                            <input
                                 className='comment-input' // Use a more specific class if needed
                                type="text"
                                name={`${question.name}Comment`}
                                placeholder="Additional comments"
                                value={formData[`${question.name}Comment`] || ''}
                                onChange={handleChange}
                            />
                        </div>
                    ))}

                    {/* Image upload section */}
                    <div className="form-section">
                         <label htmlFor="imageUpload">Upload Image (Optional):</label>
                         <input id="imageUpload" type="file" onChange={handleImageChange} accept="image/*" />
                         {/* Show preview from state imageUrl (updated after successful upload) or from imageData (for immediate preview before upload) */}
                         {imageUrl && !imageData && <img src={imageUrl} alt="Uploaded Door Lock" style={{ maxWidth: '200px', marginTop: '10px' }}/>}
                         {imageData && <img src={imageData} alt="Preview Door Lock" style={{ maxWidth: '200px', marginTop: '10px' }}/>}
                         {imageUploadError && <p style={{ color: 'red' }}>{imageUploadError}</p>}
                    </div>


                    {/* Submit button */}
                    <button type="submit" disabled={loading}>
                         {loading ? 'Submitting...' : 'Submit Final'}
                    </button>
                </form>
            </main>
        </div>
    );
}

export default DoorLocksPage;