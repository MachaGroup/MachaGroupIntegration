import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';

function EarthquakeDrillsPage() {
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
  const handleBack = () => {
    navigate(-1);  // Navigates to the previous page
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
      const formsRef = collection(db, 'forms/Emergency Preparedness/Earthquake Drills');
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
            {/* Back Button */}
        <button className="back-button" onClick={handleBack}>←</button> {/* Back button at the top */}
            <h1>Conflict Resolution Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 2.3.1.1.2 Earthquake Drills */}
                <h2>Drill Frequency:</h2>
                <div className="form-section">
                    <label>How often are earthquake drills conducted within the facility?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="How often" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are earthquake drills scheduled regularly to ensure all occupants are familiar with earthquake procedures?</label>
                    <div>
                        <input type="radio" name="earthquake DrillFrequency" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="earthquake DrillFrequency" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are drills conducted at different times of the day to account for varying occupancy levels and staff shifts?</label>
                    <div>
                        <input type="radio" name="DrillTiming" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="DrillTiming" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>Notification Procedures:</h2>
                <div className="form-section">
                    <label>Is there a protocol for initiating earthquake drills, including how and when occupants are notified?</label>
                    <div>
                        <input type="radio" name="NotificationProtocol" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="NotificationProtocol" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the protocol" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are notification methods tested during drills to ensure timely dissemination of earthquake alerts?</label>
                    <div>
                        <input type="radio" name="NotificationTesting" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="NotificationTesting" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there a system in place to account for individuals who may not be present during scheduled drills?</label>
                    <div>
                        <input type="radio" name="AbsentOccupantSystem" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="AbsentOccupantSystem" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the system" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Drill Procedures:</h2>
                <div className="form-section">
                    <label>Are earthquake drill procedures clearly defined and communicated to all occupants?</label>
                    <div>
                        <input type="radio" name="ProcedureClarity" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="ProcedureClarity" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Do drills include specific actions to be taken by occupants, such as "Drop, Cover, and Hold On" techniques?</label>
                    <div>
                        <input type="radio" name="OccupantDrillActions" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="OccupantDrillActions" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are drills conducted to simulate different scenarios, such as varying intensities or durations of earthquakes?</label>
                    <div>
                        <input type="radio" name="ScenarioSimulation" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="ScenarioSimulation" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>Safe Zones and Evacuation Routes:</h2>
                <div className="form-section">
                    <label>Are designated safe zones and evacuation routes identified and clearly marked throughout the facility?</label>
                    <div>
                        <input type="radio" name="SafeZoneMarking" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="SafeZoneMarking" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Do occupants know how to quickly and safely move to safe zones during earthquake drills?</label>
                    <div>
                        <input type="radio" name="SafeZoneMovement" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="SafeZoneMovement" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there alternative evacuation routes available in case primary routes are obstructed?</label>
                    <div>
                        <input type="radio" name="AlternateRoutes" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="AlternateRoutes" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the alternatives" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Accountability and Monitoring:</h2>
                <div className="form-section">
                    <label>Is there a process for accounting for all occupants during earthquake drills?</label>
                    <div>
                        <input type="radio" name="OccupantAccounting" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="OccupantAccounting" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the process" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are staff members assigned roles and responsibilities to assist with accountability and monitoring efforts?</label>
                    <div>
                        <input type="radio" name="StaffResponsibilities" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="StaffResponsibilities" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Is feedback gathered from participants after drills to identify any issues or concerns with procedures?</label>
                    <div>
                        <input type="radio" name="participantFeedbackCollection" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="participantFeedbackCollection" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>Evaluation and Improvement:</h2>
                <div className="form-section">
                    <label>Is there a mechanism for evaluating the effectiveness of earthquake drills and identifying areas for improvement?</label>
                    <div>
                        <input type="radio" name="earthquakeDrillEvaluation" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="earthquakeDrillEvaluation" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the mechanism" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are debriefing sessions held after drills to review performance and discuss lessons learned?</label>
                    <div>
                        <input type="radio" name="DebriefSessions" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="DebriefSessions" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are recommendations from drill evaluations implemented to enhance earthquake preparedness and response procedures?</label>
                    <div>
                        <input type="radio" name="RecommendationImplementation" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="RecommendationImplementation" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>Documentation and Records:</h2>
                <div className="form-section">
                    <label>Are records maintained for all earthquake drills, including dates, times, participants, and observations?</label>
                    <div>
                        <input type="radio" name="DrillRecordKeeping" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="DrillRecordKeeping" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are drill records reviewed periodically to ensure compliance with regulations and identify trends or patterns?</label>
                    <div>
                        <input type="radio" name="RecordReview" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="RecordReview" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are deficiencies or issues identified during drills documented, with corrective actions implemented as needed?</label>
                    <div>
                        <input type="radio" name="DeficiencyDocumentation" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="DeficiencyDocumentation" value="no" onChange={handleChange}/> No
                    </div>
                </div>

            </form>
        </main>
    </div>
  )
}

export default EarthquakeDrillsPage;