import React, { useState, useEffect } from 'react';
import { getFirestore, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function InfraredCamerasPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadInfraredCamerasImage = httpsCallable(functions, 'uploadInfraredCamerasImage');

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
                const formDocRef = doc(db, 'forms', 'Physical Security', 'Infrared Cameras', buildingId);
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
            const buildingRef = doc(db, 'Buildings', buildingId);
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Infrared Cameras', buildingId);
            await setDoc(formDocRef, { formData: { ...newFormData, building: buildingRef } }, { merge: true });
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
                const uploadResult = await uploadInfraredCamerasImage({ imageData: imageData });
                setImageUrl(uploadResult.data.imageUrl);
                setFormData({ ...formData, imageUrl: uploadResult.data.imageUrl });
                setImageUploadError(null);
            } catch (error) {
                console.error('Error uploading image:', error);
                setImageUploadError(error.message);
            }
        }

        try {
            const buildingRef = doc(db, 'Buildings', buildingId);
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Infrared Cameras', buildingId);
            await setDoc(formDocRef, { formData: { ...formData, building: buildingRef } }, { merge: true });
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
                <h1>Infrared Cameras Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Infrared Cameras Assessment</h2>
                    {[
                        { name: "lowLightPerformance", label: "Do the infrared cameras effectively capture images in low-light or nighttime conditions?" },
                        { name: "infraredLEDs", label: "Are they equipped with infrared LEDs or other illumination technology to enhance visibility in darkness?" },
                        { name: "lowLightAdjustments", label: "Are there adjustments or settings available to optimize camera performance in varying levels of low-light conditions?" },
                        { name: "imageQuality", label: "Do the infrared cameras capture high-quality images with sufficient resolution for identification and analysis, even in low-light environments?" },
                        { name: "imageClarity", label: "Are there adjustments or settings available to enhance image clarity and detail in low-light conditions?" },
                        { name: "clearImages", label: "Are images clear and detailed, allowing for easy identification of individuals and activities in low-light environments?" },
                        { name: "systemIntegration", label: "Are the infrared cameras integrated with the overall surveillance system?" },
                        { name: "softwareCommunication", label: "Do they communicate seamlessly with surveillance software and monitoring stations?" },
                        { name: "realTimeMonitoring", label: "Is there real-time monitoring and recording of camera feeds from areas with low-light conditions?" },
                        { name: "coverageAreas", label: "Do the infrared cameras cover the desired areas with low-light conditions, providing comprehensive surveillance coverage?" },
                        { name: "strategicPositioning", label: "Are they positioned strategically to monitor critical areas, such as dark corners, alleys, or building perimeters, effectively?" },
                        { name: "blindSpots", label: "Are there any blind spots or areas where camera coverage is insufficient in low-light environments?" },
                        { name: "weatherResistance", label: "Are the infrared cameras designed to withstand outdoor environmental factors such as rain, humidity, and temperature fluctuations?" },
                        { name: "durableMaterials", label: "Are they constructed from durable materials capable of withstanding harsh outdoor conditions?" },
                        { name: "weatherProofingCertification", label: "Have the cameras undergone testing or certification to verify weatherproofing and durability?" },
                        { name: "remoteAccess", label: "Is there remote access and control functionality for the infrared cameras?" },
                        { name: "remoteAdjustments", label: "Can security personnel adjust camera angles, zoom levels, and other settings remotely as needed?" },
                        { name: "secureProtocols", label: "Is there secure authentication and encryption protocols in place to prevent unauthorized access to camera controls?" },
                        { name: "maintenanceSchedule", label: "Is there a regular maintenance schedule in place for the infrared cameras?" },
                        { name: "maintenanceTasks", label: "Are maintenance tasks, such as cleaning, inspection of camera lenses and housings, and testing of camera functionalities, performed according to schedule?" },
                        { name: "maintenanceRecords", label: "Are there records documenting maintenance activities, repairs, and any issues identified during inspections?" }
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
                                <textarea
                                    className='comment-box'
                                    name={`${question.name}Comment`}
                                    placeholder="Comment (Optional)"
                                    value={formData[`${question.name}Comment`] || ''}
                                    onChange={handleChange}
                                />
                            </div>
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

export default InfraredCamerasPage;