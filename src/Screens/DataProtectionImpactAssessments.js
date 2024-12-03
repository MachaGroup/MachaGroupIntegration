import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import Navbar from "./Navbar";

function DataProtectionImpactAssessmentsFormPage() {
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
      const formsRef = collection(db, 'forms/Policy and Compliance/Data Protection Impact Assessments');
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
            <h1>5.2.1.2.1 Data Protection Impact Assessments (DPIA) Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 5.2.1.2.1 Data Protection Impact Assessments (DPIA) */}
                <h2>5.2.1.2.1.1 Assessment Process:</h2>
                <div className="form-section">
                    <label>What is the process for conducting Data Protection Impact Assessments (DPIAs) within your organization (e.g., step-by-step methodology)?</label>
                    <div>
                        <input type="text" name="conductingProcess" placeholder="Describe the process" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Who is responsible for initiating and overseeing DPIAs (e.g., Data Protection Officer, compliance team)?</label>
                    <div>
                        <input type="text" name="overseeingDPIAs" placeholder="Who's responsible" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are the results of a DPIA documented and communicated to relevant stakeholders?</label>
                    <div>
                        <input type="text" name="documentedResults" placeholder="Describe how they're documented" onChange={handleChange} />  
                    </div>
                </div>

                <h2>5.2.1.2.1.2 Risk Identification and Evaluation:</h2>
                <div className="form-section">
                    <label>How does your organization identify and assess risks associated with personal data processing activities (e.g., risk assessment frameworks, threat modeling)?</label>
                    <div>
                        <input type="text" name="identifyingRisks" placeholder="Describe how they identify risks" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What criteria are used to evaluate the potential impact of these risks on individuals' privacy and data protection (e.g., severity of impact, likelihood of occurrence)?</label>
                    <div>
                        <input type="text" name="evaluatingRisks" placeholder="Describe the criteria" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are risk mitigation strategies developed and implemented based on the DPIA findings?</label>
                    <div>
                        <input type="text" name="mitigationStrategies" placeholder="Describe how they're developed" onChange={handleChange} />  
                    </div>
                </div>

                <h2>5.2.1.2.1.3 Stakeholder Consultation:</h2>
                <div className="form-section">
                    <label>How are stakeholders involved in the DPIA process (e.g., consultation with affected individuals, engagement with legal or compliance experts)?</label>
                    <div>
                        <input type="text" name="mitigationStrategies" placeholder="Describe how they're involved" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What methods are used to gather feedback from stakeholders and incorporate it into the DPIA findings (e.g., surveys, interviews)?</label>
                    <div>
                        <input type="text" name="gatheringFeedback" placeholder="Describe the methods" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are stakeholders informed about the outcomes of the DPIA and any actions taken as a result?</label>
                    <div>
                        <input type="text" name="informingStakeholders" placeholder="Describe how they're informed" onChange={handleChange} />  
                    </div>
                </div>

                <h2>5.2.1.2.1.4 Integration with Project Planning:</h2>
                <div className="form-section">
                    <label>How are DPIAs integrated into the project planning and development lifecycle (e.g., early identification of data protection requirements, incorporation into project milestones)?</label>
                    <div>
                        <input type="text" name="integratedPlanning" placeholder="Describe how they're integrated" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What steps are taken to ensure that DPIA recommendations are addressed during the implementation of new projects or systems?</label>
                    <div>
                        <input type="text" name="addressedRecommendations" placeholder="Describe the steps" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How is compliance with DPIA recommendations monitored and enforced throughout the project lifecycle?</label>
                    <div>
                        <input type="text" name="monitoredRecommendations" placeholder="Describe how they're monitored" onChange={handleChange} />  
                    </div>
                </div>

                <h2>5.2.1.2.1.5 Documentation and Record-Keeping:</h2>
                <div className="form-section">
                    <label>What documentation is required for a DPIA, and how is it maintained (e.g., assessment reports, risk mitigation plans)?</label>
                    <div>
                        <input type="text" name="requiredDocumentation" placeholder="Describe the documentation" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are DPIA records stored and protected to ensure they are accessible and secure (e.g., digital records, physical storage)?</label>
                    <div>
                        <input type="text" name="storedRecords" placeholder="Describe how they're stored" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What procedures are in place for reviewing and updating DPIA documentation as needed?</label>
                    <div>
                        <input type="text" name="reviewingDocumentation" placeholder="Describe the procedures" onChange={handleChange} />  
                    </div>
                </div>

                <h2>5.2.1.2.1.6 Review and Monitoring:</h2>
                <div className="form-section">
                    <label>How often are DPIAs reviewed and updated to reflect changes in data processing activities or regulatory requirements (e.g., annual reviews, periodic audits)?</label>
                    <div>
                        <input type="text" name="reviewedDPIAs" placeholder="Describe how often" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What mechanisms are in place to monitor the effectiveness of DPIA measures and their impact on data protection (e.g., performance metrics, feedback loops)?</label>
                    <div>
                        <input type="text" name="monitoringEffectiveness" placeholder="Describe the mechanisms" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are lessons learned from DPIA reviews used to improve future assessments and data protection practices?</label>
                    <div>
                        <input type="text" name="lessonsLearned" placeholder="Describe how they're used" onChange={handleChange} />  
                    </div>
                </div>

                <h2>5.2.1.2.1.7 Compliance with GDPR Requirements:</h2>
                <div className="form-section">
                    <label>How does your organization ensure compliance with GDPR requirements related to DPIAs (e.g., adherence to Article 35, documentation requirements)?</label>
                    <div>
                        <input type="text" name="relatedRequirements" placeholder="Describe how it's ensured" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What steps are taken to address any non-compliance issues identified during the DPIA process?</label>
                    <div>
                        <input type="text" name="addressingIssues" placeholder="Describe the steps" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are changes in GDPR regulations or guidance incorporated into your organization's DPIA practices?</label>
                    <div>
                        <input type="text" name="incorporatingChanges" placeholder="Describe how they're incorporated" onChange={handleChange} />  
                    </div>
                </div>

                <h2>5.2.1.2.1.8 Training and Awareness:</h2>
                <div className="form-section">
                    <label>What training is provided to staff involved in conducting or overseeing DPIAs (e.g., data protection principles, assessment techniques)?</label>
                    <div>
                        <input type="text" name="staffTraining" placeholder="Describe the training" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How is staff awareness of DPIA requirements and their role in the process maintained and updated?</label>
                    <div>
                        <input type="text" name="maintainingAwareness" placeholder="Describe how it's maintained" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there resources available to support staff in conducting effective DPIAs (e.g., guidelines, templates)?</label>
                    <div>
                        <input type="radio" name="supportResources" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="supportResources" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>5.2.1.2.1.9 Third-Party Assessments:</h2>
                <div className="form-section">
                    <label>How are third-party vendors or partners involved in the DPIA process, and what is their role in ensuring data protection (e.g., third-party assessments, contracts)?</label>
                    <div>
                        <input type="text" name="involvingVendors" placeholder="Describe how they're involved" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What procedures are in place to evaluate and manage risks associated with third-party data processing activities?</label>
                    <div>
                        <input type="text" name="evaluatingRisks" placeholder="Describe the procedures" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How is compliance with DPIA requirements ensured when working with external parties?</label>
                    <div>
                        <input type="text" name="ensuringCompliance" placeholder="Describe how it's ensured" onChange={handleChange} />  
                    </div>
                </div>

                <h2>5.2.1.2.1.10 Impact on Data Subjects:</h2>
                <div className="form-section">
                    <label>How are the potential impacts on data subjects considered and addressed during the DPIA process (e.g., data minimization, transparency)?</label>
                    <div>
                        <input type="text" name="potentialImpacts" placeholder="Describe how they're considered" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What measures are in place to inform and protect data subjects based on DPIA findings (e.g., privacy notices, consent mechanisms)?</label>
                    <div>
                        <input type="text" name="protectingSubjects" placeholder="Describe the measures" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How is feedback from data subjects used to improve DPIA practices and data protection measures?</label>
                    <div>
                        <input type="text" name="improvingPractices" placeholder="Describe how it's used" onChange={handleChange} />  
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit">Submit</button>

            </form>
        </main>
    </div>
  )
}

export default DataProtectionImpactAssessmentsFormPage;