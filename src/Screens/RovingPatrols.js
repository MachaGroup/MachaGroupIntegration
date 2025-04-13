import React, { useState, useEffect } from 'react';
// Firestore imports aligned with the standard pattern
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'; // Removed unused 'collection'
// Firebase Functions imports
import { getFunctions, httpsCallable } from "firebase/functions";
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css'; // Assuming same CSS file
import logo from '../assets/MachaLogo.png'; // Assuming same logo
import Navbar from "./Navbar"; // Assuming same Navbar

// Define questions array outside the component
const rovingPatrolsQuestions = [
    // Patrol Routes and Coverage
    { name: "regularPatrols", label: "Are roving patrols conducted regularly covering critical areas/vulnerabilities?" }, // Simplified
    { name: "wellDefinedRoutes", label: "Are patrol routes well-defined for comprehensive coverage (indoor/outdoor)?" }, // Simplified
    // Adapted from text input
    { name: "specialAttentionAreasDesignated", label: "Are specific areas/zones designated for special attention or increased frequency?" },
    // Frequency and Timing
    // Adapted from text input
    { name: "patrolFrequencyAppropriate", label: "Is the frequency and interval of patrols appropriate for the facility's needs?" },
    { name: "randomIntervals", label: "Are patrols conducted at random intervals to deter predictability?" }, // Simplified
    { name: "additionalPatrols", label: "Are additional patrols scheduled during high-risk periods or events?" },
    // Observation and Vigilance
    { name: "activeMonitoring", label: "Do officers actively monitor for unauthorized access or suspicious behavior?" }, // Simplified
    { name: "threatResponseTraining", label: "Are they trained to recognize and respond to potential threats?" }, // Simplified - Renamed 'threatResponse'
    { name: "thoroughInspections", label: "Do officers conduct thorough inspections of access points during patrols?" },
    // Response to Incidents
    { name: "incidentResponseEquipped", label: "Are officers equipped to respond promptly to incidents/alarms during patrols?" }, // Simplified - Renamed 'incidentResponse'
    { name: "emergencyProceduresKnowledge", label: "Do they know how to initiate emergency procedures and contact authorities?" }, // Simplified - Renamed 'emergencyProcedures'
    { name: "coordinationWithGuards", label: "Is there a system to coordinate with stationed guards if needed?" },
    // Documentation and Reporting
    { name: "detailedRecords", label: "Are officers required to maintain detailed records of patrol activities/observations?" },
    { name: "reportingProcess", label: "Is there a standardized reporting process for incidents/issues found?" }, // Simplified
    { name: "reportReviews", label: "Are patrol reports reviewed regularly by management for trends/risks?" }, // Simplified
    // Communication and Coordination
    { name: "effectiveCommunication", label: "Is there effective communication between roving/stationed guards and management?" }, // Simplified
    { name: "communicationDevices", label: "Are patrol officers equipped with reliable communication devices?" },
    { name: "centralizedCommunication", label: "Is there a centralized system/protocol for relaying information?" }, // Simplified
    // Training and Preparedness
    { name: "adequateTraining", label: "Are officers adequately trained in procedures, emergency response, and patrol techniques?" },
    { name: "ongoingTraining", label: "Do they receive ongoing training on threats and emerging risks?" },
    { name: "situationHandling", label: "Are officers prepared to handle various situations professionally?" }, // Simplified
];

function RovingPatrolsPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
     // Renamed variable for clarity
    const uploadRovingPatrolsImage = httpsCallable(functions, 'uploadRovingPatrolsImage');

    // State aligned with the standard pattern - Looks good
    const [formData, setFormData] = useState({});
    const [imageData, setImageData] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);

    // useEffect for fetching data on load - Looks good
    useEffect(() => {
        if (!buildingId) {
            alert('No building selected. Redirecting to Building Info...');
            navigate('/BuildingandAddress');
            return;
        }

        const fetchFormData = async () => {
            setLoading(true);
            setLoadError(null);
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Roving Patrols', buildingId);

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
                const formDocRef = doc(db, 'forms', 'Physical Security', 'Roving Patrols', buildingId);
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
                const uploadResult = await uploadRovingPatrolsImage({
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
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Roving Patrols', buildingId);
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
                <h1>Roving Patrols Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Roving Patrol Assessment Questions</h2> {/* Simplified heading */}

                    {/* Single .map call for all questions with standardized rendering */}
                    {rovingPatrolsQuestions.map((question, index) => (
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
                         <label htmlFor="imageUploadRoving">Upload Image (Optional):</label>
                         <input id="imageUploadRoving" type="file" onChange={handleImageChange} accept="image/*" />
                         {imageUrl && !imageData && <img src={imageUrl} alt="Uploaded Roving Patrol related" style={{ maxWidth: '200px', marginTop: '10px' }} />}
                         {imageData && <img src={imageData} alt="Preview Roving Patrol related" style={{ maxWidth: '200px', marginTop: '10px' }} />}
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

export default RovingPatrolsPage;