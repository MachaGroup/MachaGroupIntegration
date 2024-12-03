import React, { useState } from 'react';
import './FormQuestions.css'; // Use appropriate CSS for styling
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import logo from '../assets/MachaLogo.png'; // Adjust the path if necessary
import Navbar from "./Navbar";

function ContactInformationPage() {
  const navigate = useNavigate();
  const { buildingId } = useBuilding();
  const db = getFirestore();

  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!buildingId) {
      alert('Building ID is missing. Please start from the Building Information page.');
      return;
    }

    try {
      const buildingRef = doc(db, 'Buildings', buildingId);
      const formsRef = collection(db, 'forms/Cybersecurity/Contact Information');
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
        <h1>Contact Information Assessment</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>4.3.1.2.2 Contact Information (e.g., IT support contact)</h2>

          {/* Accessibility of Contact Information */}
          <h3>4.3.1.2.2.1 Accessibility of Contact Information:</h3>
          <div className="form-section">
            <label>4.3.1.2.2.1.1. Is the IT support contact information readily accessible to all employees, including those working remotely or in different time zones?</label>
            <div>
              <input type="radio" name="contactInfoAccessible" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="contactInfoAccessible" value="No" onChange={handleChange} /> No
            </div>
          </div>
          <div className="form-section">
            <label>4.3.1.2.2.1.2. Are multiple communication channels provided for employees to contact IT support (e.g., phone, email, chat)?</label>
            <textarea name="communicationChannels" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>4.3.1.2.2.1.3. How frequently is the contact information reviewed and updated to ensure accuracy and availability?</label>
            <textarea name="contactInfoReviewFrequency" onChange={handleChange}></textarea>
          </div>

          {/* Clarity and Visibility */}
          <h3>4.3.1.2.2.2 Clarity and Visibility:</h3>
          <div className="form-section">
            <label>4.3.1.2.2.2.1. Is the contact information for IT support prominently displayed in key areas, such as the company intranet, employee handbooks, or near workstations?</label>
            <div>
              <input type="radio" name="contactInfoVisibility" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="contactInfoVisibility" value="No" onChange={handleChange} /> No
            </div>
          </div>
          <div className="form-section">
            <label>4.3.1.2.2.2.2. Are there clear instructions provided on when and how to contact IT support for different types of cybersecurity incidents or technical issues?</label>
            <textarea name="instructionsForContact" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>4.3.1.2.2.2.3. How does the organization ensure that employees understand the role and responsibilities of IT support regarding incident reporting and response?</label>
            <textarea name="understandingITRole" onChange={handleChange}></textarea>
          </div>

          {/* Response Time and Effectiveness */}
          <h3>4.3.1.2.2.3 Response Time and Effectiveness:</h3>
          <div className="form-section">
            <label>4.3.1.2.2.3.1. What are the expected response times for IT support when contacted regarding cybersecurity incidents or technical issues?</label>
            <textarea name="responseTime" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>4.3.1.2.2.3.2. How is the effectiveness of IT support in resolving issues and providing guidance measured and evaluated?</label>
            <textarea name="effectivenessITSupport" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>4.3.1.2.2.3.3. Are there escalation procedures in place if the initial IT support contact is unable to resolve an issue promptly?</label>
            <textarea name="escalationProcedures" onChange={handleChange}></textarea>
          </div>

          {/* Training and Awareness */}
          <h3>4.3.1.2.2.4 Training and Awareness:</h3>
          <div className="form-section">
            <label>4.3.1.2.2.4.1. Are employees regularly reminded of the importance of knowing how to contact IT support and when to do so in the event of a cybersecurity threat?</label>
            <div>
              <input type="radio" name="employeeReminders" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="employeeReminders" value="No" onChange={handleChange} /> No
            </div>
          </div>
          <div className="form-section">
            <label>4.3.1.2.2.4.2. Is there training provided to employees on what information to provide when contacting IT support to facilitate a quicker response?</label>
            <textarea name="trainingForContact" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>4.3.1.2.2.4.3. How does the organization ensure that new employees are aware of IT support contact information and procedures as part of their onboarding process?</label>
            <textarea name="onboardingITAwareness" onChange={handleChange}></textarea>
          </div>

          {/* Integration with Security Policies */}
          <h3>4.3.1.2.2.5 Integration with Security Policies:</h3>
          <div className="form-section">
            <label>4.3.1.2.2.5.1. How is the contact information for IT support integrated into broader cybersecurity policies and procedures, such as incident response plans?</label>
            <textarea name="integrationIntoPolicies" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>4.3.1.2.2.5.2. Are there specific guidelines for IT support on how to handle different types of cybersecurity incidents and communicate with employees?</label>
            <textarea name="guidelinesForIT" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>4.3.1.2.2.5.3. How does the organization use feedback from IT support interactions to refine and improve cybersecurity policies and contact procedures?</label>
            <textarea name="feedbackToImprovePolicies" onChange={handleChange}></textarea>
          </div>

          {/* Availability and Continuity */}
          <h3>4.3.1.2.2.6 Availability and Continuity:</h3>
          <div className="form-section">
            <label>4.3.1.2.2.6.1. Is IT support available 24/7 for cybersecurity incidents, or are there specific hours of operation?</label>
            <textarea name="availabilityOfSupport" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>4.3.1.2.2.6.2. What provisions are in place for after-hours or emergency support, particularly during critical incidents or cybersecurity threats?</label>
            <textarea name="afterHoursSupport" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>4.3.1.2.2.6.3. How does the organization ensure continuity of IT support services during holidays, weekends, or in the event of a large-scale incident?</label>
            <textarea name="supportContinuity" onChange={handleChange}></textarea>
          </div>

          {/* Feedback and Improvement */}
          <h3>4.3.1.2.2.7 Feedback and Improvement:</h3>
          <div className="form-section">
            <label>4.3.1.2.2.7.1. Are employees encouraged to provide feedback on their experiences with IT support, and how is this feedback used to improve services?</label>
            <textarea name="feedbackToImprove" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>4.3.1.2.2.7.2. Are there regular reviews or audits of IT support contact procedures to identify areas for enhancement?</label>
            <textarea name="reviewsAudits" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>4.3.1.2.2.7.3. How does the organization ensure that IT support is adequately staffed and trained to handle the volume and variety of cybersecurity incidents reported by employees?</label>
            <textarea name="staffingAndTraining" onChange={handleChange}></textarea>
          </div>

          {/* Communication Strategy */}
          <h3>4.3.1.2.2.8 Communication Strategy:</h3>
          <div className="form-section">
            <label>4.3.1.2.2.8.1. How frequently does the organization communicate changes or updates to IT support contact information to employees?</label>
            <textarea name="frequencyOfUpdates" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>4.3.1.2.2.8.2. Are there emergency communication strategies in place if IT support contact information changes suddenly (e.g., during a cyber incident)?</label>
            <textarea name="emergencyStrategies" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>4.3.1.2.2.8.3. How does the organization reinforce the importance of maintaining updated contact information in all communication materials?</label>
            <textarea name="reinforceImportance" onChange={handleChange}></textarea>
          </div>

          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}

export default ContactInformationPage;
