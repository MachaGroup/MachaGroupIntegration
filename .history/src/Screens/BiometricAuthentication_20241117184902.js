import React, { useState } from 'react';
import './FormQuestions.css';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import logo from '../assets/MachaLogo.png'; // Adjust the path if necessary

function BiometricAuthenticationPage() {
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
      const formsRef = collection(db, 'forms/Cybersecurity/Biometric Authentication');
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
        <h1>Biometric Authentication Assessment</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>4.3.2.2.2 Biometric Authentication (e.g., fingerprint, facial recognition)</h2>

          {/* Implementation and Coverage */}
          <h3>4.3.2.2.2.1 Implementation and Coverage:</h3>
          <div className="form-section">
            <label>4.3.2.2.2.1.1. What percentage of systems and applications within the organization utilize biometric authentication?</label>
            <textarea name="biometricUtilization" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>4.3.2.2.2.1.2. Are biometric authentication methods deployed across all critical access points?</label>
            <textarea name="criticalAccessPoints" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>4.3.2.2.2.1.3. How is the adoption of biometric authentication monitored?</label>
            <textarea name="adoptionMonitoring" onChange={handleChange}></textarea>
          </div>

          {/* Security and Accuracy */}
          <h3>4.3.2.2.2.1.4 Security and Accuracy:</h3>
          <div className="form-section">
            <label>4.3.2.2.2.1.5. How does the organization assess the accuracy and reliability of the biometric authentication methods used?</label>
            <textarea name="accuracyAssessment" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>4.3.2.2.2.1.6. Are there any documented incidents of unauthorized access despite the use of biometric authentication?</label>
            <textarea name="unauthorizedAccessIncidents" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>4.3.2.2.2.1.7. How are biometric data and authentication processes protected from potential security threats?</label>
            <textarea name="dataProtection" onChange={handleChange}></textarea>
          </div>

          {/* User Experience and Accessibility */}
          <h3>4.3.2.2.2.2 User Experience and Accessibility:</h3>
          <div className="form-section">
            <label>4.3.2.2.2.2.1. How do users perceive the ease of use and convenience of the biometric authentication methods currently in place?</label>
            <textarea name="userPerception" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>4.3.2.2.2.2.2. Are there any reported challenges or issues faced by users when enrolling their biometric data?</label>
            <textarea name="enrollmentChallenges" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>4.3.2.2.2.2.3. What accommodations are made for users who may have difficulty with biometric authentication?</label>
            <textarea name="userAccommodations" onChange={handleChange}></textarea>
          </div>

          {/* Privacy and Data Protection */}
          <h3>4.3.2.2.2.3 Privacy and Data Protection:</h3>
          <div className="form-section">
            <label>4.3.2.2.2.3.1. How does the organization ensure the privacy and protection of biometric data collected from users?</label>
            <textarea name="privacyProtection" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>4.3.2.2.2.3.2. What measures are in place to secure biometric data from unauthorized access?</label>
            <textarea name="unauthorizedAccessProtection" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>4.3.2.2.2.3.3. Are there clear policies and procedures for handling biometric data?</label>
            <textarea name="handlingPolicies" onChange={handleChange}></textarea>
          </div>

          {/* Backup and Recovery Options */}
          <h3>4.3.2.2.2.4 Backup and Recovery Options:</h3>
          <div className="form-section">
            <label>4.3.2.2.2.4.1. What backup or recovery options are available if users are unable to use their biometric authentication method?</label>
            <textarea name="backupOptions" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>4.3.2.2.2.4.2. How does the organization handle scenarios where biometric authentication fails?</label>
            <textarea name="failureScenarios" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>4.3.2.2.2.4.3. Are there guidelines for securely managing and storing backup authentication methods?</label>
            <textarea name="backupGuidelines" onChange={handleChange}></textarea>
          </div>

          {/* Integration and Compatibility */}
          <h3>4.3.2.2.2.5 Integration and Compatibility:</h3>
          <div className="form-section">
            <label>4.3.2.2.2.5.1. How well does the biometric authentication system integrate with other security measures?</label>
            <textarea name="systemIntegration" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>4.3.2.2.2.5.2. Are there any compatibility issues with specific devices?</label>
            <textarea name="compatibilityIssues" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>4.3.2.2.2.5.3. Does the organization have plans to enhance or expand its biometric authentication capabilities?</label>
            <textarea name="enhancementPlans" onChange={handleChange}></textarea>
          </div>

          {/* Policy and Compliance */}
          <h3>4.3.2.2.2.6 Policy and Compliance:</h3>
          <div className="form-section">
            <label>4.3.2.2.2.6.1. Are there documented policies and guidelines outlining the use and management of biometric authentication?</label>
            <textarea name="policyGuidelines" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>4.3.2.2.2.6.2. How does the organization ensure compliance with biometric authentication policies?</label>
            <textarea name="complianceProcess" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>4.3.2.2.2.6.3. Are there regular audits or reviews to ensure that biometric authentication practices remain in line with industry standards?</label>
            <textarea name="auditReviews" onChange={handleChange}></textarea>
          </div>

          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}

export default BiometricAuthenticationPage;
