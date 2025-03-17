import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function PasswordSecurity2FormPage() {
  const navigate = useNavigate();  // Initialize useNavigate hook for navigation
  const { buildingId } = useBuilding(); // Access buildingId from context
  const db = getFirestore();

  const [formData, setFormData] = useState();
  const storage = getStorage();
  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadError, setUploadError] = useState(null);


  useEffect(() => {
      if (!buildingId) {
          alert('No building selected. Redirecting to Building Info...');
          navigate('/BuildingandAddress');
      }
  }, [buildingId, navigate]);

  
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
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
        const formsRef = collection(db, 'forms/Personnel Training and Awareness/Password Security');
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
      const formsRef = collection(db, 'forms/Personnel Training and Awareness/Password Security');
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
            <h1>3.1.1.4.2.2 Password Security Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 3.1.1.4.2.2 Password Security */}
                <h2>3.1.1.4.2.2.1 Password Creation Best Practices:</h2>
                <div className="form-section">
                    <label>Are staff members trained on best practices for creating strong, complex passwords that are resistant to dictionary attacks, brute-force attempts, and other common password cracking techniques?</label>
                    <div>
                        <input type="radio" name="passwordCreationTraining" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="passwordCreationTraining" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="passwordCreationTrainingComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>
                
                <div className="form-section">
                    <label>What specific guidelines or criteria are provided to staff members for selecting secure passwords, such as minimum length requirements, the use of a combination of uppercase and lowercase letters, numbers, and special characters, and avoidance of easily guessable or commonly used phrases?</label>
                    <div>
                        <input type="text" name="passwordSelectionGuidelines" placeholder="Describe the guidelines/criteria" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are staff members educated on the importance of selecting unique passwords for each account or system, avoiding password reuse across multiple platforms, and regularly updating passwords to mitigate the risk of unauthorized access due to credential compromise?</label>
                    <div>
                        <input type="text" name="passwordEducationOnReuse" placeholder="Describe how they're educated" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>3.1.1.4.2.2.2 Password Management Tools and Techniques:</h2>
                <div className="form-section">
                    <label>Are staff members introduced to password management tools or utilities designed to facilitate the generation, storage, and retrieval of strong, complex passwords across multiple accounts or devices securely?</label>
                    <div>
                        <input type="radio" name="passwordManagementToolsIntroduction" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="passwordManagementToolsIntroduction" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="passwordManagementToolsIntroductionComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>What training resources or instructional materials are provided to staff members to familiarize them with the features and functionality of password management solutions, including password generation, encryption, synchronization, and multi-factor authentication capabilities?</label>
                    <div>
                        <input type="text" name="passwordManagementTrainingResources" placeholder="Describe the resources/materials" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are staff members encouraged to incorporate password management best practices into their daily workflows, such as using passphrase-based authentication, enabling two-factor authentication (2FA), or implementing biometric authentication methods where available?</label>
                    <div>
                        <input type="text" name="passwordManagementBestPractices" placeholder="Describe how they're encouraged" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>3.1.1.4.2.2.3 Password Hygiene and Maintenance:</h2>
                <div className="form-section">
                    <label>Are staff members educated on the importance of practicing good password hygiene, including avoiding common pitfalls such as sharing passwords with others, writing down passwords on physical or digital notes, or storing passwords in easily accessible locations?</label>
                    <div>
                        <input type="radio" name="passwordHygieneEducation" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="passwordHygieneEducation" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="passwordHygieneEducationComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>What procedures or protocols are in place to guide staff members in securely storing and protecting passwords from unauthorized disclosure or theft, such as encrypted password vaults, secure cloud storage solutions, or physical security measures for sensitive information?</label>
                    <div>
                        <input type="text" name="passwordStorageProtocols" placeholder="Describe the procedures" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are staff members reminded of the necessity of periodically reviewing and updating their passwords, conducting password audits, and revoking access for inactive or compromised accounts to maintain a robust and resilient password security posture?</label>
                    <div>
                        <input type="text" name="passwordReviewReminders" placeholder="Describe how they're reminded" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>3.1.1.4.2.2.4 Social Engineering Awareness:</h2>
                <div className="form-section">
                    <label>Are staff members trained to recognize social engineering tactics commonly employed by attackers to trick individuals into divulging their passwords or sensitive information through manipulation, deception, or coercion?</label>
                    <div>
                        <input type="radio" name="socialEngineeringTraining" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="socialEngineeringTraining" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="socialEngineeringTrainingComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>What educational resources or awareness materials are provided to staff members to increase their awareness of phishing scams, pretexting schemes, or other social engineering techniques aimed at exploiting human vulnerabilities to compromise password security?</label>
                    <div>
                        <input type="text" name="socialEngineeringResources" placeholder="Describe the resources/materials" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are staff members encouraged to remain vigilant and skeptical of unsolicited requests for password information, particularly via email, phone calls, or other communication channels, and to verify the legitimacy of requests before disclosing sensitive credentials?</label>
                    <div>
                        <input type="text" name="socialEngineeringVigilance" placeholder="Describe how they're encouraged" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>3.1.1.4.2.2.5 Password Policy Compliance:</h2>
                <div className="form-section">
                    <label>Are staff members informed of the organization's password policy requirements, including expectations for password complexity, expiration, history retention, and enforcement mechanisms for non-compliance?</label>
                    <div>
                        <input type="radio" name="passwordPolicyCompliance" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="passwordPolicyCompliance" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="passwordPolicyComplianceComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>How are staff members monitored or assessed for adherence to password policy guidelines, and what measures are in place to provide feedback, guidance, or enforcement actions in cases of policy violations or security breaches related to password management?</label>
                    <div>
                        <input type="text" name="passwordPolicyMonitoring" placeholder="Describe how they're monitored" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>What strategies are employed to promote a culture of accountability and responsibility among staff members regarding password security, emphasizing the shared responsibility of all individuals in safeguarding sensitive information and protecting against unauthorized access or data breaches?</label>
                    <div>
                        <input type="text" name="passwordSecurityAccountability" placeholder="Describe the strategies" onChange={handleChange}/>  
                    </div>
                </div>

                <button type='submit'>Submit</button>
            </form>
        </main>
    </div>
  )
}

export default PasswordSecurity2FormPage;