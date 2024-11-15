import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function BasicFirstAidTechniquesFormPage() {
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
            <h1>Basic First Aid Techniques Assessment</h1>
        </header>

        <main className="form-container">
            <form>
                {/* 3.1.1.2.5 Basic First Aid Techniques */}
                <h2>Curriculum Coverage and Depth:</h2>
                <div className="form-section">
                    <label>How comprehensively are basic first aid techniques, such as wound care, bleeding control, bandaging, splinting, and patient assessment, covered in staff training programs?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how it's comprehensive" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are training modules structured to provide a balance of theoretical knowledge, practical skills demonstrations, and hands-on practice sessions?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>To what extent do training materials and resources address the application of basic first aid techniques in various emergency scenarios encountered in the school environment?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how it address the techniques" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are staff members trained to recognize common signs and symptoms of medical emergencies and injuries that may require immediate first aid intervention?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are staff members assessed or evaluated to ensure proficiency in applying basic first aid techniques in simulated or real-life emergency situations?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're accessed/evaluated" />  
                    </div>
                </div>

                <h2>Hands-on Skills Practice:</h2>
                <div className="form-section">
                    <label>What opportunities are provided for staff members to practice and demonstrate basic first aid techniques in simulated scenarios, role-playing exercises, or skills stations?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the opporrtunities" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are hands-on practice sessions conducted using realistic training props, medical manikins, or simulated casualties to simulate various injury types and emergency scenarios?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are staff members guided and supported by certified instructors, facilitators, or subject matter experts during hands-on skills practice sessions?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're guided/supported" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are staff members encouraged to actively participate in skills practice activities and receive constructive feedback on their performance?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>What mechanisms are in place to reinforce learning and encourage ongoing skills development beyond initial training sessions?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the mechanisms" />  
                    </div>
                </div>

                <h2>Integration with Emergency Response Plans:</h2>
                <div className="form-section">
                    <label>How are basic first aid techniques integrated into broader emergency response plans, procedures, and protocols?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're integrated" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are staff members trained to recognize and prioritize life-threatening conditions and administer basic first aid interventions in accordance with established protocols and medical guidelines?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How do staff members coordinate and communicate with other responders, emergency services, or healthcare providers when providing basic first aid assistance during emergencies?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're coordinated/communicate" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What provisions are in place to ensure continuity of care and seamless transition of injured or ill individuals to higher levels of medical care?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the provisions" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are staff members trained to document and report basic first aid interventions within the school's incident reporting system or medical logbook?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Continuity of Care and Follow-up Procedures:</h2>
                <div className="form-section">
                    <label>How are injured or ill individuals managed and monitored following basic first aid interventions?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're managed" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What procedures are in place to ensure continuity of care and facilitate patient transport or transfer to higher levels of medical care?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the procedures" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are staff members trained to provide emotional support, reassurance, and ongoing monitoring to individuals receiving basic first aid interventions?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are follow-up procedures implemented to document incidents, assess outcomes, and provide post-incident debriefing or support?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're implemented" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are staff members familiar with community resources and referral pathways for individuals requiring additional medical or psychological support beyond basic first aid?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Documentation and Reporting Requirements:</h2>
                <div className="form-section">
                    <label>How are basic first aid interventions documented, recorded, and reported within the school's incident reporting system or electronic health record system?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're documented" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What training or guidance is provided to staff members on the importance of timely and accurate documentation, confidentiality requirements, and legal considerations?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the training/guidance" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are staff members trained to document patient assessments, treatments provided, and follow-up actions taken in a clear, concise, and objective manner?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are medical records or incident reports reviewed and analyzed to identify trends, evaluate response effectiveness, and inform continuous improvement efforts?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they are reviewed and analyzed" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are staff members aware of their responsibilities regarding incident reporting, documentation protocols, and data privacy regulations when documenting basic first aid treatments?</label>
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

export default BasicFirstAidTechniquesFormPage;
