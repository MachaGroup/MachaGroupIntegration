import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';

function AEDTrainingFormPage() {
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
      const formsRef = collection(db, 'forms/Personnel Training and Awareness/AED Training');
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
    <h1>3.1.1.2.7 AED Training Assessment</h1>
    <img src={logo} alt="Logo" className="logo" />
  </header>

  <main className="form-container">
    <form onSubmit={handleSubmit}>
      {/* 3.1.1.2.7 AED Training */}
      <h2>3.1.1.2.7.1 AED Equipment Familiarity and Accessibility:</h2>
      <div className="form-section">
        <label>How familiar are staff members with the location, accessibility, and operation of AEDs installed within the school premises?</label>
        <div>
          <input type="text" name="aed-familiarity" placeholder="Describe how familiar they are" onChange={handleChange} />
        </div>
      </div>

      <div className="form-section">
        <label>Are AED units strategically positioned in easily accessible locations, clearly marked with signage, and consistently maintained in operational condition?</label>
        <div>
          <input type="radio" name="aed-strategic-positioning" value="yes" onChange={handleChange} /> Yes
          <input type="radio" name="aed-strategic-positioning" value="no" onChange={handleChange} /> No
        </div>
      </div>

      <div className="form-section">
        <label>What measures are in place to ensure that AEDs are readily available for prompt deployment in response to sudden cardiac arrest emergencies?</label>
        <div>
          <input type="text" name="aed-availability-measures" placeholder="Describe the measures" onChange={handleChange} />
        </div>
      </div>

      <h2>3.1.1.2.7.2 AED Training Curriculum:</h2>
      <div className="form-section">
        <label>What topics and skills are covered in AED training courses to prepare staff members for effective use of AED devices during cardiac arrest emergencies?</label>
        <div>
          <input type="text" name="aed-training-topics" placeholder="List the topics/skills" onChange={handleChange} />
        </div>
      </div>

      <div className="form-section">
        <label>Are training materials and resources aligned with recognized AED training programs, guidelines, and recommendations from organizations such as the American Heart Association (AHA) or similar accredited institutions?</label>
        <div>
          <input type="radio" name="aed-training-alignment" value="yes" onChange={handleChange} /> Yes
          <input type="radio" name="aed-training-alignment" value="no" onChange={handleChange} /> No
        </div>
      </div>

      <div className="form-section">
        <label>How do AED training courses address key concepts such as AED functionality, electrode pad placement, device prompts interpretation, and hands-free CPR integration?</label>
        <div>
          <input type="text" name="aed-training-key-concepts" placeholder="Describe how they address concepts" onChange={handleChange} />
        </div>
      </div>

      <h2>3.1.1.2.7.3 Hands-on AED Practice and Simulation:</h2>
      <div className="form-section">
        <label>To what extent do AED training sessions incorporate hands-on practice, skills demonstration, and scenario-based simulations to reinforce participant learning and confidence in AED use?</label>
        <div>
          <input type="text" name="aed-practice-sessions" placeholder="Describe the sessions" onChange={handleChange} />
        </div>
      </div>

      <div className="form-section">
        <label>Are staff members provided with opportunities to practice AED deployment, pad placement, device operation, and CPR coordination under simulated cardiac arrest scenarios?</label>
        <div>
          <input type="radio" name="aed-practice-opportunities" value="yes" onChange={handleChange} /> Yes
          <input type="radio" name="aed-practice-opportunities" value="no" onChange={handleChange} /> No
        </div>
      </div>

      <div className="form-section">
        <label>How are AED training simulations tailored to simulate real-life emergency situations and challenge staff members to apply their knowledge and skills effectively?</label>
        <div>
          <input type="text" name="aed-simulation-scenarios" placeholder="Describe the simulations" onChange={handleChange} />
        </div>
      </div>

      <h2>3.1.1.2.7.4 AED Maintenance and Quality Assurance:</h2>
      <div className="form-section">
        <label>What procedures are in place to ensure the regular maintenance, inspection, and testing of AED equipment to verify functionality, battery readiness, and electrode pad integrity?</label>
        <div>
          <input type="text" name="aed-maintenance-procedures" placeholder="Describe the procedures" onChange={handleChange} />
        </div>
      </div>

      <div className="form-section">
        <label>Are designated staff members trained to perform routine checks, replace expired components, and troubleshoot technical issues with AED devices as part of ongoing maintenance protocols?</label>
        <div>
          <input type="radio" name="aed-maintenance-training" value="yes" onChange={handleChange} /> Yes
          <input type="radio" name="aed-maintenance-training" value="no" onChange={handleChange} /> No
        </div>
      </div>

      <div className="form-section">
        <label>How are AED maintenance records, usage logs, and performance indicators monitored and documented to ensure compliance with regulatory requirements and manufacturer recommendations?</label>
        <div>
          <input type="text" name="aed-maintenance-records" placeholder="Describe how they're monitored/documented" onChange={handleChange} />
        </div>
      </div>

      <h2>3.1.1.2.7.5 Integration with Emergency Response Protocols:</h2>
      <div className="form-section">
        <label>How are AED deployment protocols integrated into broader emergency response plans, procedures, and protocols within the school environment?</label>
        <div>
          <input type="text" name="aed-protocol-integration" placeholder="Describe how they're integrated" onChange={handleChange} />
        </div>
      </div>

      <div className="form-section">
        <label>Are staff members trained to recognize the signs of sudden cardiac arrest, activate the emergency response system, and initiate AED use promptly and effectively?</label>
        <div>
          <input type="radio" name="sudden-cardiac-response-training" value="yes" onChange={handleChange} /> Yes
          <input type="radio" name="sudden-cardiac-response-training" value="no" onChange={handleChange} /> No
        </div>
      </div>

      <div className="form-section">
        <label>What coordination mechanisms are in place to facilitate communication, collaboration, and teamwork among responders during AED deployment and CPR administration?</label>
        <div>
          <input type="text" name="aed-coordination-mechanisms" placeholder="Describe the mechanisms" onChange={handleChange} />
        </div>
      </div>

      {/* Submit Button */}
      <button type="submit">Submit</button>

    </form>
  </main>
</div>

  )
}

export default AEDTrainingFormPage;
