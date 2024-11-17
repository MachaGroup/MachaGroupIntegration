import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function RecertificationScheduleFormPage() {
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
            <h1>Recertification Schedule Assessment</h1>
        </header>

        <main className="form-container">
            <form>
                {/* 3.1.1.1.3 Recertification Schedule */}
                <h2>Recertification Frequency:</h2>
                <div className="form-section">
                    <label>What is the established frequency for recertifying staff members in First Aid/CPR training (e.g., every two years, annually)?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the method for recertiifying" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How is the recertification schedule determined, and are there specific factors or regulations guiding this decision?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how the schedule is determined" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there variations in recertification requirements based on job roles, departmental needs, or regulatory standards?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Notification and Reminder System:</h2>
                <div className="form-section">
                    <label>How are staff members notified of upcoming recertification deadlines for First Aid/CPR training?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how the staff is notified" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there a reminder system in place to alert staff members well in advance of their recertification expiration dates?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>What communication channels are utilized to ensure that staff members receive timely reminders about recertification requirements?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="List the communication channels" />  
                    </div>
                </div>

                <h2>Recertification Process:</h2>
                <div className="form-section">
                    <label>What is the process for staff members to recertify in First Aid/CPR training, and are there specific steps or procedures they need to follow?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the process" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are recertification courses offered on-site, online, or through external training providers, and how are these options determined?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are staff members supported in completing recertification requirements, such as scheduling flexibility or financial assistance?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how the staff is supported to complete requirements" />  
                    </div>
                </div>

                <h2>Documentation and Records:</h2>
                <div className="form-section">
                    <label>How are records of staff members' recertification status and completion maintained, and are these records kept up to date?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how the records are maintained" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are recertification certificates or credentials issued to staff members upon successful completion, and how are these documents distributed or stored?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they are distributed or stored" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What measures are in place to ensure the accuracy and integrity of recertification records, including verification of course completion and instructor credentials?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the measures" />  
                    </div>
                </div>

                <h2>Evaluation and Feedback:</h2>
                <div className="form-section">
                    <label>How is the effectiveness of the recertification process evaluated, and are there mechanisms for gathering feedback from staff members?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the mechanisms" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are staff members given the opportunity to provide input on the recertification courses, instructors, or content to identify areas for improvement?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are lessons learned from previous recertification cycles used to refine and enhance the recertification process for future iterations?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how lessons are learned" />  
                    </div>
                </div>

            </form>
        </main>
    </div>
  )
}

export default RecertificationScheduleFormPage;