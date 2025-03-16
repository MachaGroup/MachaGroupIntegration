import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
/**/
function DataProtection2FormPage() {
  const navigate = useNavigate();  // Initialize useNavigate hook for navigation
  const { buildingId } = useBuilding(); // Access buildingId from context
  const db = getFirestore();

  const [formData, setFormData] = useState();

  useEffect(() => {
      if (!buildingId) {
          alert('No building selected. Redirecting to Building Info...');
          navigate('/BuildingandAddress');
      }
  }, [buildingId, navigate]);

  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
          ...prevData,
          [name]: value,
      }));
  };

  // Function to handle back button
  const handleBack = async () => {
          if (formData && buildingId) { // Check if formData and buildingId exist
            try {
              const buildingRef = doc(db, 'Buildings', buildingId);
              const formsRef = collection(db, 'forms/Personnel Training and Awareness/Data Protection');
              await addDoc(formsRef, {
                building: buildingRef,
                formData: formData,
              });
              console.log('Form Data submitted successfully on back!');
              alert('Form data saved before navigating back!');
            } catch (error) {
              console.error('Error saving form data:', error);
              alert('Failed to save form data before navigating back. Some data may be lost.');
            }
          }
          navigate(-1);
        };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!buildingId) {
        alert('Building ID is missing. Please start the assessment from the correct page.');
        return;
    }

    try {
      // Create a document reference to the building in the 'Buildings' collection
      const buildingRef = doc(db, 'Buildings', buildingId); 

      // Store the form data in the specified Firestore structure
      const formsRef = collection(db, 'forms/Personnel Training and Awareness/Data Protection');
      await addDoc(formsRef, {
          building: buildingRef, // Reference to the building document
          formData: formData, // Store the form data as a nested object
      });

      console.log('Form data submitted successfully!');
      alert('Form submitted successfully!');
      navigate('/Form');
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('Failed to submit the form. Please try again.');
    }
};

  return (
    <div className="form-page">
        <header className="header">
            <Navbar />
            {/* Back Button */}
        <button className="back-button" onClick={handleBack}>←</button> {/* Back button at the top */}
            <h1>Data Protection Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 3.4.2.2.3 Data Protection */}
                <h2>Sensitive Information Awareness:</h2>
                <div className="form-section">
                    <label>Are staff members trained on identifying and handling sensitive information, including personally identifiable information (PII), financial data, medical records, and other confidential or proprietary data?</label>
                    <div>
                        <input type="radio" name="sensitiveInformationTraining" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="sensitiveInformationTraining" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="sensitiveInformationTrainingComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>
                
                <div className="form-section">
                    <label>What types of sensitive information are emphasized during training sessions, and how are staff members educated on the potential risks associated with mishandling or disclosing such information to unauthorized parties?</label>
                    <div>
                        <input type="text" name="sensitiveInformationTypes" placeholder="Describe the different types" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are staff members made aware of their roles and responsibilities in safeguarding sensitive data, including compliance with relevant laws, regulations, and organizational policies governing data protection and privacy?</label>
                    <div>
                        <input type="text" name="sensitiveDataRolesResponsibilities" placeholder="Describe how they're made aware" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Data Classification and Handling:</h2>
                <div className="form-section">
                    <label>Are staff members provided with guidelines or procedures for classifying data based on its sensitivity, criticality, and access controls, distinguishing between public, internal, confidential, and restricted information categories?</label>
                    <div>
                        <input type="radio" name="dataClassificationGuidelines" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="dataClassificationGuidelines" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="dataClassificationGuidelinesComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>How are staff members trained on the appropriate methods and tools for securely handling, storing, transmitting, and disposing of sensitive data, including encryption, access controls, secure file transfer protocols, and data retention policies?</label>
                    <div>
                        <input type="text" name="dataHandlingTraining" placeholder="Describe how they're trained" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>What measures are in place to ensure that staff members understand the importance of maintaining the confidentiality, integrity, and availability of data throughout its lifecycle, from creation and processing to storage and disposal?</label>
                    <div>
                        <input type="text" name="dataConfidentialityMeasures" placeholder="Describe the measures" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Security Awareness and Vigilance:</h2>
                <div className="form-section">
                    <label>Are staff members educated on common data security threats and vulnerabilities, such as malware infections, phishing attacks, insider threats, and social engineering techniques, that could compromise the confidentiality or integrity of sensitive information?</label>
                    <div>
                        <input type="radio" name="securityThreatEducation" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="securityThreatEducation" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="securityThreatEducationComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>How are staff members trained to recognize indicators of suspicious activity or potential data breaches, such as unusual file access patterns, unauthorized system modifications, or unexpected data transmissions, and to report such incidents promptly to designated IT or security personnel?</label>
                    <div>
                        <input type="text" name="incidentRecognitionTraining" placeholder="Describe how they're trained" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>What strategies are employed to foster a culture of security awareness and vigilance among staff members, encouraging them to remain alert, proactive, and responsive to emerging data security risks and evolving threat landscapes?</label>
                    <div>
                        <input type="text" name="securityAwarenessCulture" placeholder="Describe the strategies" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Data Privacy Principles:</h2>
                <div className="form-section">
                    <label>Are staff members briefed on fundamental data privacy principles, such as the need-to-know principle, least privilege principle, data minimization principle, and purpose limitation principle, to guide their handling of sensitive information?</label>
                    <div>
                        <input type="radio" name="dataPrivacyPrinciples" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="dataPrivacyPrinciples" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="dataPrivacyPrinciplesComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>How are staff members trained to respect individual privacy rights, maintain confidentiality, and obtain appropriate consent or authorization before accessing, collecting, using, or disclosing personal data for legitimate business purposes?</label>
                    <div>
                        <input type="text" name="privacyRightsTraining" placeholder="Describe how they're trained" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>What educational resources or reference materials are provided to staff members to reinforce their understanding of data privacy laws, regulations, and industry standards governing the collection, processing, and sharing of personal information?</label>
                    <div>
                        <input type="text" name="privacyLawsResources" placeholder="Describe the resources/materials" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Incident Response and Reporting:</h2>
                <div className="form-section">
                    <label>Are staff members equipped with knowledge and skills for responding to data security incidents, breaches, or unauthorized disclosures, including immediate containment measures, evidence preservation, and incident reporting protocols?</label>
                    <div>
                        <input type="radio" name="incidentResponseTraining" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="incidentResponseTraining" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="incidentResponseTrainingComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>How are staff members instructed on the procedures for reporting suspected data breaches or security incidents to designated authorities, such as IT helpdesk, data protection officer, or regulatory bodies, and for communicating with affected individuals or stakeholders in a timely and transparent manner?</label>
                    <div>
                        <input type="text" name="incidentReportingProcedures" placeholder="Describe how they're instructed" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>What mechanisms are in place to facilitate post-incident analysis, root cause identification, lessons learned, and corrective actions to prevent recurrence of data security incidents and strengthen overall data protection measures?</label>
                    <div>
                        <input type="text" name="postIncidentMechanisms" placeholder="Describe the mechanisms" onChange={handleChange}/>  
                    </div>
                </div>

                <button type='submit'>Submit</button>
            </form>
        </main>
    </div>
  )
}

export default DataProtection2FormPage;
