import React, { useState, useEffect } from 'react';
import { getFirestore, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function AccessControlSystemsPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadImage = httpsCallable(functions, 'uploadAccessControlSystemsImage');

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
                const formDocRef = doc(db, 'forms', 'Physical Security', 'Access Control Systems', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Access Control Systems', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Access Control Systems', buildingId);
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
              <h1>Access Control Systems Assessment</h1>
              <img src={logo} alt="Logo" className="logo" />
          </header>

          <main className="form-container">
              <form onSubmit={handleSubmit}>

                  {[
                      { name: "accessControlOperational", label: "Are the Access Control Systems operational and functioning as intended?" },
                      { name: "authAccurate", label: "Do the systems accurately authenticate and authorize individuals' access rights?" },
                      { name: "malfunctionSigns", label: "Are there any signs of malfunction or system errors that could compromise security?" },
                      { name: "authMechanisms", label: "What authentication mechanisms are used within the Access Control Systems (e.g., RFID cards, PIN codes, biometric scanners)?" },
                      { name: "mechanismsReliable", label: "Are these mechanisms reliable and secure for verifying individuals' identities?" },
                      { name: "multiFactor", label: "Is multi-factor authentication implemented to enhance security (e.g., combining a PIN code with a biometric scan)?" },
                      { name: "accessRights", label: "How are access rights assigned and managed within the Access Control Systems?" },
                      { name: "processDefined", label: "Is there a defined process for granting, modifying, or revoking access permissions based on individuals' roles and responsibilities?" },
                      { name: "accessReviewed", label: "Are access rights regularly reviewed and updated to align with organizational changes and security requirements?" },
                      { name: "systemsIntegrated", label: "Are the Access Control Systems integrated with other security systems, such as surveillance cameras, intrusion detection, or alarm systems?" },
                      { name: "integrationEnhance", label: "How does the integration enhance overall security and situational awareness within the facility?" },
                      { name: "integrationIssues", label: "Are there any compatibility issues or gaps in integration that need to be addressed?" },
                      { name: "monitoringSystem", label: "Is there a centralized monitoring system in place to oversee access control events and activities?" },
                      { name: "accessLogs", label: "Are access logs generated and maintained to track user activity, including successful and failed access attempts?" },
                      { name: "logsReview", label: "Is there a process for reviewing access logs and investigating any suspicious or unauthorized access incidents?" },
                      { name: "complianceRegs", label: "Do the Access Control Systems comply with relevant regulations, standards, and industry best practices (e.g., GDPR, HIPAA, ISO 27001)?" },
                      { name: "audits", label: "Have the systems undergone any audits or assessments to verify compliance with applicable standards?" },
                      { name: "maintenanceSchedule", label: "Is there a regular maintenance schedule in place for the Access Control Systems?" },
                      { name: "maintenanceTasks", label: "Are maintenance tasks, such as software updates, hardware inspections, and database backups, performed according to schedule?" },
                      { name: "maintenanceRecords", label: "Are there records documenting maintenance activities, repairs, and any issues identified during inspections?" },
                      { name: "userTraining", label: "Have users, such as security personnel, system administrators, and end-users, received training on how to use the Access Control Systems effectively?" },
                      { name: "instructionsGuidelines", label: "Are there instructions or guidelines available to users regarding proper access control procedures, password management, and security awareness?" },
                      { name: "reportingProcess", label: "Is there a process for reporting system errors, suspicious activities, or security incidents related to the Access Control Systems?" }
                  ].map((question, index) => (
                      <div key={index} className="form-section">
                          <label>{question.label}</label>
                          <div>
                              {question.name === "malfunctionSigns" || question.name === "authMechanisms" || question.name === "accessRights" || question.name === "integrationEnhance" || question.name === "integrationIssues" ? (
                                  <input
                                      type="text"
                                      name={question.name}
                                      placeholder={question.name === "malfunctionSigns" ? "Describe any malfunctions or errors" : question.name === "authMechanisms" ? "Enter the authentication mechanisms" : question.name === "accessRights" ?
                                       "Describe how access rights are managed" : question.name === "integrationEnhance" ? "Describe the integration" : "Describe any compatibility issues"}
                                      value={formData[question.name] || ''}
                                      onChange={handleChange}
                                  />
                              ) : (
                                  <>
                                      <input
                                          type="radio"
                                          name={question.name}
                                          value="yes"
                                          checked={formData[question.name] === "yes"}
                                          onChange={handleChange}
                                      /> Yes
                                      <input
                                          type="radio"
                                          name={question.name}
                                          value="no"
                                          checked={formData[question.name] === "no"}
                                          onChange={handleChange}
                                      /> No
                                  </>
                              )}
                          </div>
                          {question.name !== "malfunctionSigns" && question.name !== "authMechanisms" && question.name !== "accessRights" && question.name !== "integrationEnhance" && question.name !== "integrationIssues" && (
                              <textarea
                                  className='comment-box'
                                  name={`${question.name}Comment`}
                                  placeholder="Comment (Optional)"
                                  value={formData[`${question.name}Comment`] || ''}
                                  onChange={handleChange}
                              ></textarea>
                          )}
                      </div>
                  ))}
                  <input type="file" onChange={handleImageChange} accept="image/*" />
                  {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
                  {imageUploadError && <p style={{ color: 'red' }}>{imageUploadError}</p>}
                  <button type="submit">Submit</button>
              </form>
          </main>
      </div>
  );
}

export default AccessControlSystemsPage;