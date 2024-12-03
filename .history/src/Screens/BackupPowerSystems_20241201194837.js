import logo from '../assets/MachaLogo.png';
import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS

function BackupPowerSystemsFormPage() {
  const navigate = useNavigate();  // Initialize useNavigate hook for navigation

  // Function to handle back button
  const handleBack = () => {
    navigate(-1);  // Navigates to the previous page
  };

  return (
    <div className="form-page">
        <header className="header">
            {/* Back Button */}
        <button className="back-button" onClick={handleBack}>←</button> {/* Back button at the top */}
            <h1>Backup Power Systems Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
      </header>

        <main className="form-container">
            <form>
                {/* 2.4.1.1.3 Backup Power Systems */}
                <h2>Existence of Backup Power Systems:</h2>
                <div className="form-section">
                    <label>Is there a backup power system, such as an Uninterruptible Power Supply (UPS), installed to support the operation of the public address (PA) system during power outages or disruptions?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the backup system" />  
                    </div>
                </div>

                <h2>Capacity and Duration:</h2>
                <div className="form-section">
                    <label>What is the capacity of the backup power system in terms of providing sufficient power to operate the PA system?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the capacity" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How long can the backup power system sustain the PA system in operation during a power outage or disruption before requiring recharge or replacement?</label>
                    <div>
                        <input type="number" name="backup-system" placeholder="Enter a number for how long" min="0" max="100" step="1" value="1" />
                    </div>
                </div>

                <h2>Integration with PA System:</h2>
                <div className="form-section">
                    <label>Is the backup power system seamlessly integrated with the PA system to ensure uninterrupted operation during transitions between primary and backup power sources?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there automatic switchover mechanisms in place to activate the backup power system in the event of a power failure without manual intervention?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Testing and Maintenance:</h2>
                <div className="form-section">
                    <label>Is the backup power system regularly tested to verify its functionality and performance, including its ability to support the PA system under simulated outage conditions?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are routine maintenance activities conducted on the backup power system to ensure reliability and readiness for use during emergencies?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Redundancy and Reliability:</h2>
                <div className="form-section">
                    <label>Are redundant backup power systems or multiple layers of redundancy implemented to mitigate the risk of power failure affecting the PA system?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the redundants" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are backup power systems designed to withstand environmental factors or external threats that could impact their reliability during emergencies?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Notification and Monitoring:</h2>
                <div className="form-section">
                    <label>Are system administrators or operators notified when the backup power system is activated or when there are issues with its performance?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there remote monitoring capability to track the status of the backup power system and receive alerts or notifications in real-time?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Emergency Preparedness Plans:</h2>
                <div className="form-section">
                    <label>Are backup power systems included in emergency preparedness plans and protocols, specifying their roles and procedures for activation during power-related emergencies?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are staff members trained on the use of backup power systems and familiar with protocols for managing power-related incidents affecting the PA system?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <h2>Documentation and Recordkeeping:</h2>
                <div className="form-section">
                    <label>Are records maintained to document the installation, testing, maintenance, and performance of backup power systems supporting the PA system?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are records accessible for review, audit, and reporting purposes, including compliance assessments and performance evaluations?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

            </form>
        </main>
    </div>
  )
}

export default BackupPowerSystemsFormPage;