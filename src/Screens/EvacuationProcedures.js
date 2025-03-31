import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function EvacuationProceduresFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadImage = httpsCallable(functions, 'uploadEvacuationProceduresFormImage');

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
                const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Evacuation Procedures', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Evacuation Procedures', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Evacuation Procedures', buildingId);
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
                <h1>Evacuation Procedures Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Evacuation Routes and Procedures:</h2>
                    {[
                        { name: "defined evacuation routes", label: "Are there clearly defined evacuation routes posted throughout the premises, indicating primary and secondary exit paths?", type: "radio" },
                        { name: "Established evacuation procedures", label: "Have evacuation procedures been established for different scenarios, such as fire emergencies, bomb threats, or natural disasters?", type: "radio" },
                        { name: "establishedEvacuationProcedures", label: "Describe evacuation procedures", type: "text" },
                        { name: "evacuation procedures training ", label: "Are staff members trained on evacuation procedures and their roles during evacuations?", type: "radio" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.type === "radio" ? (
                                    <>
                                        <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                                        <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                                        <textarea className='comment-box' name={`${question.name}-comment`} placeholder="Comment (Optional)" value={formData[`${question.name}-comment`] || ''} onChange={handleChange} />
                                    </>
                                ) : (
                                    <input type="text" name={question.name} placeholder={question.label} value={formData[question.name] || ''} onChange={handleChange} />
                                )}
                            </div>
                        </div>
                    ))}

                    <h2>Assembly Points:</h2>
                    {[
                        { name: "designated assembly points", label: "Have designated assembly points been identified outside the building where occupants should gather after evacuating?", type: "radio" },
                        { name: "assembly point safety", label: "Are assembly points located at safe distances from the building and away from potential hazards?", type: "radio" },
                        { name: "assembly point space", label: "Do assembly points provide adequate space and facilities for occupants to gather and await further instructions?", type: "radio" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.type === "radio" ? (
                                    <>
                                        <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                                        <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                                        <textarea className='comment-box' name={`${question.name}-comment`} placeholder="Comment (Optional)" value={formData[`${question.name}-comment`] || ''} onChange={handleChange} />
                                    </>
                                ) : (
                                    <input type="text" name={question.name} placeholder={question.label} value={formData[question.name] || ''} onChange={handleChange} />
                                )}
                            </div>
                        </div>
                    ))}

                    <h2>Communication and Alert Systems:</h2>
                    {[
                        { name: "effective alert system", label: "Is there an effective communication system in place to alert occupants of the need to evacuate?", type: "radio" },
                        { name: "alerting devices installed", label: "Are fire alarms, strobe lights, or other alerting devices installed and regularly tested to ensure they are functional?", type: "radio" },
                        { name: "broadcasting mechanism", label: "Is there a mechanism for broadcasting evacuation instructions and updates to all occupants, including those with disabilities or language barriers?", type: "radio" },
                        { name: "broadcastingMechanism", label: "Describe the mechanism", type: "text" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.type === "radio" ? (
                                    <>
                                        <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                                        <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                                        <textarea className='comment-box' name={`${question.name}-comment`} placeholder="Comment (Optional)" value={formData[`${question.name}-comment`] || ''} onChange={handleChange} />
                                    </>
                                ) : (
                                    <input type="text" name={question.name} placeholder={question.label} value={formData[question.name] || ''} onChange={handleChange} />
                                )}
                            </div>
                        </div>
                    ))}

                    <h2>Evacuation Procedures for Special Needs:</h2>
                    {[
                        { name: "disability evacuation procedure", label: "Are there procedures in place to assist occupants with disabilities or special needs during evacuations?", type: "radio" },
                        { name: "disability assistance training", label: "Are staff members trained to provide assistance to individuals who may require additional support during evacuations?", type: "radio" },
                        { name: "disability evacuation accesibility", label: "Are evacuation routes and assembly points accessible to individuals with mobility impairments or other disabilities?", type: "radio" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.type === "radio" ? (
                                    <>
                                        <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                                        <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                                        <textarea className='comment-box' name={`${question.name}-comment`} placeholder="Comment (Optional)" value={formData[`${question.name}-comment`] || ''} onChange={handleChange} />
                                    </>
                                ) : (
                                    <input type="text" name={question.name} placeholder={question.label} value={formData[question.name] || ''} onChange={handleChange} />
                                )}
                            </div>
                        </div>
                    ))}

                    <h2>Accountability and Accountability:</h2>
                    {[
                        { name: "Evacuation account", label: "Is there a system in place to account for all occupants and ensure everyone has evacuated safely?", type: "radio" },
                        { name: "evacuationAccount", label: "Describe the system", type: "text" },
                        { name: "Assigned accountability checker", label: "Are designated individuals assigned to perform accountability checks at assembly points and report any missing persons to emergency responders?", type: "radio" },
                        { name: "assignedAccountabilityChecker", label: "List designated individuals", type: "text" },
                        { name: "building reentry procedure", label: "Are procedures in place for re-entry into the building after evacuations have been completed and deemed safe?", type: "radio" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.type === "radio" ? (
                                    <>
                                        <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                                        <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                                        <textarea className='comment-box' name={`${question.name}-comment`} placeholder="Comment (Optional)" value={formData[`${question.name}-comment`] || ''} onChange={handleChange} />
                                    </>
                                ) : (
                                    <input type="text" name={question.name} placeholder={question.label} value={formData[question.name] || ''} onChange={handleChange} />
                                )}
                            </div>
                        </div>
                    ))}

                    <h2>Training and Drills:</h2>
                    {[
                        { name: "regular evacuation drills", label: "Are regular evacuation drills conducted to familiarize occupants with evacuation procedures and routes?", type: "radio" },
                        { name: "different scenario drills", label: "Are drills tailored to address different scenarios and challenges that may arise during evacuations?", type: "radio" },
                        { name: "drills feedback", label: "Are feedback and lessons learned from drills used to improve evacuation procedures and preparedness?", type: "radio" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.type === "radio" ? (
                                    <>
                                        <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                                        <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                                        <textarea className='comment-box' name={`${question.name}-comment`} placeholder="Comment (Optional)" value={formData[`${question.name}-comment`] || ''} onChange={handleChange} />
                                    </>
                                ) : (
                                    <input type="text" name={question.name} placeholder={question.label} value={formData[question.name] || ''} onChange={handleChange} />
                                )}
                            </div>
                        </div>
                    ))}

                    <h2>Review and Updates:</h2>
                    {[
                        { name: "evacuation procedures review", label: "Are evacuation procedures regularly reviewed and updated to reflect changes in building layout, occupancy, or emergency response protocols?", type: "radio" },
                        { name: "solicited input", label: "Is input from occupants, emergency responders, and other stakeholders solicited to identify areas for improvement in evacuation plans?", type: "radio" },
                        { name: "effective update communication", label: "Are updates communicated effectively to all occupants and staff members to ensure they are aware of changes to evacuation procedures?", type: "radio" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.type === "radio" ? (
                                    <>
                                        <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                                        <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                                        <textarea className='comment-box' name={`${question.name}-comment`} placeholder="Comment (Optional)" value={formData[`${question.name}-comment`] || ''} onChange={handleChange} />
                                    </>
                                ) : (
                                    <input type="text" name={question.name} placeholder={question.label} value={formData[question.name] || ''} onChange={handleChange} />
                                )}
                            </div>
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

export default EvacuationProceduresFormPage;