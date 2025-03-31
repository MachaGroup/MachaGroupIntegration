import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function EmergencyCommunication2FormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadEmergencyCommunication2Image = httpsCallable(functions, 'uploadEmergencyCommunication2Image');
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
                const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Emergency Communication', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Emergency Communication', buildingId);
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
                const uploadResult = await uploadEmergencyCommunication2Image({ imageData: imageData });
                setImageUrl(uploadResult.data.imageUrl);
                setFormData({ ...formData, imageUrl: uploadResult.data.imageUrl });
                setImageUploadError(null);
            } catch (error) {
                console.error('Error uploading image:', error);
                setImageUploadError(error.message);
            }
        }

        try {
            const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Emergency Communication', buildingId);
            await setDoc(formDocRef, { formData: formData }, { merge: true });
            console.log('Form data submitted successfully!');
            alert('Form submitted successfully!');
            navigate('/Form');

        } catch (error) {
            console.error("Error saving form data to Firestore:", error);
            alert("Failed to save changes. Please check your connection and try again.");
        }

        if (image) {
            const imageRef = ref(storage, `images/EmergencyCommunication2/${buildingId}/${image.name}`);
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
        <div>
            <div className="form-page">
                <header className="header">
                    <Navbar />
                    <button className="back-button" onClick={handleBack}>←</button>
                    <h1>Emergency Communication Assessment</h1>
                    <img src={logo} alt="Logo" className="logo" />
                </header>

                <main className="form-container">
                    <form onSubmit={handleSubmit}>
                        <h2>Emergency Communication Assessment</h2>
                        {[
                            { name: "communicationDevices", label: "What communication devices and tools are provided to staff members for emergency communication purposes, such as two-way radios, mobile phones, intercom systems, or panic alarms?" },
                            { name: "deviceSelectionCriteria", label: "Are communication devices selected based on their reliability, range, durability, and compatibility with existing infrastructure to ensure effective communication capabilities during emergencies?" },
                            { name: "deviceMaintenance", label: "How are communication devices maintained, tested, and periodically inspected to verify functionality, battery life, signal strength, and readiness for use in emergency situations?" },
                            { name: "communicationProtocols", label: "Are standardized communication protocols and procedures established to facilitate clear, concise, and efficient communication among staff members, emergency responders, and relevant stakeholders during emergencies?" },
                            { name: "communicationChannels", label: "How are communication channels designated, prioritized, and utilized for different types of emergency communications, such as distress calls, status updates, incident reports, or coordination messages?" },
                            { name: "protocolAdherence", label: "What measures are in place to ensure adherence to communication protocols, minimize radio interference, avoid channel congestion, and prioritize emergency traffic during critical incidents?" },
                            { name: "staffTraining", label: "Are staff members provided with training on the proper use, operation, and protocols for emergency communication devices and systems?" },
                            { name: "trainingPrograms", label: "Do training programs include practical exercises, simulations, or role-playing scenarios to familiarize staff members with communication procedures, protocols, and equipment operation under simulated emergency conditions?" },
                            { name: "communicationProficiency", label: "How are staff members assessed for proficiency in emergency communication skills, such as effective radio etiquette, message clarity, active listening, and situational awareness during training exercises and drills?" },
                            { name: "systemIntegration", label: "How are communication systems integrated with broader emergency response plans, incident command structures, and coordination efforts within the school environment?" },
                            { name: "protocolAlignment", label: "Are communication protocols aligned with incident management protocols, resource allocation procedures, and decision-making frameworks to support effective coordination, information sharing, and situational awareness during emergencies?" },
                            { name: "externalCollaboration", label: "What mechanisms are in place to facilitate communication and collaboration with external agencies, such as emergency dispatch centers, law enforcement agencies, fire departments, or medical response teams, during emergency incidents?" },
                            { name: "redundancyMeasures", label: "Are redundancy measures and backup communication systems implemented to mitigate the risk of communication failures, network disruptions, or equipment malfunctions during emergencies?" },
                            { name: "backupCommunication", label: "How are redundant communication channels, alternative communication methods, or backup power sources utilized to ensure continuity of communication and information flow in the event of primary system failures or infrastructure damage?" },
                            { name: "communicationResilience", label: "What provisions are in place to maintain communication resilience, restore functionality, and adapt communication strategies to changing conditions or evolving threats during prolonged emergency incidents?" }
                        ].map((question, index) => (
                            <div key={index} className="form-section">
                                <label>{question.label}</label>
                                <div>
                                    {question.name === "communicationDevices" || question.name === "deviceMaintenance" || question.name === "communicationChannels" || question.name === "protocolAdherence" || question.name === "communicationProficiency" || question.name === "systemIntegration" || question.name === "externalCollaboration" || question.name === "redundancyMeasures" || question.name === "backupCommunication" || question.name === "communicationResilience" ? (
                                        <input
                                            type="text"
                                            name={question.name}
                                            placeholder={question.name === "communicationDevices" ? "List the devices/tools" : question.name === "deviceMaintenance" ? "Describe how they're maintained" : question.name === "communicationChannels" ? "Describe how they're designated" : question.name === "protocolAdherence" ? "Describe the measures" : question.name === "communicationProficiency" ? "Describe how they're accessed" : question.name === "systemIntegration" ? "Describe how they're integrated" : question.name === "externalCollaboration" ? "Describe the measures" : question.name === "redundancyMeasures" ? "Describe the measures" : question.name === "backupCommunication" ? "Describe the redundancy" : "Describe the provisions"}
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
                                            <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                        <input type="file" onChange={handleImageChange} accept="image/*" />
                        {uploadProgress > 0 && <p>Upload Progress: {uploadProgress.toFixed(2)}%</p>}
                        {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
                        {imageUploadError && <p style={{ color: 'red' }}>{imageUploadError}</p>}
                        <button type="submit">Submit</button>
                    </form>
                </main>
            </div>
        </div>
    );
}

export default EmergencyCommunication2FormPage;