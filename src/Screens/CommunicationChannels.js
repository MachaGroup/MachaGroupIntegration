import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
// Corrected Firestore imports
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
// Added Functions imports
import { getFunctions, httpsCallable } from "firebase/functions";
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import Navbar from "./Navbar";

// Define questions array outside the component
const commChannelQuestions = [
    // Corrected names to camelCase
    // Designation of Communication Channels
    { name: "designatedCommunicationChannels", label: "Are specific channels designated for different communication needs (emergency, general, departmental)?" }, // Simplified
    { name: "clearDelineation", label: "Is the purpose/usage guidelines clear for each channel?" }, // Simplified
    // Emergency Communication Frequency
    { name: "reservedFrequency", label: "Is a frequency/channel specifically reserved for emergencies?" }, // Simplified
    { name: "trainedStaffEmergency", label: "Are staff trained on accessing/using the emergency channel?" }, // Simplified
    // Channel Management and Coordination
    { name: "managingProtocol", label: "Is there a protocol for managing/coordinating channels to prevent interference?" }, // Simplified
    { name: "reallocatingProcedures", label: "Are procedures established for reallocating channels if needed?" }, // Simplified
    // Compatibility with Equipment
    { name: "compatibleChannels", label: "Are channels compatible with equipment used by staff (radios, mobile devices)?" }, // Simplified
    { name: "compatibilityTesting", label: "Is compatibility testing conducted for interoperability?" }, // Simplified
    // Redundancy and Contingency Planning
    { name: "redundantCommunicationChannels", label: "Are redundant channels or backup options available?" }, // Simplified
    { name: "contingencyPlan", label: "Is a contingency plan in place for switching channels if primary fails?" }, // Simplified
    // Training and Familiarization
    { name: "staffTrainedOnChannels", label: "Are staff trained on accessing/selecting/utilizing channels effectively?" }, // Simplified - Renamed 'trainedStaffTraining'
    { name: "practiceSessions", label: "Are practice sessions/drills conducted for familiarization?" }, // Simplified
    // Integration with Emergency Plans
    { name: "integratedCommunicationChannels", label: "Are designated channels integrated into broader emergency plans?" }, // Simplified
    { name: "incorporatingChannelProcedures", label: "Are procedures defined for incorporating channel usage into drills?" }, // Simplified
    // Continuous Improvement
    { name: "feedbackMechanisms", label: "Are feedback mechanisms in place regarding channel usability/reliability?" }, // Simplified
    { name: "enhancingRecommendations", label: "Are recommendations considered/implemented for enhancement?" } // Simplified
];


function CommunicationChannelsFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    // Renamed variable to match function name string
    const uploadCommunicationChannelsImage = httpsCallable(functions, 'uploadCommunicationChannelsImage');

    // Corrected state variables
    const [formData, setFormData] = useState({});
    const [imageData, setImageData] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(null); // Added loadError

    // useEffect using getDoc by ID with CORRECT path
    useEffect(() => {
        if (!buildingId) {
            alert('No building selected. Redirecting to Building Info...');
            navigate('/BuildingandAddress');
            return;
        }

        const fetchFormData = async () => {
            setLoading(true);
            setLoadError(null);
            // Correct Firestore path for this component
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Communication Channels', buildingId);

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

    // handleChange saves immediately using setDoc by ID with correct structure
    const handleChange = async (e) => {
        const { name, value } = e.target;
        const newFormData = { ...formData, [name]: value };
        setFormData(newFormData);

        if (buildingId) {
            try {
                const buildingRef = doc(db, 'Buildings', buildingId);
                 // Correct Firestore path
                const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Communication Channels', buildingId);
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

    // handleImageChange using base64
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

    // handleBack simplified
    const handleBack = () => {
        navigate(-1);
    };

    // handleSubmit uses Cloud Function and setDoc by ID with correct structure
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
                const uploadResult = await uploadCommunicationChannelsImage({
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
             // Correct Firestore path
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Communication Channels', buildingId);
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

    // Loading/Error Display
    if (loading) {
        return <div>Loading...</div>;
    }
    if (loadError) {
        return <div>Error: {loadError}</div>;
    }

    return (
         // Removed outer div
        <div className="form-page">
            <header className="header">
                <Navbar />
                <button className="back-button" onClick={handleBack}>←</button>
                <h1>Communication Channels Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                     <h2>Communication Channel Questions</h2> {/* Added main heading */}

                    {/* Single .map call for all questions with standardized rendering */}
                    {commChannelQuestions.map((question, index) => (
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
                         <label htmlFor="imageUploadCommChannel">Upload Image (Optional):</label>
                         <input id="imageUploadCommChannel" type="file" onChange={handleImageChange} accept="image/*" />
                         {imageUrl && !imageData && <img src={imageUrl} alt="Uploaded Comm Channel related" style={{ maxWidth: '200px', marginTop: '10px' }} />}
                         {imageData && <img src={imageData} alt="Preview Comm Channel related" style={{ maxWidth: '200px', marginTop: '10px' }} />}
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

export default CommunicationChannelsFormPage;