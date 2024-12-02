import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';

function CPRCertificationFormPage() {
  const navigate = useNavigate();  // Initialize useNavigate hook for navigation
  const { buildingId } = useBuilding(); // Access buildingId from context
  const db = getFirestore();

  const [formData, setFormData] = useState();

  useEffect(() => {
      if (!buildingId) {
          alert('No building selected. Redirecting to Building Info...');
          navigate('/BuildingandAddress');
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

    if (!buildingId) {
        alert('Building ID is missing. Please start the assessment from the correct page.');
        return;
    }

    try {
      // Create a document reference to the building in the 'Buildings' collection
      const buildingRef = doc(db, 'Buildings', buildingId); 

      // Store the form data in the specified Firestore structure
      const formsRef = collection(db, 'forms/Personnel Training and Awareness/CPR Certification');
      await addDoc(formsRef, {
          building: buildingRef, // Reference to the building document
          formData: formData, // Store the form data as a nested object
      });

      console.log('Form data submitted successfully!');
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
    <h1>CPR Certification Assessment</h1>
    <img src={logo} alt="Logo" className="logo" />
  </header>

  <main className="form-container">
    <form onSubmit={handleSubmit}>
      {/* 3.1.1.2.6 CPR Certification */}
      <h2>Certification Requirements and Standards:</h2>
      <div className="form-section">
        <label>What certification standards or guidelines are followed for CPR training, such as those set by recognized organizations like the American Heart Association (AHA), American Red Cross (ARC), or similar accredited institutions?</label>
        <div>
          <input type="text" name="cprCertificationStandards" placeholder="Describe the standards/guidelines" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>Are CPR certification courses aligned with the latest industry standards, guidelines, and best practices for adult, child, and infant CPR techniques, as well as automated external defibrillator (AED) use and choking relief procedures?</label>
        <div>
          <input type="radio" name="cprStandardsAlignment" value="yes" onChange={handleChange}/> Yes
          <input type="radio" name="cprStandardsAlignment" value="no" onChange={handleChange}/> No
        </div>
      </div>

      <div className="form-section">
        <label>How do certification programs address specific CPR techniques, compression-to-ventilation ratios, rescuer fatigue management, and other factors that may impact the effectiveness of CPR interventions?</label>
        <div>
          <input type="text" name="cprTechniquesAddressed" placeholder="Describe how they address techniques" onChange={handleChange}/>
        </div>
      </div>

      <h2>Instructor Qualifications and Expertise:</h2>
      <div className="form-section">
        <label>What qualifications, credentials, and experience do CPR instructors possess to deliver high-quality training and ensure participant competency?</label>
        <div>
          <input type="text" name="cprInstructorQualifications" placeholder="Describe the qualifications/credentials/experience" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>Are CPR instructors certified by recognized CPR training organizations and accredited to teach CPR courses to school staff members?</label>
        <div>
          <input type="text" name="certifyingOrganizations" placeholder="List the organizations" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>How do instructors stay updated on changes in CPR protocols, instructional methodologies, and training techniques to deliver relevant and effective CPR certification programs?</label>
        <div>
          <input type="text" name="instructorUpdates" placeholder="Describe how they're updated" onChange={handleChange}/>
        </div>
      </div>

      <h2>Training Delivery and Methodology:</h2>
      <div className="form-section">
        <label>How are CPR certification courses delivered to accommodate diverse learning styles, preferences, and scheduling constraints of school staff members?</label>
        <div>
          <input type="text" name="courseDeliveryMethods" placeholder="Describe how they're delivered" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>Are training sessions conducted in-person, online, or through blended learning approaches that combine both classroom instruction and self-paced online modules?</label>
        <div>
          <input type="radio" name="trainingDeliveryModes" value="in-person" onChange={handleChange}/> In-person
          <input type="radio" name="trainingDeliveryModes" value="online" onChange={handleChange}/> Online
          <input type='radio' name='trainingDeliveryModes' value='blended' onChange={handleChange}/> Blended Learning Approaches
        </div>
      </div>

      <div className="form-section">
        <label>What training resources, materials, and technologies are utilized to enhance participant engagement, skills acquisition, and knowledge retention during CPR certification courses?</label>
        <div>
          <input type="text" name="trainingResourcesUtilized" placeholder="Describe what is utilized" onChange={handleChange}/>
        </div>
      </div>

      <h2>Skills Proficiency and Assessment:</h2>
      <div className="form-section">
        <label>How are CPR skills assessed and evaluated to ensure staff members achieve and maintain proficiency in performing CPR techniques effectively?</label>
        <div>
          <input type="text" name="cprSkillsAssessment" placeholder="Describe how they're assessed/evaluated" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>Are participants provided with opportunities for hands-on practice, skills demonstrations, and scenario-based simulations to apply CPR skills in simulated emergency situations?</label>
        <div>
          <input type="radio" name="handsOnPracticeOpportunities" value="yes" onChange={handleChange}/> Yes
          <input type="radio" name="handsOnPracticeOpportunities" value="no" onChange={handleChange}/> No
        </div>
      </div>

      <div className="form-section">
        <label>What criteria or performance standards are used to measure participant competency, and how are assessments conducted to verify skill mastery and readiness to respond to cardiac arrest events?</label>
        <div>
          <input type="text" name="competencyCriteria" placeholder="Describe the criteria/standards" onChange={handleChange}/>
        </div>
      </div>

      <h2>Recertification and Continuing Education:</h2>
      <div className="form-section">
        <label>What are the recertification requirements and intervals for maintaining CPR certification among school staff members, as recommended by CPR training organizations or regulatory agencies?</label>
        <div>
          <input type="text" name="recertificationRequirements" placeholder="Describe the requirements" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>Are recertification courses offered regularly to ensure staff members renew their CPR certification within the specified timeframe and stay updated on CPR protocols and techniques?</label>
        <div>
          <input type="radio" name="recertificationCourseAvailability" value="yes" onChange={handleChange}/> Yes
          <input type="radio" name="recertificationCourseAvailability" value="no" onChange={handleChange}/> No
        </div>
      </div>

      <div className="form-section">
        <label>How are staff members informed about recertification deadlines, renewal procedures, and opportunities for continuing education to sustain their CPR skills and knowledge over time?</label>
        <div>
          <input type="text" name="recertificationCommunication" placeholder="Describe how they're informed" onChange={handleChange}/>
        </div>
      </div>

      <button type='submit'>Submit</button>
    </form>
  </main>
</div>

  )
}

export default CPRCertificationFormPage;
