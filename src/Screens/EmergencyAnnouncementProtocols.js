import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import Navbar from "./Navbar";
/**/
function EmergencyAnnouncementProtocolsFormPage() {
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
              const formsRef = collection(db, 'forms/Emergency Preparedness/Drill Frequency');
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
      const formsRef = collection(db, 'forms/Emergency Preparedness/Drill Frequency');
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
            <h1>Emergency Announcement Protocols Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 2.4.1.1.2 Emergency Announcement Protocols */}
                <h2>Standardized Message Templates:</h2>
                <div className="form-section">
                    <label>Are standardized message templates developed for various types of emergencies, such as lockdowns, evacuations, severe weather, or medical emergencies?</label>
                    <div>
                        <input type="radio" name="standardizedMessageTemplates" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="standardizedMessageTemplates" value="no" onChange={handleChange} /> No
                        <textarea className='comment-box' name="standardizedMessageTemplatesComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Do these templates include essential information, such as the nature of the emergency, specific actions to take, and any additional instructions or precautions?</label>
                    <div>
                        <input type="radio" name="essentialInfo" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="essentialInfo" value="no" onChange={handleChange} /> No
                        <textarea className='comment-box' name="essentialInfoComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Clear and Concise Communication:</h2>
                <div className="form-section">
                    <label>Are emergency announcements scripted to convey information in a clear, concise, and easily understandable manner?</label>
                    <div>
                        <input type="radio" name="scriptedEmergencyAnnouncements" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="scriptedEmergencyAnnouncements" value="no" onChange={handleChange} /> No
                        <textarea className='comment-box' name="scriptedEmergencyAnnouncementsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Do scripts avoid technical jargon or ambiguous language that could cause confusion or misunderstanding during emergencies?</label>
                    <div>
                        <input type="radio" name="scriptsAvoidingConfusion" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="scriptsAvoidingConfusion" value="no" onChange={handleChange} /> No
                        <textarea className='comment-box' name="scriptsAvoidingConfusionComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are announcements tailored to the intended audience, considering factors such as age, language proficiency, and cognitive ability?</label>
                    <div>
                        <input type="radio" name="appropriateAnnouncements" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="appropriateAnnouncements" value="no" onChange={handleChange} /> No
                        <textarea className='comment-box' name="appropriateAnnouncementsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Message Content and Structure:</h2>
                <div className="form-section">
                    <label>Do scripted messages follow a structured format that includes key elements such as the type of emergency, location or affected area, recommended actions, and any follow-up instructions?</label>
                    <div>
                        <input type="radio" name="structuredScriptedMessages" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="structuredScriptedMessages" value="no" onChange={handleChange} /> No
                        <textarea className='comment-box' name="structuredScriptedMessagesComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are messages designed to provide actionable guidance to occupants, helping them make informed decisions and respond effectively to the emergency situation?</label>
                    <div>
                        <input type="radio" name="messagesProvidingGuidance" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="messagesProvidingGuidance" value="no" onChange={handleChange} /> No
                        <textarea className='comment-box' name="messagesProvidingGuidanceComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Consistency and Accuracy:</h2>
                <div className="form-section">
                    <label>Are emergency announcement scripts reviewed and approved by appropriate authorities, such as safety officers, emergency management personnel, or legal advisors?</label>
                    <div>
                        <input type="radio" name="reviewedScripts" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="reviewedScripts" value="no" onChange={handleChange} /> No
                        <textarea className='comment-box' name="reviewedScriptsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there a process for ensuring consistency and accuracy in scripted messages, including periodic updates to reflect changes in procedures, regulations, or best practices?</label>
                    <div>
                        <input type="radio" name="ensuringConsistency" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="ensuringConsistency" value="no" onChange={handleChange} /> No
                        <textarea className='comment-box' name="ensuringConsistencyComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <input type="text" name="ensuringConsistencyProcess" placeholder="Describe the process" onChange={handleChange} />  
                    </div>
                </div>

                <h2>Training and Familiarization:</h2>
                <div className="form-section">
                    <label>Are individuals responsible for delivering emergency announcements trained on the use of scripted messages and communication protocols?</label>
                    <div>
                        <input type="radio" name="trainedIndividuals" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="trainedIndividuals" value="no" onChange={handleChange} /> No
                        <textarea className='comment-box' name="trainedIndividualsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Do training programs include practice sessions to familiarize operators with different types of emergencies and associated message templates?</label>
                    <div>
                        <input type="radio" name="trainingPrograms" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="trainingPrograms" value="no" onChange={handleChange} /> No
                        <textarea className='comment-box' name="trainingProgramsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are operators provided with resources, such as cue cards or reference guides, to assist them in delivering scripted messages accurately and confidently?</label>
                    <div>
                        <input type="radio" name="deliveringMessagesResources" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="deliveringMessagesResources" value="no" onChange={handleChange} /> No
                        <textarea className='comment-box' name="deliveringMessagesResourcesComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>
                
                <h2>Adaptability and Flexibility:</h2>
                <div className="form-section">
                    <label>Are scripted messages adaptable to accommodate variations in emergency scenarios, such as the scale, severity, or duration of the event?</label>
                    <div>
                        <input type="radio" name="adaptableScriptedMessages" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="adaptableScriptedMessages" value="no" onChange={handleChange} /> No
                        <textarea className='comment-box' name="adaptableScriptedMessagesComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there flexibility built into message templates to allow for real-time updates or modifications based on evolving circumstances or new information?</label>
                    <div>
                        <input type="radio" name="FlexibilityInTemplates" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="FlexibilityInTemplates" value="no" onChange={handleChange} /> No
                        <textarea className='comment-box' name="FlexibilityInTemplatesComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Evaluation and Feedback:</h2>
                <div className="form-section">
                    <label>Are scripted messages evaluated for their effectiveness in conveying critical information and guiding appropriate responses during drills and actual emergencies?</label>
                    <div>
                        <input type="radio" name="evaluatedEffectiveness" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="evaluatedEffectiveness" value="no" onChange={handleChange} /> No
                        <textarea className='comment-box' name="evaluatedEffectivenessComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Is feedback solicited from occupants and stakeholders to assess the clarity, comprehensibility, and usefulness of scripted messages?</label>
                    <div>
                        <input type="radio" name="solicitedFeedback" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="solicitedFeedback" value="no" onChange={handleChange} /> No
                        <textarea className='comment-box' name="solicitedFeedbackComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are recommendations from evaluations used to refine scripted messages and improve their efficacy in future emergency situations?</label>
                    <div>
                        <input type="radio" name="recommendationsRefineMessages" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="recommendationsRefineMessages" value="no" onChange={handleChange} /> No
                        <textarea className='comment-box' name="recommendationsRefineMessagesComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit">Submit</button>

            </form>
        </main>
    </div>
  )
}

export default EmergencyAnnouncementProtocolsFormPage;