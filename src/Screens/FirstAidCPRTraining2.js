import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
/**/
function FirstAidCPRTraining2FormPage() {
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
  const handleBack = async () => {
          if (formData && buildingId) { // Check if formData and buildingId exist
            try {
              const buildingRef = doc(db, 'Buildings', buildingId);
              const formsRef = collection(db, 'forms/Personnel Training and Awareness/First Aid CPR Training');
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
      // Create a document reference to the building in the 'Buildings' collection
      const buildingRef = doc(db, 'Buildings', buildingId); 

      // Store the form data in the specified Firestore structure
      const formsRef = collection(db, 'forms/Personnel Training and Awareness/First Aid CPR Training');
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
            <Navbar />
    {/* Back Button */}
    <button className="back-button" onClick={handleBack}>←</button> {/* Back button at the top */}
    <h1>3.1.1.2.4 First-Aid/CPR Training Assessment</h1>
    <img src={logo} alt="Logo" className="logo" />
  </header>

  <main className="form-container">
    <form onSubmit={handleSubmit}>
      {/* 3.1.1.2.4 First-Aid/CPR Training */}
      <h2>3.1.1.2.4.1 Training Program Effectiveness:</h2>
      <div className="form-section">
        <label>How is the effectiveness of First Aid/CPR training programs evaluated, assessed, and monitored to ensure that staff members acquire and maintain the necessary knowledge, skills, and competencies to respond effectively to medical emergencies, injuries, or cardiac events within the school environment?</label>
        <div>
          <input type="text" name="training-effectiveness-evaluation" placeholder="Describe the effectiveness" onChange={handleChange} />
        </div>
      </div>

      <div className="form-section">
        <label>Are training outcomes measured through written assessments, practical skills demonstrations, scenario-based simulations, or other performance evaluations to verify staff proficiency in providing timely and appropriate First Aid/CPR interventions?</label>
        <div>
          <input type="radio" name="training-outcomes-measurement" value="yes" onChange={handleChange} /> Yes
          <input type="radio" name="training-outcomes-measurement" value="no" onChange={handleChange} /> No
          <textarea className='comment-box' name="training-outcomes-measurementComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
        </div>
      </div>

      <h2>3.1.1.2.4.2 Training Frequency and Recertification:</h2>
      <div className="form-section">
        <label>What is the frequency of First Aid/CPR training sessions provided to staff members, and how often are refresher courses or recertification programs offered to ensure ongoing competency, skill retention, and compliance with industry standards or regulatory requirements?</label>
        <div>
          <input type="text" name="training-frequency" placeholder="Describe the frequency" onChange={handleChange} />
        </div>
      </div>

      <div className="form-section">
        <label>Are recertification schedules established, communicated, and adhered to for staff members who are required to renew their First Aid/CPR certifications on a regular basis, and are mechanisms in place to track and monitor staff compliance with recertification deadlines?</label>
        <div>
          <input type="radio" name="recertification-schedules" value="yes" onChange={handleChange} /> Yes
          <input type="radio" name="recertification-schedules" value="no" onChange={handleChange} /> No
          <textarea className='comment-box' name="recertification-schedulesComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
        </div>
      </div>

      <h2>3.1.1.2.4.3 Integration with Emergency Response Plans:</h2>
      <div className="form-section">
        <label>How are First Aid/CPR training curricula and protocols integrated into broader emergency response plans, procedures, and protocols to ensure alignment with school safety policies, incident management frameworks, and regulatory guidelines?</label>
        <div>
          <input type="text" name="training-integration" placeholder="Describe how they're integrated" onChange={handleChange} />
        </div>
      </div>

      <div className="form-section">
        <label>Are staff members trained to recognize, assess, and respond to various types of medical emergencies, cardiac arrest scenarios, and traumatic injuries using standardized protocols, decision trees, or action checklists included in the school's emergency operations plans?</label>
        <div>
          <input type="radio" name="standardized-protocols-training" value="yes" onChange={handleChange} /> Yes
          <input type="radio" name="standardized-protocols-training" value="no" onChange={handleChange} /> No
          <textarea className='comment-box' name="standardized-protocols-trainingComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
        </div>
      </div>

      <h2>3.1.1.2.4.4 Accessibility of Training Resources:</h2>
      <div className="form-section">
        <label>What resources, materials, and training aids are provided to support First Aid/CPR training initiatives, including instructional manuals, reference guides, training videos, manikins, AED trainers, and other simulation equipment used to facilitate hands-on learning experiences and skills practice sessions?</label>
        <div>
          <input type="text" name="training-resources" placeholder="Describe the resources/materials/training aids" onChange={handleChange} />
        </div>
      </div>

      <div className="form-section">
        <label>Are training resources accessible, user-friendly, and culturally sensitive, and are accommodations made for staff members with diverse learning needs, language preferences, or disabilities to ensure equitable access to training opportunities and resources?</label>
        <div>
          <input type="radio" name="accessible-training-resources" value="yes" onChange={handleChange} /> Yes
          <input type="radio" name="accessible-training-resources" value="no" onChange={handleChange} /> No
          <textarea className='comment-box' name="accessible-training-resourcesComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
        </div>
      </div>

      <h2>3.1.1.2.4.5 Training Delivery Methods:</h2>
      <div className="form-section">
        <label>How are First Aid/CPR training sessions delivered to accommodate different learning preferences, schedules, and staffing constraints, and are options available for in-person instruction, blended learning models, online courses, or self-paced modules tailored to meet the needs of individual staff members or departments?</label>
        <div>
          <input type="text" name="training-delivery-methods" placeholder="Describe how they're delivered" onChange={handleChange} />
        </div>
      </div>

      <div className="form-section">
        <label>Are training sessions facilitated by certified instructors, subject matter experts, or qualified trainers who possess the requisite knowledge, experience, and credentials to deliver high-quality instruction, provide constructive feedback, and address participant questions or concerns during training sessions?</label>
        <div>
          <input type="radio" name="certified-instructor-facilitation" value="yes" onChange={handleChange} /> Yes
          <input type="radio" name="certified-instructor-facilitation" value="no" onChange={handleChange} /> No
          <textarea className='comment-box' name="certified-instructor-facilitationComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
        </div>
      </div>

      {/* Submit Button */}
      <button type="submit">Submit</button>

    </form>
  </main>
</div>

  )
}

export default FirstAidCPRTraining2FormPage;