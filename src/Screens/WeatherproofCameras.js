import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function WeatherproofCamerasPage() {
  const navigate = useNavigate();  // Initialize useNavigate hook for navigation
  const { buildingId } = useBuilding(); // Access buildingId from context
  const db = getFirestore();

  const [formData, setFormData] = useState();
  const storage = getStorage();
  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadError, setUploadError] = useState(null);


  useEffect(() => {
      if (!buildingId) {
          alert('No building selected. Redirecting to Building Info...');
          navigate('/BuildingandAddress');
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
        const formsRef = collection(db, 'forms/Physical Security/WeatherProof Cameras');
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
      const formsRef = collection(db, 'forms/Physical Security/WeatherProof Cameras');
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
        <h1>Weatherproof Cameras Assessment</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          {/* Weatherproofing and Durability */}
          <h2>Weatherproofing and Durability:</h2>
          <div className="form-section">
            <label>Are the weatherproof cameras designed to withstand outdoor environmental factors such as rain, snow, humidity, and temperature fluctuations?</label>
            <div>
              <input type="radio" name="weatherProofDesign" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="weatherProofDesign" value="no" onChange={handleChange}/> No
            </div>
            <div>
              <input type="text" name="weatherProofDesignComments" placeholder="Comments" onChange={handleChange}/>
            </div>
          </div>

          <div className="form-section">
            <label>Are they constructed from durable materials capable of withstanding harsh outdoor conditions?</label>
            <div>
              <input type="radio" name="durableMaterials" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="durableMaterials" value="no" onChange={handleChange}/> No
            </div>
            <div>
              <input type="text" name="durableMaterialsComments" placeholder="Comments" onChange={handleChange}/>
            </div>
          </div>

          <div className="form-section">
            <label>Have the cameras undergone testing or certification to verify weatherproofing and durability?</label>
            <div>
              <input type="radio" name="certificationTesting" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="certificationTesting" value="no" onChange={handleChange}/> No
            </div>
            <div>
              <input type="text" name="certificationTestingComments" placeholder="Comments" onChange={handleChange}/>
            </div>
          </div>

          {/* Mounting and Installation */}
          <h2>Mounting and Installation:</h2>
          <div className="form-section">
            <label>Are the weatherproof cameras securely mounted and installed in outdoor areas?</label>
            <div>
              <input type="radio" name="secureMounting" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="secureMounting" value="no" onChange={handleChange}/> No
            </div>
            <div>
              <input type="text" name="secureMountingComments" placeholder="Comments" onChange={handleChange}/>
            </div>
          </div>

          <div className="form-section">
            <label>Are they positioned at optimal angles to cover the desired outdoor spaces effectively?</label>
            <div>
              <input type="radio" name="optimalPositioning" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="optimalPositioning" value="no" onChange={handleChange}/> No
            </div>
            <div>
              <input type="text" name="optimalPositioningComments" placeholder="Comments" onChange={handleChange}/>
            </div>
          </div>

          <div className="form-section">
            <label>Are cables and wiring adequately protected from weather elements and tampering?</label>
            <div>
              <input type="radio" name="protectedWiring" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="protectedWiring" value="no" onChange={handleChange}/> No
            </div>
            <div>
              <input type="text" name="protectedWiringComments" placeholder="Comments" onChange={handleChange}/>
            </div>
          </div>

          {/* Image Quality and Resolution */}
          <h2>Image Quality and Resolution:</h2>
          <div className="form-section">
            <label>Do the weatherproof cameras capture high-quality images with sufficient resolution for identification and analysis?</label>
            <div>
              <input type="radio" name="imageQuality" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="imageQuality" value="no" onChange={handleChange}/> No
            </div>
            <div>
              <input type="text" name="imageQualityComments" placeholder="Comments" onChange={handleChange}/>
            </div>
          </div>

          <div className="form-section">
            <label>Are there adjustments or settings available to optimize image quality based on lighting conditions outdoors?</label>
            <div>
              <input type="radio" name="imageAdjustments" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="imageAdjustments" value="no" onChange={handleChange}/> No
            </div>
            <div>
              <input type="text" name="imageAdjustmentsComments" placeholder="Comments" onChange={handleChange}/>
            </div>
          </div>

          <div className="form-section">
            <label>Are images clear and detailed, allowing for easy identification of individuals and activities in outdoor areas?</label>
            <div>
              <input type="radio" name="imageClarity" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="imageClarity" value="no" onChange={handleChange}/> No
            </div>
            <div>
              <input type="text" name="imageClarityComments" placeholder="Comments" onChange={handleChange}/>
            </div>
          </div>

          {/* Integration with Surveillance Systems */}
          <h2>Integration with Surveillance Systems:</h2>
          <div className="form-section">
            <label>Are the weatherproof cameras integrated with the overall surveillance system?</label>
            <div>
              <input type="radio" name="integrationSurveillance" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="integrationSurveillance" value="no" onChange={handleChange}/> No
            </div>
            <div>
              <input type="text" name="integrationSurveillanceComments" placeholder="Comments" onChange={handleChange}/>
            </div>
          </div>

          <div className="form-section">
            <label>Do they communicate seamlessly with surveillance software and monitoring stations?</label>
            <div>
              <input type="radio" name="softwareCommunication" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="softwareCommunication" value="no" onChange={handleChange}/> No
            </div>
            <div>
              <input type="text" name="softwareCommunicationComments" placeholder="Comments" onChange={handleChange}/>
            </div>
          </div>

          <div className="form-section">
            <label>Is there real-time monitoring and recording of camera feeds from outdoor areas?</label>
            <div>
              <input type="radio" name="realTimeMonitoring" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="realTimeMonitoring" value="no" onChange={handleChange}/> No
            </div>
            <div>
              <input type="text" name="realTimeMonitoringComments" placeholder="Comments" onChange={handleChange}/>
            </div>
          </div>

          {/* Remote Control and Management */}
          <h2>Remote Control and Management:</h2>
          <div className="form-section">
            <label>Is there remote access and control functionality for the weatherproof cameras?</label>
            <div>
              <input type="radio" name="remoteControl" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="remoteControl" value="no" onChange={handleChange}/> No
            </div>
            <div>
              <input type="text" name="remoteControlComments" placeholder="Comments" onChange={handleChange}/>
            </div>
          </div>

          <div className="form-section">
            <label>Can security personnel adjust camera angles, zoom levels, and other settings remotely as needed?</label>
            <div>
              <input type="radio" name="adjustableCameraSettings" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="adjustableCameraSettings" value="no" onChange={handleChange}/> No
            </div>
            <div>
              <input type="text" name="adjustableCameraSettingsComments" placeholder="Comments" onChange={handleChange}/>
            </div>
          </div>

          <div className="form-section">
            <label>Is there secure authentication and encryption protocols in place to prevent unauthorized access to camera controls?</label>
            <div>
              <input type="radio" name="secureProtocols" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="secureProtocols" value="no" onChange={handleChange}/> No
            </div>
            <div>
              <input type="text" name="secureProtocolsComments" placeholder="Comments" onChange={handleChange}/>
            </div>
          </div>

          {/* Coverage and Monitoring */}
          <h2>Coverage and Monitoring:</h2>
          <div className="form-section">
            <label>Do the weatherproof cameras cover the desired outdoor areas, providing comprehensive surveillance coverage?</label>
            <div>
              <input type="radio" name="comprehensiveCoverage" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="comprehensiveCoverage" value="no" onChange={handleChange}/> No
            </div>
            <div>
              <input type="text" name="comprehensiveCoverageComments" placeholder="Comments" onChange={handleChange}/>
            </div>
          </div>

          <div className="form-section">
            <label>Are they positioned strategically to monitor critical outdoor spaces, such as building perimeters, parking lots, or loading docks?</label>
            <div>
              <input type="radio" name="strategicPositioning" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="strategicPositioning" value="no" onChange={handleChange}/> No
            </div>
            <div>
              <input type="text" name="strategicPositioningComments" placeholder="Comments" onChange={handleChange}/>
            </div>
          </div>

          <div className="form-section">
            <label>Are there any blind spots or areas where camera coverage is insufficient?</label>
            <div>
              <input type="text" name="blindSpots" placeholder="Describe any blind spots or coverage issues" onChange={handleChange}/>
            </div>
          </div>

          {/* Maintenance and Upkeep */}
          <h2>Maintenance and Upkeep:</h2>
          <div className="form-section">
            <label>Is there a regular maintenance schedule in place for the weatherproof cameras?</label>
            <div>
              <input type="radio" name="maintenanceSchedule" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="maintenanceSchedule" value="no" onChange={handleChange}/> No
            </div>
            <div>
              <input type="text" name="maintenanceScheduleComments" placeholder="Comments" onChange={handleChange}/>
            </div>
          </div>

          <div className="form-section">
            <label>Are maintenance tasks, such as cleaning, inspection of camera lenses and housings, and testing of camera functionalities, performed according to schedule?</label>
            <div>
              <input type="radio" name="maintenanceTasks" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="maintenanceTasks" value="no" onChange={handleChange}/> No
            </div>
            <div>
              <input type="text" name="maintenanceTasksComments" placeholder="Comments" onChange={handleChange}/>
            </div>
          </div>

          <div className="form-section">
            <label>Are there records documenting maintenance activities, repairs, and any issues identified during inspections?</label>
            <div>
              <input type="radio" name="maintenanceRecords" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="maintenanceRecords" value="no" onChange={handleChange}/> No
            </div>
            <div>
              <input type="text" name="maintenanceRecordsComments" placeholder="Comments" onChange={handleChange}/>
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

export default WeatherproofCamerasPage;
