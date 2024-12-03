import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function EndpointSecuritySolutionsPage() {
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
      const formsRef = collection(db, 'forms/Continuous Improvement - Safety and Security/Endpoint Security Solutions');
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
            <h1>7.3.2.2 Data Protection Measures</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-section">
                {/* Data Encryption Protocols */}
                <h3> 7.3.2.2.3 Endpoint Security Solutions</h3>
                <label>What types of endpoint security solutions are currently implemented (e.g., antivirus, anti-malware, encryption)?</label>
            <div>
              <input type="text" name="endpointSecurityTypes" placeholder="Describe types of endpoint security solutions" onChange={handleChange}/>
            </div>
          </div>

          <div className="form-section">
            <label>How are endpoint security solutions configured to ensure they are effective against evolving threats?</label>
            <div>
              <input type="text" name="endpointSecurityConfiguration" placeholder="Describe configuration process for endpoint security" onChange={handleChange}/>
            </div>
          </div>

          <div className="form-section">
            <label>What processes are in place for monitoring and managing endpoint security alerts and incidents?</label>
            <div>
              <input type="text" name="endpointSecurityMonitoring" placeholder="Describe monitoring and management processes for alerts" onChange={handleChange}/>
            </div>
          </div>

          <div className="form-section">
            <label>How often are endpoint security solutions updated or patched to protect against new vulnerabilities?</label>
            <div>
              <input type="text" name="endpointSecurityUpdates" placeholder="Describe frequency of updates or patches for endpoint security" onChange={handleChange}/>
            </div>
          </div>

          <div className="form-section">
            <label>What training or resources are provided to staff regarding the importance of endpoint security and safe practices?</label>
            <div>
              <input type="text" name="endpointSecurityTraining" placeholder="Describe training for endpoint security awareness" onChange={handleChange}/>
            </div>
          </div>
          
                    {/* Submit Button */}
                    <button type="submit">Submit</button>

            </form>
        </main>
    </div>
  )
}

export default EndpointSecuritySolutionsPage;