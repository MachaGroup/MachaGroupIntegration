import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar"; // Import the Navbar

function VisitorCheckInPage() {
  const navigate = useNavigate();  // Initialize useNavigate hook for navigation
  const { buildingId } = useBuilding(); // Access buildingId from context
  const db = getFirestore();

  const [formData, setFormData] = useState();

  useEffect(() => {
      if (!buildingId) {
          alert('No building selected. Redirecting to Building Info...');
          navigate('/BuildingandAddress');
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
      // Create a document reference to the building in the 'Buildings' collection
      const buildingRef = doc(db, 'Buildings', buildingId); 

      // Store the form data in the specified Firestore structure
      const formsRef = collection(db, 'forms/Physical Security/Visitor Check-In');
      await addDoc(formsRef, {
          building: buildingRef, // Reference to the building document
          formData: formData, // Store the form data as a nested object
      });

      console.log('Form data submitted successfully!');
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
        {/* Back Button */}
        <button className="back-button" onClick={handleBack}>←</button> {/* Back button at the top */}
        <h1>Visitor Check-in Assessment</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          {/* Identification Verification */}
          <h2>Identification Verification:</h2>
          <div className="form-section">
            <label>Are visitors required to present valid identification upon check-in?</label>
            <div>
              <input type="radio" name="validId" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="validId" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Do staff members verify the authenticity of the identification presented by visitors?</label>
            <div>
              <input type="radio" name="verifyAuthenticity" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="verifyAuthenticity" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there a process in place to ensure that the identification matches the information provided during pre-registration or scheduling?</label>
            <div>
              <input type="radio" name="idMatchProcess" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="idMatchProcess" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Registration Process */}
          <h2>Registration Process:</h2>
          <div className="form-section">
            <label>Is there a standardized process for registering visitors upon check-in?</label>
            <div>
              <input type="radio" name="standardRegistration" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="standardRegistration" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are visitors required to provide relevant information such as name, affiliation, purpose of visit, and contact details?</label>
            <div>
              <input type="radio" name="provideInfo" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="provideInfo" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Is visitor information recorded accurately and legibly for future reference and tracking?</label>
            <div>
              <input type="radio" name="recordInfo" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="recordInfo" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Access Authorization */}
          <h2>Access Authorization:</h2>
          <div className="form-section">
            <label>Are visitors granted access to the premises only after successful check-in and verification of identification?</label>
            <div>
              <input type="radio" name="accessGranted" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="accessGranted" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Is access authorization based on predetermined criteria such as scheduled appointments, visitor type, or security clearance levels?</label>
            <div>
              <input type="radio" name="predeterminedCriteria" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="predeterminedCriteria" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are visitor access privileges clearly communicated to security personnel and other relevant staff members?</label>
            <div>
              <input type="radio" name="accessPrivileges" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="accessPrivileges" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Visitor Badges or Passes */}
          <h2>Visitor Badges or Passes:</h2>
          <div className="form-section">
            <label>Are visitors issued with temporary badges or passes upon check-in?</label>
            <div>
              <input type="radio" name="issuedBadges" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="issuedBadges" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Do badges or passes prominently display relevant information such as visitor name, date of visit, and authorized areas or restrictions?</label>
            <div>
              <input type="radio" name="badgeInfo" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="badgeInfo" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there protocols in place for reclaiming badges or passes upon visitor departure to prevent unauthorized access?</label>
            <div>
              <input type="radio" name="reclaimBadges" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="reclaimBadges" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Confidentiality and Data Protection */}
          <h2>Confidentiality and Data Protection:</h2>
          <div className="form-section">
            <label>Is visitor information handled and stored securely to maintain confidentiality and protect sensitive data?</label>
            <div>
              <input type="radio" name="dataProtection" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="dataProtection" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are staff members trained to handle visitor information in compliance with data protection regulations and organizational policies?</label>
            <div>
              <input type="radio" name="staffTraining" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="staffTraining" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there a process for securely disposing of visitor records or data once they are no longer needed?</label>
            <div>
              <input type="radio" name="disposeRecords" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="disposeRecords" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Customer Service and Assistance */}
          <h2>Customer Service and Assistance:</h2>
          <div className="form-section">
            <label>Are staff members trained to provide assistance and guidance to visitors during the check-in process?</label>
            <div>
              <input type="radio" name="staffAssistance" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="staffAssistance" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Do they greet visitors in a friendly and professional manner, making them feel welcome and valued?</label>
            <div>
              <input type="radio" name="visitorGreeting" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="visitorGreeting" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are staff members responsive to visitor inquiries and requests for assistance, providing accurate information and support as needed?</label>
            <div>
              <input type="radio" name="inquiriesResponse" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="inquiriesResponse" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Emergency Response Preparedness */}
          <h2>Emergency Response Preparedness:</h2>
          <div className="form-section">
            <label>Are staff members trained to respond appropriately to security incidents, medical emergencies, or other crises that may occur during the check-in process?</label>
            <div>
              <input type="radio" name="emergencyResponse" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="emergencyResponse" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Do they know emergency procedures, evacuation routes, and protocols for contacting emergency services?</label>
            <div>
              <input type="radio" name="emergencyProcedures" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="emergencyProcedures" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there a system in place to alert security personnel or initiate emergency response procedures if necessary?</label>
            <div>
              <input type="radio" name="alertSystem" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="alertSystem" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}

export default VisitorCheckInPage;
