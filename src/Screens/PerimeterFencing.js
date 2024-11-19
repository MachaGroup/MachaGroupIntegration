import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';

function PerimeterFencingPage() {
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
      const formsRef = collection(db, 'forms/Physical Security/Perimeter Fencing');
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
        <h1>1.1.2.1.1. Perimeter Fencing Assessment</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          {/* Physical Integrity */}
          <h2>Physical Integrity:</h2>
          <div className="form-section">
            <label>Is the perimeter fencing structurally sound and in good condition?</label>
            <div>
              <input type="radio" name="structuralSoundness" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="structuralSoundness" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there any signs of damage, corrosion, or deterioration in the fencing material?</label>
            <div>
              <input type="radio" name="fencingDamage" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="fencingDamage" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are fence posts securely anchored, and are there any signs of leaning or instability?</label>
            <div>
              <input type="radio" name="securePosts" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="securePosts" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there any gaps or breaches in the fencing that could compromise security?</label>
            <div>
              <input type="radio" name="gapsBreaches" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="gapsBreaches" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Height and Coverage */}
          <h2>Height and Coverage:</h2>
          <div className="form-section">
            <label>Is the height of the perimeter fencing sufficient to deter unauthorized entry or climbing?</label>
            <div>
              <input type="radio" name="fencingHeight" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="fencingHeight" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Does the fencing provide adequate coverage to secure the perimeter of the facility or property?</label>
            <div>
              <input type="radio" name="fencingCoverage" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="fencingCoverage" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there additional measures in place to prevent access over or under the fencing, such as barbed wire or concrete barriers?</label>
            <div>
              <input type="radio" name="additionalMeasures" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="additionalMeasures" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Access Control */}
          <h2>Access Control:</h2>
          <div className="form-section">
            <label>Are access points in the perimeter fencing properly secured with gates or barriers?</label>
            <div>
              <input type="radio" name="securedAccessPoints" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="securedAccessPoints" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are gates equipped with locks, hinges, and latches to control access effectively?</label>
            <div>
              <input type="radio" name="gatesEquipment" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="gatesEquipment" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Is access to the fenced area restricted to authorized personnel only, with proper authentication mechanisms in place?</label>
            <div>
              <input type="radio" name="restrictedAccess" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="restrictedAccess" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Visibility and Surveillance */}
          <h2>Visibility and Surveillance:</h2>
          <div className="form-section">
            <label>Does the perimeter fencing allow for clear visibility of the surrounding area, both from inside and outside the fenced area?</label>
            <div>
              <input type="radio" name="visibility" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="visibility" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there measures in place to minimize blind spots or obscured views along the perimeter?</label>
            <div>
              <input type="radio" name="blindSpots" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="blindSpots" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are surveillance cameras or other monitoring systems positioned strategically to monitor activity along the fencing?</label>
            <div>
              <input type="radio" name="strategicSurveillance" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="strategicSurveillance" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Durability and Maintenance */}
          <h2>Durability and Maintenance:</h2>
          <div className="form-section">
            <label>Is the perimeter fencing made from durable materials that can withstand environmental factors and wear over time?</label>
            <div>
              <input type="radio" name="durableMaterials" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="durableMaterials" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there regular maintenance and inspection procedures in place to address any issues with the fencing promptly?</label>
            <div>
              <input type="radio" name="maintenanceInspection" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="maintenanceInspection" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there provisions for repairing or replacing damaged sections of fencing as needed?</label>
            <div>
              <input type="radio" name="repairProvisions" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="repairProvisions" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Compliance with Regulations */}
          <h2>Compliance with Regulations:</h2>
          <div className="form-section">
            <label>Does the perimeter fencing comply with relevant regulations, codes, and standards for security fencing?</label>
            <div>
              <input type="radio" name="regulatoryCompliance" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="regulatoryCompliance" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there any specific requirements or guidelines for perimeter fencing outlined by regulatory authorities or industry associations?</label>
            <input type="text" name="regulatoryRequirements" placeholder="Enter any regulatory requirements" onChange={handleChange}/>
          </div>

          <div className="form-section">
            <label>Have inspections or assessments been conducted to verify compliance with applicable standards?</label>
            <div>
              <input type="radio" name="inspectionsCompliance" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="inspectionsCompliance" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Integration with Security Measures */}
          <h2>Integration with Security Measures:</h2>
          <div className="form-section">
            <label>Is the perimeter fencing integrated with other security measures, such as surveillance cameras, lighting, or intrusion detection systems?</label>
            <div>
              <input type="radio" name="integratedSecurityMeasures" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="integratedSecurityMeasures" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Do these security measures complement the effectiveness of the fencing in deterring and detecting security threats?</label>
            <div>
              <input type="radio" name="securityEffectiveness" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="securityEffectiveness" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there coordination between security personnel and monitoring systems to respond to perimeter breaches effectively?</label>
            <div>
              <input type="radio" name="coordinationResponse" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="coordinationResponse" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}

export default PerimeterFencingPage;
