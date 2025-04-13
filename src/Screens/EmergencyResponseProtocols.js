import React, { useState, useEffect } from 'react';
// Corrected Firestore imports
import { getFirestore, doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
// Added Functions imports
import { getFunctions, httpsCallable } from "firebase/functions";
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

// Define questions array outside the component
const responseProtocolQuestions = [
    // Corrected names to camelCase
    // Adapted from text input
    { name: "protocolsDevelopedBasedOnStandards", label: "Are protocols developed based on recognized standards/best practices?" },
    { name: "specificEmergencyTypes", label: "Are protocols tailored to specific emergency types faced by the organization?" },
    // Adapted from text input
    { name: "protocolConsiderationsIncluded", label: "Are key considerations (severity, resources, safety) included in protocol development?" },
    { name: "protocolReview", label: "Are protocols reviewed/updated periodically?" }, // Simplified
    // Adapted from text input
    { name: "immediateActionsDefined", label: "Are immediate actions outlined for various emergencies (evacuation, shelter-in-place)?" },
    { name: "initialResponseTraining", label: "Are staff trained on initial response steps (alerting, assessing, protecting)?" }, // Simplified
    // Adapted from text input
    { name: "protocolCommunicationEffective", label: "Are protocols clearly communicated to staff regarding roles/responsibilities?" },
    // Adapted from text input
    { name: "initiatorTeamsDesignated", label: "Are designated individuals/teams responsible for initiating immediate actions?" },
    // Adapted from text input
    { name: "externalCoordinationDefined", label: "Are protocols coordinated with external emergency services?" },
     // Adapted from text input
    { name: "communicationProceduresDefined", label: "Are communication procedures included within response protocols?" },
    // Adapted from text input
    { name: "notificationChannelsDefined", label: "Are established channels/protocols used for emergency notifications?" },
    // Adapted from text input
    { name: "communicationSystemsUtilized", label: "Are communication systems/technologies utilized for rapid/reliable info dissemination?" },
     // Adapted from text input
    { name: "backupMethodsInPlace", label: "Are backup communication methods or redundancy measures in place?" },
     // Adapted from text input
    { name: "communicationTrainingProvided", label: "Are staff trained on effective emergency communication practices?" },
     // Adapted from text input
    { name: "decisionAuthorityDelineated", label: "Is decision-making authority clearly delineated in protocols?" },
    { name: "decisionFrameworkTraining", label: "Are staff trained on the decision-making framework?" }, // Simplified
     // Adapted from text input
    { name: "empowermentMechanismsExist", label: "Are mechanisms in place to empower staff for informed decisions/actions?" },
     // Adapted from text input
    { name: "delegationProtocolsExist", label: "Are protocols defined for delegating decision-making authority?" },
    // Adapted from text input
    { name: "decisionDocumentationProcess", label: "Are decisions documented/communicated for transparency/accountability?" },
     // Adapted from text input
    { name: "trainingMethodsEffective", label: "Are effective training methods used (classroom, practical exercises)?" },
    { name: "scenarioDrillsConducted", label: "Are scenario-based drills conducted to practice protocols realistically?" }, // Simplified - Renamed 'scenarioDrills'
     // Adapted from text input
    { name: "drillFrequencySufficient", label: "Are training/drills conducted frequently enough?" },
    { name: "debriefingSessionsHeld", label: "Are debriefing sessions held after exercises to review/improve?" }, // Simplified - Renamed 'debriefingSessions'
    // Adapted from text input
    { name: "retentionMeasuresInPlace", label: "Are measures in place to ensure knowledge/skill retention (refreshers)?" },
     // Adapted from text input
    { name: "protocolDocumentationAccessible", label: "Are protocols documented and disseminated accessibly/consistently?" },
    // Adapted from text input
    { name: "protocolReviewEvaluationRegular", label: "Are protocols regularly reviewed/evaluated for effectiveness?" },
     // Adapted from text input
    { name: "performanceMetricsUsed", label: "Are metrics/indicators used to measure protocol performance?" },
    { name: "postIncidentAnalysesConducted", label: "Are post-incident analyses conducted to evaluate protocol implementation?" }, // Simplified - Renamed 'postIncidentAnalyses'
    // Adapted from text input
    { name: "lessonsLearnedShared", label: "Are lessons learned shared organization-wide?" } // Simplified - Renamed 'lessonsLearnedSharing'
];


function ResponseProtocolsFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    // Renamed variable for clarity
    const uploadResponseProtocolsImage = httpsCallable(functions, 'uploadResponseProtocolsImage');

    // State variables look good
    const [formData, setFormData] = useState({});
    const [imageData, setImageData] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);

    // useEffect for fetching data - Adjusted imageUrl fetch
    useEffect(() => {
        if (!buildingId) {
            alert('No building selected. Redirecting to Building Info...');
            navigate('/BuildingandAddress');
            return;
        }

        const fetchFormData = async () => {
            setLoading(true);
            setLoadError(null);
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Emergency Response Protocols', buildingId);

            try {
                const docSnapshot = await getDoc(formDocRef);
                if (docSnapshot.exists()) {
                    const existingData = docSnapshot.data().formData || {};
                    setFormData(existingData);
                     // Fetch imageUrl from within formData
                    setImageUrl(existingData.imageUrl || null);
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
                const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Emergency Response Protocols', buildingId);
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

        if (imageData) { // Check base64 data
            try {
                console.log("Uploading image via Cloud Function...");
                // Use correct function variable name
                const uploadResult = await uploadResponseProtocolsImage({
                    imageData: imageData, // Send base64 data
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

        // Prepare final data object including definitive image URL
        const finalFormData = {
             ...formData,
             imageUrl: finalImageUrl,
             // updatedAt: serverTimestamp() // Add timestamp if needed HERE, not at top level
        };
        setFormData(finalFormData); // Update state to final version

        try {
            console.log("Saving final form data to Firestore...");
            const buildingRef = doc(db, 'Buildings', buildingId);
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Emergency Response Protocols', buildingId);
             // Save final data with correct structure, including building ref INSIDE formData
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
        // Removed outer div
        <div className="form-page">
            <header className="header">
                <Navbar />
                <button className="back-button" onClick={handleBack}>←</button>
                <h1>Response Protocols Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Response Protocol Questions</h2> {/* Added main heading */}

                    {/* Single .map call for all questions with standardized rendering */}
                    {responseProtocolQuestions.map((question, index) => (
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
                        <label htmlFor="imageUploadResponseProto">Upload Image (Optional):</label>
                        <input id="imageUploadResponseProto" type="file" onChange={handleImageChange} accept="image/*" />
                        {imageUrl && !imageData && <img src={imageUrl} alt="Uploaded Response Protocol related" style={{ maxWidth: '200px', marginTop: '10px' }} />}
                        {imageData && <img src={imageData} alt="Preview Response Protocol related" style={{ maxWidth: '200px', marginTop: '10px' }} />}
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

export default ResponseProtocolsFormPage;