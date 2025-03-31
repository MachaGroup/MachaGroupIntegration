import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function MotionSensorsPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadImage = httpsCallable(functions, 'uploadMotionSensorsPageImage');

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
                const formDocRef = doc(db, 'forms', 'Physical Security', 'Motion Sensors', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Motion Sensors', buildingId);
            await setDoc(formDocRef, { formData: newFormData }, { merge: true });
            console.log("Form data saved to Firestore:", newFormData);
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
            alert('Building ID is missing. Please start the assessment from the correct page.');
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
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Motion Sensors', buildingId);
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
                <h1>Motion Sensors Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Placement and Coverage:</h2>
                    {[
                        { name: "strategicPlacement", label: "Are the motion sensors strategically placed to detect unauthorized entry points?" },
                        { name: "coverage", label: "Do they cover all potential entry points, such as doors, windows, and other vulnerable areas?" },
                        { name: "blindSpots", label: "Are there any blind spots or areas where sensor coverage is insufficient?" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.name === "blindSpots" ? (
                                <input type="text" name={question.name} placeholder={question.label.split("?")[0] + "..."} value={formData[question.name] || ''} onChange={handleChange} />
                            ) : (
                                <><div>
                              <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                              <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                            </div><input type="text" name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange} /></>

                            )}
                        </div>
                    ))}

                    <h2>Detection Sensitivity:</h2>
                    {[
                        { name: "sensitivityLevel", label: "Are the motion sensors set to an appropriate sensitivity level to detect unauthorized movement effectively?" },
                        { name: "falseAlarms", label: "Have adjustments been made to minimize false alarms caused by environmental factors such as pets, wildlife, or moving objects?" },
                    ].map((question, index) => (
                        <div key={index + 3} className="form-section">
                            <label>{question.label}</label>
                            {question.name === "falseAlarms" ? (
                                <input type="text" name={question.name} placeholder={question.label.split("?")[0] + "..."} value={formData[question.name] || ''} onChange={handleChange} />
                            ) : (
                                <><div>
                              <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                              <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                            </div><input type="text" name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange} /></>

                            )}
                        </div>
                    ))}

                    <h2>Response Time and Alarm Triggering:</h2>
                    {[
                        { name: "responseTime", label: "Do the motion sensors respond quickly to detected motion and trigger alarms promptly?" },
                        { name: "differentiateMechanism", label: "Is there a mechanism in place to differentiate between normal activity and suspicious movements to minimize false alarms?" },
                        { name: "alarmTransmission", label: "Are alarms transmitted to monitoring stations or security personnel in real-time for immediate response?" },
                    ].map((question, index) => (
                        <><div key={index + 5} className="form-section">
                        <label>{question.label}</label>
                        <div>
                          <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                          <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                        </div>
                      </div><input type="text" name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange} /></>

                    ))}

                    <h2>Integration with Alarm Systems:</h2>
                    {[
                        { name: "systemIntegration", label: "Are the motion sensors integrated with the overall intrusion alarm system?" },
                        { name: "seamlessCommunication", label: "Do they communicate seamlessly with alarm control panels and monitoring stations?" },
                        { name: "coordinationAlarmDevices", label: "Is there coordination between motion sensor activations and other alarm devices such as sirens, strobe lights, or notification systems?" },
                    ].map((question, index) => (
                        <><div key={index + 8} className="form-section">
                        <label>{question.label}</label>
                        <div>
                          <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                          <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                        </div>
                      </div><input type="text" name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange} /></>

                    ))}

                    <h2>Remote Monitoring and Management:</h2>
                    {[
                        { name: "remoteAccess", label: "Is there remote access and monitoring functionality for the motion sensors?" },
                        { name: "remoteAdjustments", label: "Can security personnel view sensor status, receive alerts, and adjust settings remotely as needed?" },
                        { name: "secureAuthentication", label: "Is there secure authentication and encryption protocols in place to prevent unauthorized access to sensor controls?" },
                    ].map((question, index) => (
                        <><div key={index + 11} className="form-section">
                        <label>{question.label}</label>
                        <div>
                          <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                          <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                        </div>
                      </div><input type="text" name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange} /></>

                    ))}

                    <h2>Durability and Reliability:</h2>
                    {[
                        { name: "environmentDurability", label: "Are the motion sensors designed to withstand environmental factors such as temperature variations, moisture, and physical impact?" },
                        { name: "materialDurability", label: "Are they constructed from durable materials capable of withstanding outdoor conditions if installed in exterior locations?" },
                        { name: "sensorCertification", label: "Have the sensors undergone testing or certification to verify reliability and durability?" },
                    ].map((question, index) => (
                        <><div key={index + 14} className="form-section">
                        <label>{question.label}</label>
                        <div>
                          <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                          <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                        </div>
                      </div><input type="text" name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange} /></>

                    ))}

                    <h2>Maintenance and Upkeep:</h2>
                    {[
                        { name: "maintenanceSchedule", label: "Is there a regular maintenance schedule in place for the motion sensors?" },
                        { name: "maintenanceTasks", label: "Are maintenance tasks, such as testing sensor functionality, replacing batteries, and cleaning sensor lenses, performed according to schedule?" },
                        { name: "maintenanceRecords", label: "Are there records documenting maintenance activities, repairs, and any issues identified during inspections?" },
                    ].map((question, index) => (
                        <><div key={index + 17} className="form-section">
                        <label>{question.label}</label>
                        <div>
                          <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                          <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                        </div>
                      </div><input type="text" name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange} /></>

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

export default MotionSensorsPage;