import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS


  function SecurityGatesPage() {
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
        <h1>Security Gates Assessment</h1>
      </header>

      <main className="form-container">
        <form>
          {/* 1.1.1.1.1.1 Functionality and Operation */}
          <h2>1.1.1.1.1.1 Functionality and Operation:</h2>
          <div className="form-section">
            <label>Are the security gates operational and functioning as intended?</label>
            <div>
              <input type="radio" name="gates-operational" value="yes" /> Yes
              <input type="radio" name="gates-operational" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Do the gates open and close smoothly without any mechanical issues?</label>
            <div>
              <input type="radio" name="gates-smooth" value="yes" /> Yes
              <input type="radio" name="gates-smooth" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there any signs of wear or damage that could affect the gate's functionality?</label>
            <div>
              <input type="text" name="gates-damage" placeholder="Describe any wear or damage" />
            </div>
          </div>

          <div className="form-section">
            <label>Are there backup systems in place in case of power outages or malfunctions?</label>
            <div>
              <input type="radio" name="backup-systems" value="yes" /> Yes
              <input type="radio" name="backup-systems" value="no" /> No
            </div>
          </div>

          {/* 1.1.1.1.1.2 Access Control */}
          <h2>1.1.1.1.1.2 Access Control:</h2>
          <div className="form-section">
            <label>How is access to the security gates controlled?</label>
            <div>
              <input type="text" name="access-control-methods" placeholder="Enter access control methods" />
            </div>
          </div>

          <div className="form-section">
            <label>Are there authentication mechanisms, such as keypads, card readers, or biometric scanners, to restrict entry?</label>
            <div>
              <input type="radio" name="auth-mechanisms" value="yes" /> Yes
              <input type="radio" name="auth-mechanisms" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are access control systems integrated with other security measures, such as surveillance cameras or intrusion detection systems?</label>
            <div>
              <input type="radio" name="integrated-systems" value="yes" /> Yes
              <input type="radio" name="integrated-systems" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there a log of entries and exits through the security gates for monitoring and auditing purposes?</label>
            <div>
              <input type="radio" name="log-entries" value="yes" /> Yes
              <input type="radio" name="log-entries" value="no" /> No
            </div>
          </div>

          {/* 1.1.1.1.1.3 Safety Features */}
          <h2>1.1.1.1.1.3 Safety Features:</h2>
          <div className="form-section">
            <label>Are there safety features in place to prevent accidents or injuries, such as sensors to detect obstructions or emergency stop buttons?</label>
            <div>
              <input type="radio" name="safety-features" value="yes" /> Yes
              <input type="radio" name="safety-features" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are the gates equipped with safety mechanisms to prevent trapping or crushing hazards?</label>
            <div>
              <input type="radio" name="trap-hazards" value="yes" /> Yes
              <input type="radio" name="trap-hazards" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there clear instructions or signage to inform users about safety procedures and precautions when using the gates?</label>
            <div>
              <input type="radio" name="safety-signage" value="yes" /> Yes
              <input type="radio" name="safety-signage" value="no" /> No
            </div>
          </div>

          {/* 1.1.1.1.1.4 Compliance with Regulations */}
          <h2>1.1.1.1.1.4 Compliance with Regulations:</h2>
          <div className="form-section">
            <label>Do the security gates comply with relevant safety and security regulations, codes, and standards?</label>
            <div>
              <input type="radio" name="compliance-regulations" value="yes" /> Yes
              <input type="radio" name="compliance-regulations" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there any specific requirements or guidelines for security gates outlined by regulatory authorities or industry associations that need to be met?</label>
            <div>
              <input type="text" name="regulatory-requirements" placeholder="Enter regulatory requirements" />
            </div>
          </div>

          <div className="form-section">
            <label>Have the gates undergone any inspections or certifications to verify compliance with applicable standards?</label>
            <div>
              <input type="radio" name="inspections-certifications" value="yes" /> Yes
              <input type="radio" name="inspections-certifications" value="no" /> No
            </div>
          </div>

          {/* 1.1.1.1.1.5 Maintenance and Upkeep */}
          <h2>1.1.1.1.1.5 Maintenance and Upkeep:</h2>
          <div className="form-section">
            <label>Is there a regular maintenance schedule in place for the security gates?</label>
            <div>
              <input type="radio" name="maintenance-schedule" value="yes" /> Yes
              <input type="radio" name="maintenance-schedule" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are maintenance tasks, such as lubrication, inspection of components, and testing of safety features, performed according to schedule?</label>
            <div>
              <input type="radio" name="maintenance-tasks" value="yes" /> Yes
              <input type="radio" name="maintenance-tasks" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there records documenting maintenance activities, repairs, and any issues identified during inspections?</label>
            <div>
              <input type="radio" name="maintenance-records" value="yes" /> Yes
              <input type="radio" name="maintenance-records" value="no" /> No
            </div>
          </div>

          {/* 1.1.1.1.1.6 User Training and Awareness */}
          <h2>1.1.1.1.1.6 User Training and Awareness:</h2>
          <div className="form-section">
            <label>Have users, such as security personnel or authorized staff, received training on how to operate the security gates safely and effectively?</label>
            <div>
              <input type="radio" name="user-training" value="yes" /> Yes
              <input type="radio" name="user-training" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there instructions or guidelines available to users regarding proper gate usage and emergency procedures?</label>
            <div>
              <input type="radio" name="instructions-guidelines" value="yes" /> Yes
              <input type="radio" name="instructions-guidelines" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there a process for reporting malfunctions, damage, or security incidents related to the gates?</label>
            <div>
              <input type="radio" name="reporting-process" value="yes" /> Yes
              <input type="radio" name="reporting-process" value="no" /> No
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}

export default SecurityGatesPage;
