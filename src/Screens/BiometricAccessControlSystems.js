import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; 
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function BiometricAccessControlSystemsPage() {
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
              const formsRef = collection(db, 'forms/Continuous Improvement - Safety and Security/Biometric Access Control Systems');
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
          const formsRef = collection(db, 'forms/Continuous Improvement - Safety and Security/Biometric Access Control Systems');

          if (image) {
              if (!image.type.match('image/*')) {
                  setUploadError('Please select a valid image file (jpg, jpeg, png, etc.)');
                  return;
              }
              if (image.size > 5 * 1024 * 1024) {
                  setUploadError('Image file too large (Max 5MB)');
                  return;
              }

              const storageRef = ref(storage, `biometricAccess_images/${Date.now()}_${image.name}`);
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
              <h1>Biometric Access Control Systems</h1>
              <img src={logo} alt="Logo" className="logo" />
          </header>
          <main className="form-container">
              <form onSubmit={handleSubmit}>
              <h2>7.3.1.1.2. Biometric Access Control Systems</h2>
              <div className="form-section">
                <label>What types of biometric data are collected (e.g., fingerprints, facial recognition) for access control?</label>
                <div>
                  <input type="text" name="biometricDataTypes" placeholder="Describe types of biometric data" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>How is biometric data stored and protected to ensure privacy and compliance with regulations?</label>
                <div>
                  <input type="text" name="biometricDataProtection" placeholder="Describe storage and protection measures" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>What procedures are in place for handling false rejections or errors in biometric access?</label>
                <div>
                  <input type="text" name="biometricErrors" placeholder="Describe procedures for handling errors" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>How frequently is the biometric access control system evaluated for accuracy and reliability?</label>
                <div>
                  <input type="text" name="biometricEvaluation" placeholder="Describe evaluation frequency" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>Are there alternative access methods available for individuals who cannot use the biometric system?</label>
                <div>
                  <input type="text" name="alternativeAccess" placeholder="Describe alternative access methods" onChange={handleChange}/>
                </div>
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

export default BiometricAccessControlSystemsPage;
