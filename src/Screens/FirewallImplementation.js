import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function FirewallImplementationPage() {
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
      const formsRef = collection(db, 'forms/Continuous Improvement - Safety and Security/Firewall Implementation and Configuration');
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
            <h1>7.3.2.1.1. Firewall Implementation and Configuration</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
              {/* Firewall Implementation */}
              <h2>7.3.2.1.1. Firewall Implementation and Configuration</h2>
              <div className="form-section">
                <label>What criteria are used to select and implement firewall solutions within the network?</label>
                <div>
                  <input type="text" name="firewallSelectionCriteria" placeholder="Describe selection and implementation criteria" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>How frequently is the firewall configuration reviewed and updated to address emerging threats?</label>
                <div>
                  <input type="text" name="firewallReviewFrequency" placeholder="Describe review frequency for firewall configurations" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>What specific access control lists (ACLs) have been established to restrict unauthorized access through the firewall?</label>
                <div>
                  <input type="text" name="firewallACLs" placeholder="Describe ACLs for firewall" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>How are firewall logs monitored for suspicious activity or potential breaches?</label>
                <div>
                  <input type="text" name="firewallLogMonitoring" placeholder="Describe monitoring process for firewall logs" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>What training or resources are provided to staff responsible for managing and maintaining the firewall?</label>
                <div>
                  <input type="text" name="firewallTraining" placeholder="Describe training for firewall management" onChange={handleChange}/>
                </div>
              </div>
          
                    {/* Submit Button */}
                    <button type="submit">Submit</button>

            </form>
        </main>
    </div>
  )
}

export default FirewallImplementationPage;