import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function PhishingAwarenessTrainingPage() {
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
        const formsRef = collection(db, 'forms/Cybersecurity/Phishing Awareness Training');
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
      const formsRef = collection(db, 'forms/Cybersecurity/Phishing Awareness Training');
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
        <button className="back-button" onClick={handleBack}>←</button>
        <h1>Phishing Awareness Training Assessment</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          {/* Training Content and Structure */}
          <h2>4.3.1.1.2.1 Training Content and Structure:</h2>
          <div className="form-section">
            <label>What specific topics are covered in phishing awareness training, and how are they designed to address the latest phishing tactics and techniques?</label>
            <textarea name="trainingTopics" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>Are the training modules interactive and engaging to ensure users are actively learning and retaining information?</label>
            <div>
              <input type="radio" name="interactiveTraining" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="interactiveTraining" value="No" onChange={handleChange} /> No
              <textarea className='comment-box' name="interactiveTrainingComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>
          <div className="form-section">
            <label>How frequently is phishing awareness training updated to reflect new threats and developments in phishing tactics?</label>
            <textarea name="trainingUpdateFrequency" onChange={handleChange}></textarea>
          </div>

          {/* Effectiveness and Retention */}
          <h2>4.3.1.1.2.2 Effectiveness and Retention:</h2>
          <div className="form-section">
            <label>How is the effectiveness of phishing awareness training measured (e.g., user assessments, reduced phishing incidents)?</label>
            <textarea name="effectivenessMeasurement" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>Are there periodic refresher courses to reinforce key concepts and ensure ongoing vigilance against phishing threats?</label>
            <div>
              <input type="radio" name="refresherCourses" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="refresherCourses" value="No" onChange={handleChange} /> No
              <textarea className='comment-box' name="refresherCoursesComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>
          <div className="form-section">
            <label>What methods are used to assess knowledge retention over time, and how is this data used to improve the training program?</label>
            <textarea name="knowledgeRetentionAssessment" onChange={handleChange}></textarea>
          </div>

          {/* Customization and Relevance */}
          <h2>4.3.1.1.2.3 Customization and Relevance:</h2>
          <div className="form-section">
            <label>Is the phishing awareness training tailored to different user roles within the organization to address specific risks and scenarios they may encounter?</label>
            <div>
              <input type="radio" name="roleBasedTraining" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="roleBasedTraining" value="No" onChange={handleChange} /> No
              <textarea className='comment-box' name="roleBasedTrainingComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>
          <div className="form-section">
            <label>How does the training accommodate users with varying levels of technical expertise and familiarity with phishing threats?</label>
            <textarea name="trainingAdaptation" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>Are real-world examples and case studies used in the training to provide practical, relatable insights for users?</label>
            <div>
              <input type="radio" name="realWorldExamples" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="realWorldExamples" value="No" onChange={handleChange} /> No
              <textarea className='comment-box' name="realWorldExamplesComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          {/* User Feedback and Engagement */}
          <h2>4.3.1.1.2.4 User Feedback and Engagement:</h2>
          <div className="form-section">
            <label>Is there a mechanism for users to provide feedback on the phishing awareness training program, and how is this feedback incorporated into future updates?</label>
            <textarea name="userFeedbackMechanism" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>Are there opportunities for users to ask questions or seek clarification on phishing-related concerns during or after training sessions?</label>
            <div>
              <input type="radio" name="questionsOpportunities" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="questionsOpportunities" value="No" onChange={handleChange} /> No
              <textarea className='comment-box' name="questionsOpportunitiesComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>
          <div className="form-section">
            <label>How is user engagement measured during training sessions, and what strategies are in place to maintain high levels of participation?</label>
            <textarea name="engagementMeasurement" onChange={handleChange}></textarea>
          </div>

          {/* Integration with Broader Security Awareness Programs */}
          <h2>4.3.1.1.2.5 Integration with Broader Security Awareness Programs:</h2>
          <div className="form-section">
            <label>How is phishing awareness training integrated with other cybersecurity awareness initiatives, such as data protection and password security?</label>
            <textarea name="integrationWithAwareness" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>Are there cross-departmental efforts to ensure a cohesive approach to phishing awareness across the organization?</label>
            <div>
              <input type="radio" name="crossDepartmentalEfforts" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="crossDepartmentalEfforts" value="No" onChange={handleChange} /> No
              <textarea className='comment-box' name="crossDepartmentalEffortsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>
          <div className="form-section">
            <label>How is the success of phishing awareness training linked to broader organizational goals, such as reducing security breaches and enhancing overall cybersecurity posture?</label>
            <textarea name="trainingSuccessLink" onChange={handleChange}></textarea>
          </div>

          {/* Continuous Improvement and Adaptation */}
          <h2>4.3.1.1.2.6 Continuous Improvement and Adaptation:</h2>
          <div className="form-section">
            <label>Are there regular reviews of phishing awareness training materials to ensure they remain current and effective?</label>
            <div>
              <input type="radio" name="regularReviews" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="regularReviews" value="No" onChange={handleChange} /> No
              <textarea className='comment-box' name="regularReviewsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>
          <div className="form-section">
            <label>How does the organization ensure that training materials evolve in response to emerging phishing tactics and technologies?</label>
            <textarea name="materialEvolution" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>Is there a process for incorporating lessons learned from real phishing incidents into the training program?</label>
            <textarea name="lessonsLearned" onChange={handleChange}></textarea>
          </div>

          {/* Compliance and Accountability */}
          <h2>4.3.1.1.2.7 Compliance and Accountability:</h2>
          <div className="form-section">
            <label>Are there any regulatory or compliance requirements driving the need for phishing awareness training within the organization?</label>
            <div>
              <input type="radio" name="complianceRequirements" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="complianceRequirements" value="No" onChange={handleChange} /> No
              <textarea className='comment-box' name="complianceRequirementsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>
          <div className="form-section">
            <label>How is compliance with phishing awareness training tracked and reported to ensure all employees participate as required?</label>
            <textarea name="complianceTracking" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>Are there consequences or follow-up actions for employees who fail to complete training or demonstrate poor phishing awareness?</label>
            <textarea name="trainingConsequences" onChange={handleChange}></textarea>
          </div>

          {/* Support Resources and Tools */}
          <h2>4.3.1.1.2.8 Support Resources and Tools:</h2>
          <div className="form-section">
            <label>Are users provided with additional resources or tools (e.g., guides, checklists) to help them recognize phishing attempts outside of formal training?</label>
            <div>
              <input type="radio" name="additionalResources" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="additionalResources" value="No" onChange={handleChange} /> No
              <textarea className='comment-box' name="additionalResourcesComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>
          <div className="form-section">
            <label>Is there ongoing support available, such as a helpdesk or dedicated team, to assist users with phishing-related questions or concerns?</label>
            <div>
              <input type="radio" name="ongoingSupport" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="ongoingSupport" value="No" onChange={handleChange} /> No
              <textarea className='comment-box' name="ongoingSupportComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>
          <div className="form-section">
            <label>How are users encouraged to stay vigilant and proactive in reporting suspected phishing emails or incidents?</label>
            <textarea name="userEncouragement" onChange={handleChange}></textarea>
          </div>

          <input type="file" accept="image/*" onChange={handleImageChange} />
{uploadProgress > 0 && <p>Upload Progress: {uploadProgress.toFixed(2)}%</p>}
{imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
{uploadError && <p style={{ color: "red" }}>{uploadError}</p>}
<button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}

export default PhishingAwarenessTrainingPage;
