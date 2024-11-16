import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function StudentHandbooksFormPage() {
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
            <h1>Student Handbooks Assessment</h1>
        </header>

        <main className="form-container">
            <form>
                {/* 3.2.1.1.2 Student Handbooks */}
                <h2>Content and Coverage:</h2>
                <div className="form-section">
                    <label>What emergency procedures and protocols are included in the student handbooks, and how comprehensively are they covered?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the procedures/protocols" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are emergency procedures outlined in a clear, concise, and easily understandable manner within the student handbooks?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Do the student handbooks provide detailed instructions and guidance on actions to take during various types of emergencies, such as evacuations, lockdowns, or medical incidents?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are additional resources or references provided in the student handbooks to support understanding and implementation of emergency procedures?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Distribution and Accessibility:</h2>
                <div className="form-section">
                    <label>How are student handbooks distributed to students, and are they readily accessible to all members of the student body?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how it's distributed" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are student handbooks provided in multiple formats to accommodate different learning preferences or accessibility needs (e.g., print, digital, audio)?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>What measures are in place to ensure that student handbooks are regularly updated and maintained to reflect current emergency procedures and protocols?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the measures" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are student handbooks available in languages other than English to support students with limited English proficiency or non-native speakers?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Training and Familiarization:</h2>
                <div className="form-section">
                    <label>How are students trained on the contents of the student handbooks and familiarized with emergency procedures?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe students are trained" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are orientation sessions, classroom discussions, or interactive activities conducted to introduce students to the information contained in the student handbooks?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>What strategies are employed to reinforce key concepts and ensure retention of emergency procedures among students?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the strategies" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are student leaders, peer mentors, or older students involved in assisting with the dissemination and explanation of information from the student handbooks?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Integration with Curriculum:</h2>
                <div className="form-section">
                    <label>How are the contents of the student handbooks integrated into the school curriculum to reinforce emergency preparedness education?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how it's integrated" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are specific lessons or activities designed to align with the emergency procedures outlined in the student handbooks?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are teachers and staff members encouraged to reference and reinforce information from the student handbooks in their instructional practices?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're encouraged" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are opportunities provided for students to apply knowledge and skills related to emergency procedures in simulated scenarios or real-life situations?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the opportunities" />  
                    </div>
                </div>

                <h2>Feedback and Improvement:</h2>
                <div className="form-section">
                    <label>Are mechanisms in place to gather feedback from students regarding the usefulness and effectiveness of the information provided in the student handbooks?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the mechanisms" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are suggestions or concerns raised by students regarding emergency procedures in the student handbooks addressed and incorporated into revisions?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how it's addressed" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are periodic reviews and evaluations conducted to assess the impact of the student handbooks on student preparedness and response to emergencies?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>What measures are taken to continuously improve the content, format, and accessibility of the student handbooks based on feedback and evaluation findings?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the measures" />  
                    </div>
                </div>

            </form>
        </main>
    </div>
  )
}

export default StudentHandbooksFormPage;