import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function SecurityGuardsPage() {
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
      const formsRef = collection(db, 'forms/Physical Security/Stationed Guards');
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
            <Navbar />
        {/* Back Button */}
        <button className="back-button" onClick={handleBack}>←</button> {/* Back button at the top */}
        <h1>1.1.1.1.4. Security Guards Assessment</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          {/* Training and Qualifications */}
          <h2>Training and Qualifications:</h2>
          <div className="form-section">
            <label>Have security guards received adequate training in security procedures, emergency response, and conflict resolution?</label>
            <div>
              <input type="radio" name="training" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="training" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are they certified or licensed to work as security personnel in your jurisdiction?</label>
            <div>
              <input type="radio" name="certified" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="certified" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Do they receive ongoing training to stay updated on security protocols and best practices?</label>
            <div>
              <input type="radio" name="ongoingTraining" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="ongoingTraining" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Professional Conduct */}
          <h2>Professional Conduct:</h2>
          <div className="form-section">
            <label>Do security guards demonstrate professionalism, courtesy, and respect when interacting with students, staff, and visitors?</label>
            <div>
              <input type="radio" name="professionalism" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="professionalism" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are they properly uniformed and equipped to perform their duties effectively?</label>
            <div>
              <input type="radio" name="uniformed" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="uniformed" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Do they adhere to established codes of conduct and ethical standards?</label>
            <div>
              <input type="radio" name="codesOfConduct" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="codesOfConduct" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Observation and Reporting */}
          <h2>Observation and Reporting:</h2>
          <div className="form-section">
            <label>Are security guards vigilant and observant of their surroundings, identifying and reporting any suspicious activities or security concerns?</label>
            <div>
              <input type="radio" name="vigilant" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="vigilant" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Do they conduct regular patrols and inspections of the premises to deter unauthorized access and monitor for potential threats?</label>
            <div>
              <input type="radio" name="patrols" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="patrols" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are incident reports accurately documented and promptly submitted following security incidents or breaches?</label>
            <div>
              <input type="radio" name="incidentReports" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="incidentReports" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Emergency Response and Crisis Management */}
          <h2>Emergency Response and Crisis Management:</h2>
          <div className="form-section">
            <label>Are security guards trained to respond effectively to emergencies, such as medical emergencies, fires, or security breaches?</label>
            <div>
              <input type="radio" name="emergencyResponse" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="emergencyResponse" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Do they know how to initiate lockdown procedures, evacuate occupants, and coordinate with emergency services?</label>
            <div>
              <input type="radio" name="lockdownProcedures" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="lockdownProcedures" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there established communication protocols for security guards to report emergencies and request assistance?</label>
            <div>
              <input type="radio" name="communicationProtocols" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="communicationProtocols" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Access Control and Visitor Management */}
          <h2>Access Control and Visitor Management:</h2>
          <div className="form-section">
            <label>Do security guards enforce access control measures, verifying the identity of individuals and ensuring they have proper authorization to enter?</label>
            <div>
              <input type="radio" name="accessControl" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="accessControl" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are visitor management procedures in place, including registration, issuance of visitor badges, and monitoring of visitor activities?</label>
            <div>
              <input type="radio" name="visitorManagement" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="visitorManagement" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are security guards trained to handle confrontational situations or unauthorized entry attempts diplomatically and assertively?</label>
            <div>
              <input type="radio" name="confrontationalSituations" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="confrontationalSituations" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Collaboration and Communication */}
          <h2>Collaboration and Communication:</h2>
          <div className="form-section">
            <label>Do security guards collaborate effectively with other stakeholders, such as school administrators, law enforcement, and emergency responders?</label>
            <div>
              <input type="radio" name="collaboration" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="collaboration" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are they able to communicate clearly and efficiently using two-way radios, phones, or other communication devices?</label>
            <div>
              <input type="radio" name="communicationDevices" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="communicationDevices" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there regular meetings or debriefings to discuss security issues, share information, and coordinate activities?</label>
            <div>
              <input type="radio" name="meetings" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="meetings" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Compliance with Regulations */}
          <h2>Compliance with Regulations:</h2>
          <div className="form-section">
            <label>Do security guards comply with relevant regulations, laws, and industry standards governing security operations?</label>
            <div>
              <input type="radio" name="compliance" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="compliance" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there specific requirements or guidelines for security guards outlined by regulatory authorities or industry associations that need to be met?</label>
            <div>
              <input type="text" name="regulatoryRequirements" placeholder="Enter any regulatory requirements" onChange={handleChange}/>
            </div>
          </div>

          <div className="form-section">
            <label>Are security guard services subject to audits, inspections, or certifications to verify compliance with applicable standards?</label>
            <div>
              <input type="radio" name="audits" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="audits" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Performance Evaluation and Feedback */}
          <h2>Performance Evaluation and Feedback:</h2>
          <div className="form-section">
            <label>Is there a process for evaluating the performance of security guards, providing feedback, and addressing any areas for improvement?</label>
            <div>
              <input type="radio" name="performanceEvaluation" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="performanceEvaluation" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are security guard contracts or agreements structured to incentivize high performance and accountability?</label>
            <div>
              <input type="radio" name="incentives" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="incentives" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there mechanisms for receiving feedback from students, staff, and visitors regarding the effectiveness and professionalism of security guards?</label>
            <div>
              <input type="radio" name="feedback" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="feedback" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}

export default SecurityGuardsPage;
