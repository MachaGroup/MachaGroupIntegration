import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png'; // Adjust the path if necessary
import Navbar from "./Navbar";

function ScenarioBasedTrainingFormPage() {
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

    //back button
    const handleBack = async () => {
      if (formData && buildingId) { // Check if formData and buildingId exist
        try {
          const buildingRef = doc(db, 'Buildings', buildingId);
          const formsRef = collection(db, 'forms/Personnel Training and Awareness/Scenario Based Training');
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
            alert('Building ID is missing. Please start from the Building Information page.');
            return;
        }


        try {
          // Create a document reference to the building in the 'Buildings' collection
          const buildingRef = doc(db, 'Buildings', buildingId); 

          // Store the form data in the specified Firestore structure
          const formsRef = collection(db, 'forms/Personnel Training and Awareness/Scenario Based Training');
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
    <h1>3.1.1.2.1 Scenario-Based Training Assessment</h1>
    <img src={logo} alt="Logo" className="logo" />
  </header>

  <main className="form-container">
    <form onSubmit={handleSubmit}>
      {/* 3.1.1.2.1 Scenario-Based Training */}
      <h2>3.1.1.2.1.1 Training Scenario Development:</h2>
      <div className="form-section">
        <label>How are scenarios for scenario-based training developed, and are they based on realistic and relevant emergency situations?</label>
        <div>
          <input type="text" name="scenarioDevelopmentDescription" placeholder="Describe the development of the scenarios" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>Are scenarios tailored to address specific threats or hazards that staff members may encounter in their roles or environments?</label>
        <div>
          <input type="radio" name="scenarioSpecificity" value="yes" onChange={handleChange}/> Yes
          <input type="radio" name="scenarioSpecificity" value="no" onChange={handleChange}/> No
        </div>
        <div>
          <input type="text" name="scenarioSpecificityComment" placeholder="Comments" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>What considerations are taken into account when designing scenarios, such as the organization's risk profile, industry standards, or regulatory requirements?</label>
        <div>
          <input type="text" name="scenarioDesignConsiderations" placeholder="List/Describe the considerations" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>Are scenarios categorized based on severity levels or types of emergencies to ensure comprehensive training coverage?</label>
        <div>
          <input type="radio" name="scenarioCategorization" value="yes" onChange={handleChange}/> Yes
          <input type="radio" name="scenarioCategorization" value="no" onChange={handleChange}/> No
        </div>
        <div>
          <input type="text" name="scenarioCategorizationComment" placeholder="Comments" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>How are scenario development processes documented and reviewed to maintain consistency and quality?</label>
        <div>
          <input type="text" name="scenarioDocumentationProcess" placeholder="Describe the processes" onChange={handleChange}/>
        </div>
      </div>

      <h2>3.1.1.2.1.2 Scenario Implementation:</h2>
      <div className="form-section">
        <label>How are scenario-based training sessions conducted, and what methods or tools are used to simulate emergency situations?</label>
        <div>
          <input type="text" name="scenarioSessionConduct" placeholder="Describe the sessions and methods" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>Are scenarios integrated into tabletop exercises, simulations, or full-scale drills to provide a range of training experiences?</label>
        <div>
          <input type="radio" name="scenarioIntegration" value="yes" onChange={handleChange}/> Yes
          <input type="radio" name="scenarioIntegration" value="no" onChange={handleChange}/> No
        </div>
        <div>
        <input type="text" name="scenarioIntegrationComment" placeholder="Comments" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>What resources or support are provided to ensure the safe and effective execution of scenario-based training sessions?</label>
        <div>
          <input type="text" name="scenarioResources" placeholder="List the resources" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>Are contingency plans in place to address unexpected issues or challenges that may arise during scenario implementation?</label>
        <div>
          <input type="radio" name="scenarioContingencyPlans" value="yes" onChange={handleChange}/> Yes
          <input type="radio" name="scenarioContingencyPlans" value="no" onChange={handleChange}/> No
        </div>
        <div>
          <input type="text" name="scenarioContingencyPlansComment" placeholder="Comments" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>How are scenarios modified or updated over time to reflect changes in organizational needs or emerging threats?</label>
        <div>
          <input type="text" name="scenarioUpdates" placeholder="Describe how scenarios are modified/updated" onChange={handleChange}/>
        </div>
      </div>

      <h2>3.1.1.2.1.3 Participant Engagement:</h2>
      <div className="form-section">
        <label>How are staff members engaged and involved in scenario-based training exercises to maximize learning outcomes?</label>
        <div>
          <input type="text" name="participantEngagement" placeholder="Describe how staff members are involved" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>Are participants encouraged to actively participate in scenarios by making decisions, taking actions, and communicating effectively with team members?</label>
        <div>
          <input type="radio" name="activeParticipation" value="yes" onChange={handleChange}/> Yes
          <input type="radio" name="activeParticipation" value="no" onChange={handleChange}/> No
        </div>
        <div>
          <input type="text" name="activeParticipationComment" placeholder="Comments" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>What measures are in place to address any concerns or anxieties that staff members may have about participating in scenario-based training?</label>
        <div>
          <input type="text" name="participantConcernsMeasures" placeholder="Describe the measures" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>Are scenarios designed to promote teamwork, collaboration, and effective communication among participants?</label>
        <div>
          <input type="radio" name="scenarioTeamwork" value="yes" onChange={handleChange}/> Yes
          <input type="radio" name="scenarioTeamwork" value="no" onChange={handleChange}/> No
        </div>
        <div>
          <input type="text" name="scenarioTeamworkComment" placeholder="Comments" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>How are participant feedback and suggestions incorporated into the design and delivery of scenario-based training activities?</label>
        <div>
          <input type="text" name="feedbackIntegration" placeholder="Describe how the feedback is included" onChange={handleChange}/>
        </div>
      </div>

      <h2>3.1.1.2.1.4 Learning Objectives:</h2>
      <div className="form-section">
        <label>What specific learning objectives are targeted through scenario-based training, and how are these objectives communicated to participants?</label>
        <div>
          <input type="text" name="learningObjectives" placeholder="Describe the learning objectives" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>Are scenarios designed to reinforce key concepts, procedures, or protocols related to emergency response and crisis management?</label>
        <div>
          <input type="radio" name="reinforceKeyConcepts" value="yes" onChange={handleChange}/> Yes
          <input type="radio" name="reinforceKeyConcepts" value="no" onChange={handleChange}/> No
        </div>
        <div>
          <input type="text" name="reinforceKeyConceptsComment" placeholder="Comments" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>How are learning outcomes assessed and evaluated to ensure that participants have achieved the desired competencies and skills?</label>
        <div>
          <input type="text" name="outcomesEvaluation" placeholder="Describe how learning outcomes are assessed" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>Are performance metrics used to measure the effectiveness of scenario-based training in meeting established learning objectives?</label>
        <div>
          <input type="radio" name="performanceMetrics" value="yes" onChange={handleChange}/> Yes
          <input type="radio" name="performanceMetrics" value="no" onChange={handleChange}/> No
        </div>
        <div>
          <input type="text" name="performanceMetricsComment" placeholder="Comments" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>How are participant knowledge and skills assessed before and after scenario-based training to measure improvement and identify areas for further development?</label>
        <div>
          <input type="text" name="knowledgeAssessment" placeholder="Describe how knowledge and skills are assessed" onChange={handleChange}/>
        </div>
      </div>

      <h2>3.1.1.2.1.5 Debriefing and Feedback:</h2>
      <div className="form-section">
        <label>Is there a structured process for debriefing participants following scenario-based training exercises, and how are debriefing sessions facilitated?</label>
        <div>
          <input type="text" name="debriefingSessions" placeholder="Describe the process and how sessions are facilitated" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>Are participants provided with constructive feedback and opportunities for reflection on their performance during scenarios?</label>
        <div>
          <input type="radio" name="constructiveFeedback" value="yes" onChange={handleChange}/> Yes
          <input type="radio" name="constructiveFeedback" value="no" onChange={handleChange}/> No
        </div>
        <div>
          <input type="text" name="constructiveFeedbackComment" placeholder="Comments" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>How are lessons learned from scenario-based training exercises documented and incorporated into future training plans or improvements?</label>
        <div>
          <input type="text" name="lessonsLearnedDocumentation" placeholder="Describe how lessons are documented" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>Are debriefing sessions used to identify strengths, weaknesses, and areas for improvement in individual and team performance?</label>
        <div>
          <input type="radio" name="debriefingImprovement" value="yes" onChange={handleChange}/> Yes
          <input type="radio" name="debriefingImprovement" value="no" onChange={handleChange}/> No
        </div>
        <div>
          <input type="text" name="debriefingImprovementComment" placeholder="Comments" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>What mechanisms are in place to ensure that feedback from participants is used to enhance the effectiveness and relevance of scenario-based training activities?</label>
        <div>
          <input type="text" name="feedbackEnhancementMechanisms" placeholder="Describe the mechanisms" onChange={handleChange}/>
        </div>
      </div>

      <h2>3.1.1.2.1.6 Scenario Variation and Complexity:</h2>
      <div className="form-section">
        <label>How are scenarios varied in terms of complexity, duration, and intensity to provide a diverse training experience?</label>
        <div>
          <input type="text" name="scenarioVariation" placeholder="Describe how scenarios vary" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>Are scenarios adjusted based on the skill levels, roles, and responsibilities of participants to ensure appropriate challenge and engagement?</label>
        <div>
          <input type="radio" name="scenarioAdjustment" value="yes" onChange={handleChange}/> Yes
          <input type="radio" name="scenarioAdjustment" value="no" onChange={handleChange}/> No
        </div>
        <div>
          <input type="text" name="scenarioAdjustmentComment" placeholder="Comments" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>What strategies are used to gradually increase the complexity of scenarios as participants progress through training programs?</label>
        <div>
          <input type="text" name="complexityStrategies" placeholder="Describe the strategies" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>Are scenarios designed to simulate realistic stressors and environmental factors that participants may encounter during actual emergencies?</label>
        <div>
          <input type="radio" name="realisticSimulations" value="yes" onChange={handleChange}/> Yes
          <input type="radio" name="realisticSimulations" value="no" onChange={handleChange}/> No
        </div>
        <div>
          <input type="text" name="realisticSimulationsComment" placeholder="Comments" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>How are potential ethical, legal, or psychological considerations addressed when developing and implementing complex scenarios?</label>
        <div>
          <input type="text" name="considerationMeasures" placeholder="Describe how considerations are addressed" onChange={handleChange}/>
        </div>
      </div>

      <h2>3.1.1.2.1.7 Integration with Emergency Plans:</h2>
      <div className="form-section">
        <label>How are scenario-based training activities aligned with the organization's emergency response plans, procedures, and protocols?</label>
        <div>
          <input type="text" name="integrationEmergencyPlans" placeholder="Describe how activities align" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>Are scenarios designed to test specific components of emergency plans, such as evacuation procedures, communication protocols, or incident command structures?</label>
        <div>
          <input type="radio" name="testEmergencyComponents" value="yes" onChange={handleChange}/> Yes
          <input type="radio" name="testEmergencyComponents" value="no" onChange={handleChange}/> No
        </div>
        <div>
          <input type="text" name="testEmergencyComponentsComment" placeholder="Comments" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>What measures are in place to ensure that lessons learned from scenario-based training exercises are incorporated into emergency planning and preparedness efforts?</label>
        <div>
          <input type="text" name="trainingLessonsMeasures" placeholder="Describe the measures" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>Are emergency response teams or personnel involved in scenario development and implementation to ensure alignment with operational needs and priorities?</label>
        <div>
          <input type="radio" name="emergencyTeamInvolvement" value="yes" onChange={handleChange}/> Yes
          <input type="radio" name="emergencyTeamInvolvement" value="no" onChange={handleChange}/> No
        </div>
        <div>
          <input type="text" name="emergencyTeamInvolvementComment" placeholder="Comments" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>How are scenario-based training outcomes used to validate and enhance the effectiveness of emergency plans and procedures?</label>
        <div>
          <input type="text" name="outcomesValidation" placeholder="Describe how the outcomes are used to validate" onChange={handleChange}/>
        </div>
      </div>

      <button type='submit'>Submit</button>
    </form>
  </main>
</div>

  )
}

export default ScenarioBasedTrainingFormPage;