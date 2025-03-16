import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

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
  const handleBack = async () => {
    if (formData && buildingId) { // Check if formData and buildingId exist
      try {
        const buildingRef = doc(db, 'Buildings', buildingId);
        const formsRef = collection(db, 'forms/Personnel Training and Awareness/Response Protocols');
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
      const formsRef = collection(db, 'forms/Personnel Training and Awareness/Response Protocols');
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
          <input type="text" name="immediateActionDescription" placeholder="Describe the actions" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>Are response protocols established to guide staff members in promptly assessing the situation, activating the appropriate emergency response procedures, and initiating initial response actions to mitigate risks and ensure the safety of occupants?</label>
        <div>
          <input type="text" name="protocolsDetails" placeholder="Describe the protocols" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>How do response protocols prioritize life safety, property protection, and incident stabilization to minimize harm, prevent escalation, and facilitate the orderly evacuation or sheltering of individuals as necessary?</label>
        <div>
          <input type="text" name="protocolPrioritization" placeholder="Describe how they prioritize" onChange={handleChange}/>
        </div>
      </div>

      <h2>3.1.1.2.9.2 Decision-making and Command Structure:</h2>
      <div className="form-section">
        <label>How are decision-making responsibilities, authority levels, and incident command structures defined and communicated within the school organization during emergency situations?</label>
        <div>
          <input type="text" name="decisionMakingStructure" placeholder="Describe the decision-making" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>Are staff members trained to follow established chain of command protocols, communicate critical information effectively, and coordinate response efforts with designated incident commanders, safety officers, or emergency coordinators?</label>
        <div>
          <input type="radio" name="chainOfCommandTraining" value="yes" onChange={handleChange}/> Yes
          <input type="radio" name="chainOfCommandTraining" value="no" onChange={handleChange}/> No
          <textarea className='comment-box' name="chainOfCommandTrainingComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
        </div>
      </div>

      <div className="form-section">
        <label>What provisions are in place to ensure clear lines of communication, rapid decision-making, and effective coordination among responders, stakeholders, and external agencies involved in emergency response operations?</label>
        <div>
          <input type="text" name="coordinationProvisions" placeholder="Describe the provisions" onChange={handleChange}/>
        </div>
      </div>

      <h2>3.1.1.2.9.3 Emergency Notification and Activation:</h2>
      <div className="form-section">
        <label>How are emergency response procedures initiated and communicated to staff members, students, and visitors within the school environment?</label>
        <div>
          <input type="text" name="emergencyCommunication" placeholder="Describe how they're initiated" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>Are notification systems, alert mechanisms, and communication channels utilized to issue timely warnings, alarms, or instructions to occupants in the event of an emergency?</label>
        <div>
          <input type="radio" name="notificationSystems" value="yes" onChange={handleChange}/> Yes
          <input type="radio" name="notificationSystems" value="no" onChange={handleChange}/> No
          <textarea className='comment-box' name="notificationSystemsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
        </div>
      </div>

      <div className="form-section">
        <label>What protocols are followed to activate emergency response teams, mobilize resources, and implement predetermined action plans based on the nature, severity, and location of the emergency incident?</label>
        <div>
          <input type="text" name="responseTeamActivation" placeholder="Describe the protocols" onChange={handleChange}/>
        </div>
      </div>

      <h2>3.1.1.2.9.4 Resource Allocation and Utilization:</h2>
      <div className="form-section">
        <label>How are resources, equipment, and facilities allocated and utilized during emergency response operations to support incident management, victim care, and logistical needs?</label>
        <div>
          <input type="text" name="resourceAllocation" placeholder="Describe how they're utilized" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>Are resource management protocols established to prioritize resource allocation, track resource usage, and request additional support from external agencies or mutual aid partners as needed?</label>
        <div>
          <input type="radio" name="resourceManagementProtocols" value="yes" onChange={handleChange}/> Yes
          <input type="radio" name="resourceManagementProtocols" value="no" onChange={handleChange}/> No
          <textarea className='comment-box' name="resourceManagementProtocolsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
        </div>
      </div>

      <div className="form-section">
        <label>What mechanisms are in place to ensure the availability, accessibility, and readiness of essential resources, including emergency supplies, medical equipment, communication devices, and specialized personnel, to support response efforts effectively?</label>
        <div>
          <input type="text" name="essentialResourcesReadiness" placeholder="Describe the mechanisms" onChange={handleChange}/>
        </div>
      </div>

      <h2>3.1.1.2.9.5 Situational Assessment and Information Gathering:</h2>
      <div className="form-section">
        <label>How do response protocols facilitate the collection, verification, and dissemination of critical information, situational updates, and incident intelligence to inform decision-making and response actions?</label>
        <div>
          <input type="text" name="informationGathering" placeholder="Describe how they facilitate" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>Are staff members trained to conduct rapid situational assessments, gather relevant data, and report observations, hazards, and emerging threats to incident commanders or designated authorities?</label>
        <div>
          <input type="radio" name="situationalAssessmentTraining" value="yes" onChange={handleChange}/> Yes
          <input type="radio" name="situationalAssessmentTraining" value="no" onChange={handleChange}/> No
          <textarea className='comment-box' name="situationalAssessmentTrainingComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
        </div>
      </div>

      <div className="form-section">
        <label>What procedures are in place to integrate information from multiple sources, assess the impact of the emergency incident, and adapt response strategies based on changing circumstances, evolving threats, or new developments?</label>
        <div>
          <input type="text" name="informationIntegration" placeholder="Describe the procedures" onChange={handleChange}/>
        </div>
      </div>

      <button type='submit'>Submit</button>
    </form>
  </main>
</div>

  )
}

export default ResponseProtocols2FormPage;