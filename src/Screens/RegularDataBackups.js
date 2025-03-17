import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function RegularDataBackupsPage() {
  const navigate = useNavigate();  // Initialize useNavigate hook for navigation
  const { buildingId } = useBuilding();
  const db = getFirestore();

  const [formData, setFormData] = useState();
  const storage = getStorage();
  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadError, setUploadError] = useState(null);


  useEffect(() => {
    if(!buildingId) {
      alert('No builidng selected. Redirecting to Building Info...');
      navigate('BuildingandAddress'); 
    }
  }, [buildingId, navigate]);

  
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle back button
  const handleBack = async () => {
    if (formData && buildingId) { // Check if formData and buildingId exist
      try {
        const buildingRef = doc(db, 'Buildings', buildingId);
        const formsRef = collection(db, 'forms/Continuous Improvement - Safety and Security/Regular Data Backups');
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
    
    if(!buildingId) {
      alert('Building ID is missing. Please start the assessment from the correct page.');
      return;
    }

    try {
      // Create a document reference to the building in the 'Buildings' collection
      const buildingRef = doc(db, 'Buildings', buildingId);

      // Store the form data in the specified Firestore structure
      const formsRef = collection(db, 'forms/Continuous Improvement - Safety and Security/Regular Data Backups');
      await addDoc(formsRef, {
        buildling: buildingRef,
        formData: formData,
      });
      console.log('Form Data submitted successfully!')
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
            {/* Back Button */}
        <button className="back-button" onClick={handleBack}>←</button> {/* Back button at the top */}
            <h1>7.3.2.2.2. Regular Data Backups</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
              {/* Data Encryption Protocols */}
              <h2>7.3.2.2.2. Regular Data Backups</h2>
              <div className="form-section">
                <label>What is the frequency of data backups (e.g., daily, weekly, monthly), and how is this schedule determined?</label>
                <div>
                  <input type="text" name="backupFrequency" placeholder="Describe data backup frequency and rationale" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>What types of data are included in the backup process, and are there any exclusions?</label>
                <div>
                  <input type="text" name="backupDataTypes" placeholder="Describe types of data included in backups" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>How are backup data stored, and what measures are in place to ensure the security of these backups?</label>
                <div>
                  <input type="text" name="backupStorageSecurity" placeholder="Describe backup data storage and security" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>What testing procedures are conducted to verify the integrity and recoverability of backup data?</label>
                <div>
                  <input type="text" name="backupTesting" placeholder="Describe testing procedures for backup integrity" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>How is the backup process documented, and who is responsible for overseeing it?</label>
                <div>
                  <input type="text" name="backupDocumentation" placeholder="Describe documentation and oversight for backups" onChange={handleChange}/>
                </div>
              </div>
          
              {/* Submit Button */}
              <input type="file" accept="image/*" onChange={handleImageChange} />
{uploadProgress > 0 && <p>Upload Progress: {uploadProgress.toFixed(2)}%</p>}
{imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
{uploadError && <p style={{ color: "red" }}>{uploadError}</p>}
<button type="submit">Submit</button>
            </form>
        </main>
    </div>
  )
}

export default RegularDataBackupsPage;