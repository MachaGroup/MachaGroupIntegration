import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function BasicFirstAidTechniquesFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadImage = httpsCallable(functions, 'uploadBasicFirstAidTechniquesImage');

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
                const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Basic First Aid Techniques', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Basic First Aid Techniques', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Basic First Aid Techniques', buildingId);
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
                <h1>Basic First Aid Techniques</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Basic First Aid Techniques</h2>
                    {[
                        { name: "first-aid-comprehensiveness", label: "How comprehensively are basic first aid techniques covered in staff training programs?" },
                        { name: "training-modules-structure", label: "Are training modules structured to provide a balance of theoretical knowledge, practical skills demonstrations, and hands-on practice sessions?" },
                        { name: "first-aid-materials-coverage", label: "To what extent do training materials and resources address the application of basic first aid techniques in various emergency scenarios encountered in the school environment?" },
                        { name: "emergency-recognition-training", label: "Are staff members trained to recognize common signs and symptoms of medical emergencies and injuries that may require immediate first aid intervention?" },
                        { name: "first-aid-proficiency-assessment", label: "How are staff members assessed or evaluated to ensure proficiency in applying basic first aid techniques in simulated or real-life emergency situations?" },
                        { name: "skills-practice-opportunities", label: "What opportunities are provided for staff members to practice and demonstrate basic first aid techniques in simulated scenarios, role-playing exercises, or skills stations?" },
                        { name: "hands-on-props-usage", label: "Are hands-on practice sessions conducted using realistic training props, medical manikins, or simulated casualties to simulate various injury types and emergency scenarios?" },
                        { name: "instructor-guidance", label: "How are staff members guided and supported by certified instructors, facilitators, or subject matter experts during hands-on skills practice sessions?" },
                        { name: "skills-feedback", label: "Are staff members encouraged to actively participate in skills practice activities and receive constructive feedback on their performance?" },
                        { name: "learning-reinforcement-mechanisms", label: "What mechanisms are in place to reinforce learning and encourage ongoing skills development beyond initial training sessions?" },
                        { name: "first-aid-integration", label: "How are basic first aid techniques integrated into broader emergency response plans, procedures, and protocols?" },
                        { name: "life-threatening-priority-training", label: "Are staff members trained to recognize and prioritize life-threatening conditions and administer basic first aid interventions in accordance with established protocols and medical guidelines?" },
                        { name: "responder-coordination", label: "How do staff members coordinate and communicate with other responders, emergency services, or healthcare providers when providing basic first aid assistance during emergencies?" },
                        { name: "continuity-of-care-provisions", label: "What provisions are in place to ensure continuity of care and seamless transition of injured or ill individuals to higher levels of medical care?" },
                        { name: "first-aid-documentation-training", label: "Are staff members trained to document and report basic first aid interventions within the school's incident reporting system or medical logbook?" },
                        { name: "post-aid-management", label: "How are injured or ill individuals managed and monitored following basic first aid interventions?" },
                        { name: "care-transfer-procedures", label: "What procedures are in place to ensure continuity of care and facilitate patient transport or transfer to higher levels of medical care?" },
                        { name: "emotional-support-training", label: "Are staff members trained to provide emotional support, reassurance, and ongoing monitoring to individuals receiving basic first aid interventions?" },
                        { name: "follow-up-procedures", label: "How are follow-up procedures implemented to document incidents, assess outcomes, and provide post-incident debriefing or support?" },
                        { name: "community-resources-awareness", label: "Are staff members familiar with community resources and referral pathways for individuals requiring additional medical or psychological support beyond basic first aid?" },
                        { name: "aid-intervention-documentation", label: "How are basic first aid interventions documented, recorded, and reported within the school's incident reporting system or electronic health record system?" },
                        { name: "documentation-guidance", label: "What training or guidance is provided to staff members on the importance of timely and accurate documentation, confidentiality requirements, and legal considerations?" },
                        { name: "clear-documentation-training", label: "Are staff members trained to document patient assessments, treatments provided, and follow-up actions taken in a clear, concise, and objective manner?" },
                        { name: "record-analysis", label: "How are medical records or incident reports reviewed and analyzed to identify trends, evaluate response effectiveness, and inform continuous improvement efforts?" },
                        { name: "documentation-responsibility-awareness", label: "Are staff members aware of their responsibilities regarding incident reporting, documentation protocols, and data privacy regulations when documenting basic first aid treatments?" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.name === "training-modules-structure" || question.name === "emergency-recognition-training" || question.name === "hands-on-props-usage" || question.name === "skills-feedback" || question.name === "life-threatening-priority-training" || question.name === "first-aid-documentation-training" || question.name === "emotional-support-training" || question.name === "community-resources-awareness" || question.name === "clear-documentation-training" || question.name === "documentation-responsibility-awareness" ? (
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

                          </div><textarea
                              name={`${question.name}Comment`}
                              placeholder="Comment (Optional)"
                              value={formData[`${question.name}Comment`] || ''}
                              onChange={handleChange} /></>
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
                    <input type="file" onChange={handleImageChange} accept="image/*" />
                    {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
                    {imageUploadError && <p style={{ color: 'red' }}>{imageUploadError}</p>}
                    <button type="submit">Submit</button>
                </form>
            </main>
        </div>
    );
}

export default BasicFirstAidTechniquesFormPage;