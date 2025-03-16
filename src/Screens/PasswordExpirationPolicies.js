import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function PasswordExpirationPoliciesPage() {
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
        const formsRef = collection(db, 'forms/Cybersecurity/Password Expiration Policies');
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
      const formsRef = collection(db, 'forms/Cybersecurity/Password Expiration Policies');
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
        <h1>Password Expiration Policies Assessment</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          {/* Policy Awareness and Implementation */}
          <h2>4.3.2.1.2.1 Policy Awareness and Implementation:</h2>
          <div className="form-section">
            <label>Are all employees aware of the password expiration policy, including how often passwords must be changed?</label>
            <div>
              <input type="radio" name="employeeAwareness" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="employeeAwareness" value="No" onChange={handleChange} /> No
              <textarea className='comment-box' name="employeeAwarenessComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>How is the password expiration policy communicated to new employees during onboarding and existing employees as policies update?</label>
            <textarea name="policyCommunication" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>Are there automated reminders or notifications in place to alert employees when their passwords are nearing expiration?</label>
            <div>
              <input type="radio" name="automatedReminders" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="automatedReminders" value="No" onChange={handleChange} /> No
              <textarea className='comment-box' name="automatedRemindersComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          {/* Compliance and Enforcement */}
          <h2>4.3.2.1.2.2 Compliance and Enforcement:</h2>
          <div className="form-section">
            <label>What mechanisms are in place to enforce password expiration policies across all organizational systems and applications?</label>
            <textarea name="enforcementMechanisms" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>Are there consequences for non-compliance with password expiration policies, and if so, what are they?</label>
            <textarea name="nonComplianceConsequences" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>How does the organization monitor compliance with password expiration policies, and are there reports generated for IT or security teams?</label>
            <textarea name="complianceMonitoring" onChange={handleChange}></textarea>
          </div>

          {/* Impact on Security */}
          <h2>4.3.2.1.2.3 Impact on Security:</h2>
          <div className="form-section">
            <label>How does the organization assess the effectiveness of password expiration policies in reducing the risk of unauthorized access or security breaches?</label>
            <textarea name="policyEffectiveness" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>Are there metrics or key performance indicators (KPIs) used to evaluate the impact of regular password changes on overall cybersecurity?</label>
            <textarea name="impactMetrics" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>Has the organization experienced any security incidents that were attributed to expired or unchanged passwords? What measures were taken in response?</label>
            <textarea name="incidentResponse" onChange={handleChange}></textarea>
          </div>

          {/* User Experience and Practicality */}
          <h2>4.3.2.1.2.4 User Experience and Practicality:</h2>
          <div className="form-section">
            <label>How do employees perceive the password expiration policy in terms of convenience and practicality? Does it lead to frequent reset requests or difficulties?</label>
            <textarea name="employeePerception" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>Are there any support mechanisms in place (e.g., IT helpdesk) to assist employees who have trouble complying with password expiration policies?</label>
            <textarea name="supportMechanisms" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>How does the organization balance the need for security through regular password changes with the potential burden on employees?</label>
            <textarea name="securityBalance" onChange={handleChange}></textarea>
          </div>

          {/* Integration with Other Security Measures */}
          <h2>4.3.2.1.2.5 Integration with Other Security Measures:</h2>
          <div className="form-section">
            <label>How do password expiration policies integrate with other security measures, such as multi-factor authentication (MFA) or single sign-on (SSO) systems?</label>
            <textarea name="policyIntegration" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>Are there specific guidelines or recommendations for password changes when other authentication methods are in use to enhance overall security?</label>
            <textarea name="authGuidelines" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>Does the organization encourage or require additional security measures, such as MFA, when a password has expired or been recently changed?</label>
            <textarea name="additionalSecurity" onChange={handleChange}></textarea>
          </div>

          {/* Adaptability and Continuous Improvement */}
          <h2>4.3.2.1.2.6 Adaptability and Continuous Improvement:</h2>
          <div className="form-section">
            <label>How often does the organization review and update its password expiration policies to align with industry best practices and emerging security threats?</label>
            <textarea name="policyReviewFrequency" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>Is there a process for collecting and incorporating feedback from employees on the password expiration policy to improve its effectiveness and user-friendliness?</label>
            <textarea name="feedbackProcess" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>Are adjustments to the policy made based on technological advancements or changes in the threat landscape?</label>
            <textarea name="policyAdjustments" onChange={handleChange}></textarea>
          </div>

          {/* Training and Support */}
          <h2>4.3.2.1.2.7 Training and Support:</h2>
          <div className="form-section">
            <label>Are employees provided with training on the importance of regular password changes and how to manage them effectively?</label>
            <div>
              <input type="radio" name="employeeTraining" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="employeeTraining" value="No" onChange={handleChange} /> No
              <textarea className='comment-box' name="employeeTrainingComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>How does the organization support employees in adhering to the password expiration policy, especially those with access to multiple systems?</label>
            <textarea name="multiSystemSupport" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>Are there resources or tools available to help employees manage their passwords more efficiently, such as password managers?</label>
            <textarea name="passwordManagementTools" onChange={handleChange}></textarea>
          </div>

          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}

export default PasswordExpirationPoliciesPage;
