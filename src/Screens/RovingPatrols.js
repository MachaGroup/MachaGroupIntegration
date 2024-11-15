import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';

function RovingPatrolsPage() {
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
      const formsRef = collection(db, 'forms/Physical Security/Roving Patrols');
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
        <h1>Roving Patrols Assessment</h1>
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          {/* Patrol Routes and Coverage */}
          <h2>Patrol Routes and Coverage:</h2>
          <div className="form-section">
            <label>Are roving patrols conducted regularly throughout the premises, covering all critical areas and potential security vulnerabilities?</label>
            <div>
              <input type="radio" name="regularPatrols" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="regularPatrols" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are patrol routes well-defined, ensuring comprehensive coverage of indoor and outdoor areas?</label>
            <div>
              <input type="radio" name="wellDefinedRoutes" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="wellDefinedRoutes" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there any areas or zones that require special attention or increased patrol frequency?</label>
            <input type="text" name="specialAttentionAreas" placeholder="Describe any areas or zones" onChange={handleChange}/>
          </div>

          {/* Frequency and Timing */}
          <h2>Frequency and Timing:</h2>
          <div className="form-section">
            <label>How often are roving patrols conducted, and at what intervals?</label>
            <input type="text" name="patrolFrequency" placeholder="Enter patrol frequency and intervals" onChange={handleChange}/>
          </div>

          <div className="form-section">
            <label>Are patrols conducted at random intervals to deter predictability and enhance security effectiveness?</label>
            <div>
              <input type="radio" name="randomIntervals" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="randomIntervals" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there additional patrols scheduled during high-risk periods or events?</label>
            <div>
              <input type="radio" name="additionalPatrols" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="additionalPatrols" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Observation and Vigilance */}
          <h2>Observation and Vigilance:</h2>
          <div className="form-section">
            <label>Do roving patrol officers actively monitor the premises for signs of unauthorized access, suspicious behavior, or security breaches?</label>
            <div>
              <input type="radio" name="activeMonitoring" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="activeMonitoring" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are they trained to recognize and respond to potential threats, including unauthorized individuals or unusual activities?</label>
            <div>
              <input type="radio" name="threatResponse" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="threatResponse" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Do patrol officers conduct thorough inspections of doors, windows, gates, and other access points during patrols?</label>
            <div>
              <input type="radio" name="thoroughInspections" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="thoroughInspections" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Response to Incidents */}
          <h2>Response to Incidents:</h2>
          <div className="form-section">
            <label>Are roving patrol officers equipped to respond promptly to security incidents, alarms, or emergencies encountered during patrols?</label>
            <div>
              <input type="radio" name="incidentResponse" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="incidentResponse" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Do they know how to initiate appropriate emergency response procedures and contact relevant authorities or response teams?</label>
            <div>
              <input type="radio" name="emergencyProcedures" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="emergencyProcedures" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there a system in place to coordinate with stationed guards or other security personnel in case of incidents requiring additional support?</label>
            <div>
              <input type="radio" name="coordinationWithGuards" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="coordinationWithGuards" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Documentation and Reporting */}
          <h2>Documentation and Reporting:</h2>
          <div className="form-section">
            <label>Are patrol officers required to maintain detailed records of patrol activities, including patrol routes, observations, and incidents encountered?</label>
            <div>
              <input type="radio" name="detailedRecords" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="detailedRecords" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there a standardized reporting process for documenting security incidents, suspicious activities, or maintenance issues identified during patrols?</label>
            <div>
              <input type="radio" name="reportingProcess" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="reportingProcess" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are patrol reports reviewed regularly by security management to identify trends, areas for improvement, or security risks?</label>
            <div>
              <input type="radio" name="reportReviews" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="reportReviews" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Communication and Coordination */}
          <h2>Communication and Coordination:</h2>
          <div className="form-section">
            <label>Is there effective communication between roving patrol officers and stationed guards, as well as with management and staff?</label>
            <div>
              <input type="radio" name="effectiveCommunication" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="effectiveCommunication" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are patrol officers equipped with communication devices to report incidents, request assistance, or communicate with response teams?</label>
            <div>
              <input type="radio" name="communicationDevices" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="communicationDevices" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there a centralized communication system or protocol for relaying information and coordinating responses between patrol officers and other security personnel?</label>
            <div>
              <input type="radio" name="centralizedCommunication" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="centralizedCommunication" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Training and Preparedness */}
          <h2>Training and Preparedness:</h2>
          <div className="form-section">
            <label>Are roving patrol officers adequately trained in security procedures, emergency response protocols, and effective patrol techniques?</label>
            <div>
              <input type="radio" name="adequateTraining" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="adequateTraining" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Do they receive ongoing training to enhance their skills, knowledge, and awareness of security threats and emerging risks?</label>
            <div>
              <input type="radio" name="ongoingTraining" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="ongoingTraining" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are patrol officers prepared to handle various situations professionally and effectively, including confrontations, medical emergencies, or crisis situations?</label>
            <div>
              <input type="radio" name="situationHandling" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="situationHandling" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}

export default RovingPatrolsPage;
