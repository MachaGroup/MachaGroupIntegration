import React, { useState, useEffect } from 'react';
import { getFirestore, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function AccessControlSoftwarePage() {
  const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadImage = httpsCallable(functions, 'uploadAccessControlSoftwareImage');


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
            setLoadError(null); // Clear previous errors

            try {
                const formDocRef = doc(db, 'forms', 'Physical Security', 'Access Control Software', buildingId);
                const docSnapshot = await getDoc(formDocRef);

                if (docSnapshot.exists()) {
                    setFormData(docSnapshot.data().formData || {});
                } else {
                    setFormData({}); // Initialize if document doesn't exist
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
                        const formDocRef = doc(db, 'forms', 'Physical Security', 'Access Control Software', buildingId);
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
        navigate(-1); // Just navigate back
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
            const formDocRef = doc(db, 'forms', 'Physical Security', 'Access Control Software', buildingId);
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
      <div>
          <div className="form-page">
              <header className="header">
                  <Navbar />
                  <button className="back-button" onClick={handleBack}>←</button>
                  <h1>1.1.1.2.3. Access Control Software Assessment</h1>
                  <img src={logo} alt="Logo" className="logo" />
              </header>
  
              <main className="form-container">
                  <form onSubmit={handleSubmit}>
                      <h2>Functionality and Features:</h2>
                      {[
                          { name: "comprehensiveFunctionality", label: "Does the access control software provide comprehensive functionality for managing access to secondary entrances?" },
                          { name: "centralManagement", label: "Can it centrally manage and control access permissions for individuals, groups, and access points?" },
                          { name: "authenticationMethods", label: "Does it support various authentication methods, such as card readers, biometric scanners, or PIN codes?" },
                          { name: "realTimeMonitoring", label: "Are there features for real-time monitoring, reporting, and auditing of access events?" },
                      ].map((question, index) => (
                          <div key={index} className="form-section">
                              <label>{question.label}</label>
                              <div>
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
                              </div>
                              <input
                                  type="text"
                                  name={`${question.name}Comment`}
                                  placeholder="Comment (Optional)"
                                  value={formData[`${question.name}Comment`] || ''}
                                  onChange={handleChange}
                              />
                          </div>
                      ))}
  
                      <h2>Integration with Hardware:</h2>
                      {[
                          { name: "hardwareCompatibility", label: "Is the access control software compatible with a wide range of hardware devices, including card readers, biometric scanners, and electronic locks?" },
                          { name: "integrationInfrastructure", label: "Does it seamlessly integrate with existing security infrastructure, such as surveillance cameras and alarm systems?" },
                      ].map((question, index) => (
                          <div key={index} className="form-section">
                              <label>{question.label}</label>
                              <div>
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
                              </div>
                              <input
                                  type="text"
                                  name={`${question.name}Comment`}
                                  placeholder="Comment (Optional)"
                                  value={formData[`${question.name}Comment`] || ''}
                                  onChange={handleChange}
                              />
                          </div>
                      ))}
                      <div className="form-section">
                          <label>Are there any compatibility issues or limitations that need to be addressed?</label>
                          <input type="text" name="compatibilityIssues" placeholder="Describe any compatibility issues" value={formData["compatibilityIssues"] || ''} onChange={handleChange} />
                      </div>
  
                      <h2>Security and Encryption:</h2>
                      {[
                          { name: "encryptionSecurity", label: "Does the access control software employ robust encryption and security protocols to protect sensitive data and communication?" },
                          { name: "securePolicies", label: "Are access control policies and credentials securely stored and transmitted within the software?" },
                          { name: "multiFactorAuth", label: "Is there support for multi-factor authentication to enhance security?" },
                      ].map((question, index) => (
                          <div key={index} className="form-section">
                              <label>{question.label}</label>
                              <div>
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
                              </div>
                              <input
                                  type="text"
                                  name={`${question.name}Comment`}
                                  placeholder="Comment (Optional)"
                                  value={formData[`${question.name}Comment`] || ''}
                                  onChange={handleChange}
                              />
                          </div>
                      ))}
  
                      <h2>Scalability and Flexibility:</h2>
                      {[
                          { name: "scalability", label: "Can the access control software scale to accommodate the needs of your organization as it grows?" },
                          { name: "flexibility", label: "Does it offer flexibility in configuring access control rules and permissions based on organizational requirements?" },
                          { name: "adaptability", label: "Is it adaptable to changes in access control policies, personnel, and security protocols?" },
                      ].map((question, index) => (
                          <div key={index} className="form-section">
                              <label>{question.label}</label>
                              <div>
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
                              </div>
                              <input
                                  type="text"
                                  name={`${question.name}Comment`}
                                  placeholder="Comment (Optional)"
                                  value={formData[`${question.name}Comment`] || ''}
                                  onChange={handleChange}
                              />
                          </div>
                      ))}
  
                      <h2>User Interface and Ease of Use:</h2>
                      {[
                          { name: "userInterface", label: "Is the user interface intuitive and easy to navigate for administrators and end-users?" },
                          { name: "customization", label: "Are there features for customizing dashboards, reports, and access control workflows?" },
                          { name: "userDocumentation", label: "Does the software provide comprehensive user documentation and training resources?" },
                      ].map((question, index) => (
                          <div key={index} className="form-section">
                              <label>{question.label}</label>
                              <div>
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
                              </div>
                              <input
                                  type="text"
                                  name={`${question.name}Comment`}
                                  placeholder="Comment (Optional)"
                                  value={formData[`${question.name}Comment`] || ''}
                                  onChange={handleChange}
                              />
                          </div>
                      ))}
  
                      <h2>Compliance with Regulations:</h2>
                      {[
                          { name: "compliance", label: "Does the access control software comply with relevant regulations, standards, and industry best practices?" },
                          { name: "testingCertification", label: "Has the software undergone testing or certification to verify compliance with applicable standards?" },
                      ].map((question, index) => (
                          <div key={index} className="form-section">
                              <label>{question.label}</label>
                              <div>
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
                              </div>
                              <input
                                  type="text"
                                  name={`${question.name}Comment`}
                                  placeholder="Comment (Optional)"
                                  value={formData[`${question.name}Comment`] || ''}
                                  onChange={handleChange}
                              />
                          </div>
                      ))}
                      <div className="form-section">
                          <label>Are there specific requirements or guidelines for access control software outlined by regulatory authorities or industry associations?</label>
                          <input type="text" name="regulatoryRequirements" placeholder="Enter any regulatory requirements" value={formData["regulatoryRequirements"] || ''} onChange={handleChange} />
                      </div>
  
                      <h2>Maintenance and Support:</h2>
                      {[
                          { name: "supportSystem", label: "Is there a reliable support system in place for troubleshooting issues, resolving technical challenges, and providing software updates?" },
                          { name: "sla", label: "Are there maintenance agreements or service level agreements (SLAs) to ensure timely support and software updates?" },
                          { name: "disasterRecovery", label: "Are there regular backups and disaster recovery plans in place to protect access control data?" },
                      ].map((question, index) => (
                          <div key={index} className="form-section">
                              <label>{question.label}</label>
                              <div>
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
                              </div>
                              <input
                                  type="text"
                                  name={`${question.name}Comment`}
                                  placeholder="Comment (Optional)"
                                  value={formData[`${question.name}Comment`] || ''}
                                  onChange={handleChange}
                              />
                          </div>
                      ))}
  
                      <input type="file" onChange={handleImageChange} accept="image/*" />
                      {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
                      {imageUploadError && <p style={{ color: 'red' }}>{imageUploadError}</p>}
                      <button type="submit">Submit</button>
                  </form>
              </main>
          </div>
      </div>
  );
}
  export default AccessControlSoftwarePage;