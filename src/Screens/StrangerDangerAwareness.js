import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function StangerDangerAwarenessFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadImage = httpsCallable(functions, 'uploadStrangerDangerAwarenessImage');

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
                const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Stranger Danger Awareness', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Stranger Danger Awareness', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Stranger Danger Awareness', buildingId);
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
                <h1>Stranger Danger Awareness Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Stranger Danger Awareness</h2>
                    {[
                        { name: "strangerDangerEducation", label: "How are students educated about the concept of stranger danger, and what specific examples or scenarios are used to illustrate potential risks associated with interacting with unfamiliar individuals?" },
                        { name: "strangerDangerCurriculum", label: "Can you describe the curriculum or instructional materials used to teach students about stranger danger, including any age-appropriate resources or activities designed to engage students in understanding and recognizing potential threats from strangers?" },
                        { name: "engageInRolePlayingScenarios", label: "Are there opportunities for students to engage in discussions or role-playing exercises that simulate real-world scenarios involving encounters with strangers, allowing them to apply their knowledge and critical thinking skills to assess and respond to different situations?" },
                        { name: "strategiesForIdentifyingSafeVsUnsafe", label: "What strategies are incorporated into the curriculum to help students differentiate between safe and unsafe situations when interacting with strangers, and how are these concepts reinforced through ongoing discussions, activities, or practical exercises?" },
                        { name: "encouragingRiskAssessment", label: "How are students encouraged to assess the context and circumstances of encounters with strangers, and what specific criteria or indicators are emphasized to help them evaluate the level of risk and determine appropriate actions to ensure their safety?" },
                        { name: "assertPersonalBoundariesExamples", label: "Can you provide examples of how students are empowered to assert their personal boundaries and make informed decisions about how to respond to offers, requests, or invitations from strangers that may pose potential risks to their safety or well-being?" },
                        { name: "assertiveCommunicationStrategies", label: "What strategies or techniques are taught to students to help them assertively communicate their boundaries and preferences when interacting with strangers, and how are these skills reinforced through role-playing activities, peer discussions, or real-world scenarios?" },
                        { name: "supportingConfidenceInDecliningAdvances", label: "How do educators and school staff support students in developing confidence and self-assurance to assertively decline unwanted advances or requests from strangers, and what resources or support systems are available to students who may require additional assistance or guidance in navigating challenging situations?" },
                        { name: "advocatingForSafetyAndWellBeing", label: "Can you describe how students are encouraged to advocate for their own safety and well-being by asserting control over their personal space, choices, and interactions with strangers, and how these principles are integrated into broader discussions about respect, consent, and healthy relationships?" },
                        { name: "effectiveCommunicationWithAdults", label: "What strategies are implemented to help students effectively communicate with trusted adults or authority figures about encounters with strangers, and how are these communication skills reinforced through practice, feedback, and reflection?" },
                        { name: "educationOnReportingSuspiciousEncounters", label: "How are students educated about the importance of reporting suspicious or concerning encounters with strangers to school staff or other trusted individuals, and what procedures are in place to ensure that such reports are taken seriously and addressed promptly?" },
                        { name: "encouragingOpenExpressionAndSupport", label: "Can you provide examples of how students are encouraged to express their concerns or discomfort openly and honestly when discussing encounters with strangers, and how school staff respond to ensure that students feel supported, validated, and empowered to take appropriate action to protect themselves?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.name === "engageInRolePlayingScenarios" ? (
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

export default StangerDangerAwarenessFormPage;