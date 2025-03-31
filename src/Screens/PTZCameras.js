import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc, getFunctions, httpsCallable } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function PTZCamerasPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadPTZCamerasImage = httpsCallable(functions, 'uploadPTZCamerasImage');

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
                const formDocRef = doc(db, 'forms', 'Physical Security', 'PTZ Cameras', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Physical Security', 'PTZ Cameras', buildingId);
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
                const uploadResult = await uploadPTZCamerasImage({ imageData: imageData });
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
            const formDocRef = doc(db, 'forms', 'Physical Security', 'PTZ Cameras', buildingId);
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

    const questions = [
        { name: "operational", label: "Are the PTZ cameras operational and functioning as intended?", type: "radio" },
        { name: "flexibleMonitoring", label: "Do the cameras provide flexible monitoring capabilities, allowing for pan, tilt, and zoom functionalities?", type: "radio" },
        { name: "malfunction", label: "Are there any signs of malfunction or errors in camera movements or zoom capabilities?", type: "radio" },
        { name: "backupSystems", label: "Are backup systems in place in case of power outages or camera malfunctions?", type: "radio" },
        { name: "coverage", label: "Do the PTZ cameras cover the desired areas for monitoring, providing comprehensive surveillance coverage?", type: "radio" },
        { name: "strategicPositioning", label: "Are they positioned strategically to monitor critical areas and respond to security events effectively?", type: "radio" },
        { name: "presetPositions", label: "Are there preset positions or patrol patterns programmed into the cameras to enhance monitoring efficiency?", type: "radio" },
        { name: "imageQuality", label: "Do the PTZ cameras capture high-quality images with sufficient resolution for identification and analysis?", type: "radio" },
        { name: "imageAdjustments", label: "Are there adjustments or settings available to optimize image quality based on lighting conditions and environmental factors?", type: "radio" },
        { name: "zoomQuality", label: "Are images clear and detailed, even when zoomed in for closer inspection?", type: "radio" },
        { name: "integrationSurveillance", label: "Are the PTZ cameras integrated with the overall surveillance system?", type: "radio" },
        { name: "seamlessCommunication", label: "Do they communicate seamlessly with surveillance software and monitoring stations?", type: "radio" },
        { name: "realTimeMonitoring", label: "Is there real-time monitoring and recording of camera feeds, with the ability to control PTZ functions remotely?", type: "radio" },
        { name: "durabilityWeatherResistance", label: "Are the PTZ cameras designed to withstand environmental factors such as moisture, temperature extremes, and dust?", type: "radio" },
        { name: "durableMaterials", label: "Are they constructed from durable materials capable of withstanding outdoor conditions?", type: "radio" },
        { name: "protectiveEnclosures", label: "Are there protective enclosures or housings to shield the cameras from damage or vandalism?", type: "radio" },
        { name: "remoteControl", label: "Is there remote access and control functionality for the PTZ cameras?", type: "radio" },
        { name: "remoteAdjustments", label: "Can security personnel adjust camera angles, zoom levels, and other settings remotely as needed?", type: "radio" },
        { name: "secureAuthentication", label: "Is there secure authentication and encryption protocols in place to prevent unauthorized access to camera controls?", type: "radio" },
        { name: "maintenanceSchedule", label: "Is there a regular maintenance schedule in place for the PTZ cameras?", type: "radio" },
        { name: "maintenanceTasks", label: "Are maintenance tasks, such as cleaning, inspection of camera lenses and housings, and testing of PTZ functions, performed according to schedule?", type: "radio" },
        { name: "maintenanceRecords", label: "Are there records documenting maintenance activities, repairs, and any issues identified during inspections?", type: "radio" },
    ];

    return (
        <div className="form-page">
            <header className="header">
                <Navbar />
                <button className="back-button" onClick={handleBack}>←</button>
                <h1>PTZ Cameras (e.g., for flexible monitoring) Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    {questions.map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.type === "radio" ? (
                                <><div>
                            <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                            <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                          </div><textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea></>

                            ) : null}
                        </div>
                    ))}
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
                    {imageUploadError && <p style={{ color: "red" }}>{imageUploadError}</p>}
                    <button type="submit">Submit</button>
                </form>
            </main>
        </div>
    );
}

export default PTZCamerasPage;