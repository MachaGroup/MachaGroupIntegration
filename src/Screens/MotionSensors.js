import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function MotionSensorsPage() {
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
  const handleBack = async () => {
    if (formData && buildingId) { // Check if formData and buildingId exist
      try {
        const buildingRef = doc(db, 'Buildings', buildingId);
        const formsRef = collection(db, 'forms/Physical Security/Motion Sensors');
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

    if (!buildingId) {
        alert('Building ID is missing. Please start the assessment from the correct page.');
        return;
    }

    try {
      // Create a document reference to the building in the 'Buildings' collection
      const buildingRef = doc(db, 'Buildings', buildingId); 

      // Store the form data in the specified Firestore structure
      const formsRef = collection(db, 'forms/Physical Security/Motion Sensors');
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
        <h1>Motion Sensors Assessment</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          {/* Placement and Coverage */}
          <h2>Placement and Coverage:</h2>
          <div className="form-section">
            <label>Are the motion sensors strategically placed to detect unauthorized entry points?</label>
            <div>
              <input type="radio" name="strategicPlacement" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="strategicPlacement" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="strategicPlacementComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Do they cover all potential entry points, such as doors, windows, and other vulnerable areas?</label>
            <div>
              <input type="radio" name="coverage" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="coverage" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="coverageComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Are there any blind spots or areas where sensor coverage is insufficient?</label>
            <div>
              <input type="text" name="blindSpots" placeholder="Describe any blind spots" onChange={handleChange}/>
            </div>
          </div>

          {/* Detection Sensitivity */}
          <h2>Detection Sensitivity:</h2>
          <div className="form-section">
            <label>Are the motion sensors set to an appropriate sensitivity level to detect unauthorized movement effectively?</label>
            <div>
              <input type="radio" name="sensitivityLevel" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="sensitivityLevel" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="sensitivityLevelComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Have adjustments been made to minimize false alarms caused by environmental factors such as pets, wildlife, or moving objects?</label>
            <div>
              <input type="text" name="falseAlarms" placeholder="Describe any adjustments made" onChange={handleChange}/>
            </div>
          </div>

          {/* Response Time and Alarm Triggering */}
          <h2>Response Time and Alarm Triggering:</h2>
          <div className="form-section">
            <label>Do the motion sensors respond quickly to detected motion and trigger alarms promptly?</label>
            <div>
              <input type="radio" name="responseTime" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="responseTime" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="responseTimeComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Is there a mechanism in place to differentiate between normal activity and suspicious movements to minimize false alarms?</label>
            <div>
              <input type="radio" name="differentiateMechanism" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="differentiateMechanism" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="differentiateMechanismComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Are alarms transmitted to monitoring stations or security personnel in real-time for immediate response?</label>
            <div>
              <input type="radio" name="alarmTransmission" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="alarmTransmission" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="alarmTransmissionComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          {/* Integration with Alarm Systems */}
          <h2>Integration with Alarm Systems:</h2>
          <div className="form-section">
            <label>Are the motion sensors integrated with the overall intrusion alarm system?</label>
            <div>
              <input type="radio" name="systemIntegration" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="systemIntegration" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="systemIntegrationComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Do they communicate seamlessly with alarm control panels and monitoring stations?</label>
            <div>
              <input type="radio" name="seamlessCommunication" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="seamlessCommunication" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="seamlessCommunicationComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Is there coordination between motion sensor activations and other alarm devices such as sirens, strobe lights, or notification systems?</label>
            <div>
              <input type="radio" name="coordinationAlarmDevices" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="coordinationAlarmDevices" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="coordinationAlarmDevicesComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          {/* Remote Monitoring and Management */}
          <h2>Remote Monitoring and Management:</h2>
          <div className="form-section">
            <label>Is there remote access and monitoring functionality for the motion sensors?</label>
            <div>
              <input type="radio" name="remoteAccess" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="remoteAccess" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="remoteAccessComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Can security personnel view sensor status, receive alerts, and adjust settings remotely as needed?</label>
            <div>
              <input type="radio" name="remoteAdjustments" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="remoteAdjustments" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="remoteAdjustmentsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Is there secure authentication and encryption protocols in place to prevent unauthorized access to sensor controls?</label>
            <div>
              <input type="radio" name="secureAuthentication" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="secureAuthentication" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="secureAuthenticationComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          {/* Durability and Reliability */}
          <h2>Durability and Reliability:</h2>
          <div className="form-section">
            <label>Are the motion sensors designed to withstand environmental factors such as temperature variations, moisture, and physical impact?</label>
            <div>
              <input type="radio" name="environmentDurability" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="environmentDurability" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="environmentDurabilityComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Are they constructed from durable materials capable of withstanding outdoor conditions if installed in exterior locations?</label>
            <div>
              <input type="radio" name="materialDurability" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="materialDurability" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="materialDurabilityComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Have the sensors undergone testing or certification to verify reliability and durability?</label>
            <div>
              <input type="radio" name="sensorCertification" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="sensorCertification" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="sensorCertificationComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          {/* Maintenance and Upkeep */}
          <h2>Maintenance and Upkeep:</h2>
          <div className="form-section">
            <label>Is there a regular maintenance schedule in place for the motion sensors?</label>
            <div>
              <input type="radio" name="maintenanceSchedule" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="maintenanceSchedule" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="maintenanceScheduleComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Are maintenance tasks, such as testing sensor functionality, replacing batteries, and cleaning sensor lenses, performed according to schedule?</label>
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

          {/* Submit Button */}
          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}

export default MotionSensorsPage;
