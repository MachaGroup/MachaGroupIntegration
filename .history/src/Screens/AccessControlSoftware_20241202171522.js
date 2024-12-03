import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';  // Ensure this is linked to your universal CSS
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar"; // Import the Navbar

function AccessControlSoftwarePage() {
  const navigate = useNavigate();  // Initialize useNavigate hook for navigation
  const { buildingId } = useBuilding();
  const db = getFirestore();

  const [formData, setFormData] = useState();

  useEffect(() => {
    if(!buildingId) {
      alert('No building selected. Redirecting to Building Info...');
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
      alert('Building ID is missing. Please start the assessment from the right page.');
      return;
    }

    try {
      // Create a document reference to the building in the 'Buildings' collection
      const buildingRef = doc(db, 'Buidlings', buildingId);

      // Store the form data in the specified Firestore structure
      const formsRef = collection(db, 'forms/Physical Security/Access Control Software')
      await addDoc(formsRef, {
        building: buildingRef,
        formData: formData,
      });

      console.log('Form data submitted successfully!');
      alert('Form submitted successfully!');
      navigate('/Form');
    } catch (error) {
      console.error('Error submitting the form:', error);
      alert('Failed to submit the form. Please try again.');
    }
  };

  return (
    <div className="form-page">
      <header className="header">
        <Navbar />
        {/* Back Button */}
        <button className="back-button" onClick={handleBack}>←</button> {/* Back button at the top */}
        <h1>1.1.1.2.3. Access Control Software Assessment</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          {/* Functionality and Features */}
          <h2>Functionality and Features:</h2>
          <div className="form-section">
            <label>Does the access control software provide comprehensive functionality for managing access to secondary entrances?</label>
            <div>
              <input type="radio" name="comprehensiveFunctionality" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="comprehensiveFunctionality" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Can it centrally manage and control access permissions for individuals, groups, and access points?</label>
            <div>
              <input type="radio" name="centralManagement" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="centralManagement" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Does it support various authentication methods, such as card readers, biometric scanners, or PIN codes?</label>
            <div>
              <input type="radio" name="authenticationMethods" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="authenticationMethods" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there features for real-time monitoring, reporting, and auditing of access events?</label>
            <div>
              <input type="radio" name="realTimeMonitoring" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="realTimeMonitoring" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Integration with Hardware */}
          <h2>Integration with Hardware:</h2>
          <div className="form-section">
            <label>Is the access control software compatible with a wide range of hardware devices, including card readers, biometric scanners, and electronic locks?</label>
            <div>
              <input type="radio" name="hardwareCompatibility" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="hardwareCompatibility" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Does it seamlessly integrate with existing security infrastructure, such as surveillance cameras and alarm systems?</label>
            <div>
              <input type="radio" name="integrationInfrastructure" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="integrationInfrastructure" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there any compatibility issues or limitations that need to be addressed?</label>
            <input type="text" name="compatibilityIssues" placeholder="Describe any compatibility issues" onChange={handleChange}/>
          </div>

          {/* Security and Encryption */}
          <h2>Security and Encryption:</h2>
          <div className="form-section">
            <label>Does the access control software employ robust encryption and security protocols to protect sensitive data and communication?</label>
            <div>
              <input type="radio" name="encryptionSecurity" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="encryptionSecurity" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are access control policies and credentials securely stored and transmitted within the software?</label>
            <div>
              <input type="radio" name="securePolicies" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="securePolicies" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Is there support for multi-factor authentication to enhance security?</label>
            <div>
              <input type="radio" name="multiFactorAuth" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="multiFactorAuth" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Scalability and Flexibility */}
          <h2>Scalability and Flexibility:</h2>
          <div className="form-section">
            <label>Can the access control software scale to accommodate the needs of your organization as it grows?</label>
            <div>
              <input type="radio" name="scalability" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="scalability" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Does it offer flexibility in configuring access control rules and permissions based on organizational requirements?</label>
            <div>
              <input type="radio" name="flexibility" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="flexibility" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Is it adaptable to changes in access control policies, personnel, and security protocols?</label>
            <div>
              <input type="radio" name="adaptability" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="adaptability" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* User Interface and Ease of Use */}
          <h2>User Interface and Ease of Use:</h2>
          <div className="form-section">
            <label>Is the user interface intuitive and easy to navigate for administrators and end-users?</label>
            <div>
              <input type="radio" name="userInterface" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="userInterface" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there features for customizing dashboards, reports, and access control workflows?</label>
            <div>
              <input type="radio" name="customization" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="customization" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Does the software provide comprehensive user documentation and training resources?</label>
            <div>
              <input type="radio" name="userDocumentation" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="userDocumentation" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Compliance with Regulations */}
          <h2>Compliance with Regulations:</h2>
          <div className="form-section">
            <label>Does the access control software comply with relevant regulations, standards, and industry best practices?</label>
            <div>
              <input type="radio" name="compliance" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="compliance" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there specific requirements or guidelines for access control software outlined by regulatory authorities or industry associations?</label>
            <input type="text" name="regulatoryRequirements" placeholder="Enter any regulatory requirements" onChange={handleChange}/>
          </div>

          <div className="form-section">
            <label>Has the software undergone testing or certification to verify compliance with applicable standards?</label>
            <div>
              <input type="radio" name="testingCertification" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="testingCertification" value="no" onChange={handleChange}/> No
            </div>
          </div>

          {/* Maintenance and Support */}
          <h2>Maintenance and Support:</h2>
          <div className="form-section">
            <label>Is there a reliable support system in place for troubleshooting issues, resolving technical challenges, and providing software updates?</label>
            <div>
              <input type="radio" name="supportSystem" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="supportSystem" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there maintenance agreements or service level agreements (SLAs) to ensure timely support and software updates?</label>
            <div>
              <input type="radio" name="sla" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="sla" value="no" onChange={handleChange}/> No
            </div>
          </div>

          <div className="form-section">
            <label>Are there regular backups and disaster recovery plans in place to protect access control data?</label>
            <div>
              <input type="radio" name="disasterRecovery" value="yes" onChange={handleChange}/> Yes
              <input type="radio" name="disasterRecovery" value="no" onChange={handleChange}/> No
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
