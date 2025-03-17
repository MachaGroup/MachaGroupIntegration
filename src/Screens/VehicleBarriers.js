import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function VehicleBarriersPage() {
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
        const formsRef = collection(db, 'forms/Physical Security/Vehicle Barrier');
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
      const formsRef = collection(db, 'forms/Physical Security/Vehicle Barrier');
      await addDoc(formsRef, {
        building: buildingRef, // Reference to the building document
        formData: formData, // Store the form data as a nested object
      });

      console.log('Form data submitted successfully!');
      alert('Form submitted successfully!');
      navigate('/Form');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit the form. Please try again.')
    }
  };

  return (
    <div className="form-page">
      <header className="header">
            <Navbar />
        {/* Back Button */}
        <button className="back-button" onClick={handleBack}>←</button> {/* Back button at the top */}
        <h1>1.1.2.1.2. Vehicle Barriers Assessment</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          {/* Functionality and Operation */}
          <h2>Functionality and Operation:</h2>
          <div className="form-section">
            <label>Are the vehicle barriers operational and functioning as intended?</label>
            <div>
              <input type="radio" name="barriersOperational" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="barriersOperational" value="no" onChange={handleChange}/> No
            </div>
            <div>
              <input type="text" name="barriersOperationalComment" placeholder="Comments" onChange={handleChange}/>
            </div>
          </div>

          <div className="form-section">
            <label>Do the barriers effectively block vehicle access to restricted areas?</label>
            <div>
              <input type="radio" name="barriersBlockAccess" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="barriersBlockAccess" value="no" onChange={handleChange}/> No
            </div>
            <div>
              <input type="text" name="barriersBlockAccessComment" placeholder="Comments" onChange={handleChange}/>
            </div>
          </div>

          <div className="form-section">
            <label>Are there any signs of damage, wear, or malfunction in the barrier mechanisms?</label>
            <div>
              <input type="text" name="barriersDamage" placeholder="Describe any damage or wear" onChange={handleChange}/>
            </div>
          </div>

          <div className="form-section">
            <label>Are there backup systems in place in case of power outages or mechanical failures?</label>
            <div>
              <input type="radio" name="barriersBackup" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="barriersBackup" value="no" onChange={handleChange}/> No
            </div>
            <div>
              <input type="text" name="barriersBackupComment" placeholder="Comments" onChange={handleChange}/>
            </div>
          </div>

          {/* Design and Construction */}
          <h2>Design and Construction:</h2>
          <div className="form-section">
            <label>Are the vehicle barriers designed and constructed to withstand vehicle impact?</label>
            <div>
              <input type="radio" name="barriersWithstandImpact" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="barriersWithstandImpact" value="no" onChange={handleChange}/> No
            </div>
            <div>
              <input type="text" name="barriersWithstandImpactComment" placeholder="Comments" onChange={handleChange}/>
            </div>
          </div>

          <div className="form-section">
            <label>Do they meet relevant crash-rated standards or certifications for vehicle mitigation?</label>
            <div>
              <input type="radio" name="barriersCrashRated" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="barriersCrashRated" value="no" onChange={handleChange}/> No
            </div>
            <div>
              <input type="text" name="barriersCrashRatedComment" placeholder="Comments" onChange={handleChange}/>
            </div>
          </div>

          <div className="form-section">
            <label>Are there any design features to minimize the risk of vehicle bypass or circumvention?</label>
            <div>
              <input type="radio" name="barriersDesignFeatures" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="barriersDesignFeatures" value="no" onChange={handleChange}/> No
            </div>
            <div>
              <input type="text" name="barriersDesignFeaturesComment" placeholder="Comments" onChange={handleChange}/>
            </div>
          </div>

          {/* Integration with Access Control */}
          <h2>Integration with Access Control:</h2>
          <div className="form-section">
            <label>How are the vehicle barriers integrated with access control systems?</label>
            <div>
              <input type="text" name="barriersIntegration" placeholder="Describe access control integration" onChange={handleChange}/>
            </div>
          </div>

          <div className="form-section">
            <label>Are there mechanisms to activate the barriers remotely or automatically based on access permissions?</label>
            <div>
              <input type="radio" name="barriersRemoteActivation" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="barriersRemoteActivation" value="no" onChange={handleChange}/> No
            </div>
            <div>
              <input type="text" name="barriersRemoteActivationComment" placeholder="Comments" onChange={handleChange}/>
            </div>
          </div>

          <div className="form-section">
            <label>Is access to the barrier controls restricted to authorized personnel only?</label>
            <div>
              <input type="radio" name="barriersRestrictedAccess" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="barriersRestrictedAccess" value="no" onChange={handleChange}/> No
            </div>
            <div>
              <input type="text" name="barriersRestrictedAccessComment" placeholder="Comments" onChange={handleChange}/>
            </div>
          </div>

          {/* Safety Measures */}
          <h2>Safety Measures:</h2>
          <div className="form-section">
            <label>Are there safety features in place to prevent accidents or injuries caused by the barriers?</label>
            <div>
              <input type="radio" name="barriersSafety" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="barriersSafety" value="no" onChange={handleChange}/> No
            </div>
            <div>
              <input type="text" name="barriersSafetyComment" placeholder="Comments" onChange={handleChange}/>
            </div>
          </div>

          <div className="form-section">
            <label>Are barriers equipped with warning lights, sirens, or other visual and audible signals to alert approaching vehicles?</label>
            <div>
              <input type="radio" name="barriersWarningSignals" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="barriersWarningSignals" value="no" onChange={handleChange}/> No
            </div>
            <div>
              <input type="text" name="barriersWarningSignalsComment" placeholder="Comments" onChange={handleChange}/>
            </div>
          </div>

          <div className="form-section">
            <label>Are there physical barriers or signage to prevent pedestrians from approaching the barrier zone?</label>
            <div>
              <input type="radio" name="barriersPhysicalSignage" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="barriersPhysicalSignage" value="no" onChange={handleChange}/> No
            </div>
            <div>
              <input type="text" name="barriersPhysicalSignageComment" placeholder="Comments" onChange={handleChange}/>
            </div>
          </div>

          {/* Maintenance and Upkeep */}
          <h2>Maintenance and Upkeep:</h2>
          <div className="form-section">
            <label>Is there a regular maintenance schedule in place for the vehicle barriers?</label>
            <div>
              <input type="radio" name="barriersMaintenanceSchedule" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="barriersMaintenanceSchedule" value="no" onChange={handleChange}/> No
            </div>
            <div>
              <input type="text" name="barriersMaintenanceScheduleComment" placeholder="Comments" onChange={handleChange}/>
            </div>
          </div>

          <div className="form-section">
            <label>Are maintenance tasks, such as lubrication, inspection of mechanisms, and testing of safety features, performed according to schedule?</label>
            <div>
              <input type="radio" name="barriersMaintenanceTasks" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="barriersMaintenanceTasks" value="no" onChange={handleChange}/> No
            </div>
            <div>
              <input type="text" name="barriersMaintenanceTasksComment" placeholder="Comments" onChange={handleChange}/>
            </div>
          </div>

          <div className="form-section">
            <label>Are there records documenting maintenance activities, repairs, and any issues identified during inspections?</label>
            <div>
              <input type="radio" name="barriersMaintenanceRecords" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="barriersMaintenanceRecords" value="no" onChange={handleChange}/> No
            </div>
            <div>
              <input type="text" name="barriersMaintenanceRecordsComment" placeholder="Comments" onChange={handleChange}/>
            </div>
          </div>

          {/* Compliance with Regulations */}
          <h2>Compliance with Regulations:</h2>
          <div className="form-section">
            <label>Do the vehicle barriers comply with relevant regulations, standards, and industry best practices?</label>
            <div>
              <input type="radio" name="barriersCompliance" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="barriersCompliance" value="no" onChange={handleChange}/> No
            </div>
            <div>
              <input type="text" name="barriersComplianceComment" placeholder="Comments" onChange={handleChange}/>
            </div>
          </div>

          <div className="form-section">
            <label>Are there any specific requirements or guidelines for vehicle barriers outlined by regulatory authorities or industry associations?</label>
            <input type="text" name="barriersRegulatoryRequirements" placeholder="Enter any regulatory requirements" onChange={handleChange}/>
          </div>

          <div className="form-section">
            <label>Have the barriers undergone testing or certification to verify compliance with applicable standards?</label>
            <div>
              <input type="radio" name="barriersTesting" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="barriersTesting" value="no" onChange={handleChange}/> No
            </div>
            <div>
              <input type="text" name="barriersTestingComment" placeholder="Comments" onChange={handleChange}/>
            </div>
          </div>

          {/* Emergency Procedures */}
          <h2>Emergency Procedures:</h2>
          <div className="form-section">
            <label>Is there a contingency plan in place for emergency situations, such as vehicle attacks or security breaches?</label>
            <div>
              <input type="radio" name="barriersEmergencyPlan" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="barriersEmergencyPlan" value="no" onChange={handleChange}/> No
            </div>
            <div>
              <input type="text" name="barriersEmergencyPlanComment" placeholder="Comments" onChange={handleChange}/>
            </div>
          </div>

          <div className="form-section">
            <label>Are security personnel trained on emergency procedures for activating and deactivating the barriers?</label>
            <div>
              <input type="radio" name="barriersEmergencyTraining" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="barriersEmergencyTraining" value="no" onChange={handleChange}/> No
            </div>
            <div>
              <input type="text" name="barriersEmergencyTrainingComment" placeholder="Comments" onChange={handleChange}/>
            </div>
          </div>

          <div className="form-section">
            <label>Is there coordination with law enforcement or emergency responders for rapid response to security incidents involving the barriers?</label>
            <div>
              <input type="radio" name="barriersEmergencyResponse" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="barriersEmergencyResponse" value="no" onChange={handleChange}/> No
            </div>
            <div>
              <input type="text" name="barriersEmergencyResponseComment" placeholder="Comments" onChange={handleChange}/>
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

export default VehicleBarriersPage;
