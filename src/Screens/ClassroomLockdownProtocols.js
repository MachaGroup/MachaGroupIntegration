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
const lockdownQuestions = [
    // Door Locks
    { name: "classroomDoorsLocks", label: "Are classroom doors equipped with locks that can be securely engaged from the inside?" },
    { name: "locksSafetyStandard", label: "Do locks meet safety standards and regulations for lockdown procedures?" },
    { name: "lockOperational", label: "Are locks easy to operate and reliably secure under stress?" }, // Simplified
    // Barricading Mechanisms
    { name: "barricadingMechanismAvailable", label: "Are barricading mechanisms available in classrooms to reinforce door security?" }, // Renamed 'barricadingMechanism'
    { name: "barricadingDeviceOperational", label: "Do barricading devices effectively prevent unauthorized entry?" }, // Simplified
    { name: "barricadingDeviceEfficiency", label: "Are barricading devices designed for quick deployment/removal by authorized personnel?" },
    // Training and Drills
    { name: "lockdownProcedureTraining", label: "Are staff/students trained in lockdown procedures (incl. barricading)?" }, // Simplified
    { name: "regularLockdownDrills", label: "Are drills conducted regularly to practice lockdown scenarios?" }, // Simplified
    { name: "regularlyLockdownDebriefing", label: "Are debriefings held after drills to review performance and improve?" }, // Simplified
    // Communication Systems
    { name: "lockdownCommunicationSystem", label: "Is there a communication system to alert occupants of lockdowns/provide instructions?" },
    { name: "emergencyCommunicationDevices", label: "Are emergency communication devices accessible in classrooms?" }, // Simplified
    { name: "designatedProtocol", label: "Is there a designated protocol for reporting suspicious activity/threats?" }, // Simplified
    // Safe Zones and Hiding Places
    { name: "designatedSafeZones", label: "Are there designated safe zones or hiding places within classrooms?" },
    { name: "strategicSafeZones", label: "Are these areas strategically located for cover and concealment?" }, // Simplified
    { name: "safeZonesVulnerabilities", label: "Have safe zones been assessed/reinforced for potential vulnerabilities?" }, // Simplified
    // Coordination with Authorities
    { name: "personelCoordination", label: "Is there coordination between school personnel and local law enforcement on lockdown procedures?" },
    { name: "lawEnforcementFamiliarity", label: "Are law enforcement familiar with school layouts and lockdown plans?" }, // Simplified
    { name: "lawEnforcementReview", label: "Are regular meetings or exercises conducted with law enforcement?" }, // Simplified
    // Parent and Guardian Communication
    { name: "guardiansInformed", label: "Are parents/guardians informed of lockdown procedures and expectations?" }, // Simplified
    { name: "guardiansCommunicationPlan", label: "Is there a communication plan for notifying parents/guardians during/after lockdowns?" }, // Simplified - Renamed 'guardiansCommunication'
    { name: "availableSupportServices", label: "Are resources/support services available to assist families with emotional impact?" } // Simplified
];


function ClassroomLockdownProtocolsFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    // Renamed variable for clarity
    const uploadClassroomLockdownProtocolsImage = httpsCallable(functions, 'uploadClassroomLockdownProtocolsImage');

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
             // Correct Firestore path
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Classroom Lockdown Protocols', buildingId);

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
                const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Classroom Lockdown Protocols', buildingId);
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
                const uploadResult = await uploadClassroomLockdownProtocolsImage({
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
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Classroom Lockdown Protocols', buildingId);
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
                <h1>Classroom Lockdown Procedures Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                     <h2>Classroom Lockdown Questions</h2> {/* Added main heading */}
                    {/* Single .map call for all questions with standardized rendering */}
                    {lockdownQuestions.map((question, index) => (
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
                         <label htmlFor="imageUploadLockdown">Upload Image (Optional):</label>
                         <input id="imageUploadLockdown" type="file" onChange={handleImageChange} accept="image/*" />
                         {imageUrl && !imageData && <img src={imageUrl} alt="Uploaded Lockdown related" style={{ maxWidth: '200px', marginTop: '10px' }} />}
                         {imageData && <img src={imageData} alt="Preview Lockdown related" style={{ maxWidth: '200px', marginTop: '10px' }} />}
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

export default ClassroomLockdownProtocolsFormPage;