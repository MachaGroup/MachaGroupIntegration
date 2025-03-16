import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import Navbar from "./Navbar";

function TornadoDrillsFormPage() {
  const navigate = useNavigate();  // Initialize useNavigate hook for navigation
  const { buildingId } = useBuilding();
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
  
  // Function to handle back button
  const handleBack = async () => {
    if (formData && buildingId) { // Check if formData and buildingId exist
      try {
        const buildingRef = doc(db, 'Buildings', buildingId);
        const formsRef = collection(db, 'forms/Emergency Preparedness/Tornado Drills');
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
      const formsRef = collection(db, 'forms/Emergency Preparedness/Tornado Drills');
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
            {/* Back Button */}
        <button className="back-button" onClick={handleBack}>←</button> {/* Back button at the top */}
            <h1>Tornado Drills Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 2.3.1.1.1 Tornado Drills */}
                <h2>Drill Frequency:</h2>
                <div className="form-section">
                    <label>How often are tornado drills conducted within the facility?</label>
                    <div>
                        <input type="text" name="conductedTornadoDrills" placeholder="How often" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are tornado drills scheduled regularly to ensure all occupants are familiar with tornado procedures?</label>
                    <div>
                        <input type="radio" name="Drill Scheduling Regularity" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Drill Scheduling Regularity" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="DrillSchedulingRegularityComment" placeholder="Comments" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are drills conducted at different times of the day to account for varying occupancy levels and staff shifts?</label>
                    <div>
                        <input type="radio" name="Drill Timing Variability" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Drill Timing Variability" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="DrillTimingVariabilityComment" placeholder="Comments" onChange={handleChange}/>
                    </div>
                </div>

                <h2>Notification Procedures:</h2>
                <div className="form-section">
                    <label>Is there a protocol for initiating tornado drills, including how and when occupants are notified?</label>
                    <div>
                        <input type="radio" name="Drill Initiation Protocol" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Drill Initiation Protocol" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="initiatingProtocol" placeholder="Describe the protocol" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are notification methods tested during drills to ensure timely dissemination of tornado warnings?</label>
                    <div>
                        <input type="radio" name="Notification Method Testing" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Notification Method Testing" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="methodTesting" placeholder="Describe the notification methods" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there a system in place to account for individuals who may not be present during scheduled drills?</label>
                    <div>
                        <input type="radio" name="Absent Individuals System" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Absent Individuals System" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="absentSystem" placeholder="Describe the system" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Drill Procedures:</h2>
                <div className="form-section">
                    <label>Are tornado drill procedures clearly defined and communicated to all occupants?</label>
                    <div>
                        <input type="radio" name="Defined Drill Procedures" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Defined Drill Procedures" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="DefinedDrillProceduresComment" placeholder="Comments" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>Do drills include specific actions to be taken by occupants, such as seeking shelter in designated areas or following evacuation routes?</label>
                    <div>
                        <input type="radio" name="Occupant Action Procedures" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Occupant Action Procedures" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="OccupantActionProceduresComment" placeholder="Comments" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are drills conducted to simulate different scenarios, such as daytime vs. nighttime, or varying severity levels of tornadoes?</label>
                    <div>
                        <input type="radio" name="Scenario Simulation Drills" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Scenario Simulation Drills" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="ScenarioSimulationDrillsComment" placeholder="Comments" onChange={handleChange}/>
                    </div>
                </div>

                <h2>Sheltering and Evacuation:</h2>
                <div className="form-section">
                    <label>Are designated tornado shelter areas identified and clearly marked throughout the facility?</label>
                    <div>
                        <input type="radio" name="Shelter Area Marking" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Shelter Area Marking" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="ShelterAreaMarkingComment" placeholder="Comments" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>Do occupants know how to access shelter areas quickly and safely during tornado drills?</label>
                    <div>
                        <input type="radio" name="Shelter Access Knowledge" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Shelter Access Knowledge" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="ShelterAccessKnowledgeComment" placeholder="Comments" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there alternative sheltering options available for individuals with mobility limitations or disabilities?</label>
                    <div>
                        <input type="radio" name="Mobility Shelter Options" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Mobility Shelter Options" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="MobilityShelterOptionsComment" placeholder="Comments" onChange={handleChange}/>
                    </div>
                </div>

                <h2>Accountability and Monitoring:</h2>
                <div className="form-section">
                    <label>Is there a process for accounting for all occupants during tornado drills?</label>
                    <div>
                        <input type="radio" name="Occupant Accountability Process" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Occupant Accountability Process" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="OccupantAccountabilityProcessProcess" placeholder="Describe the process" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are staff members assigned roles and responsibilities to assist with accountability and monitoring efforts?</label>
                    <div>
                        <input type="radio" name="Assigned Staff Roles" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Assigned Staff Roles" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="AssignedStaffRolesComment" placeholder="Comments" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>Is feedback gathered from participants after drills to identify any issues or concerns with procedures?</label>
                    <div>
                        <input type="radio" name="Participant Feedback Gathering" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Participant Feedback Gathering" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="ParticipantFeedbackGatheringComment" placeholder="Comments" onChange={handleChange}/>
                    </div>
                </div>

                <h2>Evaluation and Improvement:</h2>
                <div className="form-section">
                    <label>Is there a mechanism for evaluating the effectiveness of tornado drills and identifying areas for improvement?</label>
                    <div>
                        <input type="radio" name="Drill Evaluation Mechanism" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Drill Evaluation Mechanism" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="DrillEvaluationMechanism" placeholder="Describe the mechanism" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are debriefing sessions held after drills to review performance and discuss lessons learned?</label>
                    <div>
                        <input type="radio" name="Post-Drill Debriefing" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Post-Drill Debriefing" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="Post-DrillDebriefingComment" placeholder="Comments" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are recommendations from drill evaluations implemented to enhance tornado preparedness and response procedures?</label>
                    <div>
                        <input type="radio" name="Evaluation Recommendations Implementation" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Evaluation Recommendations Implementation" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="EvaluationRecommendationsImplementationComment" placeholder="Comments" onChange={handleChange}/>
                    </div>
                </div>

                <h2>Documentation and Records:</h2>
                <div className="form-section">
                    <label>Are records maintained for all tornado drills, including dates, times, participants, and observations?</label>
                    <div>
                        <input type="radio" name="Drill Records Maintenance" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Drill Records Maintenance" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="DrillRecordsMaintenance" placeholder="Comments" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are drill records reviewed periodically to ensure compliance with regulations and identify trends or patterns?</label>
                    <div>
                        <input type="radio" name="Periodic Records Review" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Periodic Records Review" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="PeriodicRecordsReviewComment" placeholder="Comments" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are deficiencies or issues identified during drills documented, with corrective actions implemented as needed?</label>
                    <div>
                        <input type="radio" name="Deficiency Documentation Actions" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Deficiency Documentation Actions" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="DeficiencyDocumentationActionsComment" placeholder="Comments" onChange={handleChange}/>
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit">Submit</button>

            </form>
        </main>
    </div>
  )
}

export default TornadoDrillsFormPage;