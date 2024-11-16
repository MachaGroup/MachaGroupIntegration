import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png'; // Adjust the path if necessary

function AccessControlListsPage() {
    const navigate = useNavigate();
    const { setBuildingId, buildingId } = useBuilding(); // Access and update buildingId from context
    const db = getFirestore();

    const [formData, setFormData] = useState({});

    useEffect(() => {
        const fetchBuildingIdFromBuildings = async () => {
            if (!buildingId) {
                try {
                    const buildingDocRef = doc(db, 'Buildings', 'BuildingDocumentID'); 
                    const buildingSnapshot = await getDoc(buildingDocRef);

                    if (buildingSnapshot.exists()) {
                        const buildingData = buildingSnapshot.data();
                        setBuildingId(buildingData.buildingId); 
                    } else {
                        alert('Building information not found. Redirecting...');
                        navigate('/BuildingandAddress');
                    }
                } catch (error) {
                    console.error('Error fetching building ID:', error);
                    alert('Error fetching building information.');
                }
            }
        };

        fetchBuildingIdFromBuildings();
    }, [buildingId, navigate, setBuildingId, db]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
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

        try {
            const buildingRef = doc(db, 'Buildings', buildingId);
            const formsRef = collection(db, 'forms/Cybersecurity/Access Control Lists');
            await addDoc(formsRef, {
                building: buildingRef,
                formData: formData,
            });

            alert('Form submitted successfully!');
            navigate('/Form');
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to submit the form. Please try again.');
        }
    };

    return (
        <div className="form-page">
            <header className="header">
                <button className="back-button" onClick={handleBack}>←</button>
                <h1>Access Control Lists Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>4.1.1.1.1 Access Control Lists (e.g., restricting network traffic)</h2>

                    {/* Definition and Purpose */}
                    <h3>4.1.1.1.1.1 Definition and Purpose:</h3>
                    <div className="form-section">
                        <label>4.1.1.1.1.1.1. What criteria are used to define Access Control Lists (ACLs) within the firewall, and how are these criteria determined based on the organization's security policy?</label>
                        <textarea name="defineCriteria" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>4.1.1.1.1.1.2. How does the firewall utilize ACLs to differentiate between authorized and unauthorized network traffic, and what are the default settings for incoming and outgoing traffic?</label>
                        <textarea name="firewallUtilization" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>4.1.1.1.1.1.3. Are there specific guidelines or protocols in place for creating and updating ACLs to ensure they are aligned with the latest security standards and organizational needs?</label>
                        <div>
                            <input type="radio" name="guidelinesProtocols" value="Yes" onChange={handleChange} /> Yes
                            <input type="radio" name="guidelinesProtocols" value="No" onChange={handleChange} /> No
                        </div>
                    </div>

                    {/* Configuration and Implementation */}
                    <h3>4.1.1.1.1.2 Configuration and Implementation:</h3>
                    <div className="form-section">
                        <label>4.1.1.1.1.2.1. How frequently are ACLs reviewed and updated to reflect changes in network architecture, user roles, or emerging security threats?</label>
                        <textarea name="reviewFrequency" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>4.1.1.1.1.2.2. What processes are in place to test and validate the effectiveness of ACL configurations before they are implemented in a live environment?</label>
                        <textarea name="validationProcesses" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>4.1.1.1.1.2.3. Are there automated tools or systems in place to assist with the management and deployment of ACLs across multiple firewall devices within the organization?</label>
                        <div>
                            <input type="radio" name="automatedTools" value="Yes" onChange={handleChange} /> Yes
                            <input type="radio" name="automatedTools" value="No" onChange={handleChange} /> No
                        </div>
                    </div>

                    {/* Monitoring and Auditing */}
                    <h3>4.1.1.1.1.3 Monitoring and Auditing:</h3>
                    <div className="form-section">
                        <label>4.1.1.1.1.3.1. How is the network traffic monitored to ensure ACLs are functioning as intended, and what metrics are used to evaluate their effectiveness?</label>
                        <textarea name="trafficMonitoring" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>4.1.1.1.1.3.2. Are there regular audits conducted on ACLs to identify any misconfigurations, redundant rules, or outdated entries that could potentially expose the network to risk?</label>
                        <div>
                            <input type="radio" name="regularAudits" value="Yes" onChange={handleChange} /> Yes
                            <input type="radio" name="regularAudits" value="No" onChange={handleChange} /> No
                        </div>
                    </div>

                    <div className="form-section">
                        <label>4.1.1.1.1.3.3. How are incidents involving unauthorized access or ACL breaches documented, and what corrective actions are taken to prevent similar occurrences in the future?</label>
                        <textarea name="incidentDocumentation" onChange={handleChange}></textarea>
                    </div>

                    {/* Training and Awareness */}
                    <h3>4.1.1.1.1.4 Training and Awareness:</h3>
                    <div className="form-section">
                        <label>4.1.1.1.1.4.1. What training programs are provided to IT staff to ensure they have the knowledge and skills necessary to configure and manage ACLs effectively?</label>
                        <textarea name="trainingPrograms" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>4.1.1.1.1.4.2. Are there clear documentation and guidelines available for staff responsible for maintaining ACLs, and how is this information kept up-to-date?</label>
                        <textarea name="documentationGuidelines" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>4.1.1.1.1.4.3. How is awareness about the importance of proper ACL management promoted across the organization, especially among those who have access to critical network resources?</label>
                        <textarea name="promoteAwareness" onChange={handleChange}></textarea>
                    </div>

                    {/* Adaptability and Scalability */}
                    <h3>4.1.1.1.1.5 Adaptability and Scalability:</h3>
                    <div className="form-section">
                        <label>4.1.1.1.1.5.1. How do ACLs adapt to accommodate new devices, applications, or users added to the network, and is there a process for dynamically updating ACLs in response to these changes?</label>
                        <textarea name="adaptability" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>4.1.1.1.1.5.2. Are there strategies in place to scale ACL configurations in larger, more complex network environments without compromising security or performance?</label>
                        <textarea name="scalingStrategies" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>4.1.1.1.1.5.3. How are ACLs integrated with other network security measures, such as intrusion detection systems (IDS) or security information and event management (SIEM) systems, to provide a comprehensive security posture?</label>
                        <textarea name="integrationSecurityMeasures" onChange={handleChange}></textarea>
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </main>
        </div>
    );
}

export default AccessControlListsPage;
