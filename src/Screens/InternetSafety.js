import React, { useState, useEffect } from 'react';
import { getFirestore, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function InternetSafetyFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadInternetSafetyImage = httpsCallable(functions, 'uploadInternetSafetyImage');

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
                const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Internet Safety', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Internet Safety', buildingId);
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
                const uploadResult = await uploadInternetSafetyImage({ imageData: imageData });
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
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Internet Safety', buildingId);
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
                <h1>Internet Safety Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Internet Safety Assessment</h2>
                    {[
                        { name: "internetSafetyEducation", label: "How are students educated about the potential risks and dangers associated with internet use, including exposure to inappropriate content, online predators, cyberbullying, identity theft, and phishing scams?" },
                        { name: "internetSafetyCurriculumTopics", label: "Can you describe the topics covered in the internet safety curriculum, such as privacy settings, safe browsing habits, recognizing and reporting online threats, and responsible social media use, and how these concepts are presented to students in an age-appropriate manner?" },
                        { name: "strategiesForSafeOnlinePractices", label: "What strategies are taught to students to promote safe online practices, including the importance of creating strong, unique passwords, avoiding sharing personal information or photos with strangers, and being cautious when clicking on links or downloading files from unknown sources?" },
                        { name: "encouragingCriticalEvaluationOnline", label: "How are students encouraged to critically evaluate online information for accuracy, credibility, and potential biases, and what tools or resources are provided to help them fact-check sources, identify misinformation, and navigate digital media literacy challenges?" },
                        { name: "cyberbullyingCurriculum", label: "How does the curriculum address the topic of cyberbullying, including defining what constitutes cyberbullying behavior, its impact on victims, and strategies for preventing and responding to cyberbullying incidents?" },
                        { name: "teachingEmpathyAndDigitalCitizenship", label: "Are students taught empathy, respect, and digital citizenship skills to foster positive online behavior and promote a culture of kindness, inclusivity, and accountability in digital spaces?" },
                        { name: "cyberbullyingSupportMechanisms", label: "What support mechanisms are in place to assist students who experience cyberbullying, including reporting mechanisms, access to counseling or mental health services, and strategies for seeking help from trusted adults or peers?" },
                        { name: "parentalInvolvementInInternetSafety", label: "How are parents or guardians involved in reinforcing internet safety lessons at home, and what resources or guidance materials are provided to support parents in discussing online safety topics with their children?" },
                        { name: "parentEducationEventsWorkshops", label: "Can you describe any parent education events, workshops, or resources offered by the school to promote collaboration between educators and families in fostering a safe and responsible online environment for students?" },
                        { name: "communicationWithParentsOnInternetSafety", label: "How does the school communicate with parents about internet safety initiatives, including updates on curriculum content, online tools and resources, and recommendations for monitoring and supervising children's online activities outside of school hours?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.name === "teachingEmpathyAndDigitalCitizenship" ? (
                                    <>
                                        <input
                                            type="radio"
                                            name={question.name}
                                            value="yes"
                                            checked={formData[question.name] === "yes"}
                                            onChange={handleChange}
                                        /> Yes
                                        <input
                                            type="radio"
                                            name={question.name}
                                            value="no"
                                            checked={formData[question.name] === "no"}
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

export default InternetSafetyFormPage;