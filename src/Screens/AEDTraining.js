import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function AEDTrainingFormPage() {
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
            <h1>AED Training Assessment</h1>
        </header>

        <main className="form-container">
            <form>
                {/* 3.1.1.2.7 AED Training */}
                <h2>AED Equipment Familiarity and Accessibility:</h2>
                <div className="form-section">
                    <label>How familiar are staff members with the location, accessibility, and operation of AEDs installed within the school premises?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how familiar they are" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are AED units strategically positioned in easily accessible locations, clearly marked with signage, and consistently maintained in operational condition?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>What measures are in place to ensure that AEDs are readily available for prompt deployment in response to sudden cardiac arrest emergencies?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the measures" />  
                    </div>
                </div>

                <h2>AED Training Curriculum:</h2>
                <div className="form-section">
                    <label>What topics and skills are covered in AED training courses to prepare staff members for effective use of AED devices during cardiac arrest emergencies?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="List the topics/skills" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are training materials and resources aligned with recognized AED training programs, guidelines, and recommendations from organizations such as the American Heart Association (AHA) or similar accredited institutions?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How do AED training courses address key concepts such as AED functionality, electrode pad placement, device prompts interpretation, and hands-free CPR integration?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they address concepts" />  
                    </div>
                </div>

                <h2>Hands-on AED Practice and Simulation:</h2>
                <div className="form-section">
                    <label>To what extent do AED training sessions incorporate hands-on practice, skills demonstration, and scenario-based simulations to reinforce participant learning and confidence in AED use?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the sessions" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are staff members provided with opportunities to practice AED deployment, pad placement, device operation, and CPR coordination under simulated cardiac arrest scenarios?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are AED training simulations tailored to simulate real-life emergency situations and challenge staff members to apply their knowledge and skills effectively?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the simulations" />  
                    </div>
                </div>

                <h2>AED Maintenance and Quality Assurance:</h2>
                <div className="form-section">
                    <label>What procedures are in place to ensure the regular maintenance, inspection, and testing of AED equipment to verify functionality, battery readiness, and electrode pad integrity?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the procedures" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are designated staff members trained to perform routine checks, replace expired components, and troubleshoot technical issues with AED devices as part of ongoing maintenance protocols?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are AED maintenance records, usage logs, and performance indicators monitored and documented to ensure compliance with regulatory requirements and manufacturer recommendations?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're monitored/documented" />  
                    </div>
                </div>

                <h2>Integration with Emergency Response Protocols:</h2>
                <div className="form-section">
                    <label>How are AED deployment protocols integrated into broader emergency response plans, procedures, and protocols within the school environment?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're integrated" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are staff members trained to recognize the signs of sudden cardiac arrest, activate the emergency response system, and initiate AED use promptly and effectively?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>What coordination mechanisms are in place to facilitate communication, collaboration, and teamwork among responders during AED deployment and CPR administration?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the mechanisms" />  
                    </div>
                </div>

            </form>
        </main>
    </div>
  )
}

export default AEDTrainingFormPage;
