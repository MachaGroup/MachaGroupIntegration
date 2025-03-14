import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function ContinuityOfOperationsPage() {
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
      const formsRef = collection(db, 'forms/Cybersecurity/Continuity of Operations');
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
        <h1>Continuity of Operations Assessment</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          {/* Identification of Critical Functions */}
          <h2>4.2.2.2.2.1 Identification of Critical Functions:</h2>
          <div className="form-section">
            <label>What criteria are used to identify and prioritize critical functions that must continue during a disruption?</label>
            <textarea name="identifyCriticalCriteria" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>How often are critical functions reviewed and updated to reflect changes in organizational priorities or operations?</label>
            <textarea name="criticalFunctionsReviewFrequency" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>Are dependencies between critical functions and other business operations clearly documented and understood?</label>
            <div>
              <input type="radio" name="dependenciesDocumented" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="dependenciesDocumented" value="No" onChange={handleChange} /> No
            </div>
          </div>

          {/* Continuity Planning and Documentation */}
          <h3>4.2.2.2.2.2 Continuity Planning and Documentation:</h3>
          <div className="form-section">
            <label>Does the organization have a comprehensive continuity of operations plan (COOP) that outlines procedures for maintaining critical functions during different types of disruptions?</label>
            <div>
              <input type="radio" name="hasCOOP" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="hasCOOP" value="No" onChange={handleChange} /> No
            </div>
          </div>
          <div className="form-section">
            <label>How is the COOP documented, and is it easily accessible to all relevant personnel during an emergency?</label>
            <textarea name="COOPDocumentationAccessibility" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>Are there specific guidelines within the COOP for short-term versus long-term continuity of operations?</label>
            <textarea name="COOPGuidelines" onChange={handleChange}></textarea>
          </div>

          {/* Resource Allocation and Management */}
          <h2>4.2.2.2.2.3 Resource Allocation and Management:</h2>
          <div className="form-section">
            <label>What resources (e.g., personnel, technology, financial) are allocated to support the continuity of critical functions during a disruption?</label>
            <textarea name="resourceAllocation" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>How are these resources prioritized and managed to ensure they are available when needed?</label>
            <textarea name="resourcePrioritization" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>Are backup resources identified and prepared in advance to mitigate the impact of potential resource shortages?</label>
            <div>
              <input type="radio" name="backupResourcesPrepared" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="backupResourcesPrepared" value="No" onChange={handleChange} /> No
            </div>
          </div>

          {/* Staff Training and Awareness */}
          <h2>4.2.2.2.2.4 Staff Training and Awareness:</h2>
          <div className="form-section">
            <label>Are staff members trained on their roles and responsibilities in maintaining critical functions during a disruption?</label>
            <div>
              <input type="radio" name="staffTraining" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="staffTraining" value="No" onChange={handleChange} /> No
            </div>
          </div>
          <div className="form-section">
            <label>How often is this training conducted, and does it include practical exercises or simulations?</label>
            <textarea name="trainingFrequency" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>Are there mechanisms in place to ensure that all staff, including new hires and contractors, are aware of the COOP and their role in it?</label>
            <div>
              <input type="radio" name="staffAwarenessMechanisms" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="staffAwarenessMechanisms" value="No" onChange={handleChange} /> No
            </div>
          </div>

          {/* Testing and Evaluation of Continuity Plans */}
          <h2>4.2.2.2.2.5 Testing and Evaluation of Continuity Plans:</h2>
          <div className="form-section">
            <label>How often are continuity of operations plans tested to ensure they are effective and up-to-date?</label>
            <textarea name="COOPTestFrequency" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>Are different types of disruptions simulated during these tests to assess the plan's robustness across various scenarios?</label>
            <textarea name="simulateDisruptionTypes" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>How is feedback from these tests used to improve the continuity of operations planning and procedures?</label>
            <textarea name="improvePlanFromFeedback" onChange={handleChange}></textarea>
          </div>

          {/* Coordination with External Partners */}
          <h2>4.2.2.2.2.6 Coordination with External Partners:</h2>
          <div className="form-section">
            <label>Are there established partnerships with external organizations (e.g., suppliers, emergency services) to support continuity of critical functions?</label>
            <div>
              <input type="radio" name="externalPartnerships" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="externalPartnerships" value="No" onChange={handleChange} /> No
            </div>
          </div>
          <div className="form-section">
            <label>How are these partnerships maintained and reviewed to ensure they remain effective and relevant?</label>
            <textarea name="partnershipMaintenance" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>Are there protocols in place to communicate and coordinate with these partners during a disruption?</label>
            <textarea name="partnerCoordinationProtocols" onChange={handleChange}></textarea>
          </div>

          {/* Technology and Infrastructure Resilience */}
          <h2>4.2.2.2.2.7 Technology and Infrastructure Resilience:</h2>
          <div className="form-section">
            <label>What measures are in place to ensure that the technology and infrastructure supporting critical functions are resilient to disruptions?</label>
            <textarea name="resilientTechMeasures" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>Are there redundant systems or failover mechanisms to maintain critical functions in the event of a primary system failure?</label>
            <textarea name="redundantSystems" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>How are these systems tested and maintained to ensure they are ready for use during an actual disruption?</label>
            <textarea name="systemMaintenance" onChange={handleChange}></textarea>
          </div>

          {/* Continuous Improvement and Plan Updates */}
          <h2>4.2.2.2.2.8 Continuous Improvement and Plan Updates:</h2>
          <div className="form-section">
            <label>How frequently is the continuity of operations plan reviewed and updated to address new risks, changes in operations, or lessons learned from past disruptions?</label>
            <textarea name="planReviewFrequency" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>Is there a formal process for incorporating feedback from staff and stakeholders into the plan's revisions?</label>
            <textarea name="formalFeedbackProcess" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>How are changes to the continuity plan communicated to ensure all relevant parties are aware and prepared?</label>
            <textarea name="communicationOfPlanChanges" onChange={handleChange}></textarea>
          </div>

          {/* Performance Metrics and Reporting */}
          <h2>4.2.2.2.2.9 Performance Metrics and Reporting:</h2>
          <div className="form-section">
            <label>What performance metrics are used to evaluate the effectiveness of the continuity of operations plan?</label>
            <textarea name="performanceMetrics" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>Are there regular reports generated to monitor these metrics and identify areas for improvement?</label>
            <textarea name="reportingMetrics" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>How is the success of maintaining critical functions measured during a disruption?</label>
            <textarea name="criticalFunctionSuccess" onChange={handleChange}></textarea>
          </div>

          {/* Communication Strategy During Disruptions */}
          <h2>4.2.2.2.2.10 Communication Strategy During Disruptions:</h2>
          <div className="form-section">
            <label>What communication strategies are in place to keep staff and stakeholders informed about the status of critical functions during a disruption?</label>
            <textarea name="communicationStrategies" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>Are there predefined communication channels and messages for different types of disruptions?</label>
            <div>
              <input type="radio" name="predefinedCommChannels" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="predefinedCommChannels" value="No" onChange={handleChange} /> No
            </div>
          </div>
          <div className="form-section">
            <label>How is communication effectiveness evaluated and improved over time to support continuity efforts?</label>
            <textarea name="communicationImprovement" onChange={handleChange}></textarea>
          </div>

          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}

export default ContinuityOfOperationsPage;
