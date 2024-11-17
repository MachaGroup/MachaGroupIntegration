import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function TornadoDrillsFormPage() {
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
            <h1>Tornado Drills Assessment</h1>
        </header>

        <main className="form-container">
            <form>
                {/* 2.3.1.1.1 Tornado Drills */}
                <h2>Drill Frequency:</h2>
                <div className="form-section">
                    <label>How often are tornado drills conducted within the facility?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="How often" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are tornado drills scheduled regularly to ensure all occupants are familiar with tornado procedures?</label>
                    <div>
                        <input type="radio" name="gates-smooth" value="yes" /> Yes
                        <input type="radio" name="gates-smooth" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are drills conducted at different times of the day to account for varying occupancy levels and staff shifts?</label>
                    <div>
                        <input type="radio" name="gates-smooth" value="yes" /> Yes
                        <input type="radio" name="gates-smooth" value="no" /> No
                    </div>
                </div>

                <h2>Notification Procedures:</h2>
                <div className="form-section">
                    <label>Is there a protocol for initiating tornado drills, including how and when occupants are notified?</label>
                    <div>
                        <input type="radio" name="gates-smooth" value="yes" /> Yes
                        <input type="radio" name="gates-smooth" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the protocol" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are notification methods tested during drills to ensure timely dissemination of tornado warnings?</label>
                    <div>
                        <input type="radio" name="gates-smooth" value="yes" /> Yes
                        <input type="radio" name="gates-smooth" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the notification methods" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there a system in place to account for individuals who may not be present during scheduled drills?</label>
                    <div>
                        <input type="radio" name="gates-smooth" value="yes" /> Yes
                        <input type="radio" name="gates-smooth" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the system" />  
                    </div>
                </div>

                <h2>Drill Procedures:</h2>
                <div className="form-section">
                    <label>Are tornado drill procedures clearly defined and communicated to all occupants?</label>
                    <div>
                        <input type="radio" name="gates-smooth" value="yes" /> Yes
                        <input type="radio" name="gates-smooth" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Do drills include specific actions to be taken by occupants, such as seeking shelter in designated areas or following evacuation routes?</label>
                    <div>
                        <input type="radio" name="gates-smooth" value="yes" /> Yes
                        <input type="radio" name="gates-smooth" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are drills conducted to simulate different scenarios, such as daytime vs. nighttime, or varying severity levels of tornadoes?</label>
                    <div>
                        <input type="radio" name="gates-smooth" value="yes" /> Yes
                        <input type="radio" name="gates-smooth" value="no" /> No
                    </div>
                </div>

                <h2>Sheltering and Evacuation:</h2>
                <div className="form-section">
                    <label>Are designated tornado shelter areas identified and clearly marked throughout the facility?</label>
                    <div>
                        <input type="radio" name="gates-smooth" value="yes" /> Yes
                        <input type="radio" name="gates-smooth" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Do occupants know how to access shelter areas quickly and safely during tornado drills?</label>
                    <div>
                        <input type="radio" name="gates-smooth" value="yes" /> Yes
                        <input type="radio" name="gates-smooth" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there alternative sheltering options available for individuals with mobility limitations or disabilities?</label>
                    <div>
                        <input type="radio" name="gates-smooth" value="yes" /> Yes
                        <input type="radio" name="gates-smooth" value="no" /> No
                    </div>
                </div>

                <h2>Accountability and Monitoring:</h2>
                <div className="form-section">
                    <label>Is there a process for accounting for all occupants during tornado drills?</label>
                    <div>
                        <input type="radio" name="gates-smooth" value="yes" /> Yes
                        <input type="radio" name="gates-smooth" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the process" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are staff members assigned roles and responsibilities to assist with accountability and monitoring efforts?</label>
                    <div>
                        <input type="radio" name="gates-smooth" value="yes" /> Yes
                        <input type="radio" name="gates-smooth" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Is feedback gathered from participants after drills to identify any issues or concerns with procedures?</label>
                    <div>
                        <input type="radio" name="gates-smooth" value="yes" /> Yes
                        <input type="radio" name="gates-smooth" value="no" /> No
                    </div>
                </div>

                <h2>Evaluation and Improvement:</h2>
                <div className="form-section">
                    <label>Is there a mechanism for evaluating the effectiveness of tornado drills and identifying areas for improvement?</label>
                    <div>
                        <input type="radio" name="gates-smooth" value="yes" /> Yes
                        <input type="radio" name="gates-smooth" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the mechanism" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are debriefing sessions held after drills to review performance and discuss lessons learned?</label>
                    <div>
                        <input type="radio" name="gates-smooth" value="yes" /> Yes
                        <input type="radio" name="gates-smooth" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are recommendations from drill evaluations implemented to enhance tornado preparedness and response procedures?</label>
                    <div>
                        <input type="radio" name="gates-smooth" value="yes" /> Yes
                        <input type="radio" name="gates-smooth" value="no" /> No
                    </div>
                </div>

                <h2>Documentation and Records:</h2>
                <div className="form-section">
                    <label>Are records maintained for all tornado drills, including dates, times, participants, and observations?</label>
                    <div>
                        <input type="radio" name="gates-smooth" value="yes" /> Yes
                        <input type="radio" name="gates-smooth" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are drill records reviewed periodically to ensure compliance with regulations and identify trends or patterns?</label>
                    <div>
                        <input type="radio" name="gates-smooth" value="yes" /> Yes
                        <input type="radio" name="gates-smooth" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are deficiencies or issues identified during drills documented, with corrective actions implemented as needed?</label>
                    <div>
                        <input type="radio" name="gates-smooth" value="yes" /> Yes
                        <input type="radio" name="gates-smooth" value="no" /> No
                    </div>
                </div>

            </form>
        </main>
    </div>
  )
}

export default TornadoDrillsFormPage;