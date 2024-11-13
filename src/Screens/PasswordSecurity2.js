import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function PasswordSecurity2FormPage() {
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
            <h1>Password Security Assessment</h1>
        </header>

        <main className="form-container">
            <form>
                {/* 3.4.2.2.2 Password Security */}
                <h2>Password Creation Best Practices:</h2>
                <div className="form-section">
                    <label>Are staff members trained on best practices for creating strong, complex passwords that are resistant to dictionary attacks, brute-force attempts, and other common password cracking techniques?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>
                
                <div className="form-section">
                    <label>What specific guidelines or criteria are provided to staff members for selecting secure passwords, such as minimum length requirements, the use of a combination of uppercase and lowercase letters, numbers, and special characters, and avoidance of easily guessable or commonly used phrases?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the guidelines/criteria" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are staff members educated on the importance of selecting unique passwords for each account or system, avoiding password reuse across multiple platforms, and regularly updating passwords to mitigate the risk of unauthorized access due to credential compromise?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're educated" />  
                    </div>
                </div>

                <h2>Password Management Tools and Techniques:</h2>
                <div className="form-section">
                    <label>Are staff members introduced to password management tools or utilities designed to facilitate the generation, storage, and retrieval of strong, complex passwords across multiple accounts or devices securely?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>What training resources or instructional materials are provided to staff members to familiarize them with the features and functionality of password management solutions, including password generation, encryption, synchronization, and multi-factor authentication capabilities?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the resources/materials" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are staff members encouraged to incorporate password management best practices into their daily workflows, such as using passphrase-based authentication, enabling two-factor authentication (2FA), or implementing biometric authentication methods where available?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're encouraged" />  
                    </div>
                </div>

                <h2>Password Hygiene and Maintenance:</h2>
                <div className="form-section">
                    <label>Are staff members educated on the importance of practicing good password hygiene, including avoiding common pitfalls such as sharing passwords with others, writing down passwords on physical or digital notes, or storing passwords in easily accessible locations?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>What procedures or protocols are in place to guide staff members in securely storing and protecting passwords from unauthorized disclosure or theft, such as encrypted password vaults, secure cloud storage solutions, or physical security measures for sensitive information?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the procedures" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are staff members reminded of the necessity of periodically reviewing and updating their passwords, conducting password audits, and revoking access for inactive or compromised accounts to maintain a robust and resilient password security posture?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're reminded" />  
                    </div>
                </div>

                <h2>Social Engineering Awareness:</h2>
                <div className="form-section">
                    <label>Are staff members trained to recognize social engineering tactics commonly employed by attackers to trick individuals into divulging their passwords or sensitive information through manipulation, deception, or coercion?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>What educational resources or awareness materials are provided to staff members to increase their awareness of phishing scams, pretexting schemes, or other social engineering techniques aimed at exploiting human vulnerabilities to compromise password security?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the resources/materials" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are staff members encouraged to remain vigilant and skeptical of unsolicited requests for password information, particularly via email, phone calls, or other communication channels, and to verify the legitimacy of requests before disclosing sensitive credentials?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're encouraged" />  
                    </div>
                </div>

                <h2>Password Policy Compliance:</h2>
                <div className="form-section">
                    <label>Are staff members informed of the organization's password policy requirements, including expectations for password complexity, expiration, history retention, and enforcement mechanisms for non-compliance?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are staff members monitored or assessed for adherence to password policy guidelines, and what measures are in place to provide feedback, guidance, or enforcement actions in cases of policy violations or security breaches related to password management?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're monitored" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What strategies are employed to promote a culture of accountability and responsibility among staff members regarding password security, emphasizing the shared responsibility of all individuals in safeguarding sensitive information and protecting against unauthorized access or data breaches?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the strategies" />  
                    </div>
                </div>

            </form>
        </main>
    </div>
  )
}

export default PasswordSecurity2FormPage;