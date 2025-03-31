import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function MotionActivatedLightsPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadImage = httpsCallable(functions, 'uploadMotionActivatedLightsPageImage');

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
                const formDocRef = doc(db, 'forms', 'Physical Security', 'Motion Activated Lights', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Motion Activated Lights', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Motion Activated Lights', buildingId);
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
                <h1>1.1.2.2.1. Motion-Activated Lights Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Placement and Coverage:</h2>
                    {[
                        { name: "strategicPlacement", label: "Are motion-activated lights strategically placed around the perimeter to provide adequate coverage?" },
                        { name: "keyAreasIllumination", label: "Do the lights illuminate key areas susceptible to unauthorized access, such as entry points, blind spots, or areas with limited visibility?" },
                        { name: "insufficientCoverage", label: "Are there any areas where lighting coverage is insufficient, posing potential security risks?" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.name === "insufficientCoverage" ? (
                                <input type="text" name={question.name} placeholder={question.label.split("?")[0] + "..."} value={formData[question.name] || ''} onChange={handleChange} />
                            ) : (
                                <><div>
                              <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                              <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                            </div><input type="text" name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange} /></>

                            )}
                        </div>
                    ))}

                    <h2>Sensor Sensitivity and Range:</h2>
                    {[
                        { name: "sensorConfiguration", label: "Are the motion sensors configured to detect movement effectively within the designated range?" },
                        { name: "movementDifferentiation", label: "Do they differentiate between legitimate movement (e.g., personnel patrolling the perimeter) and unauthorized intrusions?" },
                        { name: "sensorAdjustments", label: "Are there adjustments or calibration settings available to optimize sensor sensitivity and range based on environmental conditions?" },
                    ].map((question, index) => (
                        <><div key={index + 3} className="form-section">
                        <label>{question.label}</label>
                        <div>
                          <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                          <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                        </div>
                      </div><input type="text" name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange} /></>

                    ))}

                    <h2>Timing and Duration:</h2>
                    {[
                        { name: "lightProgramming", label: "Are the lights programmed to activate promptly upon detecting motion and remain illuminated for a sufficient duration?" },
                        { name: "timingAdjustments", label: "Is the timing and duration of light activation adjusted to accommodate varying lighting conditions throughout the day and night?" },
                        { name: "customizableSettings", label: "Are there controls or settings to customize the timing and duration of light activation based on specific security requirements?" },
                    ].map((question, index) => (
                        <><div key={index + 6} className="form-section">
                        <label>{question.label}</label>
                        <div>
                          <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                          <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                        </div>
                      </div><input type="text" name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange} /></>

                    ))}

                    <h2>Brightness and Visibility:</h2>
                    {[
                        { name: "brightness", label: "Are the motion-activated lights sufficiently bright to illuminate the surrounding area effectively?" },
                        { name: "visibilityWithoutGlare", label: "Do they provide clear visibility without causing glare or shadows that could obscure detection of unauthorized activity?" },
                        { name: "tamperingPrevention", label: "Are there measures in place to prevent tampering or vandalism of light fixtures to maintain visibility?" },
                    ].map((question, index) => (
                        <><div key={index + 9} className="form-section">
                        <label>{question.label}</label>
                        <div>
                          <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                          <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                        </div>
                      </div><input type="text" name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange} /></>

                    ))}

                    <h2>Integration with Security Systems:</h2>
                    {[
                        { name: "integrationSecuritySystems", label: "Are the motion-activated lights integrated with other security systems, such as surveillance cameras or intrusion detection systems?" },
                        { name: "triggerAlert", label: "Do they trigger recording or alerting mechanisms upon activation to provide real-time notification of potential security threats?" },
                        { name: "lightingCoordination", label: "Is there coordination between lighting controls and security personnel to respond to motion activations appropriately?" },
                    ].map((question, index) => (
                        <><div key={index + 12} className="form-section">
                        <label>{question.label}</label>
                        <div>
                          <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                          <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                        </div>
                      </div><input type="text" name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange} /></>

                    ))}

                    <h2>Energy Efficiency:</h2>
                    {[
                        { name: "energyEfficiency", label: "Are the motion-activated lights energy-efficient, utilizing LED technology or other low-power lighting solutions?" },
                        { name: "optimizeEnergy", label: "Are there controls or settings to optimize energy consumption based on usage patterns and security requirements?" },
                        { name: "monitorEnergy", label: "Is there a monitoring system in place to track energy usage and identify opportunities for further efficiency improvements?" },
                    ].map((question, index) => (
                        <><div key={index + 15} className="form-section">
                        <label>{question.label}</label>
                        <div>
                          <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                          <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                        </div>
                      </div><input type="text" name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange} /></>

                    ))}

                    <h2>Maintenance and Upkeep:</h2>
                    {[
                        { name: "maintenanceSchedule", label: "Is there a regular maintenance schedule in place for motion-activated lights?" },
                        { name: "maintenanceTasks", label: "Are maintenance tasks, such as cleaning, bulb replacement, and inspection of wiring and fixtures, performed according to schedule?" },
                        { name: "maintenanceRecords", label: "Are there records documenting maintenance activities, repairs, and any issues identified during inspections?" },
                    ].map((question, index) => (
                        <><div key={index + 18} className="form-section">
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

export default MotionActivatedLightsPage;