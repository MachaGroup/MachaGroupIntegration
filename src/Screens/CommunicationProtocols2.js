import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';

function CommunicationProtocols2FormPage() {
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
      const formsRef = collection(db, 'forms/Emergency Preparedness/Communication Protocols');
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
            <h1>Communication Protocols Assessment</h1>
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 2.2.1.2.2 Communication Protocols */}
                <h2>Emergency Communication Systems:</h2>
                <div className="form-section">
                    <label>Are there dedicated communication systems in place to alert authorities and relevant personnel during emergencies?</label>
                    <div>
                        <input type="radio" name="dedicated Communication Systems" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="dedicated Communication Systems" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the communication systems" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Do these systems include various channels such as silent alarms, intercoms, emergency call boxes, or mobile alerts?</label>
                    <div>
                        <input type="radio" name="Multi-Channel Support" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Multi-Channel Support" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are communication systems tested regularly to ensure they are functional and reliable?</label>
                    <div>
                        <input type="radio" name="System Testing" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="System Testing" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>Silent Alarms:</h2>
                <div className="form-section">
                    <label>Are silent alarm systems installed throughout the premises to discreetly signal emergencies without alerting potential threats?</label>
                    <div>
                        <input type="radio" name="Silent Alarms Installed" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Silent Alarms Installed" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Do silent alarms activate without audible alerts to avoid escalating situations or causing panic among occupants?</label>
                    <div>
                        <input type="radio" name="Silent Alarm Discreetness" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Silent Alarm Discreetness" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are designated personnel trained to recognize and respond to silent alarm activations promptly?</label>
                    <div>
                        <input type="radio" name="Personnell Training" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Personnell Training" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="List designated personnel" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Activation Protocols:</h2>
                <div className="form-section">
                    <label>Are there established protocols for activating silent alarms in different emergency scenarios, such as intruders, medical emergencies, or security breaches?</label>
                    <div>
                        <input type="radio" name="Activation Protocols" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Activation Protocols" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the protocols" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are staff members trained on when and how to activate silent alarms and the appropriate response procedures to follow?</label>
                    <div>
                        <input type="radio" name="Staff Training" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Staff Training" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>Monitoring and Response:</h2>
                <div className="form-section">
                    <label>Is there a centralized monitoring system to receive and respond to silent alarm activations?</label>
                    <div>
                        <input type="radio" name="central Monitoring" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="central Monitoring" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the centralized monitoring system" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are designated personnel or security teams tasked with monitoring silent alarms and coordinating response efforts?</label>
                    <div>
                        <input type="radio" name="Security Team Roles" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Security Team Roles" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there a process for verifying alarm activations and escalating responses as needed based on the severity of the situation?</label>
                    <div>
                        <input type="radio" name="Alarm Verification" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Alarm Verification" value="no" onChange={handleChange}/> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the process" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Integration with Emergency Response:</h2>
                <div className="form-section">
                    <label>Are silent alarms integrated into the overall emergency response plan for the premises?</label>
                    <div>
                        <input type="radio" name="Integrated Response Plan" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Integrated Response Plan" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Do alarm activations trigger appropriate response actions such as lockdowns, evacuations, or notifications to law enforcement?</label>
                    <div>
                        <input type="radio" name="Alarm-Triggered Actions" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Alarm-Triggered Actions" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there coordination between silent alarm systems and other security measures to ensure a comprehensive and effective emergency response?</label>
                    <div>
                        <input type="radio" name="System Coordination" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="System Coordination" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>Training and Education:</h2>
                <div className="form-section">
                    <label>Are staff members and occupants trained in the purpose and function of silent alarms as part of their emergency preparedness training?</label>
                    <div>
                        <input type="radio" name="Staff Training Programs" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Staff Training Programs" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Do training programs include scenarios and simulations to practice activating silent alarms and responding to alarm activations?</label>
                    <div>
                        <input type="radio" name="Training Scenarios" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Training Scenarios" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there regular drills or exercises conducted to evaluate the effectiveness of silent alarm systems and response procedures?</label>
                    <div>
                        <input type="radio" name="Regular effectiveness Drills" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Regular effectiveness Drills" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>Documentation and Review:</h2>
                <div className="form-section">
                    <label>Are records maintained for all silent alarm activations, including dates, times, locations, and responses?</label>
                    <div>
                        <input type="radio" name="Alarm Activation Records" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Alarm Activation Records" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are alarm activation records reviewed regularly to identify trends, areas for improvement, and opportunities for further training or intervention?</label>
                    <div>
                        <input type="radio" name="Records Review" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Records Review" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are deficiencies or issues identified during alarm testing or response drills addressed promptly, with corrective actions implemented as needed?</label>
                    <div>
                        <input type="radio" name="Issue Resolution" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="Issue Resolution" value="no" onChange={handleChange}/> No
                    </div>
                </div>

            </form>
        </main>
    </div>
  )
}

export default CommunicationProtocols2FormPage;