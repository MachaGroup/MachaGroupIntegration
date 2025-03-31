import React, { useState, useEffect } from 'react';
import { getFirestore, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function LockdownCommunicationProtocolsFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadLockdownCommunicationProtocolsImage = httpsCallable(functions, 'uploadLockdownCommunicationProtocolsImage');

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
                const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Fire Alarm Systems', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Fire Alarm Systems', buildingId);
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
                const uploadResult = await uploadLockdownCommunicationProtocolsImage({ imageData: imageData });
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
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Fire Alarm Systems', buildingId);
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
                <h1>Lockdown Communication Protocols Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Lockdown Communication Protocols Assessment</h2>
                    {[
                        { name: "dedicatedCommunicationSystemsText", label: "Are there dedicated communication systems in place to alert authorities and relevant personnel during emergencies?" },
                        { name: "variousChannels", label: "Do these systems include various channels such as silent alarms, intercoms, emergency call boxes, or mobile alerts?" },
                        { name: "regularTestedCommunicationSystems", label: "Are communication systems tested regularly to ensure they are functional and reliable?" },
                        { name: "silentAlarmSystemsInstalled", label: "Are silent alarm systems installed throughout the premises to discreetly signal emergencies without alerting potential threats?" },
                        { name: "activatingSilentAlarms", label: "Do silent alarms activate without audible alerts to avoid escalating situations or causing panic among occupants?" },
                        { name: "recognizingSilentAlarmTrainingText", label: "Are designated personnel trained to recognize and respond to silent alarm activations promptly?" },
                        { name: "activatingSilentAlarmsProtocolsText", label: "Are there established protocols for activating silent alarms in different emergency scenarios, such as intruders, medical emergencies, or security breaches?" },
                        { name: "activatingSilentAlarmTraining", label: "Are staff members trained on when and how to activate silent alarms and the appropriate response procedures to follow?" },
                        { name: "centralizedMonitoringSystemText", label: "Is there a centralized monitoring system to receive and respond to silent alarm activations?" },
                        { name: "monitoringSilentAlarms", label: "Are designated personnel or security teams tasked with monitoring silent alarms and coordinating response efforts?" },
                        { name: "verifyingAlarmActivationsProcess", label: "Is there a process for verifying alarm activations and escalating responses as needed based on the severity of the situation?" },
                        { name: "integratedSilentAlarms", label: "Are silent alarms integrated into the overall emergency response plan for the premises?" },
                        { name: "alarmsTriggeringResponseActions", label: "Do alarm activations trigger appropriate response actions such as lockdowns, evacuations, or notifications to law enforcement?" },
                        { name: "silentAlarmSystemsCooedination", label: "Is there coordination between silent alarm systems and other security measures to ensure a comprehensive and effective emergency response?" },
                        { name: "purposeAndFunctionTraining", label: "Are staff members and occupants trained in the purpose and function of silent alarms as part of their emergency preparedness training?" },
                        { name: "trainingPrograms", label: "Do training programs include scenarios and simulations to practice activating silent alarms and responding to alarm activations?" },
                        { name: "effectivenessDrills", label: "Are there regular drills or exercises conducted to evaluate the effectiveness of silent alarm systems and response procedures?" },
                        { name: "maintainingRecords", label: "Are records maintained for all silent alarm activations, including dates, times, locations, and responses?" },
                        { name: "reviewingRecords", label: "Are alarm activation records reviewed regularly to identify trends, areas for improvement, and opportunities for further training or intervention?" },
                        { name: "identifyingDeficiencies", label: "Are deficiencies or issues identified during alarm testing or response drills addressed promptly, with corrective actions implemented as needed?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.name === "variousChannels" || question.name === "regularTestedCommunicationSystems" || question.name === "silentAlarmSystemsInstalled" || question.name === "activatingSilentAlarms" || question.name === "activatingSilentAlarmTraining" || question.name === "monitoringSilentAlarms" || question.name === "integratedSilentAlarms" || question.name === "alarmsTriggeringResponseActions" || question.name === "silentAlarmSystemsCooedination" || question.name === "purposeAndFunctionTraining" || question.name === "trainingPrograms" || question.name === "effectivenessDrills" || question.name === "maintainingRecords" || question.name === "reviewingRecords" || question.name === "identifyingDeficiencies" ? (
                                    <>
                                        <input
                                            type="radio"
                                            name={`${question.name.split('Text')[0]}`}
                                            value="yes"
                                            checked={formData[`${question.name.split('Text')[0]}`] === "yes"}
                                            onChange={handleChange}
                                        /> Yes
                                        <input
                                            type="radio"
                                            name={`${question.name.split('Text')[0]}`}
                                            value="no"
                                            checked={formData[`${question.name.split('Text')[0]}`] === "no"}
                                            onChange={handleChange}
                                        /> No
                                        <textarea
                                            className='comment-box'
                                            name={`${question.name}Comment`}
                                            placeholder="Comment (Optional)"
                                            value={formData[`${question.name}Comment`] || ''}
                                            onChange={handleChange}
                                        />
                                    </>
                                ) : (
                                    <input
                                        type="text"
                                        name={question.name}
                                        placeholder={question.label}
                                        value={formData[question.name] || ''}
                                        onChange={handleChange}
                                    />
                                )}
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

export default LockdownCommunicationProtocolsFormPage;