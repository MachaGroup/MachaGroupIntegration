import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function PhishingAwarenessTrainingPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadPhishingAwarenessTrainingPageImage = httpsCallable(functions, 'uploadPhishingAwarenessTrainingPageImage');

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
                const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Phishing Awareness Training', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Phishing Awareness Training', buildingId);
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
                const uploadResult = await uploadPhishingAwarenessTrainingPageImage({ imageData: imageData });
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
            const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Phishing Awareness Training', buildingId);
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
                <h1>Phishing Awareness Training Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>4.3.1.1.2.1 Training Content and Structure:</h2>
                    {[
                        { name: "trainingTopics", label: "What specific topics are covered in phishing awareness training, and how are they designed to address the latest phishing tactics and techniques?" },
                        { name: "interactiveTraining", label: "Are the training modules interactive and engaging to ensure users are actively learning and retaining information?" },
                        { name: "trainingUpdateFrequency", label: "How frequently is phishing awareness training updated to reflect new threats and developments in phishing tactics?" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.name === "interactiveTraining" ? (
                                <><div>
                            <input type="radio" name={question.name} value="Yes" checked={formData[question.name] === "Yes"} onChange={handleChange} /> Yes
                            <input type="radio" name={question.name} value="No" checked={formData[question.name] === "No"} onChange={handleChange} /> No
                          </div><textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea></>

                            ) : (
                                <textarea name={question.name} value={formData[question.name] || ''} onChange={handleChange}></textarea>
                            )}
                        </div>
                    ))}

                    <h2>4.3.1.1.2.2 Effectiveness and Retention:</h2>
                    {[
                        { name: "effectivenessMeasurement", label: "How is the effectiveness of phishing awareness training measured (e.g., user assessments, reduced phishing incidents)?" },
                        { name: "refresherCourses", label: "Are there periodic refresher courses to reinforce key concepts and ensure ongoing vigilance against phishing threats?" },
                        { name: "knowledgeRetentionAssessment", label: "What methods are used to assess knowledge retention over time, and how is this data used to improve the training program?" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.name === "refresherCourses" ? (
                                <><div>
                            <input type="radio" name={question.name} value="Yes" checked={formData[question.name] === "Yes"} onChange={handleChange} /> Yes
                            <input type="radio" name={question.name} value="No" checked={formData[question.name] === "No"} onChange={handleChange} /> No
                          </div><textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea></>

                            ) : (
                                <textarea name={question.name} value={formData[question.name] || ''} onChange={handleChange}></textarea>
                            )}
                        </div>
                    ))}

                    <h2>4.3.1.1.2.3 Customization and Relevance:</h2>
                    {[
                        { name: "roleBasedTraining", label: "Is the phishing awareness training tailored to different user roles within the organization to address specific risks and scenarios they may encounter?" },
                        { name: "trainingAdaptation", label: "How does the training accommodate users with varying levels of technical expertise and familiarity with phishing threats?" },
                        { name: "realWorldExamples", label: "Are real-world examples and case studies used in the training to provide practical, relatable insights for users?" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.name === "roleBasedTraining" || question.name === "realWorldExamples" ? (
                                <><div>
                            <input type="radio" name={question.name} value="Yes" checked={formData[question.name] === "Yes"} onChange={handleChange} /> Yes
                            <input type="radio" name={question.name} value="No" checked={formData[question.name] === "No"} onChange={handleChange} /> No
                          </div><textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea></>

                            ) : (
                                <textarea name={question.name} value={formData[question.name] || ''} onChange={handleChange}></textarea>
                            )}
                        </div>
                    ))}

                    <h2>4.3.1.1.2.4 User Feedback and Engagement:</h2>
                    {[
                        { name: "userFeedbackMechanism", label: "Is there a mechanism for users to provide feedback on the phishing awareness training program, and how is this feedback incorporated into future updates?" },
                        { name: "questionsOpportunities", label: "Are there opportunities for users to ask questions or seek clarification on phishing-related concerns during or after training sessions?" },
                        { name: "engagementMeasurement", label: "How is user engagement measured during training sessions, and what strategies are in place to maintain high levels of participation?" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.name === "questionsOpportunities" ? (
                                <><div>
                            <input type="radio" name={question.name} value="Yes" checked={formData[question.name] === "Yes"} onChange={handleChange} /> Yes
                            <input type="radio" name={question.name} value="No" checked={formData[question.name] === "No"} onChange={handleChange} /> No
                          </div><textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea></>

                            ) : (
                                <textarea name={question.name} value={formData[question.name] || ''} onChange={handleChange}></textarea>
                            )}
                        </div>
                    ))}

                    <h2>4.3.1.1.2.5 Integration with Broader Security Awareness Programs:</h2>
                    {[
                        { name: "integrationWithAwareness", label: "How is phishing awareness training integrated with other cybersecurity awareness initiatives, such as data protection and password security?" },
                        { name: "crossDepartmentalEfforts", label: "Are there cross-departmental efforts to ensure a cohesive approach to phishing awareness across the organization?" },
                        { name: "trainingSuccessLink", label: "How is the success of phishing awareness training linked to broader organizational goals, such as reducing security breaches and enhancing overall cybersecurity posture?" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.name === "crossDepartmentalEfforts" ? (
                                <><div>
                            <input type="radio" name={question.name} value="Yes" checked={formData[question.name] === "Yes"} onChange={handleChange} /> Yes
                            <input type="radio" name={question.name} value="No" checked={formData[question.name] === "No"} onChange={handleChange} /> No
                          </div><textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea></>

                            ) : (
                                <textarea name={question.name} value={formData[question.name] || ''} onChange={handleChange}></textarea>
                            )}
                        </div>
                    ))}

                    <h2>4.3.1.1.2.6 Continuous Improvement and Adaptation:</h2>
                    {[
                        { name: "regularReviews", label: "Are there regular reviews of phishing awareness training materials to ensure they remain current and effective?" },
                        { name: "materialEvolution", label: "How does the organization ensure that training materials evolve in response to emerging phishing tactics and technologies?" },
                        { name: "lessonsLearned", label: "Is there a process for incorporating lessons learned from real phishing incidents into the training program?" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.name === "regularReviews" ? (
                                <><div>
                            <input type="radio" name={question.name} value="Yes" checked={formData[question.name] === "Yes"} onChange={handleChange} /> Yes
                            <input type="radio" name={question.name} value="No" checked={formData[question.name] === "No"} onChange={handleChange} /> No
                          </div><textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea></>

                            ) : (
                                <textarea name={question.name} value={formData[question.name] || ''} onChange={handleChange}></textarea>
                            )}
                        </div>
                    ))}

                    <h2>4.3.1.1.2.7 Compliance and Accountability:</h2>
                    {[
                        { name: "complianceRequirements", label: "Are there any regulatory or compliance requirements driving the need for phishing awareness training within the organization?" },
                        { name: "complianceTracking", label: "How is compliance with phishing awareness training tracked and reported to ensure all employees participate as required?" },
                        { name: "trainingConsequences", label: "Are there consequences or follow-up actions for employees who fail to complete training or demonstrate poor phishing awareness?" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.name === "complianceRequirements" ? (
                                <><div>
                            <input type="radio" name={question.name} value="Yes" checked={formData[question.name] === "Yes"} onChange={handleChange} /> Yes
                            <input type="radio" name={question.name} value="No" checked={formData[question.name] === "No"} onChange={handleChange} /> No
                          </div><textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea></>

                            ) : (
                                <textarea name={question.name} value={formData[question.name] || ''} onChange={handleChange}></textarea>
                            )}
                        </div>
                    ))}

                    <h2>4.3.1.1.2.8 Support Resources and Tools:</h2>
                    {[
                        { name: "additionalResources", label: "Are users provided with additional resources or tools (e.g., guides, checklists) to help them recognize phishing attempts outside of formal training?" },
                        { name: "ongoingSupport", label: "Is there ongoing support available, such as a helpdesk or dedicated team, to assist users with phishing-related questions or concerns?" },
                        { name: "userEncouragement", label: "How are users encouraged to stay vigilant and proactive in reporting suspected phishing emails or incidents?" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.name === "additionalResources" || question.name === "ongoingSupport" ? (
                                <><div>
                            <input type="radio" name={question.name} value="Yes" checked={formData[question.name] === "Yes"} onChange={handleChange} /> Yes
                            <input type="radio" name={question.name} value="No" checked={formData[question.name] === "No"} onChange={handleChange} /> No
                          </div><textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea></>

                            ) : (
                                <textarea name={question.name} value={formData[question.name] || ''} onChange={handleChange}></textarea>
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

export default PhishingAwarenessTrainingPage;