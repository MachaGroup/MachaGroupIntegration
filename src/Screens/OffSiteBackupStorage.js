import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function OffSiteBackupStoragePage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadImage = httpsCallable(functions, 'uploadOffSiteBackupStoragePageImage');

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
                const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Off Site Backup Storage', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Off Site Backup Storage', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Off Site Backup Storage', buildingId);
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
                <h1>Offsite Backup Storage Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>4.2.2.1.2.1 Selection and Security of Offsite Locations:</h2>
                    {[
                        { name: "criteriaForSelection", label: "What criteria are used to select offsite backup storage locations, such as cloud providers or physical sites, to ensure data security and accessibility?" },
                        { name: "securityOfLocation", label: "How is the security of the offsite backup location maintained, including physical security measures and data encryption protocols?" },
                        { name: "auditsOfStorage", label: "Are there regular audits or assessments of the offsite storage location to ensure compliance with security standards and policies?" },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            {question.name === "auditsOfStorage" ? (
                                <><div>
                            <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                            <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                          </div><input type="text" name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange} /></>

                            ) : (
                                <textarea name={question.name} value={formData[question.name] || ''} onChange={handleChange} />
                            )}
                        </div>
                    ))}

                    <h2>4.2.2.1.2.2 Data Transfer and Encryption:</h2>
                    {[
                        { name: "dataTransferMethods", label: "What methods are used to securely transfer backup data to the offsite location, and are these methods protected against data interception or breaches?" },
                        { name: "dataEncryption", label: "Is the data encrypted during transfer and storage, and what encryption standards are applied (e.g., AES-256)?" },
                        { name: "keyManagement", label: "How are encryption keys managed, and who has access to these keys to ensure data can be securely accessed when needed?" },
                    ].map((question, index) => (
                        <div key={index + 3} className="form-section">
                            <label>{question.label}</label>
                            {question.name === "dataEncryption" ? (
                                <><div>
                            <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                            <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                          </div><input type="text" name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange} /></>

                            ) : (
                                <textarea name={question.name} value={formData[question.name] || ''} onChange={handleChange} />
                            )}
                        </div>
                    ))}

                    <h2>4.2.2.1.2.3 Accessibility and Recovery Time Objectives (RTOs):</h2>
                    {[
                        { name: "recoveryTime", label: "How quickly can data be retrieved from the offsite backup location in the event of a disaster or data loss incident?" },
                        { name: "recoveryObjectives", label: "Are there clear recovery time objectives (RTOs) established for accessing and restoring data from offsite backups?" },
                        { name: "dataIntegrity", label: "What procedures are in place to ensure data integrity and completeness when backups are restored from offsite storage?" },
                    ].map((question, index) => (
                        <div key={index + 6} className="form-section">
                            <label>{question.label}</label>
                            {question.name === "recoveryObjectives" ? (
                                <><div>
                            <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                            <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                          </div><input type="text" name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange} /></>

                            ) : (
                                <textarea name={question.name} value={formData[question.name] || ''} onChange={handleChange} />
                            )}
                        </div>
                    ))}

                    <h2>4.2.2.1.2.4 Redundancy and Geographic Distribution:</h2>
                    {[
                        { name: "redundancy", label: "Is there redundancy in the offsite backup storage solutions, such as multiple cloud providers or geographically distributed storage sites, to mitigate risk?" },
                        { name: "geographicDistribution", label: "How are backups distributed geographically to prevent data loss due to regional disasters or outages at a single location?" },
                        { name: "latencyConsiderations", label: "Are backup locations chosen to minimize latency and maximize data recovery speeds for the organization's primary operational regions?" },
                    ].map((question, index) => (
                        <div key={index + 9} className="form-section">
                            <label>{question.label}</label>
                            {question.name === "redundancy" ? (
                                <><div>
                            <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                            <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                          </div><input type="text" name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange} /></>

                            ) : (
                                <textarea name={question.name} value={formData[question.name] || ''} onChange={handleChange} />
                            )}
                        </div>
                    ))}

                    <h2>4.2.2.1.2.5 Compliance and Data Sovereignty:</h2>
                    {[
                        { name: "compliance", label: "How does the offsite backup storage solution comply with legal and regulatory requirements for data protection, privacy, and data sovereignty (e.g., GDPR, HIPAA)?" },
                        { name: "contractualAgreements", label: "Are there specific contractual agreements in place with the cloud provider or offsite storage facility regarding data protection, access controls, and compliance standards?" },
                        { name: "crossBorderCompliance", label: "What measures are taken to ensure that data stored offsite does not violate any cross-border data transfer regulations or data residency requirements?" },
                    ].map((question, index) => (
                        <div key={index + 12} className="form-section">
                            <label>{question.label}</label>
                            {question.name === "contractualAgreements" ? (
                                <><div>
                            <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                            <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                          </div><input type="text" name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange} /></>

                            ) : (
                                <textarea name={question.name} value={formData[question.name] || ''} onChange={handleChange} />
                            )}
                        </div>
                    ))}

                    <h2>4.2.2.1.2.6 Monitoring and Reporting:</h2>
                    {[
                        { name: "monitoringTools", label: "What monitoring tools or systems are in place to track the status and health of offsite backups to ensure they are successfully completed and stored?" },
                        { name: "alerts", label: "Are there automated alerts or notifications for issues related to offsite backup storage, such as failed backups or storage capacity limits?" },
                        { name: "performanceMetrics", label: "How is backup performance reported, and what metrics are used to evaluate the effectiveness and reliability of offsite storage?" },
                    ].map((question, index) => (
                        <div key={index + 15} className="form-section">
                            <label>{question.label}</label>
                            {question.name === "alerts" ? (
                                <><div>
                            <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                            <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                          </div><input type="text" name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange} /></>

                            ) : (
                                <textarea name={question.name} value={formData[question.name] || ''} onChange={handleChange} />
                            )}
                        </div>
                    ))}

                    <h2>4.2.2.1.2.7 Cost Management and Scalability:</h2>
                    {[
                        { name: "costManagement", label: "How is the cost of offsite backup storage managed, and what pricing models are in place (e.g., pay-as-you-go, fixed rate)?" },
                        { name: "scalability", label: "Are there scalability options to increase storage capacity as needed, and how does this impact the cost and management of offsite backups?" },
                        { name: "costOptimization", label: "What measures are in place to regularly review and optimize the cost-effectiveness of offsite backup storage solutions?" },
                    ].map((question, index) => (
                        <div key={index + 18} className="form-section">
                            <label>{question.label}</label>
                            {question.name === "scalability" ? (
                                <><div>
                            <input type="radio" name={question.name} value="yes" checked={formData[question.name] === "yes"} onChange={handleChange} /> Yes
                            <input type="radio" name={question.name} value="no" checked={formData[question.name] === "no"} onChange={handleChange} /> No
                          </div><input type="text" name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange} /></>

                            ) : (
                                <textarea name={question.name} value={formData[question.name] || ''} onChange={handleChange} />
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

export default OffSiteBackupStoragePage;