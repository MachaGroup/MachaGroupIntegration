import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function SpeakerLocationsFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadImage = httpsCallable(functions, 'uploadSpeakerLocationsImage');

    const [formData, setFormData] = useState({});
    const [imageData, setImageData] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);

    useEffect(() => {
        if (!buildingId) {
            alert('No building selected. Redirecting to Building Info...');
            navigate('BuildingandAddress');
            return;
        }

        const fetchFormData = async () => {
            setLoading(true);
            setLoadError(null);

            try {
                const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Speaker Locations', buildingId);
                const docSnapshot = await getDoc(formDocRef);

                if (docSnapshot.exists()) {
                    setFormData(docSnapshot.data().formData || {});
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

    const handleChange = async (e) => {
        const { name, value } = e.target;
        const newFormData = { ...formData, [name]: value };
        setFormData(newFormData);
 
        try {
            const buildingRef = doc(db, 'Buildings', buildingId); // Create buildingRef
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Speaker Locations', buildingId);
            await setDoc(formDocRef, { formData: { ...newFormData, building: buildingRef } }, { merge: true }); // Use merge and add building
            console.log("Form data saved to Firestore:", { ...newFormData, building: buildingRef });
        } catch (error) {
            console.error("Error saving form data to Firestore:", error);
            alert("Failed to save changes. Please check your connection and try again.");
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageData(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleBack = () => {
        navigate(-1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!buildingId) {
            alert('Building ID is missing. Please start from the Building Information page.');
            return;
        }

        if (imageData) {
            try {
                const uploadResult = await uploadImage({ imageData: imageData });
                setImageUrl(uploadResult.data.imageUrl);
                setFormData({ ...formData, imageUrl: uploadResult.data.imageUrl });
                setImageUploadError(null);
            } catch (error) {
                console.error('Error uploading image:', error);
                setImageUploadError(error.message);
            }
        }

        try {
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Speaker Locations', buildingId);
            await setDoc(formDocRef, { formData: formData }, { merge: true });
            console.log('Form data submitted successfully!');
            alert('Form submitted successfully!');
            navigate('/Form');
        } catch (error) {
            console.error("Error saving form data to Firestore:", error);
            alert("Failed to save changes. Please check your connection and try again.");
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (loadError) {
        return <div>Error: {loadError}</div>;
    }

    return (
        <div className="form-page">
            <header className="header">
                <Navbar />
                <button className="back-button" onClick={handleBack}>←</button>
                <h1>Speaker Locations Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Speaker Locations Assessment</h2>
                    {[
                        { name: "strategicallyLocatedSpeakers", label: "Are public address (PA) system speakers strategically located throughout the school to ensure comprehensive coverage?" },
                        { name: "minimizingDeadZones", label: "Have speaker locations been assessed to minimize dead zones or areas with poor sound quality?" },
                        { name: "speakerPositioning", label: "Are speakers positioned in key areas such as classrooms, hallways, common areas, and outdoor spaces to reach all occupants?" },
                        { name: "deliveringAudioMessages", label: "Is the PA system capable of delivering clear and intelligible audio messages throughout the school?" },
                        { name: "annoucementMeasures", label: "Have measures been taken to ensure that announcements are audible over ambient noise and distractions?" },
                        { name: "adjustedSpeakerVolumes", label: "Are speaker volumes adjusted to appropriate levels to prevent discomfort or distortion?" },
                        { name: "redundancyFeatures", label: "Is the PA system equipped with redundancy features to ensure continued operation in the event of equipment failures or power outages?" },
                        { name: "backupPowerSources", label: "Are backup power sources, such as batteries or generators, available to support the PA system during emergencies?" },
                        { name: "reliabilityTesting", label: "Is the PA system regularly tested to verify its reliability and functionality, including speaker performance and signal transmission?" },
                        { name: "draftingProcedures", label: "Are procedures established for drafting and delivering emergency messages over the PA system?" },
                        { name: "trainedSystemOperators", label: "Are PA system operators trained on message content, delivery techniques, and protocols for initiating alerts and announcements?" },
                        { name: "standardizedEmergencyMessages", label: "Is there a standardized format for emergency messages to ensure clarity, consistency, and effectiveness?" },
                        { name: "integratedSystem", label: "Is the PA system integrated into broader emergency communication and response plans?" },
                        { name: "coordinatedAlerts", label: "Are PA system alerts coordinated with other communication channels and alert systems to ensure timely and coherent messaging?" },
                        { name: "systemProcedures", label: "Are PA system procedures aligned with emergency protocols for specific scenarios, such as evacuations, lockdowns, or sheltering?" },
                        { name: "emergencyMessagingAccommodations", label: "Have accommodations been made to ensure that emergency messages delivered via the PA system are accessible to individuals with disabilities?" },
                        { name: "alternativeCommunicationMethods", label: "Are alternative communication methods available for individuals who may have difficulty hearing or understanding PA system announcements?" },
                        { name: "languageBarrierProcedures", label: "Have procedures been established to address language barriers or other communication needs during emergencies?" },
                        { name: "maintainingSpeakers", label: "Is the PA system regularly maintained to keep speakers in good working condition and address any issues promptly?" },
                        { name: "routineTests", label: "Are routine tests and inspections conducted to verify the functionality of the PA system, including speaker performance and audio quality?" },
                        { name: "maintainingDocuments", label: "Are records maintained to document maintenance activities, tests, and any corrective actions taken to address deficiencies?" },
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
                            />
                        </div>
                    ))}
                    <input type="file" onChange={handleImageChange} accept="image/*" />
                    {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
                    {imageUploadError && <p style={{ color: 'red' }}>{imageUploadError}</p>}
                    <button type="submit">Submit</button>
                </form>
            </main>
        </div>
    );
}

export default SpeakerLocationsFormPage;