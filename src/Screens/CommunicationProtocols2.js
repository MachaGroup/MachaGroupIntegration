import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
/**/
function CommunicationProtocols2FormPage() {
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
              const formsRef = collection(db, 'forms/Continuous Improvement - Safety and Security/Communication Protocols2');
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
      const formsRef = collection(db, 'forms/Continuous Improvement - Safety and Security/Communication Protocols2');
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
          <h1>7.2.1.1.2. Communication Protocols</h1>
          <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 7.2.1.1.2. Communication Protocols */}
                <h2>7.2.1.1.2. Communication Protocols:</h2>
                <div className="form-section">
                    <label>What communication methods are established for the Emergency Response Team during an incident?</label>
                    <div>
                        <input type="text" name="communicationMethods" placeholder="Describe the methods" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>How are emergency notifications disseminated to staff, students, and parents in a crisis situation?</label>
                    <div>
                        <input type="text" name="disseminatedNotifications" placeholder="Describe how they're disseminated" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>What procedures are in place to ensure accurate and timely communication with external agencies (e.g., police, fire department)?</label>
                    <div>
                        <input type="text" name="communicationProcedures" placeholder="Describe the procedures" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>How is information about the incident documented and shared with relevant stakeholders after an emergency?</label>
                    <div>
                        <input type="text" name="incidentDocumentation" placeholder="Describe it's documented and shared" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there backup communication systems in place if primary methods fail? If so, what are they?</label>
                    <div>
                        <input type="text" name="backupCommunicationSystems" placeholder="Describe the backup systems" onChange={handleChange}/>
                    </div>
                </div>

                <button type='submit'>Submit</button>

            </form>
        </main>

    </div>

  )
}

export default CommunicationProtocols2FormPage;