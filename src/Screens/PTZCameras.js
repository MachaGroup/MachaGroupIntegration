import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';

function PTZCamerasPage() {
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
      const formsRef = collection(db, 'forms/Physical Security/PTZ Cameras');
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
        <h1>PTZ Cameras (e.g., for flexible monitoring) Assessment</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          {/* Functionality and Operation */}
          <h2>Functionality and Operation:</h2>
          <div className="form-section">
            <label>Are the PTZ cameras operational and functioning as intended?</label>
            <div>
              <input type="radio" name="operational" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="operational" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Do the cameras provide flexible monitoring capabilities, allowing for pan, tilt, and zoom functionalities?</label>
            <div>
              <input type="radio" name="flexibleMonitoring" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="flexibleMonitoring" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there any signs of malfunction or errors in camera movements or zoom capabilities?</label>
            <div>
              <input type="radio" name="malfunction" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="malfunction" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are backup systems in place in case of power outages or camera malfunctions?</label>
            <div>
              <input type="radio" name="backupSystems" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="backupSystems" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Coverage and Monitoring */}
          <h2>Coverage and Monitoring:</h2>
          <div className="form-section">
            <label>Do the PTZ cameras cover the desired areas for monitoring, providing comprehensive surveillance coverage?</label>
            <div>
              <input type="radio" name="coverage" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="coverage" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are they positioned strategically to monitor critical areas and respond to security events effectively?</label>
            <div>
              <input type="radio" name="strategicPositioning" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="strategicPositioning" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there preset positions or patrol patterns programmed into the cameras to enhance monitoring efficiency?</label>
            <div>
              <input type="radio" name="presetPositions" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="presetPositions" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Image Quality and Resolution */}
          <h2>Image Quality and Resolution:</h2>
          <div className="form-section">
            <label>Do the PTZ cameras capture high-quality images with sufficient resolution for identification and analysis?</label>
            <div>
              <input type="radio" name="imageQuality" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="imageQuality" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there adjustments or settings available to optimize image quality based on lighting conditions and environmental factors?</label>
            <div>
              <input type="radio" name="imageAdjustments" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="imageAdjustments" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are images clear and detailed, even when zoomed in for closer inspection?</label>
            <div>
              <input type="radio" name="zoomQuality" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="zoomQuality" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Integration with Surveillance Systems */}
          <h2>Integration with Surveillance Systems:</h2>
          <div className="form-section">
            <label>Are the PTZ cameras integrated with the overall surveillance system?</label>
            <div>
              <input type="radio" name="integrationSurveillance" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="integrationSurveillance" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Do they communicate seamlessly with surveillance software and monitoring stations?</label>
            <div>
              <input type="radio" name="seamlessCommunication" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="seamlessCommunication" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there real-time monitoring and recording of camera feeds, with the ability to control PTZ functions remotely?</label>
            <div>
              <input type="radio" name="realTimeMonitoring" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="realTimeMonitoring" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Durability and Weather Resistance */}
          <h2>Durability and Weather Resistance:</h2>
          <div className="form-section">
            <label>Are the PTZ cameras designed to withstand environmental factors such as moisture, temperature extremes, and dust?</label>
            <div>
              <input type="radio" name="durabilityWeatherResistance" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="durabilityWeatherResistance" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are they constructed from durable materials capable of withstanding outdoor conditions?</label>
            <div>
              <input type="radio" name="durableMaterials" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="durableMaterials" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there protective enclosures or housings to shield the cameras from damage or vandalism?</label>
            <div>
              <input type="radio" name="protectiveEnclosures" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="protectiveEnclosures" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Remote Control and Management */}
          <h2>Remote Control and Management:</h2>
          <div className="form-section">
            <label>Is there remote access and control functionality for the PTZ cameras?</label>
            <div>
              <input type="radio" name="remoteControl" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="remoteControl" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Can security personnel adjust camera angles, zoom levels, and other settings remotely as needed?</label>
            <div>
              <input type="radio" name="remoteAdjustments" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="remoteAdjustments" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there secure authentication and encryption protocols in place to prevent unauthorized access to camera controls?</label>
            <div>
              <input type="radio" name="secureAuthentication" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="secureAuthentication" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Maintenance and Upkeep */}
          <h2>Maintenance and Upkeep:</h2>
          <div className="form-section">
            <label>Is there a regular maintenance schedule in place for the PTZ cameras?</label>
            <div>
              <input type="radio" name="maintenanceSchedule" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="maintenanceSchedule" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are maintenance tasks, such as cleaning, inspection of camera lenses and housings, and testing of PTZ functions, performed according to schedule?</label>
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

export default PTZCamerasPage;
