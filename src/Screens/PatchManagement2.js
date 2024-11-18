import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';

function PatchManagementPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!buildingId) {
            alert('Building ID is missing. Please start from the Building Information page.');
            return;
        }

        try {
            const buildingRef = doc(db, 'Buildings', buildingId);
            const formsRef = collection(db, 'forms/Cybersecurity/Patch Management2');
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
                <button className="back-button" onClick={() => navigate(-1)}>←</button>
                <h1>Patch Management</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>4.4.2.2.2 Patch Management</h2>

                    {/* Patch Identification */}
                    <h3>4.4.2.2.2.1 Patch Identification</h3>
                    <div className="form-section">
                        <label>4.4.2.2.2.1.1. How are security patches identified and prioritized for deployment?</label>
                        <textarea name="patchIdentification" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>4.4.2.2.2.1.2. What sources are used to stay informed about available patches?</label>
                        <textarea name="patchSources" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>4.4.2.2.2.1.3. Are there specific criteria for determining which patches are critical?</label>
                        <div>
                            <input type="radio" name="criticalPatchesCriteria" value="Yes" onChange={handleChange} /> Yes
                            <input type="radio" name="criticalPatchesCriteria" value="No" onChange={handleChange} /> No
                        </div>
                    </div>

                    {/* Patch Deployment Process */}
                    <h3>4.4.2.2.2.2 Patch Deployment Process</h3>
                    <div className="form-section">
                        <label>4.4.2.2.2.2.1. What procedures are followed for deploying patches?</label>
                        <textarea name="patchDeploymentProcedures" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>4.4.2.2.2.2.2. How is patch deployment managed to ensure minimal disruption?</label>
                        <textarea name="minimalDisruption" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>4.4.2.2.2.2.3. Are there predefined steps for rolling out patches?</label>
                        <div>
                            <input type="radio" name="predefinedRolloutSteps" value="Yes" onChange={handleChange} /> Yes
                            <input type="radio" name="predefinedRolloutSteps" value="No" onChange={handleChange} /> No
                        </div>
                    </div>

                    {/* Testing and Validation */}
                    <h3>4.4.2.2.2.3 Testing and Validation</h3>
                    <div className="form-section">
                        <label>4.4.2.2.2.3.1. What testing is conducted to validate that patches do not negatively impact system functionality?</label>
                        <textarea name="patchTestingValidation" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>4.4.2.2.2.3.2. How are potential risks assessed and mitigated before applying patches to live systems?</label>
                        <textarea name="riskAssessmentMitigation" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>4.4.2.2.2.3.3. Are there procedures for verifying that patches have been successfully applied?</label>
                        <div>
                            <input type="radio" name="patchVerification" value="Yes" onChange={handleChange} /> Yes
                            <input type="radio" name="patchVerification" value="No" onChange={handleChange} /> No
                        </div>
                    </div>

                    {/* Patch Documentation */}
                    <h3>4.4.2.2.2.4 Patch Documentation</h3>
                    <div className="form-section">
                        <label>4.4.2.2.2.4.1. How is the patch management process documented?</label>
                        <textarea name="patchDocumentationProcess" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>4.4.2.2.2.4.2. What information is included to track patch history and compliance?</label>
                        <textarea name="patchHistoryTracking" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>4.4.2.2.2.4.3. How is documentation used for auditing patch management?</label>
                        <textarea name="patchAuditUsage" onChange={handleChange}></textarea>
                    </div>

                    {/* Compliance and Reporting */}
                    <h3>4.4.2.2.2.5 Compliance and Reporting</h3>
                    <div className="form-section">
                        <label>4.4.2.2.2.5.1. What reporting mechanisms are in place to track patch deployments?</label>
                        <textarea name="reportingMechanisms" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>4.4.2.2.2.5.2. How are reports reviewed to identify gaps?</label>
                        <textarea name="reportReview" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>4.4.2.2.2.5.3. Are there established procedures for reporting patch deployment issues?</label>
                        <div>
                            <input type="radio" name="reportingIssues" value="Yes" onChange={handleChange} /> Yes
                            <input type="radio" name="reportingIssues" value="No" onChange={handleChange} /> No
                        </div>
                    </div>

                    {/* Patch Management Tools */}
                    <h3>4.4.2.2.2.6 Patch Management Tools</h3>
                    <div className="form-section">
                        <label>4.4.2.2.2.6.1. What tools are used to automate patching?</label>
                        <textarea name="patchTools" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>4.4.2.2.2.6.2. How are tools maintained to ensure effectiveness?</label>
                        <textarea name="toolsMaintenance" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>4.4.2.2.2.6.3. Are there integration requirements with existing infrastructure?</label>
                        <div>
                            <input type="radio" name="integrationRequirements" value="Yes" onChange={handleChange} /> Yes
                            <input type="radio" name="integrationRequirements" value="No" onChange={handleChange} /> No
                        </div>
                    </div>

                    {/* Patch Rollback Procedures */}
                    <h3>4.4.2.2.2.7 Patch Rollback Procedures</h3>
                    <div className="form-section">
                        <label>4.4.2.2.2.7.1. What rollback procedures are in place?</label>
                        <textarea name="rollbackProcedures" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>4.4.2.2.2.7.2. How is the decision made to roll back a patch?</label>
                        <textarea name="rollbackDecision" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>4.4.2.2.2.7.3. How are rollback issues communicated?</label>
                        <textarea name="rollbackIssues" onChange={handleChange}></textarea>
                    </div>

                    {/* Patch Management Policy */}
                    <h3>4.4.2.2.2.8 Patch Management Policy</h3>
                    <div className="form-section">
                        <label>4.4.2.2.2.8.1. What policies govern the patch management process?</label>
                        <textarea name="patchPolicy" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>4.4.2.2.2.8.2. How are policies communicated to stakeholders?</label>
                        <textarea name="policyCommunication" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>4.4.2.2.2.8.3. Are policies periodically reviewed to ensure effectiveness?</label>
                        <textarea name="policyReview" onChange={handleChange}></textarea>
                    </div>

                    {/* Training and Awareness */}
                    <h3>4.4.2.2.2.9 Training and Awareness</h3>
                    <div className="form-section">
                        <label>4.4.2.2.2.9.1. What training is provided on patch management?</label>
                        <textarea name="trainingOnPatch" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>4.4.2.2.2.9.2. How is staff awareness of patch management importance ensured?</label>
                        <textarea name="staffAwareness" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>4.4.2.2.2.9.3. Are there refresher training sessions for staff?</label>
                        <textarea name="refresherTraining" onChange={handleChange}></textarea>
                    </div>

                    {/* Incident Response Integration */}
                    <h3>4.4.2.2.2.10 Incident Response Integration</h3>
                    <div className="form-section">
                        <label>4.4.2.2.2.10.1. How is patch management integrated with incident response?</label>
                        <textarea name="incidentIntegration" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>4.4.2.2.2.10.2. What role does patch management play in incident recovery?</label>
                        <textarea name="incidentRecoveryRole" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>4.4.2.2.2.10.3. Are there protocols for quick patch deployment during incidents?</label>
                        <textarea name="quickPatchDeployment" onChange={handleChange}></textarea>
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </main>
        </div>
    );
}

export default PatchManagementPage;
