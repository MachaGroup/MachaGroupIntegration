import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';

function DataSecurityRequirementsFormPage() {
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
      const formsRef = collection(db, 'forms/Policy and Compliance/Data Security Requirements');
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
            {/* Back Button */}
        <button className="back-button" onClick={handleBack}>←</button> {/* Back button at the top */}
            <h1>5.2.1.1.2 Data Security Requirements Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 5.2.1.1.2 Data Security Requirements */}
                <h2>5.2.1.1.2.1 Data Encryption:</h2>
                <div className="form-section">
                    <label>What types of encryption are used to protect student data both at rest and in transit?</label>
                    <div>
                        <input type="text" name="dataEncryption" placeholder="Describe the types" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are encryption standards selected and implemented to ensure they meet current security best practices?</label>
                    <div>
                        <input type="text" name="dataEncryption" placeholder="Describe the types" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What is the process for managing and updating encryption keys?</label>
                    <div>
                        <input type="text" name="managingProcess" placeholder="Describe the process" onChange={handleChange} />  
                    </div>
                </div>

                <h2>5.2.1.1.2.2 Access Control:</h2>
                <div className="form-section">
                    <label>What access control measures are in place to restrict access to student data to authorized personnel only?</label>
                    <div>
                        <input type="text" name="restrictionMeasures" placeholder="Describe the measures" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are access permissions managed and reviewed to ensure that only those with a legitimate need have access to sensitive data?</label>
                    <div>
                        <input type="text" name="managedPermissions" placeholder="Describe how they're managed" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What authentication methods are used to verify the identity of individuals accessing student data?</label>
                    <div>
                        <input type="text" name="verifyingMethods" placeholder="Describe the methods" onChange={handleChange} />  
                    </div>
                </div>

                <h2>5.2.1.1.2.3 Data Backup and Recovery:</h2>
                <div className="form-section">
                    <label>What are the procedures for backing up student data, and how frequently are backups performed?</label>
                    <div>
                        <input type="text" name="backupProcedures" placeholder="Describe the procedures" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are backup files secured to prevent unauthorized access or data breaches?</label>
                    <div>
                        <input type="text" name="securedFiles" placeholder="Describe how they're secured" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What is the process for testing data recovery from backups to ensure that data can be restored effectively in the event of a loss?</label>
                    <div>
                        <input type="text" name="dataRecovery" placeholder="Describe the process" onChange={handleChange} />  
                    </div>
                </div>

                <h2>5.2.1.1.2.4 Network Security:</h2>
                <div className="form-section">
                    <label>What network security measures are in place to protect student data from unauthorized access and cyberattacks?</label>
                    <div>
                        <input type="text" name="networkMeasures" placeholder="Describe the measures" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are firewalls, intrusion detection systems, and other network security tools configured to safeguard data?</label>
                    <div>
                        <input type="text" name="securityTools" placeholder="Describe how they're configured" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What protocols are followed to monitor and respond to potential network security threats?</label>
                    <div>
                        <input type="text" name="monitoringThreats" placeholder="Describe the protocols" onChange={handleChange} />  
                    </div>
                </div>

                <h2>5.2.1.1.2.5 Physical Security:</h2>
                <div className="form-section">
                    <label>What physical security measures are in place to protect servers, computers, and other devices storing student data?</label>
                    <div>
                        <input type="text" name="protectingServers" placeholder="Describe the measures" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How is access to physical locations where data is stored or processed controlled and monitored?</label>
                    <div>
                        <input type="text" name="securityTools" placeholder="Describe how it's stored" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What procedures are followed to secure data during maintenance or when equipment is being replaced?</label>
                    <div>
                        <input type="text" name="maintenanceProcedures" placeholder="Describe the procedures" onChange={handleChange} />  
                    </div>
                </div>

                <h2>5.2.1.1.2.6 Data Handling and Transmission:</h2>
                <div className="form-section">
                    <label>How is student data securely transmitted between systems and organizations, such as during data exchanges or remote access?</label>
                    <div>
                        <input type="text" name="transmittingData" placeholder="Describe how it's transmitted" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What protocols are used to ensure secure data handling during data entry, processing, and storage?</label>
                    <div>
                        <input type="text" name="dataEntry" placeholder="Describe the protocols" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there guidelines for securely disposing of or decommissioning hardware and media containing student data?</label>
                    <div>
                        <input type="radio" name="disposingGuidelines" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="disposingGuidelines" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>5.2.1.1.2.7 Compliance and Auditing:</h2>
                <div className="form-section">
                    <label>How does the organization ensure compliance with data security regulations and standards, such as FERPA, GDPR, or other relevant laws?</label>
                    <div>
                        <input type="text" name="transmittingData" placeholder="Describe how compliance is ensured" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What auditing practices are in place to regularly review and assess data security measures?</label>
                    <div>
                        <input type="text" name="auditingPractices" placeholder="Describe the practices" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are audit findings addressed, and what corrective actions are taken to resolve identified issues?</label>
                    <div>
                        <input type="text" name="addressedFindings" placeholder="Describe how they're addressed" onChange={handleChange} />  
                    </div>
                </div>

                <h2>5.2.1.1.2.8 Incident Response:</h2>
                <div className="form-section">
                    <label>What procedures are in place for responding to data breaches or security incidents involving student data?</label>
                    <div>
                        <input type="text" name="auditingPractices" placeholder="Describe the procedures" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are incidents reported, investigated, and documented to ensure timely and effective resolution?</label>
                    <div>
                        <input type="text" name="reportedIncidents" placeholder="Describe how they're reported" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What steps are taken to notify affected individuals and regulatory authorities in the event of a data breach?</label>
                    <div>
                        <input type="text" name="notifyingIndividuals" placeholder="Describe the steps" onChange={handleChange} />  
                    </div>
                </div>

                <h2>5.2.1.1.2.9 Training and Awareness:</h2>
                <div className="form-section">
                    <label>What training is provided to staff regarding data security best practices and their responsibilities in protecting student data?</label>
                    <div>
                        <input type="text" name="staffTraining" placeholder="Describe the training" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How is awareness maintained among staff about emerging threats and security updates?</label>
                    <div>
                        <input type="text" name="maintainedAwareness" placeholder="Describe how it's maintained" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there resources or guidelines available to assist staff in understanding and implementing data security measures?</label>
                    <div>
                        <input type="radio" name="staffGuidelines" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="staffGuidelines" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>5.2.1.1.2.10 Policy and Procedure Documentation:</h2>
                <div className="form-section">
                    <label>What policies and procedures are in place to govern data security practices related to student data?</label>
                    <div>
                        <input type="text" name="governPractices" placeholder="Describe the policies" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are these policies documented, and how often are they reviewed and updated?</label>
                    <div>
                        <input type="text" name="documentedPolicies" placeholder="Describe how they're documented" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are changes to data security policies communicated to staff and other stakeholders?</label>
                    <div>
                        <input type="text" name="communicatedPolicies" placeholder="Describe how they're communicated" onChange={handleChange} />  
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit">Submit</button>

            </form>
        </main>
    </div>
  )
}

export default DataSecurityRequirementsFormPage;