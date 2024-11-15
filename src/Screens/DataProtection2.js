import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function DataProtection2FormPage() {
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
            <h1>Data Protection Assessment</h1>
        </header>

        <main className="form-container">
            <form>
                {/* 3.4.2.2.3 Data Protection */}
                <h2>Sensitive Information Awareness:</h2>
                <div className="form-section">
                    <label>Are staff members trained on identifying and handling sensitive information, including personally identifiable information (PII), financial data, medical records, and other confidential or proprietary data?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>
                
                <div className="form-section">
                    <label>What types of sensitive information are emphasized during training sessions, and how are staff members educated on the potential risks associated with mishandling or disclosing such information to unauthorized parties?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the different types" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are staff members made aware of their roles and responsibilities in safeguarding sensitive data, including compliance with relevant laws, regulations, and organizational policies governing data protection and privacy?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're made aware" />  
                    </div>
                </div>

                <h2>Data Classification and Handling:</h2>
                <div className="form-section">
                    <label>Are staff members provided with guidelines or procedures for classifying data based on its sensitivity, criticality, and access controls, distinguishing between public, internal, confidential, and restricted information categories?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are staff members trained on the appropriate methods and tools for securely handling, storing, transmitting, and disposing of sensitive data, including encryption, access controls, secure file transfer protocols, and data retention policies?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're trained" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What measures are in place to ensure that staff members understand the importance of maintaining the confidentiality, integrity, and availability of data throughout its lifecycle, from creation and processing to storage and disposal?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the measures" />  
                    </div>
                </div>

                <h2>Security Awareness and Vigilance:</h2>
                <div className="form-section">
                    <label>Are staff members educated on common data security threats and vulnerabilities, such as malware infections, phishing attacks, insider threats, and social engineering techniques, that could compromise the confidentiality or integrity of sensitive information?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are staff members trained to recognize indicators of suspicious activity or potential data breaches, such as unusual file access patterns, unauthorized system modifications, or unexpected data transmissions, and to report such incidents promptly to designated IT or security personnel?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're trained" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What strategies are employed to foster a culture of security awareness and vigilance among staff members, encouraging them to remain alert, proactive, and responsive to emerging data security risks and evolving threat landscapes?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the strategies" />  
                    </div>
                </div>

                <h2>Data Privacy Principles:</h2>
                <div className="form-section">
                    <label>Are staff members briefed on fundamental data privacy principles, such as the need-to-know principle, least privilege principle, data minimization principle, and purpose limitation principle, to guide their handling of sensitive information?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are staff members trained to respect individual privacy rights, maintain confidentiality, and obtain appropriate consent or authorization before accessing, collecting, using, or disclosing personal data for legitimate business purposes?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're trained" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What educational resources or reference materials are provided to staff members to reinforce their understanding of data privacy laws, regulations, and industry standards governing the collection, processing, and sharing of personal information?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the resources/materials" />  
                    </div>
                </div>

                <h2>Incident Response and Reporting:</h2>
                <div className="form-section">
                    <label>Are staff members equipped with knowledge and skills for responding to data security incidents, breaches, or unauthorized disclosures, including immediate containment measures, evidence preservation, and incident reporting protocols?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are staff members instructed on the procedures for reporting suspected data breaches or security incidents to designated authorities, such as IT helpdesk, data protection officer, or regulatory bodies, and for communicating with affected individuals or stakeholders in a timely and transparent manner?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how they're instructed" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What mechanisms are in place to facilitate post-incident analysis, root cause identification, lessons learned, and corrective actions to prevent recurrence of data security incidents and strengthen overall data protection measures?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the mechanisms" />  
                    </div>
                </div>

            </form>
        </main>
    </div>
  )
}

export default DataProtection2FormPage;
