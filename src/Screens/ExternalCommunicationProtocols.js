import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
/**/
function ExternalCommunicationProtocolsFormPage() {
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
              const formsRef = collection(db, 'forms/Continuous Improvement - Safety and Security/External Communication Protocols');
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
      const formsRef = collection(db, 'forms/Continuous Improvement - Safety and Security/External Communication Protocols');
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
          <h1>7.2.2.1.2. External Communication Protocols</h1>
          <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 7.2.2.1.2. External Communication Protocols */}
                <h2>7.2.2.1.2. External Communication Protocols:</h2>
                <div className="form-section">
                    <label>What channels are utilized for communicating with parents and guardians during a crisis (e.g., phone calls, emails, social media)?</label>
                    <div>
                        <input type="text" name="communicationChannels" placeholder="Describe the channels" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>How is information shared with the media to ensure accurate reporting during a crisis situation?</label>
                    <div>
                        <input type="text" name="sharingInformationToMedia" placeholder="Describe how it's shared" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>What guidelines are in place to protect student and staff privacy when communicating externally during a crisis?</label>
                    <div>
                        <input type="text" name="protectingStudents" placeholder="Describe the guidelines" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>How are updates regarding the crisis communicated to the community, and how frequently are these updates provided?</label>
                    <div>
                        <input type="text" name="communicatedUpdates" placeholder="Describe how they're communicated" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                    <label>Who is responsible for managing external communications, and what training or resources do they have to handle media inquiries effectively?</label>
                    <div>
                        <input type="text" name="managingExternalCommunicationsResponsibility" placeholder="List who and describe the training" onChange={handleChange}/>
                    </div>
                </div>

                <button type='submit'>Submit</button>

            </form>
        </main>

    </div>

  )
}

export default ExternalCommunicationProtocolsFormPage;