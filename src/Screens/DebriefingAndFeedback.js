import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function DebriefingAndFeedbackFormPage() {
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
        <h1>Debriefing and Feedback Assessment</h1>
      </header>

        <main className="form-container">
            <form>
                {/* 2.3.1.2.4 Debriefing and Feedback */}
                <h2>Debriefing Process:</h2>
                <div className="form-section">
                    <label>Is there a structured process for conducting debriefing sessions after drills, including designated timeframes and locations?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the process" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are debriefing sessions facilitated by trained personnel, such as safety officers or drill coordinators, to ensure effectiveness and objectivity?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are all relevant stakeholders, including staff members, occupants, and management personnel, invited to participate in debriefing sessions?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Review Objectives:</h2>
                <div className="form-section">
                    <label>Are clear objectives established for debriefing sessions, such as assessing performance, identifying strengths and areas for improvement, and capturing lessons learned?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the sessions" />  
                    </div>
                </div>
                
                <div className="form-section">
                    <label>Are debriefing sessions focused on achieving specific outcomes, such as enhancing preparedness, refining procedures, or addressing deficiencies identified during drills?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Participant Engagement:</h2>
                <div className="form-section">
                    <label>Are participants encouraged to actively contribute to debriefing sessions by sharing their observations, experiences, and feedback?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Is feedback solicited from participants on various aspects of drill execution, including communication, coordination, procedures, and individual performance?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are facilitators skilled in promoting open communication and constructive dialogue among participants during debriefing sessions?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Documentation of Observations:</h2>
                <div className="form-section">
                    <label>Are detailed notes or records maintained during debriefing sessions to capture key observations, insights, and recommendations?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are observations documented in a structured format to facilitate analysis, follow-up actions, and integration into future planning and training efforts?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are records of debriefing sessions accessible to relevant stakeholders for reference and review?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Action Item Identification:</h2>
                <div className="form-section">
                    <label>Are actionable items identified during debriefing sessions to address deficiencies, capitalize on strengths, and implement improvements identified during drills?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are action items prioritized based on their urgency, impact on safety, and feasibility of implementation?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are responsible parties assigned to each action item, along with target completion dates and follow-up mechanisms to track progress?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Follow-Up and Implementation:</h2>
                <div className="form-section">
                    <label>Is there a process for tracking the implementation of action items resulting from debriefing sessions?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the process" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are responsible parties held accountable for completing assigned action items within established timelines?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are progress updates provided to stakeholders on the status of action item implementation, including any challenges encountered and lessons learned?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Continuous Improvement:</h2>
                <div className="form-section">
                    <label>Are recommendations from debriefing sessions used to drive continuous improvement in emergency preparedness and response capabilities?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are debriefing sessions integrated into a broader feedback loop to ensure that lessons learned from drills are incorporated into training, planning, and policy development?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are opportunities sought to share insights and best practices identified during debriefing sessions with relevant stakeholders across the organization?</label>
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

export default DebriefingAndFeedbackFormPage;