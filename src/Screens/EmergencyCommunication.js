import React, { useState, useEffect } from 'react';
// Removed unused Storage imports
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

// Define questions array outside the component
const emergencyCommunicationQuestions = [
    // Adapted from text input
    { name: "dedicatedSystemsExist", label: "Are dedicated communication systems (e.g., phone, radio) established for alerting authorities?" },
    { name: "multipleChannels", label: "Do these systems include multiple appropriate channels (e.g., telephone, radio, text)?" }, // Slightly rephrased
    { name: "efficientSystems", label: "Are communication systems capable of reaching relevant authorities quickly and efficiently?" }, // Simplified label
    { name: "emergencyContactLists", label: "Have up-to-date emergency contact lists been established for relevant authorities (law enforcement, fire, medical)?" }, // Combined points
    // { name: "updatedContactDetails", label: "Are contact details regularly updated to ensure accuracy and reliability?" }, // Merged into previous
    { name: "designatedPoc", label: "Is there a designated point of contact responsible for initiating communication with authorities?" },
    // Adapted from text input
    { name: "notificationProtocolsExist", label: "Are clear protocols defined for when and how to notify authorities for different emergencies?" },
    { name: "staffRolesDefined", label: "Do staff members understand their roles/responsibilities in initiating communication?" }, // Simplified label
    { name: "chainOfCommand", label: "Is there a clear hierarchy or chain of command for escalating emergency notifications?" },
    { name: "swiftAlertingProcess", label: "Is the process for alerting authorities designed to be swift and efficient?" }, // Simplified label
    { name: "systemsTestedRegularly", label: "Are communication systems tested regularly to ensure proper function?" }, // Simplified label
    // Adapted from text input
    { name: "backupSystemsExist", label: "Are redundancies or backup systems in place to mitigate communication failures?" },
    { name: "accurateInfoTraining", label: "Are staff trained to provide accurate and detailed information when alerting authorities?" }, // Simplified label
    { name: "essentialDetailTraining", label: "Do they know how to convey essential details (nature, location, persons affected, hazards)?" }, // Simplified label
    // Adapted from text input
    { name: "infoVerificationMechanism", label: "Is a mechanism in place for verifying information before communicating it to authorities?" },
    { name: "agencyCoordination", label: "Is there coordination and collaboration with authorities to establish communication protocols?" }, // Simplified label
    // Adapted from text input
    { name: "agencyContactProceduresExist", label: "Are specific contact points and procedures established to facilitate communication with responding agencies?" },
    { name: "jointMeetingsExercises", label: "Are regular meetings or exercises conducted with authorities to review/refine communication processes?" }, // Simplified label
    { name: "proceduresDocumented", label: "Are emergency communication procedures documented in written policies or protocols?" }, // Simplified label
    // Adapted from text input
    { name: "reviewEvaluationProcessExists", label: "Is there a defined process for reviewing/evaluating communication effectiveness during drills or incidents?" },
    { name: "lessonsLearnedApplied", label: "Are lessons learned from past emergencies used to improve communication procedures?" } // Simplified label
];


function EmergencyCommunicationFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    // Correct httpsCallable definition
    const uploadImage = httpsCallable(functions, 'uploadEmergencyCommunicationImage'); // Renamed var

    // State variables look good
    const [formData, setFormData] = useState({});
    const [imageData, setImageData] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);

    // useEffect for fetching data - Looks good
    useEffect(() => {
        if (!buildingId) {
            alert('No building selected. Redirecting to Building Info...');
            navigate('/BuildingandAddress'); // Ensure path is correct
            return;
        }

        const fetchFormData = async () => {
            setLoading(true);
            setLoadError(null);
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Emergency Communication', buildingId);

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

    // handleChange saves data immediately, including buildingRef and imageUrl
    const handleChange = async (e) => {
        const { name, value } = e.target;
        const newFormData = { ...formData, [name]: value };
        setFormData(newFormData);

        if (buildingId) {
            try {
                const buildingRef = doc(db, 'Buildings', buildingId); // Get building reference
                const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Emergency Communication', buildingId);
                const dataToSave = {
                     ...newFormData,
                     building: buildingRef, // Include building reference
                     // Include existing imageUrl, prevents it being overwritten by handleChange alone
                     ...(imageUrl && { imageUrl: imageUrl })
                 };
                 // Save the data under the 'formData' key
                await setDoc(formDocRef, { formData: dataToSave }, { merge: true });
                // console.log("Form data updated:", dataToSave);
            } catch (error) {
                console.error("Error saving form data to Firestore:", error);
                // Avoid alerting on every change
            }
        }
    };

    // handleImageChange using base64 - Looks good
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

    // handleBack - Looks good
    const handleBack = () => {
        navigate(-1);
    };

    // handleSubmit uses Cloud Function and setDoc - Corrected save structure
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
                const uploadResult = await uploadImage({ // Use correct var name
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

        // Construct final data object including buildingRef and finalImageUrl
        const finalFormData = {
             ...formData,
             imageUrl: finalImageUrl,
             // No need to add buildingRef here, it's added in the final setDoc structure
        };
        setFormData(finalFormData); // Update state to final version

        try {
            console.log("Saving final form data to Firestore...");
            const buildingRef = doc(db, 'Buildings', buildingId);
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Emergency Communication', buildingId);
            // Save the final data under the 'formData' key, including the building reference
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

    // Loading/Error Display - Looks good
    if (loading) {
        return <div>Loading...</div>;
    }
    if (loadError) {
        return <div>Error: {loadError}</div>;
    }

    return (
        // Removed extra outer div
        <div className="form-page">
            <header className="header">
                <Navbar />
                <button className="back-button" onClick={handleBack}>←</button>
                <h1>Emergency Communication Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Emergency Communication Assessment Questions</h2>

                    {/* Single .map call for all questions with standardized rendering */}
                    {emergencyCommunicationQuestions.map((question, index) => (
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
                            {/* Use input type="text" for comments */}
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
                        <label htmlFor="imageUploadEmergencyComm">Upload Image (Optional):</label>
                        <input id="imageUploadEmergencyComm" type="file" onChange={handleImageChange} accept="image/*" />
                        {imageUrl && !imageData && <img src={imageUrl} alt="Uploaded Emergency Comm related" style={{ maxWidth: '200px', marginTop: '10px' }} />}
                        {imageData && <img src={imageData} alt="Preview Emergency Comm related" style={{ maxWidth: '200px', marginTop: '10px' }} />}
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

export default EmergencyCommunicationFormPage;