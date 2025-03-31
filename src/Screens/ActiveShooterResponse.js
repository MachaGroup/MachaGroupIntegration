import React, { useState, useEffect } from 'react';
import { getFirestore, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function ActiveShooterResponseFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadImage = httpsCallable(functions, 'uploadActiveShooterResponseImage');


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
            setLoadError(null); // Clear previous errors

            try {
                const formDocRef = doc(db,   'forms','Personnel Training and Awareness','Active Shooter Response', buildingId);
                const docSnapshot = await getDoc(formDocRef);

                if (docSnapshot.exists()) {
                    setFormData(docSnapshot.data().formData || {});
                } else {
                    setFormData({}); // Initialize if document doesn't exist
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
                        const formDocRef = doc(db,   'forms','Personnel Training and Awareness','Active Shooter Response', buildingId);
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
        navigate(-1); // Just navigate back
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
            const formDocRef = doc(db,'forms','Personnel Training and Awareness','Active Shooter Response', buildingId);
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
            <h1>Active Shooter Response Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                <h2>Training Curriculum and Content:</h2>
                {[
                    { name: "asrTrainingTopics", label: "What topics and skills are covered in active shooter response training programs, such as situational awareness, threat recognition, decision-making under stress, and survival tactics?" },
                    { name: "asrMaterialsAlignment", label: "Are training materials and resources based on recognized active shooter response protocols, guidelines, and recommendations from law enforcement agencies, security experts, or government agencies?" },
                    { name: "asrKeyConcepts", label: "How do active shooter response training programs address key concepts such as the 'Run, Hide, Fight' protocol, evacuation procedures, barricading techniques, and communication strategies during an active shooter incident?" },
                    { name: "asrScenarioSimulations", label: "To what extent do active shooter response training sessions incorporate scenario-based simulations, tabletop exercises, and live drills to prepare staff members for real-life emergencies?" },
                    { name: "asrScenarioPractice", label: "Are staff members provided with opportunities to practice response options, decision-making skills, and coordinated actions in simulated active shooter scenarios?" },
                    { name: "asrDrillConduction", label: "How are active shooter drills conducted to simulate various threat scenarios, test emergency communication systems, and evaluate staff readiness and response effectiveness?" },
                    { name: "asrCommunicationTraining", label: "How are staff members trained to communicate effectively with colleagues, students, and emergency responders during an active shooter incident?" },
                    { name: "asrCommunicationProtocols", label: "Are communication protocols established to relay critical information, issue alerts, and coordinate response efforts across different areas of the school campus?" },
                    { name: "asrExternalCommunication", label: "What mechanisms are in place to facilitate communication with law enforcement agencies, emergency dispatch centers, and other external stakeholders during an active shooter crisis?" },
                    { name: "asrDecisionTraining", label: "How are staff members trained to assess the situation, make rapid decisions, and implement appropriate response strategies based on the evolving threat environment during an active shooter incident?" },
                    { name: "asrDecisionFrameworks", label: "Are decision-making frameworks, decision trees, or decision support tools provided to guide staff members in determining the most effective course of action in different scenarios?" },
                    { name: "asrActionProvisions", label: "What provisions are in place to empower staff members to take decisive action to protect themselves and others, including options for evacuation, lockdown, sheltering, or countermeasures?" },
                    { name: "asrSupportResources", label: "What resources and support services are available to staff members following an active shooter incident, including psychological first aid, counseling, and debriefing sessions?" },
                    { name: "asrDebriefings", label: "Are post-incident debriefings conducted to review response actions, identify lessons learned, address concerns, and implement improvements to emergency preparedness plans and procedures?" },
                    { name: "asrFeedbackContribution", label: "How are staff members encouraged to share their experiences, provide feedback on training effectiveness, and contribute to the continuous improvement of active shooter response protocols?" }
                ].map((question, index) => (
                    <div key={index} className="form-section">
                        <label>{question.label}</label>
                        <div>
                            {question.name === "asrMaterialsAlignment" || question.name === "asrScenarioPractice" || question.name === "asrCommunicationProtocols" || question.name === "asrDecisionFrameworks" || question.name === "asrDebriefings"}
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
                                </>
    
                        </div>
                        <div>                   
                          <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
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

export default ActiveShooterResponseFormPage;