import React, { useState, useEffect } from 'react';
import { getFirestore, collection, doc, getDoc, setDoc, } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";


function PeerSupportNetworksFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadImage = httpsCallable(functions, 'uploadPeerSupportNetworksFormPageImage');

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
                const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Peer Support Networks', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Peer Support Networks', buildingId);
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
            const buildingRef = doc(db, 'Buildings', buildingId);
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Peer Support Networks', buildingId);
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
                <h1>Peer Support Networks Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Training and Structure:</h2>
                    {[
                        { name: "memberSelection", label: "How are peer support network members selected or trained to ensure they possess the necessary skills and knowledge to effectively support their peers?" },
                        { name: "supportMechanisms", label: "What ongoing support or supervision mechanisms are in place to assist peer supporters in managing their roles and addressing challenging situations?" },
                        { name: "networkStructure", label: "How is the structure of the peer support network designed to facilitate effective communication, collaboration, and coordination among members?" },
                        { name: "confidentialityProtocols", label: "Are there established protocols or guidelines for maintaining confidentiality and ensuring that peer support interactions are conducted in a safe and respectful manner?" },
                        { name: "programIntegration", label: "How are peer support network activities integrated with existing school programs or initiatives aimed at promoting mental health and well-being?" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <input type="text" name={question.name} placeholder={question.label.split(" ").slice(1, 6).join(" ")} onChange={handleChange} />
                        </div>
                    ))}
                    <h2>Accessibility and Outreach:</h2>
                    {[
                        { name: "awarenessEfforts", label: "What efforts are made to promote awareness of the peer support network among students, and how accessible is information about accessing support from peer supporters?" },
                        { name: "accessBarriers", label: "How are barriers to accessing peer support addressed, particularly for students who may be reluctant to seek help or who face additional challenges in reaching out?" },
                        { name: "inclusivityStrategies", label: "Are there strategies in place to ensure that peer support services are inclusive and reach a diverse range of students, including those from marginalized or underserved communities?" },
                        { name: "feedbackEvaluation", label: "How is feedback from students used to evaluate the accessibility and effectiveness of the peer support network, and what adjustments are made based on this feedback?" },
                        { name: "partnerships", label: "Are there partnerships or collaborations with other school or community organizations to enhance the visibility and reach of the peer support network?" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.name === "inclusivityStrategies" ? (
                                <><div>
                                    <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                                    <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                                </div><input type="text" name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange} /></>

                            ) : (
                                <input type="text" name={question.name} placeholder={question.label.split(" ").slice(1, 6).join(" ")} onChange={handleChange} />
                            )}
                        </div>
                    ))}

                    <h2>Training and Skill Development:</h2>
                    {[
                        { name: "trainingOpportunities", label: "What specific training or skill development opportunities are provided to peer support network members to enhance their capacity to provide effective support to their peers?" },
                        { name: "trainingTailoring", label: "How are training curricula or materials tailored to address the unique needs and challenges of peer supporters, including topics such as active listening, empathy, and boundary setting?" },
                        { name: "ongoingTraining", label: "Are there opportunities for peer supporters to receive ongoing training or professional development to further develop their skills and expertise?" },
                        { name: "trainingEffectiveness", label: "How is the effectiveness of training programs assessed, and what mechanisms are in place for incorporating feedback from peer supporters into future training initiatives?" },
                        { name: "recognition", label: "Are there provisions for recognizing and rewarding the contributions of peer supporters, such as certifications, awards, or opportunities for leadership development?" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.name === "ongoingTraining" || question.name === "recognition" ? (
                                <><div>
                                    <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                                    <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                                </div><input type="text" name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange} /></>

                            ) : (
                                <input type="text" name={question.name} placeholder={question.label.split(" ").slice(1, 6).join(" ")} onChange={handleChange} />
                            )}
                        </div>
                    ))}

                    <h2>Peer Support Activities and Services:</h2>
                    {[
                        { name: "supportServices", label: "What types of support services or activities are offered through the peer support network, and how are these tailored to meet the diverse needs and preferences of students?" },
                        { name: "inclusivity", label: "How are peer support activities structured to promote inclusivity, diversity, and cultural competence, ensuring that all students feel welcome and valued?" },
                        { name: "proactiveOutreach", label: "Are there opportunities for peer supporters to engage in proactive outreach and engagement efforts to connect with students who may benefit from support but may not actively seek it out?" },
                        { name: "alignmentWithGoals", label: "How are peer support services aligned with broader school goals or initiatives related to mental health promotion, bullying prevention, or student well-being?" },
                        { name: "impactEvaluation", label: "Are there mechanisms in place for evaluating the impact and effectiveness of peer support activities, such as collecting feedback from participants or tracking outcomes over time?" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.name === "proactiveOutreach" ? (
                                <><div>
                                    <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                                    <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                                </div><input type="text" name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange} /></>

                            ) : (
                                <input type="text" name={question.name} placeholder={question.label.split(" ").slice(1, 6).join(" ")} onChange={handleChange} />
                            )}
                        </div>
                    ))}

                    <h2>Collaboration and Referral Networks:</h2>
                    {[
                        { name: "serviceCollaboration", label: "How does the peer support network collaborate with other school-based support services, such as counseling centers, student support teams, or health services, to ensure coordinated care for students?" },
                        { name: "referralProtocols", label: "What protocols or procedures are in place for referring students to additional support services or resources beyond the scope of peer support, when needed?" },
                        { name: "externalPartnerships", label: "Are there established partnerships or referral networks with external organizations or community agencies to expand the range of support options available to students?" },
                        { name: "communicationChannels", label: "How are communication channels maintained between peer supporters and other support providers to facilitate information sharing, continuity of care, and follow-up?" },
                        { name: "referralTracking", label: "Are there mechanisms for tracking and monitoring referrals made by peer supporters to ensure that students receive appropriate follow-up and support?" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <input type="text" name={question.name} placeholder={question.label.split(" ").slice(1, 6).join(" ")} onChange={handleChange} />
                        </div>
                    ))}

                    <h2>Evaluation and Continuous Improvement:</h2>
                    {[
                        { name: "effectivenessEvaluation", label: "How is the effectiveness of the peer support network evaluated, and what metrics or indicators are used to assess its impact on student well-being and school climate?" },
                        { name: "feedbackCollection", label: "Are there mechanisms for collecting feedback from both peer supporters and students who have received support to gather insights into their experiences and satisfaction with the service?" },
                        { name: "improvementSteps", label: "How are evaluation findings used to identify areas for improvement or refinement in the peer support network, and what steps are taken to implement changes based on these findings?" },
                        { name: "researchOpportunities", label: "Are there opportunities for ongoing research or evaluation studies to further explore the outcomes and benefits of peer support interventions within the school context?" },
                        { name: "sustainabilityStrategies", label: "How is the peer support network integrated into broader efforts to promote a positive and supportive school environment, and what strategies are employed to sustain its impact over time?" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.name === "researchOpportunities" ? (
                                <><div>
                                    <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                                    <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                                </div><input type="text" name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange} /></>

                            ) : (
                                <input type="text" name={question.name} placeholder={question.label.split(" ").slice(1, 6).join(" ")} onChange={handleChange} />
                            )}
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

export default PeerSupportNetworksFormPage;