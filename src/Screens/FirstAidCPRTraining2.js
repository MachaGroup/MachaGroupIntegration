import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function FirstAidCPRTraining2FormPage() {
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
            <h1>First-Aid/CPR Training Assessment</h1>
        </header>

        <main className="form-container">
            <form>
                {/* 3.1.1.2.4 First-Aid/CPR Training */}
                <h2>Training Program Effectiveness:</h2>
                <div className="form-section">
                    <label>How is the effectiveness of First Aid/CPR training programs evaluated, assessed, and monitored to ensure that staff members acquire and maintain the necessary knowledge, skills, and competencies to respond effectively to medical emergencies, injuries, or cardiac events within the school environment?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the effectiveness" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are training outcomes measured through written assessments, practical skills demonstrations, scenario-based simulations, or other performance evaluations to verify staff proficiency in providing timely and appropriate First Aid/CPR interventions?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Training Frequency and Recertification:</h2>
                <div className="form-section">
                    <label>What is the frequency of First Aid/CPR training sessions provided to staff members, and how often are refresher courses or recertification programs offered to ensure ongoing competency, skill retention, and compliance with industry standards or regulatory requirements?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the frequency" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are recertification schedules established, communicated, and adhered to for staff members who are required to renew their First Aid/CPR certifications on a regular basis, and are mechanisms in place to track and monitor staff compliance with recertification deadlines?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Integration with Emergency Response Plans:</h2>
                <div className="form-section">
                    <label>How are First Aid/CPR training curricula and protocols integrated into broader emergency response plans, procedures, and protocols to ensure alignment with school safety policies, incident management frameworks, and regulatory guidelines?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're integrated" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are staff members trained to recognize, assess, and respond to various types of medical emergencies, cardiac arrest scenarios, and traumatic injuries using standardized protocols, decision trees, or action checklists included in the school's emergency operations plans?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Accessibility of Training Resources:</h2>
                <div className="form-section">
                    <label>What resources, materials, and training aids are provided to support First Aid/CPR training initiatives, including instructional manuals, reference guides, training videos, manikins, AED trainers, and other simulation equipment used to facilitate hands-on learning experiences and skills practice sessions?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the resources/materials/training aids" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are training resources accessible, user-friendly, and culturally sensitive, and are accommodations made for staff members with diverse learning needs, language preferences, or disabilities to ensure equitable access to training opportunities and resources?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Training Delivery Methods:</h2>
                <div className="form-section">
                    <label>How are First Aid/CPR training sessions delivered to accommodate different learning preferences, schedules, and staffing constraints, and are options available for in-person instruction, blended learning models, online courses, or self-paced modules tailored to meet the needs of individual staff members or departments?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're delivered" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are training sessions facilitated by certified instructors, subject matter experts, or qualified trainers who possess the requisite knowledge, experience, and credentials to deliver high-quality instruction, provide constructive feedback, and address participant questions or concerns during training sessions?</label>
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

export default FirstAidCPRTraining2FormPage;