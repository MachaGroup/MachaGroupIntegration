import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getFunctions, httpsCallable } from "firebase/functions";
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function WindowLocksPage() {
  const navigate = useNavigate();
  const { buildingId } = useBuilding();
  const db = getFirestore();
  const functions = getFunctions();
  const uploadImage = httpsCallable(functions, 'uploadWindowLocksImage');

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
        const formDocRef = doc(db, 'forms', 'Physical Security', 'Window Locks', buildingId);
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
      const formDocRef = doc(db, 'forms', 'Physical Security', 'Window Locks', buildingId);
      await setDoc(formDocRef, { formData: newFormData }, { merge: true });
      console.log("Form data saved to Firestore:", newFormData);
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
      const formDocRef = doc(db, 'forms', 'Physical Security', 'Window Locks', buildingId);
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
        <h1>Window Locks Assessment</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>Window Locks</h2>
          {[
            { name: "operationalLocks", label: "Are the window locks operational and functioning properly?" },
            { name: "secureFastening", label: "Do the locks securely fasten windows to prevent unauthorized entry?" },
            { name: "damageLocks", label: "Are there any signs of damage, wear, or malfunction in the locking mechanisms?" },
            { name: "backupSystems", label: "Are backup systems in place in case of lock failure or tampering?" },
            { name: "windowLockSuitability", label: "Are the window locks suitable for the type of windows installed (e.g., sliding windows, casement windows)?" },
            { name: "secureFit", label: "Do they provide a secure fit and effective locking mechanism for each window style?" },
            { name: "windowSizes", label: "Have considerations been made for windows of varying sizes and configurations?" },
            { name: "accessibleLocks", label: "Are the window locks easily accessible and operable for occupants, particularly in emergency situations?" },
            { name: "convenientUse", label: "Do they allow for quick and convenient opening and closing of windows when needed?" },
            { name: "accessibilityFeatures", label: "Are there any accessibility features or considerations for individuals with disabilities?" },
            { name: "durableMaterials", label: "Are the window locks made from durable materials capable of withstanding physical force or tampering attempts?" },
            { name: "additionalSecurityFeatures", label: "Are there additional security features, such as reinforced bolts or tamper-resistant screws, to enhance resistance to forced entry?" },
            { name: "reliabilityTesting", label: "Have the locks been tested for reliability and resistance to environmental factors such as corrosion or wear?" },
            { name: "integrationSecuritySystem", label: "Are the window locks integrated with the overall building security system?" },
            { name: "tamperAlerts", label: "Do they trigger alerts or notifications in the event of tampering or attempted unauthorized entry?" },
            { name: "surveillanceMonitoring", label: "Are there surveillance cameras or other monitoring devices positioned to monitor windows for security breaches?" },
            { name: "maintenanceSchedule", label: "Is there a regular maintenance schedule in place for window locks?" },
            { name: "maintenanceTasks", label: "Are maintenance tasks, such as lubrication, inspection of locking mechanisms, and replacement of worn-out parts, performed according to schedule?" },
            { name: "maintenanceRecords", label: "Are there records documenting maintenance activities, repairs, and any issues identified during inspections?" },
            { name: "compliance", label: "Do the window locks comply with relevant regulations, codes, and standards for building security?" },
            { name: "regulatoryRequirements", label: "Are there specific requirements or guidelines for window locks outlined by regulatory authorities or industry associations?" },
            { name: "certifications", label: "Have the locks undergone testing or certification to verify compliance with applicable standards?" },
          ].map((question, index) => (
            <div key={index} className="form-section">
              <label>{question.label}</label>
              {question.name === "damageLocks" || question.name === "regulatoryRequirements" ? (
                <textarea
                  name={question.name}
                  value={formData[question.name] || ''}
                  onChange={handleChange}
                  placeholder={question.label}
                />
              ) : (
                <><div>
                    <input
                      type="radio"
                      name={question.name}
                      value="yes"
                      checked={formData[question.name] === "yes"}
                      onChange={handleChange} /> Yes
                    <input
                      type="radio"
                      name={question.name}
                      value="no"
                      checked={formData[question.name] === "no"}
                      onChange={handleChange} /> No

                  </div><input
                      type="text"
                      name={`${question.name}Comments`}
                      placeholder="Comments"
                      value={formData[`${question.name}Comments`] || ''}
                      onChange={handleChange} /></>
              )}
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

export default WindowLocksPage;