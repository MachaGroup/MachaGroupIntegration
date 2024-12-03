import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function RegularDataBackupsPage() {
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
      const formsRef = collection(db, 'forms/Continuous Improvement - Safety and Security/Regular Data Backups');
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
                <h3> 7.3.2.2.2 Regular Data Backups</h3>
                <label>What is the frequency of data backups (e.g., daily, weekly, monthly), and how is this schedule determined?</label>
                <div>
                  <input type="text" name="backupFrequency" placeholder="Describe data backup frequency and rationale" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>What types of data are included in the backup process, and are there any exclusions?</label>
                <div>
                  <input type="text" name="backupDataTypes" placeholder="Describe types of data included in backups" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>How are backup data stored, and what measures are in place to ensure the security of these backups?</label>
                <div>
                  <input type="text" name="backupStorageSecurity" placeholder="Describe backup data storage and security" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>What testing procedures are conducted to verify the integrity and recoverability of backup data?</label>
                <div>
                  <input type="text" name="backupTesting" placeholder="Describe testing procedures for backup integrity" onChange={handleChange}/>
                </div>
              </div>

              <div className="form-section">
                <label>How is the backup process documented, and who is responsible for overseeing it?</label>
                <div>
                  <input type="text" name="backupDocumentation" placeholder="Describe documentation and oversight for backups" onChange={handleChange}/>
                </div>
              </div>
          
              {/* Submit Button */}
              <button type="submit">Submit</button>
            </form>
        </main>
    </div>
  )
}

export default RegularDataBackupsPage;