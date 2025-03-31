import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc, getFunctions, httpsCallable } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function PostIncidentSupportFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadPostIncidentSupportImage = httpsCallable(functions, 'uploadPostIncidentSupportImage');

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
                const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Post-Incident Support', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Post-Incident Support', buildingId);
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
                const uploadResult = await uploadPostIncidentSupportImage({ imageData: imageData });
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
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Post-Incident Support', buildingId);
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

    const questions = [
        {
            name: "supportServicesAvailability",
            label: "What post-incident support services are available to staff members following emergency situations, and are they easily accessible?",
            type: "text",
        },
        {
            name: "mentalHealthResourcesAvailability",
            label: "Are counseling services, peer support programs, or other mental health resources offered to staff members affected by traumatic events?",
            type: "radio",
        },
        {
            name: "supportServicesCommunication",
            label: "How are support services promoted and communicated to staff members to ensure awareness of available resources?",
            type: "text",
        },
        {
            name: "externalSupportDetails",
            label: "Are external partnerships or collaborations established with mental health organizations or community agencies to supplement internal support services?",
            type: "text",
        },
        {
            name: "counselingSupportOptions",
            label: "What counseling and psychological support options are available to staff members in the aftermath of critical incidents or emergencies?",
            type: "text",
        },
        {
            name: "licensedMentalHealthAvailability",
            label: "Are licensed counselors or mental health professionals trained in trauma response and crisis intervention available to provide support?",
            type: "radio",
        },
        {
            name: "confidentialityProtection",
            label: "How are confidentiality and privacy protected for staff members seeking counseling or psychological support services?",
            type: "text",
        },
        {
            name: "mentalHealthAssessmentDetails",
            label: "Are there protocols in place for assessing the immediate and long-term mental health needs of staff members and providing appropriate interventions?",
            type: "text",
        },
        {
            name: "peerSupportEstablished",
            label: "Are peer support programs established to facilitate informal assistance and emotional support among staff members following traumatic events?",
            type: "radio",
        },
        {
            name: "peerSupporterRoles",
            label: "How are peer supporters selected, trained, and supported in their roles as peer counselors or advocates?",
            type: "text",
        },
        {
            name: "peerSupportIntegration",
            label: "Are peer support networks integrated into the organization's broader crisis management and employee assistance programs?",
            type: "radio",
        },
        {
            name: "peerSupportEffectiveness",
            label: "What measures are in place to ensure the effectiveness and sustainability of peer support initiatives over time?",
            type: "text",
        },
        {
            name: "familyAssistanceDescription",
            label: "How are family members of staff members affected by emergencies supported and informed about available resources?",
            type: "text",
        },
        {
            name: "familyCommunicationDetails",
            label: "Are communication channels established to provide updates and information to family members during and after critical incidents?",
            type: "text",
        },
        {
            name: "familyResourcesReferrals",
            label: "What resources or referral networks are available to connect family members with appropriate support services, such as counseling or financial assistance?",
            type: "text",
        },
        {
            name: "familyAssistancePlans",
            label: "Are family assistance plans or protocols included in the organization's overall emergency response and recovery framework?",
            type: "radio",
        },
        {
            name: "postIncidentSupportTraining",
            label: "Are staff members trained on the availability and utilization of post-incident support services as part of their emergency response training?",
            type: "radio",
        },
        {
            name: "stressRecognitionEducation",
            label: "How are staff members educated on recognizing signs of stress, trauma, or emotional distress in themselves and their colleagues?",
            type: "text",
        },
        {
            name: "resilienceTrainingWorkshops",
            label: "Are training sessions or workshops conducted to enhance staff members' resilience and coping skills in response to critical incidents?",
            type: "radio",
        },
        {
            name: "supportSeekingComfortMeasures",
            label: "What measures are in place to ensure that staff members feel comfortable and supported in seeking assistance or support when needed?",
            type: "text",
        },
        {
            name: "evaluationEffectiveness",
            label: "How are post-incident support services evaluated for their effectiveness and responsiveness to staff members' needs?",
            type: "text",
        },
        {
            name: "feedbackDetails",
            label: "Are feedback mechanisms in place to gather input from staff members about their experiences with post-incident support services?",
            type: "text",
        },
        {
            name: "impactAssessmentMetrics",
            label: "What measures or metrics are used to assess the impact of support interventions on staff members' well-being and recovery?",
            type: "text",
        },
        {
            name: "lessonsLearnedUsed",
            label: "Are lessons learned from post-incident support activities used to inform improvements to the organization's crisis management and employee assistance programs?",
            type: "radio",
        },
    ];

    return (
        <div className="form-page">
            <header className="header">
                <Navbar />
                <button className="back-button" onClick={handleBack}>←</button>
                <h1>3.1.1.2.3 Post-Incident Support Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    {questions.map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.type === "text" ? (
                                <input
                                    type="text"
                                    name={question.name}
                                    placeholder={question.label}
                                    value={formData[question.name] || ''}
                                    onChange={handleChange}
                                />
                            ) : question.type === "radio" ? (
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
                              className='comment-box'
                              name={`${question.name}Comment`}
                              placeholder="Comment (Optional)"
                              value={formData[`${question.name}Comment`] || ''}
                              onChange={handleChange}
                            ></textarea></>
                            ) : null}
                        </div>
                    ))}
                    <input type="file" onChange={handleImageChange} accept="image/*" />
                    {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
                    {imageUploadError && <p style={{ color: 'red' }}>{imageUploadError}</p>}
                    <button type='submit'>Submit</button>
                </form>
            </main>
        </div>
    );
}

export default PostIncidentSupportFormPage;