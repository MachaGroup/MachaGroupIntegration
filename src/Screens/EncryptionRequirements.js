import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import Navbar from "./Navbar";

function EncryptionRequirementsFormPage() {
  const navigate = useNavigate();  // Initialize useNavigate hook for navigation
  const { buildingId } = useBuilding();
  const db = getFirestore();

  const [formData, setFormData] = useState();

  useEffect(() => {
    if(!buildingId) {
      alert('No builidng selected. Redirecting to Building Info...');
      navigate('BuildingandAddress');
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
  const handleBack = () => {
    navigate(-1);  // Navigates to the previous page
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(!buildingId) {
      alert('Building ID is missing. Please start the assessment from the correct page.');
      return;
    }

    try {
      // Create a document reference to the building in the 'Buildings' collection
      const buildingRef = doc(db, 'Buildings', buildingId);

      // Store the form data in the specified Firestore structure
      const formsRef = collection(db, 'forms/Policy and Compliance/Encryption Requirements');
      await addDoc(formsRef, {
        buildling: buildingRef,
        formData: formData,
      });
      console.log('From Data submitted successfully!')
      alert('Form Submitted successfully!');
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
            <h1>5.1.2.2.1 Encryption Requirements Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 5.1.2.2.1 Encryption Requirements */}
                <h2>5.1.2.2.1.1 Encryption Standards:</h2>
                <div className="form-section">
                    <label>What encryption standards or algorithms are required for protecting sensitive data (e.g., AES-256, RSA)?</label>
                    <div>
                        <input type="text" name="encryptionStandards" placeholder="Describe the standards" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are encryption standards selected and updated to address emerging security threats?</label>
                    <div>
                        <input type="text" name="selectedStandards" placeholder="Describe how it's selected and updated" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are encryption standards documented and communicated to relevant stakeholders?</label>
                    <div>
                        <input type="radio" name="documentedStandards" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="documentedStandards" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>5.1.2.2.1.2 Data Classification:</h2>
                <div className="form-section">
                    <label>How is sensitive data identified and classified to determine the appropriate encryption measures?</label>
                    <div>
                        <input type="text" name="selectedStandards" placeholder="Describe how it's identified and classified" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What criteria are used to define what constitutes sensitive data within the organization?</label>
                    <div>
                        <input type="text" name="sensitiveData" placeholder="Describe the criteria" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How frequently are data classifications reviewed and updated?</label>
                    <div>
                        <input type="text" name="reviewedClassifications" placeholder="Describe how frequent" onChange={handleChange} />  
                    </div>
                </div>

                <h2>5.1.2.2.1.3 Encryption Implementation:</h2>
                <div className="form-section">
                    <label>What methods or tools are used to apply encryption to sensitive data (e.g., software, hardware)?</label>
                    <div>
                        <input type="text" name="encryptionTools" placeholder="Describe the methods" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How is encryption integrated into data storage, transmission, and processing systems?</label>
                    <div>
                        <input type="text" name="integratedEnryption" placeholder="Describe how it's integrated" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are encryption practices consistent across different types of sensitive data and systems?</label>
                    <div>
                        <input type="radio" name="consistentPractices" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="consistentPractices" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>5.1.2.2.1.4 Key Management:</h2>
                <div className="form-section">
                    <label>What procedures are in place for generating, distributing, storing, and managing encryption keys?</label>
                    <div>
                        <input type="text" name="managingKeys" placeholder="Describe the procedures" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are encryption keys protected from unauthorized access or compromise?</label>
                    <div>
                        <input type="text" name="accessProtected" placeholder="Describe how it's protected" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What processes are followed for key rotation, expiration, and revocation?</label>
                    <div>
                        <input type="text" name="expirationProcesses" placeholder="Describe the processes" onChange={handleChange} />  
                    </div>
                </div>

                <h2>5.1.2.2.1.5 Compliance and Regulatory Requirements:</h2>
                <div className="form-section">
                    <label>How does the organization's encryption approach comply with relevant regulations and standards (e.g., GDPR, HIPAA)?</label>
                    <div>
                        <input type="text" name="complyingRegulations" placeholder="Describe how it's approached" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there specific regulatory requirements that impact encryption practices, and how are they addressed?</label>
                    <div>
                        <input type="radio" name="regulatoryRequirements" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="regulatoryRequirements" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>What measures are in place to ensure ongoing compliance with encryption-related regulations?</label>
                    <div>
                        <input type="text" name="complianceRegulations" placeholder="Describe the measures" onChange={handleChange} />  
                    </div>
                </div>

                <h2>5.1.2.2.1.6 Encryption for Data in Transit:</h2>
                <div className="form-section">
                    <label>What encryption protocols are used for securing data transmitted over networks (e.g., TLS, HTTPS)?</label>
                    <div>
                        <input type="text" name="securingData" placeholder="Describe the protocols" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How is the integrity and confidentiality of data in transit ensured through encryption?</label>
                    <div>
                        <input type="text" name="dataIntegrity" placeholder="Describe how it's ensured" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there policies and procedures for validating the effectiveness of encryption for data in transit?</label>
                    <div>
                        <input type="radio" name="effectivenessValidation" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="effectivenessValidation" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>5.1.2.2.1.7 Encryption for Data at Rest:</h2>
                <div className="form-section">
                    <label>How is sensitive data encrypted when stored on physical media, such as hard drives and backup tapes?</label>
                    <div>
                        <input type="text" name="storedMedia" placeholder="Describe how it's encrypted" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What encryption techniques are used for cloud storage and other remote data repositories?</label>
                    <div>
                        <input type="text" name="encryptionTechniques" placeholder="Describe the techniques" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there safeguards to protect encrypted data from unauthorized access or physical theft?</label>
                    <div>
                        <input type="radio" name="protectingData" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="protectingData" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>5.1.2.2.1.8 Access Controls:</h2>
                <div className="form-section">
                    <label>What access controls are in place to ensure that only authorized personnel can manage and use encryption keys?</label>
                    <div>
                        <input type="text" name="authorizedPersonnel" placeholder="Describe the access controls" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are access permissions reviewed and updated to reflect changes in personnel or roles?</label>
                    <div>
                        <input type="text" name="reviewedPermissions" placeholder="Describe how it's reviewed and updated" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there logging and monitoring mechanisms to track access to encryption keys and sensitive data?</label>
                    <div>
                        <input type="radio" name="monitoringMechanisms" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="monitoringMechanisms" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>5.1.2.2.1.9 Encryption Testing and Validation:</h2>
                <div className="form-section">
                    <label>How is the effectiveness of encryption measures tested and validated?</label>
                    <div>
                        <input type="text" name="encryptionMeasures" placeholder="Describe how it's tested and validated" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there regular security assessments or audits to evaluate the implementation of encryption?</label>
                    <div>
                        <input type="radio" name="regularAssessments" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="regularAssessments" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>What processes are in place to address any vulnerabilities or issues identified during testing?</label>
                    <div>
                        <input type="text" name="identifiedVulnerabilities" placeholder="Describe the processes" onChange={handleChange} />  
                    </div>
                </div>

                <h2>5.1.2.2.1.10 Training and Awareness:</h2>
                <div className="form-section">
                    <label>What training is provided to employees regarding encryption practices and data protection?</label>
                    <div>
                        <input type="text" name="employeeTraining" placeholder="Describe the training" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How is awareness of encryption requirements and best practices maintained among staff?</label>
                    <div>
                        <input type="text" name="awarenessRequirements" placeholder="Describe how it's maintained" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there resources or guidelines available to assist employees in understanding and implementing encryption?</label>
                    <div>
                        <input type="radio" name="employeeResources" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="employeeResources" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit">Submit</button>

            </form>
        </main>
    </div>
  )
}

export default EncryptionRequirementsFormPage;