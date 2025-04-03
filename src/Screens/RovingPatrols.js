import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc, } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function RovingPatrolsPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadImage = httpsCallable(functions, 'uploadRovingPatrolsImage');

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
                const formDocRef = doc(db, 'forms', 'Physical Security', 'Roving Patrols', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Roving Patrols', buildingId);
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
            const buildingRef = doc(db, 'Buildings', buildingId);
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Roving Patrols', buildingId);
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
        <div>
            <div className="form-page">
                <header className="header">
                    <Navbar />
                    <button className="back-button" onClick={handleBack}>←</button>
                    <h1>Roving Patrols Assessment</h1>
                    <img src={logo} alt="Logo" className="logo" />
                </header>

                <main className="form-container">
                    <form onSubmit={handleSubmit}>
                        <h2>Patrol Routes and Coverage:</h2>
                        {[
                            { name: "regularPatrols", label: "Are roving patrols conducted regularly throughout the premises, covering all critical areas and potential security vulnerabilities?" },
                            { name: "wellDefinedRoutes", label: "Are patrol routes well-defined, ensuring comprehensive coverage of indoor and outdoor areas?" },
                            { name: "specialAttentionAreas", label: "Are there any areas or zones that require special attention or increased patrol frequency?" },
                        ].map((question, index) => (
                            <div key={index} className="form-section">
                                <label>{question.label}</label>
                                {question.name !== "specialAttentionAreas" ? (
                                    <><div>
                                <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                                <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                              </div><textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea></>

                                ) : (
                                    <input type="text" name={question.name} placeholder="Describe any areas or zones" value={formData[question.name] || ''} onChange={handleChange} />
                                )}
                            </div>
                        ))}

                        <h2>Frequency and Timing:</h2>
                        {[
                            { name: "patrolFrequency", label: "How often are roving patrols conducted, and at what intervals?" },
                            { name: "randomIntervals", label: "Are patrols conducted at random intervals to deter predictability and enhance security effectiveness?" },
                            { name: "additionalPatrols", label: "Are there additional patrols scheduled during high-risk periods or events?" },
                        ].map((question, index) => (
                            <div key={index} className="form-section">
                                <label>{question.label}</label>
                                {question.name === "patrolFrequency" ? (
                                    <input type="text" name={question.name} placeholder="Enter patrol frequency and intervals" value={formData[question.name] || ''} onChange={handleChange} />
                                ) : (
                                    <><div>
                                  <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                                  <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                                </div><textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea></>

                                )}
                            </div>
                        ))}

                        <h2>Observation and Vigilance:</h2>
                        {[
                            { name: "activeMonitoring", label: "Do roving patrol officers actively monitor the premises for signs of unauthorized access, suspicious behavior, or security breaches?" },
                            { name: "threatResponse", label: "Are they trained to recognize and respond to potential threats, including unauthorized individuals or unusual activities?" },
                            { name: "thoroughInspections", label: "Do patrol officers conduct thorough inspections of doors, windows, gates, and other access points during patrols?" },
                        ].map((question, index) => (
                            <><div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                              <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                              <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                            </div>
                          </div><textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea></>

                        ))}

                        <h2>Response to Incidents:</h2>
                        {[
                            { name: "incidentResponse", label: "Are roving patrol officers equipped to respond promptly to security incidents, alarms, or emergencies encountered during patrols?" },
                            { name: "emergencyProcedures", label: "Do they know how to initiate appropriate emergency response procedures and contact relevant authorities or response teams?" },
                            { name: "coordinationWithGuards", label: "Is there a system in place to coordinate with stationed guards or other security personnel in case of incidents requiring additional support?" },
                        ].map((question, index) => (
                            <><div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                              <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                              <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                            </div>
                          </div><textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea></>

                        ))}

                        <h2>Documentation and Reporting:</h2>
                        {[
                            { name: "detailedRecords", label: "Are patrol officers required to maintain detailed records of patrol activities, including patrol routes, observations, and incidents encountered?" },
                            { name: "reportingProcess", label: "Is there a standardized reporting process for documenting security incidents, suspicious activities, or maintenance issues identified during patrols?" },
                            { name: "reportReviews", label: "Are patrol reports reviewed regularly by security management to identify trends, areas for improvement, or security risks?" },
                        ].map((question, index) => (
                            <><div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                              <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                              <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                            </div>
                          </div><textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea></>

                        ))}

                        <h2>Communication and Coordination:</h2>
                        {[
                            { name: "effectiveCommunication", label: "Is there effective communication between roving patrol officers and stationed guards, as well as with management and staff?" },
                            { name: "communicationDevices", label: "Are patrol officers equipped with communication devices to report incidents, request assistance, or communicate with response teams?" },
                            { name: "centralizedCommunication", label: "Is there a centralized communication system or protocol for relaying information and coordinating responses between patrol officers and other security personnel?" },
                        ].map((question, index) => (
                            <><div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                              <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                              <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                            </div>
                          </div><textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea></>

                        ))}

                        <h2>Training and Preparedness:</h2>
                        {[
                            { name: "adequateTraining", label: "Are roving patrol officers adequately trained in security procedures, emergency response protocols, and effective patrol techniques?" },
                            { name: "ongoingTraining", label: "Do they receive ongoing training to enhance their skills, knowledge, and awareness of security threats and emerging risks?" },
                            { name: "situationHandling", label: "Are patrol officers prepared to handle various situations professionally and effectively, including confrontations, medical emergencies, or crisis situations?" },
                        ].map((question, index) => (
                            <><div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                              <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                              <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                            </div>
                          </div><textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea></>

                        ))}

                        <input type="file" onChange={handleImageChange} accept="image/*" />
                        {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
                        {imageUploadError && <p style={{ color: 'red' }}>{imageUploadError}</p>}
                        <button type="submit">Submit</button>
                    </form>
                </main>
            </div>
        </div>
    );
}

export default RovingPatrolsPage;