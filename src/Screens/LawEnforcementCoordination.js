import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import Navbar from "./Navbar";

function LawEnforcementCoordinationFormPage() {
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
      const formsRef = collection(db, 'forms/Emergency Preparedness/Law Enforcement Coordination');
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
            <h1>Law Enforcement Coordination Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 2.2.1.2.3 Law Enforcement Coordination */}
                <h2>Communication Channels:</h2>
                <div className="form-section">
                    <label>Are there established communication channels between the facility and local law enforcement agencies?</label>
                    <div>
                        <input type="radio" name="Facility-LawComChannels" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Facility-LawComChannels" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="facilityLawCommunicationChannels" placeholder="Describe the channels" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there designated points of contact within the facility and law enforcement for emergency coordination?</label>
                    <div>
                        <input type="radio" name="Facility-LawPOCs" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Facility-LawPOCs" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are communication protocols documented and readily accessible to relevant personnel?</label>
                    <div>
                        <input type="radio" name="ComProtocolsAccessible" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="ComProtocolsAccessible" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="communicationProtocolsAccessible" placeholder="Describe the communication protocols" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Emergency Notification Procedures:</h2>
                <div className="form-section">
                    <label>Is there a protocol in place for notifying law enforcement agencies in the event of emergencies?</label>
                    <div>
                        <input type="radio" name="EmergencyNotifyProtocol" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="EmergencyNotifyProtocol" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="emergencyNotifyProtocol" placeholder="Describe the protocols" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there predefined methods for contacting law enforcement, such as phone calls, emails, or dedicated emergency lines?</label>
                    <div>
                        <input type="radio" name="LawContactMethods" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="LawContactMethods" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="lawContactMethods" placeholder="Describe the methods" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are staff members trained on when and how to initiate contact with law enforcement and what information to provide?</label>
                    <div>
                        <input type="radio" name="StaffLawComTraining" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="StaffLawComTraining" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>Response Time Expectations:</h2>
                <div className="form-section">
                    <label>Are response time expectations clearly defined and communicated to law enforcement agencies?</label>
                    <div>
                        <input type="radio" name="ResponseTimeDefined" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="ResponseTimeDefined" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Have response time benchmarks been established based on the facility's location, size, and potential risks?</label>
                    <div>
                        <input type="radio" name="ResponseTimeBenchmarks" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="ResponseTimeBenchmarks" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there a mechanism for tracking and evaluating law enforcement response times during emergencies?</label>
                    <div>
                        <input type="radio" name="ResponseTimeTracking" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="ResponseTimeTracking" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>Collaborative Planning:</h2>
                <div className="form-section">
                    <label>Are there regular meetings or exercises conducted with law enforcement agencies to review emergency response plans and coordination procedures?</label>
                    <div>
                        <input type="radio" name="CollabPlanningMeetings" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="CollabPlanningMeetings" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Do tabletop exercises or simulations involve law enforcement agencies to test coordination and communication during various emergency scenarios?</label>
                    <div>
                        <input type="radio" name="TabletopExercises" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="TabletopExercises" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are feedback and lessons learned from joint exercises used to improve coordination and response capabilities?</label>
                    <div>
                        <input type="radio" name="ExerciseFeedbackUsage" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="ExerciseFeedbackUsage" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>Information Sharing:</h2>
                <div className="form-section">
                    <label>Is there a protocol for sharing relevant information with law enforcement agencies during emergencies?</label>
                    <div>
                        <input type="radio" name="InfoSharingProtocol" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="InfoSharingProtocol" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="informationSharingProtocol" placeholder="Describe the protocol" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are staff members trained to provide accurate and timely information to law enforcement responders?</label>
                    <div>
                        <input type="radio" name="InfoSharingTraining" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="InfoSharingTraining" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there a secure method for sharing sensitive or confidential information with law enforcement agencies, if necessary?</label>
                    <div>
                        <input type="radio" name="SecureInfoSharing" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="SecureInfoSharing" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="secureInformationSharing" placeholder="Describe the method" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Mutual Aid Agreements:</h2>
                <div className="form-section">
                    <label>Does the facility have mutual aid agreements or partnerships with neighboring law enforcement agencies?</label>
                    <div>
                        <input type="radio" name="MutualAidExistence" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="MutualAidExistence" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are mutual aid agreements documented and reviewed periodically to ensure they align with current needs and resources?</label>
                    <div>
                        <input type="radio" name="MutualAidReview" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="MutualAidReview" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there a process for activating mutual aid support from other agencies during large-scale emergencies or resource-intensive incidents?</label>
                    <div>
                        <input type="radio" name="MutualAidActivation" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="MutualAidActivation" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="mutualAidActivation" placeholder="Describe the process" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Post-Incident Debriefing:</h2>
                <div className="form-section">
                    <label>Are debriefing sessions conducted after emergency incidents to review the effectiveness of law enforcement coordination and response?</label>
                    <div>
                        <input type="radio" name="PostIncidentDebriefs" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="PostIncidentDebriefs" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are representatives from law enforcement agencies involved in post-incident debriefings to provide feedback and insights?</label>
                    <div>
                        <input type="radio" name="LawEnforcementInvolvement" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="LawEnforcementInvolvement" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are recommendations from debriefing sessions implemented to improve coordination and response procedures for future incidents?</label>
                    <div>
                        <input type="radio" name="DebriefingRecommendations" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="DebriefingRecommendations" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit">Submit</button>

            </form>
        </main>
    </div>
  )
}

export default LawEnforcementCoordinationFormPage;