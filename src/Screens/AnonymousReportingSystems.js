import React, { useState, useEffect } from 'react';
// Updated imports for Firestore get/set and Cloud Functions
import { getFirestore, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
// Added Firebase Functions imports, removed Storage imports
import { getFunctions, httpsCallable } from "firebase/functions";

function AnonymousReportingSystemsFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    // Initialize Firebase Functions
    const functions = getFunctions();
    // Define the httpsCallable function according to the naming convention
    const uploadImage = httpsCallable(functions, 'uploadAnonymousReportingSystemsFormPageImage');

    // Standardized state variables
    const [formData, setFormData] = useState({});
    const [imageData, setImageData] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);

    // Define Firestore path
    const formDocPath = 'forms/Personnel Training and Awareness/Anonymous Reporting Systems';

    useEffect(() => {
        if (!buildingId) {
            alert('No building selected. Redirecting to Building Info...');
            navigate('/BuildingandAddress'); // Adjust route if needed
            return;
        }

        // Fetch existing form data
        const fetchFormData = async () => {
            setLoading(true);
            setLoadError(null);
            setImageUrl(null);

            try {
                const formDocRef = doc(db, formDocPath, buildingId);
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
    }, [buildingId, db, navigate, formDocPath]);

    // Standard handleChange with auto-save
    const handleChange = async (e) => {
        const { name, value } = e.target;
        const newFormData = { ...formData, [name]: value };
        setFormData(newFormData);

        if (buildingId) {
            try {
                const buildingRef = doc(db, 'Buildings', buildingId);
                const formDocRef = doc(db, formDocPath, buildingId);
                await setDoc(formDocRef, {
                    formData: { ...newFormData, building: buildingRef, imageUrl: imageUrl }
                }, { merge: true });
                console.log("Form data auto-saved:", { ...newFormData, building: buildingRef, imageUrl: imageUrl });
            } catch (error) {
                console.error("Error auto-saving form data:", error);
                // Handle error appropriately
            }
        }
    };

    // Standard handleImageChange using FileReader
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

    // Standard handleBack
    const handleBack = () => {
        navigate(-1);
    };

    // Standard handleSubmit using httpsCallable and setDoc
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!buildingId) {
            alert('Building ID is missing. Cannot submit.');
            return;
        }

        let finalImageUrl = imageUrl;

        if (imageData) {
            setLoading(true);
            setImageUploadError(null);
            try {
                const uploadResult = await uploadImage({ imageData: imageData, buildingId: buildingId, formType: 'AnonymousReportingSystems' });
                finalImageUrl = uploadResult.data.imageUrl;
                setImageUrl(finalImageUrl);
                console.log('Image uploaded successfully:', finalImageUrl);
            } catch (error) {
                console.error('Error uploading image:', error);
                setImageUploadError(`Image upload failed: ${error.message}. Please try again.`);
                setLoading(false);
                return;
            } finally {
                setLoading(false);
            }
        }

        try {
            setLoading(true);
            const buildingRef = doc(db, 'Buildings', buildingId);
            const formDocRef = doc(db, formDocPath, buildingId);
            const finalFormData = { ...formData, imageUrl: finalImageUrl, building: buildingRef };
            await setDoc(formDocRef, { formData: finalFormData }, { merge: true });

            console.log('Form data submitted successfully!');
            alert('Form submitted successfully!');
            navigate('/Form'); // Adjust final navigation route
        } catch (error) {
            console.error("Error submitting final form data:", error);
            alert("Failed to submit form. Please check your connection and try again.");
            setLoading(false);
        }
    };

     // Conditional Loading/Error display
    if (loading && !Object.keys(formData).length) {
        return <div>Loading...</div>;
    }

    if (loadError) {
        return <div>Error: {loadError}</div>;
    }

    // Consolidated questions array
    const questions = [
        // Accessibility and Utilization
        { name: "diverseChannelsProvided", label: "Are diverse channels provided for anonymous reporting, ensuring all students feel comfortable?" },
        { name: "awarenessStrategiesEmployed", label: "Are strategies employed to promote awareness and encourage regular use of the system among students, staff, and parents?" },
        { name: "channelEffectivenessAssessed", label: "Is the effectiveness of reporting channels assessed, with adjustments made based on feedback/usage?" },
        { name: "provisionsForAccessBarriers", label: "Are provisions in place to accommodate individuals facing access barriers (e.g., language, disabilities)?" },
        // Confidentiality and Trust
        { name: "anonymityEnsuredProtected", label: "Is the anonymity of reporters ensured, with measures to protect their identity?" },
        { name: "protocolsAddressConfidentialityConcerns", label: "Are protocols in place to address concerns about potential breaches or misuse of the system?" },
        { name: "trustMaintainedReinforced", label: "Is trust in the system maintained/reinforced, especially regarding anonymity vs. accountability concerns?" },
        { name: "feedbackMechanismsRespectAnonymity", label: "Are there mechanisms for providing feedback/updates to anonymous reporters while respecting anonymity?" },
        // Response and Follow-Up
        { name: "reviewInvestigationProcedures", label: "Are procedures in place for reviewing/investigating reports and communicating findings?" },
        { name: "reportsPrioritizedTimelyResponse", label: "Are reports prioritized (severity, urgency) with mechanisms for timely responses?" },
        { name: "followUpActionsTakenInformed", label: "Are follow-up actions taken, and are reporters kept informed about outcomes?" },
        { name: "ongoingDialoguePossible", label: "Are there opportunities for ongoing dialogue with anonymous reporters if needed?" },
        // Data Analysis and Trend Identification
        { name: "dataAnalyzedForTrends", label: "Is data from anonymous reports analyzed to identify trends/patterns related to bullying?" },
        { name: "insightsSharedInformDecision", label: "Are insights/findings shared with stakeholders to inform decision-making/resource allocation?" },
        { name: "systemEffectivenessReviewed", label: "Are there regular reviews/assessments of the reporting system's effectiveness based on data?" },
        { name: "findingsIncorporatedPrevention", label: "Are findings incorporated into broader efforts to prevent/address bullying?" },
    ];

    return (
        <div className="form-page">
            <header className="header">
                <Navbar />
                <button className="back-button" onClick={handleBack}>←</button>
                <h1>Anonymous Reporting Systems Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    {/* Single heading */}
                    <h2>Anonymous Reporting Systems Questions</h2>
                    {questions.map((question, index) => (
                        // Standard question block rendering
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
                                className="comment-box"
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
    );
}

export default AnonymousReportingSystemsFormPage;