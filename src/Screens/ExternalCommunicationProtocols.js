import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function ExternalCommunicationProtocolsFormPage() {
  const navigate = useNavigate();  // Initialize useNavigate hook for navigation
  const { buildingId } = useBuilding(); // Access buildingId from context
  const db = getFirestore();

  const [formData, setFormData] = useState();

  useEffect(() => {
      if (!buildingId) {
          alert('No building selected. Redirecting to Building Info...');
          navigate('/BuildingandAddress');
      }
  }, [buildingId, navigate]);

  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
          ...prevData,
          [name]: value,
      }));
  };

  // Function to handle back button
  const handleBack = () => {
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