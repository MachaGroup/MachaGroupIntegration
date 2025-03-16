import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';  // Ensure this is linked to your universal CSS
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
/**/
function AccessControlSystemsPage() {
  const navigate = useNavigate();  // Initialize useNavigate hook for navigation
  const { buildingId } = useBuilding();
  const db = getFirestore();

  const [formData, setFormData] = useState();

  useEffect(() => {
    if(!buildingId) {
      alert('No building selected. Redirecting to Building Info...');
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
  const handleBack = async () => {
          if (formData && buildingId) { // Check if formData and buildingId exist
            try {
              const buildingRef = doc(db, 'Buildings', buildingId);
              const formsRef = collection(db, 'forms/Physical Security/Access Control Systems');
              await addDoc(formsRef, {
                building: buildingRef,
                formData: formData,
              });
              console.log('Form Data submitted successfully on back!');
              alert('Form data saved before navigating back!');
            } catch (error) {
              console.error('Error saving form data:', error);
              alert('Failed to save form data before navigating back. Some data may be lost.');
            }
          }
          navigate(-1);
        };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!buildingId) {
      alert('Building ID is missing. Please start the assessment from the right page.');
      return;
    }

    try {
      // Create a document reference to the building in the 'Buildings' collection
      const buildingRef = doc(db, 'Buidlings', buildingId);

      // Store the form data in the specified Firestore structure
      const formsRef = collection(db, 'forms/Physical Security/Access Control Systems')
      await addDoc(formsRef, {
        building: buildingRef,
        formData: formData,
      });

      console.log('Form data submitted successfully!');
      alert('Form submitted successfully!');
      navigate('/Form');
    } catch (error) {
      console.error('Error submitting the form:', error);
      alert('Failed to submit the form. Please try again.');
    }
  };

  return (
    <div className="form-page">
      <header className="header">
            <Navbar />
        {/* Back Button */}
        <button className="back-button" onClick={handleBack}>←</button> {/* Back button at the top */}
        <h1>Access Control Systems Assessment</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          {/* Functionality and Operation */}
          <h2>Functionality and Operation:</h2>
          <div className="form-section">
            <label>Are the Access Control Systems operational and functioning as intended?</label>
            <div>
              <input type="radio" name="accessControlOperational" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="accessControlOperational" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="accessControlOperationalComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Do the systems accurately authenticate and authorize individuals' access rights?</label>
            <div>
              <input type="radio" name="authAccurate" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="authAccurate" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="authAccurateComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Are there any signs of malfunction or system errors that could compromise security?</label>
            <div>
              <input type="text" name="malfunctionSigns" placeholder="Describe any malfunctions or errors" onChange={handleChange}/>
            </div>
          </div>

          {/* Authentication Mechanisms */}
          <h2>Authentication Mechanisms:</h2>
          <div className="form-section">
            <label>What authentication mechanisms are used within the Access Control Systems (e.g., RFID cards, PIN codes, biometric scanners)?</label>
            <div>
              <input type="text" name="authMechanisms" placeholder="Enter the authentication mechanisms" onChange={handleChange}/>
            </div>
          </div>

          <div className="form-section">
            <label>Are these mechanisms reliable and secure for verifying individuals' identities?</label>
            <div>
              <input type="radio" name="mechanismsReliable" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="mechanismsReliable" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="mechanismsReliableComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Is multi-factor authentication implemented to enhance security (e.g., combining a PIN code with a biometric scan)?</label>
            <div>
              <input type="radio" name="multiFactor" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="multiFactor" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="multiFactorComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          {/* Authorization and Access Rights */}
          <h2>Authorization and Access Rights:</h2>
          <div className="form-section">
            <label>How are access rights assigned and managed within the Access Control Systems?</label>
            <div>
              <input type="text" name="accessRights" placeholder="Describe how access rights are managed" onChange={handleChange}/>
            </div>
          </div>

          <div className="form-section">
            <label>Is there a defined process for granting, modifying, or revoking access permissions based on individuals' roles and responsibilities?</label>
            <div>
              <input type="radio" name="processDefined" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="processDefined" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="processDefinedComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Are access rights regularly reviewed and updated to align with organizational changes and security requirements?</label>
            <div>
              <input type="radio" name="accessReviewed" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="accessReviewed" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="accessReviewedComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          {/* Integration with Other Systems */}
          <h2>Integration with Other Systems:</h2>
          <div className="form-section">
            <label>Are the Access Control Systems integrated with other security systems, such as surveillance cameras, intrusion detection, or alarm systems?</label>
            <div>
              <input type="radio" name="systemsIntegrated" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="systemsIntegrated" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="systemsIntegratedComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>How does the integration enhance overall security and situational awareness within the facility?</label>
            <div>
              <input type="text" name="integrationEnhance" placeholder="Describe the integration" onChange={handleChange}/>
            </div>
          </div>

          <div className="form-section">
            <label>Are there any compatibility issues or gaps in integration that need to be addressed?</label>
            <div>
              <input type="text" name="integrationIssues" placeholder="Describe any compatibility issues" onChange={handleChange}/>
            </div>
          </div>

          {/* Monitoring and Logging */}
          <h2>Monitoring and Logging:</h2>
          <div className="form-section">
            <label>Is there a centralized monitoring system in place to oversee access control events and activities?</label>
            <div>
              <input type="radio" name="monitoringSystem" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="monitoringSystem" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="monitoringSystemComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Are access logs generated and maintained to track user activity, including successful and failed access attempts?</label>
            <div>
              <input type="radio" name="accessLogs" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="accessLogs" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="accessLogsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Is there a process for reviewing access logs and investigating any suspicious or unauthorized access incidents?</label>
            <div>
              <input type="radio" name="logsReview" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="logsReview" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="logsReviewComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          {/* Compliance with Regulations */}
          <h2>Compliance with Regulations:</h2>
          <div className="form-section">
            <label>Do the Access Control Systems comply with relevant regulations, standards, and industry best practices (e.g., GDPR, HIPAA, ISO 27001)?</label>
            <div>
              <input type="radio" name="complianceRegs" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="complianceRegs" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="complianceRegsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Have the systems undergone any audits or assessments to verify compliance with applicable standards?</label>
            <div>
              <input type="radio" name="audits" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="audits" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="auditsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          {/* Maintenance and Upkeep */}
          <h2>Maintenance and Upkeep:</h2>
          <div className="form-section">
            <label>Is there a regular maintenance schedule in place for the Access Control Systems?</label>
            <div>
              <input type="radio" name="maintenanceSchedule" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="maintenanceSchedule" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="maintenanceScheduleComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Are maintenance tasks, such as software updates, hardware inspections, and database backups, performed according to schedule?</label>
            <div>
              <input type="radio" name="maintenanceTasks" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="maintenanceTasks" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="maintenanceTasksComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Are there records documenting maintenance activities, repairs, and any issues identified during inspections?</label>
            <div>
              <input type="radio" name="maintenanceRecords" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="maintenanceRecords" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="maintenanceRecordsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          {/* User Training and Awareness */}
          <h2>User Training and Awareness:</h2>
          <div className="form-section">
            <label>Have users, such as security personnel, system administrators, and end-users, received training on how to use the Access Control Systems effectively?</label>
            <div>
              <input type="radio" name="userTraining" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="userTraining" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="userTrainingComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Are there instructions or guidelines available to users regarding proper access control procedures, password management, and security awareness?</label>
            <div>
              <input type="radio" name="instructionsGuidelines" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="instructionsGuidelines" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="instructionsGuidelinesComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Is there a process for reporting system errors, suspicious activities, or security incidents related to the Access Control Systems?</label>
            <div>
              <input type="radio" name="reportingProcess" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="reportingProcess" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="reportingProcessComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}

export default AccessControlSystemsPage;
