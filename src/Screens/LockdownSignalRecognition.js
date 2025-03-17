import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import Navbar from "./Navbar";

function LockdownSignalRecognitionFormPage() {
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
                const formsRef = collection(db, 'forms/Emergency Preparedness/Lockdown Signal Recognition');
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
      const formsRef = collection(db, 'forms/Emergency Preparedness/Lockdown Signal Recognition');
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
            <h1>Lockdown Signal Recognition Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 2.3.1.1.5 Lockdown Signal Recognition */}
                <h2>Signal Identification:</h2>
                <div className="form-section">
                    <label>Are occupants trained to recognize the specific signals or alerts used to indicate a lockdown drill?</label>
                    <div>
                        <input type="radio" name="Signal Training" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Signal Training" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Signal Training" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are these signals clearly distinct from other emergency signals or alarms used within the facility?</label>
                    <div>
                        <input type="radio" name="Distinct Alerts" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Distinct Alerts" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Distinct Alerts" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there a standardized method for signaling the start and end of lockdown drills to minimize confusion?</label>
                    <div>
                        <input type="radio" name="Standardized Start-End" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Standardized Start-End" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="standardizedMethod" placeholder="Describe the method" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Communication Protocols:</h2>
                <div className="form-section">
                    <label>Are communication protocols established to inform occupants and staff members about upcoming lockdown drills?</label>
                    <div>
                        <input type="radio" name="Protocol Established" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Protocol Established" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Protocol Established" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Do these protocols include advance notice of drill schedules and procedures to prevent misunderstandings?</label>
                    <div>
                        <input type="radio" name="Advance Notice" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Advance Notice" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Advance Notice" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there a system in place for disseminating information about drill signals through multiple channels, such as emails, announcements, or signage?</label>
                    <div>
                        <input type="radio" name="Multi-Channel" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Multi-Channel" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="multiChannelSystem" placeholder="Describe the system" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Training and Education:</h2>
                <div className="form-section">
                    <label>Are occupants and staff members educated on the importance of distinguishing between drill signals and real threats?</label>
                    <div>
                        <input type="radio" name="Distinguish Signals" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Distinguish Signals" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Distinguish Signals" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are training materials provided to clarify the differences in response actions between drills and actual emergencies?</label>
                    <div>
                        <input type="radio" name="Training Materials" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Training Materials" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Training Materials" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are drills used as opportunities to reinforce signal recognition skills and practice appropriate responses?</label>
                    <div>
                        <input type="radio" name="Drill Practice" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Drill Practice" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Drill Practice" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Simulation Realism:</h2>
                <div className="form-section">
                    <label>Are efforts made to simulate realistic scenarios during lockdown drills, including the use of authentic signals and procedures?</label>
                    <div>
                        <input type="radio" name="Realistic Scenarios" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Realistic Scenarios" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Realistic Scenarios" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are drills designed to mimic the conditions and challenges that occupants may encounter during real lockdown situations?</label>
                    <div>
                        <input type="radio" name="Mimic Challenges" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Mimic Challenges" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Mimic Challenges" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are feedback mechanisms in place to assess the effectiveness of drill simulations in promoting signal recognition?</label>
                    <div>
                        <input type="radio" name="Lockdown Feedback Mechanisms" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Lockdown Feedback Mechanisms" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="lockdownFeedbackMechanisms" placeholder="Describe the feedback mechanisms" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Evaluation and Feedback:</h2>
                <div className="form-section">
                    <label>Is feedback gathered from occupants and staff members after each lockdown drill to assess signal recognition performance?</label>
                    <div>
                        <input type="radio" name="Feedback Gathered" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Feedback Gathered" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Feedback Gathered" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are debriefing sessions conducted to discuss any confusion or errors in identifying drill signals and provide corrective guidance?</label>
                    <div>
                        <input type="radio" name="Debrief Sessions" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Debrief Sessions" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Debrief Sessions" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are recommendations from feedback and evaluations used to improve signal recognition training and procedures?</label>
                    <div>
                        <input type="radio" name="Feedback Improvements" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Feedback Improvements" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Feedback Improvements" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Drill Variability:</h2>
                <div className="form-section">
                    <label>Are lockdown drills conducted under varying conditions to test occupants' ability to recognize signals in different contexts?</label>
                    <div>
                        <input type="radio" name="Varying Conditions" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Varying Conditions" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Varying Conditions" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are drills designed to challenge occupants with unexpected changes or complexities to assess their adaptability and response capabilities?</label>
                    <div>
                        <input type="radio" name="Unexpected Challenges" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Unexpected Challenges" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Unexpected Challenges" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are deviations from standard drill procedures introduced occasionally to gauge occupants' alertness and readiness?</label>
                    <div>
                        <input type="radio" name="Procedure Deviations" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Procedure Deviations" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Procedure Deviations" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Documentation and Review:</h2>
                <div className="form-section">
                    <label>Are records maintained to document the execution and outcomes of lockdown drills, including observations related to signal recognition?</label>
                    <div>
                        <input type="radio" name="Drill Records" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Drill Records" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Drill Records" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are drill records reviewed periodically to identify trends or recurring issues in signal recognition performance?</label>
                    <div>
                        <input type="radio" name="Periodic Review" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Periodic Review" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Periodic Review" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are corrective actions implemented based on review findings to address deficiencies and enhance signal recognition effectiveness?</label>
                    <div>
                        <input type="radio" name="Corrective Actions" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Corrective Actions" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="Corrective Actions" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
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

export default LockdownSignalRecognitionFormPage;