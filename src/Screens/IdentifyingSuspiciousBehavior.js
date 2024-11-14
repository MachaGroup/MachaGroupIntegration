import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function IdentifyingSuspiciousBehaviorFormPage() {
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
            <h1>Identifying Suspicious Behavior Assessment</h1>
        </header>

        <main className="form-container">
            <form>
                {/* 3.4.2.1.1 Identifying Suspicious Behavior */}
                <h2>Understanding of Suspicious Behaviors:</h2>
                <div className="form-section">
                    <label>Are staff members trained to recognize and identify indicators of suspicious behavior, unusual activity, or potential threats within the school environment?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>What specific behaviors or actions are emphasized during training as potential warning signs of security concerns, such as aggression, hostility, erratic movements, or attempts to conceal weapons or contraband?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the behaviors/actions" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are staff members educated on the importance of maintaining vigilance, situational awareness, and proactive observation to detect and report suspicious incidents promptly?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're educated" />  
                    </div>
                </div>

                <h2>Reporting Procedures:</h2>
                <div className="form-section">
                    <label>Are clear reporting procedures established and communicated to staff members for documenting and reporting observations of suspicious behavior or security-related concerns?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are staff members trained to initiate timely and appropriate responses, such as notifying school administrators, security personnel, or law enforcement authorities, when encountering suspicious individuals or activities?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're trained" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What measures are in place to ensure confidentiality, anonymity, and protection from retaliation for staff members who report security-related incidents or raise concerns about potential threats?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the measures" />  
                    </div>
                </div>

                <h2>Communication and Collaboration:</h2>
                <div className="form-section">
                    <label>How are staff members encouraged to communicate and collaborate with colleagues, security personnel, and other stakeholders to share information, insights, and observations related to security threats or suspicious behavior?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're encouraged" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are mechanisms in place to facilitate information sharing, debriefings, or post-incident discussions among staff members to analyze and learn from past experiences, identify emerging trends, and enhance threat recognition capabilities?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the mechanisms" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What protocols are followed to coordinate threat assessment efforts, validate reported concerns, and determine appropriate follow-up actions or interventions based on the severity and credibility of identified threats?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the protocols" />  
                    </div>
                </div>

                <h2>Scenario-based Training:</h2>
                <div className="form-section">
                    <label>Are staff members provided with scenario-based training exercises, simulations, or case studies to practice identifying and responding to various types of security threats or suspicious situations?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How do scenario-based training sessions simulate realistic scenarios, challenge decision-making abilities, and test staff members' capacity to assess threats, evaluate risks, and implement appropriate security measures?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they simulate" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What feedback mechanisms are utilized to evaluate staff members' performance during scenario-based training exercises, reinforce key concepts, and address areas for improvement in threat recognition and response skills?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the mechanisms" />  
                    </div>
                </div>

                <h2>Cultural Sensitivity and Bias Awareness:</h2>
                <div className="form-section">
                    <label>Are staff members trained to recognize potential biases, stereotypes, or cultural factors that may influence their perceptions of suspicious behavior or threat indicators?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the mechanisms" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How do training programs promote cultural sensitivity, inclusivity, and equity in threat assessment practices, ensuring that staff members avoid making assumptions based on race, ethnicity, religion, or other personal characteristics?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they promote these" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What strategies are implemented to foster open dialogue, mutual respect, and trust among staff members, students, and community members, enhancing the effectiveness of threat recognition efforts and promoting a safe and supportive school environment for all?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the strategies" />  
                    </div>
                </div>

            </form>
        </main>
    </div>
  )
}

export default IdentifyingSuspiciousBehaviorFormPage;
import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function IdentifyingSuspiciousBehaviorFormPage() {
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
            <h1>Identifying Suspicious Behavior Assessment</h1>
        </header>

        <main className="form-container">
            <form>
                {/* 3.4.2.1.1 Identifying Suspicious Behavior */}
                <h2>Understanding of Suspicious Behaviors:</h2>
                <div className="form-section">
                    <label>Are staff members trained to recognize and identify indicators of suspicious behavior, unusual activity, or potential threats within the school environment?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>What specific behaviors or actions are emphasized during training as potential warning signs of security concerns, such as aggression, hostility, erratic movements, or attempts to conceal weapons or contraband?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the behaviors/actions" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are staff members educated on the importance of maintaining vigilance, situational awareness, and proactive observation to detect and report suspicious incidents promptly?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're educated" />  
                    </div>
                </div>

                <h2>Reporting Procedures:</h2>
                <div className="form-section">
                    <label>Are clear reporting procedures established and communicated to staff members for documenting and reporting observations of suspicious behavior or security-related concerns?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are staff members trained to initiate timely and appropriate responses, such as notifying school administrators, security personnel, or law enforcement authorities, when encountering suspicious individuals or activities?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're trained" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What measures are in place to ensure confidentiality, anonymity, and protection from retaliation for staff members who report security-related incidents or raise concerns about potential threats?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the measures" />  
                    </div>
                </div>

                <h2>Communication and Collaboration:</h2>
                <div className="form-section">
                    <label>How are staff members encouraged to communicate and collaborate with colleagues, security personnel, and other stakeholders to share information, insights, and observations related to security threats or suspicious behavior?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're encouraged" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are mechanisms in place to facilitate information sharing, debriefings, or post-incident discussions among staff members to analyze and learn from past experiences, identify emerging trends, and enhance threat recognition capabilities?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the mechanisms" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What protocols are followed to coordinate threat assessment efforts, validate reported concerns, and determine appropriate follow-up actions or interventions based on the severity and credibility of identified threats?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the protocols" />  
                    </div>
                </div>

                <h2>Scenario-based Training:</h2>
                <div className="form-section">
                    <label>Are staff members provided with scenario-based training exercises, simulations, or case studies to practice identifying and responding to various types of security threats or suspicious situations?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How do scenario-based training sessions simulate realistic scenarios, challenge decision-making abilities, and test staff members' capacity to assess threats, evaluate risks, and implement appropriate security measures?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they simulate" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What feedback mechanisms are utilized to evaluate staff members' performance during scenario-based training exercises, reinforce key concepts, and address areas for improvement in threat recognition and response skills?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the mechanisms" />  
                    </div>
                </div>

                <h2>Cultural Sensitivity and Bias Awareness:</h2>
                <div className="form-section">
                    <label>Are staff members trained to recognize potential biases, stereotypes, or cultural factors that may influence their perceptions of suspicious behavior or threat indicators?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the mechanisms" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How do training programs promote cultural sensitivity, inclusivity, and equity in threat assessment practices, ensuring that staff members avoid making assumptions based on race, ethnicity, religion, or other personal characteristics?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they promote these" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What strategies are implemented to foster open dialogue, mutual respect, and trust among staff members, students, and community members, enhancing the effectiveness of threat recognition efforts and promoting a safe and supportive school environment for all?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the strategies" />  
                    </div>
                </div>

            </form>
        </main>
    </div>
  )
}

export default IdentifyingSuspiciousBehaviorFormPage;