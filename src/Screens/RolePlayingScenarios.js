import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function RolePlayingScenariosFormPage() {
  const navigate = useNavigate();  // Initialize useNavigate hook for navigation
  const { buildingId } = useBuilding();
  const db = getFirestore();

  const [formData, setFormData] = useState();
  const storage = getStorage();
  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadError, setUploadError] = useState(null);


  useEffect(() => {
    if(!buildingId) {
      alert('No builidng selected. Redirecting to Building Info...');
      navigate('BuildingandAddress');
    }
  }, [buildingId, navigate]);

  
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
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
        const formsRef = collection(db, 'forms/Personnel Training and Awareness/Role-Playing Scenarios');
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
    
    if(!buildingId) {
      alert('Building ID is missing. Please start the assessment from the correct page.');
      return;
    }

    try {
      // Create a document reference to the building in the 'Buildings' collection
      const buildingRef = doc(db, 'Buildings', buildingId);

      // Store the form data in the specified Firestore structure
      const formsRef = collection(db, 'forms/Personnel Training and Awareness/Role-Playing Scenarios');
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
            <Navbar />
            <button className="back-button" onClick={handleBack}>←</button>
            <h1>Role-Playing Scenarios Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 3.2.1.2.2 Role-Playing Scenarios */}
                <h2>Scenario Selection:</h2>
                <div className="form-section">
                    <label>How are role-playing scenarios selected or developed to address specific safety concerns or emergency situations relevant to the school or educational institution?</label>
                    <div>
                        <input type="text" name="rolePlayingScenarioSelection" placeholder="Describe how it's selected" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are scenarios based on real-life incidents, local hazards, or common safety risks identified within the school environment?</label>
                    <div>
                        <input type="radio" name="realLifeIncidentScenarios" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="realLifeIncidentScenarios" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="realLifeIncidentScenariosComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>What criteria are used to ensure that role-playing scenarios are age-appropriate, culturally sensitive, and aligned with the developmental needs of participants?</label>
                    <div>
                        <input type="text" name="rolePlayingCriteria" placeholder="Describe the criteria" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Scenario Design and Structure:</h2>
                <div className="form-section">
                    <label>How are role-playing scenarios designed to engage participants and simulate realistic emergency situations or safety challenges?</label>
                    <div>
                        <input type="text" name="scenarioDesignEngagement" placeholder="Describe how it's designed" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are scenarios scripted or improvised, and how are roles assigned or distributed among participants?</label>
                    <div>
                        <input type="text" name="scenarioRolesAssignment" placeholder="Describe the scenarios and roles" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>What props, equipment, or simulated environments are used to enhance the realism and immersion of role-playing scenarios?</label>
                    <div>
                        <input type="text" name="scenarioPropsAndEquipment" placeholder="Describe how it's designed" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are scenarios structured to allow for multiple outcomes or variations based on participant actions and decisions?</label>
                    <div>
                        <input type="radio" name="multipleScenarioOutcomes" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="multipleScenarioOutcomes" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="multipleScenarioOutcomesComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Participant Engagement and Interaction:</h2>
                <div className="form-section">
                    <label>How are participants encouraged to actively engage and participate in role-playing scenarios?</label>
                    <div>
                        <input type="text" name="participantEngagement" placeholder="Describe how they're encouraged" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are debriefing sessions, pre-briefings, or instructions provided to orient participants and establish expectations before engaging in scenarios?</label>
                    <div>
                        <input type="radio" name="debriefingSessions" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="debriefingSessions" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="debriefingSessionsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>What strategies are employed to promote collaboration, communication, and teamwork among participants during role-playing exercises?</label>
                    <div>
                        <input type="text" name="collaborationAndTeamworkStrategies" placeholder="Describe the strategies" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are opportunities provided for participants to reflect on their experiences, share insights, and learn from each other's perspectives following the completion of scenarios?</label>
                    <div>
                        <input type="radio" name="postScenarioReflection" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="postScenarioReflection" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="postScenarioReflectionComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Learning Objectives and Outcomes:</h2>
                <div className="form-section">
                    <label>What specific learning objectives or outcomes are targeted through role-playing scenarios, and how are they aligned with broader safety education goals?</label>
                    <div>
                        <input type="text" name="learningObjectivesAndOutcomes" placeholder="Describe the objectives/outcomes" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are scenarios designed to reinforce key safety concepts, practice emergency response procedures, or develop critical thinking and problem-solving skills?</label>
                    <div>
                        <input type="radio" name="reinforceSafetyConcepts" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="reinforceSafetyConcepts" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="reinforceSafetyConceptsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>How are participant performance and learning outcomes assessed and evaluated during or after role-playing exercises?</label>
                    <div>
                        <input type="text" name="participantPerformanceAssessment" placeholder="Describe how outcomes are accessed" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are debriefing sessions or post-scenario discussions used to identify strengths, areas for improvement, and lessons learned from each scenario?</label>
                    <div>
                        <input type="radio" name="debriefingPostScenario" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="debriefingPostScenario" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="debriefingPostScenarioComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Integration with Training Programs:</h2>
                <div className="form-section">
                    <label>How are role-playing scenarios integrated into broader safety training programs or curriculum initiatives within the school or educational institution?</label>
                    <div>
                        <input type="text" name="scenarioIntegrationWithTraining" placeholder="Describe how scenarios are integrated" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are scenarios incorporated into existing classroom instruction, extracurricular activities, or dedicated safety training sessions?</label>
                    <div>
                        <input type="radio" name="scenariosInClassroomOrActivities" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="scenariosInClassroomOrActivities" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="scenariosInClassroomOrActivitiesComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>What role do teachers, staff members, or external facilitators play in facilitating role-playing scenarios and guiding participant learning?</label>
                    <div>
                        <input type="text" name="facilitatorRolesInScenarios" placeholder="Describe the roles" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are follow-up activities or assignments provided to reinforce learning and encourage further exploration of safety topics addressed in role-playing exercises?</label>
                    <div>
                        <input type="radio" name="followUpActivitiesAndAssignments" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="followUpActivitiesAndAssignments" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="followUpActivitiesAndAssignmentsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                {/* Submit Button */}
                <input type="file" accept="image/*" onChange={handleImageChange} />
{uploadProgress > 0 && <p>Upload Progress: {uploadProgress.toFixed(2)}%</p>}
{imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
{uploadError && <p style={{ color: "red" }}>{uploadError}</p>}
<button type="submit">Submit</button>
            </form>
        </main>
    </div>
  )
}

export default RolePlayingScenariosFormPage;