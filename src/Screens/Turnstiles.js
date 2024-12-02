import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';  // Ensure this is linked to your universal CSS
import logo from '../assets/MachaLogo.png';

function TurnstilesPage() {
  const navigate = useNavigate();  // Initialize useNavigate hook for navigation
  const { buildingId } = useBuilding();
  const db = getFirestore();

  const [formData, setFormData] = useState();

  useEffect(() => {
    if (!buildingId) {
      alert('No building selected. Redirecting to Building Info...')
      navigate('BuildingandAddress')
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

    if (!buildingId) {
      alert('Building ID is missing. Please start the assessment from the correct page.');
      return;
    }
    try {
      // Create a document refrence to the building in the "Buildings" collection
      const buildingRef = doc(db, 'Buildings', buildingId);

      const formsRef = collection(db, 'forms/Physical Security/Turnstiles');
      await addDoc(formsRef, {
        building: buildingRef, // Reference to the building document
        formData: formData, // Store the form data as a nested object
      });
      console.log('Form data submitted successfully!');
      alert('Form submitted successfully!');
      navigate('/Form')
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submite the form. Please try again.')
    }
  };

  return (
    <div className="form-page">
      <header className="header">
        {/* Back Button */}
      <button className="back-button" onClick={handleBack}>←</button> {/* Back button at the top */}
        <h1>Turnstiles Assessment</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          {/* 1.1.1.1.2.1 Functionality and Operation */}
          <h2>1.1.1.1.2.1 Functionality and Operation:</h2>
          <div className="form-section">
            <label>Are the turnstiles operational and functioning as intended?</label>
            <div>
              <input type="radio" name="turnstilesOperational" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="turnstilesOperational" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Do the turnstiles rotate smoothly without any mechanical issues?</label>
            <div>
              <input type="radio" name="turnstilesSmooth" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="turnstilesSmooth" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there any signs of wear or damage that could affect the turnstiles' functionality?</label>
            <div>
              <input type="text" name="turnstilesDamage" placeholder="Describe any wear or damage" onChange={handleChange}/>
            </div>
          </div>

          <div className="form-section">
            <label>Are there backup systems in place in case of power outages or malfunctions?</label>
            <div>
              <input type="radio" name="backupSystemsTurnstiles" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="backupSystemsTurnstiles" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* 1.1.1.1.2.2 Access Control */}
          <h2>1.1.1.1.2.2 Access Control:</h2>
          <div className="form-section">
            <label>How is access to the turnstiles controlled?</label>
            <div>
              <input type="text" name="accessControlTurnstiles" placeholder="Enter access control methods" onChange={handleChange}/>
            </div>
          </div>

          <div className="form-section">
            <label>Are there authentication mechanisms, such as RFID card readers, barcode scanners, or biometric systems, to restrict entry?</label>
            <div>
              <input type="radio" name="authMechanismsTurnstiles" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="authMechanismsTurnstiles" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are access control systems integrated with other security measures, such as surveillance cameras or alarm systems?</label>
            <div>
              <input type="radio" name="integratedSystemsTurnstiles" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="integratedSystemsTurnstiles" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there a log of entries and exits through the turnstiles for monitoring and auditing purposes?</label>
            <div>
              <input type="radio" name="logEntriesTurnstiles" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="logEntriesTurnstiles" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* 1.1.1.1.2.3 Safety Features */}
          <h2>1.1.1.1.2.3 Safety Features:</h2>
          <div className="form-section">
            <label>Are there safety features in place to prevent accidents or injuries, such as sensors to detect obstructions or emergency stop buttons?</label>
            <div>
              <input type="radio" name="safetyFeaturesTurnstiles" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="safetyFeaturesTurnstiles" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are the turnstiles equipped with anti-tailgating features to prevent unauthorized entry by multiple individuals?</label>
            <div>
              <input type="radio" name="antiTailgating" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="antiTailgating" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there clear instructions or signage to inform users about safety procedures and precautions when using the turnstiles?</label>
            <div>
              <input type="radio" name="safetySignageTurnstiles" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="safetySignageTurnstiles" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* 1.1.1.1.2.4 Compliance with Regulations */}
          <h2>1.1.1.1.2.4 Compliance with Regulations:</h2>
          <div className="form-section">
            <label>Do the turnstiles comply with relevant safety and security regulations, codes, and standards?</label>
            <div>
              <input type="radio" name="complianceRegulationsTurnstiles" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="complianceRegulationsTurnstiles" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there any specific requirements or guidelines for turnstiles outlined by regulatory authorities or industry associations that need to be met?</label>
            <div>
              <input type="text" name="regulatoryRequirementsTurnstiles" placeholder="Enter regulatory requirements" onChange={handleChange}/>
            </div>
          </div>

          <div className="form-section">
            <label>Have the turnstiles undergone any inspections or certifications to verify compliance with applicable standards?</label>
            <div>
              <input type="radio" name="inspectionsCertificationsTurnstiles" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="inspectionsCertificationsTurnstiles" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* 1.1.1.1.2.5 Maintenance and Upkeep */}
          <h2>1.1.1.1.2.5 Maintenance and Upkeep:</h2>
          <div className="form-section">
            <label>Is there a regular maintenance schedule in place for the turnstiles?</label>
            <div>
              <input type="radio" name="maintenanceScheduleTurnstiles" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="maintenanceScheduleTurnstiles" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are maintenance tasks, such as lubrication, inspection of components, and testing of safety features, performed according to schedule?</label>
            <div>
              <input type="radio" name="maintenanceTasksTurnstiles" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="maintenanceTasksTurnstiles" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there records documenting maintenance activities, repairs, and any issues identified during inspections?</label>
            <div>
              <input type="radio" name="maintenanceRecordsTurnstiles" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="maintenanceRecordsTurnstiles" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* 1.1.1.1.2.6 User Training and Awareness */}
          <h2>1.1.1.1.2.6 User Training and Awareness:</h2>
          <div className="form-section">
            <label>Have users, such as security personnel, staff, and visitors, received training on how to use the turnstiles safely and effectively?</label>
            <div>
              <input type="radio" name="userTrainingTurnstiles" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="userTrainingTurnstiles" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there instructions or guidelines available to users regarding proper turnstile usage and emergency procedures?</label>
            <div>
              <input type="radio" name="instructionsGuidelinesTurnstiles" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="instructionsGuidelinesTurnstiles" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there a process for reporting malfunctions, damage, or security incidents related to the turnstiles?</label>
            <div>
              <input type="radio" name="reportingProcessTurnstiles" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="reportingProcessTurnstiles" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}

export default TurnstilesPage;
