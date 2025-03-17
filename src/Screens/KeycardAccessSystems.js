import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function KeycardAccessSystemsPage() {
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
                    const formsRef = collection(db, 'forms/Continuous Improvement - Safety and Security/Keycard Access Systems');
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
                navigate(-1);  // Navigates to the previous page
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
      const formsRef = collection(db, 'forms/Continuous Improvement - Safety and Security/Keycard Access Systems');
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
            <h1>7.3.1.1.1. Keycard Access Systems</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
              {/* Keycard Access Systems */}
              <h2>7.3.1.1.1. Keycard Access Systems</h2>
              <div className="form-section">
                <label>What criteria are used to determine who is issued keycards for access to school facilities?</label>
                <div>
                  <input type="text" name="keycardCriteria" placeholder="Describe criteria for keycard issuance" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>How is the keycard access system monitored for unauthorized access attempts?</label>
                <div>
                  <input type="text" name="keycardMonitoring" placeholder="Describe monitoring processes" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>What procedures are in place for deactivating keycards when an employee leaves the school or changes roles?</label>
                <div>
                  <input type="text" name="keycardDeactivation" placeholder="Describe deactivation procedures" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>How frequently is the keycard access system reviewed for effectiveness and potential vulnerabilities?</label>
                <div>
                  <input type="text" name="keycardReview" placeholder="Describe frequency of reviews" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>Are there contingency plans for situations where keycards fail or are lost, and how are these communicated to staff?</label>
                <div>
                  <input type="text" name="keycardContingency" placeholder="Describe contingency plans" onChange={handleChange}/>
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

export default KeycardAccessSystemsPage;