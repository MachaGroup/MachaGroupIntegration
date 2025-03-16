import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import Navbar from "./Navbar";
/**/
function DataClassificationFormPage() {
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
              const formsRef = collection(db, 'forms/Policy and Compliance/Data Classification');
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
      const formsRef = collection(db, 'forms/Policy and Compliance/Data Classification');
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
            <h1>5.1.1.2.1 Data Classification Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 5.1.1.1.2 Personal Device Usage */}
                <h2>5.1.1.2.1.1 Classification Criteria:</h2>
                <div className="form-section">
                    <label>What criteria are used to classify data into different categories (e.g., sensitive, confidential, public)?</label>
                    <div>
                        <input type="text" name="classifyingData" placeholder="Describe the criteria" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are data classification levels defined and documented?</label>
                    <div>
                        <input type="text" name="definedLevels" placeholder="Describe how it's defined" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there specific guidelines for determining the sensitivity of data based on its content, context, and intended use?</label>
                    <div>
                        <input type="radio" name="sensitivityGuidelines" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="sensitivityGuidelines" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="sensitivityGuidelinesComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>5.1.1.2.1.2 Data Labeling and Marking:</h2>
                <div className="form-section">
                    <label>What procedures are in place for labeling and marking data according to its classification level?</label>
                    <div>
                        <input type="text" name="labelingData" placeholder="Describe the procedures" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How is data labeling implemented across various data storage and communication platforms?</label>
                    <div>
                        <input type="text" name="labelingImplementation" placeholder="Describe how it's implemented" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there standardized labels or markings used to clearly indicate data classification levels?</label>
                    <div>
                        <input type="radio" name="standardizedLabels" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="standardizedLabels" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="standardizedLabelsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>5.1.1.2.1.3 Access Controls:</h2>
                <div className="form-section">
                    <label>How are access controls implemented based on data classification levels (e.g., restricting access to sensitive data)?</label>
                    <div>
                        <input type="text" name="accessImplementation" placeholder="Describe how it's implemented" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What measures are in place to ensure that only authorized personnel have access to classified data?</label>
                    <div>
                        <input type="text" name="authorizedPersonnel" placeholder="Describe the measures" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are access permissions managed and reviewed for different classification levels?</label>
                    <div>
                        <input type="text" name="managedPermissions" placeholder="Describe how it's managed" onChange={handleChange} />  
                    </div>
                </div>

                <h2>5.1.1.2.1.4 Data Handling Procedures:</h2>
                <div className="form-section">
                    <label>What procedures are followed for handling and processing data based on its classification level (e.g., encryption for sensitive data)?</label>
                    <div>
                        <input type="text" name="handlingData" placeholder="Describe the procedures" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there specific protocols for storing, transmitting, and disposing of classified data?</label>
                    <div>
                        <input type="radio" name="storingData" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="storingData" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="storingDataComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>How are data handling procedures communicated to and followed by employees?</label>
                    <div>
                        <input type="text" name="handlingProcedures" placeholder="Describe how it's communicated" onChange={handleChange} />  
                    </div>
                </div>

                <h2>5.1.1.2.1.5 Training and Awareness:</h2>
                <div className="form-section">
                    <label>What training programs are provided to employees regarding data classification and handling practices?</label>
                    <div>
                        <input type="text" name="trainingPrograms" placeholder="Describe the programs" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How is awareness of data classification policies maintained among staff members?</label>
                    <div>
                        <input type="text" name="maintainedAwareness" placeholder="Describe how it's maintained" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there resources or guidelines available to assist employees in understanding and applying data classification procedures?</label>
                    <div>
                        <input type="radio" name="assistingGuidelines" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="assistingGuidelines" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="assistingGuidelinesComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>5.1.1.2.1.6 Data Protection Measures:</h2>
                <div className="form-section">
                    <label>What measures are in place to protect data based on its classification level (e.g., physical security for sensitive data)?</label>
                    <div>
                        <input type="text" name="protectionMeasures" placeholder="Describe the measures" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How is sensitive data protected from unauthorized access or exposure?</label>
                    <div>
                        <input type="text" name="protectedData" placeholder="Describe how it's protected" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there specific security controls implemented for different data classification levels?</label>
                    <div>
                        <input type="radio" name="securityControls" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="securityControls" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="securityControlsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>5.1.1.2.1.7 Compliance and Auditing:</h2>
                <div className="form-section">
                    <label>How is compliance with data classification policies monitored and enforced?</label>
                    <div>
                        <input type="text" name="classificationPolicies" placeholder="Describe how it's monitored and enforced" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there regular audits conducted to ensure proper classification and handling of data?</label>
                    <div>
                        <input type="radio" name="regularAudits" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="regularAudits" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="regularAuditsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>What processes are in place to address non-compliance with data classification policies?</label>
                    <div>
                        <input type="text" name="noncomplianceProcesses" placeholder="Describe the processes" onChange={handleChange} />  
                    </div>
                </div>

                <h2>5.1.1.2.1.8 Data Sharing and Transfer:</h2>
                <div className="form-section">
                    <label>What guidelines are followed for sharing or transferring data between different classification levels (e.g., secure methods for transferring sensitive data)?</label>
                    <div>
                        <input type="text" name="sharingData" placeholder="Describe the guidelines" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How is data sharing controlled and monitored to prevent unauthorized access?</label>
                    <div>
                        <input type="text" name="controlledData" placeholder="Describe how it's controlled and monitored" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there protocols for documenting and tracking data transfers?</label>
                    <div>
                        <input type="radio" name="documentingProtocols" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="documentingProtocols" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="documentingProtocolsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>5.1.1.2.1.9 Policy Review and Updates:</h2>
                <div className="form-section">
                    <label>How frequently are data classification policies reviewed and updated to reflect changes in regulations or organizational needs?</label>
                    <div>
                        <input type="text" name="reviewedPolocies" placeholder="Describe how it's reviewed and updated" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Who is responsible for reviewing and updating the data classification policies?</label>
                    <div>
                        <input type="text" name="updatingPolocies" placeholder="Who's responsible" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are updates to data classification policies communicated to relevant stakeholders?</label>
                    <div>
                        <input type="text" name="communicatedPolicies" placeholder="Describe how it's communicated" onChange={handleChange} />  
                    </div>
                </div>

                <h2>5.1.1.2.1.10 Incident Management:</h2>
                <div className="form-section">
                    <label>What procedures are followed in the event of a data breach or exposure involving classified data?</label>
                    <div>
                        <input type="text" name="dataExposure" placeholder="Describe the procedures" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are incidents involving misclassification or mishandling of data managed and investigated?</label>
                    <div>
                        <input type="text" name="managedData" placeholder="Describe how it's managed and investigated" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What steps are taken to mitigate the impact of data breaches and prevent future occurrences?</label>
                    <div>
                        <input type="text" name="dataBreaches" placeholder="Describe the steps" onChange={handleChange} />  
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit">Submit</button>

            </form>
        </main>
    </div>
  )
}

export default DataClassificationFormPage;