import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function ResponseProtocolsFormPage() {
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
            <h1>Response Protocols Assessment</h1>
        </header>

        <main className="form-container">
            <form>
                {/* 3.1.1.1.5 Response Protocols */}
                <h2>Protocol Development:</h2>
                <div className="form-section">
                    <label>How are emergency response protocols developed, and are they based on recognized standards, best practices, or regulatory requirements?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how protocols are developed" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are response protocols tailored to address specific types of emergencies or threats commonly faced by the organization?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the specific types" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What considerations are taken into account when determining the appropriate actions and procedures to include in response protocols?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the considerations" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are response protocols reviewed and updated periodically to reflect changes in organizational needs, emerging threats, or lessons learned from incidents?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Immediate Actions:</h2>
                <div className="form-section">
                    <label>What immediate actions are outlined in the response protocols for various types of emergencies (e.g., evacuation, shelter-in-place, medical emergencies)?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the actions" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are staff members trained on the specific steps to take during the initial moments of an emergency, such as alerting others, assessing the situation, and taking protective measures?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are response protocols communicated to staff members to ensure they are aware of and understand their roles and responsibilities?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how protocols are communicated" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there designated individuals or teams responsible for initiating immediate actions in different areas or departments of the organization?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="List the designated individuals/teams" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are response protocols coordinated with external emergency services (e.g., fire department, law enforcement) to facilitate a timely and effective response?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how protocols are coordinated" />  
                    </div>
                </div>

                <h2>Communication Procedures:</h2>
                <div className="form-section">
                    <label>What communication procedures are included in the response protocols for disseminating information and instructions during emergencies?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the communication procedures" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there established communication channels and protocols for notifying staff members, occupants, and relevant stakeholders about emergency situations?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the channels/protocols" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are communication systems and technologies utilized to ensure rapid and reliable dissemination of critical information?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how these ensure rapid and reliability" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are backup communication methods or redundancy measures in place to address potential failures or disruptions in primary communication channels?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the backup methods/redundancy" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are staff members trained on effective communication practices during emergencies, such as using clear and concise language, active listening, and relaying accurate information?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're trained" />  
                    </div>
                </div>

                <h2>Decision-making Authority:</h2>
                <div className="form-section">
                    <label>How is decision-making authority delineated within the response protocols, and are there clear lines of authority and accountability during emergency situations?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the decision-making authority" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are staff members trained on the decision-making framework outlined in the response protocols, including when to escalate issues or seek additional support?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>What mechanisms are in place to empower staff members to make informed decisions and take appropriate actions based on the situational context and available information?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the decision-making authority" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there protocols for delegating decision-making authority to designated individuals or teams in the event of leadership absence or incapacitation?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the protocols" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are decisions documented and communicated within the organization to ensure transparency and accountability?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how decisions are documented" />  
                    </div>
                </div>

                <h2>Training and Drills:</h2>
                <div className="form-section">
                    <label>How are staff members trained on the response protocols, and what methods or formats are used to deliver training (e.g., classroom sessions, practical exercises)?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how staff memebers are trained" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are scenario-based drills conducted to simulate emergency situations and allow staff members to practice implementing response protocols in a realistic setting?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How often are training sessions and drills conducted to reinforce response protocols and maintain readiness among staff members?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how often" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are debriefing sessions held after training exercises to review performance, identify areas for improvement, and incorporate lessons learned into future training activities?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>
                
                <div className="form-section">
                    <label>What measures are in place to ensure that staff members retain knowledge and skills related to response protocols over time, including refresher training and ongoing reinforcement?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the measures" />  
                    </div>
                </div>

                <h2>Documentation and Evaluation:</h2>
                <div className="form-section">
                    <label>How are response protocols documented and disseminated to ensure accessibility and consistency across the organization?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how protocols are documented" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are response protocols regularly reviewed and evaluated to assess their effectiveness, identify gaps or weaknesses, and make necessary revisions?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the protocols" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What metrics or indicators are used to measure the performance and outcomes of response protocols during actual emergencies or drills?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the metrics/indicators" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are post-incident analyses conducted to evaluate the implementation of response protocols, identify opportunities for improvement, and inform revisions?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are lessons learned from response protocols shared within the organization to enhance preparedness and resilience against future emergencies?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how lessons are learned" />  
                    </div>
                </div>

            </form>
        </main>
    </div>
  )
}

export default ResponseProtocolsFormPage;
import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function ResponseProtocolsFormPage() {
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
            <h1>Response Protocols Assessment</h1>
        </header>

        <main className="form-container">
            <form>
                {/* 3.1.1.1.5 Response Protocols */}
                <h2>Protocol Development:</h2>
                <div className="form-section">
                    <label>How are emergency response protocols developed, and are they based on recognized standards, best practices, or regulatory requirements?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how protocols are developed" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are response protocols tailored to address specific types of emergencies or threats commonly faced by the organization?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the specific types" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What considerations are taken into account when determining the appropriate actions and procedures to include in response protocols?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the considerations" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are response protocols reviewed and updated periodically to reflect changes in organizational needs, emerging threats, or lessons learned from incidents?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Immediate Actions:</h2>
                <div className="form-section">
                    <label>What immediate actions are outlined in the response protocols for various types of emergencies (e.g., evacuation, shelter-in-place, medical emergencies)?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the actions" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are staff members trained on the specific steps to take during the initial moments of an emergency, such as alerting others, assessing the situation, and taking protective measures?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are response protocols communicated to staff members to ensure they are aware of and understand their roles and responsibilities?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how protocols are communicated" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there designated individuals or teams responsible for initiating immediate actions in different areas or departments of the organization?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="List the designated individuals/teams" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are response protocols coordinated with external emergency services (e.g., fire department, law enforcement) to facilitate a timely and effective response?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how protocols are coordinated" />  
                    </div>
                </div>

                <h2>Communication Procedures:</h2>
                <div className="form-section">
                    <label>What communication procedures are included in the response protocols for disseminating information and instructions during emergencies?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the communication procedures" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there established communication channels and protocols for notifying staff members, occupants, and relevant stakeholders about emergency situations?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the channels/protocols" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are communication systems and technologies utilized to ensure rapid and reliable dissemination of critical information?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how these ensure rapid and reliability" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are backup communication methods or redundancy measures in place to address potential failures or disruptions in primary communication channels?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the backup methods/redundancy" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are staff members trained on effective communication practices during emergencies, such as using clear and concise language, active listening, and relaying accurate information?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're trained" />  
                    </div>
                </div>

                <h2>Decision-making Authority:</h2>
                <div className="form-section">
                    <label>How is decision-making authority delineated within the response protocols, and are there clear lines of authority and accountability during emergency situations?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the decision-making authority" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are staff members trained on the decision-making framework outlined in the response protocols, including when to escalate issues or seek additional support?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>What mechanisms are in place to empower staff members to make informed decisions and take appropriate actions based on the situational context and available information?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the decision-making authority" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there protocols for delegating decision-making authority to designated individuals or teams in the event of leadership absence or incapacitation?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the protocols" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are decisions documented and communicated within the organization to ensure transparency and accountability?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how decisions are documented" />  
                    </div>
                </div>

                <h2>Training and Drills:</h2>
                <div className="form-section">
                    <label>How are staff members trained on the response protocols, and what methods or formats are used to deliver training (e.g., classroom sessions, practical exercises)?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how staff memebers are trained" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are scenario-based drills conducted to simulate emergency situations and allow staff members to practice implementing response protocols in a realistic setting?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How often are training sessions and drills conducted to reinforce response protocols and maintain readiness among staff members?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how often" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are debriefing sessions held after training exercises to review performance, identify areas for improvement, and incorporate lessons learned into future training activities?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>
                
                <div className="form-section">
                    <label>What measures are in place to ensure that staff members retain knowledge and skills related to response protocols over time, including refresher training and ongoing reinforcement?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the measures" />  
                    </div>
                </div>

                <h2>Documentation and Evaluation:</h2>
                <div className="form-section">
                    <label>How are response protocols documented and disseminated to ensure accessibility and consistency across the organization?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how protocols are documented" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are response protocols regularly reviewed and evaluated to assess their effectiveness, identify gaps or weaknesses, and make necessary revisions?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the protocols" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What metrics or indicators are used to measure the performance and outcomes of response protocols during actual emergencies or drills?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the metrics/indicators" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are post-incident analyses conducted to evaluate the implementation of response protocols, identify opportunities for improvement, and inform revisions?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are lessons learned from response protocols shared within the organization to enhance preparedness and resilience against future emergencies?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how lessons are learned" />  
                    </div>
                </div>

            </form>
        </main>
    </div>
  )
}

export default ResponseProtocolsFormPage;