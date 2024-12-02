import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';  // Ensure this is linked to your universal CSS
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar"; // Import the Navbar

function BiometricScannersPage() {
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
      const formsRef = collection(db, 'forms/Physical Security/Biometric Scanners')
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

  // Function to handle back button
  const handleBack = () => {
    navigate(-1);  // Navigates to the previous page
  };

  return (
    <div className="form-page">
      <header className="header">
        <Navbar />
        {/* Back Button */}
        <button className="back-button" onClick={handleBack}>←</button> {/* Back button at the top */}
        <h1>1.1.1.2.2. Biometric Scanners Assessment</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          {/* Functionality and Operation */}
          <h2>Functionality and Operation:</h2>
          <div className="form-section">
            <label>Are the biometric scanners operational and functioning as intended?</label>
            <div>
              <input type="radio" name="biometricScannersOpertaional" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="biometricScannersOpertaional" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Do the scanners accurately capture and authenticate biometric data (e.g., fingerprints)?</label>
            <div>
              <input type="radio" name="biometricCapture" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="biometricCapture" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there any signs of malfunction or errors in scanner operations?</label>
            <div>
              <input type="radio" name="malfunction" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="malfunction" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there backup systems in place in case of power outages or malfunctions?</label>
            <div>
              <input type="radio" name="backupSystems" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="backupSystems" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Access Control */}
          <h2>Access Control:</h2>
          <div className="form-section">
            <label>How is access to the secondary entrances controlled using biometric scanners?</label>
            <input type="text" name="accessControlMethods" placeholder="Describe the access control methods" onChange={handleChange}/>
          </div>

          <div className="form-section">
            <label>Are individuals required to enroll their biometric data (e.g., fingerprints) for access?</label>
            <div>
              <input type="radio" name="biometricEnrollment" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="biometricEnrollment" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Is access restricted to individuals whose biometric data matches stored records?</label>
            <div>
              <input type="radio" name="restrictedAccess" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="restrictedAccess" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there a process in place to update or remove biometric records as needed (e.g., for personnel changes)?</label>
            <div>
              <input type="radio" name="updateRecords" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="updateRecords" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Integration with Access Control Systems */}
          <h2>Integration with Access Control Systems:</h2>
          <div className="form-section">
            <label>Are the biometric scanners integrated with the overall access control system?</label>
            <div>
              <input type="radio" name="integration" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="integration" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Do they communicate seamlessly with access control software and databases?</label>
            <div>
              <input type="radio" name="communication" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="communication" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there real-time monitoring and logging of access events captured by the biometric scanners?</label>
            <div>
              <input type="radio" name="monitoring" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="monitoring" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are access rights managed centrally and synchronized with the biometric system?</label>
            <div>
              <input type="radio" name="centralManagement" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="centralManagement" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Security Features */}
          <h2>Security Features:</h2>
          <div className="form-section">
            <label>Are the biometric scanners equipped with security features to prevent tampering or spoofing?</label>
            <div>
              <input type="radio" name="securityFeatures" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="securityFeatures" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Do they employ anti-spoofing measures to detect fraudulent attempts to bypass authentication?</label>
            <div>
              <input type="radio" name="antiSpoofing" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="antiSpoofing" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there physical security measures in place to prevent unauthorized access to the biometric scanner components?</label>
            <div>
              <input type="radio" name="physicalSecurity" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="physicalSecurity" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Compliance with Regulations */}
          <h2>Compliance with Regulations:</h2>
          <div className="form-section">
            <label>Do the biometric scanners comply with relevant regulations, standards, and industry best practices?</label>
            <div>
              <input type="radio" name="compliance" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="compliance" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there any specific requirements or guidelines for biometric systems outlined by regulatory authorities or industry associations?</label>
            <input type="text" name="regulatoryRequirements" placeholder="Enter any regulatory requirements" onChange={handleChange}/>
          </div>

          <div className="form-section">
            <label>Have the biometric scanners undergone testing or certification to verify compliance with applicable standards?</label>
            <div>
              <input type="radio" name="testingCertification" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="testingCertification" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Maintenance and Upkeep */}
          <h2>Maintenance and Upkeep:</h2>
          <div className="form-section">
            <label>Is there a regular maintenance schedule in place for the biometric scanners?</label>
            <div>
              <input type="radio" name="maintenanceSchedule" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="maintenanceSchedule" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are maintenance tasks, such as cleaning, calibration, and firmware updates, performed according to schedule?</label>
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
            <label>Have users, such as security personnel, staff, and authorized individuals, received training on how to use the biometric scanners properly?</label>
            <div>
              <input type="radio" name="userTraining" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="userTraining" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there instructions or guidelines available to users regarding proper biometric data enrollment and access procedures?</label>
            <div>
              <input type="radio" name="instructions" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="instructions" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there a process for reporting malfunctions, damage, or security incidents related to the biometric scanners?</label>
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

export default BiometricScannersPage;
