import React, { useState, useEffect } from 'react';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png'; // Adjust the path if necessary

function SecurityGatesPage() {
    const navigate = useNavigate();
    const { setBuildingId, buildingId } = useBuilding(); // Access and update buildingId from context
    const db = getFirestore();

    const [formData, setFormData] = useState({
        gatesOperational: '',
        gatesSmooth: '',
        gatesDamage: '',
        backupSystems: '',
        accessControlMethods: '',
        authMechanisms: '',
        integratedSystems: '',
        logEntries: '',
        safetyFeatures: '',
        trapHazards: '',
        safetySignage: '',
        complianceRegulations: '',
        regulatoryRequirements: '',
        inspectionsCertifications: '',
        maintenanceSchedule: '',
        maintenanceTasks: '',
        maintenanceRecords: '',
        userTraining: '',
        instructionsGuidelines: '',
        reportingProcess: '',
    });

    useEffect(() => {
        const fetchBuildingIdFromOtherCollection = async () => {
            if (!buildingId) {
                try {
                    // Replace 'Buildings' and 'BuildingDocumentID' with your actual collection and document ID
                    const buildingDocRef = doc(db, 'Buildings', 'BuildingDocumentID'); 
                    const buildingSnapshot = await getDoc(buildingDocRef);

                    if (buildingSnapshot.exists()) {
                        const buildingData = buildingSnapshot.data();
                        setBuildingId(buildingData.buildingId); // Store the retrieved buildingId in context
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

        fetchBuildingIdFromOtherCollection();
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
          // Store the form data in the specified Firestore structure
          const formsRef = collection(db, 'forms/Physical Security/Security Gates');
          await addDoc(formsRef, {
              buildingId: buildingId, // Include the buildingId for reference
              formData: formData, // Store the form data as a nested object
          });

          console.log('Form data submitted successfully!');
          alert('Form submitted successfully!');
          navigate('/Main');
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to submit the form. Please try again.');
        }
    };

    return (
        <div className="form-page">
            <header className="header">
                <button className="back-button" onClick={handleBack}>←</button>
                <h1>Security Gates Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>1.1.1.1.1 Security Gates (e.g., automated sliding gates)</h2>

                    {/* Functionality and Operation */}
                    <h3>1.1.1.1.1.1 Functionality and Operation:</h3>
                    <div className="form-section">
                        <label>1.1.1.1.1.1.1. Are the security gates operational and functioning as intended?</label>
                        <div>
                            <input type="radio" name="gatesOperational" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="gatesOperational" value="no" onChange={handleChange} /> No
                        </div>
                    </div>

                    <div className="form-section">
                        <label>1.1.1.1.1.1.2. Do the gates open and close smoothly without any mechanical issues?</label>
                        <div>
                            <input type="radio" name="gatesSmooth" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="gatesSmooth" value="no" onChange={handleChange} /> No
                        </div>
                    </div>

                    <div className="form-section">
                        <label>1.1.1.1.1.1.3. Are there any signs of wear or damage that could affect the gate's functionality?</label>
                        <input
                            type="text"
                            name="gatesDamage"
                            placeholder="Describe any wear or damage"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-section">
                        <label>1.1.1.1.1.1.4. Are there backup systems in place in case of power outages or malfunctions?</label>
                        <div>
                            <input type="radio" name="backupSystems" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="backupSystems" value="no" onChange={handleChange} /> No
                        </div>
                    </div>

                    {/* Access Control */}
                    <h3>1.1.1.1.1.2 Access Control:</h3>
                    <div className="form-section">
                        <label>1.1.1.1.1.2.1. How is access to the security gates controlled?</label>
                        <input
                            type="text"
                            name="accessControlMethods"
                            placeholder="Enter access control methods"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-section">
                        <label>1.1.1.1.1.2.2. Are there authentication mechanisms, such as keypads, card readers, or biometric scanners, to restrict entry?</label>
                        <div>
                            <input type="radio" name="authMechanisms" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="authMechanisms" value="no" onChange={handleChange} /> No
                        </div>
                    </div>

                    <div className="form-section">
                        <label>1.1.1.1.1.2.3. Are access control systems integrated with other security measures, such as surveillance cameras or intrusion detection systems?</label>
                        <div>
                            <input type="radio" name="integratedSystems" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="integratedSystems" value="no" onChange={handleChange} /> No
                        </div>
                    </div>

                    <div className="form-section">
                        <label>1.1.1.1.1.2.4. Is there a log of entries and exits through the security gates for monitoring and auditing purposes?</label>
                        <div>
                            <input type="radio" name="logEntries" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="logEntries" value="no" onChange={handleChange} /> No
                        </div>
                    </div>

                    {/* Safety Features */}
                    <h3>1.1.1.1.1.3 Safety Features:</h3>
                    <div className="form-section">
                        <label>1.1.1.1.1.3.1. Are there safety features in place to prevent accidents or injuries, such as sensors to detect obstructions or emergency stop buttons?</label>
                        <div>
                            <input type="radio" name="safetyFeatures" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="safetyFeatures" value="no" onChange={handleChange} /> No
                        </div>
                    </div>

                    <div className="form-section">
                        <label>1.1.1.1.1.3.2. Are the gates equipped with safety mechanisms to prevent trapping or crushing hazards?</label>
                        <div>
                            <input type="radio" name="trapHazards" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="trapHazards" value="no" onChange={handleChange} /> No
                        </div>
                    </div>

                    <div className="form-section">
                        <label>1.1.1.1.1.3.3. Are there clear instructions or signage to inform users about safety procedures and precautions when using the gates?</label>
                        <div>
                            <input type="radio" name="safetySignage" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="safetySignage" value="no" onChange={handleChange} /> No
                        </div>
                    </div>

                    {/* Compliance with Regulations */}
                    <h3>1.1.1.1.1.4 Compliance with Regulations:</h3>
                    <div className="form-section">
                        <label>1.1.1.1.1.4.1. Do the security gates comply with relevant safety and security regulations, codes, and standards?</label>
                        <div>
                            <input type="radio" name="complianceRegulations" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="complianceRegulations" value="no" onChange={handleChange} /> No
                        </div>
                    </div>

                    <div className="form-section">
                        <label>1.1.1.1.1.4.2. Are there any specific requirements or guidelines for security gates outlined by regulatory authorities or industry associations that need to be met?</label>
                        <input
                            type="text"
                            name="regulatoryRequirements"
                            placeholder="Enter regulatory requirements"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-section">
                        <label>1.1.1.1.1.4.3. Have the gates undergone any inspections or certifications to verify compliance with applicable standards?</label>
                        <div>
                            <input type="radio" name="inspectionsCertifications" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="inspectionsCertifications" value="no" onChange={handleChange} /> No
                        </div>
                    </div>

                    {/* Maintenance and Upkeep */}
                    <h3>1.1.1.1.1.5 Maintenance and Upkeep:</h3>
                    <div className="form-section">
                        <label>1.1.1.1.1.5.1. Is there a regular maintenance schedule in place for the security gates?</label>
                        <div>
                            <input type="radio" name="maintenanceSchedule" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="maintenanceSchedule" value="no" onChange={handleChange} /> No
                        </div>
                    </div>

                    <div className="form-section">
                        <label>1.1.1.1.1.5.2. Are maintenance tasks, such as lubrication, inspection of components, and testing of safety features, performed according to schedule?</label>
                        <div>
                            <input type="radio" name="maintenanceTasks" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="maintenanceTasks" value="no" onChange={handleChange} /> No
                        </div>
                    </div>

                    <div className="form-section">
                        <label>1.1.1.1.1.5.3. Are there records documenting maintenance activities, repairs, and any issues identified during inspections?</label>
                        <div>
                            <input type="radio" name="maintenanceRecords" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="maintenanceRecords" value="no" onChange={handleChange} /> No
                        </div>
                    </div>

                    {/* User Training and Awareness */}
                    <h3>1.1.1.1.1.6 User Training and Awareness:</h3>
                    <div className="form-section">
                        <label>1.1.1.1.1.6.1. Have users, such as security personnel or authorized staff, received training on how to operate the security gates safely and effectively?</label>
                        <div>
                            <input type="radio" name="userTraining" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="userTraining" value="no" onChange={handleChange} /> No
                        </div>
                    </div>

                    <div className="form-section">
                        <label>1.1.1.1.1.6.2. Are there instructions or guidelines available to users regarding proper gate usage and emergency procedures?</label>
                        <div>
                            <input type="radio" name="instructionsGuidelines" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="instructionsGuidelines" value="no" onChange={handleChange} /> No
                        </div>
                    </div>

                    <div className="form-section">
                        <label>1.1.1.1.1.6.3. Is there a process for reporting malfunctions, damage, or security incidents related to the gates?</label>
                        <div>
                            <input type="radio" name="reportingProcess" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="reportingProcess" value="no" onChange={handleChange} /> No
                        </div>
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </main>
        </div>
    );
}

export default SecurityGatesPage;





