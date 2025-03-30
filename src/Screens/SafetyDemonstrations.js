import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function SafetyDemonstrationsFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadSafetyDemonstrationsImage = httpsCallable(functions, 'uploadSafetyDemonstrationsImage');

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
                const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Safety Demonstrations', buildingId);
                const docSnapshot = await getDoc(formDocRef);

                if (docSnapshot.exists()) {
                    const data = docSnapshot.data();
                    setFormData(data.formData || {});
                    setImageUrl(data.imageUrl || null);
                    console.log("Data loaded:", data);
                } else {
                    setFormData({});
                    console.log("No form data for this building");
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
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Safety Demonstrations', buildingId);
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
                const uploadResult = await uploadSafetyDemonstrationsImage({ imageData: imageData });
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
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Safety Demonstrations', buildingId);
            await setDoc(formDocRef, { formData: { ...formData, building: buildingRef }, imageUrl: imageUrl, updatedAt: serverTimestamp() }, { merge: true });
            console.log('Form data submitted successfully!');
            alert('Form submitted successfully!');
            navigate('/Form');
        } catch (error) {
            console.error("Error submitting form:", error);
            alert('Failed to submit the form. Please try again.');
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
                <h1>Safety Demonstrations Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>
            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Safety Demonstrations Assessment</h2>
                    {[
                        { name: "safetyDemonstrationsFrequency", label: "How frequently are safety demonstrations conducted within the school or educational institution, and which safety topics are covered?" },
                        { name: "safetyDemonstrationsIntegration", label: "Are safety demonstrations integrated into regular classroom instruction, special assemblies, or designated safety awareness events?" },
                        { name: "safetyDemonstrationsTopics", label: "What range of safety topics are addressed in the demonstrations, such as fire safety, first aid basics, personal safety, or disaster preparedness?" },
                        { name: "demonstrationTechniques", label: "What techniques or methods are used to deliver safety demonstrations to students, staff, and other stakeholders?" },
                        { name: "demonstrationTechniquesMethods", label: "Are live demonstrations, video presentations, interactive simulations, or hands-on activities employed to engage participants in learning about safety practices?" },
                        { name: "safetyDemonstrationsAdaptation", label: "How are safety demonstrations adapted to accommodate different learning styles, age groups, and cultural backgrounds of participants?" },
                        { name: "qualifiedInstructors", label: "Are demonstrations facilitated by qualified instructors or safety professionals with expertise in the specific safety topics being covered?" },
                        { name: "practicalSafetySkills", label: "Do safety demonstrations include opportunities for participants to practice and apply safety skills in simulated or real-life scenarios?" },
                        { name: "activeParticipantInvolvement", label: "Are participants actively involved in performing tasks such as operating fire extinguishers, administering basic first aid, or evacuating buildings during drills?" },
                        { name: "demonstrationStructure", label: "How are safety demonstrations structured to promote skill development, confidence building, and retention of safety knowledge among participants?" },
                        { name: "followUpActivities", label: "Are follow-up activities or assessments conducted to reinforce learning and assess participants' mastery of safety concepts and skills demonstrated?" },
                        { name: "demonstrationReinforcement", label: "How are safety demonstrations reinforced and reviewed beyond the initial presentation to ensure long-term retention and application of safety knowledge?" },
                        { name: "reviewSessions", label: "Are review sessions, quizzes, or interactive discussions conducted to revisit key safety concepts and reinforce learning points covered in the demonstrations?" },
                        { name: "safetyPracticesIncorporation", label: "What strategies are employed to encourage participants to incorporate safety practices into their daily routines and habits following the demonstrations?" },
                        { name: "refresherCourses", label: "Are refresher courses or ongoing training opportunities provided to maintain and update participants' proficiency in safety procedures over time?" },
                        { name: "feedbackMechanisms", label: "Are mechanisms in place to gather feedback from participants regarding their experience and effectiveness of safety demonstrations?" },
                        { name: "suggestionsIncorporation", label: "How are suggestions or concerns raised by participants regarding safety demonstrations addressed and incorporated into future presentations?" },
                        { name: "periodicEvaluations", label: "Are periodic evaluations or assessments conducted to measure the impact of safety demonstrations on participants' safety awareness, behavior, and preparedness?" },
                        { name: "continuousImprovementMeasures", label: "What measures are taken to continuously improve the content, delivery methods, and overall quality of safety demonstrations based on feedback and evaluation findings?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.name === "safetyDemonstrationsIntegration" || question.name === "demonstrationTechniquesMethods" || question.name === "qualifiedInstructors" || question.name === "practicalSafetySkills" || question.name === "activeParticipantInvolvement" || question.name === "reviewSessions" || question.name === "refresherCourses" || question.name === "periodicEvaluations" ? (
                                    <>
                                        <input
                                            type="radio"
                                            name={question.name}
                                            value="Yes"
                                            checked={formData[question.name] === "Yes"}
                                            onChange={handleChange}
                                        /> Yes
                                        <input
                                            type="radio"
                                            name={question.name}
                                            value="No"
                                            checked={formData[question.name] === "No"}
                                            onChange={handleChange}
                                        /> No
                                        <input
                                            type="text"
                                            name={`${question.name}Comment`}
                                            placeholder="Comments"
                                            value={formData[`${question.name}Comment`] || ''}
                                            onChange={handleChange}
                                        />
                                    </>
                                ) : (
                                    <textarea
                                        name={question.name}
                                        value={formData[question.name] || ''}
                                        onChange={handleChange}
                                    />
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
export default SafetyDemonstrationsFormPage;