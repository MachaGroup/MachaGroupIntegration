import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function IsolationProceduresPage() {
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
      const formsRef = collection(db, 'forms/Cybersecurity/Isolation Procedures');
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
                <button className="back-button" onClick={handleBack}>←</button>
                <h1>Isolation Procedures</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    {/* Isolation Strategy */}
                    <h2>4.4.2.2.1.1 Isolation Strategy</h2>
                    <div className="form-section">
                        <label>What criteria are used to determine which systems should be isolated during an incident?</label>
                        <textarea name="isolationCriteria" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>How are decisions made regarding the scope and extent of isolation?</label>
                        <textarea name="isolationScope" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>Are there predefined protocols for isolating different types of systems?</label>
                        <div>
                            <input type="radio" name="predefinedProtocols" value="Yes" onChange={handleChange} /> Yes
                            <input type="radio" name="predefinedProtocols" value="No" onChange={handleChange} /> No
                        </div>
                    </div>

                    {/* Isolation Methods */}
                    <h2>4.4.2.2.1.2 Isolation Methods</h2>
                    <div className="form-section">
                        <label>What methods or technologies are used to isolate affected systems?</label>
                        <textarea name="isolationMethods" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>How are these methods implemented to ensure effective containment?</label>
                        <textarea name="methodImplementation" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>Are there automated tools to assist with isolation?</label>
                        <div>
                            <input type="radio" name="automatedTools" value="Yes" onChange={handleChange} /> Yes
                            <input type="radio" name="automatedTools" value="No" onChange={handleChange} /> No
                        </div>
                    </div>

                    {/* Communication During Isolation */}
                    <h2>4.4.2.2.1.3 Communication During Isolation</h2>
                    <div className="form-section">
                        <label>How is communication managed during the isolation process?</label>
                        <textarea name="communicationManagement" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>What procedures ensure isolation actions are documented?</label>
                        <textarea name="documentationProcedures" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>Are there channels for reporting isolation status?</label>
                        <div>
                            <input type="radio" name="reportingChannels" value="Yes" onChange={handleChange} /> Yes
                            <input type="radio" name="reportingChannels" value="No" onChange={handleChange} /> No
                        </div>
                    </div>

                    {/* Isolation Verification */}
                    <h2>4.4.2.2.1.4 Isolation Verification</h2>
                    <div className="form-section">
                        <label>How is it verified that systems have been successfully isolated?</label>
                        <textarea name="isolationVerification" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>What methods test and confirm the effectiveness of isolation?</label>
                        <textarea name="verificationMethods" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>Are there benchmarks for successful isolation?</label>
                        <textarea name="isolationBenchmarks" onChange={handleChange}></textarea>
                    </div>

                    {/* Impact Assessment */}
                    <h2>4.4.2.2.1.5 Impact Assessment</h2>
                    <div className="form-section">
                        <label>How is the impact of isolation on business operations assessed?</label>
                        <textarea name="impactAssessment" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>What measures minimize impact on critical functions?</label>
                        <textarea name="minimizingImpact" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>Are there contingency plans for operational issues caused by isolation?</label>
                        <div>
                            <input type="radio" name="contingencyPlans" value="Yes" onChange={handleChange} /> Yes
                            <input type="radio" name="contingencyPlans" value="No" onChange={handleChange} /> No
                        </div>
                    </div>

                    {/* Recovery and Reconnection */}
                    <h2>4.4.2.2.1.6 Recovery and Reconnection</h2>
                    <div className="form-section">
                        <label>What procedures are followed for recovery and reconnection?</label>
                        <textarea name="recoveryProcedures" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>How is system integrity verified before reconnection?</label>
                        <textarea name="integrityVerification" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>What protocols ensure reconnection does not reintroduce the threat?</label>
                        <textarea name="reconnectionProtocols" onChange={handleChange}></textarea>
                    </div>

                    {/* Documentation and Reporting */}
                    <h2>4.4.2.2.1.7 Documentation and Reporting</h2>
                    <div className="form-section">
                        <label>How are isolation actions documented?</label>
                        <textarea name="isolationDocumentation" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>What are the reporting requirements for the isolation process?</label>
                        <textarea name="reportingRequirements" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>How is documentation used to improve future isolation procedures?</label>
                        <textarea name="futureImprovements" onChange={handleChange}></textarea>
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </main>
        </div>
    );
}

export default IsolationProceduresPage;
