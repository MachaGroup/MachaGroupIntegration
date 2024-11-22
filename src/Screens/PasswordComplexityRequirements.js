import React, { useState } from 'react';
import './FormQuestions.css';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import logo from '../assets/MachaLogo.png'; // Adjust the path if necessary

function PasswordComplexityRequirementsPage() {
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
      const formsRef = collection(db, 'forms/Cybersecurity/Password Complexity Requirements');
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
        <h1>Password Complexity Requirements Assessment</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>4.3.2.1.1 Password Complexity Requirements</h2>

          {/* Policy Comprehension and Awareness */}
          <h3>4.3.2.1.1.1 Policy Comprehension and Awareness:</h3>
          <div className="form-section">
            <label>4.3.2.1.1.1.1. Are all employees aware of the organization's password complexity requirements, including the minimum length and the use of special characters?</label>
            <div>
              <input type="radio" name="employeeAwareness" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="employeeAwareness" value="No" onChange={handleChange} /> No
            </div>
          </div>

          <div className="form-section">
            <label>4.3.2.1.1.1.2. How frequently are employees reminded of the password complexity policy, and through what channels (e.g., email, training sessions, policy documents)?</label>
            <textarea name="reminderFrequency" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>4.3.2.1.1.1.3. Are there educational materials or training sessions provided to help employees understand the importance of using complex passwords?</label>
            <textarea name="trainingMaterials" onChange={handleChange}></textarea>
          </div>

          {/* Effectiveness and Compliance */}
          <h3>4.3.2.1.1.2 Effectiveness and Compliance:</h3>
          <div className="form-section">
            <label>4.3.2.1.1.2.1. What measures are in place to enforce compliance with password complexity requirements across all systems and applications?</label>
            <textarea name="enforcementMeasures" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>4.3.2.1.1.2.2. How is compliance with password complexity requirements monitored and reported?</label>
            <textarea name="complianceMonitoring" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>4.3.2.1.1.2.3. Are there regular audits or checks to ensure that employees are adhering to password complexity guidelines?</label>
            <div>
              <input type="radio" name="regularAudits" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="regularAudits" value="No" onChange={handleChange} /> No
            </div>
          </div>

          {/* Impact on Security */}
          <h3>4.3.2.1.1.3 Impact on Security:</h3>
          <div className="form-section">
            <label>4.3.2.1.1.3.1. How does the organization evaluate the effectiveness of password complexity requirements in preventing unauthorized access or breaches?</label>
            <textarea name="evaluateEffectiveness" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>4.3.2.1.1.3.2. Are there any documented incidents where weak passwords, despite the policy, led to security breaches? If so, what actions were taken to address the gaps?</label>
            <textarea name="documentedIncidents" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>4.3.2.1.1.3.3. How frequently does the organization review and update its password complexity requirements to respond to emerging security threats?</label>
            <textarea name="reviewFrequency" onChange={handleChange}></textarea>
          </div>

          {/* User Experience and Accessibility */}
          <h3>4.3.2.1.1.4 User Experience and Accessibility:</h3>
          <div className="form-section">
            <label>4.3.2.1.1.4.1. Are the password complexity requirements user-friendly, or do they lead to difficulties in remembering passwords or frequent reset requests?</label>
            <textarea name="userFriendliness" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>4.3.2.1.1.4.2. How does the organization balance strong password complexity with usability to avoid negative impacts on employee productivity?</label>
            <textarea name="balanceComplexity" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>4.3.2.1.1.4.3. Are there guidelines or tools provided to help employees create and remember complex passwords (e.g., password managers, mnemonic techniques)?</label>
            <textarea name="passwordTools" onChange={handleChange}></textarea>
          </div>

          {/* Integration with Other Security Measures */}
          <h3>4.3.2.1.1.5 Integration with Other Security Measures:</h3>
          <div className="form-section">
            <label>4.3.2.1.1.5.1. How do password complexity requirements integrate with other security measures, such as two-factor authentication (2FA) or single sign-on (SSO)?</label>
            <textarea name="integrationSecurity" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>4.3.2.1.1.5.2. Are there specific guidelines for password complexity when used in conjunction with other authentication methods to enhance overall security?</label>
            <textarea name="authGuidelines" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>4.3.2.1.1.5.3. Does the organization encourage or require the use of passphrases (longer sequences of words) in addition to traditional complex passwords?</label>
            <textarea name="passphraseEncourage" onChange={handleChange}></textarea>
          </div>

          {/* Feedback and Continuous Improvement */}
          <h3>4.3.2.1.1.6 Feedback and Continuous Improvement:</h3>
          <div className="form-section">
            <label>4.3.2.1.1.6.1. Is there a process for employees to provide feedback on the password complexity requirements, particularly if they encounter issues?</label>
            <div>
              <input type="radio" name="feedbackProcess" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="feedbackProcess" value="No" onChange={handleChange} /> No
            </div>
          </div>

          <div className="form-section">
            <label>4.3.2.1.1.6.2. How is employee feedback used to adjust password policies to better meet security needs without creating undue burden?</label>
            <textarea name="feedbackUse" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>4.3.2.1.1.6.3. Are there periodic reviews of the password complexity policy to ensure it remains effective against evolving cyber threats?</label>
            <textarea name="policyReview" onChange={handleChange}></textarea>
          </div>

          {/* Training and Support */}
          <h3>4.3.2.1.1.7 Training and Support:</h3>
          <div className="form-section">
            <label>4.3.2.1.1.7.1. Are employees provided with training on how to create strong, memorable passwords that meet complexity requirements?</label>
            <div>
              <input type="radio" name="employeeTraining" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="employeeTraining" value="No" onChange={handleChange} /> No
            </div>
          </div>

          <div className="form-section">
            <label>4.3.2.1.1.7.2. How does the organization support employees in transitioning to more complex passwords (e.g., phased implementation, support from IT)?</label>
            <textarea name="transitionSupport" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>4.3.2.1.1.7.3. Are there resources available for employees who need assistance or have questions about creating or managing complex passwords?</label>
            <textarea name="assistanceResources" onChange={handleChange}></textarea>
          </div>

          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}

export default PasswordComplexityRequirementsPage;
