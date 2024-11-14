import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function EvacuationProcedures2FormPage() {
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
            <h1>Evacuation Procedures Assessment</h1>
        </header>

        <main className="form-container">
            <form>
                {/* 3.1.1.2.10 Evacuation Procedures */}
                <h2>Evacuation Plan Development:</h2>
                <div className="form-section">
                    <label>How are evacuation procedures developed, documented, and communicated to staff members, students, and visitors within the school community?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're developed" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are evacuation plans based on thorough assessments of building layouts, occupancy characteristics, fire protection systems, and potential hazards to ensure safe and efficient evacuation routes and assembly areas?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>What considerations are given to factors such as building occupancy, accessibility requirements, special needs populations, and coordination with local emergency responders in the development of evacuation plans?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the considerations" />  
                    </div>
                </div>

                <h2>Floor Plans and Evacuation Routes:</h2>
                <div className="form-section">
                    <label>Are floor plans and evacuation routes prominently displayed, clearly marked, and readily accessible in key locations throughout the school premises?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Do evacuation maps include detailed floor layouts, exit locations, primary and secondary evacuation routes, assembly areas, and designated muster points for accountability and headcount purposes?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are evacuation routes tailored to different areas of the school campus, such as classrooms, offices, gymnasiums, auditoriums, laboratories, or specialized facilities, to accommodate varying occupant loads and mobility considerations?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're tailored" />  
                    </div>
                </div>

                <h2>Staff Training and Familiarization:</h2>
                <div className="form-section">
                    <label>How are staff members trained on evacuation procedures, route navigation, assembly area assignments, and roles and responsibilities during evacuation drills and real emergencies?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're trained" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are evacuation training sessions conducted regularly to familiarize staff members with evacuation routes, exit procedures, emergency equipment locations, and communication protocols?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>What measures are in place to ensure staff members are equipped with the knowledge, skills, and confidence to lead and assist occupants during evacuations and account for individuals with special needs or mobility challenges?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the measures" />  
                    </div>
                </div>

                <h2>Drill Execution and Evaluation:</h2>
                <div className="form-section">
                    <label>How frequently are evacuation drills conducted, and what criteria are used to assess the effectiveness, realism, and compliance of drill exercises with established evacuation procedures?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how frequent" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are evacuation drills tailored to simulate different scenarios, challenges, and contingencies to test the responsiveness, coordination, and decision-making capabilities of staff members and occupants?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are evacuation drill outcomes evaluated, debriefed, and used to identify areas for improvement, reinforce best practices, and enhance the overall readiness and resilience of the school community?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're evaluated" />  
                    </div>
                </div>

                <h2>Integration with Emergency Response Plans:</h2>
                <div className="form-section">
                    <label>How are evacuation procedures integrated into broader emergency response plans, protocols, and coordination efforts within the school environment?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're integrated" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are evacuation procedures synchronized with other emergency response actions, such as lockdowns, sheltering, medical response, or reunification processes, to ensure a comprehensive and coordinated approach to emergency management?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>What mechanisms are in place to communicate evacuation orders, monitor evacuation progress, and coordinate with external agencies, such as fire departments, law enforcement, or emergency management authorities, during evacuation operations?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the mechanisms" />  
                    </div>
                </div>

            </form>
        </main>
    </div>
  )
}

export default EvacuationProcedures2FormPage;
import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function EvacuationProcedures2FormPage() {
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
            <h1>Evacuation Procedures Assessment</h1>
        </header>

        <main className="form-container">
            <form>
                {/* 3.1.1.2.10 Evacuation Procedures */}
                <h2>Evacuation Plan Development:</h2>
                <div className="form-section">
                    <label>How are evacuation procedures developed, documented, and communicated to staff members, students, and visitors within the school community?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're developed" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are evacuation plans based on thorough assessments of building layouts, occupancy characteristics, fire protection systems, and potential hazards to ensure safe and efficient evacuation routes and assembly areas?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>What considerations are given to factors such as building occupancy, accessibility requirements, special needs populations, and coordination with local emergency responders in the development of evacuation plans?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the considerations" />  
                    </div>
                </div>

                <h2>Floor Plans and Evacuation Routes:</h2>
                <div className="form-section">
                    <label>Are floor plans and evacuation routes prominently displayed, clearly marked, and readily accessible in key locations throughout the school premises?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Do evacuation maps include detailed floor layouts, exit locations, primary and secondary evacuation routes, assembly areas, and designated muster points for accountability and headcount purposes?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are evacuation routes tailored to different areas of the school campus, such as classrooms, offices, gymnasiums, auditoriums, laboratories, or specialized facilities, to accommodate varying occupant loads and mobility considerations?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're tailored" />  
                    </div>
                </div>

                <h2>Staff Training and Familiarization:</h2>
                <div className="form-section">
                    <label>How are staff members trained on evacuation procedures, route navigation, assembly area assignments, and roles and responsibilities during evacuation drills and real emergencies?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're trained" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are evacuation training sessions conducted regularly to familiarize staff members with evacuation routes, exit procedures, emergency equipment locations, and communication protocols?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>What measures are in place to ensure staff members are equipped with the knowledge, skills, and confidence to lead and assist occupants during evacuations and account for individuals with special needs or mobility challenges?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the measures" />  
                    </div>
                </div>

                <h2>Drill Execution and Evaluation:</h2>
                <div className="form-section">
                    <label>How frequently are evacuation drills conducted, and what criteria are used to assess the effectiveness, realism, and compliance of drill exercises with established evacuation procedures?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how frequent" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are evacuation drills tailored to simulate different scenarios, challenges, and contingencies to test the responsiveness, coordination, and decision-making capabilities of staff members and occupants?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are evacuation drill outcomes evaluated, debriefed, and used to identify areas for improvement, reinforce best practices, and enhance the overall readiness and resilience of the school community?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're evaluated" />  
                    </div>
                </div>

                <h2>Integration with Emergency Response Plans:</h2>
                <div className="form-section">
                    <label>How are evacuation procedures integrated into broader emergency response plans, protocols, and coordination efforts within the school environment?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're integrated" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are evacuation procedures synchronized with other emergency response actions, such as lockdowns, sheltering, medical response, or reunification processes, to ensure a comprehensive and coordinated approach to emergency management?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>What mechanisms are in place to communicate evacuation orders, monitor evacuation progress, and coordinate with external agencies, such as fire departments, law enforcement, or emergency management authorities, during evacuation operations?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the mechanisms" />  
                    </div>
                </div>

            </form>
        </main>
    </div>
  )
}

export default EvacuationProcedures2FormPage;