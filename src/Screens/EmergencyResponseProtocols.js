import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions'; // Correct imports
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function ResponseProtocolsFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadResponseProtocolsImage = httpsCallable(functions, 'uploadResponseProtocolsImage');
    const storage = getStorage();

    const [formData, setFormData] = useState({});
    const [imageData, setImageData] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [image, setImage] = useState(null);

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
                const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Emergency Response Protocols', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Emergency Response Protocols', buildingId);
            await setDoc(formDocRef, { formData: newFormData }, { merge: true });
            console.log("Form data saved to Firestore:", newFormData);
        } catch (error) {
            console.error("Error saving form data to Firestore:", error);
            alert("Failed to save changes. Please check your connection and try again.");
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
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
                const uploadResult = await uploadResponseProtocolsImage({ imageData: imageData });
                setImageUrl(uploadResult.data.imageUrl);
                setFormData({ ...formData, imageUrl: uploadResult.data.imageUrl });
                setImageUploadError(null);
            } catch (error) {
                console.error('Error uploading image:', error);
                setImageUploadError(error.message);
            }
        }

        try {
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Emergency Response Protocols', buildingId);
            await setDoc(formDocRef, { formData: formData }, { merge: true });
            console.log('Form data submitted successfully!');
            alert('Form submitted successfully!');
            navigate('/Form');
        } catch (error) {
            console.error("Error saving form data to Firestore:", error);
            alert("Failed to save changes. Please check your connection and try again.");
        }

        if (image) {
            const imageRef = ref(storage, `images/ResponseProtocols/${buildingId}/${image.name}`);
            const uploadTask = uploadBytesResumable(imageRef, image);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadProgress(progress);
                },
                (error) => {
                    console.error('Error uploading image:', error);
                    setImageUploadError(error.message);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImageUrl(downloadURL);
                        setFormData((prevData) => ({
                            ...prevData,
                            imageUrl: downloadURL,
                        }));
                    });
                }
            );
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
                <h1>Response Protocols Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Response Protocols Assessment</h2>
                    {[
                        { name: "protocolDevelopmentDescription", label: "How are emergency response protocols developed, and are they based on recognized standards, best practices, or regulatory requirements?" },
                        { name: "specificEmergencyTypes", label: "Are response protocols tailored to address specific types of emergencies or threats commonly faced by the organization?" },
                        { name: "protocolConsiderations", label: "What considerations are taken into account when determining the appropriate actions and procedures to include in response protocols?" },
                        { name: "protocolReview", label: "Are response protocols reviewed and updated periodically to reflect changes in organizational needs, emerging threats, or lessons learned from incidents?" },
                        { name: "immediateActions", label: "What immediate actions are outlined in the response protocols for various types of emergencies (e.g., evacuation, shelter-in-place, medical emergencies)?" },
                        { name: "initialResponseTraining", label: "Are staff members trained on the specific steps to take during the initial moments of an emergency, such as alerting others, assessing the situation, and taking protective measures?" },
                        { name: "protocolCommunication", label: "How are response protocols communicated to staff members to ensure they are aware of and understand their roles and responsibilities?" },
                        { name: "initiatorTeams", label: "Are there designated individuals or teams responsible for initiating immediate actions in different areas or departments of the organization?" },
                        { name: "externalCoordination", label: "How are response protocols coordinated with external emergency services (e.g., fire department, law enforcement) to facilitate a timely and effective response?" },
                        { name: "communicationProcedures", label: "What communication procedures are included in the response protocols for disseminating information and instructions during emergencies?" },
                        { name: "notificationChannelsDetails", label: "Are there established communication channels and protocols for notifying staff members, occupants, and relevant stakeholders about emergency situations?" },
                        { name: "communicationSystems", label: "How are communication systems and technologies utilized to ensure rapid and reliable dissemination of critical information?" },
                        { name: "backupMethods", label: "Are backup communication methods or redundancy measures in place to address potential failures or disruptions in primary communication channels?" },
                        { name: "communicationTraining", label: "How are staff members trained on effective communication practices during emergencies, such as using clear and concise language, active listening, and relaying accurate information?" },
                        { name: "decisionAuthority", label: "How is decision-making authority delineated within the response protocols, and are there clear lines of authority and accountability during emergency situations?" },
                        { name: "decisionFrameworkTraining", label: "Are staff members trained on the decision-making framework outlined in the response protocols, including when to escalate issues or seek additional support?" },
                        { name: "empowermentMechanisms", label: "What mechanisms are in place to empower staff members to make informed decisions and take appropriate actions based on the situational context and available information?" },
                        { name: "delegationDetails", label: "Are there protocols for delegating decision-making authority to designated individuals or teams in the event of leadership absence or incapacitation?" },
                        { name: "decisionDocumentation", label: "How are decisions documented and communicated within the organization to ensure transparency and accountability?" },
                        { name: "trainingMethods", label: "How are staff members trained on the response protocols, and what methods or formats are used to deliver training (e.g., classroom sessions, practical exercises)?" },
                        { name: "scenarioDrills", label: "Are scenario-based drills conducted to simulate emergency situations and allow staff members to practice implementing response protocols in a realistic setting?" },
                        { name: "drillFrequency", label: "How often are training sessions and drills conducted to reinforce response protocols and maintain readiness among staff members?" },
                        { name: "debriefingSessions", label: "Are debriefing sessions held after training exercises to review performance, identify areas for improvement, and incorporate lessons learned into future training activities?" },
                        { name: "retentionMeasures", label: "What measures are in place to ensure that staff members retain knowledge and skills related to response protocols over time, including refresher training and ongoing reinforcement?" },
                        { name: "protocolDocumentation", label: "How are response protocols documented and disseminated to ensure accessibility and consistency across the organization?" },
                        { name: "reviewDetails", label: "Are response protocols regularly reviewed and evaluated to assess their effectiveness, identify gaps or weaknesses, and make necessary revisions?" },
                        { name: "performanceMetrics", label: "What metrics or indicators are used to measure the performance and outcomes of response protocols during actual emergencies or drills?" },
                        { name: "postIncidentAnalyses", label: "Are post-incident analyses conducted to evaluate the implementation of response protocols, identify opportunities for improvement, and inform revisions?" },
                        { name: "lessonsLearnedSharing", label: "How are lessons learned from response protocols shared within the organization to enhance preparedness and resilience against future emergencies?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.name.endsWith("Description") || question.name.endsWith("Types") || question.name.endsWith("Considerations") || question.name.endsWith("Actions") || question.name.endsWith("Communication") || question.name.endsWith("Teams") || question.name.endsWith("Coordination") || question.name.endsWith("Procedures") || question.name.endsWith("Details") || question.name.endsWith("Systems") || question.name.endsWith("Methods") || question.name.endsWith("Authority") || question.name.endsWith("Mechanisms") || question.name.endsWith("Documentation") || question.name.endsWith("Frequency") || question.name.endsWith("Metrics") || question.name.endsWith("Sharing") ? (
                                    <input
                                        type="text"
                                        name={question.name}
                                        placeholder={`Describe ${question.label.toLowerCase()}`}
                                        value={formData[question.name] || ''}
                                        onChange={handleChange}
                                    />
                                ) : (
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
                                        <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    {uploadProgress > 0 && <p>Upload Progress: {uploadProgress.toFixed(2)}%</p>}
                    {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
                    {imageUploadError && <p style={{ color: "red" }}>{imageUploadError}</p>}
                    <button type="submit">Submit</button>
                </form>
            </main>
        </div>
    );
}

export default ResponseProtocolsFormPage;