import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function SafetyWorkshopsFormPage() {
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
      const formsRef = collection(db, 'forms/Personnel Training and Awareness/Safety Workshop');
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
            <h1>Safety Workshops Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 3.3.1.1.1 Safety Workshops */}
                <h2>Event Planning and Coordination:</h2>
                <div className="form-section">
                    <label>How are safety workshops and educational events for parents planned, organized, and coordinated within the school or educational institution?</label>
                    <div>
                        <input type="text" name="workshopPlanningProcess" placeholder="Describe how they're planned" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>What criteria are used to select topics, speakers, and formats for parent education events, and how are they aligned with the safety needs and concerns of the school community?</label>
                    <div>
                        <input type="text" name="selectionCriteriaTopicsSpeakers" placeholder="Describe the criteria" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are parent education events integrated into broader community engagement initiatives, school calendars, or existing parent involvement programs?</label>
                    <div>
                        <input type="radio" name="eventsIntegratedWithPrograms" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="eventsIntegratedWithPrograms" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>Content and Curriculum:</h2>
                <div className="form-section">
                    <label>What specific safety topics are covered in parent education events, such as emergency preparedness, home safety, cyber safety, or substance abuse prevention?</label>
                    <div>
                        <input type="text" name="safetyTopicsCovered" placeholder="Describe the topics" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>How is the content of safety workshops developed or curated to ensure relevance, accuracy, and effectiveness in addressing the information needs and concerns of parents?</label>
                    <div>
                        <input type="text" name="contentDevelopmentProcess" placeholder="Describe how it's developed" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are materials, resources, or take-home materials provided to parents to reinforce key safety messages and facilitate ongoing learning beyond the events?</label>
                    <div>
                        <input type="text" name="materialsProvidedToParents" placeholder="Describe which is provided" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Engagement Strategies:</h2>
                <div className="form-section">
                    <label>How are efforts made to encourage parent participation and engagement in safety workshops and educational events?</label>
                    <div>
                        <input type="text" name="effortsToEncourageParticipation" placeholder="Describe the efforts" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>What communication channels, outreach methods, or incentives are used to promote parent attendance, solicit feedback, and gauge interest in specific safety topics or initiatives?</label>
                    <div>
                        <input type="text" name="communicationAndOutreachChannels" placeholder="Describe the channels" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are parent education events designed to accommodate diverse schedules, preferences, and accessibility needs of parents, such as offering multiple session times, language options, or virtual participation?</label>
                    <div>
                        <input type="radio" name="eventsAccommodateDiverseNeeds" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="eventsAccommodateDiverseNeeds" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>Interactive Learning and Skill-building:</h2>
                <div className="form-section">
                    <label>How are parent education events structured to facilitate interactive learning, discussion, and skill-building among participants?</label>
                    <div>
                        <input type="text" name="interactiveLearningStructure" placeholder="Describe how events are structured" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are workshops designed to incorporate hands-on activities, group discussions, case studies, or role-playing exercises to deepen understanding and retention of safety concepts?</label>
                    <div>
                        <input type="radio" name="handsOnActivitiesIncluded" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="handsOnActivitiesIncluded" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>What strategies are employed to empower parents with practical skills, resources, and strategies they can implement at home to enhance family safety and emergency preparedness?</label>
                    <div>
                        <input type="text" name="practicalSkillsStrategiesForParents" placeholder="Describe the strategies" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Partnerships and Collaboration:</h2>
                <div className="form-section">
                    <label>How do schools collaborate with external partners, such as community organizations, local agencies, or subject matter experts, to enhance the quality and impact of parent education events?</label>
                    <div>
                        <input type="text" name="externalCollaborationMethods" placeholder="Describe how they collaborate" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Can you provide examples of successful collaborations or joint initiatives that have enriched the content, reach, or engagement of safety workshops for parents?</label>
                    <div>
                        <input type="text" name="successfulCollaborationsExamples" placeholder="Give examples" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>In what ways do partnerships with external stakeholders contribute to the sustainability, diversity, and cultural relevance of parent education efforts within the school community?</label>
                    <div>
                        <input type="text" name="partnershipContributionToEducation" placeholder="Describe the ways" onChange={handleChange}/>  
                    </div>
                </div>

                <button type='submit'>Submit</button>
            </form>
        </main>
    </div>
  )
}

export default SafetyWorkshopsFormPage;