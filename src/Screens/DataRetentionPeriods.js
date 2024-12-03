import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import Navbar from "./Navbar";

function DataRetentionPeriodsFormPage() {
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
      const formsRef = collection(db, 'forms/Policy and Compliance/Data Retention Periods');
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
            <h1>5.1.2.1.2 Data Retention Periods Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 5.1.2.1.2 Data Retention Periods */}
                <h2>5.1.2.1.2.1 Retention Schedule Creation:</h2>
                <div className="form-section">
                    <label>How are data retention schedules created and maintained?</label>
                    <div>
                        <input type="text" name="retentionSchedules" placeholder="Describe how they're created and maintained" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Who is responsible for developing and approving the data retention schedules?</label>
                    <div>
                        <input type="text" name="developingResponsibility" placeholder="Who's responsible" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What criteria are used to determine retention periods for different types of data?</label>
                    <div>
                        <input type="text" name="retentionCriteria" placeholder="Describe the criteria" onChange={handleChange} />  
                    </div>
                </div>

                <h2>5.1.2.1.2.2 Compliance with Regulations:</h2>
                <div className="form-section">
                    <label>How does the organization ensure that data retention periods comply with relevant laws and regulations (e.g., GDPR, HIPAA)?</label>
                    <div>
                        <input type="text" name="complyingPeriods" placeholder="Describe how it's ensured" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there specific regulations or industry standards that influence data retention periods?</label>
                    <div>
                        <input type="radio" name="industryStandards" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="industryStandards" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How is compliance with legal and regulatory retention requirements monitored?</label>
                    <div>
                        <input type="text" name="monitoredRequirements" placeholder="Describe how it's monitored" onChange={handleChange} />  
                    </div>
                </div>

                <h2>5.1.2.1.2.3 Data Categories and Retention:</h2>
                <div className="form-section">
                    <label>How are different categories of data classified for retention purposes (e.g., personal data, financial records)?</label>
                    <div>
                        <input type="text" name="classifiedPurposes" placeholder="Describe how it's classified" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What are the standard retention periods for each category of data?</label>
                    <div>
                        <input type="text" name="standardPeriods" placeholder="Describe the standard" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there exceptions or special considerations for certain types of data?</label>
                    <div>
                        <input type="radio" name="specialConsiderations" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="specialConsiderations" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>5.1.2.1.2.4 Retention Period Documentation:</h2>
                <div className="form-section">
                    <label>How are data retention periods documented and communicated to relevant stakeholders?</label>
                    <div>
                        <input type="text" name="documentedPeriods" placeholder="Describe how it's documented and communicated" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there a centralized record of all data retention schedules and policies?</label>
                    <div>
                        <input type="radio" name="centralizedRecord" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="centralizedRecord" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How is documentation updated to reflect changes in retention requirements?</label>
                    <div>
                        <input type="text" name="requirementChanges" placeholder="Describe how it's updated" onChange={handleChange} />  
                    </div>
                </div>

                <h2>5.1.2.1.2.5 Data Disposal Procedures:</h2>
                <div className="form-section">
                    <label>What procedures are in place for the disposal of data once retention periods have expired?</label>
                    <div>
                        <input type="text" name="disposalProcedures" placeholder="Describe the procedures" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How is data securely destroyed or deleted to prevent unauthorized access or recovery?</label>
                    <div>
                        <input type="text" name="deletedData" placeholder="Describe how it's destroyed" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there guidelines for handling physical versus electronic data disposal?</label>
                    <div>
                        <input type="radio" name="handlingGuidelines" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="handlingGuidelines" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>5.1.2.1.2.6 Periodic Reviews and Updates:</h2>
                <div className="form-section">
                    <label>How often are data retention periods reviewed and updated to ensure they remain current?</label>
                    <div>
                        <input type="text" name="reviewedPeriods" placeholder="Describe how it's reviewed and updated" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What process is followed to make changes to data retention schedules?</label>
                    <div>
                        <input type="text" name="scheduleChanges" placeholder="Describe the process" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Who is responsible for conducting periodic reviews of data retention practices?</label>
                    <div>
                        <input type="text" name="reviewingResponsibility" placeholder="Who's responsible" onChange={handleChange} />  
                    </div>
                </div>

                <h2>5.1.2.1.2.7 Employee Training and Awareness:</h2>
                <div className="form-section">
                    <label>What training is provided to employees regarding data retention policies and procedures?</label>
                    <div>
                        <input type="text" name="trainingPolicies" placeholder="Describe the training" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How is awareness of data retention requirements maintained among staff?</label>
                    <div>
                        <input type="text" name="maintainedAwareness" placeholder="Describe how it's maintained" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there resources available to help employees understand and comply with retention schedules?</label>
                    <div>
                        <input type="radio" name="employeeResources" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="employeeResources" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>5.1.2.1.2.8 Monitoring and Auditing:</h2>
                <div className="form-section">
                    <label>How is compliance with data retention schedules monitored and enforced?</label>
                    <div>
                        <input type="text" name="monitoredCompliance" placeholder="Describe how it's monitored and enforced" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there regular audits conducted to review adherence to retention policies?</label>
                    <div>
                        <input type="radio" name="conductedAudits" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="conductedAudits" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>What steps are taken to address any non-compliance identified during audits?</label>
                    <div>
                        <input type="text" name="noncomplianceAudits" placeholder="Describe the steps" onChange={handleChange} />  
                    </div>
                </div>

                <h2>5.1.2.1.2.9 Retention for Legal Holds:</h2>
                <div className="form-section">
                    <label>How are data retention schedules adjusted in response to legal holds or investigations?</label>
                    <div>
                        <input type="text" name="adjustedSchedules" placeholder="Describe how it's adjusted" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What procedures are in place to ensure that data subject to legal holds is not disposed of?</label>
                    <div>
                        <input type="text" name="dataHolds" placeholder="Describe the procedures" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are legal holds communicated and managed within the organization?</label>
                    <div>
                        <input type="text" name="communicatedHolds" placeholder="Describe how it's communicated and managed" onChange={handleChange} />  
                    </div>
                </div>

                <h2>5.1.2.1.2.10 Data Retention Policy Communication:</h2>
                <div className="form-section">
                    <label>How are data retention policies communicated to all relevant stakeholders?</label>
                    <div>
                        <input type="text" name="communicatedPolicies" placeholder="Describe how it's communicated and managed" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there clear procedures for updating stakeholders on changes to retention schedules?</label>
                    <div>
                        <input type="radio" name="updatingProcedures" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="updatingProcedures" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How is feedback from stakeholders incorporated into data retention policy updates?</label>
                    <div>
                        <input type="text" name="incorporatedFeedback" placeholder="Describe how it's incorporated" onChange={handleChange} />  
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit">Submit</button>

            </form>
        </main>
    </div>
  )
}

export default DataRetentionPeriodsFormPage;