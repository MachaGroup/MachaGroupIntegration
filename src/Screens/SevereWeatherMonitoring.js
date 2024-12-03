import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import Navbar from "./Navbar";

function SevereWeatherMonitoringFormPage() {
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
      const formsRef = collection(db, 'forms/Emergency Preparedness/Severe Weather Monitoring');
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
            <Navbar />
            {/* Back Button */}
        <button className="back-button" onClick={handleBack}>←</button> {/* Back button at the top */}
            <h1>Severe Weather Monitoring Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 2.2.1.1.9 Severe Weather Monitoring */}
                <h2>Weather Alert Systems:</h2>
                <div className="form-section">
                    <label>Are weather alert systems installed and operational within the facility?</label>
                    <div>
                        <input type="radio" name="Alert Systems Operational" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Alert Systems Operational" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Do alert systems provide timely notifications of severe weather events, including tornadoes, thunderstorms, hurricanes, or other hazards?</label>
                    <div>
                        <input type="radio" name="Timely Notifications Provided" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Timely Notifications Provided" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are alert systems capable of broadcasting alerts through various communication channels, such as sirens, public address systems, text messages, or mobile apps?</label>
                    <div>
                        <input type="radio" name="Multi-Channel Broadcasts" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Multi-Channel Broadcasts" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>Integration with External Sources:</h2>
                <div className="form-section">
                    <label>Is the facility connected to external weather monitoring services or agencies for receiving up-to-date weather forecasts and warnings?</label>
                    <div>
                        <input type="radio" name="External Source Link" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="External Source Link" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are alert systems configured to automatically receive and relay weather alerts issued by national or local weather authorities?</label>
                    <div>
                        <input type="radio" name="Automatic Alert Relay" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Automatic Alert Relay" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there redundancy built into alert systems to ensure reliable reception and dissemination of weather alerts, even during power outages or network disruptions?</label>
                    <div>
                        <input type="radio" name="Alert System Redundancy" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Alert System Redundancy" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="auth-mechanisms" placeholder="Describe the redundancy" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Alert Activation Protocols:</h2>
                <div className="form-section">
                    <label>Are there established protocols for activating weather alert systems based on the severity and proximity of approaching weather events?</label>
                    <div>
                        <input type="radio" name="Activation Protocols Set" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Activation Protocols Set" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="auth-mechanisms" placeholder="Describe the protocols" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Do designated personnel have the authority and training to initiate alert activations in accordance with established protocols?</label>
                    <div>
                        <input type="radio" name="Designated Personnel Authority" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Designated Personnel Authority" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="auth-mechanisms" placeholder="List the designated personnel" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there a process for verifying the authenticity and reliability of weather alerts before activating alert systems?</label>
                    <div>
                        <input type="radio" name="Alert Verification Process" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Alert Verification Process" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="auth-mechanisms" placeholder="Describe the process" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Notification and Communication:</h2>
                <div className="form-section">
                    <label>Are weather alerts communicated promptly to all occupants and stakeholders within the facility?</label>
                    <div>
                        <input type="radio" name="Prompt Alert Communication" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Prompt Alert Communication" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are communication methods used to relay weather alerts tailored to the preferences and accessibility needs of different occupants, such as visual, auditory, or text-based alerts?</label>
                    <div>
                        <input type="radio" name="Tailored Communication Methods" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Tailored Communication Methods" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there a process for verifying the authenticity and reliability of weather alerts before activating alert systems?</label>
                    <div>
                        <input type="radio" name="Authenticity Verification" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Authenticity Verification" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="auth-mechanisms" placeholder="Describe the protocol" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Response Procedures:</h2>
                <div className="form-section">
                    <label>Are response procedures established for different types of severe weather events, such as tornadoes, hurricanes, floods, or lightning storms?</label>
                    <div>
                        <input type="radio" name="Response Procedures Set" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Response Procedures Set" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="auth-mechanisms" placeholder="Describe the procedures" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Do response procedures outline specific actions to be taken by occupants, staff members, and security personnel in response to weather alerts?</label>
                    <div>
                        <input type="radio" name="Specific Actions Defined" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Specific Actions Defined" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are response procedures regularly reviewed and updated based on lessons learned from past incidents or changes in weather patterns?</label>
                    <div>
                        <input type="radio" name="Procedure Review Cycle" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Procedure Review Cycle" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>Training and Education:</h2>
                <div className="form-section">
                    <label>Are staff members and occupants trained on how to interpret weather alerts and respond appropriately during severe weather events?</label>
                    <div>
                        <input type="radio" name="Occupant Training Provided" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Occupant Training Provided" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are training materials and resources provided to educate occupants on sheltering procedures, evacuation routes, and other safety measures related to severe weather?</label>
                    <div>
                        <input type="radio" name="Training Material Availability" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Training Material Availability" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are drills or simulations conducted periodically to practice response procedures and ensure readiness for severe weather emergencies?</label>
                    <div>
                        <input type="radio" name="Drill Simulation Conducted" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Drill Simulation Conducted" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>Evaluation and Improvement:</h2>
                <div className="form-section">
                    <label>Is there a process for evaluating the effectiveness of weather alert systems and response procedures?</label>
                    <div>
                        <input type="radio" name="System Evaluation Process" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="System Evaluation Process" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="auth-mechanisms" placeholder="Describe the process" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are feedback mechanisms in place to gather input from occupants and stakeholders on the timeliness and clarity of weather alerts and response efforts?</label>
                    <div>
                        <input type="radio" name="Feedback Mechanisms Active" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Feedback Mechanisms Active" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="auth-mechanisms" placeholder="Describe the feedback mechanisms" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are recommendations from evaluations and feedback used to improve weather monitoring systems, communication protocols, and preparedness for future severe weather events?</label>
                    <div>
                        <input type="radio" name="Improvement Recommendations Used" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Improvement Recommendations Used" value="no" onChange={handleChange}/> No
                    </div>
                </div>

            </form>
        </main>
    </div>
  )
}

export default SevereWeatherMonitoringFormPage;