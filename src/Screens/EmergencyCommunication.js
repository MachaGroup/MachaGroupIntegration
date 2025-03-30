import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions'; // Corrected import
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function EmergencyCommunicationFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadEmergencyCommunicationImage = httpsCallable(functions, 'uploadEmergencyCommunicationImage');

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
                const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Emergency Communication', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Emergency Communication', buildingId);
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
                const uploadResult = await uploadEmergencyCommunicationImage({ imageData: imageData });
                setImageUrl(uploadResult.data.imageUrl);
                setFormData({ ...formData, imageUrl: uploadResult.data.imageUrl });
                setImageUploadError(null);
            } catch (error) {
                console.error('Error uploading image:', error);
                setImageUploadError(error.message);
            }
        }

        try {
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Emergency Communication', buildingId);
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
                            { name: "dedicatedCommunicationSystems", label: "Are there dedicated communication systems in place for alerting authorities during emergencies?" },
                            { name: "multipleChannels", label: "Do these systems include multiple channels such as telephone, radio, email, and text messaging?" },
                            { name: "efficientCommunicationSystems", label: "Are communication systems capable of reaching relevant authorities quickly and efficiently?" },
                            { name: "emergencyContactLists", label: "Have emergency contact lists been established for relevant authorities, including local law enforcement, fire department, and medical services?" },
                            { name: "updatedContactDetails", label: "Are contact details regularly updated to ensure accuracy and reliability?" },
                            { name: "designatedPoc", label: "Is there a designated point of contact responsible for initiating communication with authorities during emergencies?" },
                            { name: "notifyAuthorities", label: "Are there clear protocols in place for when and how to notify authorities during different types of emergencies?" },
                            { name: "staffRolesAndResponsibilities", label: "Do staff members understand their roles and responsibilities in initiating communication with authorities?" },
                            { name: "chainOfCommand", label: "Is there a hierarchy or chain of command to follow for escalating emergency notifications as needed?" },
                            { name: "alertingAuthorities", label: "Is the process for alerting authorities designed to be swift and efficient, minimizing response times?" },
                            { name: "communicationSystemsTest", label: "Are communication systems tested regularly to ensure they are functioning properly and can deliver alerts promptly?" },
                            { name: "mitigatingCommunicationFailures", label: "Are there redundancies or backup systems in place to mitigate communication failures during emergencies?" },
                            { name: "provideDetailedInformation", label: "Are staff members trained to provide accurate and detailed information when alerting authorities?" },
                            { name: "conveyEssentialDetail", label: "Do they know how to convey essential details such as the nature of the emergency, location, number of individuals affected, and any immediate hazards?" },
                            { name: "informationVerification", label: "Is there a mechanism for verifying information before it is communicated to authorities to prevent misinformation or confusion?" },
                            { name: "establishCommunicationProtocolsl", label: "Is there coordination and collaboration with authorities to establish communication protocols and ensure a rapid response to emergencies?" },
                            { name: "facilitateCommunication", label: "Have contact points and procedures been established to facilitate communication between the organization and responding agencies?" },
                            { name: "refineEmergencyCommunication", label: "Are there regular meetings or exercises conducted with authorities to review and refine emergency communication processes?" },
                            { name: "emergencyCommunicationProcedures", label: "Are emergency communication procedures documented in written policies or protocols?" },
                            { name: "reviewingAndEvaluating", label: "Is there a process for reviewing and evaluating the effectiveness of emergency communication during drills or actual incidents?" },
                            { name: "lessonsLearned", label: "Are lessons learned from past emergencies used to improve communication procedures and response capabilities?" }
                        ].map((question, index) => (
                            <div key={index} className="form-section">
                                <label>{question.label}</label>
                                <div>
                                    {question.name === "dedicatedCommunicationSystems" || question.name === "notifyAuthorities" || question.name === "mitigatingCommunicationFailures" || question.name === "informationVerification" || question.name === "facilitateCommunication" || question.name === "reviewingAndEvaluating" ? (
                                        <input
                                            type="text"
                                            name={question.name}
                                            placeholder={question.name === "dedicatedCommunicationSystems" ? "List the communication systems" : question.name === "notifyAuthorities" ? "Describe the protocols to notify authorities" : question.name === "mitigatingCommunicationFailures" ? "Describe the redundancies and backup systems" : question.name === "informationVerification" ? "Describe the mechanism for verifying information" : question.name === "facilitateCommunication" ? "Describe the contact points and procedures" : "Describe the process"}
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
                        {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
                        {imageUploadError && <p style={{ color: 'red' }}>{imageUploadError}</p>}
                        <button type="submit">Submit</button>
                    </form>
                </main>
            </div>
        </div>
    );
}

export default EmergencyCommunicationFormPage;