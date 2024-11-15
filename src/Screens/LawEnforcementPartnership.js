import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function LawEnforcementPartnershipFormPage() {
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
            <h1>Law Enforcement Partnership Assessment</h1>
        </header>

        <main className="form-container">
            <form>
                {/* 3.3.2.1.1 Law Enforcement Partnership */}
                <h2>Nature and Scope of Partnership:</h2>
                <div className="form-section">
                    <label>How is the partnership between the school or educational institution and local law enforcement agencies established, formalized, and maintained?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the partnership" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What specific goals, objectives, or areas of collaboration are outlined in the partnership agreement or memorandum of understanding (MOU) between the school and law enforcement?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the goals/objectives/areas" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are roles, responsibilities, and expectations clearly defined for both parties regarding their respective contributions to enhancing school safety, emergency preparedness, and response efforts?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the roles/responsibilities/expectations" />  
                    </div>
                </div>

                <h2>Training and Exercises:</h2>
                <div className="form-section">
                    <label>How frequently do school staff, administrators, and law enforcement personnel participate in joint training exercises, drills, or simulations to prepare for various emergency scenarios?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how frequent" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What types of training activities are conducted collaboratively, such as active shooter drills, tabletop exercises, or scenario-based simulations, to improve coordination and communication between school and law enforcement personnel?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the activities conducted" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are training sessions tailored to address specific needs, challenges, or vulnerabilities identified through risk assessments, security audits, or incident debriefs?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Communication and Information Sharing:</h2>
                <div className="form-section">
                    <label>How do school administrators and law enforcement agencies communicate and share information regarding potential threats, safety concerns, or suspicious activities identified within the school community?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they communicate" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are protocols established for reporting, documenting, and responding to security incidents, behavioral indicators, or other warning signs that may pose a risk to school safety?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the protocols" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What measures are in place to protect the privacy, confidentiality, and legal rights of students and staff while facilitating information sharing and collaboration between the school and law enforcement?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the measures" />  
                    </div>
                </div>

                <h2>Resource Allocation and Support:</h2>
                <div className="form-section">
                    <label>What resources, support services, or technical assistance are provided by law enforcement agencies to augment school safety initiatives, emergency response capabilities, or crime prevention efforts?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the resources" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are school security personnel, administrators, or designated staff members trained to interface with law enforcement during emergencies, incidents, or law enforcement interventions on campus?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How does the school administration collaborate with law enforcement agencies to leverage community policing strategies, crime prevention programs, or outreach initiatives aimed at enhancing school security and fostering positive relationships with students and families?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they collaborate" />  
                    </div>
                </div>

                <h2>Evaluation and Continuous Improvement:</h2>
                <div className="form-section">
                    <label>How is the effectiveness of the partnership with local law enforcement agencies evaluated, monitored, and assessed over time?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how it's evaluated" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are mechanisms in place to solicit feedback from school stakeholders, law enforcement personnel, and community members regarding the impact, strengths, and areas for improvement in the collaboration between the school and law enforcement?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the mechanisms" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What strategies or measures are implemented to address challenges, adapt to changing circumstances, and refine partnership approaches based on lessons learned, best practices, or emerging trends in school safety and security?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the strategies/measures" />  
                    </div>
                </div>

            </form>
        </main>
    </div>
  )
}

export default LawEnforcementPartnershipFormPage;