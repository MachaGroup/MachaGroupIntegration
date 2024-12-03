import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';

function TrainingMaterialsFormPage() {
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
      const formsRef = collection(db, 'forms/Personnel Training and Awareness/Training Materials');
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
    <h1>3.1.1.1.2 Training Materials Assessment</h1>
    <img src={logo} alt="Logo" className="logo" />
  </header>

  <main className="form-container">
    <form onSubmit={handleSubmit}>
      {/* 3.1.1.1.2 Training Materials */}
      <h2>3.1.1.1.2.1 Availability and Accessibility:</h2>
      <div className="form-section">
        <label>Are appropriate training materials, such as first aid kits, AEDs (Automated External Defibrillators), and CPR manikins, readily available during training sessions?</label>
        <div>
          <input type="radio" name="materials-availability" value="yes" onChange={handleChange} /> Yes
          <input type="radio" name="materials-availability" value="no" onChange={handleChange} /> No
        </div>
      </div>

      <div className="form-section">
        <label>How are training materials stored and organized to ensure easy access and retrieval during training sessions?</label>
        <div>
          <input type="text" name="materials-storage" placeholder="Describe the materials stored" onChange={handleChange} />
        </div>
      </div>

      <div className="form-section">
        <label>Is there a designated area or storage facility for training materials, and is it easily accessible to trainers and participants?</label>
        <div>
          <input type="radio" name="storage-accessibility" value="yes" onChange={handleChange} /> Yes
          <input type="radio" name="storage-accessibility" value="no" onChange={handleChange} /> No
        </div>
        <div>
          <input type="text" name="storage-area-description" placeholder="Describe the area" onChange={handleChange} />
        </div>
      </div>

      <div className="form-section">
        <label>Are backup supplies of essential training materials maintained to ensure availability in case of emergencies or high demand?</label>
        <div>
          <input type="radio" name="backup-materials" value="yes" onChange={handleChange} /> Yes
          <input type="radio" name="backup-materials" value="no" onChange={handleChange} /> No
        </div>
      </div>

      <div className="form-section">
        <label>How are participants informed about the location and availability of training materials before and during training sessions?</label>
        <div>
          <input type="text" name="materials-communication" placeholder="Describe how participants are informed" onChange={handleChange} />
        </div>
      </div>

      <h2>3.1.1.1.2.2 Maintenance and Inspection:</h2>
      <div className="form-section">
        <label>How often are training materials inspected to ensure they are in working condition and compliant with safety standards?</label>
        <div>
          <input type="text" name="inspection-frequency" placeholder="How often" onChange={handleChange} />
        </div>
      </div>

      <div className="form-section">
        <label>Is there a documented maintenance schedule for training materials, including routine checks and servicing?</label>
        <div>
          <input type="radio" name="maintenance-schedule" value="yes" onChange={handleChange} /> Yes
          <input type="radio" name="maintenance-schedule" value="no" onChange={handleChange} /> No
        </div>
      </div>

      <div className="form-section">
        <label>Are there protocols in place for promptly addressing any issues or deficiencies identified during inspections?</label>
        <div>
          <input type="radio" name="issue-resolution" value="yes" onChange={handleChange} /> Yes
          <input type="radio" name="issue-resolution" value="no" onChange={handleChange} /> No
        </div>
        <div>
          <input type="text" name="issue-resolution-details" placeholder="Describe the protocols" onChange={handleChange} />
        </div>
      </div>

      <div className="form-section">
        <label>Are maintenance and inspection records maintained for each training material, documenting dates of inspection, repairs, and replacements?</label>
        <div>
          <input type="radio" name="maintenance-records" value="yes" onChange={handleChange} /> Yes
          <input type="radio" name="maintenance-records" value="no" onChange={handleChange} /> No
        </div>
      </div>

      <div className="form-section">
        <label>How are staff members trained on proper handling and maintenance procedures for training materials?</label>
        <div>
          <input type="text" name="staff-training-maintenance" placeholder="Describe the method" onChange={handleChange} />
        </div>
      </div>

      <h2>3.1.1.1.2.3 Stocking and Replenishment:</h2>
      <div className="form-section">
        <label>Are training materials regularly stocked with necessary supplies, such as bandages, gloves, and medication?</label>
        <div>
          <input type="radio" name="materials-stocking" value="yes" onChange={handleChange} /> Yes
          <input type="radio" name="materials-stocking" value="no" onChange={handleChange} /> No
        </div>
      </div>

      <div className="form-section">
        <label>How is the inventory of training materials managed, and are there processes in place for replenishing expended or expired items?</label>
        <div>
          <input type="text" name="inventory-management" placeholder="Describe how materials are managed" onChange={handleChange} />
        </div>
      </div>

      <div className="form-section">
        <label>Are stock levels of training materials monitored in real-time or through periodic audits to ensure adequate supply?</label>
        <div>
          <input type="radio" name="stock-monitoring" value="yes" onChange={handleChange} /> Yes
          <input type="radio" name="stock-monitoring" value="no" onChange={handleChange} /> No
        </div>
      </div>

      <div className="form-section">
        <label>Are there established criteria or thresholds for determining when to reorder or replenish training materials?</label>
        <div>
          <input type="radio" name="replenishment-thresholds" value="yes" onChange={handleChange} /> Yes
          <input type="radio" name="replenishment-thresholds" value="no" onChange={handleChange} /> No
        </div>
        <div>
          <input type="text" name="replenishment-details" placeholder="Describe the criteria" onChange={handleChange} />
        </div>
      </div>

      <div className="form-section">
        <label>How are suppliers or vendors selected for purchasing training materials, and are there agreements in place to ensure timely delivery and quality assurance?</label>
        <div>
          <input type="text" name="supplier-selection" placeholder="Describe how suppliers are selected" onChange={handleChange} />
        </div>
      </div>

      <h2>3.1.1.1.2.4 Quality and Suitability:</h2>
      <div className="form-section">
        <label>Are training materials selected based on their quality, durability, and suitability for the intended training purposes?</label>
        <div>
          <input type="radio" name="materials-quality" value="yes" onChange={handleChange} /> Yes
          <input type="radio" name="materials-quality" value="no" onChange={handleChange} /> No
        </div>
      </div>

      <div className="form-section">
        <label>Are there guidelines or criteria for selecting and procuring training materials, taking into account factors such as brand reputation and user feedback?</label>
        <div>
          <input type="radio" name="selection-guidelines" value="yes" onChange={handleChange} /> Yes
          <input type="radio" name="selection-guidelines" value="no" onChange={handleChange} /> No
        </div>
        <div>
          <input type="text" name="guidelines-details" placeholder="Describe the guidelines" onChange={handleChange} />
        </div>
      </div>

      <div className="form-section">
        <label>Are participant feedback and preferences considered when choosing training materials to ensure they meet the diverse needs of learners?</label>
        <div>
          <input type="radio" name="participant-feedback" value="yes" onChange={handleChange} /> Yes
          <input type="radio" name="participant-feedback" value="no" onChange={handleChange} /> No
        </div>
      </div>

      <div className="form-section">
        <label>How are training materials evaluated for effectiveness and relevance to the training objectives and curriculum?</label>
        <div>
          <input type="text" name="materials-evaluation" placeholder="Describe how it's evaluated" onChange={handleChange} />
        </div>
      </div>

      <div className="form-section">
        <label>Are there mechanisms in place for monitoring and addressing any issues or concerns raised regarding the quality or suitability of training materials?</label>
        <div>
          <input type="radio" name="quality-monitoring" value="yes" onChange={handleChange} /> Yes
          <input type="radio" name="quality-monitoring" value="no" onChange={handleChange} /> No
        </div>
        <div>
          <input type="text" name="monitoring-details" placeholder="Describe the mechanisms" onChange={handleChange} />
        </div>
      </div>

      <h2>3.1.1.1.2.5 Training Material Usage:</h2>
      <div className="form-section">
        <label>Are participants trained on how to use and apply various items in the training materials effectively during practical exercises and simulations?</label>
        <div>
          <input type="radio" name="usage-training" value="yes" onChange={handleChange} /> Yes
          <input type="radio" name="usage-training" value="no" onChange={handleChange} /> No
        </div>
      </div>

      <div className="form-section">
        <label>How are training materials integrated into training sessions to facilitate hands-on learning and skill development?</label>
        <div>
          <input type="text" name="materials-integration" placeholder="Describe how it's integrated" onChange={handleChange} />
        </div>
      </div>

      <div className="form-section">
        <label>Are there opportunities for participants to provide feedback on the usability and effectiveness of training materials, and are any improvements or adjustments made based on this feedback?</label>
        <div>
          <input type="radio" name="usability-feedback" value="yes" onChange={handleChange} /> Yes
          <input type="radio" name="usability-feedback" value="no" onChange={handleChange} /> No
        </div>
      </div>

      <div className="form-section">
        <label>Are there guidelines or protocols for storing, handling, and disposing of training materials safely and responsibly?</label>
        <div>
          <input type="radio" name="storage-guidelines" value="yes" onChange={handleChange} /> Yes
          <input type="radio" name="storage-guidelines" value="no" onChange={handleChange} /> No
        </div>
        <div>
          <input type="text" name="storage-protocols" placeholder="Describe the guidelines" onChange={handleChange} />
        </div>
      </div>

      <div className="form-section">
        <label>How are training materials adapted or customized to accommodate the specific needs or preferences of different participant groups?</label>
        <div>
          <input type="text" name="materials-customization" placeholder="Describe how it's adapted/customized" onChange={handleChange} />
        </div>
      </div>

      <h2>3.1.1.1.2.6 Training Material Documentation:</h2>
      <div className="form-section">
        <label>Are records maintained for each training material, including purchase receipts, maintenance logs, and usage reports?</label>
        <div>
          <input type="radio" name="materials-records" value="yes" onChange={handleChange} /> Yes
          <input type="radio" name="materials-records" value="no" onChange={handleChange} /> No
        </div>
      </div>

      <div className="form-section">
        <label>How are training material inventories documented and updated, and are these records easily accessible for reference?</label>
        <div>
          <input type="text" name="inventory-documentation" placeholder="Describe how it's documented and updated" onChange={handleChange} />
        </div>
      </div>

      <div className="form-section">
        <label>Are there procedures in place for tracking the movement and usage of training materials, including transfers between locations or departments?</label>
        <div>
          <input type="radio" name="materials-tracking" value="yes" onChange={handleChange} /> Yes
          <input type="radio" name="materials-tracking" value="no" onChange={handleChange} /> No
        </div>
        <div>
          <input type="text" name="tracking-procedures" placeholder="Describe the procedures" onChange={handleChange} />
        </div>
      </div>

      <div className="form-section">
        <label>How are discrepancies in training material inventories identified and resolved?</label>
        <div>
          <input type="text" name="inventory-discrepancies" placeholder="Describe how discrepancies are identified" onChange={handleChange} />
        </div>
      </div>

      <div className="form-section">
        <label>Are there protocols for documenting incidents or accidents involving training materials and conducting investigations or corrective actions as needed?</label>
        <div>
          <input type="radio" name="incident-documentation" value="yes" onChange={handleChange} /> Yes
          <input type="radio" name="incident-documentation" value="no" onChange={handleChange} /> No
        </div>
        <div>
          <input type="text" name="incident-protocols" placeholder="Describe the protocols" onChange={handleChange} />
        </div>
      </div>

      <h2>3.1.1.1.2.7 Training Material Security:</h2>
      <div className="form-section">
        <label>Are measures in place to secure training materials against theft, loss, or unauthorized access?</label>
        <div>
          <input type="radio" name="security-measures" value="yes" onChange={handleChange} /> Yes
          <input type="radio" name="security-measures" value="no" onChange={handleChange} /> No
        </div>
      </div>

      <div className="form-section">
        <label>How are training materials secured during non-training hours or when not in use, such as overnight or during weekends?</label>
        <div>
          <input type="text" name="security-procedures" placeholder="Describe how training materials are secured" onChange={handleChange} />
        </div>
      </div>

      <div className="form-section">
        <label>Are access controls or restricted areas implemented to prevent unauthorized individuals from accessing training materials?</label>
        <div>
          <input type="radio" name="access-controls" value="yes" onChange={handleChange} /> Yes
          <input type="radio" name="access-controls" value="no" onChange={handleChange} /> No
        </div>
      </div>

      <div className="form-section">
        <label>How are sensitive or valuable training materials protected against damage or tampering, such as by using locks or surveillance cameras?</label>
        <div>
          <input type="text" name="sensitive-materials-protection" placeholder="Describe how training materials are secured" onChange={handleChange} />
        </div>
      </div>

      <div className="form-section">
        <label>Are staff members trained on security protocols and procedures for safeguarding training materials against potential risks or threats?</label>
        <div>
          <input type="radio" name="staff-security-training" value="yes" onChange={handleChange} /> Yes
          <input type="radio" name="staff-security-training" value="no" onChange={handleChange} /> No
        </div>
      </div>

      {/* Submit Button */}
      <button type="submit">Submit</button>

    </form>
  </main>
</div>

  )
}

export default TrainingMaterialsFormPage;