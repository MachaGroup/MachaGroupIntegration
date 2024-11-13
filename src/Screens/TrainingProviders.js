import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function TrainingProvidersFormPage() {
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
            <h1>Training Providers Assessment</h1>
      </header>

        <main className="form-container">
            <form>
                {/* 3.1.1.1.1 Training Providers */}
                <h2>Certification and Accreditation:</h2>
                <div className="form-section">
                    <label>Are training providers certified and accredited to deliver First Aid/CPR training programs?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Do training providers adhere to recognized standards and guidelines for First Aid/CPR training, such as those established by organizations like the American Red Cross or the American Heart Association?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Instructor Qualifications:</h2>
                <div className="form-section">
                    <label>Are instructors employed by training providers qualified and experienced in delivering First Aid/CPR training?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Do instructors possess relevant certifications and qualifications, such as Certified First Aid/CPR Instructor credentials?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="List the certifications/qualifications" />  
                    </div>
                </div>

                <h2>Curriculum Content:</h2>
                <div className="form-section">
                    <label>Is the training curriculum comprehensive and up-to-date, covering essential topics related to First Aid/CPR procedures, techniques, and best practices?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Does the curriculum align with recognized standards and guidelines for First Aid/CPR training?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Training Delivery:</h2>
                <div className="form-section">
                    <label>Are training sessions conducted in a suitable training environment that allows for hands-on practice and skills demonstration?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are training sessions delivered using a variety of instructional methods and resources to accommodate different learning styles and preferences?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Participant Engagement:</h2>
                <div className="form-section">
                    <label>Are training sessions interactive and engaging, encouraging active participation and skills development among participants?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are opportunities provided for participants to ask questions, seek clarification, and practice First Aid/CPR techniques under instructor supervision?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Assessment and Evaluation:</h2>
                <div className="form-section">
                    <label>Are participants assessed on their understanding and proficiency in First Aid/CPR procedures through written tests and practical skills assessments?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are instructors responsible for evaluating participant performance and providing constructive feedback for improvement?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Certification and Recertification:</h2>
                <div className="form-section">
                    <label>Are participants awarded certifications upon successful completion of First Aid/CPR training courses?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there a process in place for recertifying staff members on a regular basis to ensure that their skills and knowledge remain current and up-to-date?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the process" />  
                    </div>
                </div>

                <h2>Feedback and Improvement:</h2>
                <div className="form-section">
                    <label>Are feedback mechanisms in place to gather input from participants regarding the quality and effectiveness of First Aid/CPR training programs?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the feedback mechanisms" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are recommendations for enhancing training content, delivery methods, or instructor performance considered and implemented based on feedback received?</label>
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

export default TrainingProvidersFormPage;