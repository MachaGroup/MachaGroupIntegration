import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';

function RazorWirePage() {
  const navigate = useNavigate();  // Initialize useNavigate hook for navigation
  const { buildingId } = useBuilding();
  const db = getFirestore();

  const [formData, setFormData] = useState();

  useEffect(() => {
    if(!buildingId) {
      alert('No building selected. Redirecting to Building Info...');
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
      // Create a document reference to the building in the 'Buldings' collection
      const buildingRef = doc(db, 'Buildings', buildingId);

      // Store the form data in the specified Firestore structure
      const formsRef = collection(db, 'forms/Physical Security/Razor Wire');
      await addDoc(formsRef, {
        building: buildingRef, 
        formData: formData,
      });
      console.log('Form Data submitted successfully!');
      alert('Form submitted successfully!');
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
        <h1>Razor Wire Assessment</h1>
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          {/* Placement and Coverage */}
          <h2>Placement and Coverage:</h2>
          <div className="form-section">
            <label>Is razor wire installed at strategic locations atop perimeter fences to deter unauthorized access?</label>
            <div>
              <input type="radio" name="razor-wire-installed" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="razor-wire-installed" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Does the razor wire provide sufficient coverage to prevent climbing or scaling of the fence?</label>
            <div>
              <input type="radio" name="razor-wire-coverage" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="razor-wire-coverage" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there any gaps or areas where razor wire is missing or damaged, compromising security?</label>
            <div>
              <input type="text" name="razor-wire-gaps" placeholder="Describe any gaps or damage" onChange={handleChange}/>
            </div>
          </div>

          {/* Safety Considerations */}
          <h2>Safety Considerations:</h2>
          <div className="form-section">
            <label>Are there warning signs or markers indicating the presence of razor wire to prevent accidental contact?</label>
            <div>
              <input type="radio" name="warning-signs" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="warning-signs" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Is the razor wire installed at a height and angle that minimizes the risk of accidental injury to personnel or wildlife?</label>
            <div>
              <input type="radio" name="razor-wire-safety" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="razor-wire-safety" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there measures in place to prevent unauthorized access to areas where razor wire is installed?</label>
            <div>
              <input type="radio" name="razor-wire-restrictions" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="razor-wire-restrictions" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Effectiveness as a Deterrent */}
          <h2>Effectiveness as a Deterrent:</h2>
          <div className="form-section">
            <label>Has razor wire proven effective in deterring unauthorized access or intrusions in the past?</label>
            <div>
              <input type="radio" name="razor-wire-effectiveness" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="razor-wire-effectiveness" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there documented instances of individuals attempting to breach the perimeter being deterred by the presence of razor wire?</label>
            <div>
              <input type="text" name="documented-instances" placeholder="Describe instances" onChange={handleChange}/>
            </div>
          </div>

          <div className="form-section">
            <label>Are there additional security measures in place to complement the effectiveness of razor wire in perimeter defense?</label>
            <div>
              <input type="radio" name="additional-measures" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="additional-measures" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Compliance with Regulations */}
          <h2>Compliance with Regulations:</h2>
          <div className="form-section">
            <label>Does the installation of razor wire comply with relevant regulations, codes, and standards for security fencing?</label>
            <div>
              <input type="radio" name="compliance" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="compliance" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there any specific requirements or guidelines for the use of razor wire outlined by regulatory authorities or industry associations?</label>
            <div>
              <input type="text" name="guidelines" placeholder="Enter regulatory requirements" onChange={handleChange}/>
            </div>
          </div>

          <div className="form-section">
            <label>Has the installation undergone inspections or assessments to verify compliance with applicable standards?</label>
            <div>
              <input type="radio" name="inspections" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="inspections" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Maintenance and Upkeep */}
          <h2>Maintenance and Upkeep:</h2>
          <div className="form-section">
            <label>Is there a regular maintenance schedule in place for razor wire installations?</label>
            <div>
              <input type="radio" name="maintenance-schedule" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="maintenance-schedule" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are maintenance tasks, such as inspection for damage or corrosion, repair of any loose or damaged sections, and replacement of worn-out wire, performed according to schedule?</label>
            <div>
              <input type="radio" name="maintenance-tasks" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="maintenance-tasks" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there records documenting maintenance activities, repairs, and any issues identified during inspections?</label>
            <div>
              <input type="radio" name="maintenance-records" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="maintenance-records" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Consideration of Alternatives */}
          <h2>Consideration of Alternatives:</h2>
          <div className="form-section">
            <label>Has consideration been given to alternative perimeter security measures that may provide similar or enhanced security without the risks associated with razor wire?</label>
            <div>
              <input type="radio" name="alternatives-considered" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="alternatives-considered" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there cost-effective and less hazardous alternatives that could achieve the same deterrent effect?</label>
            <div>
              <input type="text" name="hazardous-alternatives" placeholder="Describe any alternatives" onChange={handleChange}/>
            </div>
          </div>

          {/* Public Perception and Community Relations */}
          <h2>Public Perception and Community Relations:</h2>
          <div className="form-section">
            <label>Has the presence of razor wire been communicated transparently to stakeholders, including neighboring properties or the local community?</label>
            <div>
              <input type="radio" name="stakeholders-informed" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="stakeholders-informed" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there efforts to mitigate any negative perceptions or concerns related to the use of razor wire, such as landscaping or architectural design elements to conceal or soften its appearance?</label>
            <div>
              <input type="radio" name="mitigation-efforts" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="mitigation-efforts" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}

export default RazorWirePage;
