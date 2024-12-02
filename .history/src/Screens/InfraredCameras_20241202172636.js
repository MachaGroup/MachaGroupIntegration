import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar"; // Import the Navbar

function InfraredCamerasPage() {
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
      const formsRef = collection(db, 'forms/Physical Security/Infrared Cameras');
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
        <h1>Infrared Cameras Assessment</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          {/* Low-Light Performance */}
          <h2>Low-Light Performance:</h2>
          <div className="form-section">
            <label>Do the infrared cameras effectively capture images in low-light or nighttime conditions?</label>
            <div>
              <input type="radio" name="lowLightPerformance" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="lowLightPerformance" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are they equipped with infrared LEDs or other illumination technology to enhance visibility in darkness?</label>
            <div>
              <input type="radio" name="infraredLEDs" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="infraredLEDs" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there adjustments or settings available to optimize camera performance in varying levels of low-light conditions?</label>
            <div>
              <input type="radio" name="lowLightAdjustments" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="lowLightAdjustments" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Image Quality and Resolution */}
          <h2>Image Quality and Resolution:</h2>
          <div className="form-section">
            <label>Do the infrared cameras capture high-quality images with sufficient resolution for identification and analysis, even in low-light environments?</label>
            <div>
              <input type="radio" name="imageQuality" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="imageQuality" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there adjustments or settings available to enhance image clarity and detail in low-light conditions?</label>
            <div>
              <input type="radio" name="imageClarity" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="imageClarity" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are images clear and detailed, allowing for easy identification of individuals and activities in low-light environments?</label>
            <div>
              <input type="radio" name="clearImages" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="clearImages" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Integration with Surveillance Systems */}
          <h2>Integration with Surveillance Systems:</h2>
          <div className="form-section">
            <label>Are the infrared cameras integrated with the overall surveillance system?</label>
            <div>
              <input type="radio" name="systemIntegration" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="systemIntegration" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Do they communicate seamlessly with surveillance software and monitoring stations?</label>
            <div>
              <input type="radio" name="softwareCommunication" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="softwareCommunication" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there real-time monitoring and recording of camera feeds from areas with low-light conditions?</label>
            <div>
              <input type="radio" name="realTimeMonitoring" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="realTimeMonitoring" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Coverage and Monitoring */}
          <h2>Coverage and Monitoring:</h2>
          <div className="form-section">
            <label>Do the infrared cameras cover the desired areas with low-light conditions, providing comprehensive surveillance coverage?</label>
            <div>
              <input type="radio" name="coverageAreas" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="coverageAreas" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are they positioned strategically to monitor critical areas, such as dark corners, alleys, or building perimeters, effectively?</label>
            <div>
              <input type="radio" name="strategicPositioning" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="strategicPositioning" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there any blind spots or areas where camera coverage is insufficient in low-light environments?</label>
            <div>
              <input type="radio" name="blindSpots" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="blindSpots" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Durability and Weather Resistance */}
          <h2>Durability and Weather Resistance:</h2>
          <div className="form-section">
            <label>Are the infrared cameras designed to withstand outdoor environmental factors such as rain, humidity, and temperature fluctuations?</label>
            <div>
              <input type="radio" name="weatherResistance" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="weatherResistance" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are they constructed from durable materials capable of withstanding harsh outdoor conditions?</label>
            <div>
              <input type="radio" name="durableMaterials" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="durableMaterials" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Have the cameras undergone testing or certification to verify weatherproofing and durability?</label>
            <div>
              <input type="radio" name="weatherProofingCertification" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="weatherProofingCertification" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Remote Control and Management */}
          <h2>Remote Control and Management:</h2>
          <div className="form-section">
            <label>Is there remote access and control functionality for the infrared cameras?</label>
            <div>
              <input type="radio" name="remoteAccess" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="remoteAccess" value="no" onChange={handleChange}/> No
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
              <input type="radio" name="secureProtocols" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="secureProtocols" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Maintenance and Upkeep */}
          <h2>Maintenance and Upkeep:</h2>
          <div className="form-section">
            <label>Is there a regular maintenance schedule in place for the infrared cameras?</label>
            <div>
              <input type="radio" name="maintenanceSchedule" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="maintenanceSchedule" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are maintenance tasks, such as cleaning, inspection of camera lenses and housings, and testing of camera functionalities, performed according to schedule?</label>
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

export default InfraredCamerasPage;
