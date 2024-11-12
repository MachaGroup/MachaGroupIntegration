import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function TrustedAdultsFormPage() {
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
            <h1>Trusted Adults Assessment</h1>
        </header>

        <main className="form-container">
            <form>
                {/* 3.4.2.2.1 Trusted Adults */}
                <h2>Communication and Awareness:</h2>
                <div className="form-section">
                    <label>How does the school promote awareness among students about the importance of reporting bullying incidents to trusted adults, and what strategies are used to encourage open dialogue and communication?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they promote awareness" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there regular school-wide initiatives, such as assemblies, presentations, or awareness campaigns, aimed at educating students about reporting procedures for bullying and the role of trusted adults in addressing these issues?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are parents or guardians informed about the reporting procedures for bullying incidents, and what resources or materials are provided to support conversations at home about recognizing, reporting, and responding to bullying behavior?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're informed" />  
                    </div>
                </div>

                <h2>Accessibility and Support:</h2>
                <div className="form-section">
                    <label>Are trusted adults trained to recognize signs of bullying and respond appropriately to reports, and how is ongoing professional development provided to ensure staff members are equipped to handle these situations effectively?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how the development is provided" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there designated individuals or teams responsible for coordinating responses to reports of bullying, and how is communication facilitated between trusted adults, administrators, and support personnel to ensure a coordinated approach?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="List the individuals/teams and describe how it's facilitated" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What support services are available to students who report bullying incidents, including counseling, mediation, conflict resolution strategies, or referrals to external agencies or community resources?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the strategies" />  
                    </div>
                </div>

                <h2>Confidentiality and Privacy:</h2>
                <div className="form-section">
                    <label>How does the school maintain confidentiality and respect the privacy of students who report bullying incidents, and what measures are in place to protect individuals from retaliation or stigmatization?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they maintain confidentiality, and the measures" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there procedures for documenting and tracking reports of bullying while safeguarding the confidentiality of those involved, and how is information shared on a need-to-know basis to maintain privacy and trust?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the procedures" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What steps are taken to ensure that investigations into reported bullying incidents are conducted discreetly and sensitively, and how are the outcomes communicated to affected parties while respecting their privacy rights?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="List the steps" />  
                    </div>
                </div>

                <h2>Empowerment and Empathy:</h2>
                <div className="form-section">
                    <label>How does the school foster a culture of empathy, respect, and peer support to empower students to intervene as bystanders and report bullying incidents when they occur?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they foster the culture" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there opportunities for students to participate in peer-led initiatives, such as anti-bullying clubs, peer counseling programs, or student advisory boards, aimed at promoting positive relationships and creating a safe and inclusive school environment?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are students involved in the development and review of reporting procedures for bullying incidents, and how does the school seek feedback from student stakeholders to improve the accessibility, effectiveness, and responsiveness of these processes?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're involved" />  
                    </div>
                </div>

                <h2>Monitoring and Evaluation:</h2>
                <div className="form-section">
                    <label>How does the school monitor and evaluate the effectiveness of reporting procedures for bullying incidents, including the frequency and types of reports received, response times, resolution outcomes, and follow-up actions taken?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they monitor and evaluate" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are data collected on reported bullying incidents analyzed regularly to identify trends, patterns, or systemic issues that may require additional intervention or targeted prevention efforts?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>What mechanisms are in place for continuous improvement and refinement of reporting procedures based on feedback from students, parents, staff, and other stakeholders, and how are lessons learned incorporated into future planning and decision-making?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the mechanisms" />  
                    </div>
                </div>

                <h2>Legal Compliance and Policy Adherence:</h2>
                <div className="form-section">
                    <label>Does the school's approach to reporting procedures for bullying incidents align with relevant legal requirements, state mandates, and district policies, including provisions for reporting, investigating, and addressing instances of bullying, harassment, or intimidation?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are reporting procedures for bullying incidents communicated to staff members, students, parents, and other stakeholders, and how does the school ensure that everyone is aware of their rights, responsibilities, and available resources?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're reporting procedures" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there mechanisms in place to review and update reporting procedures for bullying incidents periodically to ensure compliance with evolving legal standards, emerging best practices, and community expectations?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the mechanisms" />  
                    </div>
                </div>

                <h2>Community Collaboration and Partnership:</h2>
                <div className="form-section">
                    <label>How does the school collaborate with external partners, such as law enforcement agencies, mental health providers, nonprofit organizations, or government agencies, to enhance reporting procedures for bullying incidents and provide comprehensive support to students and families?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they collaborate" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there opportunities for community members, including local businesses, faith-based organizations, and civic groups, to contribute resources, expertise, or volunteer support to strengthen reporting procedures for bullying incidents and promote a culture of respect and inclusion?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>What outreach efforts are undertaken to engage the broader community in efforts to prevent and address bullying, including public awareness campaigns, community forums, or collaborative initiatives aimed at addressing root causes and systemic challenges?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the efforts" />  
                    </div>
                </div>

            </form>
        </main>
    </div>
  )
}

export default TrustedAdultsFormPage;