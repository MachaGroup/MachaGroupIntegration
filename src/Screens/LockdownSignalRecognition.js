import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function LockdownSignalRecognitionFormPage() {
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
            <h1>Lockdown Signal Recognition Assessment</h1>
        </header>

        <main className="form-container">
            <form>
                {/* 2.3.1.1.5 Lockdown Signal Recognition */}
                <h2>Signal Identification:</h2>
                <div className="form-section">
                    <label>Are occupants trained to recognize the specific signals or alerts used to indicate a lockdown drill?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are these signals clearly distinct from other emergency signals or alarms used within the facility?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there a standardized method for signaling the start and end of lockdown drills to minimize confusion?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the method" />  
                    </div>
                </div>

                <h2>Communication Protocols:</h2>
                <div className="form-section">
                    <label>Are communication protocols established to inform occupants and staff members about upcoming lockdown drills?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Do these protocols include advance notice of drill schedules and procedures to prevent misunderstandings?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there a system in place for disseminating information about drill signals through multiple channels, such as emails, announcements, or signage?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the system" />  
                    </div>
                </div>

                <h2>Training and Education:</h2>
                <div className="form-section">
                    <label>Are occupants and staff members educated on the importance of distinguishing between drill signals and real threats?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are training materials provided to clarify the differences in response actions between drills and actual emergencies?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are drills used as opportunities to reinforce signal recognition skills and practice appropriate responses?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Simulation Realism:</h2>
                <div className="form-section">
                    <label>Are efforts made to simulate realistic scenarios during lockdown drills, including the use of authentic signals and procedures?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are drills designed to mimic the conditions and challenges that occupants may encounter during real lockdown situations?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are feedback mechanisms in place to assess the effectiveness of drill simulations in promoting signal recognition?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the feedback mechanisms" />  
                    </div>
                </div>

                <h2>Evaluation and Feedback:</h2>
                <div className="form-section">
                    <label>Is feedback gathered from occupants and staff members after each lockdown drill to assess signal recognition performance?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are debriefing sessions conducted to discuss any confusion or errors in identifying drill signals and provide corrective guidance?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are recommendations from feedback and evaluations used to improve signal recognition training and procedures?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Drill Variability:</h2>
                <div className="form-section">
                    <label>Are lockdown drills conducted under varying conditions to test occupants' ability to recognize signals in different contexts?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are drills designed to challenge occupants with unexpected changes or complexities to assess their adaptability and response capabilities?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are deviations from standard drill procedures introduced occasionally to gauge occupants' alertness and readiness?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Documentation and Review:</h2>
                <div className="form-section">
                    <label>Are records maintained to document the execution and outcomes of lockdown drills, including observations related to signal recognition?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are drill records reviewed periodically to identify trends or recurring issues in signal recognition performance?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are corrective actions implemented based on review findings to address deficiencies and enhance signal recognition effectiveness?</label>
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

export default LockdownSignalRecognitionFormPage;