import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import Navbar from "./Navbar"; // Import the Navbar

function FloodlightsPage() {
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
      // Create a document reference to the building in the 'Buildings' collection
      const buildingRef = doc(db, 'Buildings', buildingId);

      // Store the form data in the specified Firestore structure
      const formsRef = collection(db, 'forms/Physical Security/Floodlights');
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
        <h1>Floodlights Assessment</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          {/* Placement and Coverage */}
          <h2>Placement and Coverage:</h2>
          <div className="form-section">
            <label>Are floodlights strategically placed throughout the parking lots to provide uniform illumination?</label>
            <div>
              <input type="radio" name="strategicPlacement" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="strategicPlacement" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Do the floodlights cover all areas of the parking lots, including entrances, exits, pathways, and blind spots?</label>
            <div>
              <input type="radio" name="coverageAreas" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="coverageAreas" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there any areas where lighting coverage is inadequate, posing potential security risks?</label>
            <div>
              <input type="text" name="inadequateCoverage" placeholder="Describe inadequate areas" onChange={handleChange}/>
            </div>
          </div>

          {/* Brightness and Visibility */}
          <h2>Brightness and Visibility:</h2>
          <div className="form-section">
            <label>Are the floodlights sufficiently bright to illuminate the parking lots effectively?</label>
            <div>
              <input type="radio" name="brightness" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="brightness" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Do they provide clear visibility for pedestrians and vehicles to navigate safely?</label>
            <div>
              <input type="radio" name="clearVisibility" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="clearVisibility" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there measures in place to prevent glare or shadows that could affect visibility?</label>
            <div>
              <input type="text" name="glareShadows" placeholder="Describe glare/shadow issues" onChange={handleChange}/>
            </div>
          </div>

          {/* Timers and Controls */}
          <h2>Timers and Controls:</h2>
          <div className="form-section">
            <label>Are floodlights equipped with timers or controls to activate and deactivate them at specific times?</label>
            <div>
              <input type="radio" name="timers" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="timers" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are lighting schedules adjusted based on usage patterns and security requirements, such as during non-operating hours?</label>
            <div>
              <input type="radio" name="lightingSchedules" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="lightingSchedules" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there flexibility in controlling individual floodlights or zones to optimize energy usage and security coverage?</label>
            <div>
              <input type="radio" name="controlFlexibility" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="controlFlexibility" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Integration with Security Systems */}
          <h2>Integration with Security Systems:</h2>
          <div className="form-section">
            <label>Are floodlights integrated with other security systems, such as surveillance cameras or intrusion detection systems?</label>
            <div>
              <input type="radio" name="integratedSystems" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="integratedSystems" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Do they trigger recording or alerting mechanisms upon activation to provide real-time notification of potential security threats?</label>
            <div>
              <input type="radio" name="triggerRecording" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="triggerRecording" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there coordination between floodlight controls and security personnel to respond to security incidents effectively?</label>
            <div>
              <input type="radio" name="coordination" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="coordination" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Energy Efficiency */}
          <h2>Energy Efficiency:</h2>
          <div className="form-section">
            <label>Are the floodlights energy-efficient, utilizing LED technology or other low-power lighting solutions?</label>
            <div>
              <input type="radio" name="energyEfficient" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="energyEfficient" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there measures in place to optimize energy consumption, such as dimming or motion-sensing capabilities during periods of low activity?</label>
            <div>
              <input type="radio" name="energyOptimization" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="energyOptimization" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there a monitoring system in place to track energy usage and identify opportunities for further efficiency improvements?</label>
            <div>
              <input type="radio" name="monitoringSystem" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="monitoringSystem" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Maintenance and Upkeep */}
          <h2>Maintenance and Upkeep:</h2>
          <div className="form-section">
            <label>Is there a regular maintenance schedule in place for floodlights?</label>
            <div>
              <input type="radio" name="maintenanceSchedule" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="maintenanceSchedule" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are maintenance tasks, such as cleaning, bulb replacement, and inspection of wiring and fixtures, performed according to schedule?</label>
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

          {/* Safety and Security */}
          <h2>Safety and Security:</h2>
          <div className="form-section">
            <label>Are floodlight installations secure from tampering or vandalism?</label>
            <div>
              <input type="radio" name="secureInstallations" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="secureInstallations" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are fixtures and mounting structures adequately reinforced to withstand environmental conditions and potential impact?</label>
            <div>
              <input type="radio" name="reinforcedStructures" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="reinforcedStructures" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there measures in place to prevent unauthorized access to floodlight controls or wiring?</label>
            <div>
              <input type="radio" name="unauthorizedAccess" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="unauthorizedAccess" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}

export default FloodlightsPage;
