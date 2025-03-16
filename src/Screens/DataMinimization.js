import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import Navbar from "./Navbar";
/**/
function DataMinimizationFormPage() {
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
              const formsRef = collection(db, 'forms/Policy and Compliance/Data Minimization');
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
      const formsRef = collection(db, 'forms/Policy and Compliance/Data Minimization');
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
            <h1>5.1.2.1.1 Data Minimization Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 5.1.2.1.1 Data Minimization */}
                <h2>5.1.2.1.1.1 Data Collection Practices:</h2>
                <div className="form-section">
                    <label>What criteria are used to determine the necessity of data collected from individuals?</label>
                    <div>
                        <input type="text" name="necessityCriteria" placeholder="Describe the criteria" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there procedures in place to review and justify the data collection requirements for various purposes?</label>
                    <div>
                        <input type="radio" name="reviewingRequirements" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="reviewingRequirements" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="reviewingRequirementsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>How is it ensured that only the minimum amount of data required is collected?</label>
                    <div>
                        <input type="text" name="minimumRequired" placeholder="Describe how it's ensured" onChange={handleChange} />  
                    </div>
                </div>

                <h2>5.1.2.1.1.2 Purpose Limitation:</h2>
                <div className="form-section">
                    <label>How are the purposes for data collection clearly defined and documented?</label>
                    <div>
                        <input type="text" name="definedData" placeholder="Describe how it's defined and documented" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there mechanisms to ensure that data is collected solely for the purposes specified and no other?</label>
                    <div>
                        <input type="radio" name="collectedData" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="collectedData" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="collectedDataComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>What procedures are in place to review and update the purposes for data collection as needed?</label>
                    <div>
                        <input type="text" name="reviewingPurposes" placeholder="Describe the procedures" onChange={handleChange} />  
                    </div>
                </div>

                <h2>5.1.2.1.1.3 Data Access and Use:</h2>
                <div className="form-section">
                    <label>Who has access to the data collected, and how is access limited to only those with a legitimate need?</label>
                    <div>
                        <input type="text" name="dataAccess" placeholder="Who has access" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How is the use of data restricted to the purposes for which it was collected?</label>
                    <div>
                        <input type="text" name="restrictedData" placeholder="Describe how the use is restricted" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there policies to prevent unauthorized or unnecessary use of data?</label>
                    <div>
                        <input type="radio" name="preventingPolicies" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="preventingPolicies" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="preventingPoliciesComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>5.1.2.1.1.4 Data Retention:</h2>
                <div className="form-section">
                    <label>What guidelines are in place for determining the retention periods for different types of data?</label>
                    <div>
                        <input type="text" name="retentionPeriods" placeholder="Describe the guidelines" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How is compliance with data retention policies monitored and enforced?</label>
                    <div>
                        <input type="text" name="monitoredPolicies" placeholder="Describe how it's monitored" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What procedures are followed to securely dispose of or anonymize data once the retention period expires?</label>
                    <div>
                        <input type="text" name="expiringPeriod" placeholder="Describe the procedures" onChange={handleChange} />  
                    </div>
                </div>

                <h2>5.1.2.1.1.5 Review and Auditing:</h2>
                <div className="form-section">
                    <label>How often are data collection practices reviewed to ensure compliance with data minimization principles?</label>
                    <div>
                        <input type="text" name="reviewedPractices" placeholder="Describe how often it's reviewed" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there regular audits conducted to assess whether data minimization is being effectively implemented?</label>
                    <div>
                        <input type="radio" name="regularAudits" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="regularAudits" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="regularAuditsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>What steps are taken to address any findings from reviews or audits related to data minimization?</label>
                    <div>
                        <input type="text" name="reviewFindings" placeholder="Describe the steps" onChange={handleChange} />  
                    </div>
                </div>

                <h2>5.1.2.1.1.6 Training and Awareness:</h2>
                <div className="form-section">
                    <label>What training is provided to staff on data minimization practices and policies?</label>
                    <div>
                        <input type="text" name="minimizationTraining" placeholder="Describe the training" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How is awareness maintained among employees regarding the importance of collecting only necessary data?</label>
                    <div>
                        <input type="text" name="maintainedAwareness" placeholder="Describe how it's maintained" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there resources or guidelines available to help employees understand and apply data minimization principles?</label>
                    <div>
                        <input type="radio" name="principleGuidelines" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="principleGuidelines" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="principleGuidelinesComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>5.1.2.1.1.7 Data Collection Justification:</h2>
                <div className="form-section">
                    <label>Are there documented justifications for why specific types of data are collected?</label>
                    <div>
                        <input type="radio" name="documentedJustifications" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="documentedJustifications" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="documentedJustificationsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>How is it ensured that any changes in data collection practices are properly justified and documented?</label>
                    <div>
                        <input type="text" name="justifiedPractices" placeholder="Describe how it's ensured" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What process is in place for reviewing and approving new data collection initiatives?</label>
                    <div>
                        <input type="text" name="reviewingProcess" placeholder="Describe the process" onChange={handleChange} />  
                    </div>
                </div>

                <h2>5.1.2.1.1.8 Third-Party Data Collection:</h2>
                <div className="form-section">
                    <label>How is data minimization enforced when collecting data through third parties or external vendors?</label>
                    <div>
                        <input type="text" name="enforcedMinimization" placeholder="Describe how it's enforced" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What contractual or procedural safeguards are in place to ensure third parties adhere to data minimization principles?</label>
                    <div>
                        <input type="text" name="contractualSafeguards" placeholder="Describe the safeguards" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How is compliance with data minimization monitored for third-party data collection practices?</label>
                    <div>
                        <input type="text" name="monitoredMinimization" placeholder="Describe how it's monitored" onChange={handleChange} />  
                    </div>
                </div>

                <h2>5.1.2.1.1.9 User Consent and Transparency:</h2>
                <div className="form-section">
                    <label>How is user consent obtained for data collection, and how is it ensured that users are informed about the data being collected?</label>
                    <div>
                        <input type="text" name="obtainedConsent" placeholder="Describe how it's obtained" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there clear and transparent privacy notices provided to individuals regarding the data collection practices?</label>
                    <div>
                        <input type="radio" name="privacyNotices" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="privacyNotices" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="privacyNoticesComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>What procedures are in place to address user inquiries or concerns about data collection?</label>
                    <div>
                        <input type="text" name="userInquiries" placeholder="Describe the procedures" onChange={handleChange} />  
                    </div>
                </div>

                <h2>5.1.2.1.1.10 Policy Review and Updates:</h2>
                <div className="form-section">
                    <label>How frequently are data minimization policies reviewed and updated to reflect changes in regulations or organizational practices?</label>
                    <div>
                        <input type="text" name="reviewedPolicies" placeholder="Describe how frequent" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Who is responsible for reviewing and updating data minimization policies?</label>
                    <div>
                        <input type="text" name="reviewingResponsibility" placeholder="Who's responsible" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are updates to data minimization policies communicated to relevant stakeholders?</label>
                    <div>
                        <input type="text" name="communicatedUpdates" placeholder="Describe how it's communicated" onChange={handleChange} />  
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit">Submit</button>

            </form>
        </main>
    </div>
  )
}

export default DataMinimizationFormPage; 