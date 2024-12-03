import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';

function KeycardAccessSystemsPage() {
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
            {/* Back Button */}
        <button className="back-button" onClick={handleBack}>←</button> {/* Back button at the top */}
            <h1>7.3.1.1 Access Control Systems</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-section">
                {/* Keycard Access Systems */}
                <h3> 7.3.1.1.1 Keycard Access Systems</h3>
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
                    <button type="submit">Submit</button>

            </form>
        </main>
    </div>
  )
}

export default KeycardAccessSystemsPage;