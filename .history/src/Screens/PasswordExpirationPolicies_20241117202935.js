import React, { useState } from 'react';
import './FormQuestions.css';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import logo from '../assets/MachaLogo.png'; // Adjust the path if necessary

function PasswordExpirationPoliciesPage() {
  const navigate = useNavigate();
  const { setBuildingId, buildingId } = useBuilding();
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
      const formsRef = collection(db, 'forms/Cybersecurity/Password Expiration Policies');
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
        <button className="back-button" onClick={handleBack}>←</button>
        <h1>Password Expiration Policies Assessment</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>4.3.2.1.2 Password Expiration Policies</h2>

          {/* Policy Awareness and Implementation */}
          <h3>4.3.2.1.2.1 Policy Awareness and Implementation:</h3>
          <div className="form-section">
            <label>4.3.2.1.2.1.1. Are all employees aware of the password expiration policy, including how often passwords must be changed?</label>
            <div>
              <input type="radio" name="employeeAwareness" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="employeeAwareness" value="No" onChange={handleChange} /> No
            </div>
          </div>

          <div className="form-section">
            <label>4.3.2.1.2.1.2. How is the password expiration policy communicated to new employees during onboarding and existing employees as policies update?</label>
            <textarea name="policyCommunication" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>4.3.2.1.2.1.3. Are there automated reminders or notifications in place to alert employees when their passwords are nearing expiration?</label>
            <div>
              <input type="radio" name="automatedReminders" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="automatedReminders" value="No" onChange={handleChange} /> No
            </div>
          </div>

          {/* Compliance and Enforcement */}
          <h3>4.3.2.1.2.2 Compliance and Enforcement:</h3>
          <div className="form-section">
            <label>4.3.2.1.2.2.1. What mechanisms are in place to enforce password expiration policies across all organizational systems and applications?</label>
            <textarea name="enforcementMechanisms" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>4.3.2.1.2.2.2. Are there consequences for non-compliance with password expiration policies, and if so, what are they?</label>
            <textarea name="nonComplianceConsequences" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>4.3.2.1.2.2.3. How does the organization monitor compliance with password expiration policies, and are there reports generated for IT or security teams?</label>
            <textarea name="complianceMonitoring" onChange={handleChange}></textarea>
          </div>

          {/* Impact on Security */}
          <h3>4.3.2.1.2.3 Impact on Security:</h3>
          <div className="form-section">
            <label>4.3.2.1.2.3.1. How does the organization assess the effectiveness of password expiration policies in reducing the risk of unauthorized access or security breaches?</label>
            <textarea name="policyEffectiveness" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>4.3.2.1.2.3.2. Are there metrics or key performance indicators (KPIs) used to evaluate the impact of regular password changes on overall cybersecurity?</label>
            <textarea name="impactMetrics" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>4.3.2.1.2.3.3. Has the organization experienced any security incidents that were attributed to expired or unchanged passwords? What measures were taken in response?</label>
            <textarea name="incidentResponse" onChange={handleChange}></textarea>
          </div>

          {/* User Experience and Practicality */}
          <h3>4.3.2.1.2.4 User Experience and Practicality:</h3>
          <div className="form-section">
            <label>4.3.2.1.2.4.1. How do employees perceive the password expiration policy in terms of convenience and practicality? Does it lead to frequent reset requests or difficulties?</label>
            <textarea name="employeePerception" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>4.3.2.1.2.4.2. Are there any support mechanisms in place (e.g., IT helpdesk) to assist employees who have trouble complying with password expiration policies?</label>
            <textarea name="supportMechanisms" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>4.3.2.1.2.4.3. How does the organization balance the need for security through regular password changes with the potential burden on employees?</label>
            <textarea name="securityBalance" onChange={handleChange}></textarea>
          </div>

          {/* Integration with Other Security Measures */}
          <h3>4.3.2.1.2.5 Integration with Other Security Measures:</h3>
          <div className="form-section">
            <label>4.3.2.1.2.5.1. How do password expiration policies integrate with other security measures, such as multi-factor authentication (MFA) or single sign-on (SSO) systems?</label>
            <textarea name="policyIntegration" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>4.3.2.1.2.5.2. Are there specific guidelines or recommendations for password changes when other authentication methods are in use to enhance overall security?</label>
            <textarea name="authGuidelines" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>4.3.2.1.2.5.3. Does the organization encourage or require additional security measures, such as MFA, when a password has expired or been recently changed?</label>
            <textarea name="additionalSecurity" onChange={handleChange}></textarea>
          </div>

          {/* Adaptability and Continuous Improvement */}
          <h3>4.3.2.1.2.6 Adaptability and Continuous Improvement:</h3>
          <div className="form-section">
            <label>4.3.2.1.2.6.1. How often does the organization review and update its password expiration policies to align with industry best practices and emerging security threats?</label>
            <textarea name="policyReviewFrequency" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>4.3.2.1.2.6.2. Is there a process for collecting and incorporating feedback from employees on the password expiration policy to improve its effectiveness and user-friendliness?</label>
            <textarea name="feedbackProcess" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>4.3.2.1.2.6.3. Are adjustments to the policy made based on technological advancements or changes in the threat landscape?</label>
            <textarea name="policyAdjustments" onChange={handleChange}></textarea>
          </div>

          {/* Training and Support */}
          <h3>4.3.2.1.2.7 Training and Support:</h3>
          <div className="form-section">
            <label>4.3.2.1.2.7.1. Are employees provided with training on the importance of regular password changes and how to manage them effectively?</label>
            <div>
              <input type="radio" name="employeeTraining" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="employeeTraining" value="No" onChange={handleChange} /> No
            </div>
          </div>

          <div className="form-section">
            <label>4.3.2.1.2.7.2. How does the organization support employees in adhering to the password expiration policy, especially those with access to multiple systems?</label>
            <textarea name="multiSystemSupport" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>4.3.2.1.2.7.3. Are there resources or tools available to help employees manage their passwords more efficiently, such as password managers?</label>
            <textarea name="passwordManagementTools" onChange={handleChange}></textarea>
          </div>

          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}

export default PasswordExpirationPoliciesPage;
