import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function SecurityGuardsPage() {
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
        <h1>1.1.1.1.4. Security Guards Assessment</h1>
      </header>

      <main className="form-container">
        <form>
          {/* Training and Qualifications */}
          <h2>Training and Qualifications:</h2>
          <div className="form-section">
            <label>Have security guards received adequate training in security procedures, emergency response, and conflict resolution?</label>
            <div>
              <input type="radio" name="training" value="yes" /> Yes
              <input type="radio" name="training" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are they certified or licensed to work as security personnel in your jurisdiction?</label>
            <div>
              <input type="radio" name="certified" value="yes" /> Yes
              <input type="radio" name="certified" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Do they receive ongoing training to stay updated on security protocols and best practices?</label>
            <div>
              <input type="radio" name="ongoing-training" value="yes" /> Yes
              <input type="radio" name="ongoing-training" value="no" /> No
            </div>
          </div>

          {/* Professional Conduct */}
          <h2>Professional Conduct:</h2>
          <div className="form-section">
            <label>Do security guards demonstrate professionalism, courtesy, and respect when interacting with students, staff, and visitors?</label>
            <div>
              <input type="radio" name="professionalism" value="yes" /> Yes
              <input type="radio" name="professionalism" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are they properly uniformed and equipped to perform their duties effectively?</label>
            <div>
              <input type="radio" name="uniformed" value="yes" /> Yes
              <input type="radio" name="uniformed" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Do they adhere to established codes of conduct and ethical standards?</label>
            <div>
              <input type="radio" name="codes-of-conduct" value="yes" /> Yes
              <input type="radio" name="codes-of-conduct" value="no" /> No
            </div>
          </div>

          {/* Observation and Reporting */}
          <h2>Observation and Reporting:</h2>
          <div className="form-section">
            <label>Are security guards vigilant and observant of their surroundings, identifying and reporting any suspicious activities or security concerns?</label>
            <div>
              <input type="radio" name="vigilant" value="yes" /> Yes
              <input type="radio" name="vigilant" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Do they conduct regular patrols and inspections of the premises to deter unauthorized access and monitor for potential threats?</label>
            <div>
              <input type="radio" name="patrols" value="yes" /> Yes
              <input type="radio" name="patrols" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are incident reports accurately documented and promptly submitted following security incidents or breaches?</label>
            <div>
              <input type="radio" name="incident-reports" value="yes" /> Yes
              <input type="radio" name="incident-reports" value="no" /> No
            </div>
          </div>

          {/* Emergency Response and Crisis Management */}
          <h2>Emergency Response and Crisis Management:</h2>
          <div className="form-section">
            <label>Are security guards trained to respond effectively to emergencies, such as medical emergencies, fires, or security breaches?</label>
            <div>
              <input type="radio" name="emergency-response" value="yes" /> Yes
              <input type="radio" name="emergency-response" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Do they know how to initiate lockdown procedures, evacuate occupants, and coordinate with emergency services?</label>
            <div>
              <input type="radio" name="lockdown-procedures" value="yes" /> Yes
              <input type="radio" name="lockdown-procedures" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there established communication protocols for security guards to report emergencies and request assistance?</label>
            <div>
              <input type="radio" name="communication-protocols" value="yes" /> Yes
              <input type="radio" name="communication-protocols" value="no" /> No
            </div>
          </div>

          {/* Access Control and Visitor Management */}
          <h2>Access Control and Visitor Management:</h2>
          <div className="form-section">
            <label>Do security guards enforce access control measures, verifying the identity of individuals and ensuring they have proper authorization to enter?</label>
            <div>
              <input type="radio" name="access-control" value="yes" /> Yes
              <input type="radio" name="access-control" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are visitor management procedures in place, including registration, issuance of visitor badges, and monitoring of visitor activities?</label>
            <div>
              <input type="radio" name="visitor-management" value="yes" /> Yes
              <input type="radio" name="visitor-management" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are security guards trained to handle confrontational situations or unauthorized entry attempts diplomatically and assertively?</label>
            <div>
              <input type="radio" name="confrontational-situations" value="yes" /> Yes
              <input type="radio" name="confrontational-situations" value="no" /> No
            </div>
          </div>

          {/* Collaboration and Communication */}
          <h2>Collaboration and Communication:</h2>
          <div className="form-section">
            <label>Do security guards collaborate effectively with other stakeholders, such as school administrators, law enforcement, and emergency responders?</label>
            <div>
              <input type="radio" name="collaboration" value="yes" /> Yes
              <input type="radio" name="collaboration" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are they able to communicate clearly and efficiently using two-way radios, phones, or other communication devices?</label>
            <div>
              <input type="radio" name="communication-devices" value="yes" /> Yes
              <input type="radio" name="communication-devices" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there regular meetings or debriefings to discuss security issues, share information, and coordinate activities?</label>
            <div>
              <input type="radio" name="meetings" value="yes" /> Yes
              <input type="radio" name="meetings" value="no" /> No
            </div>
          </div>

          {/* Compliance with Regulations */}
          <h2>Compliance with Regulations:</h2>
          <div className="form-section">
            <label>Do security guards comply with relevant regulations, laws, and industry standards governing security operations?</label>
            <div>
              <input type="radio" name="compliance" value="yes" /> Yes
              <input type="radio" name="compliance" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there specific requirements or guidelines for security guards outlined by regulatory authorities or industry associations that need to be met?</label>
            <div>
              <input type="text" name="regulatory-requirements" placeholder="Enter any regulatory requirements" />
            </div>
          </div>

          <div className="form-section">
            <label>Are security guard services subject to audits, inspections, or certifications to verify compliance with applicable standards?</label>
            <div>
              <input type="radio" name="audits" value="yes" /> Yes
              <input type="radio" name="audits" value="no" /> No
            </div>
          </div>

          {/* Performance Evaluation and Feedback */}
          <h2>Performance Evaluation and Feedback:</h2>
          <div className="form-section">
            <label>Is there a process for evaluating the performance of security guards, providing feedback, and addressing any areas for improvement?</label>
            <div>
              <input type="radio" name="performance-evaluation" value="yes" /> Yes
              <input type="radio" name="performance-evaluation" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are security guard contracts or agreements structured to incentivize high performance and accountability?</label>
            <div>
              <input type="radio" name="incentives" value="yes" /> Yes
              <input type="radio" name="incentives" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there mechanisms for receiving feedback from students, staff, and visitors regarding the effectiveness and professionalism of security guards?</label>
            <div>
              <input type="radio" name="feedback" value="yes" /> Yes
              <input type="radio" name="feedback" value="no" /> No
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}

export default SecurityGuardsPage;
