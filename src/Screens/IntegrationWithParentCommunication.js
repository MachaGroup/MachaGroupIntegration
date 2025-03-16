import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import Navbar from "./Navbar";

function IntegrationWithParentCommunicationFormPage() {
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
            <h1>Integration with Parent Communication Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 2.4.1.1.6 Integration with Parent Communication */}
                <h2>Existence of Integration Mechanisms:</h2>
                <div className="form-section">
                    <label>Is there a mechanism in place to integrate text/email alerts with parent communication systems to facilitate automatic notifications during emergencies?</label>
                    <div>
                        <input type="radio" name="integratingMechanism" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="integratingMechanism" value="no" onChange={handleChange} /> No
                    </div>
                    <div>
                        <input type="text" name="integratingMechanismText" placeholder="Describe the mechanism" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there established protocols or interfaces for connecting the alerting system with parent communication platforms or databases?</label>
                    <div>
                        <input type="radio" name="connectingAlertSystem" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="connectingAlertSystem" value="no" onChange={handleChange} /> No
                    </div>
                    <div>
                        <input type="text" name="connectingAlertSystemProtocols" placeholder="Describe the protocols" onChange={handleChange} />  
                    </div>
                </div>

                <h2>Automatic Notification Configuration:</h2>
                <div className="form-section">
                    <label>Are automatic notification configurations set up to ensure that parent contact information is automatically included in text/email alerts during emergencies?</label>
                    <div>
                        <input type="radio" name="automaticNotificationConfigurations" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="automaticNotificationConfigurations" value="no" onChange={handleChange} /> No
                        <textarea className='comment-box' name="automaticNotificationConfiguration" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are procedures established for syncing or updating parent contact details between the alerting system and parent communication databases?</label>
                    <div>
                        <input type="radio" name="syncingContactDetails" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="syncingContactDetails" value="no" onChange={handleChange} /> No
                    </div>
                    <div>
                        <input type="text" name="syncingContactDetailsProcedures" placeholder="Describe the procedures" onChange={handleChange} />  
                    </div>
                </div>

                <h2>Consent and Opt-In/Opt-Out:</h2>
                <div className="form-section">
                    <label>Are parents provided with opportunities to opt in or opt out of receiving text/email alerts, and are their preferences documented and respected?</label>
                    <div>
                        <input type="radio" name="optInOptOutAlerts" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="optInOptOutAlerts" value="no" onChange={handleChange} /> No
                        <textarea className='comment-box' name="optInOptOutAlerts" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there a process for obtaining consent from parents for the inclusion of their contact information in emergency notifications?</label>
                    <div>
                        <input type="radio" name="obtainingConsent" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="obtainingConsent" value="no" onChange={handleChange} /> No
                    </div>
                    <div>
                        <input type="text" name="obtainingConsentProcess" placeholder="Describe the process" onChange={handleChange} />  
                    </div>
                </div>

                <h2>Data Security and Privacy:</h2>
                <div className="form-section">
                    <label>Are appropriate measures implemented to safeguard the security and privacy of parent contact information stored or transmitted through the alerting system?</label>
                    <div>
                        <input type="radio" name="implementingSafeguardMeasures" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="implementingSafeguardMeasures" value="no" onChange={handleChange} /> No
                        <textarea className='comment-box' name="implementingSafeguardMeasures" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Do integration mechanisms comply with relevant privacy regulations and organizational policies governing the handling of sensitive data?</label>
                    <div>
                        <input type="radio" name="integrationMechanisms" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="integrationMechanisms" value="no" onChange={handleChange} /> No
                        <textarea className='comment-box' name="integrationMechanisms" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Communication Protocols:</h2>
                <div className="form-section">
                    <label>Are communication protocols established to facilitate coordination between school authorities and parents during emergency situations?</label>
                    <div>
                        <input type="radio" name="facilitatingCoordination" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="facilitatingCoordination" value="no" onChange={handleChange} /> No
                    </div>
                    <div>
                        <input type="text" name="facilitatingCoordinationProtocols" placeholder="Describe the communication protocols" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there a designated method or channel for communicating with parents, providing updates, and addressing concerns or inquiries?</label>
                    <div>
                        <input type="radio" name="communicationWithParents" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="communicationWithParents" value="no" onChange={handleChange} /> No
                    </div>
                    <div>
                        <input type="text" name="communicationWithParentsMethod" placeholder="Describe the designated method" onChange={handleChange} />  
                    </div>
                </div>

                <h2>Training and Awareness:</h2>
                <div className="form-section">
                    <label>Are parents informed about the integration of text/email alerts with parent communication systems and the procedures for receiving emergency notifications?</label>
                    <div>
                        <input type="radio" name="informingParentsIntegration" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="informingParentsIntegration" value="no" onChange={handleChange} /> No
                        <textarea className='comment-box' name="informingParentsIntegration" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are resources or educational materials provided to help parents understand how to opt in or opt out of receiving alerts and how to update their contact information?</label>
                    <div>
                        <input type="radio" name="helpingParentsResources" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="helpingParentsResources" value="no" onChange={handleChange} /> No
                        <textarea className='comment-box' name="helpingParentsResources" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Feedback and Evaluation:</h2>
                <div className="form-section">
                    <label>Are feedback mechanisms in place to solicit input from parents regarding the effectiveness and usefulness of text/email alerts during emergencies?</label>
                    <div>
                        <input type="radio" name="effectivenessMechanismsFeedback" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="effectivenessMechanismsFeedback" value="no" onChange={handleChange} /> No
                    </div>
                    <div>
                        <input type="text" name="effectivenessMechanismsFeedbackText" placeholder="Describe the feedback mechanisms" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Is parent feedback used to evaluate and improve the integration of alerting systems with parent communication platforms over time?</label>
                    <div>
                        <input type="radio" name="evaluatingParentFeedback" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="evaluatingParentFeedback" value="no" onChange={handleChange} /> No
                        <textarea className='comment-box' name="evaluatingParentFeedback" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Testing and Verification:</h2>
                <div className="form-section">
                    <label>Are integration mechanisms tested and verified periodically to ensure that parent contact information is accurately included in text/email alerts and that notifications are delivered as intended?</label>
                    <div>
                        <input type="radio" name="testingIntegrationMechanisms" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="testingIntegrationMechanisms" value="no" onChange={handleChange} /> No
                        <textarea className='comment-box' name="testingIntegrationMechanisms" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are test scenarios conducted to simulate emergency situations and assess the reliability and responsiveness of the integrated alerting system?</label>
                    <div>
                        <input type="radio" name="testingScenarios" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="testingScenarios" value="no" onChange={handleChange} /> No
                        <textarea className='comment-box' name="testingScenarios" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit">Submit</button>

            </form>
        </main>
    </div>
  )
}

export default IntegrationWithParentCommunicationFormPage;