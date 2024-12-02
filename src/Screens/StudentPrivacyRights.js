import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';

function StudentPrivacyRightsFormPage() {
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
      const formsRef = collection(db, 'forms/Policy and Compliance/Student Privacy Rights');
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
            {/* Back Button */}
        <button className="back-button" onClick={handleBack}>←</button> {/* Back button at the top */}
            <h1>5.2.1.1.1 Student Privacy Rights Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 5.2.1.1.1 Student Privacy Rights Assessment */}
                <h2>5.2.1.1.1.1 Access to Educational Records:</h2>
                <div className="form-section">
                    <label>What procedures are in place for students and parents to request access to educational records?</label>
                    <div>
                        <input type="text" name="requestProcedures" placeholder="Describe the procedures" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How is access to educational records verified to ensure that only authorized individuals receive information?</label>
                    <div>
                        <input type="text" name="verifiedRecords" placeholder="Describe how it's verified" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there specific forms or channels for submitting requests to access records?</label>
                    <div>
                        <input type="radio" name="submittingRequests" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="submittingRequests" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>5.2.1.1.1.2 Rights to Review and Amend Records:</h2>
                <div className="form-section">
                    <label>What process is available for students and parents to review and request amendments to educational records?</label>
                    <div>
                        <input type="text" name="reviewProcess" placeholder="Describe the process" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are requests for amendments documented and processed?</label>
                    <div>
                        <input type="text" name="documentedRequests" placeholder="Describe how they're documented" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What are the criteria for approving or denying amendment requests, and how are decisions communicated?</label>
                    <div>
                        <input type="text" name="approvingRequests" placeholder="Describe the criteria" onChange={handleChange} />  
                    </div>
                </div>

                <h2>5.2.1.1.1.3 Disclosure of Information:</h2>
                <div className="form-section">
                    <label>Under what circumstances can educational records be disclosed without consent, and how is this information communicated to students and parents?</label>
                    <div>
                        <input type="text" name="disclosedConsent" placeholder="Describe the circumstances" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What procedures are in place to handle requests for disclosure of educational records from third parties, such as law enforcement or other institutions?</label>
                    <div>
                        <input type="text" name="handlingRequests" placeholder="Describe the procedures" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are disclosures recorded and tracked to ensure compliance with FERPA regulations?</label>
                    <div>
                        <input type="text" name="recordedDisclosures" placeholder="Describe how they're recorded and tracked" onChange={handleChange} />  
                    </div>
                </div>

                <h2>5.2.1.1.1.4 Confidentiality and Security:</h2>
                <div className="form-section">
                    <label>What measures are in place to protect the confidentiality and security of educational records?</label>
                    <div>
                        <input type="text" name="protectingRecords" placeholder="Describe the measures" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How is access to educational records controlled and monitored to prevent unauthorized access or breaches?</label>
                    <div>
                        <input type="text" name="controlledRecords" placeholder="Describe how it's controlled and monitored" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there regular audits or assessments of data security practices related to educational records?</label>
                    <div>
                        <input type="radio" name="regularAudits" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="regularAudits" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>5.2.1.1.1.5 Parental Access Rights:</h2>
                <div className="form-section">
                    <label>How are parents informed about their rights to access their child's educational records?</label>
                    <div>
                        <input type="text" name="parentsRights" placeholder="Describe how they're informed" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What procedures are followed to grant or deny parental access requests in accordance with FERPA requirements?</label>
                    <div>
                        <input type="text" name="grantProcedures" placeholder="Describe the procedures" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there any limitations on parental access, and how are these limitations communicated?</label>
                    <div>
                        <input type="radio" name="accessLimitations" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="accessLimitations" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>5.2.1.1.1.6 Student Consent for Release:</h2>
                <div className="form-section">
                    <label>What procedures are in place to obtain student consent for the release of educational records when required?</label>
                    <div>
                        <input type="text" name="studentConsent" placeholder="Describe the procedures" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How is consent documented, and what are the procedures for revoking consent?</label>
                    <div>
                        <input type="text" name="documentedConsent" placeholder="Describe how it's documented" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there any exceptions to the requirement for student consent, and how are these exceptions managed?</label>
                    <div>
                        <input type="radio" name="requirementExceptions" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="requirementExceptions" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>5.2.1.1.1.7 Training and Awareness:</h2>
                <div className="form-section">
                    <label>What training is provided to staff regarding FERPA requirements and student privacy rights?</label>
                    <div>
                        <input type="text" name="staffTraining" placeholder="Describe the training" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How is awareness maintained among staff about the importance of protecting student privacy and handling educational records appropriately?</label>
                    <div>
                        <input type="text" name="maintainedAwareness" placeholder="Describe how it's maintained" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there resources or guidelines available to assist staff in understanding and complying with FERPA regulations?</label>
                    <div>
                        <input type="radio" name="regulationGuidelines" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="regulationGuidelines" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>5.2.1.1.1.8 Complaint Resolution:</h2>
                <div className="form-section">
                    <label>What process is available for students and parents to file complaints regarding violations of privacy rights or FERPA compliance issues?</label>
                    <div>
                        <input type="text" name="filingProcess" placeholder="Describe the process" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are complaints investigated, and what procedures are followed to resolve them?</label>
                    <div>
                        <input type="text" name="investigatedComplaints" placeholder="Describe how it's investigated" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What mechanisms are in place to track and address recurring issues or concerns related to student privacy?</label>
                    <div>
                        <input type="text" name="trackingIssues" placeholder="Describe the mechanisms" onChange={handleChange} />  
                    </div>
                </div>

                <h2>5.2.1.1.1.9 Periodic Reviews and Updates:</h2>
                <div className="form-section">
                    <label>How often are policies and procedures related to FERPA compliance reviewed and updated?</label>
                    <div>
                        <input type="text" name="reviewedPolicies" placeholder="Describe how often it's reviewed" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What processes are used to ensure that updates reflect changes in regulations or best practices?</label>
                    <div>
                        <input type="text" name="updateProcesses" placeholder="Describe the process" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are changes communicated to students, parents, and staff?</label>
                    <div>
                        <input type="text" name="communicatedChanges" placeholder="Describe how often it's communicated" onChange={handleChange} />  
                    </div>
                </div>

                <h2>5.2.1.1.1.10 Documentation and Record-Keeping:</h2>
                <div className="form-section">
                    <label>What records are maintained to document compliance with FERPA, and how are these records managed?</label>
                    <div>
                        <input type="text" name="documentingCompliance" placeholder="Describe the maintained records" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How long are records related to student privacy rights and FERPA compliance retained?</label>
                    <div>
                        <input type="text" name="retainedRecords" placeholder="Describe how long it's related" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What procedures are in place for securely storing and disposing of records?</label>
                    <div>
                        <input type="text" name="storingProcedures" placeholder="Describe the procedures" onChange={handleChange} />  
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit">Submit</button>

            </form>
        </main>
    </div>
  )
}

export default StudentPrivacyRightsFormPage;