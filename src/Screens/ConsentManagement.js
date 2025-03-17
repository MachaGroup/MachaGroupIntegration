import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import Navbar from "./Navbar";
/**/
function ConsentManagementFormPage() {
  const navigate = useNavigate();  // Initialize useNavigate hook for navigation
  const { buildingId } = useBuilding();
  const db = getFirestore();

  const [formData, setFormData] = useState();
  const storage = getStorage();
  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadError, setUploadError] = useState(null);


  useEffect(() => {
    if(!buildingId) {
      alert('No builidng selected. Redirecting to Building Info...');
      navigate('BuildingandAddress');
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
              const formsRef = collection(db, 'forms/Policy and Compliance/Consent Management');
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
      const formsRef = collection(db, 'forms/Policy and Compliance/Consent Management');
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
            <h1>5.2.1.2.2 Consent Management Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 5.2.1.2.2 Consent Management */}
                <h2>5.2.1.2.2.1 Consent Collection Methods:</h2>
                <div className="form-section">
                    <label>What methods are used to collect consent from individuals (e.g., online forms, paper consent forms, verbal agreements)?</label>
                    <div>
                        <input type="text" name="collectingConsent" placeholder="Describe the methods" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How is consent obtained for different types of data processing activities (e.g., marketing, data sharing, profiling)?</label>
                    <div>
                        <input type="text" name="obtainingConsent" placeholder="Describe how it's obtained" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there mechanisms in place to verify the authenticity of consent (e.g., email confirmation, identity verification)?</label>
                    <div>
                        <input type="radio" name="verifyingAuthenticity" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="verifyingAuthenticity" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="verifyingAuthenticityComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>5.2.1.2.2.2 Consent Records and Documentation:</h2>
                <div className="form-section">
                    <label>How is consent documentation maintained and stored (e.g., digital records, physical files)?</label>
                    <div>
                        <input type="text" name="maintaingDocumentation" placeholder="Describe how it's maintained" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What information is recorded as part of the consent process (e.g., date of consent, scope of consent, consent method)?</label>
                    <div>
                        <input type="text" name="recordedInformation" placeholder="Describe the information" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How is consent documentation made accessible for auditing and compliance purposes?</label>
                    <div>
                        <input type="text" name="accessibleDocumentation" placeholder="Describe how it's accessible" onChange={handleChange} />  
                    </div>
                </div>

                <h2>5.2.1.2.2.3 Consent Renewal and Reaffirmation:</h2>
                <div className="form-section">
                    <label>How often is consent reviewed and renewed to ensure it remains valid (e.g., periodic renewals, triggered by changes in processing activities)?</label>
                    <div>
                        <input type="text" name="reviewedConsent" placeholder="Describe how often" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What procedures are in place for reaffirming consent if there are significant changes to data processing practices?</label>
                    <div>
                        <input type="text" name="reaffirmingConsent" placeholder="Describe the procedures" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are individuals notified about the need to renew or reaffirm their consent?</label>
                    <div>
                        <input type="text" name="notifiedIndividuals" placeholder="Describe how they're notified" onChange={handleChange} />  
                    </div>
                </div>

                <h2>5.2.1.2.2.4 Consent Withdrawal Procedures:</h2>
                <div className="form-section">
                    <label>What processes are in place for individuals to withdraw their consent (e.g., opt-out options, contact methods)?</label>
                    <div>
                        <input type="text" name="withdrawingConsent" placeholder="Describe the processes" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How is consent withdrawal managed and recorded to ensure that data processing ceases promptly?</label>
                    <div>
                        <input type="text" name="managingWithdrawal" placeholder="Describe how it's managed" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are individuals informed about the consequences of withdrawing consent (e.g., loss of access to certain services)?</label>
                    <div>
                        <input type="radio" name="informedConsequences" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="informedConsequences" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="informedConsequencesComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>5.2.1.2.2.5 Consent Management Tools and Systems:</h2>
                <div className="form-section">
                    <label>What tools or systems are used to manage consent (e.g., consent management platforms, CRM systems)?</label>
                    <div>
                        <input type="text" name="managingTools" placeholder="Describe the tools" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How do these tools integrate with other systems to ensure consistent application of consent policies?</label>
                    <div>
                        <input type="text" name="integratingTools" placeholder="Describe how it integrates" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What measures are taken to ensure the security and integrity of consent management systems?</label>
                    <div>
                        <input type="text" name="securityMeasures" placeholder="Describe the measures" onChange={handleChange} />  
                    </div>
                </div>

                <h2>5.2.1.2.2.6 Compliance with Regulations:</h2>
                <div className="form-section">
                    <label>How does your organization ensure compliance with relevant data protection regulations related to consent (e.g., GDPR, CCPA)?</label>
                    <div>
                        <input type="text" name="ensuringCompliance" placeholder="Describe how it ensure compliance" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What steps are taken to align consent practices with legal requirements and industry standards?</label>
                    <div>
                        <input type="text" name="consentPractices" placeholder="Describe the steps" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are changes in regulations incorporated into consent management practices?</label>
                    <div>
                        <input type="text" name="incorporatedRegulations" placeholder="Describe how they're incorporated" onChange={handleChange} />  
                    </div>
                </div>

                <h2>5.2.1.2.2.7 Transparency and Communication:</h2>
                <div className="form-section">
                    <label>How is information about consent practices communicated to individuals (e.g., privacy notices, consent forms)?</label>
                    <div>
                        <input type="text" name="communicatedPractices" placeholder="Describe how it's communicated" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are individuals provided with clear and understandable information about what they are consenting to and their rights?</label>
                    <div>
                        <input type="radio" name="clearConsentingInformation" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="clearConsentingInformation" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="clearConsentingInformationComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>What methods are used to ensure that consent information is accessible and comprehensible to all individuals, including those with disabilities?</label>
                    <div>
                        <input type="text" name="assessibleInformation" placeholder="Describe the methods" onChange={handleChange} />  
                    </div>
                </div>

                <h2>5.2.1.2.2.8 Data Subject Rights:</h2>
                <div className="form-section">
                    <label>How are individuals' rights related to consent protected (e.g., right to access, right to rectification)?</label>
                    <div>
                        <input type="text" name="protectedConsent" placeholder="Describe how they're protected" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What procedures are in place for individuals to exercise their rights regarding their consent and personal data?</label>
                    <div>
                        <input type="text" name="exercisingRights" placeholder="Describe the procedures" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How is compliance with data subject rights monitored and enforced?</label>
                    <div>
                        <input type="text" name="monitoredRights" placeholder="Describe how it's monitored" onChange={handleChange} />  
                    </div>
                </div>

                <h2>5.2.1.2.2.9 Training and Awareness:</h2>
                <div className="form-section">
                    <label>What training is provided to staff involved in consent management (e.g., understanding consent requirements, handling consent requests)?</label>
                    <div>
                        <input type="text" name="staffTraining" placeholder="Describe the training" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How is staff awareness of consent policies and procedures maintained and updated?</label>
                    <div>
                        <input type="text" name="staffAwareness" placeholder="Describe how it's maintained" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there resources available to support staff in managing consent effectively (e.g., guidelines, templates)?</label>
                    <div>
                        <input type="radio" name="supportResources" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="supportResources" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="supportResourcesComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>5.2.1.2.2.9 Audit and Review:</h2>
                <div className="form-section">
                    <label>How frequently are consent management practices audited to ensure compliance and effectiveness (e.g., internal audits, external reviews)?</label>
                    <div>
                        <input type="text" name="auditedPractices" placeholder="Describe how frequent" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What criteria are used to assess the effectiveness of consent management practices and make improvements?</label>
                    <div>
                        <input type="text" name="accessingEffectiveness" placeholder="Describe the criteria" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are audit findings and recommendations used to enhance consent management processes?</label>
                    <div>
                        <input type="text" name="auditFindings" placeholder="Describe how they're used" onChange={handleChange} />  
                    </div>
                </div>

                {/* Submit Button */}
                <input type="file" accept="image/*" onChange={handleImageChange} />
{uploadProgress > 0 && <p>Upload Progress: {uploadProgress.toFixed(2)}%</p>}
{imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
{uploadError && <p style={{ color: "red" }}>{uploadError}</p>}
<button type="submit">Submit</button>

            </form>
        </main>
    </div>
  )
}

export default ConsentManagementFormPage;