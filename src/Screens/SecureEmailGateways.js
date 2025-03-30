import React, { useState, useEffect, useRef } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import debounce from 'lodash.debounce';

function SecureEmailGatewaysPage() {
  const navigate = useNavigate();
  const { buildingId } = useBuilding();
  const db = getFirestore();
  const storage = getStorage();

  const [formData, setFormData] = useState({});
  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [saveError, setSaveError] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  const latestFormData = useRef(formData);

  useEffect(() => { latestFormData.current = formData; }, [formData]);

  const debouncedSave = useRef(debounce(async (dataToSave, imgUrl) => {
    try {
      const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Secure Email Gateways', buildingId);
      await setDoc(formDocRef, { formData: dataToSave, imageUrl: imgUrl, updatedAt: serverTimestamp() }, { merge: true });
      setSaveError(null);
    } catch (error) {
      console.error("Error saving form data:", error);
      setSaveError("Failed to save form data. Please try again.");
    }
  }, 500)).current;

  useEffect(() => {
    if (!buildingId) {
      alert('No building selected. Redirecting to Building Info...');
      navigate('/BuildingandAddress');
      return;
    }

    const fetchFormData = async () => {
      setLoading(true);
      setLoadError(null);
      try {
        const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Secure Email Gateways', buildingId);
        const docSnapshot = await getDoc(formDocRef);
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setFormData(data.formData || {});
          setImageUrl(data.imageUrl || null);
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
    return () => { debouncedSave.cancel(); };
  }, [buildingId, db, navigate]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'radio' ? (checked ? value : '') : value;
    setFormData(prev => {
      const updated = { ...prev, [name]: newValue };
      debouncedSave(updated, imageUrl);
      return updated;
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const imageFile = e.target.files[0];
      setImage(imageFile);
      const storageRef = ref(storage, `images/${imageFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on('state_changed',
        (snapshot) => setUploadProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100),
        (error) => setUploadError("Failed to upload image. Please try again."),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUrl(downloadURL);
            handleInputChange({ target: { name: 'imageUrl', value: downloadURL } });
          });
        }
      );
    }
  };

  const handleBack = () => navigate(-1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!buildingId) return alert('Building ID is missing. Start from the correct page.');

    try {
      const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Secure Email Gateways', buildingId);
      await setDoc(formDocRef, { formData, imageUrl, updatedAt: serverTimestamp() }, { merge: true });
      alert('Form submitted successfully!');
      navigate('/Form');
    } catch (error) {
      console.error("Submit error:", error);
      alert('Failed to submit the form. Please try again.');
    }
  };

  const renderQuestion = (label, name, radio = false) => (
    <div className="form-section">
      <label>{label}</label>
      {radio ? (
        <>
          <div>
            <input type="radio" name={name} value="Yes" checked={formData[name] === "Yes"} onChange={handleInputChange} /> Yes
            <input type="radio" name={name} value="No" checked={formData[name] === "No"} onChange={handleInputChange} /> No
          </div>
          <div>
            <input type="text" name={`${name}Comment`} value={formData[`${name}Comment`] || ''} placeholder="Comments" onChange={handleInputChange} />
          </div>
        </>
      ) : (
        <textarea name={name} value={formData[name] || ''} onChange={handleInputChange}></textarea>
      )}
    </div>
  );

  if (loading) return <div>Loading...</div>;
  if (loadError) return <div>Error: {loadError}</div>;
  if (saveError) return <div>Error: {saveError}</div>;

  return (
    <div className="form-page">
      <header className="header">
        <Navbar />
        <button className="back-button" onClick={handleBack}>←</button>
        <h1>Secure Email Gateways Assessment</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>
      <main className="form-container">
        <form onSubmit={handleSubmit}>

          {/* Implementation and Coverage */}
          <h2>4.2.1.2.1.1 Implementation and Coverage:</h2>
          {renderQuestion("How is file-level encryption implemented for sensitive files and folders, and are specific policies defined for which files require encryption?", "fileEncryptionImplementation")}
          {renderQuestion("Are there procedures in place to ensure that file-level encryption is consistently applied across all relevant types of data and across various storage locations (e.g., local drives, cloud storage)?", "encryptionConsistency", true)}
          {renderQuestion("What tools or software are used for file-level encryption, and how are they integrated into existing workflows?", "toolsForEncryption")}

          {/* Encryption Standards and Configuration */}
          <h2>4.2.1.2.1.2 Encryption Standards and Configuration:</h2>
          {renderQuestion("What encryption standards are used for file-level encryption (e.g., AES-256), and do they meet industry best practices and regulatory requirements?", "encryptionStandards")}
          {renderQuestion("How are encryption settings configured, and are there guidelines for determining the level of encryption required based on the sensitivity of the data?", "encryptionConfiguration")}
          {renderQuestion("Are encryption keys managed securely, and how are they distributed and protected to prevent unauthorized access?", "keyManagementSecure", true)}

          {/* Access Controls and Permissions */}
          <h2>4.2.1.2.1.3 Access Controls and Permissions:</h2>
          {renderQuestion("How are access controls managed for encrypted files and folders, and what authentication mechanisms are in place to ensure only authorized users can access encrypted data?", "accessControls")}
          {renderQuestion("Are permissions regularly reviewed and updated to reflect changes in user roles or employment status?", "permissionsReviewed", true)}
          {renderQuestion("How is encryption access controlled in shared environments, such as collaborative workspaces or cloud storage, where multiple users may need access?", "sharedEnvironmentControl")}

          {/* Compliance and Monitoring */}
          <h2>4.2.1.2.1.4 Compliance and Monitoring:</h2>
          {renderQuestion("How is compliance with file-level encryption policies monitored and enforced within the organization?", "complianceMonitoring")}
          {renderQuestion("Are there regular audits or checks to ensure that file-level encryption is applied consistently and that no sensitive files are left unencrypted?", "regularAudits", true)}
          {renderQuestion("What mechanisms are in place for detecting and addressing any unauthorized access or encryption failures?", "detectionMechanisms")}

          {/* Recovery and Management */}
          <h2>4.2.1.2.1.5 Recovery and Management:</h2>
          {renderQuestion("What procedures are in place for recovering encrypted files in the event of data loss or corruption, and how is data recovery managed while maintaining encryption?", "recoveryProcedures")}
          {renderQuestion("How are encryption keys and passwords managed for file-level encryption, and what steps are taken to ensure they are protected against loss or compromise?", "keyPasswordManagement")}
          {renderQuestion("Are there contingency plans for handling situations where files need to be decrypted, such as during legal investigations or audits, and how is data security maintained during these processes?", "contingencyPlans")}

          <input type="file" accept="image/*" onChange={handleImageChange} />
          {uploadProgress > 0 && <p>Upload Progress: {uploadProgress.toFixed(2)}%</p>}
          {imageUrl && <img src={imageUrl} alt="Uploaded" />}
          {uploadError && <p style={{ color: "red" }}>{uploadError}</p>}

          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}

export default SecureEmailGatewaysPage;