import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function PerimeterSecurityFencingPage() {
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
        const formsRef = collection(db, 'forms/Continuous Improvement - Safety and Security/Perimeter Security Fencing');
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
      const formsRef = collection(db, 'forms/Continuous Improvement - Safety and Security/Perimeter Security Fencing');
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
            <h1>7.3.1.2.3. Perimeter Security Fencing</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
              {/* Perimeter Security Fencing */}
              <h2>7.3.1.2.3. Perimeter Security Fencing</h2>
              <div className="form-section">
                <label>What type of fencing is used to secure the perimeter of the property (e.g., chain link, barbed wire)?</label>
                <div>
                  <input type="text" name="fencingType" placeholder="Describe type of perimeter fencing used" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>How often is the perimeter security fencing inspected for damage or breaches?</label>
                <div>
                  <input type="text" name="fencingInspection" placeholder="Describe inspection frequency and procedures" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>What measures are in place to enhance the effectiveness of perimeter fencing (e.g., alarms, motion sensors)?</label>
                <div>
                  <input type="text" name="fencingEnhancement" placeholder="Describe measures to enhance perimeter fencing" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>Are there clear protocols for addressing breaches or vulnerabilities in the perimeter security?</label>
                <div>
                  <input type="text" name="fencingBreachProtocol" placeholder="Describe protocols for fencing breaches" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>How does the design of the perimeter fencing contribute to the overall security strategy of the facility?</label>
                <div>
                  <input type="text" name="fencingDesign" placeholder="Describe the contribution of fencing to security strategy" onChange={handleChange}/>
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

export default PerimeterSecurityFencingPage;