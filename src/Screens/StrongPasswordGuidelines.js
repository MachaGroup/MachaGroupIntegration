import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function StrongPasswordGuidelinesPage() {
  const navigate = useNavigate();  // Initialize useNavigate hook for navigation
  const { buildingId } = useBuilding();
  const db = getFirestore();

  const [formData, setFormData] = useState();

  useEffect(() => {
    if(!buildingId) {
      alert('No builidng selected. Redirecting to Building Info...');
      navigate('BuildingandAddress'); 
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
    
    if(!buildingId) {
      alert('Building ID is missing. Please start the assessment from the correct page.');
      return;
    }

    try {
      // Create a document reference to the building in the 'Buildings' collection
      const buildingRef = doc(db, 'Buildings', buildingId);

      // Store the form data in the specified Firestore structure
      const formsRef = collection(db, 'forms/Cybersecurity/Strong Password Guidelines');
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
            <h1>Strong Password Guidelines</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
              {/* Strong Password Guidelines */}
              <h2>4.3.2.3.1. Strong Password Guidelines</h2>
              <div className="form-section">
                <label>What criteria define a strong password (e.g., length, special characters, case sensitivity)?</label>
                <div>
                  <input type="text" name="strongPasswordCriteria" placeholder="Describe the criteria" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>How are employees educated on the risks of reusing passwords across multiple platforms?</label>
                <div>
                  <input type="text" name="reusingPasswordRisks" placeholder="Describe how they're educated" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>Are users encouraged to use passphrases, and how do they differ from traditional passwords?</label>
                <div>
                  <input type="text" name="usersPassphrases" placeholder="Describe how they differ" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>What tools or services (e.g., password managers) are recommended for securely storing passwords?</label>
                <div>
                  <input type="text" name="recommendedTools" placeholder="Describe the tools/services" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>How often are employees required to update their passwords, and what strategies ensure compliance?</label>
                <div>
                  <input type="text" name="updatingPasswords" placeholder="Describe how often" onChange={handleChange}/>
                </div>
              </div>

              {/* Submit Button */}
              <button type="submit">Submit</button>

            </form>
        </main>

    </div>

  )
}

export default StrongPasswordGuidelinesPage;