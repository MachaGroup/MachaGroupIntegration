import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function TrainingProvidersFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadImage = httpsCallable(functions, 'uploadTrainingProvidersImage');

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
                const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Training Providers', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Training Providers', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Training Providers', buildingId);
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
                <h1>Training Providers Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Training Providers</h2>
                    {[
                        { name: "providerCertification", label: "Are training providers certified and accredited to deliver First Aid/CPR training programs?" },
                        { name: "providerStandardsCompliance", label: "Do training providers adhere to recognized standards and guidelines for First Aid/CPR training, such as those established by organizations like the American Red Cross or the American Heart Association?" },
                        { name: "instructorQualification", label: "Are instructors employed by training providers qualified and experienced in delivering First Aid/CPR training?" },
                        { name: "instructorCertificationList", label: "Do instructors possess relevant certifications and qualifications, such as Certified First Aid/CPR Instructor credentials?" },
                        { name: "curriculumComprehensiveness", label: "Is the training curriculum comprehensive and up-to-date, covering essential topics related to First Aid/CPR procedures, techniques, and best practices?" },
                        { name: "curriculumAlignment", label: "Does the curriculum align with recognized standards and guidelines for First Aid/CPR training?" },
                        { name: "trainingEnvironment", label: "Are training sessions conducted in a suitable training environment that allows for hands-on practice and skills demonstration?" },
                        { name: "trainingMethodsVariety", label: "Are training sessions delivered using a variety of instructional methods and resources to accommodate different learning styles and preferences?" },
                        { name: "participantEngagement", label: "Are training sessions interactive and engaging, encouraging active participation and skills development among participants?" },
                        { name: "practiceOpportunities", label: "Are opportunities provided for participants to ask questions, seek clarification, and practice First Aid/CPR techniques under instructor supervision?" },
                        { name: "participantAssessment", label: "Are participants assessed on their understanding and proficiency in First Aid/CPR procedures through written tests and practical skills assessments?" },
                        { name: "instructorEvaluationFeedback", label: "Are instructors responsible for evaluating participant performance and providing constructive feedback for improvement?" },
                        { name: "participantCertification", label: "Are participants awarded certifications upon successful completion of First Aid/CPR training courses?" },
                        { name: "recertificationDetails", label: "Is there a process in place for recertifying staff members on a regular basis to ensure that their skills and knowledge remain current and up-to-date?" },
                        { name: "feedbackDetails", label: "Are feedback mechanisms in place to gather input from participants regarding the quality and effectiveness of First Aid/CPR training programs?" },
                        { name: "recommendationsImplementation", label: "Are recommendations for enhancing training content, delivery methods, or instructor performance considered and implemented based on feedback received?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.name === "providerCertification" || question.name === "providerStandardsCompliance" || question.name === "instructorQualification" || question.name === "curriculumComprehensiveness" || question.name === "curriculumAlignment" || question.name === "trainingEnvironment" || question.name === "trainingMethodsVariety" || question.name === "participantEngagement" || question.name === "practiceOpportunities" || question.name === "participantAssessment" || question.name === "instructorEvaluationFeedback" || question.name === "participantCertification" || question.name === "recommendationsImplementation" ? (
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
                          </div>
                          <div>
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

export default TrainingProvidersFormPage;