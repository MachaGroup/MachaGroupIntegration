import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function PhishingAwareness2FormPage() {
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
            <h1>Phishing Awareness Assessment</h1>
        </header>

        <main className="form-container">
            <form>
                {/* 3.4.2.2.1 Phishing Awareness */}
                <h2>Recognizing Phishing Attempts:</h2>
                <div className="form-section">
                    <label>Are staff members trained to recognize common indicators of phishing attempts, such as unsolicited emails requesting sensitive information, urgent requests for account credentials, or messages containing suspicious links or attachments?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>
                
                <div className="form-section">
                    <label>What specific characteristics or red flags are emphasized during training as potential signs of phishing, such as misspelled or unfamiliar sender addresses, generic greetings, grammatical errors, or requests for confidential data?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the characteristics/red flags" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are staff members educated on the importance of exercising caution and skepticism when interacting with email messages, especially those prompting them to disclose personal information or take immediate action without verification?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're educated" />  
                    </div>
                </div>
                
                <h2>Response Protocols and Procedures:</h2>
                <div className="form-section">
                    <label>Are clear response protocols and procedures established for staff members to follow in the event of encountering a suspected phishing email or cyber threat, including steps to report the incident, mitigate risks, and safeguard sensitive information?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the protocols/procedures" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are staff members trained to respond effectively to phishing attempts, such as refraining from clicking on suspicious links or attachments, verifying the authenticity of sender identities, and forwarding suspicious emails to designated IT or security personnel for analysis?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're trained" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What measures are in place to ensure that staff members understand their roles and responsibilities in preventing, detecting, and responding to phishing attacks, including the escalation of incidents to appropriate authorities for further investigation and remediation?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the measures" />  
                    </div>
                </div>

                <h2>Phishing Simulation Exercises:</h2>
                <div className="form-section">
                    <label>Are staff members provided with opportunities to participate in simulated phishing exercises or awareness campaigns designed to mimic real-world phishing scenarios and test their ability to recognize and respond to phishing threats?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How do phishing simulation exercises simulate various phishing techniques and tactics, challenge staff members' ability to differentiate between legitimate and fraudulent emails, and reinforce best practices for mitigating phishing risks?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they simulate" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What feedback mechanisms are utilized to evaluate staff members' performance during phishing simulation exercises, track their progress in identifying phishing attempts, and provide targeted guidance or training to address areas for improvement?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the mechanisms" />  
                    </div>
                </div>

                <h2>Educational Resources and Awareness Materials:</h2>
                <div className="form-section">
                    <label>Are educational resources, awareness materials, or interactive modules available to staff members to enhance their understanding of phishing threats, cybersecurity best practices, and proactive measures for safeguarding sensitive information?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are staff members provided with access to informational resources, instructional videos, or online tutorials covering topics such as email security, password hygiene, two-factor authentication, and safe browsing habits to reinforce phishing awareness and prevention strategies?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're provided" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What strategies are employed to promote ongoing engagement and awareness among staff members regarding emerging phishing trends, evolving cyber threats, and recommended countermeasures to protect against phishing attacks in a dynamic threat landscape?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the strategies" />  
                    </div>
                </div>

                <h2>Reporting and Incident Management:</h2>
                <div className="form-section">
                    <label>Are staff members informed of the procedures for reporting suspected phishing emails or cyber incidents to designated IT or security personnel for investigation and response?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are staff members encouraged to promptly report phishing attempts, security breaches, or suspicious activities through established reporting channels, incident response mechanisms, or incident management systems?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're encouraged" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What mechanisms are in place to facilitate timely analysis, triage, and resolution of reported phishing incidents, including communication with affected individuals, containment of threats, and implementation of corrective actions to prevent recurrence?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the mechanisms" />  
                    </div>
                </div>

            </form>
        </main>
    </div>
  )
}

export default PhishingAwareness2FormPage;
import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function PhishingAwareness2FormPage() {
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
            <h1>Phishing Awareness Assessment</h1>
        </header>

        <main className="form-container">
            <form>
                {/* 3.4.2.2.1 Phishing Awareness */}
                <h2>Recognizing Phishing Attempts:</h2>
                <div className="form-section">
                    <label>Are staff members trained to recognize common indicators of phishing attempts, such as unsolicited emails requesting sensitive information, urgent requests for account credentials, or messages containing suspicious links or attachments?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>
                
                <div className="form-section">
                    <label>What specific characteristics or red flags are emphasized during training as potential signs of phishing, such as misspelled or unfamiliar sender addresses, generic greetings, grammatical errors, or requests for confidential data?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the characteristics/red flags" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are staff members educated on the importance of exercising caution and skepticism when interacting with email messages, especially those prompting them to disclose personal information or take immediate action without verification?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're educated" />  
                    </div>
                </div>
                
                <h2>Response Protocols and Procedures:</h2>
                <div className="form-section">
                    <label>Are clear response protocols and procedures established for staff members to follow in the event of encountering a suspected phishing email or cyber threat, including steps to report the incident, mitigate risks, and safeguard sensitive information?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the protocols/procedures" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are staff members trained to respond effectively to phishing attempts, such as refraining from clicking on suspicious links or attachments, verifying the authenticity of sender identities, and forwarding suspicious emails to designated IT or security personnel for analysis?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're trained" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What measures are in place to ensure that staff members understand their roles and responsibilities in preventing, detecting, and responding to phishing attacks, including the escalation of incidents to appropriate authorities for further investigation and remediation?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the measures" />  
                    </div>
                </div>

                <h2>Phishing Simulation Exercises:</h2>
                <div className="form-section">
                    <label>Are staff members provided with opportunities to participate in simulated phishing exercises or awareness campaigns designed to mimic real-world phishing scenarios and test their ability to recognize and respond to phishing threats?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How do phishing simulation exercises simulate various phishing techniques and tactics, challenge staff members' ability to differentiate between legitimate and fraudulent emails, and reinforce best practices for mitigating phishing risks?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they simulate" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What feedback mechanisms are utilized to evaluate staff members' performance during phishing simulation exercises, track their progress in identifying phishing attempts, and provide targeted guidance or training to address areas for improvement?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the mechanisms" />  
                    </div>
                </div>

                <h2>Educational Resources and Awareness Materials:</h2>
                <div className="form-section">
                    <label>Are educational resources, awareness materials, or interactive modules available to staff members to enhance their understanding of phishing threats, cybersecurity best practices, and proactive measures for safeguarding sensitive information?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are staff members provided with access to informational resources, instructional videos, or online tutorials covering topics such as email security, password hygiene, two-factor authentication, and safe browsing habits to reinforce phishing awareness and prevention strategies?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're provided" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What strategies are employed to promote ongoing engagement and awareness among staff members regarding emerging phishing trends, evolving cyber threats, and recommended countermeasures to protect against phishing attacks in a dynamic threat landscape?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the strategies" />  
                    </div>
                </div>

                <h2>Reporting and Incident Management:</h2>
                <div className="form-section">
                    <label>Are staff members informed of the procedures for reporting suspected phishing emails or cyber incidents to designated IT or security personnel for investigation and response?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are staff members encouraged to promptly report phishing attempts, security breaches, or suspicious activities through established reporting channels, incident response mechanisms, or incident management systems?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're encouraged" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What mechanisms are in place to facilitate timely analysis, triage, and resolution of reported phishing incidents, including communication with affected individuals, containment of threats, and implementation of corrective actions to prevent recurrence?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the mechanisms" />  
                    </div>
                </div>

            </form>
        </main>
    </div>
  )
}

export default PhishingAwareness2FormPage;