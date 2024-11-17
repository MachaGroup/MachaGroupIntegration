import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function CPRCertificationFormPage() {
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
            <h1>CPR Certification Assessment</h1>
        </header>
        <main className="form-container">
            <form>
                {/* 3.1.1.2.6 CPR Certification */}
                <h2>Certification Requirements and Standards:</h2>
                <div className="form-section">
                    <label>What certification standards or guidelines are followed for CPR training, such as those set by recognized organizations like the American Heart Association (AHA), American Red Cross (ARC), or similar accredited institutions?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the standards/guidelines" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are CPR certification courses aligned with the latest industry standards, guidelines, and best practices for adult, child, and infant CPR techniques, as well as automated external defibrillator (AED) use and choking relief procedures?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How do certification programs address specific CPR techniques, compression-to-ventilation ratios, rescuer fatigue management, and other factors that may impact the effectiveness of CPR interventions?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they address techniques" />  
                    </div>
                </div>

                <h2>Instructor Qualifications and Expertise:</h2>
                <div className="form-section">
                    <label>What qualifications, credentials, and experience do CPR instructors possess to deliver high-quality training and ensure participant competency?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the qualifications/creditals/experience" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are CPR instructors certified by recognized CPR training organizations and accredited to teach CPR courses to school staff members?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="List the organizations" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How do instructors stay updated on changes in CPR protocols, instructional methodologies, and training techniques to deliver relevant and effective CPR certification programs?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're updated" />  
                    </div>
                </div>

                <h2>Training Delivery and Methodology:</h2>
                <div className="form-section">
                    <label>How are CPR certification courses delivered to accommodate diverse learning styles, preferences, and scheduling constraints of school staff members?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're delivered" />  
                    </div>
                </div>

                <div class="form-section">
                    <label>Are training sessions conducted in-person, online, or through blended learning approaches that combine both classroom instruction and self-paced online modules?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <select id="systems" multiple>
                            <option value="option1">In-person</option>
                            <option value="option2">Online</option>
                            <option value="option3">Blended learning approaches</option>
                        </select>
                    </div>
                </div>

                <div className="form-section">
                    <label>What training resources, materials, and technologies are utilized to enhance participant engagement, skills acquisition, and knowledge retention during CPR certification courses?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe what is utilized" />  
                    </div>
                </div>

                <h2>Skills Proficiency and Assessment:</h2>
                <div className="form-section">
                    <label>How are CPR skills assessed and evaluated to ensure staff members achieve and maintain proficiency in performing CPR techniques effectively?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're assessed/evaluated" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are participants provided with opportunities for hands-on practice, skills demonstrations, and scenario-based simulations to apply CPR skills in simulated emergency situations?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>What criteria or performance standards are used to measure participant competency, and how are assessments conducted to verify skill mastery and readiness to respond to cardiac arrest events?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the criteria/standards" />  
                    </div>
                </div>

                <h2>Recertification and Continuing Education:</h2>
                <div className="form-section">
                    <label>What are the recertification requirements and intervals for maintaining CPR certification among school staff members, as recommended by CPR training organizations or regulatory agencies?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the requirements" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are recertification courses offered regularly to ensure staff members renew their CPR certification within the specified timeframe and stay updated on CPR protocols and techniques?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are staff members informed about recertification deadlines, renewal procedures, and opportunities for continuing education to sustain their CPR skills and knowledge over time?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're informed" />  
                    </div>
                </div>

            </form>
        </main>
    </div>
  )
}

export default CPRCertificationFormPage;