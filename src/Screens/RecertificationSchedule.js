import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'; // Corrected import
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

// Define questions array outside the component
const recertificationQuestions = [
    // Adapted from text input
    { name: "recertificationFrequencyEstablished", label: "Is there an established frequency for recertifying staff in First Aid/CPR?" },
    // Adapted from text input
    { name: "scheduleDeterminationBasedOnFactors", label: "Is the recertification schedule determined based on specific factors/regulations?" },
    { name: "recertificationVariations", label: "Are there variations in recertification requirements based on roles/needs/standards?" }, // Simplified
    // Adapted from text input
    { name: "notificationMethodsExist", label: "Are staff members notified of upcoming recertification deadlines?" },
    { name: "reminderSystem", label: "Is there a reminder system to alert staff in advance?" }, // Simplified
    // Adapted from text input
    { name: "communicationChannelsUsed", label: "Are appropriate communication channels utilized for reminders?" },
    // Adapted from text input
    { name: "recertificationProcessDefined", label: "Is there a defined process for staff to recertify?" },
    { name: "recertificationOptionsOffered", label: "Are various recertification options offered (on-site, online, external)?" }, // Simplified - Renamed 'recertificationOptions'
    // Adapted from text input
    { name: "recertificationSupportProvided", label: "Is support provided for recertification (scheduling flexibility, financial)?" },
    // Adapted from text input
    { name: "recertificationRecordsMaintained", label: "Are records of recertification status/completion maintained and up-to-date?" },
     // Adapted from text input
    { name: "certificateDistributionProcess", label: "Is there a process for issuing/distributing recertification credentials?" },
     // Adapted from text input
    { name: "recordsIntegrityMeasures", label: "Are measures in place to ensure accuracy/integrity of recertification records?" },
    // Adapted from text input
    { name: "evaluationFeedbackMechanism", label: "Is the effectiveness of the recertification process evaluated (e.g., via feedback)?" },
    { name: "staffFeedbackSolicited", label: "Are staff given opportunities to provide input on the recertification process?" }, // Simplified - Renamed 'staffFeedback'
    // Adapted from text input
    { name: "lessonsLearnedApplied", label: "Are lessons learned used to refine the recertification process?" } // Simplified - Renamed 'lessonsLearned'
];


function RecertificationScheduleFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    // Renamed variable for clarity
    const uploadRecertificationScheduleImage = httpsCallable(functions, 'uploadRecertificationScheduleImage');

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
            navigate('/BuildingandAddress');
            return;
        }

        const fetchFormData = async () => {
            setLoading(true);
            setLoadError(null);
             // Correct Firestore path
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Recertification Schedule', buildingId);

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

    // handleChange saves data immediately with correct structure
    const handleChange = async (e) => {
        const { name, value } = e.target;
        const newFormData = { ...formData, [name]: value };
        setFormData(newFormData);

        if (buildingId) {
            try {
                const buildingRef = doc(db, 'Buildings', buildingId);
                const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Recertification Schedule', buildingId);
                const dataToSave = {
                     ...newFormData,
                     building: buildingRef,
                     ...(imageUrl && { imageUrl: imageUrl })
                 };
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

    // handleSubmit uses Cloud Function and setDoc with correct structure
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
                // Use correct function variable name
                const uploadResult = await uploadRecertificationScheduleImage({
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

        const finalFormData = {
             ...formData,
             imageUrl: finalImageUrl,
        };
        setFormData(finalFormData);

        try {
            console.log("Saving final form data to Firestore...");
            const buildingRef = doc(db, 'Buildings', buildingId);
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Recertification Schedule', buildingId);
            // Save final data with correct structure, including building ref
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
        // Removed outer div if present
        <div className="form-page">
            <header className="header">
                <Navbar />
                <button className="back-button" onClick={handleBack}>←</button>
                <h1>Recertification Schedule Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Recertification Questions</h2> {/* Added main heading */}

                    {/* Single .map call for all questions with standardized rendering */}
                    {recertificationQuestions.map((question, index) => (
                        <div key={question.name} className="form-section"> {/* Use name for key */}
                            <label>{question.label}</label>
                            {/* Div for radio buttons */}
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
                            {/* Input for comments */}
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
                         <label htmlFor="imageUploadRecert">Upload Image (Optional):</label>
                         <input id="imageUploadRecert" type="file" onChange={handleImageChange} accept="image/*" />
                         {imageUrl && !imageData && <img src={imageUrl} alt="Uploaded Recertification related" style={{ maxWidth: '200px', marginTop: '10px' }} />}
                         {imageData && <img src={imageData} alt="Preview Recertification related" style={{ maxWidth: '200px', marginTop: '10px' }} />}
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

export default RecertificationScheduleFormPage;