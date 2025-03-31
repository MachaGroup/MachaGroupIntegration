import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getFunctions, httpsCallable } from "firebase/functions";
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function TwoFactorAuthenticationPage() {
  const navigate = useNavigate();
  const { buildingId } = useBuilding();
  const db = getFirestore();
  const functions = getFunctions();
  const uploadImage = httpsCallable(functions, 'uploadTwoFactorAuthenticationImage');

  const [formData, setFormData] = useState({});
  const [imageData, setImageData] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    if (!buildingId) {
      alert('No building selected. Redirecting to Building Info...');
      navigate('BuildingandAddress');
      return;
    }

    const fetchFormData = async () => {
      setLoading(true);
      setLoadError(null);

      try {
        const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Two Factor Authentication', buildingId);
        const docSnapshot = await getDoc(formDocRef);

        if (docSnapshot.exists()) {
          setFormData(docSnapshot.data().formData || {});
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
  }, [buildingId, db, navigate]);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);

    try {
        const buildingRef = doc(db, 'Buildings', buildingId); // Create buildingRef
        const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Two Factor Authentication', buildingId);
        await setDoc(formDocRef, { formData: { ...newFormData, building: buildingRef } }, { merge: true }); // Use merge and add building
        console.log("Form data saved to Firestore:", { ...newFormData, building: buildingRef });
    } catch (error) {
        console.error("Error saving form data to Firestore:", error);
        alert("Failed to save changes. Please check your connection and try again.");
    }
};

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageData(reader.result);
    };
    reader.readAsDataURL(file);
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

    if (imageData) {
      try {
        const uploadResult = await uploadImage({ imageData: imageData });
        setImageUrl(uploadResult.data.imageUrl);
        setFormData({ ...formData, imageUrl: uploadResult.data.imageUrl });
        setImageUploadError(null);
      } catch (error) {
        console.error('Error uploading image:', error);
        setImageUploadError(error.message);
      }
    }

    try {
      const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Two Factor Authentication', buildingId);
      await setDoc(formDocRef, { formData: formData }, { merge: true });
      console.log('Form data submitted successfully!');
      alert('Form submitted successfully!');
      navigate('/Form');
    } catch (error) {
      console.error("Error saving form data to Firestore:", error);
      alert("Failed to save changes. Please check your connection and try again.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (loadError) {
    return <div>Error: {loadError}</div>;
  }

  return (
    <div className="form-page">
      <header className="header">
        <Navbar />
        <button className="back-button" onClick={handleBack}>←</button>
        <h1>Two-Factor Authentication Assessment</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>Two-Factor Authentication</h2>
          {[
            { name: "enrollmentPercentage", label: "What percentage of employees and users have successfully enrolled in the two-factor authentication (2FA) system?" },
            { name: "mandatory2FA", label: "Are there specific systems or applications within the organization that require mandatory 2FA? If so, which ones?" },
            { name: "communicationCompliance", label: "How is the 2FA requirement communicated to all employees, and what steps are taken to ensure full compliance?" },
            { name: "effectivenessEvaluation", label: "How does the organization evaluate the effectiveness of 2FA in preventing unauthorized access or reducing the risk of security breaches?" },
            { name: "thwartedIncidents", label: "Have there been any documented incidents of attempted unauthorized access that were thwarted by 2FA?" },
            { name: "knownRisks", label: "Are there any known vulnerabilities or security risks associated with the current 2FA methods (e.g., SIM swapping for SMS codes)?" },
            { name: "userPerception", label: "How do employees and users perceive the ease of use and convenience of the 2FA methods currently implemented?" },
            { name: "userIssues", label: "Are there any reported issues or challenges faced by users when setting up or using 2FA?" },
            { name: "userSupport", label: "What support or resources are available to assist users who experience problems with 2FA?" },
            { name: "backupOptions", label: "What backup or recovery options are available if an employee or user loses access to their primary 2FA method?" },
            { name: "backupGuidelines", label: "Are there guidelines for securely storing backup codes or recovery information?" },
            { name: "resetRequests", label: "How does the organization handle 2FA reset requests?" },
            { name: "integrationCompatibility", label: "How well does the 2FA system integrate with other security measures?" },
            { name: "compatibilityIssues", label: "Are there any compatibility issues with specific devices?" },
            { name: "futurePlans", label: "Does the organization have plans to expand or modify 2FA?" },
            { name: "documentedPolicies", label: "Are there documented policies and guidelines outlining when and how 2FA should be used?" },
            { name: "complianceProcess", label: "How does the organization ensure ongoing compliance with 2FA policies?" },
            { name: "regularAudits", label: "Are there regular audits or reviews to ensure that 2FA settings remain up-to-date?" },
            { name: "methodReview", label: "How often does the organization review and update its 2FA methods?" },
            { name: "userFeedback", label: "Is there a process for collecting feedback from users on their experience with 2FA?" },
            { name: "plannedUpgrades", label: "Are there any planned upgrades or changes to the 2FA system?" },
          ].map((question, index) => (
            <div key={index} className="form-section">
              <label>{question.label}</label>
              <textarea
                name={question.name}
                value={formData[question.name] || ''}
                onChange={handleChange}
                placeholder={question.label}
              />
            </div>
          ))}
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
          {imageUploadError && <p style={{ color: "red" }}>{imageUploadError}</p>}
          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}

export default TwoFactorAuthenticationPage;