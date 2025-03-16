import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function IntrusionDetectionSystems3Page() {
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
                const formsRef = collection(db, 'forms/Continuous Improvement - Safety and Security/Intrusion Detection Systems 3');
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
    
    if(!buildingId) {
      alert('Building ID is missing. Please start the assessment from the correct page.');
      return;
    }

    try {
      // Create a document reference to the building in the 'Buildings' collection
      const buildingRef = doc(db, 'Buildings', buildingId);

      // Store the form data in the specified Firestore structure
      const formsRef = collection(db, 'forms/Continuous Improvement - Safety and Security/Intrusion Detection Systems 3');
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
            <h1>7.3.1.2.2. Intrusion Detection Systems</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
              {/* Intrusion Detection Systems 3 */}
              <h2>7.3.1.2.2. Intrusion Detection Systems</h2>
              <div className="form-section">
                <label>What types of intrusion detection systems are currently in place (e.g., motion sensors, glass break detectors)?</label>
                <div>
                  <input type="text" name="intrusionSystemTypes" placeholder="Describe types of intrusion detection systems" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>How are alerts generated and communicated when a potential intrusion is detected?</label>
                <div>
                  <input type="text" name="intrusionAlertCommunication" placeholder="Describe alert generation and communication" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>What protocols are followed in response to alerts from the intrusion detection system?</label>
                <div>
                  <input type="text" name="intrusionResponseProtocol" placeholder="Describe response protocols for intrusion alerts" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>How often are the intrusion detection systems tested for functionality and reliability?</label>
                <div>
                  <input type="text" name="intrusionSystemTesting" placeholder="Describe testing frequency for intrusion detection systems" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>Are there regular reviews of incidents detected by the system to assess security effectiveness and improve procedures?</label>
                <div>
                  <input type="text" name="incidentReview" placeholder="Describe incident reviews and improvements" onChange={handleChange}/>
                </div>
              </div>

          
                    {/* Submit Button */}
                    <button type="submit">Submit</button>

            </form>
        </main>
    </div>
  )
}

export default IntrusionDetectionSystems3Page;