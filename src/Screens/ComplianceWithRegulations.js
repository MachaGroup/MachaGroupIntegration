import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function ComplianceWithRegulationsPage() {
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
      const formsRef = collection(db, 'forms/Policy and Compliance/Compliance with Regulations');
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
            <h1>5.4.1.1 Policy Evaluation Criteria</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-section">
                {/* Compliance with Regulations Section */}
                <h3>5.4.1.1.1 Compliance with Regulations</h3>
                <label>How often are policies reviewed to ensure they align with changing regulations?</label>
                <div>
                    <input type="text" name="policyReviewFrequency" placeholder="Describe how often policies are reviewed for regulatory compliance" onChange={handleChange}/>
                </div>
                </div>

                <div className="form-section">
                <label>What regulatory frameworks (e.g., GDPR, FERPA, HIPAA) are used as benchmarks for compliance?</label>
                <div>
                    <input type="text" name="regulatoryFrameworks" placeholder="List the regulatory frameworks used for policy compliance" onChange={handleChange}/>
                </div>
                </div>

                <div className="form-section">
                <label>How are regulatory updates communicated to policy reviewers and stakeholders?</label>
                <div>
                    <input type="text" name="regulatoryUpdateCommunication" placeholder="Describe how regulatory updates are communicated" onChange={handleChange}/>
                </div>
                </div>

                <div className="form-section">
                <label>What tools or methods are used to monitor and assess compliance gaps in policies?</label>
                <div>
                    <input type="text" name="complianceAssessmentTools" placeholder="Describe tools or methods for assessing compliance gaps" onChange={handleChange}/>
                </div>
                </div>

                <div className="form-section">
                <label>How does the organization handle non-compliance identified during policy evaluations?</label>
                <div>
                    <input type="text" name="nonComplianceHandling" placeholder="Describe how non-compliance is handled during policy evaluations" onChange={handleChange}/>
                </div>
                </div>

                    {/* Submit Button */}
                    <button type="submit">Submit</button>

            </form>
        </main>
    </div>
  )
}

export default ComplianceWithRegulationsPage;