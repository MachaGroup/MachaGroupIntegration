import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function EmergencyCommunicationFormPage() {
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
            {/* 2.1.1.2 Communication Systems */}
            <h2>Communication Systems:</h2>
            <div className="form-section">
                <label>Are there dedicated communication systems in place for alerting authorities during emergencies?</label>
                <div>
                    <input type="radio" name="gates-operational" value="yes" /> Yes
                    <input type="radio" name="gates-operational" value="no" /> No    
                </div>
                <div>
                    <input type="text" name="auth-mechanisms" placeholder="List the communication systems" />
                </div>
            </div>

            <div className="form-section">
                <label>Do these systems include multiple channels such as telephone, radio, email, and text messaging?</label>
                <div>
                    <input type="radio" name="gates-operational" value="yes" /> Yes
                    <input type="radio" name="gates-operational" value="no" /> No
                </div>
            </div>

            <div className="form-section">
                <label>Are communication systems capable of reaching relevant authorities quickly and efficiently?</label>
                <div>
                    <input type="radio" name="gates-operational" value="yes" /> Yes
                    <input type="radio" name="gates-operational" value="no" /> No
                </div>
            </div>
            
            <h2>Emergency Contacts:</h2>
            <div className="form-section">
                <label>Have emergency contact lists been established for relevant authorities, including local law enforcement, fire department, and medical services?</label>
                <div>
                    <input type="radio" name="gates-operational" value="yes" /> Yes
                    <input type="radio" name="gates-operational" value="no" /> No
                </div>
            </div>

            <div className="form-section">
                <label>Are contact details regularly updated to ensure accuracy and reliability?</label>
                <div>
                    <input type="radio" name="gates-operational" value="yes" /> Yes
                    <input type="radio" name="gates-operational" value="no" /> No
                </div>
            </div>

            <div className="form-section">
                <label>Is there a designated point of contact responsible for initiating communication with authorities during emergencies?</label>
                <div>
                    <input type="radio" name="gates-operational" value="yes" /> Yes
                    <input type="radio" name="gates-operational" value="no" /> No
                </div>
            </div>

            <div className="form-section">
                <label>Is there a designated point of contact responsible for initiating communication with authorities during emergencies?</label>
                <div>
                    <input type="radio" name="gates-operational" value="yes" /> Yes
                    <input type="radio" name="gates-operational" value="no" /> No
                </div>
            </div>

            <h2>Notification Protocols:</h2>
            <div className="form-section">
                <label>Are there clear protocols in place for when and how to notify authorities during different types of emergencies?</label>
                <div>
                    <input type="radio" name="gates-operational" value="yes" /> Yes
                    <input type="radio" name="gates-operational" value="no" /> No    
                </div>
                <div>
                    <input type="text" name="auth-mechanisms" placeholder="Describe the protocols" />
                </div>
            </div>

            <div className="form-section">
                <label>Do staff members understand their roles and responsibilities in initiating communication with authorities?</label>
                <div>
                    <input type="radio" name="gates-operational" value="yes" /> Yes
                    <input type="radio" name="gates-operational" value="no" /> No
                </div>
            </div>

            <div className="form-section">
                <label>Is there a hierarchy or chain of command to follow for escalating emergency notifications as needed?</label>
                <div>
                    <input type="radio" name="gates-operational" value="yes" /> Yes
                    <input type="radio" name="gates-operational" value="no" /> No
                </div>
            </div>

            <div className="form-section">
                <label>Is there a hierarchy or chain of command to follow for escalating emergency notifications as needed?</label>
                <div>
                    <input type="radio" name="gates-operational" value="yes" /> Yes
                    <input type="radio" name="gates-operational" value="no" /> No
                </div>
            </div>

            <h2>Speed and Efficiency:</h2>
            <div className="form-section">
                <label>Is the process for alerting authorities designed to be swift and efficient, minimizing response times?</label>
                <div>
                    <input type="radio" name="gates-operational" value="yes" /> Yes
                    <input type="radio" name="gates-operational" value="no" /> No
                </div>
            </div>

            <div className="form-section">
                <label>Are communication systems tested regularly to ensure they are functioning properly and can deliver alerts promptly?</label>
                <div>
                    <input type="radio" name="gates-operational" value="yes" /> Yes
                    <input type="radio" name="gates-operational" value="no" /> No
                </div>
            </div>

            <div className="form-section">
                <label>Are there redundancies or backup systems in place to mitigate communication failures during emergencies?</label>
                <div>
                    <input type="radio" name="gates-operational" value="yes" /> Yes
                    <input type="radio" name="gates-operational" value="no" /> No
                </div>
                <div>
                    <input type="text" name="auth-mechanisms" placeholder="Describe the redundancies and backup systems" />
                </div>
            </div>

            <h2>Information Accuracy:</h2>
            <div className="form-section">
                <label>Are staff members trained to provide accurate and detailed information when alerting authorities?</label>
                <div>
                    <input type="radio" name="gates-operational" value="yes" /> Yes
                    <input type="radio" name="gates-operational" value="no" /> No
                </div>
            </div>

            <div className="form-section">
                <label>Do they know how to convey essential details such as the nature of the emergency, location, number of individuals affected, and any immediate hazards?</label>
                <div>
                    <input type="radio" name="gates-operational" value="yes" /> Yes
                    <input type="radio" name="gates-operational" value="no" /> No
                </div>
            </div>

            <div className="form-section">
                <label>Is there a mechanism for verifying information before it is communicated to authorities to prevent misinformation or confusion?</label>
                <div>
                    <input type="radio" name="gates-operational" value="yes" /> Yes
                    <input type="radio" name="gates-operational" value="no" /> No
                </div>
                <div>
                    <input type="text" name="auth-mechanisms" placeholder="Describe the mechanism for verifying information" />
                </div>
            </div>

            <h2>Coordination with Authorities:</h2>
            <div className="form-section">
                <label>Is there coordination and collaboration with authorities to establish communication protocols and ensure a rapid response to emergencies?</label>
                <div>
                    <input type="radio" name="gates-operational" value="yes" /> Yes
                    <input type="radio" name="gates-operational" value="no" /> No
                </div>
            </div>

            <div className="form-section">
                <label>Have contact points and procedures been established to facilitate communication between the organization and responding agencies?</label>
                <div>
                    <input type="radio" name="gates-operational" value="yes" /> Yes
                    <input type="radio" name="gates-operational" value="no" /> No
                </div>
                <div>
                    <input type="text" name="auth-mechanisms" placeholder="Describe the contact points and procedures" />
                </div>
            </div>

            <div className="form-section">
                <label>Are there regular meetings or exercises conducted with authorities to review and refine emergency communication processes?</label>
                <div>
                    <input type="radio" name="gates-operational" value="yes" /> Yes
                    <input type="radio" name="gates-operational" value="no" /> No
                </div>
            </div>

            <h2>Documentation and Review:</h2>
            <div className="form-section">
                <label>Are emergency communication procedures documented in written policies or protocols?</label>
                <div>
                    <input type="radio" name="gates-operational" value="yes" /> Yes
                    <input type="radio" name="gates-operational" value="no" /> No
                </div>
            </div>

            <div className="form-section">
                <label>Is there a process for reviewing and evaluating the effectiveness of emergency communication during drills or actual incidents?</label>
                <div>
                    <input type="radio" name="gates-operational" value="yes" /> Yes
                    <input type="radio" name="gates-operational" value="no" /> No
                </div>
                <div>
                    <input type="text" name="auth-mechanisms" placeholder="Describe the process" />
                </div>
            </div>

            <div className="form-section">
                <label>Are lessons learned from past emergencies used to improve communication procedures and response capabilities?</label>
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

export default EmergencyCommunicationFormPage;