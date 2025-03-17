import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function MotionActivatedLightsPage() {
  const navigate = useNavigate();  // Initialize useNavigate hook for navigation
  const { buildingId } = useBuilding();
  const db = getFirestore();

  const [formData, setFormData] = useState();
  const storage = getStorage();
  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadError, setUploadError] = useState(null);


  useEffect(() => {
    if(!buildingId) {
      alert('No building selected. Redirecting to Building Info...');
      navigate('BuildingandAddress');
    }
  }, [buildingId, navigate]);
  
  
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
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
        const formsRef = collection(db, 'forms/Physical Security/Motion Activated Lights');
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
      alert('Building ID is missing. Please start the assessment from the correct page.');
      return;
    }

    try {
      // Create a document reference to the building in the 'Buildings' collection
      const buildingRef = doc(db, 'Buildings', buildingId);

      // Store the form data in the specified Firestore structure
      const formsRef = collection(db, 'forms/Physical Security/Motion Activated Lights');
      await addDoc(formsRef, {
        building: buildingRef,
        formData: formData,
      });
      console.log('From Data submitted successfully!');
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
        <h1>1.1.2.2.1. Motion-Activated Lights Assessment</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          {/* Placement and Coverage */}
          <h2>Placement and Coverage:</h2>
          <div className="form-section">
            <label>Are motion-activated lights strategically placed around the perimeter to provide adequate coverage?</label>
            <div>
              <input type="radio" name="strategicPlacement" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="strategicPlacement" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="strategicPlacementComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Do the lights illuminate key areas susceptible to unauthorized access, such as entry points, blind spots, or areas with limited visibility?</label>
            <div>
              <input type="radio" name="keyAreasIllumination" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="keyAreasIllumination" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="keyAreasIlluminationComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Are there any areas where lighting coverage is insufficient, posing potential security risks?</label>
            <div>
              <input type="text" name="insufficientCoverage" placeholder="Describe any areas with insufficient coverage" onChange={handleChange}/>
            </div>
          </div>

          {/* Sensor Sensitivity and Range */}
          <h2>Sensor Sensitivity and Range:</h2>
          <div className="form-section">
            <label>Are the motion sensors configured to detect movement effectively within the designated range?</label>
            <div>
              <input type="radio" name="sensorConfiguration" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="sensorConfiguration" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="sensorConfigurationComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Do they differentiate between legitimate movement (e.g., personnel patrolling the perimeter) and unauthorized intrusions?</label>
            <div>
              <input type="radio" name="movementDifferentiation" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="movementDifferentiation" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="movementDifferentiationComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Are there adjustments or calibration settings available to optimize sensor sensitivity and range based on environmental conditions?</label>
            <div>
              <input type="radio" name="sensorAdjustments" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="sensorAdjustments" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="sensorAdjustmentsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          {/* Timing and Duration */}
          <h2>Timing and Duration:</h2>
          <div className="form-section">
            <label>Are the lights programmed to activate promptly upon detecting motion and remain illuminated for a sufficient duration?</label>
            <div>
              <input type="radio" name="lightProgramming" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="lightProgramming" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="lightProgrammingComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Is the timing and duration of light activation adjusted to accommodate varying lighting conditions throughout the day and night?</label>
            <div>
              <input type="radio" name="timingAdjustments" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="timingAdjustments" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="timingAdjustmentsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Are there controls or settings to customize the timing and duration of light activation based on specific security requirements?</label>
            <div>
              <input type="radio" name="customizableSettings" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="customizableSettings" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="customizableSettingsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          {/* Brightness and Visibility */}
          <h2>Brightness and Visibility:</h2>
          <div className="form-section">
            <label>Are the motion-activated lights sufficiently bright to illuminate the surrounding area effectively?</label>
            <div>
              <input type="radio" name="brightness" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="brightness" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="brightnessComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Do they provide clear visibility without causing glare or shadows that could obscure detection of unauthorized activity?</label>
            <div>
              <input type="radio" name="visibilityWithoutGlare" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="visibilityWithoutGlare" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="visibilityWithoutGlareComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Are there measures in place to prevent tampering or vandalism of light fixtures to maintain visibility?</label>
            <div>
              <input type="radio" name="tamperingPrevention" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="tamperingPrevention" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="tamperingPreventionComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          {/* Integration with Security Systems */}
          <h2>Integration with Security Systems:</h2>
          <div className="form-section">
            <label>Are the motion-activated lights integrated with other security systems, such as surveillance cameras or intrusion detection systems?</label>
            <div>
              <input type="radio" name="integrationSecuritySystems" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="integrationSecuritySystems" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="integrationSecuritySystems" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Do they trigger recording or alerting mechanisms upon activation to provide real-time notification of potential security threats?</label>
            <div>
              <input type="radio" name="triggerAlert" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="triggerAlert" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="triggerAlertComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Is there coordination between lighting controls and security personnel to respond to motion activations appropriately?</label>
            <div>
              <input type="radio" name="lightingCoordination" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="lightingCoordination" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="lightingCoordinationComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          {/* Energy Efficiency */}
          <h2>Energy Efficiency:</h2>
          <div className="form-section">
            <label>Are the motion-activated lights energy-efficient, utilizing LED technology or other low-power lighting solutions?</label>
            <div>
              <input type="radio" name="energyEfficiency" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="energyEfficiency" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="energyEfficiencyComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Are there controls or settings to optimize energy consumption based on usage patterns and security requirements?</label>
            <div>
              <input type="radio" name="optimizeEnergy" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="optimizeEnergy" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="optimizeEnergyComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Is there a monitoring system in place to track energy usage and identify opportunities for further efficiency improvements?</label>
            <div>
              <input type="radio" name="monitorEnergy" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="monitorEnergy" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="monitorEnergyComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          {/* Maintenance and Upkeep */}
          <h2>Maintenance and Upkeep:</h2>
          <div className="form-section">
            <label>Is there a regular maintenance schedule in place for motion-activated lights?</label>
            <div>
              <input type="radio" name="maintenanceSchedule" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="maintenanceSchedule" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="maintenanceScheduleComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Are maintenance tasks, such as cleaning, bulb replacement, and inspection of wiring and fixtures, performed according to schedule?</label>
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
          <input type="file" accept="image/*" onChange={handleImageChange} />
{uploadProgress > 0 && <p>Upload Progress: {uploadProgress.toFixed(2)}%</p>}
{imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
{uploadError && <p style={{ color: "red" }}>{uploadError}</p>}
<button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}

export default MotionActivatedLightsPage;
