import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function MedicalFacilitiesFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadImage = httpsCallable(functions, 'uploadMedicalFacilitiesFormPageImage');

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
                const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Medical Facilities', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Medical Facilities', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Medical Facilities', buildingId);
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
                <h1>Medical Facilities Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Proximity and Accessibility:</h2>
                    {[
                        { name: "hospitalIdentificationCriteria", label: "How are nearby hospitals or medical facilities identified and designated as essential resources for providing medical care, treatment, and support services during emergencies or incidents requiring advanced medical intervention?" },
                        { name: "hospitalAccessibilityCriteria", label: "What criteria are considered when assessing the proximity, accessibility, and capabilities of medical facilities to respond effectively to various types of emergencies, injuries, or medical emergencies within the community?" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <input type="text" name={question.name} placeholder={question.label.split("?")[0] + "..."} value={formData[question.name] || ''} onChange={handleChange} />
                        </div>
                    ))}

                    <h2>Collaborative Emergency Response:</h2>
                    {[
                        { name: "medicalCollaborationProtocols", label: "How do schools collaborate with local hospitals, healthcare providers, and emergency medical services (EMS) to establish coordinated response protocols, communication channels, and mutual aid agreements for managing medical emergencies on school grounds or in the surrounding area?" },
                        { name: "medicalTrainingExercises", label: "Are joint training exercises, drills, or simulations conducted regularly to test the interoperability, coordination, and effectiveness of medical response teams, equipment, and procedures during simulated emergencies or mass casualty incidents?" },
                    ].map((question, index) => (
                        <div key={index + 2} className="form-section">
                            <label>{question.label}</label>
                            {question.name === "medicalTrainingExercises" ? (
                                <><div>
                                    <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                                    <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                                </div><input type="text" name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange} /></>

                            ) : (
                                <input type="text" name={question.name} placeholder={question.label.split("?")[0] + "..."} value={formData[question.name] || ''} onChange={handleChange} />
                            )}
                        </div>
                    ))}

                    <h2>Resource Availability and Capacity:</h2>
                    {[
                        { name: "hospitalResourceAvailability", label: "What resources, equipment, and specialized medical capabilities are available at nearby hospitals or medical facilities to support emergency medical care, trauma management, and patient transport for individuals affected by emergencies or disasters?" },
                        { name: "medicalContingencyPlans", label: "Are contingency plans developed to address potential challenges or surges in demand for medical services, such as during large-scale incidents, pandemics, or public health emergencies, and to ensure continuity of care for patients requiring ongoing treatment or specialized interventions?" },
                    ].map((question, index) => (
                        <div key={index + 4} className="form-section">
                            <label>{question.label}</label>
                            {question.name === "medicalContingencyPlans" ? (
                                <><div>
                                    <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                                    <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                                </div><input type="text" name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange} /></>

                            ) : (
                                <input type="text" name={question.name} placeholder={question.label.split("?")[0] + "..."} value={formData[question.name] || ''} onChange={handleChange} />
                            )}
                        </div>
                    ))}

                    <h2>Communication and Information Sharing:</h2>
                    {[
                        { name: "communicationProtocols", label: "How is communication established and maintained between schools, emergency responders, and medical facilities to facilitate the timely exchange of critical information, patient status updates, and medical resource requests during emergencies or incidents requiring medical intervention?" },
                        { name: "patientNotificationProtocols", label: "Are protocols in place for notifying medical facilities of incoming patients, sharing situational awareness, and coordinating medical transport logistics to ensure seamless transitions of care and continuity of treatment for individuals requiring hospitalization or advanced medical care?" },
                    ].map((question, index) => (
                        <div key={index + 6} className="form-section">
                            <label>{question.label}</label>
                            {question.name === "patientNotificationProtocols" ? (
                                <><div>
                                    <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                                    <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                                </div><input type="text" name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange} /></>

                            ) : (
                                <input type="text" name={question.name} placeholder={question.label.split("?")[0] + "..."} value={formData[question.name] || ''} onChange={handleChange} />
                            )}
                        </div>
                    ))}

                    <h2>Community Engagement and Education:</h2>
                    {[
                        { name: "communityMedicalEducation", label: "How are community members, including students, staff, families, and local residents, educated about the availability, location, and capabilities of nearby hospitals or medical facilities to address medical needs and emergencies within the community?" },
                        { name: "medicalAwarenessOutreach", label: "Are outreach efforts conducted to raise awareness about the importance of timely access to medical care, the role of medical facilities in emergency response, and strategies for seeking medical assistance during emergencies or health-related crises?" },
                    ].map((question, index) => (
                        <div key={index + 8} className="form-section">
                            <label>{question.label}</label>
                            {question.name === "medicalAwarenessOutreach" ? (
                                <><div>
                                    <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                                    <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                                </div><input type="text" name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange} /></>

                            ) : (
                                <input type="text" name={question.name} placeholder={question.label.split("?")[0] + "..."} value={formData[question.name] || ''} onChange={handleChange} />
                            )}
                        </div>
                    ))}

                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
                    {imageUploadError && <p style={{ color: "red" }}>{imageUploadError}</p>}
                    <button type='submit'>Submit</button>
                </form>
            </main>
        </div>
    );
}

export default MedicalFacilitiesFormPage;