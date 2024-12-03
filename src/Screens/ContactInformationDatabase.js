import logo from '../assets/MachaLogo.png';
import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS
import Navbar from "./Navbar";

function ContactInformationDatabaseFormPage() {
  const navigate = useNavigate();  // Initialize useNavigate hook for navigation

  // Function to handle back button
  const handleBack = () => {
    navigate(-1);  // Navigates to the previous page
  };

  return (
    <div className="form-page">
        <header className="header">
            <Navbar />
            {/* Back Button */}
        <button className="back-button" onClick={handleBack}>←</button> {/* Back button at the top */}
            <h1>Contact Information Database Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form>
                {/* 2.4.1.1.4 Contact Information Database */}
                <h2>Existence of Contact Information Database:</h2>
                <div className="form-section">
                    <label>Is there a centralized database or system in place to store contact information for individuals who will receive text/email alerts during emergencies?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Does the database include up-to-date contact details, such as phone numbers, email addresses, and preferred communication methods, for all relevant stakeholders?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Data Accuracy and Currency:</h2>
                <div className="form-section">
                    <label>How frequently is the contact information database reviewed and updated to ensure accuracy and currency?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="How frequent" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are procedures established to verify contact details periodically or in response to changes, such as staff turnover, new enrollments, or updates to contact preferences?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Inclusion of Key Stakeholders:</h2>
                <div className="form-section">
                    <label>Does the contact information database encompass a comprehensive list of key stakeholders, including staff members, students, parents/guardians, contractors, and external partners?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are contact details categorized or segmented based on roles, responsibilities, or affiliations to facilitate targeted communication during emergencies?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Accessibility and Security:</h2>
                <div className="form-section">
                    <label>Is the contact information database accessible to authorized personnel responsible for managing and disseminating emergency alerts?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are appropriate security measures implemented to protect the confidentiality, integrity, and availability of contact information stored in the database?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the security measures" />  
                    </div>
                </div>

                <h2>Integration with Alerting Systems:</h2>
                <div className="form-section">
                    <label>Is the contact information database integrated with text/email alerting systems to facilitate rapid and automated distribution of emergency notifications?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are procedures established for synchronizing or synchronizing contact information between the database and alerting systems to ensure consistency and reliability?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the procedures" />  
                    </div>
                </div>

                <h2>Opt-In/Opt-Out Mechanisms:</h2>
                <div className="form-section">
                    <label>Are mechanisms in place for individuals to opt in or opt out of receiving text/email alerts, and are these preferences documented and honored?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the mechanisms" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there a process for individuals to update their contact information or communication preferences, and are changes promptly reflected in the database and alerting systems?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the process" />  
                    </div>
                </div>

                <h2>Training and User Support:</h2>
                <div className="form-section">
                    <label>Are staff members trained on how to access and use the contact information database for sending emergency alerts?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Is user support provided to assist personnel in navigating the database, troubleshooting issues, and managing contact lists effectively?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Compliance with Privacy Regulations:</h2>
                <div className="form-section">
                    <label>Does the management of contact information adhere to applicable privacy regulations, such as the Family Educational Rights and Privacy Act (FERPA) or the Health Insurance Portability and Accountability Act (HIPAA)?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are protocols established for safeguarding personal data and obtaining consent for the collection and use of contact information for emergency communication purposes?</label>
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

export default ContactInformationDatabaseFormPage;