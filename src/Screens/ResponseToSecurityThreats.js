import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function ResponseToSecurityThreatsPage() {
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
  const handleBack = async () => {
    if (formData && buildingId) { // Check if formData and buildingId exist
      try {
        const buildingRef = doc(db, 'Buildings', buildingId);
        const formsRef = collection(db, 'forms/Continuous Improvement - Safety and Security/Response To Security Threats');
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
      const formsRef = collection(db, 'forms/Continuous Improvement - Safety and Security/Response To Security Threats');
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
            <h1>7.2.3.2 Security Awareness Training</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* Response To Security Threats */}
                <h2> 7.2.3.2.2 Response To Security Threats: </h2>
                <div className="form-section">
                  <label>What procedures are in place for staff to follow when a security threat is identified?</label>
                    <div>
                      <input type="text" name="securityThreatProcedures" placeholder="Describe procedures for responding to a security threat" onChange={handleChange}/>
                    </div>
                </div>

                <div className="form-section">
                  <label>How frequently are response protocols for security threats reviewed and practiced?</label>
                  <div>
                    <input type="text" name="responseProtocolReview" placeholder="Describe frequency of response protocol reviews" onChange={handleChange}/>
                  </div>
                </div>

                <div className="form-section">
                  <label>Are there designated personnel responsible for coordinating the response to security threats, and how are they trained?</label>
                  <div>
                    <input type="text" name="securityPersonnelTraining" placeholder="Describe personnel and their training for handling security threats" onChange={handleChange}/>
                  </div>
                </div>

                <div className="form-section">
                  <label>What communication methods are used to alert staff and students during a security threat?</label>
                  <div>
                    <input type="text" name="alertCommunicationMethods" placeholder="Describe communication methods for alerting staff and students" onChange={handleChange}/>
                  </div>
                </div>

                <div className="form-section">
                  <label>How does the school evaluate the effectiveness of its response to past security threats?</label>
                  <div>
                    <input type="text" name="responseEvaluation" placeholder="Describe how past responses to security threats are evaluated" onChange={handleChange}/>
                  </div>
                </div>
          
              {/* Submit Button */}
              <button type="submit">Submit</button>
            </form>
        </main>
    </div>
  )
}

export default ResponseToSecurityThreatsPage;