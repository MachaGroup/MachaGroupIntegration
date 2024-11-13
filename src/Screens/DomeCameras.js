import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';

function DomeCamerasPage() {
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
      const formsRef = collection(db, 'forms/Physical Security/Dome Cameras');
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
        <h1>Dome Cameras Assessment</h1>
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          {/* Placement and Coverage */}
          <h2>Placement and Coverage:</h2>
          <div className="form-section">
            <label>Are the dome cameras strategically placed in hallways to provide comprehensive surveillance coverage?</label>
            <div>
              <input type="radio" name="strategicPlacement" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="strategicPlacement" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Do they cover all critical areas and potential blind spots within the hallways?</label>
            <div>
              <input type="radio" name="coverage" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="coverage" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there any areas where camera coverage is insufficient, posing potential security risks?</label>
            <input type="text" name="insufficientCoverage" placeholder="Describe areas with insufficient coverage" onChange={handleChange}/>
          </div>

          {/* Mounting and Installation */}
          <h2>Mounting and Installation:</h2>
          <div className="form-section">
            <label>Are the dome cameras securely mounted and installed to prevent tampering or vandalism?</label>
            <div>
              <input type="radio" name="secureMounting" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="secureMounting" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there protective enclosures or housings to shield the cameras from damage?</label>
            <div>
              <input type="radio" name="protectiveHousing" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="protectiveHousing" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are cables and wiring concealed to maintain a neat and unobtrusive appearance?</label>
            <div>
              <input type="radio" name="concealedWiring" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="concealedWiring" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Image Quality and Resolution */}
          <h2>Image Quality and Resolution:</h2>
          <div className="form-section">
            <label>Do the dome cameras capture high-quality images with sufficient resolution for identification and analysis?</label>
            <div>
              <input type="radio" name="imageQuality" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="imageQuality" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there adjustments or settings available to optimize image quality based on lighting conditions in the hallways?</label>
            <input type="text" name="imageSettings" placeholder="Describe available settings" onChange={handleChange}/>
          </div>

          <div className="form-section">
            <label>Are images clear and detailed, allowing for easy identification of individuals and activities?</label>
            <div>
              <input type="radio" name="imageClarity" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="imageClarity" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Integration with Surveillance Systems */}
          <h2>Integration with Surveillance Systems:</h2>
          <div className="form-section">
            <label>Are the dome cameras integrated with the overall surveillance system?</label>
            <div>
              <input type="radio" name="systemIntegration" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="systemIntegration" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Do they communicate seamlessly with surveillance software and monitoring stations?</label>
            <div>
              <input type="radio" name="communicationSeamless" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="communicationSeamless" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there real-time monitoring and recording of camera feeds from the hallways?</label>
            <div>
              <input type="radio" name="realTimeMonitoring" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="realTimeMonitoring" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Remote Control and Management */}
          <h2>Remote Control and Management:</h2>
          <div className="form-section">
            <label>Is there remote access and control functionality for the dome cameras?</label>
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
              <input type="radio" name="encryptionProtocols" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="encryptionProtocols" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Durability and Weather Resistance */}
          <h2>Durability and Weather Resistance:</h2>
          <div className="form-section">
            <label>Are the dome cameras designed to withstand environmental factors such as moisture, temperature extremes, and dust?</label>
            <div>
              <input type="radio" name="durability" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="durability" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are they constructed from durable materials capable of withstanding indoor conditions?</label>
            <div>
              <input type="radio" name="durableMaterials" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="durableMaterials" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there measures in place to protect the cameras from accidental damage or tampering?</label>
            <div>
              <input type="radio" name="damageProtection" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="damageProtection" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Maintenance and Upkeep */}
          <h2>Maintenance and Upkeep:</h2>
          <div className="form-section">
            <label>Is there a regular maintenance schedule in place for the dome cameras?</label>
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

export default DomeCamerasPage;
