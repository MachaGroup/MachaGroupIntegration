import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function RecognizingSecurityIncidentsFormPage() {
  const navigate = useNavigate();  // Initialize useNavigate hook for navigation
  const { buildingId } = useBuilding(); // Access buildingId from context
  const db = getFirestore();

  const [formData, setFormData] = useState();
  const storage = getStorage();
  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadError, setUploadError] = useState(null);


  useEffect(() => {
      if (!buildingId) {
          alert('No building selected. Redirecting to Building Info...');
          navigate('/BuildingandAddress');
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
        const formsRef = collection(db, 'forms/Personnel Training and Awareness/Recognizing Security Incidents');
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
      // Create a document reference to the building in the 'Buildings' collection
      const buildingRef = doc(db, 'Buildings', buildingId); 

      // Store the form data in the specified Firestore structure
      const formsRef = collection(db, 'forms/Personnel Training and Awareness/Recognizing Security Incidents');
      await addDoc(formsRef, {
          building: buildingRef, // Reference to the building document
          formData: formData, // Store the form data as a nested object
      });

      console.log('Form data submitted successfully!');
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
            {/* Back Button */}
        <button className="back-button" onClick={handleBack}>←</button> {/* Back button at the top */}
            <h1>Recognizing Security Incidents Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 3.1.5.1.1 Recognizing Security Incidents */}
                <div className="form-section">
                    <label>What are common signs of a potential security incident (e.g., phishing attempts, unusual network activity)?</label>
                    <div>
                        <input type="text" name="securityIncidentSigns" placeholder="List the common signs" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>How can employees distinguish between false alarms and legitimate security threats?</label>
                    <div>
                        <input type="text" name="distinguishFalseAlarms" placeholder="Describe how they distinguish between them" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>What types of incidents (e.g., malware infections, unauthorized access) should be reported immediately?</label>
                    <div>
                        <input type="text" name="typesOfIncidentsToReport" placeholder="Describe the different types" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>How should employees respond if they suspect a data breach or compromise?</label>
                    <div>
                        <input type="text" name="responseToDataBreach" placeholder="Describe how they should respond" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>What tools or systems are available to help employees monitor and report potential security issues?</label>
                    <div>
                        <input type="text" name="toolsForMonitoringSecurity" placeholder="List the tools/systems" onChange={handleChange}/>  
                    </div>
                </div>

                <button type='submit'>Submit</button>
            </form>
        </main>
    </div>
  )
}

export default RecognizingSecurityIncidentsFormPage;