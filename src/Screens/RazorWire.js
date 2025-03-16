import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

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
  const handleBack = async () => {
    if (formData && buildingId) { // Check if formData and buildingId exist
      try {
        const buildingRef = doc(db, 'Buildings', buildingId);
        const formsRef = collection(db, 'forms/Physical Security/Razor Wire');
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
    navigate(-1);
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
            <Navbar />
        {/* Back Button */}
        <button className="back-button" onClick={handleBack}>←</button> {/* Back button at the top */}
        <h1>Razor Wire Assessment</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          {/* Placement and Coverage */}
          <h2>Placement and Coverage:</h2>
          <div className="form-section">
            <label>Is razor wire installed at strategic locations atop perimeter fences to deter unauthorized access?</label>
            <div>
              <input type="radio" name="razorWireInstalled" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="razorWireInstalled" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="razorWireInstalledComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Does the razor wire provide sufficient coverage to prevent climbing or scaling of the fence?</label>
            <div>
              <input type="radio" name="razorWireCoverage" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="razorWireCoverage" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="razorWireCoverageComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Are there any gaps or areas where razor wire is missing or damaged, compromising security?</label>
            <div>
              <input type="text" name="razorWireGaps" placeholder="Describe any gaps or damage" onChange={handleChange}/>
            </div>
          </div>

          {/* Safety Considerations */}
          <h2>Safety Considerations:</h2>
          <div className="form-section">
            <label>Are there warning signs or markers indicating the presence of razor wire to prevent accidental contact?</label>
            <div>
              <input type="radio" name="warningSigns" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="warningSigns" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="warningSignsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Is the razor wire installed at a height and angle that minimizes the risk of accidental injury to personnel or wildlife?</label>
            <div>
              <input type="radio" name="razorWireSafety" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="razorWireSafety" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="razorWireSafetyComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Are there measures in place to prevent unauthorized access to areas where razor wire is installed?</label>
            <div>
              <input type="radio" name="razorWireRestrictions" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="razorWireRestrictions" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="razorWireRestrictionsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          {/* Effectiveness as a Deterrent */}
          <h2>Effectiveness as a Deterrent:</h2>
          <div className="form-section">
            <label>Has razor wire proven effective in deterring unauthorized access or intrusions in the past?</label>
            <div>
              <input type="radio" name="razorWireEffectiveness" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="razorWireEffectiveness" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="razorWireEffectivenessComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Are there documented instances of individuals attempting to breach the perimeter being deterred by the presence of razor wire?</label>
            <div>
              <input type="text" name="documentedInstances" placeholder="Describe instances" onChange={handleChange}/>
            </div>
          </div>

          <div className="form-section">
            <label>Are there additional security measures in place to complement the effectiveness of razor wire in perimeter defense?</label>
            <div>
              <input type="radio" name="additionalMeasures" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="additionalMeasures" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="additionalMeasuresComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          {/* Compliance with Regulations */}
          <h2>Compliance with Regulations:</h2>
          <div className="form-section">
            <label>Does the installation of razor wire comply with relevant regulations, codes, and standards for security fencing?</label>
            <div>
              <input type="radio" name="compliance" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="compliance" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="complianceComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
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
              <textarea className='comment-box' name="inspectionsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          {/* Maintenance and Upkeep */}
          <h2>Maintenance and Upkeep:</h2>
          <div className="form-section">
            <label>Is there a regular maintenance schedule in place for razor wire installations?</label>
            <div>
              <input type="radio" name="maintenanceSchedule" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="maintenanceSchedule" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="maintenanceScheduleComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Are maintenance tasks, such as inspection for damage or corrosion, repair of any loose or damaged sections, and replacement of worn-out wire, performed according to schedule?</label>
            <div>
              <input type="radio" name="maintenanceTasks" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="maintenanceTasks" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="maintenanceTasksComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Are there records documenting maintenance activities, repairs, and any issues identified during inspections?</label>
            <div>
              <input type="radio" name="maintenanceRecords" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="maintenanceRecords" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="maintenanceRecordsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          {/* Consideration of Alternatives */}
          <h2>Consideration of Alternatives:</h2>
          <div className="form-section">
            <label>Has consideration been given to alternative perimeter security measures that may provide similar or enhanced security without the risks associated with razor wire?</label>
            <div>
              <input type="radio" name="alternativesConsidered" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="alternativesConsidered" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="alternativesConsideredComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Are there cost-effective and less hazardous alternatives that could achieve the same deterrent effect?</label>
            <div>
              <input type="text" name="hazardousAlternatives" placeholder="Describe any alternatives" onChange={handleChange}/>
            </div>
          </div>

          {/* Public Perception and Community Relations */}
          <h2>Public Perception and Community Relations:</h2>
          <div className="form-section">
            <label>Has the presence of razor wire been communicated transparently to stakeholders, including neighboring properties or the local community?</label>
            <div>
              <input type="radio" name="stakeholdersInformed" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="stakeholdersInformed" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="stakeholdersInformedComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Are there efforts to mitigate any negative perceptions or concerns related to the use of razor wire, such as landscaping or architectural design elements to conceal or soften its appearance?</label>
            <div>
              <input type="radio" name="mitigationEfforts" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="mitigationEfforts" value="no" onChange={handleChange}/> No
              <textarea className='comment-box' name="mitigationEffortsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
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
