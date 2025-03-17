import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import Navbar from "./Navbar";
/**/
function DebriefingAndFeedbackFormPage() {
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
              const formsRef = collection(db, 'forms/Emergency Preparedness/Debriefing and Feedback');
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
      const formsRef = collection(db, 'forms/Emergency Preparedness/Debriefing and Feedback');
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
        <h1>Debriefing and Feedback Assessment</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 2.3.1.2.4 Debriefing and Feedback */}
                <h2>Debriefing Process:</h2>
                <div className="form-section">
                    <label>Is there a structured process for conducting debriefing sessions after drills, including designated timeframes and locations?</label>
                    <div>
                        <input type="radio" name="Structured Debriefing" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Structured Debriefing" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Structured Debriefing-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <input type="text" name="structuredDebriefingProcess" placeholder="Describe the process" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are debriefing sessions facilitated by trained personnel, such as safety officers or drill coordinators, to ensure effectiveness and objectivity?</label>
                    <div>
                        <input type="radio" name="Facilitator Training" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Facilitator Training" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Facilitator Training-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are all relevant stakeholders, including staff members, occupants, and management personnel, invited to participate in debriefing sessions?</label>
                    <div>
                        <input type="radio" name="Stakeholder Participation" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Stakeholder Participation" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Stakeholder Participation-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Review Objectives:</h2>
                <div className="form-section">
                    <label>Are clear objectives established for debriefing sessions, such as assessing performance, identifying strengths and areas for improvement, and capturing lessons learned?</label>
                    <div>
                        <input type="radio" name="Objective Establishment" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Objective Establishment" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Objective Establishment-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <input type="text" name="objectiveEstablishment" placeholder="Describe the sessions" onChange={handleChange}/>  
                    </div>
                </div>
                
                <div className="form-section">
                    <label>Are debriefing sessions focused on achieving specific outcomes, such as enhancing preparedness, refining procedures, or addressing deficiencies identified during drills?</label>
                    <div>
                        <input type="radio" name="Outcome Focus" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Outcome Focus" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Outcome Focus-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Participant Engagement:</h2>
                <div className="form-section">
                    <label>Are participants encouraged to actively contribute to debriefing sessions by sharing their observations, experiences, and feedback?</label>
                    <div>
                        <input type="radio" name="Participant Contribution" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Participant Contribution" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Participant Contribution-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Is feedback solicited from participants on various aspects of drill execution, including communication, coordination, procedures, and individual performance?</label>
                    <div>
                        <input type="radio" name="Feedback Solicitation" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Feedback Solicitation" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Feedback Solicitation-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are facilitators skilled in promoting open communication and constructive dialogue among participants during debriefing sessions?</label>
                    <div>
                        <input type="radio" name="Facilitator Skills" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Facilitator Skills" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Facilitator Skills-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Documentation of Observations:</h2>
                <div className="form-section">
                    <label>Are detailed notes or records maintained during debriefing sessions to capture key observations, insights, and recommendations?</label>
                    <div>
                        <input type="radio" name="Observation Records" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Observation Records" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Observation Records-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are observations documented in a structured format to facilitate analysis, follow-up actions, and integration into future planning and training efforts?</label>
                    <div>
                        <input type="radio" name="Structured Documentation" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Structured Documentation" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Structured Documentation-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are records of debriefing sessions accessible to relevant stakeholders for reference and review?</label>
                    <div>
                        <input type="radio" name="Stakeholder Access" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Stakeholder Access" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Stakeholder Access-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Action Item Identification:</h2>
                <div className="form-section">
                    <label>Are actionable items identified during debriefing sessions to address deficiencies, capitalize on strengths, and implement improvements identified during drills?</label>
                    <div>
                        <input type="radio" name="Actionable Items" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Actionable Items" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Actionable Items-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are action items prioritized based on their urgency, impact on safety, and feasibility of implementation?</label>
                    <div>
                        <input type="radio" name="Priority Assessment" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Priority Assessment" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Priority Assessment-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are responsible parties assigned to each action item, along with target completion dates and follow-up mechanisms to track progress?</label>
                    <div>
                        <input type="radio" name="Responsibility Assignment" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Responsibility Assignment" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Responsibility Assignment-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Follow-Up and Implementation:</h2>
                <div className="form-section">
                    <label>Is there a process for tracking the implementation of action items resulting from debriefing sessions?</label>
                    <div>
                        <input type="radio" name="Tracking Process" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Tracking Process" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Tracking Process-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <input type="text" name="trackingProcess" placeholder="Describe the process" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are responsible parties held accountable for completing assigned action items within established timelines?</label>
                    <div>
                        <input type="radio" name="Accountability Mechanism" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Accountability Mechanism" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Accountability Mechanism-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are progress updates provided to stakeholders on the status of action item implementation, including any challenges encountered and lessons learned?</label>
                    <div>
                        <input type="radio" name="Progress Updates" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Progress Updates" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Progress Updates-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Continuous Improvement:</h2>
                <div className="form-section">
                    <label>Are recommendations from debriefing sessions used to drive continuous improvement in emergency preparedness and response capabilities?</label>
                    <div>
                        <input type="radio" name="Driving Improvements" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Driving Improvements" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Driving Improvements-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are debriefing sessions integrated into a broader feedback loop to ensure that lessons learned from drills are incorporated into training, planning, and policy development?</label>
                    <div>
                        <input type="radio" name="Feedback Integration" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Feedback Integration" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Feedback Integration-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are opportunities sought to share insights and best practices identified during debriefing sessions with relevant stakeholders across the organization?</label>
                    <div>
                        <input type="radio" name="Insight Sharing" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Insight Sharing" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Insight Sharing-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
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

export default DebriefingAndFeedbackFormPage;