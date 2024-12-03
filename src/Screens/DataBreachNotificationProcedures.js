import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import Navbar from "./Navbar";

function DataBreachNotificationProceduresFormPage() {
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
      const formsRef = collection(db, 'forms/Policy and Compliance/Data Breach Notification Procedures');
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
            <h1>5.2.1.1.4 Data Breach Notification Procedures Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 5.2.1.1.4 Data Breach Notification Procedures */}
                <h2>5.2.1.1.4.1 Notification Triggers:</h2>
                <div className="form-section">
                    <label>What criteria are used to determine if a data breach has occurred and requires notification (e.g., unauthorized access, loss of data)?</label>
                    <div>
                        <input type="text" name="determiningBreaches" placeholder="Describe the criteria" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are potential data breaches assessed to confirm their validity and severity?</label>
                    <div>
                        <input type="text" name="assessedBreaches" placeholder="Describe how they're assessed" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Who is responsible for making the determination that a data breach has occurred?</label>
                    <div>
                        <input type="text" name="determinationResponsibility" placeholder="Who's responsible" onChange={handleChange} />  
                    </div>
                </div>

                <h2>5.2.1.1.4.2 Notification Timeliness:</h2>
                <div className="form-section">
                    <label>What is the timeframe for notifying affected individuals after a data breach is identified (e.g., within 72 hours, immediately)</label>
                    <div>
                        <input type="text" name="notifyingTimeframe" placeholder="Describe the timeframe" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How is this timeframe determined and communicated within the organization?</label>
                    <div>
                        <input type="text" name="determinedTimeframe" placeholder="Describe how it's determined" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there processes in place to ensure that notifications are sent promptly and accurately?</label>
                    <div>
                        <input type="radio" name="sentNotifications" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="sentNotifications" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>5.2.1.1.4.3 Notification Content:</h2>
                <div className="form-section">
                    <label>What information is included in breach notification letters or messages (e.g., nature of the breach, types of data affected, potential impacts)?</label>
                    <div>
                        <input type="text" name="notificationLetters" placeholder="Describe the information" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How is the notification content tailored to ensure clarity and understanding for affected individuals?</label>
                    <div>
                        <input type="text" name="determinedTimeframe" placeholder="Describe how it's determined" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there templates or guidelines used to ensure consistency in notifications?</label>
                    <div>
                        <input type="radio" name="consistencyGuidelines" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="consistencyGuidelines" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>5.2.1.1.4.4 Affected Parties:</h2>
                <div className="form-section">
                    <label>Who must be notified in the event of a data breach (e.g., individuals whose data was compromised, regulatory authorities)?</label>
                    <div>
                        <input type="text" name="notifyingWho" placeholder="Who needs to be notified" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are notification lists maintained and updated to ensure that all affected parties are contacted?</label>
                    <div>
                        <input type="text" name="maintainedLists" placeholder="Describe how they're maintained" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What procedures are followed to handle notifications for individuals who may be difficult to reach?</label>
                    <div>
                        <input type="text" name="handlingNotifications" placeholder="Describe the procedures" onChange={handleChange} />  
                    </div>
                </div>

                <h2>5.2.1.1.4.5 Regulatory Compliance:</h2>
                <div className="form-section">
                    <label>What regulatory requirements govern data breach notifications (e.g., GDPR, CCPA, FERPA), and how does the organization ensure compliance?</label>
                    <div>
                        <input type="text" name="governingRequirements" placeholder="Describe the requirements" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How is the organization prepared to meet specific notification requirements set forth by different regulations?</label>
                    <div>
                        <input type="text" name="notificationRequirements" placeholder="Describe how they're prepared" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there procedures in place for reporting breaches to regulatory authorities, and what information must be included in such reports?</label>
                    <div>
                        <input type="radio" name="reportingBreaches" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="reportingBreaches" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>5.2.1.1.4.6 Communication Channels:</h2>
                <div className="form-section">
                    <label>What methods are used to notify affected individuals (e.g., email, postal mail, phone calls)?</label>
                    <div>
                        <input type="text" name="notifyingIndividuals" placeholder="Describe the methods" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are communication channels chosen based on the nature and severity of the breach?</label>
                    <div>
                        <input type="text" name="chosenChannels" placeholder="Describe how they're chosen" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there backup communication methods in case primary channels are unavailable or ineffective?</label>
                    <div>
                        <input type="radio" name="backupMethods" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="backupMethods" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>5.2.1.1.4.7 Support and Guidance:</h2>
                <div className="form-section">
                    <label>What support is provided to individuals affected by a data breach (e.g., credit monitoring, identity theft protection)?</label>
                    <div>
                        <input type="text" name="affectedIndividuals" placeholder="Describe the support" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How is information about available resources and support services communicated to affected individuals?</label>
                    <div>
                        <input type="text" name="communicatedResources" placeholder="Describe how it's communicated" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there procedures for addressing questions and concerns from affected individuals?</label>
                    <div>
                        <input type="radio" name="addressingQuestions" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="addressingQuestions" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>5.2.1.1.4.8 Internal Notification and Reporting:</h2>
                <div className="form-section">
                    <label>How are internal stakeholders notified about the data breach (e.g., senior management, IT department)?</label>
                    <div>
                        <input type="text" name="notifiedStakeholders" placeholder="Describe how they're notified" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>What internal reporting procedures are followed to ensure that all relevant parties are informed and involved in the response?</label>
                    <div>
                        <input type="text" name="internalProcedures" placeholder="Describe the procedures" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How is information about the breach documented and shared within the organization?</label>
                    <div>
                        <input type="text" name="documentedBreaches" placeholder="Describe how it's documented" onChange={handleChange} />  
                    </div>
                </div>

                <h2>5.2.1.1.4.9 Post-Breach Review and Improvement:</h2>
                <div className="form-section">
                    <label>What processes are in place to review and analyze the breach and notification process after an incident?</label>
                    <div>
                        <input type="text" name="reviewingProcesses" placeholder="Describe the processes" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How is feedback from the breach notification process used to improve procedures and policies?</label>
                    <div>
                        <input type="text" name="procedureFeedback" placeholder="Describe how it's used" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there mechanisms for updating notification procedures based on lessons learned from previous breaches?</label>
                    <div>
                        <input type="radio" name="updatingProcedures" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="updatingProcedures" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>5.2.1.1.4.10 Legal and Public Relations:</h2>
                <div className="form-section">
                    <label>What legal considerations are taken into account when preparing breach notifications (e.g., potential legal liabilities, compliance issues)?</label>
                    <div>
                        <input type="text" name="notificationConsiderations" placeholder="Describe the considerations" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How is public relations managed to address the breach and maintain trust with affected individuals and stakeholders?</label>
                    <div>
                        <input type="text" name="managedRelations" placeholder="Describe how it's managed" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there guidelines for handling media inquiries and public statements related to the breach?</label>
                    <div>
                        <input type="radio" name="handlingMedia" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="handlingMedia" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit">Submit</button>

            </form>
        </main>
    </div>
  )
}

export default DataBreachNotificationProceduresFormPage;