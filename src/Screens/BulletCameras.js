import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function BulletCamerasPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadImage = httpsCallable(functions, 'uploadBulletCamerasImage');

    const [formData, setFormData] = useState({});
    const [imageData, setImageData] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);

    useEffect(() => {
        if (!buildingId) {
            alert('No building selected. Redirecting to Building Info...');
            navigate('/BuildingandAddress');
            return;
        }

        const fetchFormData = async () => {
            setLoading(true);
            setLoadError(null);

            try {
                const formDocRef = doc(db, 'forms', 'Physical Security', 'Bullet Cameras', buildingId);
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
                const formDocRef = doc(db, 'forms', 'Physical Security', 'Bullet Cameras', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Bullet Cameras', buildingId);
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
                <h1>Bullet Cameras Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Bullet Cameras Assessment</h2>
                    {[
                        { name: "strategicPlacement", label: "Are the bullet cameras strategically positioned to overlook entrances and provide comprehensive surveillance coverage?" },
                        { name: "coverageEntryPoints", label: "Do they cover all entry points and critical areas, such as doors, gates, or parking lots?" },
                        { name: "blindSpots", label: "Are there any blind spots or areas where camera coverage is insufficient?" },
                        { name: "secureMounting", label: "Are the bullet cameras securely mounted and installed to withstand outdoor conditions?" },
                        { name: "optimalAngles", label: "Are they positioned at optimal angles to capture clear and unobstructed views of entrances?" },
                        { name: "protectedWiring", label: "Are cables and wiring adequately protected from weather elements and tampering?" },
                        { name: "weatherProofing", label: "Are the bullet cameras designed to withstand outdoor environmental factors such as rain, humidity, and temperature fluctuations?" },
                        { name: "durableMaterials", label: "Are they constructed from durable materials capable of withstanding harsh outdoor conditions?" },
                        { name: "certification", label: "Have the cameras undergone testing or certification to verify weatherproofing and durability?" },
                        { name: "imageQuality", label: "Do the bullet cameras capture high-quality images with sufficient resolution for identification and analysis?" },
                        { name: "imageAdjustments", label: "Are there adjustments or settings available to optimize image quality based on lighting conditions outdoors?" },
                        { name: "clearImages", label: "Are images clear and detailed, allowing for easy identification of individuals and activities at entrances?" },
                        { name: "integratedSurveillance", label: "Are the bullet cameras integrated with the overall surveillance system?" },
                        { name: "seamlessCommunication", label: "Do they communicate seamlessly with surveillance software and monitoring stations?" },
                        { name: "realTimeMonitoring", label: "Is there real-time monitoring and recording of camera feeds from entrances?" },
                        { name: "remoteAccess", label: "Is there remote access and control functionality for the bullet cameras?" },
                        { name: "remoteAdjustments", label: "Can security personnel adjust camera angles, zoom levels, and other settings remotely as needed?" },
                        { name: "secureAccess", label: "Is there secure authentication and encryption protocols in place to prevent unauthorized access to camera controls?" },
                        { name: "maintenanceSchedule", label: "Is there a regular maintenance schedule in place for the bullet cameras?" },
                        { name: "maintenanceTasks", label: "Are maintenance tasks, such as cleaning, inspection of camera lenses and housings, and testing of camera functionalities, performed according to schedule?" },
                        { name: "maintenanceRecords", label: "Are there records documenting maintenance activities, repairs, and any issues identified during inspections?" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.name === "strategicPlacement" || question.name === "coverageEntryPoints" || question.name === "secureMounting" || question.name === "optimalAngles" || question.name === "protectedWiring" || question.name === "weatherProofing" || question.name === "durableMaterials" || question.name === "certification" || question.name === "imageQuality" || question.name === "imageAdjustments" || question.name === "clearImages" || question.name === "integratedSurveillance" || question.name === "seamlessCommunication" || question.name === "realTimeMonitoring" || question.name === "remoteAccess" || question.name === "remoteAdjustments" || question.name === "secureAccess" || question.name === "maintenanceSchedule" || question.name === "maintenanceTasks" || question.name === "maintenanceRecords" ? (
                                <><div>
                            <input
                              type="radio"
                              name={question.name}
                              value="yes"
                              checked={formData[question.name] === "yes"}
                              onChange={handleChange} /> Yes
                            <input
                              type="radio"
                              name={question.name}
                              value="no"
                              checked={formData[question.name] === "no"}
                              onChange={handleChange} /> No

                          </div><textarea
                              name={`${question.name}Comment`}
                              placeholder="Comment (Optional)"
                              value={formData[`${question.name}Comment`] || ''}
                              onChange={handleChange} /></>
                            ) : (
                                <input
                                    type="text"
                                    name={question.name}
                                    value={formData[question.name] || ''}
                                    onChange={handleChange}
                                    placeholder={question.label}
                                />
                            )}
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

export default BulletCamerasPage;