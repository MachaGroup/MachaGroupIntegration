import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function AccessControlSoftwarePage() {
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
        <h1>1.1.1.2.3. Access Control Software Assessment</h1>
      </header>

      <main className="form-container">
        <form>
          {/* Functionality and Features */}
          <h2>Functionality and Features:</h2>
          <div className="form-section">
            <label>Does the access control software provide comprehensive functionality for managing access to secondary entrances?</label>
            <div>
              <input type="radio" name="comprehensive-functionality" value="yes" /> Yes
              <input type="radio" name="comprehensive-functionality" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Can it centrally manage and control access permissions for individuals, groups, and access points?</label>
            <div>
              <input type="radio" name="central-management" value="yes" /> Yes
              <input type="radio" name="central-management" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Does it support various authentication methods, such as card readers, biometric scanners, or PIN codes?</label>
            <div>
              <input type="radio" name="authentication-methods" value="yes" /> Yes
              <input type="radio" name="authentication-methods" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there features for real-time monitoring, reporting, and auditing of access events?</label>
            <div>
              <input type="radio" name="real-time-monitoring" value="yes" /> Yes
              <input type="radio" name="real-time-monitoring" value="no" /> No
            </div>
          </div>

          {/* Integration with Hardware */}
          <h2>Integration with Hardware:</h2>
          <div className="form-section">
            <label>Is the access control software compatible with a wide range of hardware devices, including card readers, biometric scanners, and electronic locks?</label>
            <div>
              <input type="radio" name="hardware-compatibility" value="yes" /> Yes
              <input type="radio" name="hardware-compatibility" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Does it seamlessly integrate with existing security infrastructure, such as surveillance cameras and alarm systems?</label>
            <div>
              <input type="radio" name="integration-infrastructure" value="yes" /> Yes
              <input type="radio" name="integration-infrastructure" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there any compatibility issues or limitations that need to be addressed?</label>
            <input type="text" name="compatibility-issues" placeholder="Describe any compatibility issues" />
          </div>

          {/* Security and Encryption */}
          <h2>Security and Encryption:</h2>
          <div className="form-section">
            <label>Does the access control software employ robust encryption and security protocols to protect sensitive data and communication?</label>
            <div>
              <input type="radio" name="encryption-security" value="yes" /> Yes
              <input type="radio" name="encryption-security" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are access control policies and credentials securely stored and transmitted within the software?</label>
            <div>
              <input type="radio" name="secure-policies" value="yes" /> Yes
              <input type="radio" name="secure-policies" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there support for multi-factor authentication to enhance security?</label>
            <div>
              <input type="radio" name="multi-factor-auth" value="yes" /> Yes
              <input type="radio" name="multi-factor-auth" value="no" /> No
            </div>
          </div>

          {/* Scalability and Flexibility */}
          <h2>Scalability and Flexibility:</h2>
          <div className="form-section">
            <label>Can the access control software scale to accommodate the needs of your organization as it grows?</label>
            <div>
              <input type="radio" name="scalability" value="yes" /> Yes
              <input type="radio" name="scalability" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Does it offer flexibility in configuring access control rules and permissions based on organizational requirements?</label>
            <div>
              <input type="radio" name="flexibility" value="yes" /> Yes
              <input type="radio" name="flexibility" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Is it adaptable to changes in access control policies, personnel, and security protocols?</label>
            <div>
              <input type="radio" name="adaptability" value="yes" /> Yes
              <input type="radio" name="adaptability" value="no" /> No
            </div>
          </div>

          {/* User Interface and Ease of Use */}
          <h2>User Interface and Ease of Use:</h2>
          <div className="form-section">
            <label>Is the user interface intuitive and easy to navigate for administrators and end-users?</label>
            <div>
              <input type="radio" name="user-interface" value="yes" /> Yes
              <input type="radio" name="user-interface" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there features for customizing dashboards, reports, and access control workflows?</label>
            <div>
              <input type="radio" name="customization" value="yes" /> Yes
              <input type="radio" name="customization" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Does the software provide comprehensive user documentation and training resources?</label>
            <div>
              <input type="radio" name="user-documentation" value="yes" /> Yes
              <input type="radio" name="user-documentation" value="no" /> No
            </div>
          </div>

          {/* Compliance with Regulations */}
          <h2>Compliance with Regulations:</h2>
          <div className="form-section">
            <label>Does the access control software comply with relevant regulations, standards, and industry best practices?</label>
            <div>
              <input type="radio" name="compliance" value="yes" /> Yes
              <input type="radio" name="compliance" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there specific requirements or guidelines for access control software outlined by regulatory authorities or industry associations?</label>
            <input type="text" name="regulatory-requirements" placeholder="Enter any regulatory requirements" />
          </div>

          <div className="form-section">
            <label>Has the software undergone testing or certification to verify compliance with applicable standards?</label>
            <div>
              <input type="radio" name="testing-certification" value="yes" /> Yes
              <input type="radio" name="testing-certification" value="no" /> No
            </div>
          </div>

          {/* Maintenance and Support */}
          <h2>Maintenance and Support:</h2>
          <div className="form-section">
            <label>Is there a reliable support system in place for troubleshooting issues, resolving technical challenges, and providing software updates?</label>
            <div>
              <input type="radio" name="support-system" value="yes" /> Yes
              <input type="radio" name="support-system" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there maintenance agreements or service level agreements (SLAs) to ensure timely support and software updates?</label>
            <div>
              <input type="radio" name="sla" value="yes" /> Yes
              <input type="radio" name="sla" value="no" /> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there regular backups and disaster recovery plans in place to protect access control data?</label>
            <div>
              <input type="radio" name="disaster-recovery" value="yes" /> Yes
              <input type="radio" name="disaster-recovery" value="no" /> No
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}

export default AccessControlSoftwarePage;
