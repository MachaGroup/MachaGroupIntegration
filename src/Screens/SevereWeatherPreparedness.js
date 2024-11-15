import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function SevereWeatherPreparednessFormPage() {
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
            <h1>Severe Weather Preparedness Assessment</h1>
        </header>

        <main className="form-container">
            <form>
                {/* 3.2.1.1.6 Severe Weather Preparedness */}
                <h2>Understanding of Severe Weather Risks:</h2>
                <div className="form-section">
                    <label>How are students educated about the potential risks associated with severe weather events such as tornadoes, hurricanes, thunderstorms, or floods, including the specific threats posed to their geographic location and the school environment?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're educated" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are students taught to recognize the warning signs of impending severe weather conditions, such as changes in sky color, cloud formations, temperature, or wind patterns, and to take proactive measures to stay informed and prepared for possible emergencies?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Response to Severe Weather Alerts:</h2>
                <div className="form-section">
                    <label>What procedures are in place to promptly disseminate severe weather alerts and advisories to students and staff, utilizing multiple communication channels such as public address systems, digital displays, mobile alerts, or weather radios to ensure widespread awareness and timely response?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the procedures" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are students trained to respond to severe weather alerts, including the importance of seeking shelter in designated safe areas, moving away from windows or glass doors, and assuming protective positions to minimize exposure to flying debris or potential hazards?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're trained" />  
                    </div>
                </div>

                <h2>Sheltering and Safety Protocols:</h2>
                <div className="form-section">
                    <label>Are students familiarized with the specific sheltering and safety protocols associated with different types of severe weather events, such as tornado safety procedures involving seeking shelter in interior rooms or reinforced areas on lower levels of the building, away from exterior walls, doors, and windows?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are students instructed on the appropriate actions to take during severe weather events, including how to crouch low, cover their heads, and protect themselves from falling or flying objects while sheltering in place until the threat has passed or further instructions are provided?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're instructed" />  
                    </div>
                </div>

                <h2>Evacuation and Assembly Procedures:</h2>
                <div className="form-section">
                    <label>What plans are in place for evacuating students and staff from outdoor areas, temporary structures, or portable classrooms in anticipation of severe weather threats, ensuring that all individuals are directed to safe, predetermined assembly points or designated storm shelters in a prompt and orderly manner?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the plans" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are students trained to navigate evacuation routes, avoid potential hazards such as downed power lines or flooded areas, and follow instructions from designated personnel or emergency responders to facilitate a safe and efficient evacuation process?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're trained" />  
                    </div>
                </div>

                <h2>Post-Event Evaluation and Review:</h2>
                <div className="form-section">
                    <label>Are students given the opportunity to participate in post-event evaluations or debriefing sessions following severe weather incidents, allowing them to share their observations, experiences, and feedback on the effectiveness of sheltering procedures, communication protocols, and staff response efforts?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are student perspectives and insights from severe weather drills and real-world events used to inform ongoing safety planning, infrastructure improvements, or emergency preparedness initiatives aimed at enhancing the school's resilience and response capabilities to future severe weather events?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're informed" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What measures are taken to address any concerns, questions, or misconceptions raised by students during post-event debriefings, ensuring that all participants feel supported, informed, and prepared to respond confidently in the event of future severe weather emergencies?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the measures" />  
                    </div>
                </div>

            </form>
        </main>
    </div>
  )
}

export default SevereWeatherPreparednessFormPage;