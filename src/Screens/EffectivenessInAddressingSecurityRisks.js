import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';

function EffectivenessInAddressingSecurityRisksPage() {
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
      const formsRef = collection(db, 'forms/Policy and Compliance/Effectiveness In Addressing Security Risks');
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
            <h1>5.4.1.1 Policy Evaluation Criteria</h1>
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-section">
                {/* Compliance with Regulations Section */}
                <h3>5.4.1.1.2 Effectiveness In Addressing Security Risks</h3>
                <label>How is the effectiveness of current policies in mitigating security risks measured?</label>
            <div>
              <input type="text" name="effectivenessMeasurement" placeholder="Describe how policy effectiveness is measured" />
            </div>
          </div>

          <div className="form-section">
            <label>What metrics or indicators are used to evaluate the success of security policies?</label>
            <div>
              <input type="text" name="successMetrics" placeholder="Describe metrics or indicators used to evaluate success" />
            </div>
          </div>

          <div className="form-section">
            <label>How often are security incidents reviewed to inform policy updates and improvements?</label>
            <div>
              <input type="text" name="incidentReviewFrequency" placeholder="Describe the frequency of security incident reviews" />
            </div>
          </div>

          <div className="form-section">
            <label>What processes are in place for stakeholders to provide feedback on the effectiveness of policies?</label>
            <div>
              <input type="text" name="feedbackProcesses" placeholder="Describe processes for stakeholder feedback on policies" />
            </div>
          </div>

          <div className="form-section">
            <label>How are lessons learned from security incidents integrated into policy revisions?</label>
            <div>
              <input type="text" name="lessonsLearnedIntegration" placeholder="Describe how lessons from incidents are integrated into policy revisions" />
            </div>
          </div>

                    {/* Submit Button */}
                    <button type="submit">Submit</button>

            </form>
        </main>
    </div>
  )
}

export default EffectivenessInAddressingSecurityRisksPage;