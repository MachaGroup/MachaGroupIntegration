import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function RecognizingSecurityBreachesFormPage() {
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
            <h1>Recognizing Security Breaches Assessment</h1>
        </header>

        <main className="form-container">
            <form>
                {/* 3.4.2.1.2 Recognizing Security Breaches */}
                <h2>Understanding Security Vulnerabilities:</h2>
                <div className="form-section">
                    <label>Are staff members trained to identify and recognize common security vulnerabilities, weaknesses, or gaps in physical security measures, access controls, or surveillance systems that could be exploited by intruders or unauthorized individuals?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>
                
                <div className="form-section">
                    <label>What specific indicators or warning signs are emphasized during training as potential evidence of security breaches, such as unauthorized access points, tampered locks, broken windows, or unexplained disruptions to normal operations?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the indicators/warning signs" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are staff members educated on the importance of maintaining a proactive and vigilant stance towards security, actively monitoring their surroundings, and promptly reporting any deviations from established security protocols or procedures?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're educated" />  
                    </div>
                </div>

                <h2>Response Protocols and Procedures:</h2>
                <div className="form-section">
                    <label>Are clear response protocols and procedures established for staff members to follow in the event of a suspected security breach, unauthorized access attempt, or breach of perimeter security?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the protocols/procedures" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are staff members trained to respond effectively and decisively to security breaches, including actions such as initiating lockdown procedures, activating alarm systems, alerting security personnel or law enforcement authorities, and directing occupants to safe locations?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're trained" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What measures are in place to ensure that staff members understand their roles and responsibilities during security incidents, coordinate their actions with other team members, and communicate critical information to facilitate a prompt and coordinated response?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the measures" />  
                    </div>
                </div>

                <h2>Security Device Familiarization:</h2>
                <div className="form-section">
                    <label>Are staff members provided with training on the proper use, operation, and troubleshooting of security devices, such as access control systems, surveillance cameras, intrusion detection sensors, or alarm systems?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are staff members instructed to recognize abnormal behavior or indications of malfunction in security devices that could signal a potential security breach or technical issue requiring immediate attention?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're instructed" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What resources or reference materials are available to staff members to assist them in troubleshooting common security device issues, interpreting system alerts or error messages, and taking appropriate corrective actions to restore functionality?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="List the resources/reference materials" />  
                    </div>
                </div>

                <h2>Incident Documentation and Reporting:</h2>
                <div className="form-section">
                    <label>Are staff members trained on the importance of documenting and reporting security breaches or unauthorized access incidents in a timely and accurate manner to support investigation, analysis, and corrective action?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are staff members instructed to document relevant details and observations regarding security breaches, including the location, time, nature of the incident, individuals involved, and any additional contextual information that may aid in understanding the situation?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're instructed" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What protocols are in place for reporting security breaches to designated authorities, security personnel, or administrative staff members, and how are staff members informed of their obligations and responsibilities in this regard?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the protocols" />  
                    </div>
                </div>

                <h2>Continuous Improvement and Feedback:</h2>
                <div className="form-section">
                    <label>How does the organization promote a culture of continuous improvement in security awareness and breach recognition capabilities among staff members through ongoing training, reinforcement activities, and feedback mechanisms?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they promote" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are staff members encouraged to provide feedback on security protocols, procedures, or training materials based on their real-world experiences, insights, or suggestions for enhancing security awareness and breach recognition effectiveness?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>What mechanisms are in place to review and analyze reported security breaches, identify root causes or contributing factors, and implement corrective actions or procedural enhancements to prevent recurrence and strengthen overall security posture?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the mechanisms" />  
                    </div>
                </div>

            </form>
        </main>
    </div>
  )
}

export default RecognizingSecurityBreachesFormPage;
import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function RecognizingSecurityBreachesFormPage() {
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
            <h1>Recognizing Security Breaches Assessment</h1>
        </header>

        <main className="form-container">
            <form>
                {/* 3.4.2.1.2 Recognizing Security Breaches */}
                <h2>Understanding Security Vulnerabilities:</h2>
                <div className="form-section">
                    <label>Are staff members trained to identify and recognize common security vulnerabilities, weaknesses, or gaps in physical security measures, access controls, or surveillance systems that could be exploited by intruders or unauthorized individuals?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>
                
                <div className="form-section">
                    <label>What specific indicators or warning signs are emphasized during training as potential evidence of security breaches, such as unauthorized access points, tampered locks, broken windows, or unexplained disruptions to normal operations?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the indicators/warning signs" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are staff members educated on the importance of maintaining a proactive and vigilant stance towards security, actively monitoring their surroundings, and promptly reporting any deviations from established security protocols or procedures?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're educated" />  
                    </div>
                </div>

                <h2>Response Protocols and Procedures:</h2>
                <div className="form-section">
                    <label>Are clear response protocols and procedures established for staff members to follow in the event of a suspected security breach, unauthorized access attempt, or breach of perimeter security?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the protocols/procedures" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are staff members trained to respond effectively and decisively to security breaches, including actions such as initiating lockdown procedures, activating alarm systems, alerting security personnel or law enforcement authorities, and directing occupants to safe locations?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're trained" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What measures are in place to ensure that staff members understand their roles and responsibilities during security incidents, coordinate their actions with other team members, and communicate critical information to facilitate a prompt and coordinated response?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the measures" />  
                    </div>
                </div>

                <h2>Security Device Familiarization:</h2>
                <div className="form-section">
                    <label>Are staff members provided with training on the proper use, operation, and troubleshooting of security devices, such as access control systems, surveillance cameras, intrusion detection sensors, or alarm systems?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are staff members instructed to recognize abnormal behavior or indications of malfunction in security devices that could signal a potential security breach or technical issue requiring immediate attention?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're instructed" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What resources or reference materials are available to staff members to assist them in troubleshooting common security device issues, interpreting system alerts or error messages, and taking appropriate corrective actions to restore functionality?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="List the resources/reference materials" />  
                    </div>
                </div>

                <h2>Incident Documentation and Reporting:</h2>
                <div className="form-section">
                    <label>Are staff members trained on the importance of documenting and reporting security breaches or unauthorized access incidents in a timely and accurate manner to support investigation, analysis, and corrective action?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are staff members instructed to document relevant details and observations regarding security breaches, including the location, time, nature of the incident, individuals involved, and any additional contextual information that may aid in understanding the situation?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're instructed" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What protocols are in place for reporting security breaches to designated authorities, security personnel, or administrative staff members, and how are staff members informed of their obligations and responsibilities in this regard?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the protocols" />  
                    </div>
                </div>

                <h2>Continuous Improvement and Feedback:</h2>
                <div className="form-section">
                    <label>How does the organization promote a culture of continuous improvement in security awareness and breach recognition capabilities among staff members through ongoing training, reinforcement activities, and feedback mechanisms?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they promote" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are staff members encouraged to provide feedback on security protocols, procedures, or training materials based on their real-world experiences, insights, or suggestions for enhancing security awareness and breach recognition effectiveness?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>What mechanisms are in place to review and analyze reported security breaches, identify root causes or contributing factors, and implement corrective actions or procedural enhancements to prevent recurrence and strengthen overall security posture?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the mechanisms" />  
                    </div>
                </div>

            </form>
        </main>
    </div>
  )
}

export default RecognizingSecurityBreachesFormPage;