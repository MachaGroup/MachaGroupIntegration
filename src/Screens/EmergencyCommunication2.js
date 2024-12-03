import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';

function EmergencyCommunication2FormPage() {
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
      const formsRef = collection(db, 'forms/Personnel Training and Awareness/Emergency Communication 2');
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
            <h1>3.1.1.3.1 Emergency Communication Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 3.1.1.3.1 Emergency Communication */}
                <h2>3.1.1.3.1.1 Communication Equipment and Tools:</h2>
                <div className="form-section">
                    <label>What communication devices and tools are provided to staff members for emergency communication purposes, such as two-way radios, mobile phones, intercom systems, or panic alarms?</label>
                    <div>
                        <input type="text" name="communication-device-tools" placeholder="List the devices/tools" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are communication devices selected based on their reliability, range, durability, and compatibility with existing infrastructure to ensure effective communication capabilities during emergencies?</label>
                    <div>
                        <input type="radio" name="reliability-devices" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="reliability-devices" value="no" onChange={handleChange} /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are communication devices maintained, tested, and periodically inspected to verify functionality, battery life, signal strength, and readiness for use in emergency situations?</label>
                    <div>
                        <input type="text" name="maintained-devices" placeholder="Describe how they're maintained" onChange={handleChange} />  
                    </div>
                </div>

                <h2>3.1.1.3.1.2 Communication Protocols and Procedures:</h2>
                <div className="form-section">
                    <label>Are standardized communication protocols and procedures established to facilitate clear, concise, and efficient communication among staff members, emergency responders, and relevant stakeholders during emergencies?</label>
                    <div>
                        <input type="radio" name="standardized-protocols" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="standardized-protocols" value="no" onChange={handleChange} /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are communication channels designated, prioritized, and utilized for different types of emergency communications, such as distress calls, status updates, incident reports, or coordination messages?</label>
                    <div>
                        <input type="text" name="designated-channels" placeholder="Describe how they're designated" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What measures are in place to ensure adherence to communication protocols, minimize radio interference, avoid channel congestion, and prioritize emergency traffic during critical incidents?</label>
                    <div>
                        <input type="text" name="ensuring-adherence-measures" placeholder="Describe the measures" onChange={handleChange} />  
                    </div>
                </div>

                <h2>3.1.1.3.1.3 Training and Proficiency:</h2>
                <div className="form-section">
                    <label>Are staff members provided with training on the proper use, operation, and protocols for emergency communication devices and systems?</label>
                    <div>
                        <input type="radio" name="proper-use-training" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="proper-use-training" value="no" onChange={handleChange} /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Do training programs include practical exercises, simulations, or role-playing scenarios to familiarize staff members with communication procedures, protocols, and equipment operation under simulated emergency conditions?</label>
                    <div>
                        <input type="radio" name="training-programs" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="training-programs" value="no" onChange={handleChange} /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are staff members assessed for proficiency in emergency communication skills, such as effective radio etiquette, message clarity, active listening, and situational awareness during training exercises and drills?</label>
                    <div>
                        <input type="text" name="assessed-proficiency" placeholder="Describe how they're accessed" onChange={handleChange} />  
                    </div>
                </div>

                <h2>3.1.1.3.1.4 Coordination and Collaboration:</h2>
                <div className="form-section">
                    <label>How are communication systems integrated with broader emergency response plans, incident command structures, and coordination efforts within the school environment?</label>
                    <div>
                        <input type="text" name="integrated-systems" placeholder="Describe how they're integrated" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are communication protocols aligned with incident management protocols, resource allocation procedures, and decision-making frameworks to support effective coordination, information sharing, and situational awareness during emergencies?</label>
                    <div>
                        <input type="radio" name="aligned-protocols" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="aligned-protocols" value="no" onChange={handleChange} /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>What mechanisms are in place to facilitate communication and collaboration with external agencies, such as emergency dispatch centers, law enforcement agencies, fire departments, or medical response teams, during emergency incidents?</label>
                    <div>
                        <input type="text" name="facilitating-communication" placeholder="Describe the measures" onChange={handleChange} />  
                    </div>
                </div>

                <h2>3.1.1.3.1.5 Redundancy and Backup Systems:</h2>
                <div className="form-section">
                    <label>Are redundancy measures and backup communication systems implemented to mitigate the risk of communication failures, network disruptions, or equipment malfunctions during emergencies?</label>
                    <div>
                        <input type="radio" name="redundancy-measures" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="redundancy-measures" value="no" onChange={handleChange} /> No
                    </div>
                    <div>
                        <input type="text" name="redundancy-measures" placeholder="Describe the measures" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are redundant communication channels, alternative communication methods, or backup power sources utilized to ensure continuity of communication and information flow in the event of primary system failures or infrastructure damage?</label>
                    <div>
                        <input type="text" name="redundant-channels" placeholder="Describe the redundancy" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What provisions are in place to maintain communication resilience, restore functionality, and adapt communication strategies to changing conditions or evolving threats during prolonged emergency incidents?</label>
                    <div>
                        <input type="text" name="maintaining-resilience" placeholder="Describe the provisions" onChange={handleChange} />  
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit">Submit</button>

            </form>
        </main>
    </div>
  )
}

export default EmergencyCommunication2FormPage;
