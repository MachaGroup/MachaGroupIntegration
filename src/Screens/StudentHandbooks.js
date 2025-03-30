import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function StudentHandbooksFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadImage = httpsCallable(functions, 'uploadStudentHandbooksImage');

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
                const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Student Handbook', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Student Handbook', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Student Handbook', buildingId);
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
                <h1>Student Handbooks Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Student Handbooks</h2>
                    {[
                        { name: "handbookProcedures", label: "What emergency procedures and protocols are included in the student handbooks, and how comprehensively are they covered?" },
                        { name: "procedureClarity", label: "Are emergency procedures outlined in a clear, concise, and easily understandable manner within the student handbooks?" },
                        { name: "emergencyIntructions", label: "Do the student handbooks provide detailed instructions and guidance on actions to take during various types of emergencies, such as evacuations, lockdowns, or medical incidents?" },
                        { name: "additionalResource", label: "Are additional resources or references provided in the student handbooks to support understanding and implementation of emergency procedures?" },
                        { name: "handbookDistribution", label: "How are student handbooks distributed to students, and are they readily accessible to all members of the student body?" },
                        { name: "formatAccessibility", label: "Are student handbooks provided in multiple formats to accommodate different learning preferences or accessibility needs (e.g., print, digital, audio)?" },
                        { name: "handbookUpdates", label: "What measures are in place to ensure that student handbooks are regularly updated and maintained to reflect current emergency procedures and protocols?" },
                        { name: "languageAccessibility", label: "Are student handbooks available in languages other than English to support students with limited English proficiency or non-native speakers?" },
                        { name: "handbookTraining", label: "How are students trained on the contents of the student handbooks and familiarized with emergency procedures?" },
                        { name: "orientationActivities", label: "Are orientation sessions, classroom discussions, or interactive activities conducted to introduce students to the information contained in the student handbooks?" },
                        { name: "reinforcementStrategies", label: "What strategies are employed to reinforce key concepts and ensure retention of emergency procedures among students?" },
                        { name: "peerInvolvement", label: "Are student leaders, peer mentors, or older students involved in assisting with the dissemination and explanation of information from the student handbooks?" },
                        { name: "curriculumIntegration", label: "How are the contents of the student handbooks integrated into the school curriculum to reinforce emergency preparedness education?" },
                        { name: "alignedLessons", label: "Are specific lessons or activities designed to align with the emergency procedures outlined in the student handbooks?" },
                        { name: "staffEncouragement", label: "How are teachers and staff members encouraged to reference and reinforce information from the student handbooks in their instructional practices?" },
                        { name: "practicalApplication", label: "Are opportunities provided for students to apply knowledge and skills related to emergency procedures in simulated scenarios or real-life situations?" },
                        { name: "studentFeedback", label: "Are mechanisms in place to gather feedback from students regarding the usefulness and effectiveness of the information provided in the student handbooks?" },
                        { name: "feedbackIntegration", label: "How are suggestions or concerns raised by students regarding emergency procedures in the student handbooks addressed and incorporated into revisions?" },
                        { name: "handbookEvaluation", label: "Are periodic reviews and evaluations conducted to assess the impact of the student handbooks on student preparedness and response to emergencies?" },
                        { name: "continuousImprovement", label: "What measures are taken to continuously improve the content, format, and accessibility of the student handbooks based on feedback and evaluation findings?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.name === "procedureClarity" || question.name === "emergencyIntructions" || question.name === "additionalResource" || question.name === "formatAccessibility" || question.name === "languageAccessibility" || question.name === "orientationActivities" || question.name === "alignedLessons" || question.name === "handbookEvaluation" || question.name === "peerInvolvement" ? (
                                <><div>
                                    <input
                                        type="radio"
                                        name={question.name}
                                        value="yes"
                                        checked={formData[question.name] === "yes"}
                                        onChange={handleChange} /> Yes
                                    <input
                                        type="radio"
                                        name={question.name}
                                        value="no"
                                        checked={formData[question.name] === "no"}
                                        onChange={handleChange} /> No

                                </div><div>
                                        <input
                                            type="text"
                                            name={`${question.name}Comment`}
                                            placeholder="Comments"
                                            value={formData[`${question.name}Comment`] || ''}
                                            onChange={handleChange} />
                                    </div></>
                            
                            ) : (
                                <input
                                    type="text"
                                    name={question.name}
                                    value={formData[question.name] || ''}
                                    onChange={handleChange}
                                    placeholder={question.label}
                                />
                            )}
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

export default StudentHandbooksFormPage;