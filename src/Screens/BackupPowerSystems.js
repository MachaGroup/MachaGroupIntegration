import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import Navbar from "./Navbar";

function BackupPowerSystemsFormPage() {
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
      const formsRef = collection(db, 'forms/Emergency Preparedness/Drill Frequency');
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
            <h1>Backup Power Systems Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
      </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 2.4.1.1.3 Backup Power Systems */}
                <h2>Existence of Backup Power Systems:</h2>
                <div className="form-section">
                    <label>Is there a backup power system, such as an Uninterruptible Power Supply (UPS), installed to support the operation of the public address (PA) system during power outages or disruptions?</label>
                    <div>
                        <input type="radio" name="installedBackupPowerSystem" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="installedBackupPowerSystem" value="no" onChange={handleChange} /> No
                    </div>
                    <div>
                        <input type="text" name="installedBackupPowerSystemText" placeholder="Describe the backup system" onChange={handleChange} />  
                    </div>
                </div>

                <h2>Capacity and Duration:</h2>
                <div className="form-section">
                    <label>What is the capacity of the backup power system in terms of providing sufficient power to operate the PA system?</label>
                    <div>
                        <input type="text" name="capicityOfSystem" placeholder="Describe the capacity" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How long can the backup power system sustain the PA system in operation during a power outage or disruption before requiring recharge or replacement?</label>
                    <div>
                        <input type="text" name="backup-system" placeholder="Describe how long" onChange={handleChange} />
                    </div>
                </div>

                <h2>Integration with PA System:</h2>
                <div className="form-section">
                    <label>Is the backup power system seamlessly integrated with the PA system to ensure uninterrupted operation during transitions between primary and backup power sources?</label>
                    <div>
                        <input type="radio" name="uninterruptedTransitions" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="uninterruptedTransitions" value="no" onChange={handleChange} /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there automatic switchover mechanisms in place to activate the backup power system in the event of a power failure without manual intervention?</label>
                    <div>
                        <input type="radio" name="automaticSwitchoverMechanisms" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="automaticSwitchoverMechanisms" value="no" onChange={handleChange} /> No
                    </div>
                </div>

                <h2>Testing and Maintenance:</h2>
                <div className="form-section">
                    <label>Is the backup power system regularly tested to verify its functionality and performance, including its ability to support the PA system under simulated outage conditions?</label>
                    <div>
                        <input type="radio" name="regularTests" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="regularTests" value="no" onChange={handleChange} /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are routine maintenance activities conducted on the backup power system to ensure reliability and readiness for use during emergencies?</label>
                    <div>
                        <input type="radio" name="routineMaintenanceActivities" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="routineMaintenanceActivities" value="no" onChange={handleChange} /> No
                    </div>
                </div>

                <h2>Redundancy and Reliability:</h2>
                <div className="form-section">
                    <label>Are redundant backup power systems or multiple layers of redundancy implemented to mitigate the risk of power failure affecting the PA system?</label>
                    <div>
                        <input type="radio" name="mitigatingRisks" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="mitigatingRisks" value="no" onChange={handleChange} /> No
                    </div>
                    <div>
                        <input type="text" name="mitigatingRisksRedundancies" placeholder="Describe the redundants" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are backup power systems designed to withstand environmental factors or external threats that could impact their reliability during emergencies?</label>
                    <div>
                        <input type="radio" name="withstandingExternalThreats" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="withstandingExternalThreats" value="no" onChange={handleChange} /> No
                    </div>
                </div>

                <h2>Notification and Monitoring:</h2>
                <div className="form-section">
                    <label>Are system administrators or operators notified when the backup power system is activated or when there are issues with its performance?</label>
                    <div>
                        <input type="radio" name="notifiedAdministrators" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="notifiedAdministrators" value="no" onChange={handleChange} /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there remote monitoring capability to track the status of the backup power system and receive alerts or notifications in real-time?</label>
                    <div>
                        <input type="radio" name="capableRemoteMonitoring" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="capableRemoteMonitoring" value="no" onChange={handleChange} /> No
                    </div>
                </div>

                <h2>Emergency Preparedness Plans:</h2>
                <div className="form-section">
                    <label>Are backup power systems included in emergency preparedness plans and protocols, specifying their roles and procedures for activation during power-related emergencies?</label>
                    <div>
                        <input type="radio" name="backupSystemIncludedInPlans" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="backupSystemIncludedInPlans" value="no" onChange={handleChange} /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are staff members trained on the use of backup power systems and familiar with protocols for managing power-related incidents affecting the PA system?</label>
                    <div>
                        <input type="radio" name="trainedStaffMembers" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="trainedStaffMembers" value="no" onChange={handleChange} /> No
                    </div>
                </div>

                <h2>Documentation and Recordkeeping:</h2>
                <div className="form-section">
                    <label>Are records maintained to document the installation, testing, maintenance, and performance of backup power systems supporting the PA system?</label>
                    <div>
                        <input type="radio" name="maintainingRecords" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="maintainingRecords" value="no" onChange={handleChange} /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are records accessible for review, audit, and reporting purposes, including compliance assessments and performance evaluations?</label>
                    <div>
                        <input type="radio" name="accessibleRecords" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="accessibleRecords" value="no" onChange={handleChange} /> No
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit">Submit</button>

            </form>
        </main>
    </div>
  )
}

export default BackupPowerSystemsFormPage;