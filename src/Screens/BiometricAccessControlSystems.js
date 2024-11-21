import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';

function BiometricAccessControlSystemsPage() {
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
      const formsRef = collection(db, 'forms/Continuous Improvement - Safety and Security/Biometric Access Control Systems');
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
            {/* Back Button */}
        <button className="back-button" onClick={handleBack}>←</button> {/* Back button at the top */}
            <h1>7.3.1.1 Access Control Systems</h1>
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-section">
                {/* Keycard Access Systems */}
                <h3> 7.3.1.1.2 Biometric Access Control Systems</h3>
                <label>What types of biometric data are collected (e.g., fingerprints, facial recognition) for access control?</label>
            <div>
              <input type="text" name="biometricDataTypes" placeholder="Describe types of biometric data" />
            </div>
          </div>

          <div className="form-section">
            <label>How is biometric data stored and protected to ensure privacy and compliance with regulations?</label>
            <div>
              <input type="text" name="biometricDataProtection" placeholder="Describe storage and protection measures" />
            </div>
          </div>

          <div className="form-section">
            <label>What procedures are in place for handling false rejections or errors in biometric access?</label>
            <div>
              <input type="text" name="biometricErrors" placeholder="Describe procedures for handling errors" />
            </div>
          </div>

          <div className="form-section">
            <label>How frequently is the biometric access control system evaluated for accuracy and reliability?</label>
            <div>
              <input type="text" name="biometricEvaluation" placeholder="Describe evaluation frequency" />
            </div>
          </div>

          <div className="form-section">
            <label>Are there alternative access methods available for individuals who cannot use the biometric system?</label>
            <div>
              <input type="text" name="alternativeAccess" placeholder="Describe alternative access methods" />
            </div>
          </div>

          
                    {/* Submit Button */}
                    <button type="submit">Submit</button>

            </form>
        </main>
    </div>
  )
}

export default BiometricAccessControlSystemsPage;