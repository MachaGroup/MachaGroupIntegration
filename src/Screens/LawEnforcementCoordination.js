import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function LawEnforcementCoordinationFormPage() {
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
            <h1>Conflict Resolution Assessment</h1>
        </header>

        <main className="form-container">
            <form>
                {/* 2.2.1.2.3 Law Enforcement Coordination */}
                <h2>Communication Channels:</h2>
                <div className="form-section">
                    <label>Are there established communication channels between the facility and local law enforcement agencies?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="auth-mechanisms" placeholder="Describe the channels" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there designated points of contact within the facility and law enforcement for emergency coordination?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are communication protocols documented and readily accessible to relevant personnel?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="auth-mechanisms" placeholder="Describe the communication protocols" />  
                    </div>
                </div>

                <h2>Emergency Notification Procedures:</h2>
                <div className="form-section">
                    <label>Is there a protocol in place for notifying law enforcement agencies in the event of emergencies?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="auth-mechanisms" placeholder="Describe the protocols" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there predefined methods for contacting law enforcement, such as phone calls, emails, or dedicated emergency lines?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="auth-mechanisms" placeholder="Describe the methods" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are staff members trained on when and how to initiate contact with law enforcement and what information to provide?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Response Time Expectations:</h2>
                <div className="form-section">
                    <label>Are response time expectations clearly defined and communicated to law enforcement agencies?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Have response time benchmarks been established based on the facility's location, size, and potential risks?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there a mechanism for tracking and evaluating law enforcement response times during emergencies?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Collaborative Planning:</h2>
                <div className="form-section">
                    <label>Are there regular meetings or exercises conducted with law enforcement agencies to review emergency response plans and coordination procedures?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Do tabletop exercises or simulations involve law enforcement agencies to test coordination and communication during various emergency scenarios?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are feedback and lessons learned from joint exercises used to improve coordination and response capabilities?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Information Sharing:</h2>
                <div className="form-section">
                    <label>Is there a protocol for sharing relevant information with law enforcement agencies during emergencies?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="auth-mechanisms" placeholder="Describe the protocol" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are staff members trained to provide accurate and timely information to law enforcement responders?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there a secure method for sharing sensitive or confidential information with law enforcement agencies, if necessary?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="auth-mechanisms" placeholder="Describe the method" />  
                    </div>
                </div>

                <h2>Mutual Aid Agreements:</h2>
                <div className="form-section">
                    <label>Does the facility have mutual aid agreements or partnerships with neighboring law enforcement agencies?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are mutual aid agreements documented and reviewed periodically to ensure they align with current needs and resources?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there a process for activating mutual aid support from other agencies during large-scale emergencies or resource-intensive incidents?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="auth-mechanisms" placeholder="Describe the process" />  
                    </div>
                </div>

                <h2>Post-Incident Debriefing:</h2>
                <div className="form-section">
                    <label>Are debriefing sessions conducted after emergency incidents to review the effectiveness of law enforcement coordination and response?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are representatives from law enforcement agencies involved in post-incident debriefings to provide feedback and insights?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are recommendations from debriefing sessions implemented to improve coordination and response procedures for future incidents?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

            </form>
        </main>
    </div>
  )
}

export default LawEnforcementCoordinationFormPage;