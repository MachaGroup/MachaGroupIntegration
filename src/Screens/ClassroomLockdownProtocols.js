import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function ClassroomLockdownProtocolsFormPage() {
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
            <h1>Classroom Lockdown Procedures Assessment</h1>
        </header>

        <main className="form-container">
            <form>
                {/* 2.2.1.2.1 Classroom Lockdown Procedures */}
                <h2>2.2.1.2.1 Door Locks:</h2>
                <div className="form-section">
                    <label>2.2.1.2.1.1 Are classroom doors equipped with locks that can be securely engaged from the inside?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>2.2.1.2.1.2 Do locks meet safety standards and regulations for lockdown procedures?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>2.2.1.2.1.3 Are locks easy to operate and reliably secure, even under stress or pressure?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                { /* 2.2.1.2.2 Barricading Mechanisms*/ }
                <h2>2.2.1.2.2 Barricading Mechanisms:</h2>
                <div className="form-section">
                    <label>Are there barricading mechanisms available in classrooms to reinforce door security during lockdowns?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="List the mechanisms" />
                    </div>
                </div>

                <div className="form-section">
                    <label>Do barricading devices effectively prevent unauthorized entry and provide additional time for occupants to seek shelter or escape?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are barricading devices designed to be quickly deployed and easily removed by authorized personnel?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Training and Drills:</h2>
                <div className="form-section">
                    <label>Are staff members and students trained in lockdown procedures, including how to barricade doors effectively?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are drills conducted regularly to practice lockdown scenarios and ensure familiarity with procedures?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are debriefings held after drills to review performance, identify areas for improvement, and reinforce best practices?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Communication Systems:</h2>
                <div className="form-section">
                    <label>Is there a communication system in place to alert occupants of lockdowns and provide instructions?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the communication system" />
                    </div>
                </div>

                <div className="form-section">
                    <label>Are emergency communication devices accessible in classrooms for contacting authorities or requesting assistance?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="List the devices" />
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there a designated protocol for reporting suspicious activity or potential threats to school administrators or security personnel?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the protocol" />
                    </div>
                </div>

                <h2>Safe Zones and Hiding Places:</h2>
                <div className="form-section">
                    <label>Are there designated safe zones or hiding places within classrooms where occupants can seek shelter during lockdowns?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the safe zones" />
                    </div>
                </div>

                <div className="form-section">
                    <label>Are these areas strategically located to provide cover and concealment from potential threats?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Have safe zones been assessed for potential vulnerabilities and reinforced as needed to enhance security?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Coordination with Authorities:</h2>
                <div className="form-section">
                    <label>Is there coordination between school personnel and local law enforcement agencies on lockdown procedures and response protocols?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are law enforcement agencies familiar with school layouts and lockdown plans to facilitate their response in the event of an emergency?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>
                
                <div className="form-section">
                    <label>Are there regular meetings or exercises conducted with law enforcement to review and refine lockdown procedures?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Parent and Guardian Communication:</h2>
                <div className="form-section">
                    <label>Are parents and guardians informed of lockdown procedures and expectations for student safety?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there a communication plan in place for notifying parents and guardians of lockdown events and providing updates as needed?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the plan" />
                    </div>
                </div>

                <div className="form-section">
                    <label>Are resources or support services available to assist families in coping with the emotional impact of lockdown situations?</label>
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

export default ClassroomLockdownProtocolsFormPage;