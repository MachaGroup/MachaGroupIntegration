import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';

function FenceSensorsPage() {
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
      const formsRef = collection(db, 'forms/Physical Security/Fence Sensors');
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
        {/* Back Button */}
        <button className="back-button" onClick={handleBack}>←</button> {/* Back button at the top */}
        <h1>Fence Sensors Assessment</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          {/* Sensor Placement and Coverage */}
          <h2>Sensor Placement and Coverage:</h2>
          <div className="form-section">
            <label>Are the fence sensors strategically placed along the perimeter to detect tampering or unauthorized access attempts?</label>
            <div>
              <input type="radio" name="strategicPlacement" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="strategicPlacement" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Do they cover the entire perimeter, including all fence lines and potential entry points?</label>
            <div>
              <input type="radio" name="fullCoverage" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="fullCoverage" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there any areas along the fence line where sensor coverage is insufficient?</label>
            <div>
              <input type="text" name="insufficientCoverage" placeholder="Describe areas of insufficient coverage" onChange={handleChange}/>
            </div>
          </div>

          {/* Detection Sensitivity */}
          <h2>Detection Sensitivity:</h2>
          <div className="form-section">
            <label>Are the fence sensors set to an appropriate sensitivity level to detect tampering, such as cutting, climbing, or lifting of the fence?</label>
            <div>
              <input type="radio" name="sensitivityLevel" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="sensitivityLevel" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Have adjustments been made to minimize false alarms caused by environmental factors such as wind, vegetation, or wildlife?</label>
            <div>
              <input type="radio" name="falseAlarmAdjustments" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="falseAlarmAdjustments" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Response Time and Alarm Triggering */}
          <h2>Response Time and Alarm Triggering:</h2>
          <div className="form-section">
            <label>Do the fence sensors respond quickly to detected tampering and trigger alarms promptly?</label>
            <div>
              <input type="radio" name="quickResponse" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="quickResponse" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there a mechanism in place to differentiate between normal activities (e.g., wind-induced movements) and suspicious behaviors to minimize false alarms?</label>
            <div>
              <input type="radio" name="differentiationMechanism" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="differentiationMechanism" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are alarms transmitted to monitoring stations or security personnel in real-time for immediate response?</label>
            <div>
              <input type="radio" name="realTimeTransmission" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="realTimeTransmission" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Integration with Alarm Systems */}
          <h2>Integration with Alarm Systems:</h2>
          <div className="form-section">
            <label>Are the fence sensors integrated with the overall perimeter alarm system?</label>
            <div>
              <input type="radio" name="integratedAlarmSystem" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="integratedAlarmSystem" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Do they communicate seamlessly with alarm control panels and monitoring stations?</label>
            <div>
              <input type="radio" name="seamlessCommunication" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="seamlessCommunication" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there coordination between fence sensor activations and other alarm devices such as sirens, strobe lights, or notification systems?</label>
            <div>
              <input type="radio" name="coordinationWithOtherDevices" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="coordinationWithOtherDevices" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Remote Monitoring and Management */}
          <h2>Remote Monitoring and Management:</h2>
          <div className="form-section">
            <label>Is there remote access and monitoring functionality for the fence sensors?</label>
            <div>
              <input type="radio" name="remoteMonitoring" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="remoteMonitoring" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Can security personnel view sensor status, receive alerts, and adjust settings remotely as needed?</label>
            <div>
              <input type="radio" name="remoteAdjustments" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="remoteAdjustments" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there secure authentication and encryption protocols in place to prevent unauthorized access to sensor controls?</label>
            <div>
              <input type="radio" name="secureProtocols" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="secureProtocols" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Durability and Reliability */}
          <h2>Durability and Reliability:</h2>
          <div className="form-section">
            <label>Are the fence sensors designed to withstand outdoor environmental factors such as temperature variations, moisture, and physical impact?</label>
            <div>
              <input type="radio" name="durableDesign" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="durableDesign" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are they constructed from durable materials capable of withstanding exposure to the elements and potential tampering attempts?</label>
            <div>
              <input type="radio" name="durableMaterials" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="durableMaterials" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Have the sensors undergone testing or certification to verify reliability and durability?</label>
            <div>
              <input type="radio" name="testingCertification" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="testingCertification" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Maintenance and Upkeep */}
          <h2>Maintenance and Upkeep:</h2>
          <div className="form-section">
            <label>Is there a regular maintenance schedule in place for the fence sensors?</label>
            <div>
              <input type="radio" name="maintenanceSchedule" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="maintenanceSchedule" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are maintenance tasks, such as testing sensor functionality, replacing batteries, and inspecting sensor connections, performed according to schedule?</label>
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

          {/* Submit Button */}
          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}

export default FenceSensorsPage;
