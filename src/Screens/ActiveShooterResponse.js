import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function ActiveShooterResponseFormPage() {
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
      navigate('/BuildingandAddress');
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
        const formsRef = collection(db, 'forms/Personnel Training and Awareness/Active Shooter Response');
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
      const formsRef = collection(db, 'forms/Personnel Training and Awareness/Active Shooter Response');

      if (image) {
        const storageRef = ref(storage, `activeShooterResponse_images/${Date.now()}_${image.name}`);
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

      console.log('Form data submitted successfully!');
      alert('Form submitted successfully!');
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
        <h1>Active Shooter Response Assessment</h1>
        <img src={logo} alt='Logo' className='logo' />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          {/* 3.1.1.2.8 Active Shooter Response */}
          <h2>Training Curriculum and Content:</h2>
          <div className="form-section">
            <label>What topics and skills are covered in active shooter response training programs, such as situational awareness, threat recognition, decision-making under stress, and survival tactics?</label>
            <div>
              <input type="text" name="asrTrainingTopics" placeholder="List the topics/skills" onChange={handleChange} />
            </div>
          </div>
          {/* ...rest of your form questions... */}
          <div className="form-section">
                  <label>Are training materials and resources based on recognized active shooter response protocols, guidelines, and recommendations from law enforcement agencies, security experts, or government agencies?</label>
                  <div>
                    <input type="radio" name="asrMaterialsAlignment" value="yes" onChange={handleChange}/> Yes
                    <input type="radio" name="asrMaterialsAlignment" value="no" onChange={handleChange}/> No
                    <textarea className='comment-box' name="asrMaterialsAlignmentComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                  </div>
                </div>

                <div className="form-section">
                  <label>How do active shooter response training programs address key concepts such as the "Run, Hide, Fight" protocol, evacuation procedures, barricading techniques, and communication strategies during an active shooter incident?</label>
                  <div>
                    <input type="text" name="asrKeyConcepts" placeholder="Describe how they address concepts" onChange={handleChange}/>
                  </div>
                </div>

                <h2>Scenario-based Training and Drills:</h2>
                <div className="form-section">
                  <label>To what extent do active shooter response training sessions incorporate scenario-based simulations, tabletop exercises, and live drills to prepare staff members for real-life emergencies?</label>
                  <div>
                    <input type="text" name="asrScenarioSimulations" placeholder="Describe how the incorporation" onChange={handleChange}/>
                  </div>
                </div>

                <div className="form-section">
                  <label>Are staff members provided with opportunities to practice response options, decision-making skills, and coordinated actions in simulated active shooter scenarios?</label>
                  <div>
                    <input type="radio" name="asrScenarioPractice" value="yes" onChange={handleChange}/> Yes
                    <input type="radio" name="asrScenarioPractice" value="no" onChange={handleChange}/> No
                    <textarea className='comment-box' name="asrScenarioPracticeComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                  </div>
                </div>

                <div className="form-section">
                  <label>How are active shooter drills conducted to simulate various threat scenarios, test emergency communication systems, and evaluate staff readiness and response effectiveness?</label>
                  <div>
                    <input type="text" name="asrDrillConduction" placeholder="Describe how they're conducted" onChange={handleChange}/>
                  </div>
                </div>

                <h2>Crisis Communication and Coordination:</h2>
                <div className="form-section">
                  <label>How are staff members trained to communicate effectively with colleagues, students, and emergency responders during an active shooter incident?</label>
                  <div>
                    <input type="text" name="asrCommunicationTraining" placeholder="Describe how they're trained" onChange={handleChange}/>
                  </div>
                </div>

                <div className="form-section">
                  <label>Are communication protocols established to relay critical information, issue alerts, and coordinate response efforts across different areas of the school campus?</label>
                  <div>
                    <input type="radio" name="asrCommunicationProtocols" value="yes" onChange={handleChange}/> Yes
                    <input type="radio" name="asrCommunicationProtocols" value="no" onChange={handleChange}/> No
                    <textarea className='comment-box' name="asrCommunicationProtocolsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                  </div>
                </div>

                <div className="form-section">
                  <label>What mechanisms are in place to facilitate communication with law enforcement agencies, emergency dispatch centers, and other external stakeholders during an active shooter crisis?</label>
                  <div>
                    <input type="text" name="asrExternalCommunication" placeholder="Describe the mechanisms" onChange={handleChange}/>
                  </div>
                </div>

                <h2>Emergency Action Planning and Decision-making:</h2>
                <div className="form-section">
                  <label>How are staff members trained to assess the situation, make rapid decisions, and implement appropriate response strategies based on the evolving threat environment during an active shooter incident?</label>
                  <div>
                    <input type="text" name="asrDecisionTraining" placeholder="Describe how they're assessed" onChange={handleChange}/>
                  </div>
                </div>

                <div className="form-section">
                  <label>Are decision-making frameworks, decision trees, or decision support tools provided to guide staff members in determining the most effective course of action in different scenarios?</label>
                  <div>
                    <input type="radio" name="asrDecisionFrameworks" value="yes" onChange={handleChange}/> Yes
                    <input type="radio" name="asrDecisionFrameworks" value="no" onChange={handleChange}/> No
                    <textarea className='comment-box' name="asrDecisionFrameworksComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                  </div>
                </div>

                <div className="form-section">
                  <label>What provisions are in place to empower staff members to take decisive action to protect themselves and others, including options for evacuation, lockdown, sheltering, or countermeasures?</label>
                  <div>
                    <input type="text" name="asrActionProvisions" placeholder="Describe the provisions" onChange={handleChange}/>
                  </div>
                </div>

                <h2>Post-Incident Support and Debriefing:</h2>
                <div className="form-section">
                  <label>What resources and support services are available to staff members following an active shooter incident, including psychological first aid, counseling, and debriefing sessions?</label>
                  <div>
                    <input type="text" name="asrSupportResources" placeholder="Describe the resources/services" onChange={handleChange}/>
                  </div>
                </div>

                <div className="form-section">
                  <label>Are post-incident debriefings conducted to review response actions, identify lessons learned, address concerns, and implement improvements to emergency preparedness plans and procedures?</label>
                  <div>
                    <input type="radio" name="asrDebriefings" value="yes" onChange={handleChange}/> Yes
                    <input type="radio" name="asrDebriefings" value="no" onChange={handleChange}/> No
                    <textarea className='comment-box' name="asrDebriefingsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                  </div>
                </div>

                <div className="form-section">
                  <label>How are staff members encouraged to share their experiences, provide feedback on training effectiveness, and contribute to the continuous improvement of active shooter response protocols?</label>
                  <div>
                    <input type="text" name="asrFeedbackContribution" placeholder="Describe how they're encouraged" onChange={handleChange}/>
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

export default ActiveShooterResponseFormPage;
