import logo from '../assets/MachaLogo.png';
import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS
import Navbar from "./Navbar";

function AlertActivationProceduresFormPage() {
  const navigate = useNavigate();  // Initialize useNavigate hook for navigation

  // Function to handle back button
  const handleBack = () => {
    navigate(-1);  // Navigates to the previous page
  };

  return (
    <div className="form-page">
        <header className="header">
            <Navbar />
            {/* Back Button */}
        <button className="back-button" onClick={handleBack}>←</button> {/* Back button at the top */}
            <h1>Alert Activation Procedures Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form>
                {/* 2.4.1.1.5 Training and Skills */}
                <h2>Designated Staff Responsibilities:</h2>
                <div className="form-section">
                    <label>Are specific individuals or roles designated as responsible for activating text/email alerts during emergencies?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="List the individuals" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there clarity regarding the duties and authority of these designated staff members in initiating alert activations?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Chain of Command and Authority:</h2>
                <div className="form-section">
                    <label>Is there a defined chain of command for alert activations, outlining the hierarchy of decision-making and authorization levels?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are procedures established for delegating alert activation responsibilities in the event that designated staff members are unavailable or incapacitated?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the procedures" />  
                    </div>
                </div>

                <h2>Activation Criteria and Triggers:</h2>
                <div className="form-section">
                    <label>Are criteria established for determining when text/email alerts should be activated during emergencies, based on predefined triggers or thresholds?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the criteria" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Do activation criteria consider factors such as the severity, immediacy, and scope of the emergency, as well as the potential impact on occupants and stakeholders?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Communication Protocols:</h2>
                <div className="form-section">
                    <label>Are communication protocols established to facilitate coordination and collaboration among designated staff members responsible for alert activations?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the communication protocols" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there a designated method or channel for communicating alert activation decisions, ensuring timely dissemination of instructions and updates?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the designated" />  
                    </div>
                </div>

                <h2>Training and Familiarization:</h2>
                <div className="form-section">
                    <label>Are individuals responsible for activating text/email alerts trained on alert activation procedures, including their roles, responsibilities, and the use of alerting systems?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Do training programs include practice exercises or simulations to familiarize staff members with alert activation protocols and decision-making processes?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Documentation and Reporting:</h2>
                <div className="form-section">
                    <label>Are records maintained to document alert activation procedures, including details of activations, decisions made, and any follow-up actions taken?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there a process for reporting alert activations to relevant stakeholders, management personnel, and regulatory authorities as necessary?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the process" />  
                    </div>
                </div>

                <h2>Testing and Drills:</h2>
                <div className="form-section">
                    <label>Are alert activation procedures tested and evaluated regularly through drills and exercises to assess their effectiveness and readiness?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are feedback mechanisms in place to capture observations, insights, and lessons learned from alert activation drills, with recommendations for improvement implemented as appropriate?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the feedback mechanisms" />  
                    </div>
                </div>

                <h2>Continuous Improvement:</h2>
                <div className="form-section">
                    <label>Are alert activation procedures reviewed and updated periodically to incorporate lessons learned from real-world incidents, drills, and changes in organizational structure or technology?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there a culture of continuous improvement, where feedback from stakeholders and staff members is solicited and used to enhance alert activation protocols over time?</label>
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

export default AlertActivationProceduresFormPage;