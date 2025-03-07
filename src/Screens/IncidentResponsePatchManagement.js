import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function PatchManagementPage() {
  const navigate = useNavigate();  // Initialize useNavigate hook for navigation
  const { buildingId } = useBuilding();
  const db = getFirestore();

  const [formData, setFormData] = useState();

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

  // Function to handle back button
  const handleBack = () => {
    navigate(-1);  // Navigates to the previous page
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(!buildingId) {
      alert('Building ID is missing. Please start the assessment from the correct page.');
      return;
    }

    try {
      // Create a document reference to the building in the 'Buildings' collection
      const buildingRef = doc(db, 'Buildings', buildingId);

      // Store the form data in the specified Firestore structure
      const formsRef = collection(db, 'forms/Cybersecurity/Incident Response Patch Management');
      await addDoc(formsRef, {
        buildling: buildingRef,
        formData: formData,
      });
      console.log('From Data submitted successfully!')
      alert('Form Submitted successfully!');
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
                <h1>Incident Response Patch Management</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    {/* Patch Identification */}
                    <h2>4.4.2.2.2.1 Patch Identification</h2>
                    <div className="form-section">
                        <label>How are security patches identified and prioritized for deployment?</label>
                        <textarea name="patchIdentification" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>What sources are used to stay informed about available patches?</label>
                        <textarea name="patchSources" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>Are there specific criteria for determining which patches are critical?</label>
                        <div>
                            <input type="radio" name="criticalPatchesCriteria" value="Yes" onChange={handleChange} /> Yes
                            <input type="radio" name="criticalPatchesCriteria" value="No" onChange={handleChange} /> No
                        </div>
                    </div>

                    {/* Patch Deployment Process */}
                    <h2>4.4.2.2.2.2 Patch Deployment Process</h2>
                    <div className="form-section">
                        <label>What procedures are followed for deploying patches?</label>
                        <textarea name="patchDeploymentProcedures" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>How is patch deployment managed to ensure minimal disruption?</label>
                        <textarea name="minimalDisruption" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>Are there predefined steps for rolling out patches?</label>
                        <div>
                            <input type="radio" name="predefinedRolloutSteps" value="Yes" onChange={handleChange} /> Yes
                            <input type="radio" name="predefinedRolloutSteps" value="No" onChange={handleChange} /> No
                        </div>
                    </div>

                    {/* Testing and Validation */}
                    <h2>4.4.2.2.2.3 Testing and Validation</h2>
                    <div className="form-section">
                        <label>What testing is conducted to validate that patches do not negatively impact system functionality?</label>
                        <textarea name="patchTestingValidation" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>How are potential risks assessed and mitigated before applying patches to live systems?</label>
                        <textarea name="riskAssessmentMitigation" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>Are there procedures for verifying that patches have been successfully applied?</label>
                        <div>
                            <input type="radio" name="patchVerification" value="Yes" onChange={handleChange} /> Yes
                            <input type="radio" name="patchVerification" value="No" onChange={handleChange} /> No
                        </div>
                    </div>

                    {/* Patch Documentation */}
                    <h2>4.4.2.2.2.4 Patch Documentation</h2>
                    <div className="form-section">
                        <label>How is the patch management process documented?</label>
                        <textarea name="patchDocumentationProcess" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>What information is included to track patch history and compliance?</label>
                        <textarea name="patchHistoryTracking" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>How is documentation used for auditing patch management?</label>
                        <textarea name="patchAuditUsage" onChange={handleChange}></textarea>
                    </div>

                    {/* Compliance and Reporting */}
                    <h2>4.4.2.2.2.5 Compliance and Reporting</h2>
                    <div className="form-section">
                        <label>What reporting mechanisms are in place to track patch deployments?</label>
                        <textarea name="reportingMechanisms" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>How are reports reviewed to identify gaps?</label>
                        <textarea name="reportReview" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>Are there established procedures for reporting patch deployment issues?</label>
                        <div>
                            <input type="radio" name="reportingIssues" value="Yes" onChange={handleChange} /> Yes
                            <input type="radio" name="reportingIssues" value="No" onChange={handleChange} /> No
                        </div>
                    </div>

                    {/* Patch Management Tools */}
                    <h2>4.4.2.2.2.6 Patch Management Tools</h2>
                    <div className="form-section">
                        <label>What tools are used to automate patching?</label>
                        <textarea name="patchTools" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>How are tools maintained to ensure effectiveness?</label>
                        <textarea name="toolsMaintenance" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>Are there integration requirements with existing infrastructure?</label>
                        <div>
                            <input type="radio" name="integrationRequirements" value="Yes" onChange={handleChange} /> Yes
                            <input type="radio" name="integrationRequirements" value="No" onChange={handleChange} /> No
                        </div>
                    </div>

                    {/* Patch Rollback Procedures */}
                    <h2>4.4.2.2.2.7 Patch Rollback Procedures</h2>
                    <div className="form-section">
                        <label>What rollback procedures are in place?</label>
                        <textarea name="rollbackProcedures" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>How is the decision made to roll back a patch?</label>
                        <textarea name="rollbackDecision" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>How are rollback issues communicated?</label>
                        <textarea name="rollbackIssues" onChange={handleChange}></textarea>
                    </div>

                    {/* Patch Management Policy */}
                    <h2>4.4.2.2.2.8 Patch Management Policy</h2>
                    <div className="form-section">
                        <label>What policies govern the patch management process?</label>
                        <textarea name="patchPolicy" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>How are policies communicated to stakeholders?</label>
                        <textarea name="policyCommunication" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>Are policies periodically reviewed to ensure effectiveness?</label>
                        <textarea name="policyReview" onChange={handleChange}></textarea>
                    </div>

                    {/* Training and Awareness */}
                    <h2>4.4.2.2.2.9 Training and Awareness</h2>
                    <div className="form-section">
                        <label>What training is provided on patch management?</label>
                        <textarea name="trainingOnPatch" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>How is staff awareness of patch management importance ensured?</label>
                        <textarea name="staffAwareness" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>Are there refresher training sessions for staff?</label>
                        <textarea name="refresherTraining" onChange={handleChange}></textarea>
                    </div>

                    {/* Incident Response Integration */}
                    <h2>4.4.2.2.2.10 Incident Response Integration</h2>
                    <div className="form-section">
                        <label>How is patch management integrated with incident response?</label>
                        <textarea name="incidentIntegration" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>What role does patch management play in incident recovery?</label>
                        <textarea name="incidentRecoveryRole" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>Are there protocols for quick patch deployment during incidents?</label>
                        <textarea name="quickPatchDeployment" onChange={handleChange}></textarea>
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </main>
        </div>
    );
}

export default PatchManagementPage;
