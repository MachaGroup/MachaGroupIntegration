import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';

function DoorAlarmsPage() {
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
      const formsRef = collection(db, 'forms/Physical Security/Door Alarms');
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
        <h1>Door Alarms Assessment</h1>
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          {/* Placement and Coverage */}
          <h2>Placement and Coverage:</h2>
          <div className="form-section">
            <label>Are the door alarms installed on all entry points, including doors leading to restricted areas?</label>
            <div>
              <input type="radio" name="entryPointCoverage" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="entryPointCoverage" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Do they cover all exterior doors, internal doors, and other access points?</label>
            <div>
              <input type="radio" name="doorCoverage" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="doorCoverage" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there any doors or entry points without alarm coverage?</label>
            <div>
              <input type="text" name="uncoveredPoints" placeholder="Describe any uncovered doors or points" onChange={handleChange}/>
            </div>
          </div>

          {/* Sensor Type and Activation */}
          <h2>Sensor Type and Activation:</h2>
          <div className="form-section">
            <label>What type of sensors are used for door alarms (e.g., magnetic reed switches, contact sensors)?</label>
            <div>
              <input type="text" name="sensorType" placeholder="Enter sensor type" onChange={handleChange}/>
            </div>
          </div>

          <div className="form-section">
            <label>Are the sensors activated when the door is opened, closed, or both?</label>
            <div>
              <input type="radio" name="sensorActivation" value="opened" onChange={handleChange}/> Opened
              <input type="radio" name="sensorActivation" value="closed" onChange={handleChange}/> Closed
              <input type="radio" name="sensorActivation" value="both" onChange={handleChange}/> Both
            </div>
          </div>

          <div className="form-section">
            <label>Is there a delay mechanism in place to allow authorized personnel to disarm the alarm before it triggers?</label>
            <div>
              <input type="radio" name="delayMechanism" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="delayMechanism" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Response Time and Alarm Triggering */}
          <h2>Response Time and Alarm Triggering:</h2>
          <div className="form-section">
            <label>Do the door alarms respond quickly when triggered by unauthorized entry attempts?</label>
            <div>
              <input type="radio" name="responseTime" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="responseTime" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there a loud audible alarm or visual indication (e.g., flashing lights) to alert occupants and deter intruders?</label>
            <div>
              <input type="radio" name="alarmIndication" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="alarmIndication" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are alarms transmitted to monitoring stations or security personnel in real-time for immediate response?</label>
            <div>
              <input type="radio" name="alarmTransmission" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="alarmTransmission" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Integration with Alarm Systems */}
          <h2>Integration with Alarm Systems:</h2>
          <div className="form-section">
            <label>Are the door alarms integrated with the overall intrusion alarm system?</label>
            <div>
              <input type="radio" name="systemIntegration" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="systemIntegration" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Do they communicate seamlessly with alarm control panels and monitoring stations?</label>
            <div>
              <input type="radio" name="alarmCommunication" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="alarmCommunication" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there coordination between door alarm activations and other alarm devices such as sirens, strobe lights, or notification systems?</label>
            <div>
              <input type="radio" name="alarmCoordination" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="alarmCoordination" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Remote Monitoring and Management */}
          <h2>Remote Monitoring and Management:</h2>
          <div className="form-section">
            <label>Is there remote access and monitoring functionality for the door alarms?</label>
            <div>
              <input type="radio" name="remoteMonitoring" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="remoteMonitoring" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Can security personnel view alarm status, receive alerts, and acknowledge alarms remotely as needed?</label>
            <div>
              <input type="radio" name="remoteAcknowledge" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="remoteAcknowledge" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there secure authentication and encryption protocols in place to prevent unauthorized access to alarm controls?</label>
            <div>
              <input type="radio" name="secureProtocols" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="secureProtocols" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Durability and Reliability */}
          <h2>Durability and Reliability:</h2>
          <div className="form-section">
            <label>Are the door alarms designed to withstand frequent use and potential tampering attempts?</label>
            <div>
              <input type="radio" name="tamperProof" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="tamperProof" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are they constructed from durable materials capable of withstanding indoor and outdoor conditions?</label>
            <div>
              <input type="radio" name="durableMaterials" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="durableMaterials" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Have the alarms undergone testing or certification to verify reliability and durability?</label>
            <div>
              <input type="radio" name="alarmTesting" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="alarmTesting" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Maintenance and Upkeep */}
          <h2>Maintenance and Upkeep:</h2>
          <div className="form-section">
            <label>Is there a regular maintenance schedule in place for the door alarms?</label>
            <div>
              <input type="radio" name="maintenanceSchedule" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="maintenanceSchedule" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are maintenance tasks, such as testing alarm functionality, replacing batteries, and inspecting sensor connections, performed according to schedule?</label>
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

export default DoorAlarmsPage;
