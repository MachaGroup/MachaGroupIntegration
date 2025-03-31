import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function AccessControlKeypadsPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadAccessControlKeypadsImage = httpsCallable(functions, 'uploadAccessControlKeypadsImage');

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
                const formDocRef = doc(db, 'forms', 'Physical Security', 'Access Control Keypads', buildingId);
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
                const formDocRef = doc(db, 'forms', 'Physical Security', 'Access Control Keypads', buildingId);
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
            alert('Building ID is missing. Please start the assessment from the correct page.');
            return;
        }

        if (imageData) {
            try {
                const uploadResult = await uploadAccessControlKeypadsImage({ imageData: imageData });
                setImageUrl(uploadResult.data.imageUrl);
                setFormData({ ...formData, imageUrl: uploadResult.data.imageUrl });
                setImageUploadError(null);
            } catch (error) {
                console.error('Error uploading image:', error);
                setImageUploadError(error.message);
            }
        }

        try {
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Access Control Keypads', buildingId);
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
                <h1>Access Control Keypads Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Functionality and Reliability:</h2>
                    {[
                        { name: "operational", label: "Are the access control keypads operational and functioning as intended?" },
                        { name: "reliablyAuthenticate", label: "Do the keypads reliably authenticate users and grant access to restricted areas?" },
                        { name: "malfunction", label: "Are there any signs of malfunction or errors in the keypad operation?" },
                        { name: "backupSystems", label: "Are backup systems in place in case of power outages or malfunctions?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                <input type="radio" name={question.name} value="yes" checked={formData[question.name] === 'yes'} onChange={handleChange} /> Yes
                                <input type="radio" name={question.name} value="no" checked={formData[question.name] === 'no'} onChange={handleChange} /> No
                            </div>
                            <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                        </div>
                    ))}

                    <h2>Security of Access Codes:</h2>
                    {[
                        { name: "secureCodes", label: "Are access codes used with the keypads sufficiently secure and resistant to unauthorized access or guessing?" },
                        { name: "instructions", label: "Are users instructed not to share their access codes and to keep them confidential?" },
                        { name: "changeCodes", label: "Is there a process for periodically changing access codes to enhance security?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                <input type="radio" name={question.name} value="yes" checked={formData[question.name] === 'yes'} onChange={handleChange} /> Yes
                                <input type="radio" name={question.name} value="no" checked={formData[question.name] === 'no'} onChange={handleChange} /> No
                            </div>
                            <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                        </div>
                    ))}

                    <h2>Integration with Access Control Systems:</h2>
                    {[
                        { name: "integrated", label: "Are the access control keypads integrated with the overall access control system?" },
                        { name: "communicateSeamlessly", label: "Do they communicate seamlessly with access control software and databases?" },
                        { name: "realTimeMonitoring", label: "Is there real-time monitoring and logging of access events captured by the keypads?" },
                        { name: "accessRightsManaged", label: "Are access rights managed centrally and synchronized with the keypad system?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                <input type="radio" name={question.name} value="yes" checked={formData[question.name] === 'yes'} onChange={handleChange} /> Yes
                                <input type="radio" name={question.name} value="no" checked={formData[question.name] === 'no'} onChange={handleChange} /> No
                            </div>
                            <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                        </div>
                    ))}

                    <h2>Durability and Resistance to Tampering:</h2>
                    {[
                        { name: "durableMaterials", label: "Are the access control keypads made from durable materials capable of withstanding physical force or tampering attempts?" },
                        { name: "tamperAlarms", label: "Are there additional security features, such as tamper alarms or anti-tamper enclosures, to deter unauthorized access or vandalism?" },
                        { name: "testedReliability", label: "Have the keypads been tested for reliability and resistance to environmental factors such as moisture, temperature extremes, or physical wear?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                <input type="radio" name={question.name} value="yes" checked={formData[question.name] === 'yes'} onChange={handleChange} /> Yes
                                <input type="radio" name={question.name} value="no" checked={formData[question.name] === 'no'} onChange={handleChange} /> No
                            </div>
                            <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                        </div>
                    ))}

                    <h2>Accessibility and Ease of Use:</h2>
                    {[
                        { name: "accessible", label: "Are the access control keypads easily accessible and operable for authorized users?" },
                        { name: "clearInstructions", label: "Do they provide clear instructions for entering access codes and accessing restricted areas?" },
                        { name: "disabilityAccessibility", label: "Are there any accessibility features or considerations for individuals with disabilities?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                <input type="radio" name={question.name} value="yes" checked={formData[question.name] === 'yes'} onChange={handleChange} /> Yes
                                <input type="radio" name={question.name} value="no" checked={formData[question.name] === 'no'} onChange={handleChange} /> No
                            </div>
                            <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                        </div>
                    ))}

                    <h2>Maintenance and Upkeep:</h2>
                    {[
                        { name: "maintenanceSchedule", label: "Is there a regular maintenance schedule in place for the access control keypads?" },
                        { name: "maintenanceTasks", label: "Are maintenance tasks, such as cleaning, inspection of keypads and wiring, and replacement of worn-out components, performed according to schedule?" },
                        { name: "maintenanceRecords", label: "Are there records documenting maintenance activities, repairs, and any issues identified during inspections?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                <input type="radio" name={question.name} value="yes" checked={formData[question.name] === 'yes'} onChange={handleChange} /> Yes
                                <input type="radio" name={question.name} value="no" checked={formData[question.name] === 'no'} onChange={handleChange} /> No
                            </div>
                            <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                        </div>
                    ))}

                    <h2>User Training and Awareness:</h2>
                    {[
                        { name: "userTraining", label: "Have users, such as security personnel and authorized individuals, received training on how to use the access control keypads properly?" },
                        { name: "instructionsAvailable", label: "Are there instructions or guidelines available to users regarding proper access code usage and security protocols?" },
                        { name: "reportingProcess", label: "Is there a process for reporting malfunctions, damage, or security incidents related to the access control keypads?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                <input type="radio" name={question.name} value="yes" checked={formData[question.name] === 'yes'} onChange={handleChange} /> Yes
                                <input type="radio" name={question.name} value="no" checked={formData[question.name] === 'no'} onChange={handleChange} /> No
                            </div>
                            <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                        </div>
                    ))}

                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
                    {imageUploadError && <p style={{ color: 'red' }}>{imageUploadError}</p>}

                    <button type="submit">Submit</button>
                </form>
            </main>
        </div>
    );
}

export default AccessControlKeypadsPage;