import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function FireDrillsFormPage() {
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
            <h1>Fire Drills Assessment</h1>
        </header>

        <main className="form-container">
            <form>
                {/* 3.2.1.1.4 Fire Drills */}
                <h2>Understanding of Evacuation Procedures:</h2>
                <div className="form-section">
                    <label>Are students educated on the importance of fire drills and their role in evacuating the building safely during a fire emergency?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>
                
                <div className="form-section">
                    <label>How are students instructed on the specific steps to follow during a fire drill, including how to quickly and calmly exit the building via designated evacuation routes and assembly points?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're instructed" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What measures are taken to ensure that students comprehend the evacuation procedures, including the use of visual aids, practice drills, and verbal instructions tailored to different age groups and learning styles?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the measures" />  
                    </div>
                </div>

                <h2>Recognition of Fire Alarm Signals:</h2>
                <div className="form-section">
                    <label>Are students familiarized with the various types of fire alarm signals used within the school, including auditory alarms, visual strobes, and digital alert systems?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are students trained to recognize the distinct sound or visual cues of a fire alarm and differentiate them from other emergency alerts or routine announcements?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're trained" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What strategies are employed to reinforce students' ability to react promptly to fire alarm signals, emphasizing the importance of immediate evacuation without hesitation or delay?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the strategies" />  
                    </div>
                </div>

                <h2>Response to Smoke and Fire Hazards:</h2>
                <div className="form-section">
                    <label>Are students educated on the potential hazards posed by smoke, flames, heat, and toxic gases in the event of a fire, as well as strategies for minimizing exposure and avoiding injury?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are students taught to identify common sources of ignition and fire spread, such as electrical appliances, flammable materials, cooking equipment, and combustible furnishings, and to report any fire-related concerns to responsible adults?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're taught" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What practical demonstrations or simulations are conducted to simulate fire scenarios, allowing students to experience simulated smoke conditions, practice low crawling techniques, and use emergency exit aids like fire extinguishers or fire blankets under supervision?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the demonstrations/simulations" />  
                    </div>
                </div>

                <h2>Role of Fire Wardens and Monitors:</h2>
                <div className="form-section">
                    <label>Are students introduced to the concept of fire wardens or monitors, responsible individuals designated to assist with evacuation procedures, conduct headcounts, and provide guidance or assistance to classmates during fire drills?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are students selected or trained to serve as fire wardens or monitors, and what specific duties or responsibilities are assigned to them before, during, and after fire drills to ensure effective coordination and communication?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're selected/taught" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What mechanisms are in place to recognize and commend the contributions of student fire wardens or monitors, fostering a sense of leadership, responsibility, and teamwork in promoting fire safety within the school community?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the mechanisms" />  
                    </div>
                </div>

                <h2>Post-Drill Debriefing and Feedback:</h2>
                <div className="form-section">
                    <label>Are students given the opportunity to participate in post-drill debriefing sessions or discussions to reflect on their performance, identify areas for improvement, and share feedback or suggestions for enhancing future fire drills?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are student observations, concerns, or questions addressed during debriefing sessions, and what actions are taken to address any identified gaps, misconceptions, or safety concerns raised by participants?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're addressed" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What mechanisms are in place to document and incorporate lessons learned from fire drills into ongoing safety training and emergency preparedness initiatives, ensuring continuous improvement in the school's fire evacuation procedures and protocols?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the mechanisms" />  
                    </div>
                </div>

            </form>
        </main>
    </div>
  )
}

export default FireDrillsFormPage;