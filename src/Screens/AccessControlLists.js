import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import { useNavigate, useLocation } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function AccessControlListsPage() {
    const navigate = useNavigate();
    const { buildingId, setBuildingId } = useBuilding();
    const location = useLocation();
    const db = getFirestore();
    const storage = getStorage();
    const [formData, setFormData] = useState({
        defineCriteria: '',
        firewallUtilization: '',
        guidelinesProtocols: '',
        reviewFrequency: '',
        validationProcesses: '',
        automatedTools: '',
        trafficMonitoring: '',
        regularAudits: '',
        incidentDocumentation: '',
        trainingPrograms: '',
        documentationGuidelines: '',
        promoteAwareness: '',
        adaptability: '',
        scalingStrategies: '',
        integrationSecurityMeasures: '',
        guidelinesProtocolsComment: '',
        automatedToolsComment: '',
        regularAuditsComment: '',
    });
    const [image, setImage] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [imageUrl, setImageUrl] = useState(null);
    const [uploadError, setUploadError] = useState(null);
    const [assessmentId, setAssessmentId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const buildingIdFromUrl = params.get('buildingId');
        const assessmentIdFromUrl = params.get('assessmentId');

        if (buildingIdFromUrl) {
            setBuildingId(buildingIdFromUrl);
        } else {
            alert('No building selected. Redirecting to Building Info...');
            navigate('BuildingandAddress');
            return;
        }

        if (assessmentIdFromUrl) {
            setAssessmentId(assessmentIdFromUrl);
        }

        const loadAssessmentData = async () => {
            setLoading(true);
            setLoadError(null);
            try {
                if (assessmentIdFromUrl) {
                    const docRef = doc(db, 'forms/Cybersecurity/Access Control Lists', assessmentIdFromUrl);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        setFormData(data.formData || {}); // Initialize with empty object if formData is missing
                    } else {
                        setFormData({}); // Initialize if document doesn't exist
                    }
                }
            } catch (error) {
                console.error("Error fetching assessment data:", error);
                setLoadError("Failed to load form data. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        loadAssessmentData();
    }, [location, navigate, setBuildingId, db]);

    const handleChange = async (e) => {
        const { name, type, checked, value } = e.target;
        const newValue = type === 'radio' ? (checked ? value : '') : value;
        const newFormData = { ...formData, [name]: newValue };
        setFormData(newFormData);

        try {
            // Persist data to Firestore on every change
            if (buildingId && assessmentId) {
                const formDocRef = doc(db, 'forms/Cybersecurity/Access Control Lists', assessmentId);
                await setDoc(formDocRef, { formData: newFormData }, { merge: true }); // Use merge to preserve existing fields
                console.log("Form data saved to Firestore:", newFormData);
            }
        } catch (error) {
            console.error("Error saving form data to Firestore:", error);
            alert("Failed to save changes. Please check your connection and try again.");
        }
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleBack = async () => {
        navigate(-1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!buildingId) {
            alert('Building ID is missing. Please start from the Building Information page.');
            return;
        }

        try {
            alert('Form submitted successfully!');
            navigate('/Form');
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to submit the form. Please try again.');
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
                    <h2>4.1.1.1.1.1 Definition and Purpose:</h2>
                    <div className="form-section">
                        <label>What criteria are used to define Access Control Lists (ACLs) within the firewall, and how are these criteria determined based on the organization's security policy?</label>
                        <textarea name="defineCriteria" onChange={handleChange} value={formData.defineCriteria || ''} />
                    </div>

                    <div className="form-section">
                        <label>How does the firewall utilize ACLs to differentiate between authorized and unauthorized network traffic, and what are the default settings for incoming and outgoing traffic?</label>
                        <textarea name="firewallUtilization" onChange={handleChange} value={formData.firewallUtilization || ''} />
                    </div>

                    <div className="form-section">
                        <label>Are there specific guidelines or protocols in place for creating and updating ACLs to ensure they are aligned with the latest security standards and organizational needs?</label>
                        <div>
                            <input type="radio" name="guidelinesProtocols" value="Yes" onChange={handleChange} checked={formData.guidelinesProtocols === 'Yes'} /> Yes
                            <input type="radio" name="guidelinesProtocols" value="No" onChange={handleChange} checked={formData.guidelinesProtocols === 'No'} /> No
                            <textarea className='comment-box' name="guidelinesProtocolsComment" placeholder="Comment (Optional)" onChange={handleChange} value={formData.guidelinesProtocolsComment || ''} />
                        </div>
                    </div>

                    <h2>4.1.1.1.1.2 Configuration and Implementation:</h2>
                    <div className="form-section">
                        <label>How frequently are ACLs reviewed and updated to reflect changes in network architecture, user roles, or emerging security threats?</label>
                        <textarea name="reviewFrequency" onChange={handleChange} value={formData.reviewFrequency || ''} />
                    </div>

                    <div className="form-section">
                        <label>What processes are in place to test and validate the effectiveness of ACL configurations before they are implemented in a live environment?</label>
                        <textarea name="validationProcesses" onChange={handleChange} value={formData.validationProcesses || ''} />
                    </div>

                    <div className="form-section">
                        <label>Are there automated tools or systems in place to assist with the management and deployment of ACLs across multiple firewall devices within the organization?</label>
                        <div>
                            <input type="radio" name="automatedTools" value="Yes" onChange={handleChange} checked={formData.automatedTools === 'Yes'} /> Yes
                            <input type="radio" name="automatedTools" value="No" onChange={handleChange} checked={formData.automatedTools === 'No'} /> No
                            <textarea className='comment-box' name="automatedToolsComment" placeholder="Comment (Optional)" onChange={handleChange} value={formData.automatedToolsComment || ''} />
                        </div>
                    </div>

                    <h2>4.1.1.1.1.3 Monitoring and Auditing:</h2>
                    <div className="form-section">
                        <label>How is the network traffic monitored to ensure ACLs are functioning as intended, and what metrics are used to evaluate their effectiveness?</label>
                        <textarea name="trafficMonitoring" onChange={handleChange} value={formData.trafficMonitoring || ''} />
                    </div>

                    <div className="form-section">
                        <label>Are there regular audits conducted on ACLs to identify any misconfigurations, redundant rules, or outdated entries that could potentially expose the network to risk?</label>
                        <div>
                            <input type="radio" name="regularAudits" value="Yes" onChange={handleChange} checked={formData.regularAudits === 'Yes'} /> Yes
                            <input type="radio" name="regularAudits" value="No" onChange={handleChange} checked={formData.regularAudits === 'No'} /> No
                            <textarea className='comment-box' name="regularAuditsComment" placeholder="Comment (Optional)" onChange={handleChange} value={formData.regularAuditsComment || ''} />
                        </div>
                    </div>

                    <div className="form-section">
                        <label>How are incidents involving unauthorized access or ACL breaches documented, and what corrective actions are taken to prevent similar occurrences in the future?</label>
                        <textarea name="incidentDocumentation" onChange={handleChange} value={formData.incidentDocumentation || ''} />
                    </div>

                    <h2>4.1.1.1.1.4 Training and Awareness:</h2>
                    <div className="form-section">
                        <label>What training programs are provided to IT staff to ensure they have the knowledge and skills necessary to configure and manage ACLs effectively?</label>
                        <textarea name="trainingPrograms" onChange={handleChange} value={formData.trainingPrograms || ''} />
                    </div>

                    <div className="form-section">
                        <label>Are there clear documentation and guidelines available for staff responsible for maintaining ACLs, and how is this information kept up-to-date?</label>
                        <textarea name="documentationGuidelines" onChange={handleChange} value={formData.documentationGuidelines || ''} />
                    </div>

                    <h2>4.1.1.1.1.5 Adaptability and Scalability:</h2>
                    <div className="form-section">
                        <label>How is awareness about the importance of proper ACL management promoted across the organization, especially among those who have access to critical network resources?</label>
                        <textarea name="promoteAwareness" onChange={handleChange} value={formData.promoteAwareness || ''} />
                    </div>

                    <div className="form-section">
                        <label>How do ACLs adapt to accommodate new devices, applications, or users added to the network, and is there a process for dynamically updating ACLs in response to these changes?</label>
                        <textarea name="adaptability" onChange={handleChange} value={formData.adaptability || ''} />
                    </div>

                    <div className="form-section">
                        <label>Are there strategies in place to scale ACL configurations in larger, more complex network environments without compromising security or performance?</label>
                        <textarea name="scalingStrategies" onChange={handleChange} value={formData.scalingStrategies || ''} />
                    </div>

                    <div className="form-section">
                        <label>How are ACLs integrated with other network security measures, such as intrusion detection systems (IDS) or security information and event management (SIEM) systems, to provide a comprehensive security posture?</label>
                        <textarea name="integrationSecurityMeasures" onChange={handleChange} value={formData.integrationSecurityMeasures || ''} />
                    </div>
                    {/* Image Upload */}
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
                    {uploadError && <p style={{ color: 'red' }}>{uploadError.message}</p>}

                    <button type="submit">Submit</button>
                </form>
            </main>
        </div>
    );
}

export default AccessControlListsPage;
