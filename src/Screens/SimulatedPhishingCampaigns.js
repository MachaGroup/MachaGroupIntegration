import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function SimulatedPhishingCampaignsPage() {
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
      const formsRef = collection(db, 'forms/Cybersecurity/Simulated Phishing Campaigns');
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
        <h1>Simulated Phishing Campaigns Assessment</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          {/* Design and Implementation */}
          <h2>4.3.1.1.1.1 Design and Implementation:</h2>
          <div className="form-section">
            <label>How are simulated phishing campaigns designed to reflect realistic phishing threats and tactics?</label>
            <textarea name="phishingDesign" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>What criteria are used to select the timing, frequency, and targets of these simulated phishing campaigns?</label>
            <textarea name="phishingCriteria" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>Are the simulated phishing emails varied in difficulty to test different levels of user awareness and susceptibility?</label>
            <div>
              <input type="radio" name="emailDifficultyVariety" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="emailDifficultyVariety" value="No" onChange={handleChange} /> No
            </div>
          </div>

          {/* User Response and Feedback */}
          <h2>4.3.1.1.1.2 User Response and Feedback:</h2>
          <div className="form-section">
            <label>How are user responses to simulated phishing attempts tracked and analyzed to identify trends and common vulnerabilities?</label>
            <textarea name="userResponseTracking" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>Is there an immediate feedback mechanism in place to inform users whether they have successfully identified a phishing attempt or fallen for the simulation?</label>
            <div>
              <input type="radio" name="feedbackMechanism" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="feedbackMechanism" value="No" onChange={handleChange} /> No
            </div>
          </div>
          <div className="form-section">
            <label>How is user feedback incorporated into improving the design and effectiveness of future simulated phishing campaigns?</label>
            <textarea name="userFeedbackIncorporation" onChange={handleChange}></textarea>
          </div>

          {/* Training and Education */}
          <h2>4.3.1.1.1.3 Training and Education:</h2>
          <div className="form-section">
            <label>Are users provided with training or resources after a simulated phishing campaign to help them better identify phishing attempts in the future?</label>
            <div>
              <input type="radio" name="trainingResources" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="trainingResources" value="No" onChange={handleChange} /> No
            </div>
          </div>
          <div className="form-section">
            <label>How often is phishing awareness training updated to reflect the latest phishing tactics and trends?</label>
            <textarea name="trainingUpdateFrequency" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>Is there a follow-up process to ensure that users who fail the simulation receive additional training or support?</label>
            <div>
              <input type="radio" name="followUpTraining" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="followUpTraining" value="No" onChange={handleChange} /> No
            </div>
          </div>

          {/* Performance Metrics and Reporting */}
          <h2>4.3.1.1.1.4 Performance Metrics and Reporting:</h2>
          <div className="form-section">
            <label>What metrics are used to evaluate the effectiveness of simulated phishing campaigns (e.g., click rates, reporting rates, repeat offenders)?</label>
            <textarea name="campaignMetrics" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>How are these metrics reported to stakeholders, and are they used to inform cybersecurity policies and procedures?</label>
            <textarea name="metricsReporting" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>Is there a process for benchmarking these metrics against industry standards or previous campaign results to measure improvement over time?</label>
            <div>
              <input type="radio" name="benchmarkingProcess" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="benchmarkingProcess" value="No" onChange={handleChange} /> No
            </div>
          </div>

          {/* Continuous Improvement and Adaptation */}
          <h2>4.3.1.1.1.5 Continuous Improvement and Adaptation:</h2>
          <div className="form-section">
            <label>How are the results of simulated phishing campaigns used to continuously improve phishing awareness and training programs?</label>
            <textarea name="campaignResultsImprovement" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>Are there regular reviews and updates to the simulation content to adapt to new phishing techniques and emerging threats?</label>
            <div>
              <input type="radio" name="simulationUpdates" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="simulationUpdates" value="No" onChange={handleChange} /> No
            </div>
          </div>
          <div className="form-section">
            <label>How does the organization ensure that the simulated phishing campaigns remain challenging and engaging for users to prevent complacency?</label>
            <textarea name="campaignEngagement" onChange={handleChange}></textarea>
          </div>

          {/* Coordination with IT and Security Teams */}
          <h2>4.3.1.1.1.6 Coordination with IT and Security Teams:</h2>
          <div className="form-section">
            <label>How are the IT and security teams involved in the planning and execution of simulated phishing campaigns?</label>
            <textarea name="itSecurityInvolvement" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>Is there a process for these teams to analyze data from simulations to identify potential security gaps or areas for improvement?</label>
            <div>
              <input type="radio" name="securityAnalysisProcess" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="securityAnalysisProcess" value="No" onChange={handleChange} /> No
            </div>
          </div>
          <div className="form-section">
            <label>How does coordination with these teams enhance the overall effectiveness of the phishing simulation program?</label>
            <textarea name="teamCoordination" onChange={handleChange}></textarea>
          </div>

          {/* Impact on Overall Security Posture */}
          <h2>4.3.1.1.1.7 Impact on Overall Security Posture:</h2>
          <div className="form-section">
            <label>How do simulated phishing campaigns contribute to the organization’s broader cybersecurity strategy?</label>
            <textarea name="phishingImpactStrategy" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>Are there measures in place to assess the impact of these campaigns on reducing real-world phishing incidents?</label>
            <div>
              <input type="radio" name="impactAssessment" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="impactAssessment" value="No" onChange={handleChange} /> No
            </div>
          </div>
          <div className="form-section">
            <label>How is the success of the phishing simulation program linked to other user awareness and cybersecurity initiatives within the organization?</label>
            <textarea name="phishingProgramSuccess" onChange={handleChange}></textarea>
          </div>

          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}

export default SimulatedPhishingCampaignsPage;
