import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function CurriculumIntegrationFormPage() {
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
            <h1>Cirriculum Integration Assessment</h1>
        </header>

        <main className="form-container">
            <form>
                {/* 3.2.1.1.1 Recertification Schedule */}
                <h2>Curriculum Integration:</h2>
                <div className="form-section">
                    <label>How are emergency procedures integrated into the curriculum, and in which subjects or courses are they included?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how procedures are integrated" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are emergency procedures incorporated into existing lessons or taught as standalone topics within the curriculum?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>What strategies are used to ensure that emergency procedures are age-appropriate and developmentally suitable for students?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the strategies" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How often are emergency procedures revisited and reinforced throughout the academic year to promote retention and readiness?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how often" />  
                    </div>
                </div>

                <h2>Instructional Materials:</h2>
                <div className="form-section">
                    <label>What instructional materials are used to teach emergency procedures to students, such as textbooks, workbooks, or multimedia resources?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the materials" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are educational materials aligned with established emergency response protocols and guidelines?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are instructional materials adapted to meet the diverse learning needs and preferences of students, including those with disabilities or language barriers?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how materials adapt" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are supplementary resources available to support student learning and reinforce key concepts related to emergency preparedness?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the resources" />  
                    </div>
                </div>

                <h2>Interactive Learning Activities:</h2>
                <div className="form-section">
                    <label>What interactive learning activities are employed to engage students in learning about emergency procedures?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the activities" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are hands-on activities, simulations, or role-playing exercises used to simulate emergency situations and practice response skills?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are technology tools or educational games utilized to enhance student understanding and retention of emergency procedures?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how tools are utilized" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are collaborative learning experiences or group discussions facilitated to promote peer interaction and knowledge sharing?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Assessment and Evaluation:</h2>
                <div className="form-section">
                    <label>How is student comprehension and proficiency in emergency procedures assessed and evaluated?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how it's assessed" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are formal assessments, such as quizzes, tests, or performance evaluations, used to measure student learning outcomes?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are formative assessment strategies, such as observations or classroom discussions, employed to gauge student understanding and skill development?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how its understanding" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are assessment results used to identify areas for improvement in emergency preparedness education and inform instructional adjustments?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Parent and Guardian Involvement:</h2>
                <div className="form-section">
                    <label>How are parents and guardians informed about the emergency procedures being taught to their children?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how parents are informed" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are resources provided to parents and guardians to support reinforcement of emergency preparedness concepts at home?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>What communication channels are used to solicit feedback and input from parents and guardians regarding their children's learning experiences related to emergency procedures?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the channels" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are opportunities provided for parents and guardians to participate in training or informational sessions about emergency preparedness and response?</label>
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

export default CurriculumIntegrationFormPage;