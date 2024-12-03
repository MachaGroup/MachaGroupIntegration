import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png'; // Adjust the path if necessary
import Navbar from "./Navbar"; // Import the Navbar

function FireAlarmSystemsPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding(); // Access and update buildingId from context
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

        if (!buildingId) {
            alert('Building ID is missing. Please start from the Building Information page.');
            return;
        }


        try {
            // Create a document reference to the building in the 'Buildings' collection
            const buildingRef = doc(db, 'Buildings', buildingId); 

            // Store the form data in the specified Firestore structure
            const formsRef = collection(db, 'forms/Emergency Preparedness/Fire Alarm Systems');
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
            <header className="header">
                <Navbar />
                <button className="back-button" onClick={handleBack}>←</button>
                <h1>Fire Alarms Systems</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>2.2.1.1.3 Fire Alarm Systems (e.g., automated sliding gates)</h2>

                    {/* Functionality and Reliability */}
                    <h3>2.2.1.1.3.1 Functionality and Reliability:</h3>
                    <div className="form-section">
                        <label>2.2.1.1.3.1.1. Are the fire alarm systems installed throughout the premises to provide comprehensive coverage?</label>
                        <div>
                            <input type="radio" name="alarmsInstalled" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="alarmsInstalled" value="no" onChange={handleChange} /> No
                        </div>
                    </div>

                    <div className="form-section">
                        <label>2.2.1.1.3.1.2. Are alarm systems regularly tested to ensure they are functioning correctly and capable of detecting fires prompty?</label>
                        <div>
                            <input type="radio" name="regularAlarmTesting" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="regularAlarmTesting" value="no" onChange={handleChange} /> No
                        </div>
                    </div>

                    <div className="form-section">
                        <label>2.2.1.1.3.1.3. Is there a process in place to address any malfunctions or deficiencies indentified during testing promptly?</label>
                        <div>
                            <input type="radio" name="malfunctions" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="malfunctions" value="No" onChange={handleChange} /> No
                        </div>
                    </div>

                    {/* Testing Schedule */}
                    <h3>2.2.1.1.3.2 Testing Schedule:</h3>
                    <div className="form-section">
                        <label>2.2.1.1.3.2.1. Is there a schdule for testing fire alarm systems, including frquency and procudres?</label>
                        <input
                            type="text"
                            name="testingSchedule"
                            placeholder="Enter testing schedule"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-section">
                        <label>2.2.1.1.3.2.2. Are testing intervals established based on relevant regulations, industry standards, and manufacturer recommendations?</label>
                        <div>
                            <input type="radio" name="testingIntervals" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="testingIntervals" value="no" onChange={handleChange} /> No
                        </div>
                    </div>

                    <div className="form-section">
                        <label>2.2.1.1.3.2.3. Are tests conducted during both regular business hours and after hours to ensure all components of the system are thoroughly evaluated?</label>
                        <div>
                            <input type="radio" name="comprehensiveTesting" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="comprehensiveTesting" value="no" onChange={handleChange} /> No
                        </div>
                    </div>

                    {/* Testing Procedures */}
                    <h3>2.2.1.1.3.3 Testing Procedures:</h3>
                    <div className="form-section">
                        <label>2.2.1.1.3.3.1. Are testing procedures standardized and followed consistently by trained personnel?</label>
                        <div>
                            <input type="radio" name="standardized" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="standardized" value="no" onChange={handleChange} /> No
                        </div>
                    </div>

                    <div className="form-section">
                        <label>2.2.1.1.3.3.2. Do tests include activation of alarm devices, testing of audible and visual alerts, and verification of signal transmission to monitoring stations?</label>
                        <div>
                            <input type="radio" name="fireAlarmTetsing" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="fireAlarmTetsing" value="no" onChange={handleChange} /> No
                        </div>
                    </div>

                    <div className="form-section">
                        <label>2.2.1.1.3.3.3. Are there protocols in place for coordinating testing with building occupants, security personnel, and emergency responders to minimize disruptions?</label>
                        <div>
                        <input
                            type="text"
                            name="testingProtocols"
                            placeholder="Enter the protocols"
                            onChange={handleChange}
                        />
                        </div>
                    </div>

                    {/* Documentation and Regulations */}
                    <h3>2.2.1.1.3.4 Documentation and Records:</h3>
                    <div className="form-section">
                        <label>2.2.1.1.3.4.1. Are records maintained for all fire alarm test, including dates, times, personnel involved, and results?</label>
                        <div>
                            <input type="radio" name="alarmRecords" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="alarmRecords" value="no" onChange={handleChange} /> No
                        </div>
                    </div>

                    <div className="form-section">
                        <label>2.2.1.1.3.4.2. Are test records retained for the required duration and readily accessible for review by authorities or inspectors?</label>
                        <div>
                            <input type="radio" name="retainedRecords" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="retainedRecords" value="no" onChange={handleChange} /> No
                        </div>
                    </div>

                    <div className="form-section">
                        <label>2.2.1.1.3.4.3. Is there a system in place to track and follow up on any deficiencies or issues identified during testing?</label>
                        <div>
                        <input
                            type="text"
                            name="issueTracking"
                            placeholder="Enter tracking system issue"
                            onChange={handleChange}
                        />
                        </div>
                    </div>

                    {/* Notification and Communication */}
                    <h3>2.2.1.1.3.5 Notification and Communication:</h3>
                    <div className="form-section">
                        <label>2.2.1.1.3.5.1. Is there a process for notifying building occupants in advance of scheduled fire alarm tests?</label>
                        <div>
                        <input
                            type="text"
                            name="notificationProcess"
                            placeholder="Enter notification process"
                            onChange={handleChange}
                        />
                        </div>
                    </div>

                    <div className="form-section">
                        <label>2.2.1.1.3.5.2. Are notifications provided thorugh appropriate channels, such as email, signage, or verbal announcements?</label>
                        <div>
                            <input type="radio" name="notificationChannels" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="notificationChannels" value="no" onChange={handleChange} /> No
                        </div>
                    </div>

                    <div className="form-section">
                        <label>2.2.1.1.3.5.3. Is ther coordination with local fire departments or monitoring agencies to ensure they are aware of scheduled tests and can responds appropriately to any alarms?</label>
                        <div>
                            <input type="radio" name="fireDepartmentCoordination" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="fireDepartmentCoordination" value="no" onChange={handleChange} /> No
                        </div>
                    </div>

                    {/* Emergency Response Integration */}
                    <h3>2.2.1.1.3.6 Emergency Response Integration:</h3>
                    <div className="form-section">
                        <label>2.2.1.1.3.6.1. Are fire alarm systems integrated into the overall emergency response plan for the premises?</label>
                        <div>
                            <input type="radio" name="alarmIntegration" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="alarmIntegration" value="no" onChange={handleChange} /> No
                        </div>
                    </div>

                    <div className="form-section">
                        <label>2.2.1.1.3.6.2. Do alarm tests include coordination with evacuation drills and other repsonse actions to ensure a comprehensive evaluation of emergency preparedness?</label>
                        <div>
                            <input type="radio" name="evacuationCoordination" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="evacuationCoordination" value="no" onChange={handleChange} /> No
                        </div>
                    </div>

                    <div className="form-section">
                        <label>2.2.1.1.3.6.3. Are designated personnel trained to respond to alarm activations and follow established procedures for verifying alarms and initiating emergency response actions?</label>
                        <div>
                            <input type="radio" name="trainedPersonnelResponse" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="trainedPersonnelResponse" value="no" onChange={handleChange} /> No
                        </div>
                    </div>

                    {/* System Maintenance and Upkeep */}
                    <h3>2.2.1.1.3.7 System Maintenance and Upkeep:</h3>
                    <div className="form-section">
                        <label>2.2.1.1.3.7.1. Is there a maintenance schedule in place for inspecting, servicing, and maintaining fire alarm systems??</label>
                        <div>
                            <input type="radio" name="maintenanceSchedule" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="maintenanceSchedule" value="no" onChange={handleChange} /> No
                        </div>
                    </div>

                    <div className="form-section">
                        <label>2.2.1.1.3.7.2. Are maintenance activities conducted by qualified technicians in compliance with manufacturer recommendations and industry standards?</label>
                        <div>
                            <input type="radio" name="maintenanceActivities" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="maintenanceActivities" value="no" onChange={handleChange} /> No
                        </div>
                    </div>

                    <div className="form-section">
                        <label>2.2.1.1.3.7.3. Are deficiencies or issues identified during maintenance promptly addressed and documented, with corrective actions implemented as needed?</label>
                        <div>
                            <input type="radio" name="maintenanceIssues" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="maintenanceIssues" value="no" onChange={handleChange} /> No
                        </div>
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </main>
        </div>
    );
}

export default FireAlarmSystemsPage;