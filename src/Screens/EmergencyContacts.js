import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function EmergencyContactsFormPage() {
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
            <h1>Emergency Contact Assessment</h1>
        </header>

        <main className="form-container">
            <form>
                {/* 3.3.1.2.2 Recertification Schedule */}
                <h2>Contact Information Management:</h2>
                <div className="form-section">
                    <label>How does the school or educational institution collect, manage, and update emergency contact information for students and their families?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they collect" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What systems, databases, or platforms are utilized to maintain accurate and up-to-date contact details, including phone numbers, email addresses, and alternative emergency contacts?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the systems/databases/platforms" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are parents provided with opportunities and mechanisms to review, verify, and update their contact information regularly, such as through online portals, forms, or designated communication channels?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Communication Protocols:</h2>
                <div className="form-section">
                    <label>What protocols or procedures are in place to initiate and facilitate communication with parents in the event of emergencies, incidents, or critical situations occurring at the school?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the protocols/procedures" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are emergency contact lists accessed, activated, or utilized by school staff, administrators, or safety personnel to notify parents of safety alerts, school closures, or other urgent messages?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're accessed" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are communication channels diversified to accommodate varying preferences, needs, or circumstances of parents, such as text messages, emails, phone calls, or automated alerts?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Verification and Authentication:</h2>
                <div className="form-section">
                    <label>How does the school verify the identity and authority of individuals contacting or requesting information about students during emergency situations or crises?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they verify id" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are procedures established to authenticate the identity of parents, guardians, or authorized emergency contacts before disclosing sensitive information or providing updates regarding student safety or well-being?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the procedures" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What measures are implemented to protect the privacy, confidentiality, and security of student and parent information during emergency communications and interactions?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the measures" />  
                    </div>
                </div>

                <h2>Accessibility and Inclusivity:</h2>
                <div className="form-section">
                    <label>How does the school ensure that emergency contact information and communication methods are accessible and inclusive to all parents, regardless of language, literacy, or technological proficiency?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they ensures its accessible" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are accommodations provided for parents with disabilities, communication barriers, or unique needs to ensure they receive timely and relevant emergency notifications and updates?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>What outreach efforts or support services are available to assist parents in updating or verifying their contact information, especially those facing challenges or limitations in accessing school resources?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the efforts/support services" />  
                    </div>
                </div>

                <h2>Feedback and Continuous Improvement:</h2>
                <div className="form-section">
                    <label>Are mechanisms in place to gather feedback from parents regarding their experiences, preferences, and satisfaction with emergency communication processes and protocols?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the meachanisms" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How does the school utilize feedback from parents to identify areas for improvement, address communication gaps, or enhance the effectiveness of emergency contact procedures?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they utilize feedback" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are opportunities provided for parents to participate in collaborative discussions, focus groups, or surveys aimed at evaluating and refining emergency communication strategies and practices?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the opportunities" />  
                    </div>
                </div>

            </form>
        </main>
    </div>
  )
}

export default EmergencyContactsFormPage;