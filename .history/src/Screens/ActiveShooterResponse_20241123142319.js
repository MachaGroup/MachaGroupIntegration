import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';

function ActiveShooterResponseFormPage() {
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
      const formsRef = collection(db, 'forms/Personnel Training and Awareness/Active Shooter Response');
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
    <h1>Active Shooter Response Assessment</h1>
  </header>

  <main className="form-container">
    <form>
      {/* 3.1.1.2.8 Active Shooter Response */}
      <h2>Training Curriculum and Content:</h2>
      <div className="form-section">
        <label>What topics and skills are covered in active shooter response training programs, such as situational awareness, threat recognition, decision-making under stress, and survival tactics?</label>
        <div>
          <input type="text" name="ASRTrainingTopics" placeholder="List the topics/skills" />
        </div>
      </div>

      <div className="form-section">
        <label>Are training materials and resources based on recognized active shooter response protocols, guidelines, and recommendations from law enforcement agencies, security experts, or government agencies?</label>
        <div>
          <input type="radio" name="ASRmMterialsAlignment" value="yes" /> Yes
          <input type="radio" name="ASRMaterialsAlignment" value="no" /> No
        </div>
      </div>

      <div className="form-section">
        <label>How do active shooter response training programs address key concepts such as the "Run, Hide, Fight" protocol, evacuation procedures, barricading techniques, and communication strategies during an active shooter incident?</label>
        <div>
          <input type="text" name="ASRKeyConcepts" placeholder="Describe how they address concepts" />
        </div>
      </div>

      <h2>Scenario-based Training and Drills:</h2>
      <div className="form-section">
        <label>To what extent do active shooter response training sessions incorporate scenario-based simulations, tabletop exercises, and live drills to prepare staff members for real-life emergencies?</label>
        <div>
          <input type="text" name="ASRScenarioSimulations" placeholder="Describe how the incorporation" />
        </div>
      </div>

      <div className="form-section">
        <label>Are staff members provided with opportunities to practice response options, decision-making skills, and coordinated actions in simulated active shooter scenarios?</label>
        <div>
          <input type="radio" name="ASRScenarioPractice" value="yes" /> Yes
          <input type="radio" name="ASRScenarioPractice" value="no" /> No
        </div>
      </div>

      <div className="form-section">
        <label>How are active shooter drills conducted to simulate various threat scenarios, test emergency communication systems, and evaluate staff readiness and response effectiveness?</label>
        <div>
          <input type="text" name="ASRDrillConduction" placeholder="Describe how they're conducted" />
        </div>
      </div>

      <h2>Crisis Communication and Coordination:</h2>
      <div className="form-section">
        <label>How are staff members trained to communicate effectively with colleagues, students, and emergency responders during an active shooter incident?</label>
        <div>
          <input type="text" name="ASRCommunicationTraining" placeholder="Describe how they're trained" />
        </div>
      </div>

      <div className="form-section">
        <label>Are communication protocols established to relay critical information, issue alerts, and coordinate response efforts across different areas of the school campus?</label>
        <div>
          <input type="radio" name="ASRCommunicationProtocols" value="yes" /> Yes
          <input type="radio" name="ASRCommunicationProtocols" value="no" /> No
        </div>
      </div>

      <div className="form-section">
        <label>What mechanisms are in place to facilitate communication with law enforcement agencies, emergency dispatch centers, and other external stakeholders during an active shooter crisis?</label>
        <div>
          <input type="text" name="ASRExternalCommunication" placeholder="Describe the mechanisms" />
        </div>
      </div>

      <h2>Emergency Action Planning and Decision-making:</h2>
      <div className="form-section">
        <label>How are staff members trained to assess the situation, make rapid decisions, and implement appropriate response strategies based on the evolving threat environment during an active shooter incident?</label>
        <div>
          <input type="text" name="ASRDecisionTraining" placeholder="Describe how they're assessed" />
        </div>
      </div>

      <div className="form-section">
        <label>Are decision-making frameworks, decision trees, or decision support tools provided to guide staff members in determining the most effective course of action in different scenarios?</label>
        <div>
          <input type="radio" name="ASRDecisionFrameworks" value="yes" /> Yes
          <input type="radio" name="ASRDecisionFrameworks" value="no" /> No
        </div>
      </div>

      <div className="form-section">
        <label>What provisions are in place to empower staff members to take decisive action to protect themselves and others, including options for evacuation, lockdown, sheltering, or countermeasures?</label>
        <div>
          <input type="text" name="ASRActionProvisions" placeholder="Describe the provisions" />
        </div>
      </div>

      <h2>Post-Incident Support and Debriefing:</h2>
      <div className="form-section">
        <label>What resources and support services are available to staff members following an active shooter incident, including psychological first aid, counseling, and debriefing sessions?</label>
        <div>
          <input type="text" name="ASRSupportResources" placeholder="Describe the resources/services" />
        </div>
      </div>

      <div className="form-section">
        <label>Are post-incident debriefings conducted to review response actions, identify lessons learned, address concerns, and implement improvements to emergency preparedness plans and procedures?</label>
        <div>
          <input type="radio" name="ASRDebriefings" value="yes" /> Yes
          <input type="radio" name="ASRDebriefings" value="no" /> No
        </div>
      </div>

      <div className="form-section">
        <label>How are staff members encouraged to share their experiences, provide feedback on training effectiveness, and contribute to the continuous improvement of active shooter response protocols?</label>
        <div>
          <input type="text" name="ASRFeedbackContribution" placeholder="Describe how they're encouraged" />
        </div>
      </div>
    </form>
  </main>
</div>

  )
}

export default ActiveShooterResponseFormPage;