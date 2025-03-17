import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function AlertActivationProceduresFormPage() {
  const navigate = useNavigate();
  const { buildingId } = useBuilding();
  const db = getFirestore();
  const storage = getStorage(); // Initialize Firebase Storage

  const [formData, setFormData] = useState({});
  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  useEffect(() => {
    if (!buildingId) {
      alert('No building selected. Redirecting to Building Info...');
      navigate('BuildingandAddress');
    }
  }, [buildingId, navigate]);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;

    if (type === 'radio') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked ? value : '',
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleBack = async () => {
    if (formData && buildingId) {
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

    if (!buildingId) {
      alert('Building ID is missing. Please start the assessment from the correct page.');
      return;
    }

    try {
      const buildingRef = doc(db, 'Buildings', buildingId);
      const formsRef = collection(db, 'forms/Emergency Preparedness/Drill Frequency');

      if (image) {
        const storageRef = ref(storage, `alertActivationProcedures_images/${Date.now()}_${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on('state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
          },
          (error) => {
            setUploadError(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setImageUrl(downloadURL);
              setFormData({ ...formData, imageUrl: downloadURL });
              setUploadError(null);
            });
          }
        );
      }

      await addDoc(formsRef, {
        building: buildingRef,
        formData: formData,
      });
      console.log('Form Data submitted successfully!');
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
        <button className="back-button" onClick={handleBack}>←</button>
        <h1>Alert Activation Procedures Assessment</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          {/* 2.4.1.1.5 Training and Skills */}
          <h2>Designated Staff Responsibilities:</h2>
          <div className="form-section">
            <label>Are specific individuals or roles designated as responsible for activating text/email alerts during emergencies?</label>
            <div>
              <input type="radio" name="responsibleForActivatingAlerts" value="yes" onChange={handleChange} /> Yes
              <input type="radio" name="responsibleForActivatingAlerts" value="no" onChange={handleChange} /> No
            </div>
            <textarea className='comment-box' name="responsibleForActivatingAlertsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            <div>
              <input type="text" name="responsibleForActivatingAlertsText" placeholder="List the individuals" onChange={handleChange} />
            </div>
          </div>
          {/* ...rest of your form questions... */}
          <div className="form-section">
                    <label>Is there clarity regarding the duties and authority of these designated staff members in initiating alert activations?</label>
                    <div>
                        <input type="radio" name="dutiesAndAuthorityClarity" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="dutiesAndAuthorityClarity" value="no" onChange={handleChange} /> No
                        <textarea className='comment-box' name="dutiesAndAuthorityClarityComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Chain of Command and Authority:</h2>
                <div className="form-section">
                    <label>Is there a defined chain of command for alert activations, outlining the hierarchy of decision-making and authorization levels?</label>
                    <div>
                        <input type="radio" name="chainOfCommand" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="chainOfCommand" value="no" onChange={handleChange} /> No
                        <textarea className='comment-box' name="chainOfCommandComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are procedures established for delegating alert activation responsibilities in the event that designated staff members are unavailable or incapacitated?</label>
                    <div>
                        <input type="radio" name="delegatingActivationResponsibilities" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="delegatingActivationResponsibilities" value="no" onChange={handleChange} /> No
                        <textarea className='comment-box' name="delegatingActivationResponsibilitiesComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <input type="text" name="delegatingActivationResponsibilitiesProcedures" placeholder="Describe the procedures" onChange={handleChange} />  
                    </div>
                </div>

                <h2>Activation Criteria and Triggers:</h2>
                <div className="form-section">
                    <label>Are criteria established for determining when text/email alerts should be activated during emergencies, based on predefined triggers or thresholds?</label>
                    <div>
                        <input type="radio" name="activatingAlertsCriteria" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="activatingAlertsCriteria" value="no" onChange={handleChange} /> No
                        <textarea className='comment-box' name="activatingAlertsCriteriaComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <input type="text" name="activatingAlertsCriteriaText" placeholder="Describe the criteria" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Do activation criteria consider factors such as the severity, immediacy, and scope of the emergency, as well as the potential impact on occupants and stakeholders?</label>
                    <div>
                        <input type="radio" name="activationCriteriaFactors" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="activationCriteriaFactors" value="no" onChange={handleChange} /> No
                        <textarea className='comment-box' name="activationCriteriaFactorsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Communication Protocols:</h2>
                <div className="form-section">
                    <label>Are communication protocols established to facilitate coordination and collaboration among designated staff members responsible for alert activations?</label>
                    <div>
                        <input type="radio" name="facilitatingCoordination" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="facilitatingCoordination" value="no" onChange={handleChange} /> No
                        <textarea className='comment-box' name="facilitatingCoordinationComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <input type="text" name="facilitatingCoordinationProtocols" placeholder="Describe the communication protocols" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there a designated method or channel for communicating alert activation decisions, ensuring timely dissemination of instructions and updates?</label>
                    <div>
                        <input type="radio" name="communicatingAlertActivationDecisions" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="communicatingAlertActivationDecisions" value="no" onChange={handleChange} /> No
                        <textarea className='comment-box' name="communicatingAlertActivationDecisionsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <input type="text" name="communicatingAlertActivationDecisionsMethod" placeholder="Describe the designated" onChange={handleChange} />  
                    </div>
                </div>

                <h2>Training and Familiarization:</h2>
                <div className="form-section">
                    <label>Are individuals responsible for activating text/email alerts trained on alert activation procedures, including their roles, responsibilities, and the use of alerting systems?</label>
                    <div>
                        <input type="radio" name="alertActivationProceduresTraining" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="alertActivationProceduresTraining" value="no" onChange={handleChange} /> No
                        <textarea className='comment-box' name="alertActivationProceduresTrainingComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Do training programs include practice exercises or simulations to familiarize staff members with alert activation protocols and decision-making processes?</label>
                    <div>
                        <input type="radio" name="practiceExercises" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="practiceExercises" value="no" onChange={handleChange} /> No
                        <textarea className='comment-box' name="practiceExercisesComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Documentation and Reporting:</h2>
                <div className="form-section">
                    <label>Are records maintained to document alert activation procedures, including details of activations, decisions made, and any follow-up actions taken?</label>
                    <div>
                        <input type="radio" name="maintainingRecords" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="maintainingRecords" value="no" onChange={handleChange} /> No
                        <textarea className='comment-box' name="maintainingRecordsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there a process for reporting alert activations to relevant stakeholders, management personnel, and regulatory authorities as necessary?</label>
                    <div>
                        <input type="radio" name="reportingAlertsToStakeholders" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="reportingAlertsToStakeholders" value="no" onChange={handleChange} /> No
                        <textarea className='comment-box' name="reportingAlertsToStakeholdersComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <input type="text" name="reportingAlertsToStakeholdersProcess" placeholder="Describe the process" onChange={handleChange} />  
                    </div>
                </div>

                <h2>Testing and Drills:</h2>
                <div className="form-section">
                    <label>Are alert activation procedures tested and evaluated regularly through drills and exercises to assess their effectiveness and readiness?</label>
                    <div>
                        <input type="radio" name="testingActivationProcedures" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="testingActivationProcedures" value="no" onChange={handleChange} /> No
                        <textarea className='comment-box' name="testingActivationProceduresComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are feedback mechanisms in place to capture observations, insights, and lessons learned from alert activation drills, with recommendations for improvement implemented as appropriate?</label>
                    <div>
                        <input type="radio" name="feedbackMechanisms" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="feedbackMechanisms" value="no" onChange={handleChange} /> No
                        <textarea className='comment-box' name="feedbackMechanismsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <input type="text" name="feedbackMechanismsText" placeholder="Describe the feedback mechanisms" onChange={handleChange} />  
                    </div>
                </div>

                <h2>Continuous Improvement:</h2>
                <div className="form-section">
                    <label>Are alert activation procedures reviewed and updated periodically to incorporate lessons learned from real-world incidents, drills, and changes in organizational structure or technology?</label>
                    <div>
                        <input type="radio" name="reviewingActivationProcedures" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="reviewingActivationProcedures" value="no" onChange={handleChange} /> No
                        <textarea className='comment-box' name="reviewingActivationProceduresComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there a culture of continuous improvement, where feedback from stakeholders and staff members is solicited and used to enhance alert activation protocols over time?</label>
                    <div>
                        <input type="radio" name="continuousImprovementCulture" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="continuousImprovementCulture" value="no" onChange={handleChange} /> No
                        <textarea className='comment-box' name="continuousImprovementCultureComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>
          {/* Image Upload */}
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
          {uploadError && <p style={{ color: 'red' }}>{uploadError.message}</p>}

          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  )
}

export default AlertActivationProceduresFormPage;
