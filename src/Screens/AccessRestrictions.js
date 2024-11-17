import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png'; // Adjust the path if necessary
 
function AccessRestrictionsPage() {
    const navigate = useNavigate();
    const { setBuildingId, buildingId } = useBuilding(); // Access and update buildingId from context
    const db = getFirestore();
 
    const [formData, setFormData] = useState();
 
    useEffect(() => {
        const fetchBuildingIdFromBuildings = async () => {
            if (!buildingId) {
                try {
                    // Replace 'BuildingDocumentID' with your actual document ID in the Buildings collection
                    const buildingDocRef = doc(db, 'Buildings', 'BuildingDocumentID');
                    const buildingSnapshot = await getDoc(buildingDocRef);
 
                    if (buildingSnapshot.exists()) {
                        const buildingData = buildingSnapshot.data();
                        setBuildingId(buildingData.buildingId); // Set buildingId from the fetched document
                    } else {
                        alert('Building information not found. Redirecting...');
                        navigate('/BuildingandAddress');
                    }
                } catch (error) {
                    console.error('Error fetching building ID:', error);
                    alert('Error fetching building information.');
                }
            }
        };
 
        fetchBuildingIdFromBuildings();
    }, [buildingId, navigate, setBuildingId, db]);
 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
 
    const handleBack = () => {
        navigate(-1);
    };
 
    const handleSubmit = async (e) => {
        e.preventDefault();
 
        if (!buildingId) {
            alert('Building ID is missing. Please start from the Building Information page.');
            return;
        }
 
 
        try {
          // Create a document reference to the building in the 'Buildings' collection
          const buildingRef = doc(db, 'Buildings', buildingId);
 
          // Store the form data in the specified Firestore structure
          const formsRef = collection(db, 'forms/Policy and Conpliance/Access Restrictions');
          await addDoc(formsRef, {
              building: buildingRef, // Reference to the building document
              formData: formData, // Store the form data as a nested object
          });
 
          console.log('Form data submitted successfully!');
          alert('Form submitted successfully!');
          navigate('/Form');
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to submit the form. Please try again.');
        }
    };
 
  return (
    <div className="form-page">
        <form onSubmit={handleSubmit}></form>
        <header className="header">
            {/* Back Button */}
        <button className="back-button" onClick={handleBack}>←</button> {/* Back button at the top */}
            <h1>5.1.1.1.1 Access Restrictions Assessment</h1>
        </header>

        <main className="form-container">
            <form>
                {/* 5.1.1.1.1 Access Restrictions */}
                <h2>Recertification Frequency:</h2>
                <div className="form-section">
                    <label>What types of websites or online content are explicitly prohibited by the Acceptable Use Policy (AUP) (e.g., adult content, gambling sites)?</label>
                    <div>
                        <input type="text" name="prohibitedWebsites" placeholder="List the types" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are these restrictions defined and categorized within the policy?</label>
                    <div>
                        <input type="text" name="definedRestrictions" placeholder="Describe how they're defined" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there clear guidelines on what constitutes prohibited websites or online activities?</label>
                    <div>
                        <input type="radio" name="clearGuidelines" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="clearGuidelines" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>Implementation and Enforcement:</h2>
                <div className="form-section">
                    <label>How are access restrictions enforced on the network (e.g., through web filters, firewalls)?</label>
                    <div>
                        <input type="text" name="enforcedRestrictions" placeholder="Describe how they're enforced" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What tools or technologies are used to block access to prohibited websites?</label>
                    <div>
                        <input type="text" name="blockedAccess" placeholder="List the tools/technologies" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How frequently are these tools updated to ensure effectiveness against new or evolving threats?</label>
                    <div>
                        <input type="text" name="frequentUpdates" placeholder="Describe the frequency" onChange={handleChange} />  
                    </div>
                </div>

                <h2>User Notification and Awareness:</h2>
                <div className="form-section">
                    <label>How are users informed about the access restrictions and prohibited websites (e.g., through training, policy documents)?</label>
                    <div>
                        <input type="text" name="informedUsers" placeholder="Describe how they're informed" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there mechanisms in place to notify users when they attempt to access a restricted site?</label>
                    <div>
                        <input type="radio" name="notifiedUsers" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="notifiedUsers" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How is compliance with the AUP communicated to users to ensure they understand the restrictions?</label>
                    <div>
                        <input type="text" name="aupCompliance" placeholder="Describe how it's ensured" onChange={handleChange} />  
                    </div>
                </div>

                <h2>Exceptions and Approvals:</h2>
                <div className="form-section">
                    <label>What procedures are in place for requesting exceptions to the access restrictions (e.g., for educational or research purposes)?</label>
                    <div>
                        <input type="text" name="requestingExceptions" placeholder="Describe the procedures" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Who is authorized to review and approve requests for access to restricted websites?</label>
                    <div>
                        <input type="text" name="authorizedUser" placeholder="Who is authorized" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there documented processes for handling and documenting exceptions?</label>
                    <div>
                        <input type="radio" name="handlingExpectations" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="handlingExpectations" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>Monitoring and Reporting:</h2>
                <div className="form-section">
                    <label>How is user activity monitored to ensure compliance with access restrictions (e.g., logging, auditing)?</label>
                    <div>
                        <input type="text" name="monitoredActivity" placeholder="Describe how it's monitored" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What methods are used to track and report attempts to access prohibited websites?</label>
                    <div>
                        <input type="text" name="reportMethods" placeholder="Describe the methods" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are violations of access restrictions addressed and managed?</label>
                    <div>
                        <input type="text" name="addressedViolations" placeholder="Describe how it's addressed" onChange={handleChange} />  
                    </div>
                </div>

                <h2>Policy Review and Updates:</h2>
                <div className="form-section">
                    <label>How frequently is the Acceptable Use Policy reviewed and updated to reflect changes in technology and threats?</label>
                    <div>
                        <input type="text" name="reviewedPolicy" placeholder="Describe the frequency" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Who is responsible for reviewing and revising the policy, and what criteria are used for updates?</label>
                    <div>
                        <input type="text" name="revisingPolicy" placeholder="Who's responsible/describe the criteria" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are updates communicated to users to ensure they are aware of any changes in access restrictions?</label>
                    <div>
                        <input type="text" name="communicatedUpdates" placeholder="Describe how it's ensured" onChange={handleChange} />  
                    </div>
                </div>

                <h2>Legal and Regulatory Compliance:</h2>
                <div className="form-section">
                    <label>What legal or regulatory requirements impact the development and enforcement of access restrictions (e.g., data protection laws)?</label>
                    <div>
                        <input type="text" name="impactedRequirements" placeholder="Describe the requirements" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How does the policy ensure compliance with relevant laws and regulations regarding internet usage?</label>
                    <div>
                        <input type="text" name="ensuredCompliance" placeholder="Describe how it ensures compliance" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there procedures for addressing legal or regulatory issues related to access restrictions?</label>
                    <div>
                        <input type="radio" name="legalIssues" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="legalIssues" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>User Education and Training:</h2>
                <div className="form-section">
                    <label>What training programs are in place to educate users about the Acceptable Use Policy and access restrictions?</label>
                    <div>
                        <input type="text" name="trainingPrograms" placeholder="Describe the programs" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How is the effectiveness of the training assessed and improved over time?</label>
                    <div>
                        <input type="text" name="assessedTraining" placeholder="Describe how it's assessed" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there resources available for users to better understand the reasons for access restrictions?</label>
                    <div>
                        <input type="radio" name="accessRestrictions" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="accessRestrictions" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>Incident Management:</h2>
                <div className="form-section">
                    <label>What steps are taken when a user repeatedly attempts to access prohibited websites or violates access restrictions?</label>
                    <div>
                        <input type="text" name="violatingAccess" placeholder="List the steps" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are incidents related to access restriction violations documented and managed?</label>
                    <div>
                        <input type="text" name="restrictionViolations" placeholder="Describe how it's related" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What disciplinary actions are outlined in the policy for non-compliance?</label>
                    <div>
                        <input type="text" name="disciplinaryActions" placeholder="Describe the actions" onChange={handleChange} />  
                    </div>
                </div>

                <h2>Feedback and Improvement:</h2>
                <div className="form-section">
                    <label>How is feedback collected from users regarding the effectiveness and impact of access restrictions?</label>
                    <div>
                        <input type="text" name="collectedFeedback" placeholder="Describe how it's collected" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there mechanisms for users to provide suggestions or report issues related to access restrictions?</label>
                    <div>
                        <input type="radio" name="relatedSuggestions" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="relatedSuggestions" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How is feedback used to make improvements to the Acceptable Use Policy and access restriction mechanisms?</label>
                    <div>
                        <input type="text" name="improvementFeedback" placeholder="Describe how it's used" onChange={handleChange} />  
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit">Submit</button>
            </form>
        </main>
    </div>
  )
}

export default AccessRestrictionsPage;