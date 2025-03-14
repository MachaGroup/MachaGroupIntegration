import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function AccessControlKeypadsPage() {
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
      // Create a document reference to the building in the 'Buildings' collection.
      const buildingRef = doc(db, 'Buildings', buildingId);

      // Store the form data in the specified Firestore structure
      const formsRef = collection(db, 'forms/Physical Security/Access Control Keypads');
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
        <h1>Access Control Keypads Assessment</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          {/* Functionality and Reliability */}
          <h2>Functionality and Reliability:</h2>
          <div className="form-section">
            <label>Are the access control keypads operational and functioning as intended?</label>
            <div>
              <input type="radio" name="operational" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="operational" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Do the keypads reliably authenticate users and grant access to restricted areas?</label>
            <div>
              <input type="radio" name="reliablyAuthenticate" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="reliablyAuthenticate" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there any signs of malfunction or errors in the keypad operation?</label>
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

          {/* Security of Access Codes */}
          <h2>Security of Access Codes:</h2>
          <div className="form-section">
            <label>Are access codes used with the keypads sufficiently secure and resistant to unauthorized access or guessing?</label>
            <div>
              <input type="radio" name="secureCodes" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="secureCodes" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are users instructed not to share their access codes and to keep them confidential?</label>
            <div>
              <input type="radio" name="instructions" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="instructions" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there a process for periodically changing access codes to enhance security?</label>
            <div>
              <input type="radio" name="changeCodes" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="changeCodes" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Integration with Access Control Systems */}
          <h2>Integration with Access Control Systems:</h2>
          <div className="form-section">
            <label>Are the access control keypads integrated with the overall access control system?</label>
            <div>
              <input type="radio" name="integrated" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="integrated" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Do they communicate seamlessly with access control software and databases?</label>
            <div>
              <input type="radio" name="communicateSeamlessly" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="communicateSeamlessly" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there real-time monitoring and logging of access events captured by the keypads?</label>
            <div>
              <input type="radio" name="realTimeMonitoring" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="realTimeMonitoring" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are access rights managed centrally and synchronized with the keypad system?</label>
            <div>
              <input type="radio" name="accessRightsManaged" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="accessRightsManaged" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Durability and Resistance to Tampering */}
          <h2>Durability and Resistance to Tampering:</h2>
          <div className="form-section">
            <label>Are the access control keypads made from durable materials capable of withstanding physical force or tampering attempts?</label>
            <div>
              <input type="radio" name="durableMaterials" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="durableMaterials" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there additional security features, such as tamper alarms or anti-tamper enclosures, to deter unauthorized access or vandalism?</label>
            <div>
              <input type="radio" name="tamperAlarms" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="tamperAlarms" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Have the keypads been tested for reliability and resistance to environmental factors such as moisture, temperature extremes, or physical wear?</label>
            <div>
              <input type="radio" name="testedReliability" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="testedReliability" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Accessibility and Ease of Use */}
          <h2>Accessibility and Ease of Use:</h2>
          <div className="form-section">
            <label>Are the access control keypads easily accessible and operable for authorized users?</label>
            <div>
              <input type="radio" name="accessible" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="accessible" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Do they provide clear instructions for entering access codes and accessing restricted areas?</label>
            <div>
              <input type="radio" name="clearInstructions" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="clearInstructions" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there any accessibility features or considerations for individuals with disabilities?</label>
            <div>
              <input type="radio" name="disabilityAccessibility" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="disabilityAccessibility" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Maintenance and Upkeep */}
          <h2>Maintenance and Upkeep:</h2>
          <div className="form-section">
            <label>Is there a regular maintenance schedule in place for the access control keypads?</label>
            <div>
              <input type="radio" name="maintenanceSchedule" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="maintenanceSchedule" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are maintenance tasks, such as cleaning, inspection of keypads and wiring, and replacement of worn-out components, performed according to schedule?</label>
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
            <label>Have users, such as security personnel and authorized individuals, received training on how to use the access control keypads properly?</label>
            <div>
              <input type="radio" name="userTraining" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="userTraining" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there instructions or guidelines available to users regarding proper access code usage and security protocols?</label>
            <div>
              <input type="radio" name="instructionsAvailable" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="instructionsAvailable" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there a process for reporting malfunctions, damage, or security incidents related to the access control keypads?</label>
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

export default AccessControlKeypadsPage;
