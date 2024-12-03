import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png'; // Adjust the path if necessary
import Navbar from "./Navbar";

function ResponseProtocolsFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding(); // Access and update buildingId from context
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

    const handleBack = () => {
        navigate(-1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!buildingId) {
            alert('Building ID is missing. Please start from the Building Information page.');
            return;
        }


        try {
          // Create a document reference to the building in the 'Buildings' collection
          const buildingRef = doc(db, 'Buildings', buildingId); 

          // Store the form data in the specified Firestore structure
          const formsRef = collection(db, 'forms/Personnel Training and Awareness/Emergency Response Protocols');
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
    <h1>Response Protocols Assessment</h1>
    <img src={logo} alt="Logo" className="logo" />
  </header>

  <main className="form-container">
    <form onSubmit={handleSubmit}>
      {/* 3.1.1.1.5 Response Protocols */}
      <h2>Protocol Development:</h2>
      <div className="form-section">
        <label>How are emergency response protocols developed, and are they based on recognized standards, best practices, or regulatory requirements?</label>
        <div>
          <input type="text" name="protocolDevelopmentDescription" placeholder="Describe how protocols are developed" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>Are response protocols tailored to address specific types of emergencies or threats commonly faced by the organization?</label>
        <div>
          <input type="text" name="specificEmergencyTypes" placeholder="Describe the specific types" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>What considerations are taken into account when determining the appropriate actions and procedures to include in response protocols?</label>
        <div>
          <input type="text" name="protocolConsiderations" placeholder="Describe the considerations" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>Are response protocols reviewed and updated periodically to reflect changes in organizational needs, emerging threats, or lessons learned from incidents?</label>
        <div>
          <input type="radio" name="protocolReview" value="yes" onChange={handleChange}/> Yes
          <input type="radio" name="protocolReview" value="no" onChange={handleChange}/> No
        </div>
      </div>

      <h2>Immediate Actions:</h2>
      <div className="form-section">
        <label>What immediate actions are outlined in the response protocols for various types of emergencies (e.g., evacuation, shelter-in-place, medical emergencies)?</label>
        <div>
          <input type="text" name="immediateActions" placeholder="Describe the actions" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>Are staff members trained on the specific steps to take during the initial moments of an emergency, such as alerting others, assessing the situation, and taking protective measures?</label>
        <div>
          <input type="radio" name="initialResponseTraining" value="yes" onChange={handleChange}/> Yes
          <input type="radio" name="initialResponseTraining" value="no" onChange={handleChange}/> No
        </div>
      </div>

      <div className="form-section">
        <label>How are response protocols communicated to staff members to ensure they are aware of and understand their roles and responsibilities?</label>
        <div>
          <input type="text" name="protocolCommunication" placeholder="Describe how protocols are communicated" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>Are there designated individuals or teams responsible for initiating immediate actions in different areas or departments of the organization?</label>
        <div>
          <input type="text" name="initiatorTeams" placeholder="List the designated individuals/teams" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>How are response protocols coordinated with external emergency services (e.g., fire department, law enforcement) to facilitate a timely and effective response?</label>
        <div>
          <input type="text" name="externalCoordination" placeholder="Describe how protocols are coordinated" onChange={handleChange}/>
        </div>
      </div>

      <h2>Communication Procedures:</h2>
      <div className="form-section">
        <label>What communication procedures are included in the response protocols for disseminating information and instructions during emergencies?</label>
        <div>
          <input type="text" name="communicationProcedures" placeholder="Describe the communication procedures" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>Are there established communication channels and protocols for notifying staff members, occupants, and relevant stakeholders about emergency situations?</label>
        <div>
          <input type="text" name="notificationChannelsDetails" placeholder="Describe the channels/protocols" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>How are communication systems and technologies utilized to ensure rapid and reliable dissemination of critical information?</label>
        <div>
          <input type="text" name="communicationSystems" placeholder="Describe how these ensure rapid and reliability" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>Are backup communication methods or redundancy measures in place to address potential failures or disruptions in primary communication channels?</label>
        <div>
          <input type="text" name="backupMethods" placeholder="Describe the backup methods/redundancy" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>How are staff members trained on effective communication practices during emergencies, such as using clear and concise language, active listening, and relaying accurate information?</label>
        <div>
          <input type="text" name="communicationTraining" placeholder="Describe how they're trained" onChange={handleChange}/>
        </div>
      </div>

      <h2>Decision-making Authority:</h2>
      <div className="form-section">
        <label>How is decision-making authority delineated within the response protocols, and are there clear lines of authority and accountability during emergency situations?</label>
        <div>
          <input type="text" name="decisionAuthority" placeholder="Describe the decision-making authority" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>Are staff members trained on the decision-making framework outlined in the response protocols, including when to escalate issues or seek additional support?</label>
        <div>
          <input type="radio" name="decisionFrameworkTraining" value="yes" onChange={handleChange}/> Yes
          <input type="radio" name="decisionFrameworkTraining" value="no" onChange={handleChange}/> No
        </div>
      </div>

      <div className="form-section">
        <label>What mechanisms are in place to empower staff members to make informed decisions and take appropriate actions based on the situational context and available information?</label>
        <div>
          <input type="text" name="empowermentMechanisms" placeholder="Describe the decision-making authority" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>Are there protocols for delegating decision-making authority to designated individuals or teams in the event of leadership absence or incapacitation?</label>
        <div>
          <input type="text" name="delegationDetails" placeholder="Describe the protocols" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>How are decisions documented and communicated within the organization to ensure transparency and accountability?</label>
        <div>
          <input type="text" name="decisionDocumentation" placeholder="Describe how decisions are documented" onChange={handleChange}/>
        </div>
      </div>

      <h2>Training and Drills:</h2>
      <div className="form-section">
        <label>How are staff members trained on the response protocols, and what methods or formats are used to deliver training (e.g., classroom sessions, practical exercises)?</label>
        <div>
          <input type="text" name="trainingMethods" placeholder="Describe how staff members are trained" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>Are scenario-based drills conducted to simulate emergency situations and allow staff members to practice implementing response protocols in a realistic setting?</label>
        <div>
          <input type="radio" name="scenarioDrills" value="yes" onChange={handleChange}/> Yes
          <input type="radio" name="scenarioDrills" value="no" onChange={handleChange}/> No
        </div>
      </div>

      <div className="form-section">
        <label>How often are training sessions and drills conducted to reinforce response protocols and maintain readiness among staff members?</label>
        <div>
          <input type="text" name="drillFrequency" placeholder="Describe how often" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>Are debriefing sessions held after training exercises to review performance, identify areas for improvement, and incorporate lessons learned into future training activities?</label>
        <div>
          <input type="radio" name="debriefingSessions" value="yes" onChange={handleChange}/> Yes
          <input type="radio" name="debriefingSessions" value="no" onChange={handleChange}/> No
        </div>
      </div>

      <div className="form-section">
        <label>What measures are in place to ensure that staff members retain knowledge and skills related to response protocols over time, including refresher training and ongoing reinforcement?</label>
        <div>
          <input type="text" name="retentionMeasures" placeholder="Describe the measures" onChange={handleChange}/>
        </div>
      </div>

      <h2>Documentation and Evaluation:</h2>
      <div className="form-section">
        <label>How are response protocols documented and disseminated to ensure accessibility and consistency across the organization?</label>
        <div>
          <input type="text" name="protocolDocumentation" placeholder="Describe how protocols are documented" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>Are response protocols regularly reviewed and evaluated to assess their effectiveness, identify gaps or weaknesses, and make necessary revisions?</label>
        <div>
          <input type="text" name="reviewDetails" placeholder="Describe the protocols" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>What metrics or indicators are used to measure the performance and outcomes of response protocols during actual emergencies or drills?</label>
        <div>
          <input type="text" name="performanceMetrics" placeholder="Describe the metrics/indicators" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>Are post-incident analyses conducted to evaluate the implementation of response protocols, identify opportunities for improvement, and inform revisions?</label>
        <div>
          <input type="radio" name="postIncidentAnalyses" value="yes" onChange={handleChange}/> Yes
          <input type="radio" name="postIncidentAnalyses" value="no" onChange={handleChange}/> No
        </div>
      </div>

      <div className="form-section">
        <label>How are lessons learned from response protocols shared within the organization to enhance preparedness and resilience against future emergencies?</label>
        <div>
          <input type="text" name="lessonsLearnedSharing" placeholder="Describe how lessons are learned" onChange={handleChange}/>
        </div>
      </div>

      <button type='submit'>Submit</button>
    </form>
  </main>
</div>

  )
}

export default ResponseProtocolsFormPage;