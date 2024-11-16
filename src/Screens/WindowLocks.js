import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';

function WindowLocksPage() {
  const navigate = useNavigate();  // Initialize useNavigate hook for navigation
  const { buildingId } = useBuilding();
  const db = getFirestore();

  const [formData, setFormData] = useState();

  useEffect(() => {
    if(!buildingId) {
      alert('No builidng selected. Redirecting to Building Info...');
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
      const formsRef = collection(db, 'forms/Physical Security/Window Locks');
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
        {/* Back Button */}
        <button className="back-button" onClick={handleBack}>←</button> {/* Back button at the top */}
        <h1>Window Locks Assessment</h1>
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          {/* Functionality and Reliability */}
          <h2>Functionality and Reliability:</h2>
          <div className="form-section">
            <label>Are the window locks operational and functioning properly?</label>
            <div>
              <input type="radio" name="operationalLocks" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="operationalLocks" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Do the locks securely fasten windows to prevent unauthorized entry?</label>
            <div>
              <input type="radio" name="secureFastening" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="secureFastening" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there any signs of damage, wear, or malfunction in the locking mechanisms?</label>
            <div>
              <input type="text" name="damageLocks" placeholder="Describe any damage or malfunction" onChange={handleChange}/>
            </div>
          </div>

          <div className="form-section">
            <label>Are backup systems in place in case of lock failure or tampering?</label>
            <div>
              <input type="radio" name="backupSystems" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="backupSystems" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Compatibility with Window Types */}
          <h2>Compatibility with Window Types:</h2>
          <div className="form-section">
            <label>Are the window locks suitable for the type of windows installed (e.g., sliding windows, casement windows)?</label>
            <div>
              <input type="radio" name="windowLockSuitability" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="windowLockSuitability" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Do they provide a secure fit and effective locking mechanism for each window style?</label>
            <div>
              <input type="radio" name="secureFit" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="secureFit" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Have considerations been made for windows of varying sizes and configurations?</label>
            <div>
              <input type="radio" name="windowSizes" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="windowSizes" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Accessibility and Ease of Use */}
          <h2>Accessibility and Ease of Use:</h2>
          <div className="form-section">
            <label>Are the window locks easily accessible and operable for occupants, particularly in emergency situations?</label>
            <div>
              <input type="radio" name="accessibleLocks" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="accessibleLocks" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Do they allow for quick and convenient opening and closing of windows when needed?</label>
            <div>
              <input type="radio" name="convenientUse" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="convenientUse" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there any accessibility features or considerations for individuals with disabilities?</label>
            <div>
              <input type="radio" name="accessibilityFeatures" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="accessibilityFeatures" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Durability and Resistance to Tampering */}
          <h2>Durability and Resistance to Tampering:</h2>
          <div className="form-section">
            <label>Are the window locks made from durable materials capable of withstanding physical force or tampering attempts?</label>
            <div>
              <input type="radio" name="durableMaterials" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="durableMaterials" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there additional security features, such as reinforced bolts or tamper-resistant screws, to enhance resistance to forced entry?</label>
            <div>
              <input type="radio" name="additionalSecurityFeatures" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="additionalSecurityFeatures" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Have the locks been tested for reliability and resistance to environmental factors such as corrosion or wear?</label>
            <div>
              <input type="radio" name="reliabilityTesting" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="reliabilityTesting" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Integration with Security Systems */}
          <h2>Integration with Security Systems:</h2>
          <div className="form-section">
            <label>Are the window locks integrated with the overall building security system?</label>
            <div>
              <input type="radio" name="integrationSecuritySystem" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="integrationSecuritySystem" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Do they trigger alerts or notifications in the event of tampering or attempted unauthorized entry?</label>
            <div>
              <input type="radio" name="tamperAlerts" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="tamperAlerts" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there surveillance cameras or other monitoring devices positioned to monitor windows for security breaches?</label>
            <div>
              <input type="radio" name="surveillanceMonitoring" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="surveillanceMonitoring" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Maintenance and Upkeep */}
          <h2>Maintenance and Upkeep:</h2>
          <div className="form-section">
            <label>Is there a regular maintenance schedule in place for window locks?</label>
            <div>
              <input type="radio" name="maintenanceSchedule" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="maintenanceSchedule" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are maintenance tasks, such as lubrication, inspection of locking mechanisms, and replacement of worn-out parts, performed according to schedule?</label>
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

          {/* Compliance with Regulations */}
          <h2>Compliance with Regulations:</h2>
          <div className="form-section">
            <label>Do the window locks comply with relevant regulations, codes, and standards for building security?</label>
            <div>
              <input type="radio" name="compliance" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="compliance" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there specific requirements or guidelines for window locks outlined by regulatory authorities or industry associations?</label>
            <div>
              <input type="text" name="regulatoryRequirements" placeholder="Enter any regulatory requirements" onChange={handleChange}/>
            </div>
          </div>

          <div className="form-section">
            <label>Have the locks undergone testing or certification to verify compliance with applicable standards?</label>
            <div>
              <input type="radio" name="certifications" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="certifications" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}

export default WindowLocksPage;
