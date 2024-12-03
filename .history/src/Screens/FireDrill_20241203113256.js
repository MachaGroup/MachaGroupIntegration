import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import Navbar from "./Navbar";

function FireDrillFormPage() {
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
      const formsRef = collection(db, 'forms/Emergency Preparedness/Fire Drill');
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
            <h1>Fire Drill Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
      </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 2.3.1.1.3 Fire Drill */}
                <h2>Drill Frequency:</h2>
                <div className="form-section">
                    <label>How often are fire drills conducted within the facility?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="How often" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are fire drills scheduled regularly to ensure all occupants are familiar with fire evacuation procedures?</label>
                    <div>
                        <input type="radio" name="RegularDrillSchedule" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="RegularDrillSchedule" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are drills conducted at different times of the day to account for varying occupancy levels and staff shifts?</label>
                    <div>
                        <input type="radio" name="VaryingDrillTimes" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="VaryingDrillTimes" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2> Notification Procedures:</h2>
                <div className="form-section">
                    <label>Is there a protocol for initiating fire drills, including how and when occupants are notified?</label>
                    <div>
                        <input type="radio" name="DrillInitiationProtocol" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="DrillInitiationProtocol" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the protocol" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are notification methods tested during drills to ensure timely dissemination of fire alarm alerts?</label>
                    <div>
                        <input type="radio" name="NotificationTesting" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="NotificationTesting" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there a system in place to account for individuals who may not be present during scheduled drills?</label>
                    <div>
                        <input type="radio" name="AbsentIndividualSystem" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="AbsentIndividualSystem" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the system" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Drill Procedures:</h2>
                <div className="form-section">
                    <label>Are fire drill procedures clearly defined and communicated to all occupants?</label>
                    <div>
                        <input type="radio" name="DefinedDrillProcedures" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="DefinedDrillProcedures" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Do drills include specific actions to be taken by occupants, such as following evacuation routes and assembly points?</label>
                    <div>
                        <input type="radio" name="OccupantspeciificActions" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="OccupantspeciificActions" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are drills conducted to simulate different scenarios, such as varying locations of fire origin or evacuation obstacles?</label>
                    <div>
                        <input type="radio" name="ScenarioBasedDrills" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="ScenarioBasedDrills" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>Evacuation Routes and Assembly Points:</h2>
                <div className="form-section">
                    <label>Are designated evacuation routes and assembly points identified and clearly marked throughout the facility?</label>
                    <div>
                        <input type="radio" name="MarkedEvacRoutes" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="MarkedEvacRoutes" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the routes" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Do occupants know how to quickly and safely evacuate the building during fire drills?</label>
                    <div>
                        <input type="radio" name="SafeEvacKnowledge" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="SafeEvacKnowledge" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there alternative evacuation routes available in case primary routes are obstructed?</label>
                    <div>
                        <input type="radio" name="AltEvacRoutes" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="AltEvacRoutes" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the alternatives" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Accountability and Monitoring:</h2>
                <div className="form-section">
                    <label>Is there a process for accounting for all occupants during fire drills?</label>
                    <div>
                        <input type="radio" name="OccupantAccountProcess" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="OccupantAccountProcess" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the process" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are staff members assigned roles and responsibilities to assist with accountability and monitoring efforts?</label>
                    <div>
                        <input type="radio" name="StaffDrillResponsibilities" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="StaffDrillResponsibilities" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="List the assigned roles and responsibilities" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Is feedback gathered from participants after drills to identify any issues or concerns with procedures?</label>
                    <div>
                        <input type="radio" name="DrillFeedbackCollection" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="DrillFeedbackCollection" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>Evaluation and Improvement:</h2>
                <div className="form-section">
                    <label>Is there a mechanism for evaluating the effectiveness of fire drills and identifying areas for improvement?</label>
                    <div>
                        <input type="radio" name="EffectivenessEvaluation" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="EffectivenessEvaluation" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the mechanism" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are debriefing sessions held after drills to review performance and discuss lessons learned?</label>
                    <div>
                        <input type="radio" name="PostDrillDebriefing" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="PostDrillDebriefing" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are recommendations from drill evaluations implemented to enhance fire preparedness and response procedures?</label>
                    <div>
                        <input type="radio" name="RecommendationImplementation" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="RecommendationImplementation" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>Documentation and Records:</h2>
                <div className="form-section">
                    <label>Are records maintained for all fire drills, including dates, times, participants, and observations?</label>
                    <div>
                        <input type="radio" name="DrillRecordKeeping" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="DrillRecordKeeping" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are drill records reviewed periodically to ensure compliance with regulations and identify trends or patterns?</label>
                    <div>
                        <input type="radio" name="RecordPeriodicReview" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="RecordPeriodicReview" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are deficiencies or issues identified during drills documented, with corrective actions implemented as needed?</label>
                    <div>
                        <input type="radio" name="CorrectiveActionDocumentation" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="CorrectiveActionDocumentation" value="no" onChange={handleChange}/> No
                    </div>
                </div>

            </form>
        </main>
    </div>
  )
}

export default FireDrillFormPage;