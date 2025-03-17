import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import Navbar from "./Navbar";


function ParentNotificationProceduresFormPage() {
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
        const formsRef = collection(db, 'forms/Emergency Preparedness/Parent Notification Procedures');
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
      const formsRef = collection(db, 'forms/Emergency Preparedness/Parent Notification Procedures');
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
            <h1>Parent Notification Procedures Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 2.4.2.1.5 Parent Notification Procedures */}
                <h2>Existence of Notification Procedures:</h2>
                <div className="form-section">
                    <label>Are formal procedures established for notifying parents/guardians during emergencies or critical incidents?</label>
                    <div>
                        <input type="radio" name="NotificationProceduresExistence" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="NotificationProceduresExistence" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="NotificationProceduresExistenceComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <input type="text" name="notificationProceduresExistence" placeholder="Describe the procedures" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Do notification procedures include the use of automated messaging systems or other technology-enabled methods for rapid communication?</label>
                    <div>
                        <input type="radio" name="NotificationTechMethods" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="NotificationTechMethods" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="NotificationTechMethodsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Automated Messaging System:</h2>
                <div className="form-section">
                    <label>Is an automated messaging system implemented to facilitate timely and efficient communication with parents/guardians?</label>
                    <div>
                        <input type="radio" name="AutomatedMessagingImplementation" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="AutomatedMessagingImplementation" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="AutomatedMessagingImplementationComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <input type="text" name="automatedMessagingImplementation" placeholder="Describe the automated messaging system" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Does the automated messaging system have the capability to send notifications via various channels such as phone calls, text messages, emails, or mobile apps?</label>
                    <div>
                        <input type="radio" name="MultichannelNotificationCapability" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="MultichannelNotificationCapability" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="MultichannelNotificationCapabilityComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Message Content and Format:</h2>
                <div className="form-section">
                    <label>Are standardized message templates developed for various types of emergencies, such as lockdowns, evacuations, severe weather, or medical emergencies?</label>
                    <div>
                        <input type="radio" name="StandardizedEmergencyTemplates" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="StandardizedEmergencyTemplates" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="StandardizedEmergencyTemplatesComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Do these templates include essential information, such as the nature of the emergency, specific actions to take, and any additional instructions or precautions?</label>
                    <div>
                        <input type="radio" name="TemplateEssentialInfo" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="TemplateEssentialInfo" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="TemplateEssentialInfoComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Clear and Concise Communication:</h2>
                <div className="form-section">
                    <label>Are emergency announcements scripted to convey information in a clear, concise, and easily understandable manner?</label>
                    <div>
                        <input type="radio" name="ClearEmergencyScripts" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="ClearEmergencyScripts" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="ClearEmergencyScriptsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Do scripts avoid technical jargon or ambiguous language that could cause confusion or misunderstanding during emergencies?</label>
                    <div>
                        <input type="radio" name="AvoidJargonInScripts" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="AvoidJargonInScripts" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="AvoidJargonInScriptsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Channel Selection and Prioritization:</h2>
                <div className="form-section">
                    <label>Are multiple communication channels utilized to ensure redundancy and reach a broad audience of parents/guardians?</label>
                    <div>
                        <input type="radio" name="RedundantCommunicationChannels" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="RedundantCommunicationChannels" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="RedundantCommunicationChannelsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there a prioritization scheme for selecting communication channels based on factors such as urgency, audience preferences, and accessibility?</label>
                    <div>
                        <input type="radio" name="ChannelPrioritizationScheme" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="ChannelPrioritizationScheme" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="ChannelPrioritizationSchemeComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <input type="text" name="channelPrioritizationScheme" placeholder="Describe the scheme" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Integration with Parent Contact Information:</h2>
                <div className="form-section">
                    <label>Is parent contact information maintained in a centralized database or system, and is it regularly updated to ensure accuracy?</label>
                    <div>
                        <input type="radio" name="ParentContactDatabase" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="ParentContactDatabase" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="ParentContactDatabaseComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there integration between the automated messaging system and parent contact databases to streamline the notification process?</label>
                    <div>
                        <input type="radio" name="SystemIntegrationProcess" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="SystemIntegrationProcess" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="SystemIntegrationProcessComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Testing and Verification:</h2>
                <div className="form-section">
                    <label>Are notification procedures tested and verified periodically to assess their effectiveness and reliability?</label>
                    <div>
                        <input type="radio" name="NotificationTestingSchedule" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="NotificationTestingSchedule" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="NotificationTestingScheduleComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are test scenarios conducted to simulate emergency situations and evaluate the responsiveness and performance of the automated messaging system?</label>
                    <div>
                        <input type="radio" name="TestScenarioEvaluation" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="TestScenarioEvaluation" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="TestScenarioEvaluationComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Feedback and Evaluation:</h2>
                <div className="form-section">
                    <label>Are feedback mechanisms in place to solicit input from parents regarding the clarity, timeliness, and usefulness of emergency notifications?</label>
                    <div>
                        <input type="radio" name="ParentFeedbackMechanisms" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="ParentFeedbackMechanisms" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="ParentFeedbackMechanismsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are recommendations from feedback evaluations used to refine notification procedures and improve their efficacy in future emergency situations?</label>
                    <div>
                        <input type="radio" name="ProcedureRefinementFeedback" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="ProcedureRefinementFeedback" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="ProcedureRefinementFeedbackComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
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

export default ParentNotificationProceduresFormPage;