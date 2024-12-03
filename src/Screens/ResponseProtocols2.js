import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';

function ResponseProtocols2FormPage() {
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
      const formsRef = collection(db, 'forms/Personnel Training and Awareness/Response Protocols 2');
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
    <h1>3.1.1.2.9 Response Protocols Assessment</h1>
    <img src={logo} alt="Logo" className="logo" />
  </header>

  <main className="form-container">
    <form onSubmit={handleSubmit}>
      {/* 3.1.1.2.9 Response Protocols */}
      <h2>3.1.1.2.9.1 Immediate Action Procedures:</h2>
      <div className="form-section">
        <label>What immediate actions are staff members trained to take in response to different types of emergencies, such as medical emergencies, fire incidents, hazardous material spills, or security threats?</label>
        <div>
          <input type="text" name="immediate-action-description" placeholder="Describe the actions" onChange={handleChange} />
        </div>
      </div>

      <div className="form-section">
        <label>Are response protocols established to guide staff members in promptly assessing the situation, activating the appropriate emergency response procedures, and initiating initial response actions to mitigate risks and ensure the safety of occupants?</label>
        <div>
          <input type="radio" name="response-protocols-established" value="yes" onChange={handleChange} /> Yes
          <input type="radio" name="response-protocols-established" value="no" onChange={handleChange} /> No
        </div>
        <div>
          <input type="text" name="protocols-details" placeholder="Describe the protocols" onChange={handleChange} />
        </div>
      </div>

      <div className="form-section">
        <label>How do response protocols prioritize life safety, property protection, and incident stabilization to minimize harm, prevent escalation, and facilitate the orderly evacuation or sheltering of individuals as necessary?</label>
        <div>
          <input type="text" name="protocol-prioritization" placeholder="Describe how they prioritize" onChange={handleChange} />
        </div>
      </div>

      <h2>3.1.1.2.9.2 Decision-making and Command Structure:</h2>
      <div className="form-section">
        <label>How are decision-making responsibilities, authority levels, and incident command structures defined and communicated within the school organization during emergency situations?</label>
        <div>
          <input type="text" name="decision-making-structure" placeholder="Describe the decision-making" onChange={handleChange} />
        </div>
      </div>

      <div className="form-section">
        <label>Are staff members trained to follow established chain of command protocols, communicate critical information effectively, and coordinate response efforts with designated incident commanders, safety officers, or emergency coordinators?</label>
        <div>
          <input type="radio" name="chain-of-command-training" value="yes" onChange={handleChange} /> Yes
          <input type="radio" name="chain-of-command-training" value="no" onChange={handleChange} /> No
        </div>
      </div>

      <div className="form-section">
        <label>What provisions are in place to ensure clear lines of communication, rapid decision-making, and effective coordination among responders, stakeholders, and external agencies involved in emergency response operations?</label>
        <div>
          <input type="text" name="coordination-provisions" placeholder="Describe the provisions" onChange={handleChange} />
        </div>
      </div>

      <h2>3.1.1.2.9.3 Emergency Notification and Activation:</h2>
      <div className="form-section">
        <label>How are emergency response procedures initiated and communicated to staff members, students, and visitors within the school environment?</label>
        <div>
          <input type="text" name="emergency-communication" placeholder="Describe how they're initiated" onChange={handleChange} />
        </div>
      </div>

      <div className="form-section">
        <label>Are notification systems, alert mechanisms, and communication channels utilized to issue timely warnings, alarms, or instructions to occupants in the event of an emergency?</label>
        <div>
          <input type="radio" name="notification-systems" value="yes" onChange={handleChange} /> Yes
          <input type="radio" name="notification-systems" value="no" onChange={handleChange} /> No
        </div>
      </div>

      <div className="form-section">
        <label>What protocols are followed to activate emergency response teams, mobilize resources, and implement predetermined action plans based on the nature, severity, and location of the emergency incident?</label>
        <div>
          <input type="text" name="response-team-activation" placeholder="Describe the protocols" onChange={handleChange} />
        </div>
      </div>

      <h2>3.1.1.2.9.4 Resource Allocation and Utilization:</h2>
      <div className="form-section">
        <label>How are resources, equipment, and facilities allocated and utilized during emergency response operations to support incident management, victim care, and logistical needs?</label>
        <div>
          <input type="text" name="resource-allocation" placeholder="Describe how they're utilized" onChange={handleChange} />
        </div>
      </div>

      <div className="form-section">
        <label>Are resource management protocols established to prioritize resource allocation, track resource usage, and request additional support from external agencies or mutual aid partners as needed?</label>
        <div>
          <input type="radio" name="resource-management-protocols" value="yes" onChange={handleChange} /> Yes
          <input type="radio" name="resource-management-protocols" value="no" onChange={handleChange} /> No
        </div>
      </div>

      <div className="form-section">
        <label>What mechanisms are in place to ensure the availability, accessibility, and readiness of essential resources, including emergency supplies, medical equipment, communication devices, and specialized personnel, to support response efforts effectively?</label>
        <div>
          <input type="text" name="essential-resources-readiness" placeholder="Describe the mechanisms" onChange={handleChange} />
        </div>
      </div>

      <h2>3.1.1.2.9.5 Situational Assessment and Information Gathering:</h2>
      <div className="form-section">
        <label>How do response protocols facilitate the collection, verification, and dissemination of critical information, situational updates, and incident intelligence to inform decision-making and response actions?</label>
        <div>
          <input type="text" name="information-gathering" placeholder="Describe how they facilitate" onChange={handleChange} />
        </div>
      </div>

      <div className="form-section">
        <label>Are staff members trained to conduct rapid situational assessments, gather relevant data, and report observations, hazards, and emerging threats to incident commanders or designated authorities?</label>
        <div>
          <input type="radio" name="situational-assessment-training" value="yes" onChange={handleChange} /> Yes
          <input type="radio" name="situational-assessment-training" value="no" onChange={handleChange} /> No
        </div>
      </div>

      <div className="form-section">
        <label>What procedures are in place to integrate information from multiple sources, assess the impact of the emergency incident, and adapt response strategies based on changing circumstances, evolving threats, or new developments?</label>
        <div>
          <input type="text" name="information-integration" placeholder="Describe the procedures" onChange={handleChange} />
        </div>
      </div>

      {/* Submit Button */}
      <button type="submit">Submit</button>

    </form>
  </main>
</div>

  )
}

export default ResponseProtocols2FormPage;