import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function PersonalDeviceUsageFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadPersonalDeviceUsageFormPageImage = httpsCallable(functions, 'uploadPersonalDeviceUsageFormPageImage');

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
                const formDocRef = doc(db, 'forms', 'Policy and Compliance', 'Personal Device Usage', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Policy and Compliance', 'Personal Device Usage', buildingId);
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
                const uploadResult = await uploadPersonalDeviceUsageFormPageImage({ imageData: imageData });
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
            const formDocRef = doc(db, 'forms', 'Policy and Compliance', 'Personal Device Usage', buildingId);
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
                <h1>5.1.1.1.2 Personal Device Usage Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>5.1.1.1.2.1 Policy Scope and Guidelines:</h2>
                    {[
                        { name: "useGuidelines", label: "What guidelines are established for the use of personal devices (e.g., smartphones, tablets, laptops) on the network?" },
                        { name: "securityRequirements", label: "Are there specific requirements for the type and security of personal devices that can connect to the network?" },
                        { name: "usePolicy", label: "How does the policy define acceptable and unacceptable uses of personal devices within the organizational environment?" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.name === "securityRequirements" ? (
                                <><div>
                                    <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                                    <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                                </div><textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea></>

                            ) : (
                                <div>
                                    <input type="text" name={question.name} placeholder={question.label.includes("List the guidelines") ? "List the guidelines" : question.label.includes("Describe how it define uses") ? "Describe how it define uses" : "Describe the procedures"} value={formData[question.name] || ''} onChange={handleChange} />
                                </div>
                            )}
                        </div>
                    ))}

                    <h2>5.1.1.1.2.2 Device Registration and Management:</h2>
                    {[
                        { name: "registeringProcedures", label: "What procedures are in place for registering personal devices with the organization (e.g., device registration forms)?" },
                        { name: "handledTracking", label: "How is the management and tracking of personal devices handled within the network?" },
                        { name: "deviceProtocols", label: "Are there specific protocols for ensuring that personal devices meet the organization's security standards before being granted access?" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.name === "deviceProtocols" ? (
                                <><div>
                                    <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                                    <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                                </div><textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea></>

                            ) : (
                                <div>
                                    <input type="text" name={question.name} placeholder={question.label.includes("Describe the procedures") ? "Describe the procedures" : "Describe how it's handled"} value={formData[question.name] || ''} onChange={handleChange} />
                                </div>
                            )}
                        </div>
                    ))}

                    <h2>5.1.1.1.2.3 Security Measures:</h2>
                    {[
                        { name: "securityMeasures", label: "What security measures are required for personal devices to access the network (e.g., antivirus software, encryption)?" },
                        { name: "securityUpdates", label: "How are security updates and patches managed for personal devices connecting to the network?" },
                        { name: "passwordRequirements", label: "Are there specific requirements for personal devices regarding passwords or multi-factor authentication?" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.name === "passwordRequirements" ? (
                                <><div>
                                    <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                                    <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                                </div><textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea></>

                            ) : (
                                <div>
                                    <input type="text" name={question.name} placeholder={question.label.includes("Describe the measures") ? "Describe the measures" : "Describe how they're managed"} value={formData[question.name] || ''} onChange={handleChange} />
                                </div>
                            )}
                        </div>
                    ))}

                    <h2>5.1.1.1.2.4 Network Access Controls:</h2>
                    {[
                        { name: "networkAccess", label: "How is network access controlled for personal devices (e.g., network segmentation, VPN requirements)?" },
                        { name: "resourceRestrictions", label: "Are there restrictions on the types of network resources that personal devices can access?" },
                        { name: "monitoringTools", label: "What monitoring tools are used to ensure that personal devices do not pose a security risk to the network?" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.name === "resourceRestrictions" ? (
                                <><div>
                                    <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                                    <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                                </div><textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea></>

                            ) : (
                                <div>
                                    <input type="text" name={question.name} placeholder={question.label.includes("Describe how they're controlled") ? "Describe how they're controlled" : "Describe the tools"} value={formData[question.name] || ''} onChange={handleChange} />
                                </div>
                            )}
                        </div>
                    ))}

                    <h2>5.1.1.1.2.5 User Responsibilities and Compliance:</h2>
                    {[
                        { name: "userResponsibilities", label: "What responsibilities do users have regarding the use of their personal devices (e.g., reporting lost or stolen devices)?" },
                        { name: "compliancePolicy", label: "How is compliance with the personal device usage policy ensured and enforced?" },
                        { name: "policyConsequences", label: "Are there clear consequences for non-compliance with the policy?" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.name === "policyConsequences" ? (
                                <><div>
                                    <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                                    <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                                </div><textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea></>

                            ) : (
                                <div>
                                    <input type="text" name={question.name} placeholder={question.label.includes("Describe the responsibilities") ? "Describe the responsibilities" : "Describe how it's ensured and enforced"} value={formData[question.name] || ''} onChange={handleChange} />
                                </div>
                            )}
                        </div>
                    ))}

                    <h2>5.1.1.1.2.6 Privacy and Data Protection:</h2>
                    {[
                        { name: "addressedPolicy", label: "How does the policy address the privacy of data on personal devices used within the organization?" },
                        { name: "protectionMeasures", label: "What measures are taken to protect organizational data on personal devices (e.g., remote wipe capabilities)?" },
                        { name: "balancedData", label: "How are user data and privacy balanced with security requirements?" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                <input type="text" name={question.name} placeholder={question.label.includes("Describe how does it address it") ? "Describe how does it address it" : question.label.includes("Describe the measures") ? "Describe the measures" : "Describe how it's balanced"} value={formData[question.name] || ''} onChange={handleChange} />
                            </div>
                        </div>
                    ))}

                    <h2>5.1.1.1.2.7 Policy Exceptions and Approvals:</h2>
                    {[
                        { name: "requestingExceptions", label: "What processes are in place for requesting exceptions to the personal device usage policy (e.g., special permissions for specific devices)?" },
                        { name: "authorizedExceptions", label: "Who is authorized to review and approve exceptions to the policy?" },
                        { name: "documentedProcedures", label: "Are there documented procedures for handling and documenting policy exceptions?" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.name === "documentedProcedures" ? (
                                <><div>
                                    <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                                    <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                                </div><textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea></>

                            ) : (
                                <div>
                                    <input type="text" name={question.name} placeholder={question.label.includes("Describe the processes") ? "Describe the processes" : "List who's authorized"} value={formData[question.name] || ''} onChange={handleChange} />
                                </div>
                            )}
                        </div>
                    ))}

                    <h2>5.1.1.1.2.8 Incident Response and Management:</h2>
                    {[
                        { name: "securityIncident", label: "What steps are taken if a personal device is involved in a security incident (e.g., data breaches, malware infections)?" },
                        { name: "managedIncidents", label: "How are incidents involving personal devices managed and documented?" },
                        { name: "mitigatingRisks", label: "What procedures are followed for responding to and mitigating risks associated with compromised personal devices?" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                <input type="text" name={question.name} placeholder={question.label.includes("List the steps") ? "List the steps" : question.label.includes("Describe how they're managed and documented") ? "Describe how they're managed and documented" : "Describe the procedures"} value={formData[question.name] || ''} onChange={handleChange} />
                            </div>
                        </div>
                    ))}

                    <h2>5.1.1.1.2.9 Training and Awareness:</h2>
                    {[
                        { name: "trainingPrograms", label: "What training programs are provided to users regarding the safe use of personal devices on the network?" },
                        { name: "userAwareness", label: "How is user awareness of personal device policies and security practices ensured?" },
                        { name: "assistingUsers", label: "Are there resources available to assist users in understanding and complying with the personal device usage policy?" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.name === "assistingUsers" ? (
                                <><div>
                                    <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                                    <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                                </div><textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea></>

                            ) : (
                                <div>
                                    <input type="text" name={question.name} placeholder={question.label.includes("Describe the programs") ? "Describe the programs" : "Describe how it's ensured"} value={formData[question.name] || ''} onChange={handleChange} />
                                </div>
                            )}
                        </div>
                    ))}

                    <h2>5.1.1.1.2.10 Review and Updates:</h2>
                    {[
                        { name: "usagePolicy", label: "How frequently is the personal device usage policy reviewed and updated to address new risks and technological changes?" },
                        { name: "reviewingPolicy", label: "Who is responsible for reviewing and revising the policy, and what criteria are used for updates?" },
                        { name: "communicatedPolicy", label: "How are updates to the personal device usage policy communicated to users?" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                <input type="text" name={question.name} placeholder={question.label.includes("Describe how frequent") ? "Describe how frequent" : question.label.includes("List who's responsible") ? "List who's responsible" : "Describe how it's communicated"} value={formData[question.name] || ''} onChange={handleChange} />
                            </div>
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

export default PersonalDeviceUsageFormPage;