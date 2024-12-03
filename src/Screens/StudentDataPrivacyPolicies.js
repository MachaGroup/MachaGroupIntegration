import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';

function StudentDataPrivacyPoliciesFormPage() {
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
      const formsRef = collection(db, 'forms/Policy and Compliance/Student Data Privacy Policies');
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
            <h1>5.2.1.1.3 Student Data Privacy Policies Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 5.2.1.1.3 Student Data Privacy Policies */}
                <h2>5.2.1.1.3.1 Policy Development and Scope:</h2>
                <div className="form-section">
                    <label>What policies are in place to ensure the privacy and security of student data (e.g., data protection policies, FERPA compliance policies)?</label>
                    <div>
                        <input type="text" name="privacyPolicies" placeholder="Describe the policies" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are these policies developed and reviewed to align with FERPA requirements and other relevant regulations?</label>
                    <div>
                        <input type="text" name="developedPolicies" placeholder="Describe how they're developed" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What is the scope of the privacy policies in terms of the types of data covered (e.g., educational records, personal information)?</label>
                    <div>
                        <input type="text" name="scopePolicies" placeholder="Describe the scope" onChange={handleChange} />  
                    </div>
                </div>

                <h2>5.2.1.1.3.2 Data Access and Permissions:</h2>
                <div className="form-section">
                    <label>Who has access to student data within the organization (e.g., administrators, teachers, support staff), and how is access controlled?</label>
                    <div>
                        <input type="text" name="dataAccess" placeholder="Who has access" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What procedures are in place to manage and review access permissions to ensure that only authorized personnel can view or handle student data?</label>
                    <div>
                        <input type="text" name="managingProcedures" placeholder="Describe the procedures" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are permissions documented and updated, particularly when staff roles or responsibilities change?</label>
                    <div>
                        <input type="text" name="documentedPermissions" placeholder="Describe how they're documented" onChange={handleChange} />  
                    </div>
                </div>

                <h2>5.2.1.1.3.3 Data Sharing and Disclosure:</h2>
                <div className="form-section">
                    <label>Under what circumstances can student data be shared or disclosed to third parties (e.g., parents, other educational institutions, law enforcement)?</label>
                    <div>
                        <input type="text" name="sharedData" placeholder="Describe the circumstances" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What procedures are followed to obtain consent before sharing student data, and how is consent recorded?</label>
                    <div>
                        <input type="text" name="obtainingConsent" placeholder="Describe the procedures" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How does the organization ensure that third parties comply with FERPA requirements when handling student data?</label>
                    <div>
                        <input type="text" name="complyingRequirements" placeholder="Describe how it's ensured" onChange={handleChange} />  
                    </div>
                </div>

                <h2>5.2.1.1.3.4 Data Security Measures:</h2>
                <div className="form-section">
                    <label>What security measures are implemented to protect student data from unauthorized access, breaches, or loss (e.g., encryption, access controls)?</label>
                    <div>
                        <input type="text" name="securityMeasures" placeholder="Describe the measures" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are physical and electronic data storage methods secured to prevent unauthorized access or data breaches?</label>
                    <div>
                        <input type="text" name="securingStorage" placeholder="Describe how it's secured" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What is the process for regularly reviewing and updating data security measures?</label>
                    <div>
                        <input type="text" name="reviewingProcess" placeholder="Describe the process" onChange={handleChange} />  
                    </div>
                </div>

                <h2>5.2.1.1.3.5 Data Retention and Disposal:</h2>
                <div className="form-section">
                    <label>How long is student data retained, and what criteria are used to determine retention periods (e.g., educational record retention policies)?</label>
                    <div>
                        <input type="text" name="retainedData" placeholder="Describe how it's retained" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What procedures are in place for the secure disposal of student data that is no longer needed (e.g., shredding physical documents, securely deleting digital files)?</label>
                    <div>
                        <input type="text" name="disposalProcedures" placeholder="Describe the procedures" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How is compliance with data retention and disposal policies monitored and enforced?</label>
                    <div>
                        <input type="text" name="monitoredPolicies" placeholder="Describe how it's monitored" onChange={handleChange} />  
                    </div>
                </div>

                <h2>5.2.1.1.3.6 Parental and Student Rights:</h2>
                <div className="form-section">
                    <label>How are students and parents informed about their rights under FERPA, including the right to access and amend educational records?</label>
                    <div>
                        <input type="text" name="studentRights" placeholder="Describe how they're informed" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What procedures are in place for handling requests from parents or students to access or correct their records?</label>
                    <div>
                        <input type="text" name="requestHandling" placeholder="Describe the procedures" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How is the organization ensuring that individuals are aware of and can exercise their rights under FERPA?</label>
                    <div>
                        <input type="text" name="individualAwareness" placeholder="Describe how it's ensuring" onChange={handleChange} />  
                    </div>
                </div>

                <h2>5.2.1.1.3.7 Training and Awareness:</h2>
                <div className="form-section">
                    <label>What training is provided to staff regarding FERPA compliance and student data privacy (e.g., regular training sessions, informational resources)?</label>
                    <div>
                        <input type="text" name="complianceTraining" placeholder="Describe the training" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How is staff awareness of FERPA requirements maintained and updated?</label>
                    <div>
                        <input type="text" name="staffAwareness" placeholder="Describe how it's maintained" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there specific training programs for new staff members or those in roles with access to student data?</label>
                    <div>
                        <input type="radio" name="trainingPrograms" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="trainingPrograms" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>5.2.1.1.3.8 Incident Response and Reporting:</h2>
                <div className="form-section">
                    <label>What procedures are in place for responding to and reporting data breaches or privacy incidents involving student data?</label>
                    <div>
                        <input type="text" name="reportingBreaches" placeholder="Describe the procedures" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are incidents documented and investigated, and what actions are taken to address and mitigate the impact?</label>
                    <div>
                        <input type="text" name="documentingIncidents" placeholder="Describe how they're documented" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How is the organization prepared to notify affected individuals and regulatory authorities if required?</label>
                    <div>
                        <input type="text" name="notifyingIndividuals" placeholder="Describe how it's prepared" onChange={handleChange} />  
                    </div>
                </div>

                <h2>5.2.1.1.3.9 Policy Enforcement and Audits:</h2>
                <div className="form-section">
                    <label>How is compliance with student data privacy policies monitored and enforced within the organization?</label>
                    <div>
                        <input type="text" name="monitoringData" placeholder="Describe how it's monitored" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What audit processes are in place to assess the effectiveness of privacy policies and procedures?</label>
                    <div>
                        <input type="text" name="auditProcesses" placeholder="Describe the processes" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are audit findings used to improve and update privacy practices?</label>
                    <div>
                        <input type="text" name="auditFindings" placeholder="Describe how they're used" onChange={handleChange} />  
                    </div>
                </div>

                <h2>5.2.1.1.3.10 Policy Review and Updates:</h2>
                <div className="form-section">
                    <label>How frequently are student data privacy policies reviewed and updated to reflect changes in regulations or organizational practices?</label>
                    <div>
                        <input type="text" name="frequentlyReviewedPolicies" placeholder="Describe how frequent" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What process is followed to ensure that updates to policies are communicated to relevant stakeholders?</label>
                    <div>
                        <input type="text" name="updatingPolicies" placeholder="Describe the process" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How does the organization incorporate feedback and lessons learned into policy revisions?</label>
                    <div>
                        <input type="text" name="incorporatingFeedback" placeholder="Describe how they incorporate feedback" onChange={handleChange} />  
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit">Submit</button>

            </form>
        </main>
    </div>
  )
}

export default StudentDataPrivacyPoliciesFormPage;