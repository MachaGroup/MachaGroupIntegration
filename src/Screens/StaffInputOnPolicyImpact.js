import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';

function StaffInputOnPolicyImpactPage() {
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
      const formsRef = collection(db, 'forms/Policy and Compliance/Staff Input On Policy Impact');
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
            <h1>5.4.1.2 Stakeholder Feedback</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-section">
                {/* Staff Input On Policy Impact */}
                <h3>5.4.1.2.1 Staff Input On Policy Impact</h3>
                <label>What methods are used to collect staff feedback on the effectiveness of security policies?</label>
            <div>
              <input type="text" name="feedbackMethods" placeholder="Describe methods for collecting staff feedback" onChange={handleChange}/>
            </div>
          </div>

          <div className="form-section">
            <label>How often are staff surveys or focus groups conducted to assess policy impact?</label>
            <div>
              <input type="text" name="surveyFrequency" placeholder="Describe frequency of staff surveys or focus groups" onChange={handleChange}/>
            </div>
          </div>

          <div className="form-section">
            <label>In what ways are staff encouraged to share their experiences with existing policies?</label>
            <div>
              <input type="text" name="staffEncouragement" placeholder="Describe how staff are encouraged to share experiences" onChange={handleChange}/>
            </div>
          </div>

          <div className="form-section">
            <label>How is staff feedback incorporated into the policy revision process?</label>
            <div>
              <input type="text" name="feedbackIncorporation" placeholder="Describe how feedback is incorporated into revisions" onChange={handleChange}/>
            </div>
          </div>

          <div className="form-section">
            <label>What follow-up actions are taken after collecting staff input to address concerns or suggestions?</label>
            <div>
              <input type="text" name="followUpActions" placeholder="Describe follow-up actions after collecting feedback" onChange={handleChange}/>
            </div>
          </div>

                    {/* Submit Button */}
                    <button type="submit">Submit</button>

            </form>
        </main>
    </div>
  )
}

export default StaffInputOnPolicyImpactPage;