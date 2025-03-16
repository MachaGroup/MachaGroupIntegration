import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function GlassBreakSensorsPage() {
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
          const formsRef = collection(db, 'forms/Physical Security/Glass Break Sensors');
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
      const formsRef = collection(db, 'forms/Physical Security/Glass Break Sensors');
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
        <h1>Glass Break Sensors Assessment</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          {/* Placement and Coverage */}
          <h2>Placement and Coverage:</h2>
          <div className="form-section">
            <label>Are the glass break sensors strategically placed to detect forced entry through windows or glass doors?</label>
            <div>
              <input type="radio" name="strategicPlacement" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="strategicPlacement" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="strategicPlacement" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Do they cover all vulnerable glass surfaces, including windows, glass doors, and glass panels?</label>
            <div>
              <input type="radio" name="vulnerableSurfaces" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="vulnerableSurfaces" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="vulnerableSurfaces" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
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
            <label>Are the glass break sensors set to an appropriate sensitivity level to detect the sound frequency associated with breaking glass?</label>
            <div>
              <input type="radio" name="sensitivityLevel" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="sensitivityLevel" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="sensitivityLevel" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Have adjustments been made to minimize false alarms caused by ambient noise or non-threatening vibrations?</label>
            <div>
              <input type="radio" name="falseAlarmAdjustments" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="falseAlarmAdjustments" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="falseAlarmAdjustments" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          {/* Response Time and Alarm Triggering */}
          <h2>Response Time and Alarm Triggering:</h2>
          <div className="form-section">
            <label>Do the glass break sensors respond quickly to the sound of breaking glass and trigger alarms promptly?</label>
            <div>
              <input type="radio" name="quickResponse" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="quickResponse" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="quickResponse" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Is there a mechanism in place to differentiate between normal sounds and the specific sound signature of breaking glass to minimize false alarms?</label>
            <div>
              <input type="radio" name="falseAlarmMechanism" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="falseAlarmMechanism" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="falseAlarmMechanism" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Are alarms transmitted to monitoring stations or security personnel in real-time for immediate response?</label>
            <div>
              <input type="radio" name="realTimeAlarms" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="realTimeAlarms" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="realTimeAlarms" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          {/* Integration with Alarm Systems */}
          <h2>Integration with Alarm Systems:</h2>
          <div className="form-section">
            <label>Are the glass break sensors integrated with the overall intrusion alarm system?</label>
            <div>
              <input type="radio" name="integratedWithAlarm" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="integratedWithAlarm" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="integratedWithAlarm" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Do they communicate seamlessly with alarm control panels and monitoring stations?</label>
            <div>
              <input type="radio" name="communicationSeamless" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="communicationSeamless" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="communicationSeamless" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Is there coordination between glass break sensor activations and other alarm devices such as sirens, strobe lights, or notification systems?</label>
            <div>
              <input type="radio" name="coordinationWithDevices" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="coordinationWithDevices" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="coordinationWithDevices" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          {/* Remote Monitoring and Management */}
          <h2>Remote Monitoring and Management:</h2>
          <div className="form-section">
            <label>Is there remote access and monitoring functionality for the glass break sensors?</label>
            <div>
              <input type="radio" name="remoteAccess" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="remoteAccess" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="remoteAccess" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Can security personnel view sensor status, receive alerts, and adjust settings remotely as needed?</label>
            <div>
              <input type="radio" name="remoteManagement" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="remoteManagement" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="remoteManagement" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Is there secure authentication and encryption protocols in place to prevent unauthorized access to sensor controls?</label>
            <div>
              <input type="radio" name="secureAuthentication" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="secureAuthentication" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="secureAuthentication" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          {/* Durability and Reliability */}
          <h2>Durability and Reliability:</h2>
          <div className="form-section">
            <label>Are the glass break sensors designed to withstand environmental factors such as temperature variations, moisture, and physical impact?</label>
            <div>
              <input type="radio" name="durability" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="durability" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="durability" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Are they constructed from durable materials capable of withstanding indoor and outdoor conditions?</label>
            <div>
              <input type="radio" name="constructionMaterials" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="constructionMaterials" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="constructionMaterials" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Have the sensors undergone testing or certification to verify reliability and durability?</label>
            <div>
              <input type="radio" name="reliabilityCertification" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="reliabilityCertification" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="reliabilityCertification" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          {/* Maintenance and Upkeep */}
          <h2>Maintenance and Upkeep:</h2>
          <div className="form-section">
            <label>Is there a regular maintenance schedule in place for the glass break sensors?</label>
            <div>
              <input type="radio" name="maintenanceSchedule" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="maintenanceSchedule" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="maintenanceSchedule" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Are maintenance tasks, such as testing sensor functionality, replacing batteries, and cleaning sensor components, performed according to schedule?</label>
            <div>
              <input type="radio" name="maintenanceTasks" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="maintenanceTasks" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="maintenanceTasks" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Are there records documenting maintenance activities, repairs, and any issues identified during inspections?</label>
            <div>
              <input type="radio" name="maintenanceRecords" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="maintenanceRecords" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="maintenanceRecords" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}

export default GlassBreakSensorsPage;
