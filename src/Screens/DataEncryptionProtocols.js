import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';

function DataEncryptionProtocolsPage() {
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
      const formsRef = collection(db, 'forms/Continuous Improvement - Safety and Security/Data Encryption Protocols');
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
            <h1>7.3.2.2 Data Protection Measures</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-section">
                {/* Data Encryption Protocols */}
                <h3> 7.3.2.2.1 Data Encryption Protocols</h3>
                <label>What types of data are prioritized for encryption, and what criteria determine this prioritization?</label>
            <div>
              <input type="text" name="encryptionPrioritization" placeholder="Describe criteria for data encryption prioritization" onChange={handleChange}/>
            </div>
          </div>

          <div className="form-section">
            <label>How are encryption keys managed and protected to prevent unauthorized access?</label>
            <div>
              <input type="text" name="encryptionKeyManagement" placeholder="Describe encryption key management processes" onChange={handleChange}/>
            </div>
          </div>

          <div className="form-section">
            <label>What encryption standards or protocols (e.g., AES, RSA) are implemented to secure data both in transit and at rest?</label>
            <div>
              <input type="text" name="encryptionStandards" placeholder="Describe encryption standards or protocols" onChange={handleChange}/>
            </div>
          </div>

          <div className="form-section">
            <label>How frequently are encryption methods reviewed and updated to address emerging threats or vulnerabilities?</label>
            <div>
              <input type="text" name="encryptionReviewFrequency" placeholder="Describe frequency of encryption method review" onChange={handleChange}/>
            </div>
          </div>

          <div className="form-section">
            <label>What processes are in place to ensure compliance with relevant regulations regarding data encryption?</label>
            <div>
              <input type="text" name="encryptionCompliance" placeholder="Describe compliance processes for data encryption" onChange={handleChange}/>
            </div>
          </div>
          
                    {/* Submit Button */}
                    <button type="submit">Submit</button>

            </form>
        </main>
    </div>
  )
}

export default DataEncryptionProtocolsPage;