import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function SafetyAndSecurityTrainingPage() {
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
        const formsRef = collection(db, 'forms/Continuous Improvement - Safety and Security/Safety And Security Training');
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
      const formsRef = collection(db, 'forms/Continuous Improvement - Safety and Security/Safety And Security Training');
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
            <h1>7.2.2.2.3. Safety and Security Training</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
              <div className="form-section">
                {/* Safety And Security Training */}
                <h2>7.2.2.2.3. Safety and Security Training</h2>
                <label>What training programs are available for staff to understand safety and security protocols during emergencies?</label>
                <div>
                  <input type="text" name="trainingPrograms" placeholder="Describe the safety and security training programs" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>How frequently are safety and security training sessions conducted for employees and stakeholders?</label>
                <div>
                  <input type="text" name="trainingFrequency" placeholder="Describe the frequency of training sessions" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>What methods are used to assess the effectiveness of safety and security training programs?</label>
                <div>
                  <input type="text" name="trainingAssessmentMethods" placeholder="Describe the methods for assessing training effectiveness" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>How is training tailored to meet the specific needs of different roles within the organization?</label>
                <div>
                  <input type="text" name="trainingCustomization" placeholder="Describe how training is customized for different roles" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>What resources are provided to staff for ongoing education about safety and security best practices?</label>
                <div>
                  <input type="text" name="ongoingEducationResources" placeholder="Describe resources for ongoing education on safety and security" onChange={handleChange}/>
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

export default SafetyAndSecurityTrainingPage;