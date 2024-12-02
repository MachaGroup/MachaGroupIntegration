import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';

function DrillFrequencyFormPage() {
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
      const formsRef = collection(db, 'forms/Emergency Preparedness/Drill Frequency');
      await addDoc(formsRef, {
        buildling: buildingRef,
        formData: formData,
      });
      console.log('From Data submitted successfully!')
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
            <h1>Drill Frequency Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 2.3.1.2.6 Drill Frequency */}
                <h2>Scheduled Frequency:</h2>
                <div className="form-section">
                    <label>What is the planned frequency of emergency drills within the facility?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the plan" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there a predefined schedule for conducting drills, such as monthly, quarterly, or semi-annually?</label>
                    <div>
                        <input type="radio" name="predifinedSchedule" value="monthly" /> Monthly
                        <input type="radio" name="predifinedSchedule" value="qurterly" /> Quarterly
                        <input type="radio" name="predifinedSchedule" value='semi-annually' /> Semi-Annually
                    </div>
                </div>

                <div className="form-section">
                    <label>Are drill frequencies determined based on regulatory requirements, organizational policies, and best practices for emergency preparedness?</label>
                    <div>
                        <input type="radio" name="Regulation-Based Frequency" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Regulation-Based Frequency" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>Consistency and Compliance:</h2>
                <div className="form-section">
                    <label>Are drills conducted consistently according to the established schedule?</label>
                    <div>
                        <input type="radio" name="Schedule Consistency" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Schedule Consistency" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are deviations from the scheduled frequency documented and justified, such as rescheduling due to operational constraints or other priorities?</label>
                    <div>
                        <input type="radio" name="Deviation Documentation" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Deviation Documentation" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there a process for ensuring compliance with scheduled drill frequencies and addressing any lapses or delays?</label>
                    <div>
                        <input type="radio" name="Compliance Process" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Compliance Process" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the process" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Variety and Coverage:</h2>
                <div className="form-section">
                    <label>Are different types of emergency drills included in the drill schedule to cover a range of potential scenarios, hazards, and response actions?</label>
                    <div>
                        <input type="radio" name="Scenario Diversity" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Scenario Diversity" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Do drills address various emergency situations, such as fires, earthquakes, active threats, hazardous material spills, and medical emergencies?</label>
                    <div>
                        <input type="radio" name="Multi-Situation Coverage" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Multi-Situation Coverage" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are drills conducted in different areas of the facility to assess readiness and response capabilities across multiple locations?</label>
                    <div>
                        <input type="radio" name="Location Coverage" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Location Coverage" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>Stakeholder Participation:</h2>
                <div className="form-section">
                    <label>Are all relevant stakeholders, including staff members, occupants, management personnel, and external partners, involved in drill activities?</label>
                    <div>
                        <input type="radio" name="Stakeholder Involvement" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Stakeholder Involvement" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are drills coordinated with external agencies, such as emergency responders, to facilitate collaboration and mutual aid during emergencies?</label>
                    <div>
                        <input type="radio" name="Agency Coordination" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Agency Coordination" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are drills used as opportunities to engage and educate stakeholders on emergency procedures, roles, and responsibilities?</label>
                    <div>
                        <input type="radio" name="Stakeholder Engagement" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Stakeholder Engagement" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>Effectiveness and Learning:</h2>
                <div className="form-section">
                    <label>Are drills evaluated for their effectiveness in achieving desired learning objectives and improving emergency preparedness and response capabilities?</label>
                    <div>
                        <input type="radio" name="Drill Effectiveness" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Drill Effectiveness" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are feedback mechanisms in place to capture observations, insights, and lessons learned from drill participants and observers?</label>
                    <div>
                        <input type="radio" name="Feedback Mechanisms" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Feedback Mechanisms" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the feedback mechanisms" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are drill outcomes analyzed to identify strengths, areas for improvement, and opportunities for enhancing emergency readiness?</label>
                    <div>
                        <input type="radio" name="Outcome Analysis" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Outcome Analysis" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>Adaptability and Continuous Improvement:</h2>
                <div className="form-section">
                    <label>Is the drill frequency adjusted based on changing risk factors, operational needs, regulatory requirements, and lessons learned from previous drills?</label>
                    <div>
                        <input type="radio" name="Frequency Adjustment" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Frequency Adjustment" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are drill schedules flexible to accommodate emerging threats, organizational changes, and feedback from stakeholders?</label>
                    <div>
                        <input type="radio" name="Schedule Flexibility" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Schedule Flexibility" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there a process for incorporating feedback and recommendations from drill evaluations into future drill planning and execution?</label>
                    <div>
                        <input type="radio" name="Feedback Integration" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Feedback Integration" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the process" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Documentation and Recordkeeping:</h2>
                <div className="form-section">
                    <label>Are records maintained to document the scheduling, execution, and outcomes of emergency drills?</label>
                    <div>
                        <input type="radio" name="Drill Recordkeeping" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Drill Recordkeeping" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are drill records accessible for review, analysis, and reporting purposes, including compliance assessments and performance evaluations?</label>
                    <div>
                        <input type="radio" name="Records Accessibility" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Records Accessibility" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are drill schedules and records retained for auditing, training, and planning purposes, in accordance with applicable regulations and organizational policies?</label>
                    <div>
                        <input type="radio" name="Retention Policy" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Retention Policy" value="no" onChange={handleChange}/> No
                    </div>
                </div>

            </form>
        </main>
    </div>
  )
}

export default DrillFrequencyFormPage;