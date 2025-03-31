import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function DoorAlarmsPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadDoorAlarmsImage = httpsCallable(functions, 'uploadDoorAlarmsImage');

    const [formData, setFormData] = useState({});
    const storage = getStorage();
    const [image, setImage] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [imageUrl, setImageUrl] = useState(null);
    const [uploadError, setUploadError] = useState(null);

    useEffect(() => {
        if (!buildingId) {
            alert('No building selected. Redirecting to Building Info...');
            navigate('/BuildingandAddress');
        }
    }, [buildingId, navigate]);

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleBack = async () => {
        if (formData && buildingId) {
            try {
                const buildingRef = doc(db, 'Buildings', buildingId);
                const formsRef = collection(db, 'forms/Physical Security/Door Alarms');
                await addDoc(formsRef, {
                    building: buildingRef,
                    formData: formData,
                });
                console.log('Form Data submitted successfully on back!');
                alert('Form data saved before navigating back!');
            } catch (error) {
                console.error('Error saving form data:', error);
                alert('Failed to save form data before navigating back. Some data may be lost.');
            }
        }
        navigate(-1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!buildingId) {
            alert('Building ID is missing. Please start the assessment from the correct page.');
            return;
        }

        try {
            const buildingRef = doc(db, 'Buildings', buildingId);
            const formsRef = collection(db, 'forms/Physical Security/Door Alarms');
            await addDoc(formsRef, {
                building: buildingRef,
                formData: formData,
            });
            console.log('Form data submitted successfully!');
            alert('Form submitted successfully!');
            navigate('/Form');
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to submit the form. Please try again.');
        }
    };

    return (
        <div className="form-page">
            <header className="header">
                <Navbar />
                <button className="back-button" onClick={handleBack}>←</button>
                <h1>Door Alarms Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Placement and Coverage:</h2>
                    {[
                        { name: "entryPointCoverage", label: "2.1.2.2. Door Alarms: Are the door alarms installed on all entry points, including doors leading to restricted areas?", type: "radio", options: ["yes", "no"] },
                        { name: "doorCoverage", label: "2.1.2.2. Door Alarms: Do they cover all exterior doors, internal doors, and other access points?", type: "radio", options: ["yes", "no"] },
                        { name: "uncoveredPoints", label: "2.1.2.2. Door Alarms: Are there any doors or entry points without alarm coverage?", type: "text", placeholder: "Describe any uncovered doors or points" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.type === "text" && <input type="text" name={question.name} placeholder={question.placeholder} onChange={handleChange} />}
                                {question.type === "radio" && (
                                    <div>
                                        <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                                        <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                                        <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    <h2>Sensor Type and Activation:</h2>
                    {[
                        { name: "sensorType", label: "2.1.2.2. Door Alarms: What type of sensors are used for door alarms (e.g., magnetic reed switches, contact sensors)?", type: "text", placeholder: "Enter sensor type" },
                        { name: "sensorActivation", label: "2.1.2.2. Door Alarms: Are the sensors activated when the door is opened, closed, or both?", type: "radio", options: ["opened", "closed", "both"] },
                        { name: "delayMechanism", label: "2.1.2.2. Door Alarms: Is there a delay mechanism in place to allow authorized personnel to disarm the alarm before it triggers?", type: "radio", options: ["yes", "no"] },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.type === "text" && <input type="text" name={question.name} placeholder={question.placeholder} onChange={handleChange} />}
                                {question.type === "radio" && (
                                    <div>
                                        <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                                        <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                                        <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    <h2>Response Time and Alarm Triggering:</h2>
                    {[
                        { name: "responseTime", label: "2.1.2.2. Door Alarms: Do the door alarms respond quickly when triggered by unauthorized entry attempts?", type: "radio", options: ["yes", "no"] },
                        { name: "alarmIndication", label: "2.1.2.2. Door Alarms: Is there a loud audible alarm or visual indication (e.g., flashing lights) to alert occupants and deter intruders?", type: "radio", options: ["yes", "no"] },
                        { name: "alarmTransmission", label: "2.1.2.2. Door Alarms: Are alarms transmitted to monitoring stations or security personnel in real-time for immediate response?", type: "radio", options: ["yes", "no"] },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.type === "radio" && (
                                    <div>
                                        <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                                        <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                                        <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    <h2>Integration with Alarm Systems:</h2>
                    {[
                        { name: "systemIntegration", label: "2.1.2.2. Door Alarms: Are the door alarms integrated with the overall intrusion alarm system?", type: "radio", options: ["yes", "no"] },
                        { name: "alarmCommunication", label: "2.1.2.2. Door Alarms: Do they communicate seamlessly with alarm control panels and monitoring stations?", type: "radio", options: ["yes", "no"] },
                        { name: "alarmCoordination", label: "2.1.2.2. Door Alarms: Is there coordination between door alarm activations and other alarm devices such as sirens, strobe lights, or notification systems?", type: "radio", options: ["yes", "no"] },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.type === "radio" && (
                                    <div>
                                        <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                                        <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                                        <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    <h2>Remote Monitoring and Management:</h2>
                    {[
                        { name: "remoteMonitoring", label: "2.1.2.2. Door Alarms: Is there remote access and monitoring functionality for the door alarms?", type: "radio", options: ["yes", "no"] },
                        { name: "remoteAcknowledge", label: "2.1.2.2. Door Alarms: Can security personnel view alarm status, receive alerts, and acknowledge alarms remotely as needed?", type: "radio", options: ["yes", "no"] },
                        { name: "secureProtocols", label: "2.1.2.2. Door Alarms: Is there secure authentication and encryption protocols in place to prevent unauthorized access to alarm controls?", type: "radio", options: ["yes", "no"] },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.type === "radio" && (
                                    <div>
                                        <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                                        <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                                        <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    <h2>Durability and Reliability:</h2>
                    {[
                        { name: "tamperProof", label: "2.1.2.2. Door Alarms: Are the door alarms designed to withstand frequent use and potential tampering attempts?", type: "radio", options: ["yes", "no"] },
                        { name: "durableMaterials", label: "2.1.2.2. Door Alarms: Are they constructed from durable materials capable of withstanding indoor and outdoor conditions?", type: "radio", options: ["yes", "no"] },
                        { name: "alarmTesting", label: "2.1.2.2. Door Alarms: Have the alarms undergone testing or certification to verify reliability and durability?", type: "radio", options: ["yes", "no"] },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.type === "radio" && (
                                    <div>
                                        <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                                        <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                                        <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    <h2>Maintenance and Upkeep:</h2>
                    {[
                        { name: "maintenanceSchedule", label: "2.1.2.2. Door Alarms: Is there a regular maintenance schedule in place for the door alarms?", type: "radio", options: ["yes", "no"] },
                        { name: "maintenanceTasks", label: "2.1.2.2. Door Alarms: Are maintenance tasks, such as testing alarm functionality, replacing batteries, and inspecting sensor connections, performed according to schedule?", type: "radio", options: ["yes", "no"] },
                        { name: "maintenanceRecords", label: "2.1.2.2. Door Alarms: Are there records documenting maintenance activities, repairs, and any issues identified during inspections?", type: "radio", options: ["yes", "no"] },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.type === "radio" && (
                                    <div>
                                        <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                                        <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                                        <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    {uploadProgress > 0 && <p>Upload Progress: {uploadProgress.toFixed(2)}%</p>}
                    {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
                    {uploadError && <p style={{ color: "red" }}>{uploadError}</p>}
                    <button type="submit">Submit</button>
                </form>
            </main>
        </div>
    );
}

export default DoorAlarmsPage;