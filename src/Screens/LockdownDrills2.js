import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function LockdownDrills2FormPage() {
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
            <h1>Lockdown Drills Assessment</h1>
        </header>

        <main className="form-container">
            <form>
                {/* 3.2.1.1.5 Lockdown Drills */}
                <h2>Understanding of Lockdown Procedures:</h2>
                <div className="form-section">
                    <label>How are students educated on the purpose and importance of lockdown drills, including the concept of sheltering in place and securing classrooms or designated safe areas during a perceived threat or security incident?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're educated" />  
                    </div>
                </div>
                
                <div className="form-section">
                    <label>Are students provided with clear and concise instructions on the specific actions to take during a lockdown, such as moving away from doors and windows, remaining silent, and following teacher or staff directives to maintain safety and minimize visibility to potential threats?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Recognition of Lockdown Signals:</h2>
                <div className="form-section">
                    <label>Are students trained to recognize the signals or announcements that initiate a lockdown, such as coded alerts, audible alarms, visual cues, or digital notifications, and to differentiate them from other routine announcements or drills?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are students prepared to respond quickly and decisively to lockdown signals, including the importance of taking immediate shelter, staying out of sight, and remaining quiet to avoid drawing attention to their location?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're prepared" />  
                    </div>
                </div>

                <h2>Securement of Classroom Environment:</h2>
                <div className="form-section">
                    <label>What strategies are employed to instruct students on fortifying their classroom or shelter area during a lockdown, such as locking doors, barricading entry points, closing blinds or curtains, and turning off lights or electronic devices to minimize visibility and enhance security?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the strategies" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are students encouraged to utilize available resources and improvised tools, such as heavy furniture, bookshelves, or classroom supplies, to reinforce doorways, create physical barriers, or shield themselves from potential threats while awaiting further instructions or assistance?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're encouraged" />  
                    </div>
                </div>

                <h2>Communication and Coordination:</h2>
                <div className="form-section">
                    <label>How are students briefed on the importance of communication and cooperation during a lockdown, including the need to remain calm, follow teacher or staff directives, and assist classmates who may require support or reassurance during a stressful situation?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're briefed" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are students encouraged to report any suspicious activity, unusual noises, or signs of danger discreetly to designated adults or authorities, using predetermined signals or communication methods to convey information without compromising their safety or alerting potential intruders?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Post-Drill Reflection and Review:</h2>
                <div className="form-section">
                    <label>Are students given the opportunity to participate in debriefing sessions or discussions following lockdown drills, allowing them to share their observations, experiences, and feedback on the effectiveness of lockdown procedures and protocols?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are student perspectives and insights from lockdown drills incorporated into ongoing safety planning, risk assessments, and emergency preparedness efforts, informing revisions or enhancements to lockdown procedures, communication protocols, or staff training initiatives?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe they're perspectives" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What measures are in place to address any concerns, questions, or misconceptions raised by students during post-drill debriefings, ensuring that all participants feel supported, informed, and prepared to respond confidently in the event of a real lockdown situation?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the measures" />  
                    </div>
                </div>
            
            </form>
        </main>
    </div>
  )
}

export default LockdownDrills2FormPage;