import React, { useState, useEffect, useRef } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import debounce from 'lodash.debounce';

function ScenarioBasedTrainingFormPage() {
  const navigate = useNavigate();
  const { buildingId } = useBuilding();
  const db = getFirestore();
  const storage = getStorage();

  const [formData, setFormData] = useState({});
  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [saveError, setSaveError] = useState(null);
  const [uploadError, setUploadError] = useState(null); // ✅ ADDED uploadError state

  const latestFormData = useRef(formData);

  useEffect(() => { latestFormData.current = formData; }, [formData]);

  const debouncedSave = useRef(debounce(async (dataToSave, imgUrl) => {
    try {
      const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Scenario Based Training', buildingId);
      await setDoc(formDocRef, { formData: dataToSave, imageUrl: imgUrl, updatedAt: serverTimestamp() }, { merge: true });
      setSaveError(null);
    } catch (error) {
      console.error("Error saving form data:", error);
      setSaveError("Failed to save form data. Please try again.");
    }
  }, 500)).current;

  useEffect(() => {
    if (!buildingId) {
      alert('No building selected. Redirecting to Building Info...');
      navigate('/BuildingandAddress');
      return;
    }

    const fetchFormData = async () => {
      setLoading(true);
      setLoadError(null);
      try {
        const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Scenario Based Training', buildingId);
        const docSnapshot = await getDoc(formDocRef);
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setFormData(data.formData || {});
          setImageUrl(data.imageUrl || null);
        } else {
          setFormData({});
        }
      } catch (error) {
        console.error("Error fetching form data:", error);
        setLoadError("Failed to load form data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchFormData();
    return () => { debouncedSave.cancel(); };
  }, [buildingId, db, navigate]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'radio' ? (checked ? value : '') : value;
    setFormData(prev => {
      const updated = { ...prev, [name]: newValue };
      debouncedSave(updated, imageUrl);
      return updated;
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const imageFile = e.target.files[0];
      setImage(imageFile);
      const storageRef = ref(storage, `images/${imageFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on('state_changed',
        (snapshot) => setUploadProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100),
        (error) => setUploadError("Failed to upload image. Please try again."),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUrl(downloadURL);
            handleInputChange({ target: { name: 'imageUrl', value: downloadURL } });
          });
        }
      );
    }
  };

  const handleBack = () => navigate(-1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!buildingId) return alert('Building ID is missing. Start from the correct page.');

    try {
      const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Scenario Based Training', buildingId);
      await setDoc(formDocRef, { formData, imageUrl, updatedAt: serverTimestamp() }, { merge: true });
      alert('Form submitted successfully!');
      navigate('/Form');
    } catch (error) {
      console.error("Submit error:", error);
      alert('Failed to submit the form. Please try again.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (loadError) return <div>Error: {loadError}</div>;
  if (saveError) return <div>Error: {saveError}</div>;

  const renderQuestion = (label, name, radio = false) => (
    <div className="form-section">
      <label>{label}</label>
      {radio ? (
        <>
          <div>
            <input type="radio" name={name} value="yes" checked={formData[name] === "yes"} onChange={handleInputChange} /> Yes
            <input type="radio" name={name} value="no" checked={formData[name] === "no"} onChange={handleInputChange} /> No
          </div>
          <div>
            <input type="text" name={`${name}Comment`} value={formData[`${name}Comment`] || ''} placeholder="Comments" onChange={handleInputChange} />
          </div>
        </>
      ) : (
        <input type="text" name={name} value={formData[name] || ''} onChange={handleInputChange} />
      )}
    </div>
  );

  return (
    <div className="form-page">
      <header className="header">
        <Navbar />
        <button className="back-button" onClick={handleBack}>←</button>
        <h1>Scenario-Based Training Assessment</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>
      <main className="form-container">
        <form onSubmit={handleSubmit}>

          {renderQuestion("How are scenarios for scenario-based training developed, and are they based on realistic and relevant emergency situations?", "scenarioDevelopmentDescription")}
          {renderQuestion("Are scenarios tailored to address specific threats or hazards that staff may encounter?", "scenarioSpecificity", true)}
          {renderQuestion("What considerations are taken into account when designing scenarios?", "scenarioDesignConsiderations")}
          {renderQuestion("Are scenarios categorized based on severity levels or types of emergencies?", "scenarioCategorization", true)}
          {renderQuestion("How are scenario development processes documented and reviewed?", "scenarioDocumentationProcess")}

          {renderQuestion("How are scenario-based training sessions conducted, and what methods or tools are used?", "scenarioSessionConduct")}
          {renderQuestion("Are scenarios integrated into tabletop exercises, simulations, or full-scale drills?", "scenarioIntegration", true)}
          {renderQuestion("What resources or support are provided for safe and effective execution?", "scenarioResources")}
          {renderQuestion("Are contingency plans in place during scenario implementation?", "scenarioContingencyPlans", true)}
          {renderQuestion("How are scenarios modified or updated over time?", "scenarioUpdates")}

          {renderQuestion("How are staff engaged in scenario-based training exercises?", "participantEngagement")}
          {renderQuestion("Are participants encouraged to make decisions, take actions, and communicate?", "activeParticipation", true)}
          {renderQuestion("What measures address any concerns or anxieties of staff?", "participantConcernsMeasures")}
          {renderQuestion("Are scenarios designed to promote teamwork and communication?", "scenarioTeamwork", true)}
          {renderQuestion("How is participant feedback incorporated into scenario design?", "feedbackIntegration")}

          {renderQuestion("What specific learning objectives are targeted?", "learningObjectives")}
          {renderQuestion("Are scenarios designed to reinforce key concepts, procedures, or protocols?", "reinforceKeyConcepts", true)}
          {renderQuestion("How are learning outcomes assessed?", "outcomesEvaluation")}
          {renderQuestion("Are performance metrics used to measure training effectiveness?", "performanceMetrics", true)}
          {renderQuestion("How is participant knowledge assessed before and after training?", "knowledgeAssessment")}

          {renderQuestion("Is there a structured debriefing process post-training?", "debriefingSessions")}
          {renderQuestion("Are participants provided with constructive feedback?", "constructiveFeedback", true)}
          {renderQuestion("How are lessons learned documented and used for improvement?", "lessonsLearnedDocumentation")}
          {renderQuestion("Are debriefing sessions used to identify improvement areas?", "debriefingImprovement", true)}
          {renderQuestion("What mechanisms ensure feedback is used to enhance training?", "feedbackEnhancementMechanisms")}

          {renderQuestion("How are scenarios varied by complexity, duration, and intensity?", "scenarioVariation")}
          {renderQuestion("Are scenarios adjusted based on participant skill level and roles?", "scenarioAdjustment", true)}
          {renderQuestion("What strategies increase scenario complexity over time?", "complexityStrategies")}
          {renderQuestion("Are realistic stressors and environmental factors simulated?", "realisticSimulations", true)}
          {renderQuestion("How are ethical, legal, and psychological considerations addressed?", "considerationMeasures")}

          {renderQuestion("How are scenarios aligned with emergency response plans?", "integrationEmergencyPlans")}
          {renderQuestion("Are scenarios designed to test specific components of emergency plans?", "testEmergencyComponents", true)}
          {renderQuestion("How are lessons from scenarios incorporated into planning?", "trainingLessonsMeasures")}
          {renderQuestion("Are emergency teams involved in scenario development and implementation?", "emergencyTeamInvolvement", true)}
          {renderQuestion("How are training outcomes used to validate emergency plans?", "outcomesValidation")}

          <input type="file" accept="image/*" onChange={handleImageChange} />
          {uploadProgress > 0 && <p>Upload Progress: {uploadProgress.toFixed(2)}%</p>}
          {imageUrl && <img src={imageUrl} alt="Uploaded" />}
          {uploadError && <p style={{ color: "red" }}>{uploadError}</p>}

          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}

export default ScenarioBasedTrainingFormPage;

