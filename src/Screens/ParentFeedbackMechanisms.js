import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function ParentFeedbackMechanismsFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadImage = httpsCallable(functions, 'uploadParentFeedbackMechanismsFormPageImage');

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
                const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Parent Feedback Mechanisms', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Parent Feedback Mechanisms', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Parent Feedback Mechanisms', buildingId);
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
                <h1>Parent Feedback Mechanisms Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Feedback Collection Methods:</h2>
                    {[
                        { name: "feedbackMechanismsDescription", label: "What mechanisms or channels are available for parents to provide feedback on school safety, emergency preparedness, and communication processes?" },
                        { name: "feedbackMethodsDiversity", label: "Are feedback collection methods diversified to accommodate various preferences and communication styles of parents, such as surveys, suggestion boxes, town hall meetings, or online forums?", type: "radio" },
                        { name: "feedbackFrequency", label: "How frequently are opportunities for providing feedback offered to parents, and are they accessible and convenient for all members of the school community?" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.type === "radio" ? (
                                <><div>
                                    <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                                    <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                                </div><textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea></>

                            ) : (
                                <input type="text" name={question.name} placeholder={question.label} value={formData[question.name] || ''} onChange={handleChange} />
                            )}
                        </div>
                    ))}

                    <h2>Survey Design and Administration:</h2>
                    {[
                        { name: "surveyDesignDescription", label: "How are surveys designed, developed, and administered to solicit feedback from parents regarding their perceptions, experiences, and suggestions related to school safety and emergency communication?" },
                        { name: "surveyQuestionsStructure", label: "Are survey questions structured to capture key aspects of safety concerns, emergency responsiveness, communication effectiveness, and overall satisfaction with school safety measures?", type: "radio" },
                        { name: "surveyParticipationStrategies", label: "What strategies are employed to encourage participation, increase response rates, and ensure representative sampling in parent feedback surveys?" },
                    ].map((question, index) => (
                        <div key={index + 3} className="form-section">
                            <label>{question.label}</label>
                            {question.type === "radio" ? (
                                <><div>
                                    <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                                    <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                                </div><textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea></>

                            ) : (
                                <input type="text" name={question.name} placeholder={question.label} value={formData[question.name] || ''} onChange={handleChange} />
                            )}
                        </div>
                    ))}

                    <h2>Data Analysis and Interpretation:</h2>
                    {[
                        { name: "dataAnalysisMethods", label: "How is feedback data collected from parents analyzed, synthesized, and interpreted to identify trends, patterns, or recurring themes relevant to school safety and emergency communication?" },
                        { name: "feedbackDisaggregation", label: "Are mechanisms in place to disaggregate feedback by demographic factors, such as grade level, language proficiency, or parental involvement, to ensure equitable representation and address diverse perspectives?", type: "radio" },
                        { name: "feedbackInsightsTools", label: "What tools, software, or methodologies are utilized to extract actionable insights from parent feedback and inform decision-making processes related to school safety initiatives and communication strategies?" },
                    ].map((question, index) => (
                        <div key={index + 6} className="form-section">
                            <label>{question.label}</label>
                            {question.type === "radio" ? (
                                <><div>
                                    <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                                    <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                                </div><textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea></>

                            ) : (
                                <input type="text" name={question.name} placeholder={question.label} value={formData[question.name] || ''} onChange={handleChange} />
                            )}
                        </div>
                    ))}

                    <h2>Response and Follow-up:</h2>
                    {[
                        { name: "adminFeedbackResponse", label: "How does the school administration or leadership respond to feedback received from parents regarding school safety concerns, emergency preparedness, or communication challenges?" },
                        { name: "feedbackFollowupProtocols", label: "Are protocols established to acknowledge receipt of feedback, communicate follow-up actions, and provide updates or resolutions to address parent concerns in a timely and transparent manner?" },
                        { name: "accountabilityMeasures", label: "What measures are taken to demonstrate accountability, responsiveness, and continuous improvement in school safety practices and communication efforts based on parent feedback?" },
                    ].map((question, index) => (
                        <div key={index + 9} className="form-section">
                            <label>{question.label}</label>
                            <input type="text" name={question.name} placeholder={question.label} value={formData[question.name] || ''} onChange={handleChange} />
                        </div>
                    ))}

                    <h2>Engagement and Collaboration:</h2>
                    {[
                        { name: "parentCollaborationOpportunities", label: "Are opportunities provided for parents to participate in collaborative discussions, focus groups, or advisory committees aimed at reviewing feedback data, prioritizing safety initiatives, and co-creating solutions?", type: "radio" },
                        { name: "communicationCulture", label: "How does the school foster a culture of open communication, trust, and partnership with parents by actively seeking their input, valuing their perspectives, and integrating their feedback into decision-making processes?" },
                        { name: "integratedFeedbackMechanisms", label: "Are feedback mechanisms integrated into broader efforts to engage parents as active partners in promoting school safety, fostering community resilience, and enhancing emergency preparedness within the school community?" },
                    ].map((question, index) => (
                        <div key={index + 12} className="form-section">
                            <label>{question.label}</label>
                            {question.type === "radio" ? (
                                <><div>
                                    <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                                    <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                                </div><textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea></>

                            ) : (
                                <input type="text" name={question.name} placeholder={question.label} value={formData[question.name] || ''} onChange={handleChange} />
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

export default ParentFeedbackMechanismsFormPage;