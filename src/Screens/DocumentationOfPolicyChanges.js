import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';

function DocumentationOfPolicyChangesPage() {
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
      const formsRef = collection(db, 'forms/Policy and Compliance/Documentation Of Policy Changes');
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
            <h1>5.4.2.1 Change Management Process</h1>
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-section">
                {/* Documentation Of Policy Changes */}
                <h3>5.4.2.1.2 Documentation Of Policy Changes</h3>
                <label>What format is used for documenting changes made to policies?</label>
            <div>
              <input type="text" name="documentFormat" placeholder="Describe the format used for documenting changes" />
            </div>
          </div>

          <div className="form-section">
            <label>How are the reasons for each policy change recorded?</label>
            <div>
              <input type="text" name="reasonDocumentation" placeholder="Describe how reasons for changes are documented" />
            </div>
          </div>

          <div className="form-section">
            <label>Who is responsible for maintaining the documentation of policy changes?</label>
            <div>
              <input type="text" name="documentationResponsibility" placeholder="Describe the person or team responsible for maintaining documentation" />
            </div>
          </div>

          <div className="form-section">
            <label>How is the historical record of policy changes accessible to stakeholders?</label>
            <div>
              <input type="text" name="historicalRecordAccess" placeholder="Describe how the historical record of policy changes is accessed" />
            </div>
          </div>

          <div className="form-section">
            <label>What procedures are in place to ensure that documentation is up-to-date and accurate?</label>
            <div>
              <input type="text" name="documentationUpdateProcedure" placeholder="Describe procedures for keeping documentation up-to-date" />
            </div>
          </div>
                    {/* Submit Button */}
                    <button type="submit">Submit</button>

            </form>
        </main>
    </div>
  )
}

export default DocumentationOfPolicyChangesPage;