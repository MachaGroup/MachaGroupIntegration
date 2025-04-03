import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function ParentInvolvement2FormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadImage = httpsCallable(functions, 'uploadParentInvolvement2FormPageImage');

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
                const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Parent Involvement', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Parent Involvement', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Parent Involvement', buildingId);
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
                <h1>Parent Involvement Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Information Sessions:</h2>
                    {[
                        { name: "parentalCommunication", label: "How are parents informed about the emergency procedures and protocols established by the school or educational institution?" },
                        { name: "parentWorkshops", label: "Are information sessions or workshops organized specifically to educate parents about emergency preparedness and response?", type: "radio" },
                        { name: "sessionTopics", label: "What topics are covered during these information sessions, and how are they tailored to meet the informational needs and concerns of parents?" },
                        { name: "parentEngagement", label: "Are opportunities provided for parents to ask questions, seek clarification, or express their opinions and feedback regarding emergency procedures?", type: "radio" },
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

                    <h2>Communication Channels:</h2>
                    {[
                        { name: "communicationChannels", label: "What communication channels are used to disseminate information about emergency procedures to parents?" },
                        { name: "writtenCommunication", label: "Are newsletters, emails, or other forms of written communication regularly sent to parents to provide updates and reminders about emergency preparedness?", type: "radio" },
                        { name: "onlineCommunication", label: "How are social media platforms or school websites utilized to share relevant information and resources with parents regarding emergency procedures?" },
                        { name: "notificationSystems", label: "Are emergency notification systems in place to alert parents in real-time about critical incidents or urgent situations affecting the school community?" },
                    ].map((question, index) => (
                        <div key={index + 4} className="form-section">
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

                    <h2>Parent Education Resources:</h2>
                    {[
                        { name: "parentalResources", label: "Are educational materials or resources provided to parents to support their understanding of emergency procedures and their role in supporting their children's preparedness?", type: "radio" },
                        { name: "resourceAvailability", label: "What types of resources are available to parents, such as pamphlets, handouts, or online guides, and how accessible are they?" },
                        { name: "homeDiscussionGuidance", label: "Are parents encouraged to review and discuss emergency procedures with their children at home, and are guidance materials provided to facilitate these discussions?", type: "radio" },
                        { name: "homeReinforcement", label: "How are parents encouraged to reinforce emergency preparedness concepts and skills learned at school within the home environment?" },
                    ].map((question, index) => (
                        <div key={index + 8} className="form-section">
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

                    <h2>Parent Feedback and Engagement:</h2>
                    {[
                        { name: "parentFeedback", label: "Are mechanisms in place to solicit feedback from parents regarding their understanding of emergency procedures and their perceived effectiveness?" },
                        { name: "parentConcerns", label: "How are parent perspectives and concerns regarding emergency preparedness considered and addressed by school administrators and staff?" },
                        { name: "parentInvolvement", label: "Are parents invited to participate in planning committees, advisory groups, or other forums focused on emergency preparedness and safety?", type: "radio" },
                        { name: "ongoingCollaboration", label: "What measures are taken to foster ongoing engagement and collaboration between parents and school stakeholders in enhancing emergency preparedness efforts?" },
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

                    <h2>Participation in Drills and Exercises:</h2>
                    {[
                        { name: "parentParticipation", label: "Are parents encouraged or invited to participate in emergency drills and exercises conducted by the school or educational institution?", type: "radio" },
                        { name: "drillCommunication", label: "How are parents informed about upcoming drills and exercises, and what instructions or expectations are provided to them regarding their involvement?" },
                        { name: "parentalObservation", label: "Are opportunities provided for parents to observe or volunteer during emergency drills to gain firsthand experience and understanding of school emergency procedures?", type: "radio" },
                        { name: "feedbackMechanisms", label: "What feedback mechanisms are in place to gather input from parents about their observations and experiences during emergency drills?" },
                    ].map((question, index) => (
                        <div key={index + 16} className="form-section">
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

export default ParentInvolvement2FormPage;