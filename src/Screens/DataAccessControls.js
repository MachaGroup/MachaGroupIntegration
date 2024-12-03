import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import Navbar from "./Navbar";

function DataAccessControlsFormPage() {
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
      const formsRef = collection(db, 'forms/Policy and Compliance/Data Access Controls');
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
            {/* Back Button */}
        <button className="back-button" onClick={handleBack}>←</button> {/* Back button at the top */}
            <h1>5.1.2.2.2 Data Access Controls Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 5.1.2.2.2 Data Access Controls */}
                <h2>5.1.2.2.2.1 Access Control Policies:</h2>
                <div className="form-section">
                    <label>What policies are in place to define who can access sensitive data and under what conditions?</label>
                    <div>
                        <input type="text" name="accessData" placeholder="Describe the policies" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are access control policies communicated to and enforced among staff?</label>
                    <div>
                        <input type="text" name="communicatedPolicies" placeholder="Describe how they're communicated and enforced" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there procedures for updating access control policies to reflect changes in organizational needs or regulations?</label>
                    <div>
                        <input type="radio" name="updatingPolicies" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="updatingPolicies" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>5.1.2.2.2.2 Role-Based Access Control (RBAC):</h2>
                <div className="form-section">
                    <label>How are roles defined within the organization, and what criteria determine role-based access permissions?</label>
                    <div>
                        <input type="text" name="definedRoles" placeholder="Describe how they're defined" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are roles assigned to individuals, and how is access to sensitive data managed based on these roles?</label>
                    <div>
                        <input type="text" name="assignedRoles" placeholder="Describe how they're assigned" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are role definitions reviewed and updated periodically to ensure they reflect current job responsibilities?</label>
                    <div>
                        <input type="radio" name="reviewedDefinitions" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="reviewedDefinitions" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>5.1.2.2.2.3 Access Approval Processes:</h2>
                <div className="form-section">
                    <label>What processes are in place for granting, modifying, or revoking access to sensitive data?</label>
                    <div>
                        <input type="text" name="grantingProcesses" placeholder="Describe the processes" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Who is responsible for approving access requests, and how is the approval process documented?</label>
                    <div>
                        <input type="text" name="approvingResponsibility" placeholder="Who's responsible" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there mechanisms for auditing and reviewing access approvals to ensure compliance with access control policies?</label>
                    <div>
                        <input type="radio" name="auditingApprovals" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="auditingApprovals" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>5.1.2.2.2.4 Authentication and Authorization:</h2>
                <div className="form-section">
                    <label>What methods are used to authenticate users before granting access to sensitive data (e.g., passwords, multi-factor authentication)?</label>
                    <div>
                        <input type="text" name="userAuthentication" placeholder="Describe the methods" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How is authorization managed to ensure that users only access data that is necessary for their role?</label>
                    <div>
                        <input type="text" name="managedAuthorization" placeholder="Describe how it's managed" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there procedures for handling authentication and authorization failures or issues?</label>
                    <div>
                        <input type="radio" name="authenticationHandling" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="authenticationHandling" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>5.1.2.2.2.5 Access Logging and Monitoring:</h2>
                <div className="form-section">
                    <label>How is access to sensitive data logged, and what information is captured in access logs?</label>
                    <div>
                        <input type="text" name="loggedData" placeholder="Describe how it's logged" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What monitoring mechanisms are in place to detect and respond to unauthorized access attempts or anomalies?</label>
                    <div>
                        <input type="text" name="monitoringMechanisms" placeholder="Describe the mechanisms" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are access logs reviewed and analyzed to identify potential security incidents or policy violations?</label>
                    <div>
                        <input type="text" name="reviewedLogs" placeholder="Describe how they're reviewed and analyzed" onChange={handleChange} />  
                    </div>
                </div>

                <h2>5.1.2.2.2.6 Data Access Reviews:</h2>
                <div className="form-section">
                    <label>How frequently are access rights reviewed to ensure they are still appropriate for each user's role?</label>
                    <div>
                        <input type="text" name="reviewedRights" placeholder="Describe how frequent" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What processes are used to validate that access permissions are aligned with current job responsibilities?</label>
                    <div>
                        <input type="text" name="validatingPermissions" placeholder="Describe the processes" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there procedures for handling discrepancies or issues identified during access reviews?</label>
                    <div>
                        <input type="radio" name="handlingDiscrepancies" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="handlingDiscrepancies" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>5.1.2.2.2.7 Least Privilege Principle:</h2>
                <div className="form-section">
                    <label>How is the principle of least privilege applied to limit access to sensitive data to only those who need it?</label>
                    <div>
                        <input type="text" name="privilegePrinciple" placeholder="Describe how it's applied" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What processes are in place to ensure that access permissions are regularly reviewed and adjusted based on changing roles?</label>
                    <div>
                        <input type="text" name="reviewedProcesses" placeholder="Describe the processes" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there safeguards to prevent the accumulation of excessive access rights over time?</label>
                    <div>
                        <input type="radio" name="safegaurdPreventions" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="safegaurdPreventions" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>5.1.2.2.2.8 Access Control for External Parties:</h2>
                <div className="form-section">
                    <label>How is access to sensitive data managed for external parties, such as contractors or vendors?</label>
                    <div>
                        <input type="text" name="managedData" placeholder="Describe how it's managed" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What controls are in place to ensure that external parties adhere to the organization's access policies?</label>
                    <div>
                        <input type="text" name="policiyControls" placeholder="Describe the controls" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there agreements or contracts in place to govern access to sensitive data by external parties?</label>
                    <div>
                        <input type="radio" name="governAccess" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="governAccess" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>5.1.2.2.2.9 Incident Response for Access Violations:</h2>
                <div className="form-section">
                    <label>What procedures are followed when unauthorized access to sensitive data is detected?</label>
                    <div>
                        <input type="text" name="accessProcedures" placeholder="Describe the procedures" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are incidents involving access control breaches reported, investigated, and resolved?</label>
                    <div>
                        <input type="text" name="reportedBreaches" placeholder="Describe how they're reported" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there mechanisms for documenting and addressing lessons learned from access violations?</label>
                    <div>
                        <input type="radio" name="documentingMechanisms" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="documentingMechanisms" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>5.1.2.2.2.10 Training and Awareness:</h2>
                <div className="form-section">
                    <label>What training is provided to employees regarding data access controls and policies?</label>
                    <div>
                        <input type="text" name="employeeTraining" placeholder="Describe the training" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How is awareness of access control best practices maintained among staff?</label>
                    <div>
                        <input type="text" name="maintainedAwareness" placeholder="Describe how it's maintained" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there resources or guidelines available to assist employees in understanding and adhering to access control requirements?</label>
                    <div>
                        <input type="radio" name="employeeResources" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="employeeResources" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit">Submit</button>

            </form>
        </main>
    </div>
  )
}

export default DataAccessControlsFormPage;