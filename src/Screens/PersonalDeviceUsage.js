import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';

function PersonalDeviceUsageFormPage() {
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
      const formsRef = collection(db, 'forms/Policy and Compliance/Personal Device Usage');
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
        <form onSubmit={handleSubmit}></form>
        <header className="header">
            {/* Back Button */}
        <button className="back-button" onClick={handleBack}>←</button> {/* Back button at the top */}
            <h1>5.1.1.1.2 Personal Device Usage Assessment</h1>
        </header>

        <main className="form-container">
            <form>
                {/* 5.1.1.1.2 Personal Device Usage */}
                <h2>5.1.1.1.2.1 Policy Scope and Guidelines:</h2>
                <div className="form-section">
                    <label>What guidelines are established for the use of personal devices (e.g., smartphones, tablets, laptops) on the network?</label>
                    <div>
                        <input type="text" name="useGuidelines" placeholder="List the guidelines" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there specific requirements for the type and security of personal devices that can connect to the network?</label>
                    <div>
                        <input type="radio" name="securityRequirements" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="securityRequirements" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How does the policy define acceptable and unacceptable uses of personal devices within the organizational environment?</label>
                    <div>
                        <input type="text" name="usePolicy" placeholder="Describe how it define uses" onChange={handleChange} />  
                    </div>
                </div>

                <h2>5.1.1.1.2.2 Device Registration and Management:</h2>
                <div className="form-section">
                    <label>What procedures are in place for registering personal devices with the organization (e.g., device registration forms)?</label>
                    <div>
                        <input type="text" name="registeringProcedures" placeholder="Describe the procedures" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How is the management and tracking of personal devices handled within the network?</label>
                    <div>
                        <input type="text" name="handledTracking" placeholder="Describe how it's handled" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there specific protocols for ensuring that personal devices meet the organization's security standards before being granted access?</label>
                    <div>
                        <input type="radio" name="deviceProtocols" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="deviceProtocols" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>5.1.1.1.2.3 Security Measures:</h2>
                <div className="form-section">
                    <label>What security measures are required for personal devices to access the network (e.g., antivirus software, encryption)?</label>
                    <div>
                        <input type="text" name="securityMeasures" placeholder="Describe the measures" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are security updates and patches managed for personal devices connecting to the network?</label>
                    <div>
                        <input type="text" name="securityUpdates" placeholder="Describe how they're managed" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there specific requirements for personal devices regarding passwords or multi-factor authentication?</label>
                    <div>
                        <input type="radio" name="passwordRequirements" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="passwordRequirements" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>5.1.1.1.2.4 Network Access Controls:</h2>
                <div className="form-section">
                    <label>How is network access controlled for personal devices (e.g., network segmentation, VPN requirements)?</label>
                    <div>
                        <input type="text" name="networkAccess" placeholder="Describe how they're controlled" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there restrictions on the types of network resources that personal devices can access?</label>
                    <div>
                        <input type="radio" name="resourceRestrictions" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="resourceRestrictions" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>What monitoring tools are used to ensure that personal devices do not pose a security risk to the network?</label>
                    <div>
                        <input type="text" name="monitoringTools" placeholder="Describe the tools" onChange={handleChange} />  
                    </div>
                </div>

                <h2>5.1.1.1.2.5 User Responsibilities and Compliance:</h2>
                <div className="form-section">
                    <label>What responsibilities do users have regarding the use of their personal devices (e.g., reporting lost or stolen devices)?</label>
                    <div>
                        <input type="text" name="userResponsibilities" placeholder="Describe the responsibilities" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How is compliance with the personal device usage policy ensured and enforced?</label>
                    <div>
                        <input type="text" name="compliancePolicy" placeholder="Describe how it's ensured and enforced" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there clear consequences for non-compliance with the policy?</label>
                    <div>
                        <input type="radio" name="policyConsequences" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="policyConsequences" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>5.1.1.1.2.6 Privacy and Data Protection:</h2>
                <div className="form-section">
                    <label>How does the policy address the privacy of data on personal devices used within the organization?</label>
                    <div>
                        <input type="text" name="addressedPolicy" placeholder="Describe how does it address it" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What measures are taken to protect organizational data on personal devices (e.g., remote wipe capabilities)?</label>
                    <div>
                        <input type="text" name="protectionMeasures" placeholder="Describe the measures" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are user data and privacy balanced with security requirements?</label>
                    <div>
                        <input type="text" name="balancedData" placeholder="Describe how it's balanced" onChange={handleChange} />  
                    </div>
                </div>

                <h2>5.1.1.1.2.7 Policy Exceptions and Approvals:</h2>
                <div className="form-section">
                    <label>What processes are in place for requesting exceptions to the personal device usage policy (e.g., special permissions for specific devices)?</label>
                    <div>
                        <input type="text" name="requestingExceptions" placeholder="Describe the processes" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Who is authorized to review and approve exceptions to the policy?</label>
                    <div>
                        <input type="text" name="authorizedExceptions" placeholder="List who's authorized" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there documented procedures for handling and documenting policy exceptions?</label>
                    <div>
                        <input type="radio" name="documentedProcedures" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="documentedProcedures" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>5.1.1.1.2.8 Incident Response and Management:</h2>
                <div className="form-section">
                    <label>What steps are taken if a personal device is involved in a security incident (e.g., data breaches, malware infections)?</label>
                    <div>
                        <input type="text" name="securityIncident" placeholder="List the steps" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are incidents involving personal devices managed and documented?</label>
                    <div>
                        <input type="text" name="managedIncidents" placeholder="Describe how they're managed and documented" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What procedures are followed for responding to and mitigating risks associated with compromised personal devices?</label>
                    <div>
                        <input type="text" name="mitigatingRisks" placeholder="Describe the procedures" onChange={handleChange} />  
                    </div>
                </div>

                <h2>5.1.1.1.2.9 Training and Awareness:</h2>
                <div className="form-section">
                    <label>What training programs are provided to users regarding the safe use of personal devices on the network?</label>
                    <div>
                        <input type="text" name="trainingPrograms" placeholder="Describe the programs" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How is user awareness of personal device policies and security practices ensured?</label>
                    <div>
                        <input type="text" name="userAwareness" placeholder="Describe how it's ensured" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there resources available to assist users in understanding and complying with the personal device usage policy?</label>
                    <div>
                        <input type="radio" name="assistingUsers" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="assistingUsers" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>5.1.1.1.2.10 Review and Updates:</h2>
                <div className="form-section">
                    <label>How frequently is the personal device usage policy reviewed and updated to address new risks and technological changes?</label>
                    <div>
                        <input type="text" name="usagePolicy" placeholder="Describe how frequent" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Who is responsible for reviewing and revising the policy, and what criteria are used for updates?</label>
                    <div>
                        <input type="text" name="reviewingPolicy" placeholder="List who's responsible" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are updates to the personal device usage policy communicated to users?</label>
                    <div>
                        <input type="text" name="communicatedPolicy" placeholder="Describe how it's communicated" onChange={handleChange} />  
                    </div>
                </div>

            </form>
        </main>
    </div>
  )
}

export default PersonalDeviceUsageFormPage;
