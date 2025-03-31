import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function CommunicationChannelsPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadCommunicationChannelsAndProtocolsImage = httpsCallable(functions, 'uploadCommunicationChannelsAndProtocolsImage');

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
                const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Communication Channels and Protocols', buildingId);
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
                const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Communication Channels and Protocols', buildingId);
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
                const uploadResult = await uploadCommunicationChannelsAndProtocolsImage({ imageData: imageData });
                setImageUrl(uploadResult.data.imageUrl);
                setFormData({ ...formData, imageUrl: uploadResult.data.imageUrl });
                setImageUploadError(null);
            } catch (error) {
                console.error('Error uploading image:', error);
                setImageUploadError(error.message);
            }
        }

        try {
            const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Communication Channels and Protocols', buildingId);
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
                <h1>Communication Channels and Protocols</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>4.4.2.1.2.1 Channel Selection</h2>
                    {[
                        { name: "designatedChannels", label: "What communication channels are designated for incident response?" },
                        { name: "channelSecurity", label: "How are these channels selected to ensure they meet security and confidentiality requirements?" },
                        { name: "alternativeChannels", label: "Are there alternative channels identified in case primary ones become unavailable?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.name === "alternativeChannels" ? (
                                <div>
                                    <input type="radio" name={question.name} value="Yes" checked={formData[question.name] === 'Yes'} onChange={handleChange} /> Yes
                                    <input type="radio" name={question.name} value="No" checked={formData[question.name] === 'No'} onChange={handleChange} /> No
                                    <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                                </div>
                            ) : (
                                <textarea name={question.name} value={formData[question.name] || ''} onChange={handleChange}></textarea>
                            )}
                        </div>
                    ))}

                    <h2>4.4.2.1.2.2 Communication Protocols</h2>
                    {[
                        { name: "internalCommunicationProtocols", label: "What protocols are established for internal communication?" },
                        { name: "sensitiveInfoProtection", label: "How is sensitive information protected during communication?" },
                        { name: "communicationEscalation", label: "Are there predefined procedures for escalating communication?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.name === "communicationEscalation" ? (
                                <div>
                                    <input type="radio" name={question.name} value="Yes" checked={formData[question.name] === 'Yes'} onChange={handleChange} /> Yes
                                    <input type="radio" name={question.name} value="No" checked={formData[question.name] === 'No'} onChange={handleChange} /> No
                                    <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                                </div>
                            ) : (
                                <textarea name={question.name} value={formData[question.name] || ''} onChange={handleChange}></textarea>
                            )}
                        </div>
                    ))}

                    <h2>4.4.2.1.2.3 Incident Reporting</h2>
                    {[
                        { name: "incidentReporting", label: "How are incidents reported within the organization?" },
                        { name: "incidentReportContent", label: "What information is required in incident reports?" },
                        { name: "reportDocumentation", label: "How are reports documented and stored for compliance purposes?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <textarea name={question.name} value={formData[question.name] || ''} onChange={handleChange}></textarea>
                        </div>
                    ))}

                    <h2>4.4.2.1.2.4 External Communication</h2>
                    {[
                        { name: "externalCommunicationGuidelines", label: "What guidelines are in place for communicating with external parties?" },
                        { name: "externalCommunicationConsistency", label: "How is consistency maintained in external communications?" },
                        { name: "mediaManagementProtocols", label: "What protocols are followed to manage media inquiries?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <textarea name={question.name} value={formData[question.name] || ''} onChange={handleChange}></textarea>
                        </div>
                    ))}

                    <h2>4.4.2.1.2.5 Response Coordination</h2>
                    {[
                        { name: "responseCoordination", label: "How is coordination managed during an incident?" },
                        { name: "realTimeTools", label: "What tools facilitate real-time communication?" },
                        { name: "communicationResponsibilities", label: "How are communication responsibilities divided?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <textarea name={question.name} value={formData[question.name] || ''} onChange={handleChange}></textarea>
                        </div>
                    ))}

                    <h2>4.4.2.1.2.6 Information Security</h2>
                    {[
                        { name: "channelSecurityMeasures", label: "How are channels secured to prevent interception?" },
                        { name: "deviceProtection", label: "What measures protect communication devices?" },
                        { name: "communicationIntegrity", label: "How is the integrity of communication ensured?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <textarea name={question.name} value={formData[question.name] || ''} onChange={handleChange}></textarea>
                        </div>
                    ))}

                    <h2>4.4.2.1.2.7 Training and Drills</h2>
                    {[
                        { name: "trainingProtocols", label: "How is training provided on communication protocols?" },
                        { name: "communicationDrills", label: "Are regular drills conducted to practice communication?" },
                        { name: "drillFeedback", label: "How is feedback from drills used to refine practices?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.name === "communicationDrills" ? (
                                <div>
                                    <input type="radio" name={question.name} value="Yes" checked={formData[question.name] === 'Yes'} onChange={handleChange} /> Yes
                                    <input type="radio" name={question.name} value="No" checked={formData[question.name] === 'No'} onChange={handleChange} /> No
                                    <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                                </div>
                            ) : (
                                <textarea name={question.name} value={formData[question.name] || ''} onChange={handleChange}></textarea>
                            )}
                        </div>
                    ))}

                    <h2>4.4.2.1.2.8 Post-Incident Review</h2>
                    {[
                        { name: "channelEvaluation", label: "How are communication channels evaluated post-incident?" },
                        { name: "communicationChallengesFeedback", label: "What feedback is collected regarding communication challenges?" },
                        { name: "communicationLessonsLearned", label: "How are lessons learned from communication incidents incorporated?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <textarea name={question.name} value={formData[question.name] || ''} onChange={handleChange}></textarea>
                        </div>
                    ))}

                    <h2>4.4.2.1.2.9 Documentation and Reporting</h2>
                    {[
                        { name: "incidentDocumentation", label: "What documentation is required during an incident?" },
                        { name: "recordMaintenance", label: "How are communication records maintained?" },
                        { name: "recordAnalysis", label: "What procedures are in place for analyzing communication records?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <textarea name={question.name} value={formData[question.name] || ''} onChange={handleChange}></textarea>
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

export default CommunicationChannelsPage;