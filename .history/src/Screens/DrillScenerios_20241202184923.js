import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import Navbar from "./Navbar"; // Import the Navbar

function DrillSceneriosFormPage() {
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
      const formsRef = collection(db, 'forms/Emergency Preparedness/Drill Scenerios');
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
            <h1>Conflict Resolution Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 2.3.1.1.4 Drill Scenerios */}
                <h2>Drill Frequency:</h2>
                <div className="form-section">
                    <label>How often are lockdown drills conducted within the facility?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="How often" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are lockdown drills scheduled regularly to ensure all occupants are familiar with lockdown procedures?</label>
                    <div>
                        <input type="radio" name="Regular Drill Schedule" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Regular Drill Schedule" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are drills conducted at different times of the day to account for varying occupancy levels and staff shifts?</label>
                    <div>
                        <input type="radio" name="Drill Timing Variability" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Drill Timing Variability" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>Notification Procedures:</h2>
                <div className="form-section">
                    <label>Is there a protocol for initiating lockdown drills, including how and when occupants are notified?</label>
                    <div>
                        <input type="radio" name="Initiation Protocol" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Initiation Protocol" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the protocol" onChange={handleChange}/>   
                    </div>
                </div>

                <div className="form-section">
                    <label>Are notification methods tested during drills to ensure timely dissemination of lockdown alerts?</label>
                    <div>
                        <input type="radio" name="Notification Methods Testing" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Notification Methods Testing" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there a system in place to account for individuals who may not be present during scheduled drills?</label>
                    <div>
                        <input type="radio" name="Absent Individuals System" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Absent Individuals System" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the system" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Drill Scenarios:</h2>
                <div className="form-section">
                    <label>Are lockdown drill scenarios carefully planned and communicated to participants in advance?</label>
                    <div>
                        <input type="radio" name="Scenario Planning" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Scenario Planning" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Do scenarios include simulated intruder situations, as well as other potential threats that may require a lockdown response?</label>
                    <div>
                        <input type="radio" name="Simulated Threat Scenarios" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Simulated Threat Scenarios" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are scenarios designed to be realistic while considering the safety and well-being of participants?</label>
                    <div>
                        <input type="radio" name="Realistic Scenario Design" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Realistic Scenario Design" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>Response Procedures:</h2>
                <div className="form-section">
                    <label>Are lockdown procedures clearly defined and communicated to all occupants?</label>
                    <div>
                        <input type="radio" name="Procedure Communication" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Procedure Communication" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Do drills include specific actions to be taken by occupants, such as securing doors, barricading entry points, and seeking shelter in safe areas?</label>
                    <div>
                        <input type="radio" name="Occupant Specific Actions" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Occupant Specific Actions" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are drills conducted to simulate different scenarios, such as intruders in various locations or multiple threats simultaneously?</label>
                    <div>
                        <input type="radio" name="Scenario Simulation Variety" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Scenario Simulation Variety" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>Communication and Coordination:</h2>
                <div className="form-section">
                    <label>Is there a protocol for communication and coordination between occupants, staff members, and security personnel during lockdown drills?</label>
                    <div>
                        <input type="radio" name="Coordination Protocol" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Coordination Protocol" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the protocol" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are communication systems, such as two-way radios or intercoms, tested during drills to facilitate coordination efforts?</label>
                    <div>
                        <input type="radio" name="Communication Systems Test" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Communication Systems Test" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there designated individuals responsible for coordinating responses and providing updates during lockdown drills?</label>
                    <div>
                        <input type="radio" name="Designated Coordinators" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Designated Coordinators" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="List the individuals responsible" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Accountability and Monitoring:</h2>
                <div className="form-section">
                    <label>Is there a process for accounting for all occupants during lockdown drills?</label>
                    <div>
                        <input type="radio" name="Occupant Accountability Process" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Occupant Accountability Process" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the process" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are staff members assigned roles and responsibilities to assist with accountability and monitoring efforts?</label>
                    <div>
                        <input type="radio" name="Accountability Roles Assigned" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Accountability Roles Assigned" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="List the member's assigned roles" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Is feedback gathered from participants after drills to identify any issues or concerns with procedures?</label>
                    <div>
                        <input type="radio" name="Participants Feedback Collection" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Participants Feedback Collection" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>Evaluation and Improvement:</h2>
                <div className="form-section">
                    <label>Is there a mechanism for evaluating the effectiveness of lockdown drills and identifying areas for improvement?</label>
                    <div>
                        <input type="radio" name="Effectiveness Evaluation" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Effectiveness Evaluation" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the mechanism" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are debriefing sessions held after drills to review performance and discuss lessons learned?</label>
                    <div>
                        <input type="radio" name="Debriefing Sessions" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Debriefing Sessions" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are recommendations from drill evaluations implemented to enhance lockdown preparedness and response procedures?</label>
                    <div>
                        <input type="radio" name="Implementation of Recommendations" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Implementation of Recommendations" value="no" onChange={handleChange}/> No
                    </div>
                </div>

            </form>
        </main>
    </div>
  )
}

export default DrillSceneriosFormPage;