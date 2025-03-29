import React, { useState, useEffect } from 'react';
import { getFirestore, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function AccessControlListsPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadImage = httpsCallable(functions, 'uploadAccessControlListsImage');


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
                const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Access Control Lists', buildingId);
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
            // Persist data to Firestore on every change
            const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Access Control Lists', buildingId);
            await setDoc(formDocRef, { formData: newFormData }, { merge: true }); // Use merge to preserve existing fields
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
            const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Access Control Lists', buildingId);
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
                <h1>Access Control Lists Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Access Control Lists Assessment</h2>
                    {[
                        { name: "defineCriteria", label: "What criteria are used to define Access Control Lists (ACLs) within the firewall, and how are these criteria determined based on the organization's security policy?" },
                        { name: "firewallUtilization", label: "How does the firewall utilize ACLs to differentiate between authorized and unauthorized network traffic, and what are the default settings for incoming and outgoing traffic?" },
                        { name: "guidelinesProtocols", label: "Are there specific guidelines or protocols in place for creating and updating ACLs to ensure they are aligned with the latest security standards and organizational needs?" },
                        { name: "reviewFrequency", label: "How frequently are ACLs reviewed and updated to reflect changes in network architecture, user roles, or emerging security threats?" },
                        { name: "validationProcesses", label: "What processes are in place to test and validate the effectiveness of ACL configurations before they are implemented in a live environment?" },
                        { name: "automatedTools", label: "Are there automated tools or systems in place to assist with the management and deployment of ACLs across multiple firewall devices within the organization?" },
                        { name: "trafficMonitoring", label: "How is the network traffic monitored to ensure ACLs are functioning as intended, and what metrics are used to evaluate their effectiveness?" },
                        { name: "regularAudits", label: "Are there regular audits conducted on ACLs to identify any misconfigurations, redundant rules, or outdated entries that could potentially expose the network to risk?" },
                        { name: "incidentDocumentation", label: "How are incidents involving unauthorized access or ACL breaches documented, and what corrective actions are taken to prevent similar occurrences in the future?" },
                        { name: "trainingPrograms", label: "What training programs are provided to IT staff to ensure they have the knowledge and skills necessary to configure and manage ACLs effectively?" },
                        { name: "documentationGuidelines", label: "Are there clear documentation and guidelines available for staff responsible for maintaining ACLs, and how is this information kept up-to-date?" },
                        { name: "promoteAwareness", label: "How is awareness about the importance of proper ACL management promoted across the organization, especially among those who have access to critical network resources?" },
                        { name: "adaptability", label: "How do ACLs adapt to accommodate new devices, applications, or users added to the network, and is there a process for dynamically updating ACLs in response to these changes?" },
                        { name: "scalingStrategies", label: "Are there strategies in place to scale ACL configurations in larger, more complex network environments without compromising security or performance?" },
                        { name: "integrationSecurityMeasures", label: "How are ACLs integrated with other network security measures, such as intrusion detection systems (IDS) or security information and event management (SIEM) systems, to provide a comprehensive security posture?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                                <div>
                                    <input type="radio" name={question.name} value="Yes" onChange={handleChange} checked={formData[question.name] === 'Yes'} /> Yes
                                    <input type="radio" name={question.name} value="No" onChange={handleChange} checked={formData[question.name] === 'No'} /> No
                                </div>
                                <div>
                                    <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" onChange={handleChange} value={formData[`${question.name}Comment`] || ''} />
                                </div>
                        </div>
                    ))}

                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
                    {imageUploadError && <p style={{ color: 'red' }}>{imageUploadError.message}</p>}

                    <button type="submit">Submit</button>
                </form>
            </main>
        </div>
    );
}

export default AccessControlListsPage;