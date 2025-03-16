import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png'; // Adjust the path if necessary
import Navbar from "./Navbar";

function SecurityGatesPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding(); // Access and update buildingId from context
    const db = getFirestore();

    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (!buildingId) {
            alert('No building selected. Redirecting to Building Info...');
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

    const handleBack = async () => {
        if (formData && buildingId) { // Check if formData and buildingId exist
          try {
            const buildingRef = doc(db, 'Buildings', buildingId);
            const formsRef = collection(db, 'forms/Physical Security/Security Gates');
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

        if (!buildingId) {
            alert('Building ID is missing. Please start from the Building Information page.');
            return;
        }

        try {
            const buildingRef = doc(db, 'Buildings', buildingId);
            const formsRef = collection(db, 'forms/Physical Security/Security Gates');
            await addDoc(formsRef, {
                building: buildingRef,
                formData: formData,
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
        <div>
            <div className="form-page">
                <header className="header">
                    <Navbar />
                    <button className="back-button" onClick={handleBack}>←</button>
                    <h1>Security Gates Assessment</h1>
                    <img src={logo} alt="Logo" className="logo" />
                </header>

                <main className="form-container">
                    <form onSubmit={handleSubmit}>
                        <h2>Security Gates Assessment</h2>
                        {[
                            { name: "authMechanisms", label: "Are there authentication mechanisms, such as keypads, card readers, or biometric scanners, to restrict entry?" },
                            { name: "integratedSystems", label: "Are access control systems integrated with other security measures, such as surveillance cameras or intrusion detection systems?" },
                            { name: "logEntries", label: "Is there a log of entries and exits through the security gates for monitoring and auditing purposes?" },
                            { name: "safetyFeatures", label: "Are there safety features in place to prevent accidents or injuries, such as sensors to detect obstructions or emergency stop buttons?" },
                            { name: "trapHazards", label: "Are the gates equipped with safety mechanisms to prevent trapping or crushing hazards?" },
                            { name: "safetySignage", label: "Are there clear instructions or signage to inform users about safety procedures and precautions when using the gates?" },
                            { name: "complianceRegulations", label: "Do the security gates comply with relevant safety and security regulations, codes, and standards?" },
                            { name: "inspectionsCertifications", label: "Have the gates undergone any inspections or certifications to verify compliance with applicable standards?" },
                            { name: "maintenanceSchedule", label: "Is there a regular maintenance schedule in place for the security gates?" },
                            { name: "maintenanceTasks", label: "Are maintenance tasks, such as lubrication, inspection of components, and testing of safety features, performed according to schedule?" },
                            { name: "maintenanceRecords", label: "Are there records documenting maintenance activities, repairs, and any issues identified during inspections?" },
                            { name: "userTraining", label: "Have users, such as security personnel or authorized staff, received training on how to operate the security gates safely and effectively?" },
                            { name: "instructionsGuidelines", label: "Are there instructions or guidelines available to users regarding proper gate usage and emergency procedures?" },
                            { name: "reportingProcess", label: "Is there a process for reporting malfunctions, damage, or security incidents related to the gates?" }
                        ].map((question, index) => (
                            <div key={index} className="form-section">
                                <label>{question.label}</label>
                                <div>
                                    <input type="radio" name={question.name} value="yes" onChange={handleChange} /> Yes
                                    <input type="radio" name={question.name} value="no" onChange={handleChange} /> No
                                </div>
                                <input
                                    type="text"
                                    name={`${question.name}Comment`}
                                    placeholder="Additional comments"
                                    onChange={handleChange}
                                />
                            </div>
                        ))}
                        <button type="submit">Submit</button>
                    </form>
                </main>
            </div>
        </div>
    );
}

export default SecurityGatesPage;
