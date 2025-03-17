import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; // Import Firebase Storage functions
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function BackupSystemsAndRedundanciesFormPage() {
  const navigate = useNavigate();
  const { buildingId } = useBuilding();
  const db = getFirestore();
  const storage = getStorage(); // Initialize Firebase Storage

  const [formData, setFormData] = useState({}); // Initialize as an object to store imageUrl
  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState(null); // State for image URL
  const [uploadError, setUploadError] = useState(null); // State for upload errors

  useEffect(() => {
    if (!buildingId) {
      alert('No building selected. Redirecting to Building Info...');
      navigate('/BuildingandAddress');
    }
  }, [buildingId, navigate]);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;

    if (type === 'radio') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked ? value : '',
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
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
        const formsRef = collection(db, 'forms/Continuous Improvement - Safety and Security/Backup Systems and Redundancies');
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
      const formsRef = collection(db, 'forms/Continuous Improvement - Safety and Security/Backup Systems and Redundancies');

      // Image upload logic
      if (image) {
        //Basic client-side validation
        if (!image.type.match('image/*')) {
          setUploadError('Please select a valid image file (jpg, jpeg, png, etc.)');
          // Disable the submit button if there's an error
          e.target.querySelector('button[type="submit"]').disabled = true;
          return;
        }
        if (image.size > 5 * 1024 * 1024) { // 5MB limit
          setUploadError('Image file too large (Max 5MB)');
          // Disable the submit button if there's an error
          e.target.querySelector('button[type="submit"]').disabled = true;
          return;
        }

        // Enable the submit button before starting the upload
        e.target.querySelector('button[type="submit"]').disabled = false;

        const storageRef = ref(storage, `backupSystems_images/${Date.now()}_${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on('state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
          },
          (error) => {
            setUploadError(error);
            // Re-enable submit button after error
            e.target.querySelector('button[type="submit"]').disabled = false;
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setImageUrl(downloadURL);
              setFormData({ ...formData, imageUrl: downloadURL });
              setUploadError(null);
            });
          }
        );
      }

      await addDoc(formsRef, {
        building: buildingRef,
        formData: formData,
      });
      console.log('Form Data submitted successfully!');
      alert('Form Submitted successfully!');
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
        <h1>7.2.2.2.2. Backup Systems and Redundancies</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          {/* 7.2.2.2.2. Backup Systems and Redundancies */}
          <h2>7.2.2.2.2. Backup Systems and Redundancies:</h2>
          <div className="form-section">
            <label>What types of backup systems are in place to ensure data integrity and availability during an emergency?</label>
            <div>
              <input type="text" name="systemsEnsuringDataIntegrity" placeholder="Describe the types" onChange={handleChange} />
            </div>
          </div>

          <div className="form-section">
            <label>How are redundancies established to maintain critical operations when primary systems fail?</label>
            <div>
              <input type="text" name="maintainingCriticalOperations" placeholder="Describe how it's maintained" onChange={handleChange} />
            </div>
          </div>

          <div className="form-section">
            <label>What procedures are followed to test and validate the effectiveness of backup systems and redundancies?</label>
            <div>
              <input type="text" name="validatingEffectiveness" placeholder="Describe the procedures" onChange={handleChange} />
            </div>
          </div>

          <div className="form-section">
            <label>How frequently are backup systems updated to reflect the latest data and operational changes?</label>
            <div>
              <input type="text" name="frequentUpdates" placeholder="Describe how frequent" onChange={handleChange} />
            </div>
          </div>

          <div className="form-section">
            <label>What training is provided to staff regarding the use of backup systems and understanding redundancies in place?</label>
            <div>
              <input type="text" name="staffTraining" placeholder="Describe the training" onChange={handleChange} />
            </div>
          </div>

          {/* Image Upload */}
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
          {uploadError && <p style={{ color: 'red' }}>{uploadError}</p>}
          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}

export default BackupSystemsAndRedundanciesFormPage;
