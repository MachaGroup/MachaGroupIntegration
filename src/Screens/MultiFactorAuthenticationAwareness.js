import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function MultiFactorAuthenticationAwarenessPage() {
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
      const formsRef = collection(db, 'forms/Cybersecurity/Multi-Factor Authentication Awareness');
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
            <h1>Multi-Factor Authentication (MFA) Awareness</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
              {/* Multi-Factor Authentication (MFA) Awareness */}
              <h2>4.3.2.3.2. Multi-Factor Authentication (MFA) Awareness</h2>
              <div className="form-section">
                <label>What types of authentication factors are used in MFA (e.g., SMS codes, biometrics, authenticator apps)?</label>
                <div>
                  <input type="text" name="authenticationFactors" placeholder="Describe the types" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>How is the importance of MFA communicated to users to prevent unauthorized access?</label>
                <div>
                  <input type="text" name="preveentingUnauthorizedAccess" placeholder="Describe the importance" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>What challenges do users face when enabling MFA, and how can these be addressed?</label>
                <div>
                  <input type="text" name="MFAChallenges" placeholder="Describe the challenges" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>In what situations is MFA mandatory, and how is it enforced within the organization?</label>
                <div>
                  <input type="text" name="MFAMandatorySituations" placeholder="Describe the situations and how it's enforced" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>How are backup methods (e.g., recovery codes) provided in case primary authentication methods fail?</label>
                <div>
                  <input type="text" name="backupMethods" placeholder="Describe how they're provided" onChange={handleChange}/>
                </div>
              </div>

              {/* Submit Button */}
              <button type="submit">Submit</button>

            </form>
        </main>

    </div>
  )
}

export default MultiFactorAuthenticationAwarenessPage;