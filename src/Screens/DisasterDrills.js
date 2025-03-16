import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import Navbar from "./Navbar";
/**/
function DisasterDrillsFormPage() {
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
      const formsRef = collection(db, 'forms/Emergency Preparedness/Disaster Drills');
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

  // Function to handle back button
  const handleBack = async () => {
          if (formData && buildingId) { // Check if formData and buildingId exist
            try {
              const buildingRef = doc(db, 'Buildings', buildingId);
              const formsRef = collection(db, 'forms/Emergency Preparedness/Disaster Drills');
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

  return (
    <div className="form-page">
        <header className="header">
            <Navbar />
            {/* Back Button */}
        <button className="back-button" onClick={handleBack}>←</button> {/* Back button at the top */}
            <h1>Disaster Drills Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 2.2.1.3.1 Disaster Drills */}
                <h2>Drill Frequency:</h2>
                <div className="form-section">
                    <label>How often are disaster drills conducted within the facility?</label>
                    <div>
                        <input type="text" name="conductedDisasterDrills" placeholder="How often are they constructed" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are drills scheduled regularly to ensure all occupants are familiar with emergency procedures?</label>
                    <div>
                        <input type="radio" name="Scheduled Drills" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="Scheduled Drills" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Scheduled Drills-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are different types of disaster drills (e.g., tornado, earthquake, fire) rotated throughout the year?</label>
                    <div>
                        <input type="radio" name="Drill Rotation" value="yes"onChange={handleChange} /> Yes
                        <input type="radio" name="Drill Rotation" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Drill Rotation-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Scenario Variety:</h2>
                <div className="form-section">
                    <label>Do disaster drills cover a variety of natural disaster scenarios that are relevant to the facility's geographical location and risk profile?</label>
                    <div>
                        <input type="radio" name="Scenario Relevance" value="yes"onChange={handleChange} /> Yes
                        <input type="radio" name="Scenario Relevance" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Scenario Relevance-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are drills tailored to simulate realistic scenarios, including variations in severity and impact?</label>
                    <div>
                        <input type="radio" name="Realistic Scenarios" value="yes"onChange={handleChange} /> Yes
                        <input type="radio" name="Realistic Scenarios" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Realistic Scenarios-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are lessons learned from past incidents or drills used to inform future drill scenarios?</label>
                    <div>
                        <input type="radio" name="Learned Lessons " value="yes"onChange={handleChange} /> Yes
                        <input type="radio" name="Learned Lessons " value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Learned Lessons-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Participant Engagement:</h2>
                <div className="form-section">
                    <label>Are all occupants, including staff members, students, visitors, and contractors, actively involved in disaster drills?</label>
                    <div>
                        <input type="radio" name="Occupant Participation" value="yes"onChange={handleChange} /> Yes
                        <input type="radio" name="Occupant Participation" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Occupant Participation-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Do drills engage participants in practicing specific actions and responses, such as evacuation, sheltering, or emergency communication?</label>
                    <div>
                        <input type="radio" name="Action Practice" value="yes"onChange={handleChange} /> Yes
                        <input type="radio" name="Action Practice" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Action Practice-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are designated individuals assigned roles and responsibilities during drills to facilitate coordination and leadership?</label>
                    <div>
                        <input type="radio" name="Role Assignment" value="yes"onChange={handleChange} /> Yes
                        <input type="radio" name="Role Assignment" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Role Assignment-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <input type="text" name="roleAssignment" placeholder="List individuals and assigned roles" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Evacuation Procedures:</h2>
                <div className="form-section">
                    <label>Are evacuation procedures clearly communicated and practiced during disaster drills?</label>
                    <div>
                        <input type="radio" name="Evacuation Practice" value="yes"onChange={handleChange} /> Yes
                        <input type="radio" name="Evacuation Practice" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Evacuation Practice-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are evacuation routes identified, marked, and regularly reviewed for safety and accessibility?</label>
                    <div>
                        <input type="radio" name="Route Review" value="yes"onChange={handleChange} /> Yes
                        <input type="radio" name="Route Review" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Route Review-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are drills conducted to assess the effectiveness of evacuation procedures under various conditions, such as different times of day or occupancy levels?</label>
                    <div>
                        <input type="radio" name="Condition Testing" value="yes"onChange={handleChange} /> Yes
                        <input type="radio" name="Condition Testing" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Condition Testing-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Sheltering Protocols:</h2>
                <div className="form-section">
                    <label>Are sheltering procedures established for scenarios where evacuation may not be feasible or safe, such as during severe weather events?</label>
                    <div>
                        <input type="radio" name="Sheltering Setup" value="yes"onChange={handleChange} /> Yes
                        <input type="radio" name="Sheltering Setup" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Sheltering Setup-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <input type="text" name="shelteringSetup" placeholder="Describe the procedures" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are designated shelter areas identified and equipped with necessary supplies and resources to support occupants during emergencies?</label>
                    <div>
                        <input type="radio" name="Shelter Details" value="yes"onChange={handleChange} /> Yes
                        <input type="radio" name="Shelter Details" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Shelter Details-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <input type="text" name="shelterDetails" placeholder="Describe the shelter areas" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are drills conducted to practice sheltering procedures and assess the suitability of designated shelter areas?</label>
                    <div>
                        <input type="radio" name="Drill Sheltering" value="yes"onChange={handleChange} /> Yes
                        <input type="radio" name="Drill Sheltering" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Drill Sheltering-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Communication and Notification:</h2>
                <div className="form-section">
                    <label>Is there a protocol for initiating and communicating disaster drills to all occupants?</label>
                    <div>
                        <input type="radio" name="Drill Notification" value="yes"onChange={handleChange} /> Yes
                        <input type="radio" name="Drill Notification" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Drill Notification-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <input type="text" name="drillNotification" placeholder="Describe the protocol" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are communication systems, such as public address systems or emergency notifications, tested during drills?</label>
                    <div>
                        <input type="radio" name="System Testing" value="yes"onChange={handleChange} /> Yes
                        <input type="radio" name="System Testing" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="System Testing-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are drills used as opportunities to practice communication and coordination with external emergency responders or authorities?</label>
                    <div>
                        <input type="radio" name="External Coordination" value="yes"onChange={handleChange} /> Yes
                        <input type="radio" name="External Coordination" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="External Coordination-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Evaluation and Improvement:</h2>
                <div className="form-section">
                    <label>Is there a process for evaluating the effectiveness of disaster drills and identifying areas for improvement?</label>
                    <div>
                        <input type="radio" name="Drill Evaluation" value="yes"onChange={handleChange} /> Yes
                        <input type="radio" name="Drill Evaluation" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Drill Evaluation-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <input type="text" name="drillEvaluation" placeholder="Describe the process" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are feedback mechanisms in place to gather input from participants and observers on drill performance?</label>
                    <div>
                        <input type="radio" name="Feedback Collection" value="yes"onChange={handleChange} /> Yes
                        <input type="radio" name="Feedback Collection" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Feedback Collection-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <input type="text" name="feedbackCollection" placeholder="Describe the feedback mechanisms" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are drill outcomes used to update and refine natural disaster plans, procedures, and training materials?</label>
                    <div>
                        <input type="radio" name="Outcome Updates" value="yes"onChange={handleChange} /> Yes
                        <input type="radio" name="Outcome Updates" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Outcome Updates-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit">Submit</button>

            </form>
        </main>

    </div>
  )
}

export default DisasterDrillsFormPage;