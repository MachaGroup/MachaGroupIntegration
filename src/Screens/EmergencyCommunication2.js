import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function EmergencyCommunication2FormPage() {
  const navigate = useNavigate();  // Initialize useNavigate hook for navigation

  // Function to handle back button
  const handleBack = () => {
    navigate(-1);  // Navigates to the previous page
  };

  return (
    <div className="form-page">
        <header className="header">
            {/* Back Button */}
        <button className="back-button" onClick={handleBack}>←</button> {/* Back button at the top */}
            <h1>Emergency Communication Assessment</h1>
        </header>

        <main className="form-container">
            <form>
                {/* 3.1.1.3.1 Emergency Communication */}
                <h2>Communication Equipment and Tools:</h2>
                <div className="form-section">
                    <label>What communication devices and tools are provided to staff members for emergency communication purposes, such as two-way radios, mobile phones, intercom systems, or panic alarms?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="List the devices/tools" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are communication devices selected based on their reliability, range, durability, and compatibility with existing infrastructure to ensure effective communication capabilities during emergencies?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are communication devices maintained, tested, and periodically inspected to verify functionality, battery life, signal strength, and readiness for use in emergency situations?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're maintained" />  
                    </div>
                </div>

                <h2>Communication Protocols and Procedures:</h2>
                <div className="form-section">
                    <label>Are standardized communication protocols and procedures established to facilitate clear, concise, and efficient communication among staff members, emergency responders, and relevant stakeholders during emergencies?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are communication channels designated, prioritized, and utilized for different types of emergency communications, such as distress calls, status updates, incident reports, or coordination messages?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're designated" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What measures are in place to ensure adherence to communication protocols, minimize radio interference, avoid channel congestion, and prioritize emergency traffic during critical incidents?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the measures" />  
                    </div>
                </div>

                <h2>Training and Proficiency:</h2>
                <div className="form-section">
                    <label>Are staff members provided with training on the proper use, operation, and protocols for emergency communication devices and systems?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Do training programs include practical exercises, simulations, or role-playing scenarios to familiarize staff members with communication procedures, protocols, and equipment operation under simulated emergency conditions?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are staff members assessed for proficiency in emergency communication skills, such as effective radio etiquette, message clarity, active listening, and situational awareness during training exercises and drills?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're accessed" />  
                    </div>
                </div>

                <h2>Coordination and Collaboration:</h2>
                <div className="form-section">
                    <label>How are communication systems integrated with broader emergency response plans, incident command structures, and coordination efforts within the school environment?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're integrated" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are communication protocols aligned with incident management protocols, resource allocation procedures, and decision-making frameworks to support effective coordination, information sharing, and situational awareness during emergencies?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>What mechanisms are in place to facilitate communication and collaboration with external agencies, such as emergency dispatch centers, law enforcement agencies, fire departments, or medical response teams, during emergency incidents?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the measures" />  
                    </div>
                </div>

                <h2>Redundancy and Backup Systems:</h2>
                <div className="form-section">
                    <label>Are redundancy measures and backup communication systems implemented to mitigate the risk of communication failures, network disruptions, or equipment malfunctions during emergencies?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the measures" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are redundant communication channels, alternative communication methods, or backup power sources utilized to ensure continuity of communication and information flow in the event of primary system failures or infrastructure damage?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the redundancy" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What provisions are in place to maintain communication resilience, restore functionality, and adapt communication strategies to changing conditions or evolving threats during prolonged emergency incidents?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the provisions" />  
                    </div>
                </div>

            </form>
        </main>
    </div>
  )
}

export default EmergencyCommunication2FormPage;