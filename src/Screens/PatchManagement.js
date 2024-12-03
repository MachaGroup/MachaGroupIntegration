import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png'; // Adjust the path if necessary
import Navbar from "./Navbar";

function PatchManagementPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding(); // Access and update buildingId from context
    const db = getFirestore();

    const [formData, setFormData] = useState({});

    useEffect(() => {
        if(!buildingId) {
          alert('No builidng selected. Redirecting to Building Info...');
          navigate('BuildingandAddress');
        }
      }, [buildingId, navigate]);

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
            const formsRef = collection(db, 'forms/Cybersecurity/Patch Management');
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
            <Navbar />
                <button className="back-button" onClick={handleBack}>←</button>
                <h1>Patch Management Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>4.1.2.2.1 Patch Management (e.g., installing security updates)</h2>

                    {/* Timeliness and Efficiency */}
                    <h3>4.1.2.2.1.1 Timeliness and Efficiency:</h3>
                    <div className="form-section">
                        <label>4.1.2.2.1.1.1. How quickly are patches and security updates applied to devices once they are released by vendors?</label>
                        <textarea name="patchTimeliness" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>4.1.2.2.1.1.2. Are there automated systems in place to regularly check for and deploy patches across all devices in the network?</label>
                        <div>
                            <input type="radio" name="automatedPatchSystems" value="Yes" onChange={handleChange} /> Yes
                            <input type="radio" name="automatedPatchSystems" value="No" onChange={handleChange} /> No
                        </div>
                    </div>

                    <div className="form-section">
                        <label>4.1.2.2.1.1.3. What processes are in place to ensure that critical patches are prioritized and installed without delay to mitigate security risks?</label>
                        <textarea name="criticalPatchProcesses" onChange={handleChange}></textarea>
                    </div>

                    {/* Coverage and Scope */}
                    <h3>4.1.2.2.1.2 Coverage and Scope:</h3>
                    <div className="form-section">
                        <label>4.1.2.2.1.2.1. Does the patch management strategy cover all operating systems, applications, and firmware used within the organization?</label>
                        <div>
                            <input type="radio" name="patchCoverage" value="Yes" onChange={handleChange} /> Yes
                            <input type="radio" name="patchCoverage" value="No" onChange={handleChange} /> No
                        </div>
                    </div>

                    <div className="form-section">
                        <label>4.1.2.2.1.2.2. How are third-party applications managed, and is there a comprehensive inventory to ensure all software is up-to-date?</label>
                        <textarea name="thirdPartyManagement" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>4.1.2.2.1.2.3. Are there mechanisms to ensure that both on-premises and remote devices receive necessary updates in a timely manner?</label>
                        <textarea name="remoteUpdateMechanisms" onChange={handleChange}></textarea>
                    </div>

                    {/* Testing and Validation */}
                    <h3>4.1.2.2.1.3 Testing and Validation:</h3>
                    <div className="form-section">
                        <label>4.1.2.2.1.3.1. Is there a procedure for testing patches in a controlled environment before deployment to ensure compatibility and prevent disruption of services?</label>
                        <textarea name="patchTestingProcedure" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>4.1.2.2.1.3.2. How are patches validated to confirm successful installation, and what steps are taken if a patch fails to apply correctly?</label>
                        <textarea name="patchValidationSteps" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>4.1.2.2.1.3.3. Are rollback plans in place to revert changes if a patch causes unforeseen issues or incompatibility with existing systems?</label>
                        <textarea name="rollbackPlans" onChange={handleChange}></textarea>
                    </div>

                    {/* Compliance and Reporting */}
                    <h3>4.1.2.2.1.4 Compliance and Reporting:</h3>
                    <div className="form-section">
                        <label>4.1.2.2.1.4.1. How does the patch management process ensure compliance with regulatory requirements and industry standards, such as GDPR, HIPAA, or PCI-DSS?</label>
                        <textarea name="complianceAssurance" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>4.1.2.2.1.4.2. Are there audit trails and reporting mechanisms that document patch status, including deployed, pending, and failed updates, for all devices?</label>
                        <textarea name="auditTrails" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>4.1.2.2.1.4.3. How often are patch management reports reviewed, and who is responsible for ensuring that devices are fully patched and compliant?</label>
                        <textarea name="reportReviewFrequency" onChange={handleChange}></textarea>
                    </div>

                    {/* Security and Risk Management */}
                    <h3>4.1.2.2.1.5 Security and Risk Management:</h3>
                    <div className="form-section">
                        <label>4.1.2.2.1.5.1. What strategies are in place to prioritize patches based on the severity of vulnerabilities and the criticality of affected systems?</label>
                        <textarea name="patchPrioritizationStrategies" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>4.1.2.2.1.5.2. How are patch management activities integrated into the broader cybersecurity strategy to address potential risks and minimize attack surfaces?</label>
                        <textarea name="cybersecurityIntegration" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>4.1.2.2.1.5.3. Are there procedures for handling out-of-band or emergency patches, particularly in response to zero-day vulnerabilities or active threats?</label>
                        <textarea name="emergencyPatchProcedures" onChange={handleChange}></textarea>
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </main>
        </div>
    );
}

export default PatchManagementPage;
