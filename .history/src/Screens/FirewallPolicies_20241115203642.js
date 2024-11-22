import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png'; // Adjust the path if necessary

function FirewallPoliciesPage() {
    const navigate = useNavigate();
    const { setBuildingId, buildingId } = useBuilding(); // Access and update buildingId from context
    const db = getFirestore();

    const [formData, setFormData] = useState();

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
            const formsRef = collection(db, 'forms/Cybersecurity/Firewall Policies');
            await addDoc(formsRef, {
                building: buildingRef,
                formData: formData,
            });

            console.log('Form data submitted successfully!');
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
                <h1>Firewall Policies Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>4.1.1.1.2 Firewall Policies (e.g., blocking unauthorized access)</h2>

                    {/* Policy Definition and Scope */}
                    <h3>4.1.1.1.2.1 Policy Definition and Scope:</h3>
                    <div className="form-section">
                        <label>4.1.1.1.2.1.1. What criteria are used to define the firewall policies, and how do these criteria align with the organization's overall security objectives and regulatory requirements?</label>
                        <textarea name="policyCriteria" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>4.1.1.1.2.1.2. Are there specific policies in place for different types of network traffic (e.g., inbound, outbound, internal), and how are these tailored to the needs of various departments or user groups?</label>
                        <textarea name="trafficPolicies" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>4.1.1.1.2.1.3. How frequently are firewall policies reviewed and updated to ensure they remain effective against new threats and comply with evolving security standards?</label>
                        <textarea name="policyReviewFrequency" onChange={handleChange}></textarea>
                    </div>

                    {/* Implementation and Configuration */}
                    <h3>4.1.1.1.2.2 Implementation and Configuration:</h3>
                    <div className="form-section">
                        <label>4.1.1.1.2.2.1. What procedures are followed to implement firewall policies, and how are these policies tested for effectiveness and security before going live?</label>
                        <textarea name="implementationProcedures" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>4.1.1.1.2.2.2. How are exceptions to standard firewall policies handled (e.g., temporary access needs, special cases), and what controls are in place to minimize risks associated with such exceptions?</label>
                        <textarea name="policyExceptions" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>4.1.1.1.2.2.3. Are there automated tools or scripts used to manage and deploy firewall policies across different devices and network segments, and how are these tools maintained?</label>
                        <textarea name="automatedTools" onChange={handleChange}></textarea>
                    </div>

                    {/* Monitoring and Incident Response */}
                    <h3>4.1.1.1.2.3 Monitoring and Incident Response:</h3>
                    <div className="form-section">
                        <label>4.1.1.1.2.3.1. How is firewall activity monitored to detect and respond to unauthorized access attempts or breaches, and what metrics are used to gauge the effectiveness of firewall policies?</label>
                        <textarea name="monitoringMetrics" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>4.1.1.1.2.3.2. Are there defined procedures for responding to incidents where firewall policies fail to prevent unauthorized access, including root cause analysis and policy adjustments?</label>
                        <textarea name="incidentResponse" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>4.1.1.1.2.3.3. What logging and auditing mechanisms are in place to track changes to firewall policies and access attempts, and how are these logs reviewed for signs of potential threats?</label>
                        <textarea name="loggingAuditing" onChange={handleChange}></textarea>
                    </div>

                    {/* Training and Awareness */}
                    <h3>4.1.1.1.2.4 Training and Awareness:</h3>
                    <div className="form-section">
                        <label>4.1.1.1.2.4.1. What training programs are provided to IT staff responsible for managing and configuring firewall policies, and how is their knowledge kept current with evolving security practices?</label>
                        <textarea name="trainingPrograms" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>4.1.1.1.2.4.2. Are there clear documentation and guidelines available on how to apply and modify firewall policies, and how frequently is this information reviewed for accuracy?</label>
                        <textarea name="documentationGuidelines" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>4.1.1.1.2.4.3. How is awareness of firewall policy importance communicated across the organization, particularly to those whose activities may impact network security?</label>
                        <textarea name="awarenessCommunication" onChange={handleChange}></textarea>
                    </div>

                    {/* Compliance and Best Practices */}
                    <h3>4.1.1.1.2.5 Compliance and Best Practices:</h3>
                    <div className="form-section">
                        <label>4.1.1.1.2.5.1. Are firewall policies aligned with industry best practices and compliance requirements (e.g., PCI-DSS, HIPAA, GDPR), and how is compliance verified?</label>
                        <textarea name="complianceVerification" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>4.1.1.1.2.5.2. How are policies adapted to account for changes in network architecture, such as the addition of new devices or the implementation of cloud services?</label>
                        <textarea name="policyAdaptation" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>4.1.1.1.2.5.3. Is there a process for benchmarking firewall policies against peer organizations or security standards to ensure continuous improvement and adoption of best practices?</label>
                        <textarea name="benchmarkingProcess" onChange={handleChange}></textarea>
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </main>
        </div>
    );
}

export default FirewallPoliciesPage;
