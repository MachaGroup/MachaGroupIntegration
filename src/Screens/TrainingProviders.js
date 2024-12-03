import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';

function TrainingProvidersFormPage() {
  const navigate = useNavigate();  // Initialize useNavigate hook for navigation
  const { buildingId } = useBuilding(); // Access buildingId from context
  const db = getFirestore();

  const [formData, setFormData] = useState();

  useEffect(() => {
      if (!buildingId) {
          alert('No building selected. Redirecting to Building Info...');
          navigate('/BuildingandAddress');
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
  const handleBack = () => {
    navigate(-1);  // Navigates to the previous page
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!buildingId) {
        alert('Building ID is missing. Please start the assessment from the correct page.');
        return;
    }

    try {
      // Create a document reference to the building in the 'Buildings' collection
      const buildingRef = doc(db, 'Buildings', buildingId); 

      // Store the form data in the specified Firestore structure
      const formsRef = collection(db, 'forms/Personnel Training and Awareness/Training Providers');
      await addDoc(formsRef, {
          building: buildingRef, // Reference to the building document
          formData: formData, // Store the form data as a nested object
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
            {/* Back Button */}
          <button className="back-button" onClick={handleBack}>←</button> {/* Back button at the top */}
          <h1>Training Providers Assessment</h1>
          <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
          <form onSubmit={handleSubmit}>
            {/* 3.1.1.1.1 Training Providers */}
            <h2>Certification and Accreditation:</h2>
            <div className="form-section">
              <label>Are training providers certified and accredited to deliver First Aid/CPR training programs?</label>
              <div>
                <input type="radio" name="providerCertification" value="yes" onChange={handleChange}/> Yes
                <input type="radio" name="providerCertification" value="no" onChange={handleChange}/> No
              </div>
            </div>

            <div className="form-section">
              <label>Do training providers adhere to recognized standards and guidelines for First Aid/CPR training, such as those established by organizations like the American Red Cross or the American Heart Association?</label>
              <div>
                <input type="radio" name="providerStandardsCompliance" value="yes" onChange={handleChange}/> Yes
                <input type="radio" name="providerStandardsCompliance" value="no" onChange={handleChange}/> No
              </div>
            </div>

            <h2>Instructor Qualifications:</h2>
            <div className="form-section">
              <label>Are instructors employed by training providers qualified and experienced in delivering First Aid/CPR training?</label>
              <div>
                <input type="radio" name="instructorQualification" value="yes" onChange={handleChange}/> Yes
                <input type="radio" name="instructorQualification" value="no" onChange={handleChange}/> No
              </div>
            </div>

            <div className="form-section">
              <label>Do instructors possess relevant certifications and qualifications, such as Certified First Aid/CPR Instructor credentials?</label>
              <div>
                <input type="text" name="instructorCertificationList" placeholder="List the certifications/qualifications" onChange={handleChange}/>
              </div>
            </div>

            <h2>Curriculum Content:</h2>
            <div className="form-section">
              <label>Is the training curriculum comprehensive and up-to-date, covering essential topics related to First Aid/CPR procedures, techniques, and best practices?</label>
              <div>
                <input type="radio" name="curriculumComprehensiveness" value="yes" onChange={handleChange}/> Yes
                <input type="radio" name="curriculumComprehensiveness" value="no" onChange={handleChange}/> No
              </div>
            </div>

            <div className="form-section">
              <label>Does the curriculum align with recognized standards and guidelines for First Aid/CPR training?</label>
              <div>
                <input type="radio" name="curriculumAlignment" value="yes" onChange={handleChange}/> Yes
                <input type="radio" name="curriculumAlignment" value="no" onChange={handleChange}/> No
              </div>
            </div>

            <h2>Training Delivery:</h2>
            <div className="form-section">
              <label>Are training sessions conducted in a suitable training environment that allows for hands-on practice and skills demonstration?</label>
              <div>
                <input type="radio" name="trainingEnvironment" value="yes" onChange={handleChange}/> Yes
                <input type="radio" name="trainingEnvironment" value="no" onChange={handleChange}/> No
              </div>
            </div>

            <div className="form-section">
              <label>Are training sessions delivered using a variety of instructional methods and resources to accommodate different learning styles and preferences?</label>
              <div>
                <input type="radio" name="trainingMethodsVariety" value="yes" onChange={handleChange}/> Yes
                <input type="radio" name="trainingMethodsVariety" value="no" onChange={handleChange}/> No
              </div>
            </div>

            <h2>Participant Engagement:</h2>
            <div className="form-section">
              <label>Are training sessions interactive and engaging, encouraging active participation and skills development among participants?</label>
              <div>
                <input type="radio" name="participantEngagement" value="yes" onChange={handleChange}/> Yes
                <input type="radio" name="participantEngagement" value="no" onChange={handleChange}/> No
              </div>
            </div>

            <div className="form-section">
              <label>Are opportunities provided for participants to ask questions, seek clarification, and practice First Aid/CPR techniques under instructor supervision?</label>
              <div>
                <input type="radio" name="practiceOpportunities" value="yes" onChange={handleChange}/> Yes
                <input type="radio" name="practiceOpportunities" value="no" onChange={handleChange}/> No
              </div>
            </div>

            <h2>Assessment and Evaluation:</h2>
            <div className="form-section">
              <label>Are participants assessed on their understanding and proficiency in First Aid/CPR procedures through written tests and practical skills assessments?</label>
              <div>
                <input type="radio" name="participantAssessment" value="yes" onChange={handleChange}/> Yes
                <input type="radio" name="participantAssessment" value="no" onChange={handleChange}/> No
              </div>
            </div>

            <div className="form-section">
              <label>Are instructors responsible for evaluating participant performance and providing constructive feedback for improvement?</label>
              <div>
                <input type="radio" name="instructorEvaluationFeedback" value="yes" onChange={handleChange}/> Yes
                <input type="radio" name="instructorEvaluationFeedback" value="no" onChange={handleChange}/> No
              </div>
            </div>

            <h2>Certification and Recertification:</h2>
            <div className="form-section">
              <label>Are participants awarded certifications upon successful completion of First Aid/CPR training courses?</label>
              <div>
                <input type="radio" name="participantCertification" value="yes" onChange={handleChange}/> Yes
                <input type="radio" name="participantCertification" value="no" onChange={handleChange}/> No
              </div>
            </div>

            <div className="form-section">
              <label>Is there a process in place for recertifying staff members on a regular basis to ensure that their skills and knowledge remain current and up-to-date?</label>
              <div>
                <input type="text" name="recertificationDetails" placeholder="Describe the process" onChange={handleChange}/>
              </div>
            </div>

            <h2>Feedback and Improvement:</h2>
            <div className="form-section">
              <label>Are feedback mechanisms in place to gather input from participants regarding the quality and effectiveness of First Aid/CPR training programs?</label>
              <div>
                <input type="text" name="feedbackDetails" placeholder="Describe the feedback mechanisms" onChange={handleChange}/>
              </div>
            </div>

            <div className="form-section">
              <label>Are recommendations for enhancing training content, delivery methods, or instructor performance considered and implemented based on feedback received?</label>
              <div>
                <input type="radio" name="recommendationsImplementation" value="yes" onChange={handleChange}/> Yes
                <input type="radio" name="recommendationsImplementation" value="no" onChange={handleChange}/> No
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  )
}

export default TrainingProvidersFormPage;