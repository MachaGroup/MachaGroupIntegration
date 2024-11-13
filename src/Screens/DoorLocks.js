import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';

function DoorLocksPage() {
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
      const formsRef = collection(db, 'forms/Physical Security/Door Locks');
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
        <h1>Door Locks (e.g., electronic locks) Assessment</h1>
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          {/* Functionality and Reliability */}
          <h2>Functionality and Reliability:</h2>
          <div className="form-section">
            <label>Are the electronic door locks operational and functioning as intended?</label>
            <div>
              <input type="radio" name="operational" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="operational" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Do the locks reliably secure doors to prevent unauthorized access?</label>
            <div>
              <input type="radio" name="secureLocks" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="secureLocks" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there any signs of malfunction or errors in the locking mechanisms?</label>
            <div>
              <input type="radio" name="malfunction" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="malfunction" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are backup systems in place in case of power outages or malfunctions?</label>
            <div>
              <input type="radio" name="backupSystems" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="backupSystems" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Authentication Methods */}
          <h2>Authentication Methods:</h2>
          <div className="form-section">
            <label>What authentication methods are used with the electronic door locks (e.g., RFID cards, key codes, biometric scans)?</label>
            <div>
              <input type="text" name="authenticationMethods" placeholder="Enter authentication methods" onChange={handleChange}/>
            </div>
          </div>

          <div className="form-section">
            <label>Are these authentication methods secure and resistant to unauthorized duplication or bypass?</label>
            <div>
              <input type="radio" name="authSecure" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="authSecure" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Is multi-factor authentication implemented to enhance security (e.g., combining a PIN code with a biometric scan)?</label>
            <div>
              <input type="radio" name="MFA" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="MFA" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Access Control */}
          <h2>Access Control:</h2>
          <div className="form-section">
            <label>How are access rights managed and enforced through the electronic door locks?</label>
            <div>
              <input type="text" name="accessRightsManagement" placeholder="Describe access rights management" onChange={handleChange}/>
            </div>
          </div>

          <div className="form-section">
            <label>Is access restricted to individuals with valid credentials or authorization?</label>
            <div>
              <input type="radio" name="validCredentials" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="validCredentials" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there a process for granting, modifying, or revoking access permissions as needed?</label>
            <div>
              <input type="radio" name="accessPermissions" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="accessPermissions" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Integration with Security Systems */}
          <h2>Integration with Security Systems:</h2>
          <div className="form-section">
            <label>Are the electronic door locks integrated with other security systems, such as access control software, surveillance cameras, or alarm systems?</label>
            <div>
              <input type="radio" name="integrationSecuritySystems" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="integrationSecuritySystems" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Do they communicate seamlessly with these systems to provide real-time monitoring and response to security events?</label>
            <div>
              <input type="radio" name="realTimeMonitoring" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="realTimeMonitoring" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are access events logged and recorded for audit and analysis purposes?</label>
            <div>
              <input type="radio" name="accessEventsLogging" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="accessEventsLogging" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Durability and Resistance to Tampering */}
          <h2>Durability and Resistance to Tampering:</h2>
          <div className="form-section">
            <label>Are the electronic door locks made from durable materials and designed to withstand tampering or forced entry attempts?</label>
            <div>
              <input type="radio" name="durability" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="durability" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there anti-tamper features or sensors to detect and respond to unauthorized manipulation?</label>
            <div>
              <input type="radio" name="antiTamper" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="antiTamper" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are the locks resistant to environmental factors such as moisture, temperature extremes, or physical wear?</label>
            <div>
              <input type="radio" name="environmentalResistance" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="environmentalResistance" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Maintenance and Upkeep */}
          <h2>Maintenance and Upkeep:</h2>
          <div className="form-section">
            <label>Is there a regular maintenance schedule in place for the electronic door locks?</label>
            <div>
              <input type="radio" name="maintenanceSchedule" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="maintenanceSchedule" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are maintenance tasks, such as battery replacement, software updates, and inspection of locking mechanisms, performed according to schedule?</label>
            <div>
              <input type="radio" name="maintenanceTasks" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="maintenanceTasks" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there records documenting maintenance activities, repairs, and any issues identified during inspections?</label>
            <div>
              <input type="radio" name="maintenanceRecords" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="maintenanceRecords" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* User Training and Awareness */}
          <h2>User Training and Awareness:</h2>
          <div className="form-section">
            <label>Have users, such as security personnel, staff, and authorized individuals, received training on how to use the electronic door locks properly?</label>
            <div>
              <input type="radio" name="userTraining" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="userTraining" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there instructions or guidelines available to users regarding proper door access procedures and security protocols?</label>
            <div>
              <input type="radio" name="userInstructions" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="userInstructions" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there a process for reporting malfunctions, damage, or security incidents related to the electronic door locks?</label>
            <div>
              <input type="radio" name="reportingProcess" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="reportingProcess" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}

export default DoorLocksPage;
