import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function InternalCommunicationProtocolsFormPage() {
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
                    const formsRef = collection(db, 'forms/Continuous Improvement - Safety and Security/Internal Communication Protocols');
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

    if (!buildingId) {
        alert('Building ID is missing. Please start the assessment from the correct page.');
        return;
    }

    try {
      // Create a document reference to the building in the 'Buildings' collection
      const buildingRef = doc(db, 'Buildings', buildingId); 

      // Store the form data in the specified Firestore structure
      const formsRef = collection(db, 'forms/Continuous Improvement - Safety and Security/Internal Communication Protocols');
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
          <h1>7.2.2.1.1. Internal Communication Protocols</h1>
          <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 7.2.2.1.1. Internal Communication Protocols */}
                <h2>7.2.2.1.1. Internal Communication Protocols:</h2>
                <div className="form-section">
                    <label>What methods are used to communicate critical information to staff during a crisis (e.g., email, text alerts, PA system)?</label>
                    <div>
                        <input type="text" name="communicationMethods" placeholder="Describe the methods" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>How is the effectiveness of internal communication assessed during a crisis situation?</label>
                    <div>
                        <input type="text" name="internalCommunicationEffectiveness" placeholder="Describe how the effectiveness is assessed" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there designated spokespersons for internal communications, and how are they selected?</label>
                    <div>
                        <input type="text" name="internalCommunicationEffectiveness" placeholder="List the people and how they're selected" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>How is information about the crisis prioritized and disseminated to ensure all staff members are informed in a timely manner?</label>
                    <div>
                        <input type="text" name="prioritizedInformation" placeholder="Describe how it's prioritized and disseminated" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>What training do staff members receive to prepare them for communicating effectively during a crisis?</label>
                    <div>
                        <input type="text" name="staffCommunicationTraining" placeholder="Describe the training" onChange={handleChange}/>
                    </div>
                </div>

                <button type='submit'>Submit</button>

            </form>
        </main>

    </div>

  )
}

export default InternalCommunicationProtocolsFormPage;