import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function SafetyDemonstrationsFormPage() {
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
            <h1>Safety Demonstrations Assessment</h1>
        </header>

        <main className="form-container">
            <form>
                {/* 3.2.1.2.1 Safety Demonstrations */}
                <h2>Frequency and Scope:</h2>
                <div className="form-section">
                    <label>How frequently are safety demonstrations conducted within the school or educational institution, and which safety topics are covered?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how frequent" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are safety demonstrations integrated into regular classroom instruction, special assemblies, or designated safety awareness events?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>What range of safety topics are addressed in the demonstrations, such as fire safety, first aid basics, personal safety, or disaster preparedness?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the range" />  
                    </div>
                </div>

                <h2>Demonstration Techniques:</h2>
                <div className="form-section">
                    <label>What techniques or methods are used to deliver safety demonstrations to students, staff, and other stakeholders?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the techniques/methods" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are live demonstrations, video presentations, interactive simulations, or hands-on activities employed to engage participants in learning about safety practices?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are safety demonstrations adapted to accommodate different learning styles, age groups, and cultural backgrounds of participants?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how it adapts" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are demonstrations facilitated by qualified instructors or safety professionals with expertise in the specific safety topics being covered?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Practical Skills and Applications:</h2>
                <div className="form-section">
                    <label>Do safety demonstrations include opportunities for participants to practice and apply safety skills in simulated or real-life scenarios?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are participants actively involved in performing tasks such as operating fire extinguishers, administering basic first aid, or evacuating buildings during drills?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are safety demonstrations structured to promote skill development, confidence building, and retention of safety knowledge among participants?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how it's structured" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are follow-up activities or assessments conducted to reinforce learning and assess participants' mastery of safety concepts and skills demonstrated?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the activities/assessments" />  
                    </div>
                </div>

                <h2>Reinforcement and Review:</h2>
                <div className="form-section">
                    <label>How are safety demonstrations reinforced and reviewed beyond the initial presentation to ensure long-term retention and application of safety knowledge?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how it's reinforced" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are review sessions, quizzes, or interactive discussions conducted to revisit key safety concepts and reinforce learning points covered in the demonstrations?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>What strategies are employed to encourage participants to incorporate safety practices into their daily routines and habits following the demonstrations?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the strategies" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are refresher courses or ongoing training opportunities provided to maintain and update participants' proficiency in safety procedures over time?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Feedback and Improvement:</h2>
                <div className="form-section">
                    <label>Are mechanisms in place to gather feedback from participants regarding their experience and effectiveness of safety demonstrations?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the mechanisms" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are suggestions or concerns raised by participants regarding safety demonstrations addressed and incorporated into future presentations?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're incorporated" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are periodic evaluations or assessments conducted to measure the impact of safety demonstrations on participants' safety awareness, behavior, and preparedness?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>What measures are taken to continuously improve the content, delivery methods, and overall quality of safety demonstrations based on feedback and evaluation findings?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the measures" />  
                    </div>
                </div>

            </form>
        </main>
    </div>
  )
}

export default SafetyDemonstrationsFormPage;