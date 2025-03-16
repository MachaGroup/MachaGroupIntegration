import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import Navbar from "./Navbar";
/**/
function DataSharingPoliciesFormPage() {
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
  const handleBack = async () => {
          if (formData && buildingId) { // Check if formData and buildingId exist
            try {
              const buildingRef = doc(db, 'Buildings', buildingId);
              const formsRef = collection(db, 'forms/Policy and Compliance/Data Sharing Policies');
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
    
    if(!buildingId) {
      alert('Building ID is missing. Please start the assessment from the correct page.');
      return;
    }

    try {
      // Create a document reference to the building in the 'Buildings' collection
      const buildingRef = doc(db, 'Buildings', buildingId);

      // Store the form data in the specified Firestore structure
      const formsRef = collection(db, 'forms/Policy and Compliance/Data Sharing Policies');
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
            <h1>5.1.1.2.2 Data Sharing Policies Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 5.1.1.2.2 Data Sharing Policies */}
                <h2>5.1.1.2.2.1 Approval and Authorization:</h2>
                <div className="form-section">
                    <label>What is the process for approving data sharing requests with third parties?</label>
                    <div>
                        <input type="text" name="approvingRequests" placeholder="Describe the process" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Who has the authority to authorize data sharing agreements or contracts?</label>
                    <div>
                        <input type="text" name="authorizingAgreements" placeholder="Who's authorized" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there specific criteria that must be met before data sharing is approved?</label>
                    <div>
                        <input type="radio" name="approvedData" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="approvedData" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="approvedDataComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>5.1.1.2.2.2 Data Sharing Agreements:</h2>
                <div className="form-section">
                    <label>What are the key components of data sharing agreements with third parties (e.g., terms, conditions, data protection clauses)?</label>
                    <div>
                        <input type="text" name="keyComponents" placeholder="Describe the key components" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are data sharing agreements documented and maintained?</label>
                    <div>
                        <input type="text" name="documentedAgreements" placeholder="Describe how it's documented and maintained" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there standard templates or guidelines used for drafting data sharing agreements?</label>
                    <div>
                        <input type="radio" name="standardGuidelines" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="standardGuidelines" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="standardGuidelinesComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>5.1.1.2.2.3 Data Security Measures:</h2>
                <div className="form-section">
                    <label>What security measures are required for data shared with third parties (e.g., encryption, secure transmission)?</label>
                    <div>
                        <input type="text" name="securityMeasures" placeholder="Describe the measures" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How is data security ensured during the transfer and handling by third parties?</label>
                    <div>
                        <input type="text" name="ensuredSecurity" placeholder="Describe how it's ensured" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there specific requirements for third parties regarding data protection and security controls?</label>
                    <div>
                        <input type="radio" name="thirdpartyRequirements" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="thirdpartyRequirements" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="thirdpartyRequirementsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>5.1.1.2.2.4 Compliance with Regulations:</h2>
                <div className="form-section">
                    <label>How does the organization ensure that data sharing complies with relevant regulations and legal requirements (e.g., GDPR, CCPA)?</label>
                    <div>
                        <input type="text" name="relevantRegulations" placeholder="Describe how it's ensured" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What procedures are in place to verify that third parties comply with data protection regulations?</label>
                    <div>
                        <input type="text" name="verifyingProcedures" placeholder="Describe the procedures" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there regular reviews or audits to ensure compliance with data sharing policies?</label>
                    <div>
                        <input type="radio" name="regularReviews" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="regularReviews" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="regularReviewsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>5.1.1.2.2.5 Data Use and Restrictions:</h2>
                <div className="form-section">
                    <label>What restrictions are placed on the use of shared data by third parties (e.g., limitations on data usage or further sharing)?</label>
                    <div>
                        <input type="text" name="useRestrictions" placeholder="Describe the restrictions" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How is it ensured that third parties adhere to these restrictions?</label>
                    <div>
                        <input type="text" name="ensuredRestrictions" placeholder="Describe how it's ensured" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there mechanisms in place to monitor and enforce compliance with data use restrictions?</label>
                    <div>
                        <input type="radio" name="enforcedCompliance" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="enforcedCompliance" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="enforcedComplianceComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>5.1.1.2.2.6 Data Retention and Disposal:</h2>
                <div className="form-section">
                    <label>What guidelines are in place for the retention and disposal of data shared with third parties?</label>
                    <div>
                        <input type="text" name="retentionGuidelines" placeholder="Describe the guidelines" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How is data securely disposed of or returned once the purpose of sharing has been fulfilled?</label>
                    <div>
                        <input type="text" name="disposedData" placeholder="Describe how it's disposed" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there procedures for verifying that third parties follow proper data disposal practices?</label>
                    <div>
                        <input type="radio" name="verifyingPractices" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="verifyingPractices" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="verifyingPracticesComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>5.1.1.2.2.7 Incident Response and Breach Notification:</h2>
                <div className="form-section">
                    <label>What procedures are followed in the event of a data breach involving shared data?</label>
                    <div>
                        <input type="text" name="followedProcedures" placeholder="Describe the procedures" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are third parties required to report data breaches or security incidents?</label>
                    <div>
                        <input type="text" name="reportingBreaches" placeholder="Describe how they're required" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What steps are taken to address and mitigate the impact of breaches involving shared data?</label>
                    <div>
                        <input type="text" name="mitigatingBreaches" placeholder="Describe the steps" onChange={handleChange} />  
                    </div>
                </div>

                <h2>5.1.1.2.2.8 Training and Awareness:</h2>
                <div className="form-section">
                    <label>What training is provided to employees regarding data sharing policies and procedures?</label>
                    <div>
                        <input type="text" name="employeeTraining" placeholder="Describe the training" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How is awareness of data sharing guidelines maintained among staff involved in data sharing?</label>
                    <div>
                        <input type="text" name="awarenessGuidelines" placeholder="Describe how they're maintained" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there resources or guidelines available to help employees understand and comply with data sharing policies?</label>
                    <div>
                        <input type="radio" name="availableGuidelines" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="availableGuidelines" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="availableGuidelinesComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>5.1.1.2.2.9 Monitoring and Auditing:</h2>
                <div className="form-section">
                    <label>How is compliance with data sharing policies monitored and enforced?</label>
                    <div>
                        <input type="text" name="monitoredPolicies" placeholder="Describe how it's monitored and enforced" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there regular audits conducted to review data sharing practices and agreements?</label>
                    <div>
                        <input type="radio" name="regularAudits" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="regularAudits" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="regularAuditsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>What processes are in place to address any non-compliance identified during audits?</label>
                    <div>
                        <input type="text" name="noncomplianceAudits" placeholder="Describe the processes" onChange={handleChange} />  
                    </div>
                </div>

                <h2>5.1.1.2.2.10 Policy Review and Updates:</h2>
                <div className="form-section">
                    <label>How frequently are data sharing policies reviewed and updated to reflect changes in regulations or organizational needs?</label>
                    <div>
                        <input type="text" name="reviewedPolicies" placeholder="Describe how frequent" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Who is responsible for reviewing and updating the data sharing policies?</label>
                    <div>
                        <input type="text" name="updatingPolicies" placeholder="Who's responsible" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are updates to data sharing policies communicated to relevant stakeholders?</label>
                    <div>
                        <input type="text" name="communicatingUpdates" placeholder="Describe how it's communicated" onChange={handleChange} />  
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit">Submit</button>

            </form>
        </main>
    </div>
  )
}

export default DataSharingPoliciesFormPage;