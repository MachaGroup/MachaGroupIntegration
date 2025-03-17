import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function CCTVCameraInstallationPage() {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!buildingId) {
      alert('Building ID is missing. Please start the assessment from the correct page.');
      return;
    }

    try {
      const buildingRef = doc(db, 'Buildings', buildingId);
      const formsRef = collection(db, 'forms/Continuous Improvement - Safety and Security/CCTV Camera Installation and Monitoring');

      if (image) {
        if (!image.type.match('image/*')) {
          setUploadError('Please select a valid image file (jpg, jpeg, png, etc.)');
          return;
        }
        if (image.size > 5 * 1024 * 1024) {
          setUploadError('Image file too large (Max 5MB)');
          return;
        }

        const storageRef = ref(storage, `cctv_images/${Date.now()}_${image.name}`);
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
        <button className="back-button" onClick={() => navigate(-1)}>←</button>
        <h1>7.3.1.2.1. CCTV Camera Installation and Monitoring</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
        <h2>7.3.1.2.1. CCTV Camera Installation and Monitoring</h2>
              <div className="form-section">
                <label>What criteria are used to determine the placement of CCTV cameras throughout the facility?</label>
                <div>
                  <input type="text" name="cctvPlacementCriteria" placeholder="Describe placement criteria for CCTV cameras" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>How is the footage from CCTV cameras monitored, and who is responsible for monitoring?</label>
                <div>
                  <input type="text" name="cctvMonitoring" placeholder="Describe monitoring processes" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>What is the retention period for recorded footage, and how is it securely stored?</label>
                <div>
                  <input type="text" name="cctvRetention" placeholder="Describe retention period and storage practices" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>Are there policies in place regarding the access and review of recorded footage by authorized personnel?</label>
                <div>
                  <input type="text" name="cctvAccessPolicy" placeholder="Describe policies for accessing CCTV footage" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>How often is the CCTV system evaluated for effectiveness and updated as needed?</label>
                <div>
                  <input type="text" name="cctvSystemEvaluation" placeholder="Describe evaluation and update frequency" onChange={handleChange}/>
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

export default CCTVCameraInstallationPage;