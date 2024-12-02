import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';

function EvacuationProcedures2FormPage() {
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
      const formsRef = collection(db, 'forms/Personnel Training and Awareness/Emergency Evacuation Procedures');
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
    <h1>Evacuation Procedures Assessment</h1>
    <img src={logo} alt="Logo" className="logo" />
  </header>

  <main className="form-container">
    <form onSubmit={handleSubmit}>
      {/* 3.1.1.2.10 Evacuation Procedures */}
      <h2>Evacuation Plan Development:</h2>
      <div className="form-section">
        <label>How are evacuation procedures developed, documented, and communicated to staff members, students, and visitors within the school community?</label>
        <div>
          <input type="text" name="evacuationProceduresDevelopment" placeholder="Describe how they're developed" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>Are evacuation plans based on thorough assessments of building layouts, occupancy characteristics, fire protection systems, and potential hazards to ensure safe and efficient evacuation routes and assembly areas?</label>
        <div>
          <input type="radio" name="evacuationPlanAssessment" value="yes" onChange={handleChange}/> Yes
          <input type="radio" name="evacuationPlanAssessment" value="no" onChange={handleChange}/> No
        </div>
      </div>

      <div className="form-section">
        <label>What considerations are given to factors such as building occupancy, accessibility requirements, special needs populations, and coordination with local emergency responders in the development of evacuation plans?</label>
        <div>
          <input type="text" name="evacuationPlanConsiderations" placeholder="Describe the considerations" onChange={handleChange}/>
        </div>
      </div>

      <h2>Floor Plans and Evacuation Routes:</h2>
      <div className="form-section">
        <label>Are floor plans and evacuation routes prominently displayed, clearly marked, and readily accessible in key locations throughout the school premises?</label>
        <div>
          <input type="radio" name="floorPlansVisibility" value="yes" onChange={handleChange}/> Yes
          <input type="radio" name="floorPlansVisibility" value="no" onChange={handleChange}/> No
        </div>
      </div>

      <div className="form-section">
        <label>Do evacuation maps include detailed floor layouts, exit locations, primary and secondary evacuation routes, assembly areas, and designated muster points for accountability and headcount purposes?</label>
        <div>
          <input type="radio" name="evacuationMapDetails" value="yes" onChange={handleChange}/> Yes
          <input type="radio" name="evacuationMapDetails" value="no" onChange={handleChange}/> No
        </div>
      </div>

      <div className="form-section">
        <label>How are evacuation routes tailored to different areas of the school campus, such as classrooms, offices, gymnasiums, auditoriums, laboratories, or specialized facilities, to accommodate varying occupant loads and mobility considerations?</label>
        <div>
          <input type="text" name="evacuationRoutesCustomization" placeholder="Describe how they're tailored" onChange={handleChange}/>
        </div>
      </div>

      <h2>Staff Training and Familiarization:</h2>
      <div className="form-section">
        <label>How are staff members trained on evacuation procedures, route navigation, assembly area assignments, and roles and responsibilities during evacuation drills and real emergencies?</label>
        <div>
          <input type="text" name="staffTrainingEvacuation" placeholder="Describe how they're trained" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>Are evacuation training sessions conducted regularly to familiarize staff members with evacuation routes, exit procedures, emergency equipment locations, and communication protocols?</label>
        <div>
          <input type="radio" name="evacuationTrainingFrequency" value="yes" onChange={handleChange}/> Yes
          <input type="radio" name="evacuationTrainingFrequency" value="no" onChange={handleChange}/> No
        </div>
      </div>

      <div className="form-section">
        <label>What measures are in place to ensure staff members are equipped with the knowledge, skills, and confidence to lead and assist occupants during evacuations and account for individuals with special needs or mobility challenges?</label>
        <div>
          <input type="text" name="staffReadinessMeasures" placeholder="Describe the measures" onChange={handleChange}/>
        </div>
      </div>

      <h2>Drill Execution and Evaluation:</h2>
      <div className="form-section">
        <label>How frequently are evacuation drills conducted, and what criteria are used to assess the effectiveness, realism, and compliance of drill exercises with established evacuation procedures?</label>
        <div>
          <input type="text" name="drillFrequencyCriteria" placeholder="Describe how frequent" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>Are evacuation drills tailored to simulate different scenarios, challenges, and contingencies to test the responsiveness, coordination, and decision-making capabilities of staff members and occupants?</label>
        <div>
          <input type="radio" name="drillScenarioCustomization" value="yes" onChange={handleChange}/> Yes
          <input type="radio" name="drillScenarioCustomization" value="no" onChange={handleChange}/> No
        </div>
      </div>

      <div className="form-section">
        <label>How are evacuation drill outcomes evaluated, debriefed, and used to identify areas for improvement, reinforce best practices, and enhance the overall readiness and resilience of the school community?</label>
        <div>
          <input type="text" name="drillOutcomeEvaluation" placeholder="Describe how they're evaluated" onChange={handleChange}/>
        </div>
      </div>

      <h2>Integration with Emergency Response Plans:</h2>
      <div className="form-section">
        <label>How are evacuation procedures integrated into broader emergency response plans, protocols, and coordination efforts within the school environment?</label>
        <div>
          <input type="text" name="evacuationIntegration" placeholder="Describe how they're integrated" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>Are evacuation procedures synchronized with other emergency response actions, such as lockdowns, sheltering, medical response, or reunification processes, to ensure a comprehensive and coordinated approach to emergency management?</label>
        <div>
          <input type="radio" name="evacuationSynchronization" value="yes" onChange={handleChange}/> Yes
          <input type="radio" name="evacuationSynchronization" value="no" onChange={handleChange}/> No
        </div>
      </div>

      <div className="form-section">
        <label>What mechanisms are in place to communicate evacuation orders, monitor evacuation progress, and coordinate with external agencies, such as fire departments, law enforcement, or emergency management authorities, during evacuation operations?</label>
        <div>
          <input type="text" name="evacuationCommunicationMechanisms" placeholder="Describe the mechanisms" onChange={handleChange}/>
        </div>
      </div>

      <button type='submit'>Submit</button>
    </form>
  </main>
</div>

  )
}

export default EvacuationProcedures2FormPage;