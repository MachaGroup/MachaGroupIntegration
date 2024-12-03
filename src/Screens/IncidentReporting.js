import React, { useState, useEffect } from 'react';
import './FormQuestions.css';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import logo from '../assets/MachaLogo.png'; // Adjust the path if necessary
import Navbar from "./Navbar";

function IncidentReportingPage() {
  const navigate = useNavigate();
  const { buildingId } = useBuilding();
  const db = getFirestore();

  const [formData, setFormData] = useState({});

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
      const buildingRef = doc(db, 'Buildings', buildingId);
      const formsRef = collection(db, 'forms/Cybersecurity/Incident Reporting');
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
    <div className="form-page">
      <header className="header">
            <Navbar />
        <button className="back-button" onClick={handleBack}>←</button>
        <h1>Incident Reporting Assessment</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>4.3.1.2.1 Incident Reporting (e.g., reporting suspicious emails)</h2>

          {/* Reporting Mechanisms and Accessibility */}
          <h3>4.3.1.2.1.1 Reporting Mechanisms and Accessibility:</h3>
          <div className="form-section">
            <label>4.3.1.2.1.1.1. What channels are available for employees to report suspicious emails or potential phishing attempts (e.g., email, dedicated reporting tool, phone line)?</label>
            <textarea name="reportingChannels" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>4.3.1.2.1.1.2. Are these reporting mechanisms easily accessible and user-friendly for all employees, regardless of their technical expertise?</label>
            <div>
              <input type="radio" name="accessibleReporting" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="accessibleReporting" value="No" onChange={handleChange} /> No
            </div>
          </div>

          <div className="form-section">
            <label>4.3.1.2.1.1.3. Is there a clear process outlined for what information employees should include when reporting suspicious emails?</label>
            <textarea name="reportingProcessClarity" onChange={handleChange}></textarea>
          </div>

          {/* Training and Awareness on Reporting */}
          <h3>4.3.1.2.1.2 Training and Awareness on Reporting:</h3>
          <div className="form-section">
            <label>4.3.1.2.1.2.1. Are employees regularly trained on how to recognize suspicious emails and the importance of promptly reporting them?</label>
            <div>
              <input type="radio" name="regularTraining" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="regularTraining" value="No" onChange={handleChange} /> No
            </div>
          </div>

          <div className="form-section">
            <label>4.3.1.2.1.2.2. How often are employees reminded of the reporting procedures, and is there ongoing communication to reinforce these practices?</label>
            <textarea name="reportingReminders" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>4.3.1.2.1.2.3. Are there examples or case studies used in training to illustrate successful reporting and its impact on preventing security breaches?</label>
            <textarea name="caseStudies" onChange={handleChange}></textarea>
          </div>

          {/* Response and Follow-Up */}
          <h3>4.3.1.2.1.3 Response and Follow-Up:</h3>
          <div className="form-section">
            <label>4.3.1.2.1.3.1. What is the process for handling reports of suspicious emails once they are submitted? Who is responsible for investigating these reports?</label>
            <textarea name="incidentHandlingProcess" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>4.3.1.2.1.3.2. How quickly are reported incidents reviewed and addressed by the security team, and is this turnaround time communicated to employees?</label>
            <textarea name="incidentResponseTime" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>4.3.1.2.1.3.3. Is there feedback provided to employees who report suspicious emails, such as acknowledgment of the report and information on any actions taken?</label>
            <textarea name="employeeFeedback" onChange={handleChange}></textarea>
          </div>

          {/* Effectiveness and Improvement */}
          <h3>4.3.1.2.1.4 Effectiveness and Improvement:</h3>
          <div className="form-section">
            <label>4.3.1.2.1.4.1. How is the effectiveness of the incident reporting process measured (e.g., number of reports, accuracy of reports, prevention of phishing attacks)?</label>
            <textarea name="effectivenessMetrics" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>4.3.1.2.1.4.2. Are there regular reviews or audits of the reporting process to identify areas for improvement and ensure it remains effective?</label>
            <textarea name="reviewAuditProcess" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>4.3.1.2.1.4.3. How does the organization encourage employees to report incidents without fear of reprisal or judgment?</label>
            <textarea name="encourageReporting" onChange={handleChange}></textarea>
          </div>

          {/* Integration with Broader Security Practices */}
          <h3>4.3.1.2.1.5 Integration with Broader Security Practices:</h3>
          <div className="form-section">
            <label>4.3.1.2.1.5.1. How is the incident reporting process integrated with other security measures, such as threat intelligence sharing and security incident response?</label>
            <textarea name="integrationWithSecurity" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>4.3.1.2.1.5.2. Are there established protocols for escalating reported incidents to higher-level security teams or external authorities if needed?</label>
            <textarea name="escalationProtocols" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>4.3.1.2.1.5.3. How does the organization use data from reported incidents to enhance overall cybersecurity strategies and awareness efforts?</label>
            <textarea name="useOfIncidentData" onChange={handleChange}></textarea>
          </div>

          {/* Encouraging a Reporting Culture */}
          <h3>4.3.1.2.1.6 Encouraging a Reporting Culture:</h3>
          <div className="form-section">
            <label>4.3.1.2.1.6.1. Are there initiatives in place to promote a culture of proactive reporting and cybersecurity vigilance among employees?</label>
            <div>
              <input type="radio" name="reportingCulture" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="reportingCulture" value="No" onChange={handleChange} /> No
            </div>
          </div>

          <div className="form-section">
            <label>4.3.1.2.1.6.2. Does the organization recognize or reward employees for identifying and reporting potential security threats?</label>
            <textarea name="recognitionForReporting" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>4.3.1.2.1.6.3. How is the importance of incident reporting emphasized within the organization's overall cybersecurity training and awareness programs?</label>
            <textarea name="emphasisOnReporting" onChange={handleChange}></textarea>
          </div>

          {/* Technology and Automation */}
          <h3>4.3.1.2.1.7 Technology and Automation:</h3>
          <div className="form-section">
            <label>4.3.1.2.1.7.1. Are there automated systems in place to assist in the reporting and initial analysis of suspicious emails (e.g., phishing detection tools)?</label>
            <div>
              <input type="radio" name="automatedSystems" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="automatedSystems" value="No" onChange={handleChange} /> No
            </div>
          </div>

          <div className="form-section">
            <label>4.3.1.2.1.7.2. How does technology aid in streamlining the reporting process and reducing the burden on employees?</label>
            <textarea name="techStreamliningReporting" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>4.3.1.2.1.7.3. Are there plans to enhance reporting capabilities with new technologies or integrations to improve detection and response times?</label>
            <textarea name="futureTechEnhancements" onChange={handleChange}></textarea>
          </div>

          {/* Communication and Feedback */}
          <h3>4.3.1.2.1.8 Communication and Feedback:</h3>
          <div className="form-section">
            <label>4.3.1.2.1.8.1. Is there a clear communication strategy to inform employees about the outcomes of their reports and the importance of their role in cybersecurity?</label>
            <textarea name="communicationStrategy" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>4.3.1.2.1.8.2. Are there opportunities for employees to provide feedback on the reporting process and suggest improvements?</label>
            <textarea name="employeeFeedbackOnProcess" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>4.3.1.2.1.8.3. How does the organization ensure transparency in its handling of reported incidents, while maintaining necessary confidentiality and security?</label>
            <textarea name="transparencyInReporting" onChange={handleChange}></textarea>
          </div>

          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}

export default IncidentReportingPage;
