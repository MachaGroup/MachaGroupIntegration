import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; 
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function BiometricAuthenticationPage() {
  const navigate = useNavigate();  
  const { buildingId } = useBuilding();
  const db = getFirestore();
  const storage = getStorage();

  const [formData, setFormData] = useState({});
  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  useEffect(() => {
      if (!buildingId) {
          alert('No building selected. Redirecting to Building Info...');
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

  const handleImageChange = (e) => {
      if (e.target.files[0]) {
          setImage(e.target.files[0]);
      }
  };

  const handleBack = async () => {
      if (formData && buildingId) {
          try {
              const buildingRef = doc(db, 'Buildings', buildingId);
              const formsRef = collection(db, 'forms/Cybersecurity/Biometric Authentication');
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
          const formsRef = collection(db, 'forms/Cybersecurity/Biometric Authentication');

          if (image) {
              if (!image.type.match('image/*')) {
                  setUploadError('Please select a valid image file (jpg, jpeg, png, etc.)');
                  return;
              }
              if (image.size > 5 * 1024 * 1024) {
                  setUploadError('Image file too large (Max 5MB)');
                  return;
              }

              const storageRef = ref(storage, `biometricAuth_images/${Date.now()}_${image.name}`);
              const uploadTask = uploadBytesResumable(storageRef, image);

              uploadTask.on('state_changed',
                  (snapshot) => {
                      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                      setUploadProgress(progress);
                  },
                  (error) => {
                      setUploadError(error);
                  },
                  async () => {
                      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                      setImageUrl(downloadURL);
                      setFormData({ ...formData, imageUrl: downloadURL });
                      setUploadError(null);
                  }
              );
          }

          await addDoc(formsRef, {
              building: buildingRef,
              formData: formData,
          });
          console.log('Form Data submitted successfully!');
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
              <h1>Biometric Authentication Assessment</h1>
              <img src={logo} alt="Logo" className="logo" />
          </header>
          <main className="form-container">
              <form onSubmit={handleSubmit}>
              <h2>4.3.2.2.2.1 Implementation and Coverage:</h2>
<div className="form-section">
  <label>What percentage of systems and applications within the organization utilize biometric authentication?</label>
  <textarea name="biometricUtilization" onChange={handleChange}></textarea>
</div>

<div className="form-section">
  <label>Are biometric authentication methods deployed across all critical access points?</label>
  <textarea name="criticalAccessPoints" onChange={handleChange}></textarea>
</div>

<div className="form-section">
  <label>How is the adoption of biometric authentication monitored?</label>
  <textarea name="adoptionMonitoring" onChange={handleChange}></textarea>
</div>

{/* Security and Accuracy */}
<h2>4.3.2.2.2.1.4 Security and Accuracy:</h2>
<div className="form-section">
  <label>How does the organization assess the accuracy and reliability of the biometric authentication methods used?</label>
  <textarea name="accuracyAssessment" onChange={handleChange}></textarea>
</div>

<div className="form-section">
  <label>Are there any documented incidents of unauthorized access despite the use of biometric authentication?</label>
  <textarea name="unauthorizedAccessIncidents" onChange={handleChange}></textarea>
</div>

<div className="form-section">
  <label>How are biometric data and authentication processes protected from potential security threats?</label>
  <textarea name="dataProtection" onChange={handleChange}></textarea>
</div>

{/* User Experience and Accessibility */}
<h2>4.3.2.2.2.2 User Experience and Accessibility:</h2>
<div className="form-section">
  <label>How do users perceive the ease of use and convenience of the biometric authentication methods currently in place?</label>
  <textarea name="userPerception" onChange={handleChange}></textarea>
</div>

<div className="form-section">
  <label>Are there any reported challenges or issues faced by users when enrolling their biometric data?</label>
  <textarea name="enrollmentChallenges" onChange={handleChange}></textarea>
</div>

<div className="form-section">
  <label>What accommodations are made for users who may have difficulty with biometric authentication?</label>
  <textarea name="userAccommodations" onChange={handleChange}></textarea>
</div>

{/* Privacy and Data Protection */}
<h2>4.3.2.2.2.3 Privacy and Data Protection:</h2>
<div className="form-section">
  <label>How does the organization ensure the privacy and protection of biometric data collected from users?</label>
  <textarea name="privacyProtection" onChange={handleChange}></textarea>
</div>

<div className="form-section">
  <label>What measures are in place to secure biometric data from unauthorized access?</label>
  <textarea name="unauthorizedAccessProtection" onChange={handleChange}></textarea>
</div>

<div className="form-section">
  <label>Are there clear policies and procedures for handling biometric data?</label>
  <textarea name="handlingPolicies" onChange={handleChange}></textarea>
</div>

{/* Backup and Recovery Options */}
<h2>4.3.2.2.2.4 Backup and Recovery Options:</h2>
<div className="form-section">
  <label>What backup or recovery options are available if users are unable to use their biometric authentication method?</label>
  <textarea name="backupOptions" onChange={handleChange}></textarea>
</div>

<div className="form-section">
  <label>How does the organization handle scenarios where biometric authentication fails?</label>
  <textarea name="failureScenarios" onChange={handleChange}></textarea>
</div>

<div className="form-section">
  <label>Are there guidelines for securely managing and storing backup authentication methods?</label>
  <textarea name="backupGuidelines" onChange={handleChange}></textarea>
</div>

{/* Integration and Compatibility */}
<h2>4.3.2.2.2.5 Integration and Compatibility:</h2>
<div className="form-section">
  <label>How well does the biometric authentication system integrate with other security measures?</label>
  <textarea name="systemIntegration" onChange={handleChange}></textarea>
</div>

<div className="form-section">
  <label>Are there any compatibility issues with specific devices?</label>
  <textarea name="compatibilityIssues" onChange={handleChange}></textarea>
</div>

<div className="form-section">
  <label>Does the organization have plans to enhance or expand its biometric authentication capabilities?</label>
  <textarea name="enhancementPlans" onChange={handleChange}></textarea>
</div>

{/* Policy and Compliance */}
<h2>4.3.2.2.2.6 Policy and Compliance:</h2>
<div className="form-section">
  <label>Are there documented policies and guidelines outlining the use and management of biometric authentication?</label>
  <textarea name="policyGuidelines" onChange={handleChange}></textarea>
</div>

<div className="form-section">
  <label>How does the organization ensure compliance with biometric authentication policies?</label>
  <textarea name="complianceProcess" onChange={handleChange}></textarea>
</div>

<div className="form-section">
  <label>Are there regular audits or reviews to ensure that biometric authentication practices remain in line with industry standards?</label>
  <textarea name="auditReviews" onChange={handleChange}></textarea>
</div>
                  <input type="file" accept="image/*" onChange={handleImageChange} />
                  {uploadProgress > 0 && <p>Upload Progress: {uploadProgress.toFixed(2)}%</p>}
                  {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
                  {uploadError && <p style={{ color: 'red' }}>{uploadError}</p>}
                  <button type="submit">Submit</button>
              </form>
          </main>
      </div>
  );
}

export default BiometricAuthenticationPage;