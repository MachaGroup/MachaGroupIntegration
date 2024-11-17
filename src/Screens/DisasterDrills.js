import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function DisasterDrillsFormPage() {
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
            <h1>Disaster Drills Assessment</h1>
        </header>

        <main className="form-container">
            <form>
                {/* 2.2.1.3.1 Disaster Drills */}
                <h2>Drill Frequency:</h2>
                <div className="form-section">
                    <label>How often are disaster drills conducted within the facility?</label>
                    <div>
                        <input type="text" name="auth-mechanisms" placeholder="How often are they constructed" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are drills scheduled regularly to ensure all occupants are familiar with emergency procedures?</label>
                    <div>
                        <input type="radio" name="gates-smooth" value="yes" /> Yes
                        <input type="radio" name="gates-smooth" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are different types of disaster drills (e.g., tornado, earthquake, fire) rotated throughout the year?</label>
                    <div>
                        <input type="radio" name="gates-smooth" value="yes" /> Yes
                        <input type="radio" name="gates-smooth" value="no" /> No
                    </div>
                </div>

                <h2>Scenario Variety:</h2>
                <div className="form-section">
                    <label>Do disaster drills cover a variety of natural disaster scenarios that are relevant to the facility's geographical location and risk profile?</label>
                    <div>
                        <input type="radio" name="gates-smooth" value="yes" /> Yes
                        <input type="radio" name="gates-smooth" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are drills tailored to simulate realistic scenarios, including variations in severity and impact?</label>
                    <div>
                        <input type="radio" name="gates-smooth" value="yes" /> Yes
                        <input type="radio" name="gates-smooth" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are lessons learned from past incidents or drills used to inform future drill scenarios?</label>
                    <div>
                        <input type="radio" name="gates-smooth" value="yes" /> Yes
                        <input type="radio" name="gates-smooth" value="no" /> No
                    </div>
                </div>

                <h2>Participant Engagement:</h2>
                <div className="form-section">
                    <label>Are all occupants, including staff members, students, visitors, and contractors, actively involved in disaster drills?</label>
                    <div>
                        <input type="radio" name="gates-smooth" value="yes" /> Yes
                        <input type="radio" name="gates-smooth" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Do drills engage participants in practicing specific actions and responses, such as evacuation, sheltering, or emergency communication?</label>
                    <div>
                        <input type="radio" name="gates-smooth" value="yes" /> Yes
                        <input type="radio" name="gates-smooth" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are designated individuals assigned roles and responsibilities during drills to facilitate coordination and leadership?</label>
                    <div>
                        <input type="radio" name="gates-smooth" value="yes" /> Yes
                        <input type="radio" name="gates-smooth" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="auth-mechanisms" placeholder="List individuals and assigned roles" />  
                    </div>
                </div>

                <h2>Evacuation Procedures:</h2>
                <div className="form-section">
                    <label>Are evacuation procedures clearly communicated and practiced during disaster drills?</label>
                    <div>
                        <input type="radio" name="gates-smooth" value="yes" /> Yes
                        <input type="radio" name="gates-smooth" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are evacuation routes identified, marked, and regularly reviewed for safety and accessibility?</label>
                    <div>
                        <input type="radio" name="gates-smooth" value="yes" /> Yes
                        <input type="radio" name="gates-smooth" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are drills conducted to assess the effectiveness of evacuation procedures under various conditions, such as different times of day or occupancy levels?</label>
                    <div>
                        <input type="radio" name="gates-smooth" value="yes" /> Yes
                        <input type="radio" name="gates-smooth" value="no" /> No
                    </div>
                </div>

                <h2>Sheltering Protocols:</h2>
                <div className="form-section">
                    <label>Are sheltering procedures established for scenarios where evacuation may not be feasible or safe, such as during severe weather events?</label>
                    <div>
                        <input type="radio" name="gates-smooth" value="yes" /> Yes
                        <input type="radio" name="gates-smooth" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="auth-mechanisms" placeholder="Describe the procedures" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are designated shelter areas identified and equipped with necessary supplies and resources to support occupants during emergencies?</label>
                    <div>
                        <input type="radio" name="gates-smooth" value="yes" /> Yes
                        <input type="radio" name="gates-smooth" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="auth-mechanisms" placeholder="Describe the shelter areas" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are drills conducted to practice sheltering procedures and assess the suitability of designated shelter areas?</label>
                    <div>
                        <input type="radio" name="gates-smooth" value="yes" /> Yes
                        <input type="radio" name="gates-smooth" value="no" /> No
                    </div>
                </div>

                <h2>Communication and Notification:</h2>
                <div className="form-section">
                    <label>Is there a protocol for initiating and communicating disaster drills to all occupants?</label>
                    <div>
                        <input type="radio" name="gates-smooth" value="yes" /> Yes
                        <input type="radio" name="gates-smooth" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="auth-mechanisms" placeholder="Describe the protocol" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are communication systems, such as public address systems or emergency notifications, tested during drills?</label>
                    <div>
                        <input type="radio" name="gates-smooth" value="yes" /> Yes
                        <input type="radio" name="gates-smooth" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are drills used as opportunities to practice communication and coordination with external emergency responders or authorities?</label>
                    <div>
                        <input type="radio" name="gates-smooth" value="yes" /> Yes
                        <input type="radio" name="gates-smooth" value="no" /> No
                    </div>
                </div>

                <h2>Evaluation and Improvement:</h2>
                <div className="form-section">
                    <label>Is there a process for evaluating the effectiveness of disaster drills and identifying areas for improvement?</label>
                    <div>
                        <input type="radio" name="gates-smooth" value="yes" /> Yes
                        <input type="radio" name="gates-smooth" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="auth-mechanisms" placeholder="Describe the process" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are feedback mechanisms in place to gather input from participants and observers on drill performance?</label>
                    <div>
                        <input type="radio" name="gates-smooth" value="yes" /> Yes
                        <input type="radio" name="gates-smooth" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="auth-mechanisms" placeholder="Describe the feedback mechanisms" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are drill outcomes used to update and refine natural disaster plans, procedures, and training materials?</label>
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

export default DisasterDrillsFormPage;