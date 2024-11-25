import logo from '../assets/MachaLogo.png';
import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function IntegrationWithParentCommunicationFormPage() {
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
            <h1>Integration with Parent Communication Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form>
                {/* 2.4.1.1.6 Integration with Parent Communication */}
                <h2>Existence of Integration Mechanisms:</h2>
                <div className="form-section">
                    <label>Is there a mechanism in place to integrate text/email alerts with parent communication systems to facilitate automatic notifications during emergencies?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the mechanism" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there established protocols or interfaces for connecting the alerting system with parent communication platforms or databases?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the protocols" />  
                    </div>
                </div>

                <h2>Automatic Notification Configuration:</h2>
                <div className="form-section">
                    <label>Are automatic notification configurations set up to ensure that parent contact information is automatically included in text/email alerts during emergencies?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are procedures established for syncing or updating parent contact details between the alerting system and parent communication databases?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the procedures" />  
                    </div>
                </div>

                <h2>Consent and Opt-In/Opt-Out:</h2>
                <div className="form-section">
                    <label>Are parents provided with opportunities to opt in or opt out of receiving text/email alerts, and are their preferences documented and respected?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there a process for obtaining consent from parents for the inclusion of their contact information in emergency notifications?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the process" />  
                    </div>
                </div>

                <h2>Data Security and Privacy:</h2>
                <div className="form-section">
                    <label>Are appropriate measures implemented to safeguard the security and privacy of parent contact information stored or transmitted through the alerting system?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Do integration mechanisms comply with relevant privacy regulations and organizational policies governing the handling of sensitive data?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Communication Protocols:</h2>
                <div className="form-section">
                    <label>Are communication protocols established to facilitate coordination between school authorities and parents during emergency situations?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the communication protocols" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there a designated method or channel for communicating with parents, providing updates, and addressing concerns or inquiries?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the designated method" />  
                    </div>
                </div>

                <h2>Training and Awareness:</h2>
                <div className="form-section">
                    <label>Are parents informed about the integration of text/email alerts with parent communication systems and the procedures for receiving emergency notifications?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are resources or educational materials provided to help parents understand how to opt in or opt out of receiving alerts and how to update their contact information?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Feedback and Evaluation:</h2>
                <div className="form-section">
                    <label>Are feedback mechanisms in place to solicit input from parents regarding the effectiveness and usefulness of text/email alerts during emergencies?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the feedback mechanisms" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Is parent feedback used to evaluate and improve the integration of alerting systems with parent communication platforms over time?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Testing and Verification:</h2>
                <div className="form-section">
                    <label>Are integration mechanisms tested and verified periodically to ensure that parent contact information is accurately included in text/email alerts and that notifications are delivered as intended?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are test scenarios conducted to simulate emergency situations and assess the reliability and responsiveness of the integrated alerting system?</label>
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

export default IntegrationWithParentCommunicationFormPage;