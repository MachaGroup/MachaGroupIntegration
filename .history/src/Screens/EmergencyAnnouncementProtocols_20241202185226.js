import logo from '../assets/MachaLogo.png';
import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS
import Navbar from "./Navbar"; // Import the Navbar

function EmergencyAnnouncementProtocolsFormPage() {
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
            <h1>Emergency Announcement Protocols Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form>
                {/* 2.4.1.1.2 Emergency Announcement Protocols */}
                <h2>Standardized Message Templates:</h2>
                <div className="form-section">
                    <label>Are standardized message templates developed for various types of emergencies, such as lockdowns, evacuations, severe weather, or medical emergencies?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Do these templates include essential information, such as the nature of the emergency, specific actions to take, and any additional instructions or precautions?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Clear and Concise Communication:</h2>
                <div className="form-section">
                    <label>Are emergency announcements scripted to convey information in a clear, concise, and easily understandable manner?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Do scripts avoid technical jargon or ambiguous language that could cause confusion or misunderstanding during emergencies?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are announcements tailored to the intended audience, considering factors such as age, language proficiency, and cognitive ability?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Message Content and Structure:</h2>
                <div className="form-section">
                    <label>Do scripted messages follow a structured format that includes key elements such as the type of emergency, location or affected area, recommended actions, and any follow-up instructions?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are messages designed to provide actionable guidance to occupants, helping them make informed decisions and respond effectively to the emergency situation?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Consistency and Accuracy:</h2>
                <div className="form-section">
                    <label>Are emergency announcement scripts reviewed and approved by appropriate authorities, such as safety officers, emergency management personnel, or legal advisors?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there a process for ensuring consistency and accuracy in scripted messages, including periodic updates to reflect changes in procedures, regulations, or best practices?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the process" />  
                    </div>
                </div>

                <h2>Training and Familiarization:</h2>
                <div className="form-section">
                    <label>Are individuals responsible for delivering emergency announcements trained on the use of scripted messages and communication protocols?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Do training programs include practice sessions to familiarize operators with different types of emergencies and associated message templates?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are operators provided with resources, such as cue cards or reference guides, to assist them in delivering scripted messages accurately and confidently?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>
                
                <h2>Adaptability and Flexibility:</h2>
                <div className="form-section">
                    <label>Are scripted messages adaptable to accommodate variations in emergency scenarios, such as the scale, severity, or duration of the event?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there flexibility built into message templates to allow for real-time updates or modifications based on evolving circumstances or new information?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Evaluation and Feedback:</h2>
                <div className="form-section">
                    <label>Are scripted messages evaluated for their effectiveness in conveying critical information and guiding appropriate responses during drills and actual emergencies?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Is feedback solicited from occupants and stakeholders to assess the clarity, comprehensibility, and usefulness of scripted messages?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are recommendations from evaluations used to refine scripted messages and improve their efficacy in future emergency situations?</label>
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

export default EmergencyAnnouncementProtocolsFormPage;