import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
/**/
function FireDrillsFormPage() {
  const navigate = useNavigate();  // Initialize useNavigate hook for navigation
  const { buildingId } = useBuilding();
  const db = getFirestore();

  const [formData, setFormData]= useState();
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
              const formsRef = collection(db, 'forms/Personnel Training and Awareness/Fire Drills');
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
      const formsRef = collection(db, 'forms/Personnel Training and Awareness/Fire Drills');
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
            <h1>Fire Drills Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 3.2.1.1.4 Fire Drills */}
                <h2>Understanding of Evacuation Procedures:</h2>
                <div className="form-section">
                    <label>Are students educated on the importance of fire drills and their role in evacuating the building safely during a fire emergency?</label>
                    <div>
                        <input type="radio" name="fireDrillEducation" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="fireDrillEducation" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="fireDrillEducationComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>
                
                <div className="form-section">
                    <label>How are students instructed on the specific steps to follow during a fire drill, including how to quickly and calmly exit the building via designated evacuation routes and assembly points?</label>
                    <div>
                        <input type="text" name="evacuationInstructions" placeholder="Describe how they're instructed" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>What measures are taken to ensure that students comprehend the evacuation procedures, including the use of visual aids, practice drills, and verbal instructions tailored to different age groups and learning styles?</label>
                    <div>
                        <input type="text" name="comprehensionMeasuers" placeholder="Describe the measures" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Recognition of Fire Alarm Signals:</h2>
                <div className="form-section">
                    <label>Are students familiarized with the various types of fire alarm signals used within the school, including auditory alarms, visual strobes, and digital alert systems?</label>
                    <div>
                        <input type="radio" name="alarmFamiliarization" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="alarmFamiliarization" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="alarmFamiliarizationComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>How are students trained to recognize the distinct sound or visual cues of a fire alarm and differentiate them from other emergency alerts or routine announcements?</label>
                    <div>
                        <input type="text" name="alarmRecognitionTraining" placeholder="Describe how they're trained" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>What strategies are employed to reinforce students' ability to react promptly to fire alarm signals, emphasizing the importance of immediate evacuation without hesitation or delay?</label>
                    <div>
                        <input type="text" name="promptReactionStrategies" placeholder="Describe the strategies" onChange={handleChange}/>
                    </div>
                </div>

                <h2>Response to Smoke and Fire Hazards:</h2>
                <div className="form-section">
                    <label>Are students educated on the potential hazards posed by smoke, flames, heat, and toxic gases in the event of a fire, as well as strategies for minimizing exposure and avoiding injury?</label>
                    <div>
                        <input type="radio" name="fireHazardEducation" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="fireHazardEducation" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="fireHazardEducationComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>How are students taught to identify common sources of ignition and fire spread, such as electrical appliances, flammable materials, cooking equipment, and combustible furnishings, and to report any fire-related concerns to responsible adults?</label>
                    <div>
                        <input type="text" name="firePreventionEducation" placeholder="Describe how they're taught" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>What practical demonstrations or simulations are conducted to simulate fire scenarios, allowing students to experience simulated smoke conditions, practice low crawling techniques, and use emergency exit aids like fire extinguishers or fire blankets under supervision?</label>
                    <div>
                        <input type="text" name="fireSimulationExercises" placeholder="Describe the demonstrations/simulations" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Role of Fire Wardens and Monitors:</h2>
                <div className="form-section">
                    <label>Are students introduced to the concept of fire wardens or monitors, responsible individuals designated to assist with evacuation procedures, conduct headcounts, and provide guidance or assistance to classmates during fire drills?</label>
                    <div>
                        <input type="radio" name="fireWardenTraining" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="fireWardenTraining" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="fireWardenTrainingComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>How are students selected or trained to serve as fire wardens or monitors, and what specific duties or responsibilities are assigned to them before, during, and after fire drills to ensure effective coordination and communication?</label>
                    <div>
                        <input type="text" name="fireWardenSelectionAndTraining" placeholder="Describe how they're selected/taught" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>What mechanisms are in place to recognize and commend the contributions of student fire wardens or monitors, fostering a sense of leadership, responsibility, and teamwork in promoting fire safety within the school community?</label>
                    <div>
                        <input type="text" name="fireWardenRecognition" placeholder="Describe the mechanisms" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Post-Drill Debriefing and Feedback:</h2>
                <div className="form-section">
                    <label>Are students given the opportunity to participate in post-drill debriefing sessions or discussions to reflect on their performance, identify areas for improvement, and share feedback or suggestions for enhancing future fire drills?</label>
                    <div>
                        <input type="radio" name="postDrillDebriefing" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="postDrillDebriefing" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="postDrillDebriefingComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>How are student observations, concerns, or questions addressed during debriefing sessions, and what actions are taken to address any identified gaps, misconceptions, or safety concerns raised by participants?</label>
                    <div>
                        <input type="text" name="debriefingFeedback" placeholder="Describe how they're addressed" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>What mechanisms are in place to document and incorporate lessons learned from fire drills into ongoing safety training and emergency preparedness initiatives, ensuring continuous improvement in the school's fire evacuation procedures and protocols?</label>
                    <div>
                        <input type="text" name="continuousImprovementMechanisms" placeholder="Describe the mechanisms" onChange={handleChange}/>
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

export default FireDrillsFormPage;