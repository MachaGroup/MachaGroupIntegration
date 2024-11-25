import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';

function EmergencyCommunicationFormPage() {
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
      const formsRef = collection(db, 'forms/Emergency Preparedness/Emergency Communication');
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
            <h1>Emergency Communication Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
            {/* 2.1.1.2 Communication Systems */}
            <h2>Communication Systems:</h2>
            <div className="form-section">
                <label>Are there dedicated communication systems in place for alerting authorities during emergencies?</label>
                <div>
                    <input type="text" name="dedicatedCommunicationSystems" placeholder="List the communication systems" onChange={handleChange}/>
                </div>
            </div>

            <div className="form-section">
                <label>Do these systems include multiple channels such as telephone, radio, email, and text messaging?</label>
                <div>
                    <input type="radio" name="multipleChannels" value="yes" onChange={handleChange}/> Yes
                    <input type="radio" name="multipleChannels" value="no" onChange={handleChange}/> No
                </div>
            </div>

            <div className="form-section">
                <label>Are communication systems capable of reaching relevant authorities quickly and efficiently?</label>
                <div>
                    <input type="radio" name="efficientCommunicationSystems" value="yes" onChange={handleChange}/> Yes
                    <input type="radio" name="efficientCommunicationSystems" value="no" onChange={handleChange}/> No
                </div>
            </div>
            
            <h2>Emergency Contacts:</h2>
            <div className="form-section">
                <label>Have emergency contact lists been established for relevant authorities, including local law enforcement, fire department, and medical services?</label>
                <div>
                    <input type="radio" name="emergencyContactLists" value="yes" onChange={handleChange}/> Yes
                    <input type="radio" name="emergencyContactLists" value="no" onChange={handleChange}/> No
                </div>
            </div>

            <div className="form-section">
                <label>Are contact details regularly updated to ensure accuracy and reliability?</label>
                <div>
                    <input type="radio" name="updatedContactDetails" value="yes" onChange={handleChange}/> Yes
                    <input type="radio" name="updatedContactDetails" value="no" onChange={handleChange}/> No
                </div>
            </div>

            <div className="form-section">
                <label>Is there a designated point of contact responsible for initiating communication with authorities during emergencies?</label>
                <div>
                    <input type="radio" name="designatedPoc" value="yes" onChange={handleChange}/> Yes
                    <input type="radio" name="designatedPoc" value="no" onChange={handleChange}/> No
                </div>
            </div>

            <h2>Notification Protocols:</h2>
            <div className="form-section">
                <label>Are there clear protocols in place for when and how to notify authorities during different types of emergencies?</label>
                <div>
                    <input type="text" name="notifyAuthorities" placeholder="Describe the protocols to notify authorities" onChange={handleChange}/>
                </div>
            </div>

            <div className="form-section">
                <label>Do staff members understand their roles and responsibilities in initiating communication with authorities?</label>
                <div>
                    <input type="radio" name="staffRolesAndResponsibilities" value="yes" onChange={handleChange}/> Yes
                    <input type="radio" name="staffRolesAndResponsibilities" value="no" onChange={handleChange}/> No
                </div>
            </div>

            <div className="form-section">
                <label>Is there a hierarchy or chain of command to follow for escalating emergency notifications as needed?</label>
                <div>
                    <input type="radio" name="chainOfCommand" value="yes" onChange={handleChange}/> Yes
                    <input type="radio" name="chainOfCommand" value="no" onChange={handleChange}/> No
                </div>
            </div>

            <h2>Speed and Efficiency:</h2>
            <div className="form-section">
                <label>Is the process for alerting authorities designed to be swift and efficient, minimizing response times?</label>
                <div>
                    <input type="radio" name="alertingAuthorities" value="yes" onChange={handleChange}/> Yes
                    <input type="radio" name="alertingAuthorities" value="no" onChange={handleChange}/> No
                </div>
            </div>

            <div className="form-section">
                <label>Are communication systems tested regularly to ensure they are functioning properly and can deliver alerts promptly?</label>
                <div>
                    <input type="radio" name="communicationSystemsTest" value="yes" onChange={handleChange}/> Yes
                    <input type="radio" name="communicationSystemsTest" value="no" onChange={handleChange}/> No
                </div>
            </div>

            <div className="form-section">
                <label>Are there redundancies or backup systems in place to mitigate communication failures during emergencies?</label>
                <div>
                    <input type="text" name="mitigatingCommunicationFailures" placeholder="Describe the redundancies and backup systems" onChange={handleChange}/>
                </div>
            </div>

            <h2>Information Accuracy:</h2>
            <div className="form-section">
                <label>Are staff members trained to provide accurate and detailed information when alerting authorities?</label>
                <div>
                    <input type="radio" name="provideDetailedInformation" value="yes" onChange={handleChange}/> Yes
                    <input type="radio" name="provideDetailedInformation" value="no" onChange={handleChange}/> No
                </div>
            </div>

            <div className="form-section">
                <label>Do they know how to convey essential details such as the nature of the emergency, location, number of individuals affected, and any immediate hazards?</label>
                <div>
                    <input type="radio" name="conveyEssentialDetail" value="yes" onChange={handleChange}/> Yes
                    <input type="radio" name="conveyEssentialDetail" value="no" onChange={handleChange}/> No
                </div>
            </div>

            <div className="form-section">
                <label>Is there a mechanism for verifying information before it is communicated to authorities to prevent misinformation or confusion?</label>
                <div>
                    <input type="text" name="informationVerification" placeholder="Describe the mechanism for verifying information" onChange={handleChange}/>
                </div>
            </div>

            <h2>Coordination with Authorities:</h2>
            <div className="form-section">
                <label>Is there coordination and collaboration with authorities to establish communication protocols and ensure a rapid response to emergencies?</label>
                <div>
                    <input type="radio" name="establishCommunicationProtocolsl" value="yes" onChange={handleChange}/> Yes
                    <input type="radio" name="establishCommunicationProtocolsl" value="no" onChange={handleChange}/> No
                </div>
            </div>

            <div className="form-section">
                <label>Have contact points and procedures been established to facilitate communication between the organization and responding agencies?</label>
                <div>
                    <input type="text" name="facilitateCommunication" placeholder="Describe the contact points and procedures" onChange={handleChange}/>
                </div>
            </div>

            <div className="form-section">
                <label>Are there regular meetings or exercises conducted with authorities to review and refine emergency communication processes?</label>
                <div>
                    <input type="radio" name="refineEmergencyCommunication" value="yes" onChange={handleChange}/> Yes
                    <input type="radio" name="refineEmergencyCommunication" value="no" onChange={handleChange}/> No
                </div>
            </div>

            <h2>Documentation and Review:</h2>
            <div className="form-section">
                <label>Are emergency communication procedures documented in written policies or protocols?</label>
                <div>
                    <input type="radio" name="emergencyCommunicationProcedures" value="yes" onChange={handleChange}/> Yes
                    <input type="radio" name="emergencyCommunicationProcedures" value="no" onChange={handleChange}/> No
                </div>
            </div>

            <div className="form-section">
                <label>Is there a process for reviewing and evaluating the effectiveness of emergency communication during drills or actual incidents?</label>
                <div>
                    <input type="text" name="reviewingAndEvaluating" placeholder="Describe the process" onChange={handleChange}/>
                </div>
            </div>

            <div className="form-section">
                <label>Are lessons learned from past emergencies used to improve communication procedures and response capabilities?</label>
                <div>
                    <input type="radio" name="lessonsLearned" value="yes" onChange={handleChange}/> Yes
                    <input type="radio" name="lessonsLearned" value="no" onChange={handleChange}/> No
                </div>
            </div>

            <button type='submit'>Submit</button>
            </form>
        </main>
    </div>
  )
}

export default EmergencyCommunicationFormPage;