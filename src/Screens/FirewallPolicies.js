import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png'; // Adjust the path if necessary
import Navbar from "./Navbar";
/**/
function FirewallPoliciesPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding(); // Access and update buildingId from context
    const db = getFirestore();

    const [formData, setFormData] = useState({});
  const storage = getStorage();
  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadError, setUploadError] = useState(null);


    useEffect(() => {
        if(!buildingId) {
          alert('No builidng selected. Redirecting to Building Info...');
          navigate('BuildingandAddress');
        }
      }, [buildingId, navigate]);

    
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
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
              const formsRef = collection(db, 'forms/Cybersecurity/Firewall Policies');
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
            const formsRef = collection(db, 'forms/Cybersecurity/Firewall Policies');
            await addDoc(formsRef, {
                building: buildingRef,
                formData: formData,
            });

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
                <h1>Firewall Policies Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    {/* Policy Definition and Scope */}
                    <h2>4.1.1.1.2.1 Policy Definition and Scope:</h2>
                    <div className="form-section">
                        <label>What criteria are used to define the firewall policies, and how do these criteria align with the organization's overall security objectives and regulatory requirements?</label>
                        <textarea name="policyCriteria" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>Are there specific policies in place for different types of network traffic (e.g., inbound, outbound, internal), and how are these tailored to the needs of various departments or user groups?</label>
                        <div>
                            <input type="radio" name="specificPolicies" value="Yes" onChange={handleChange} /> Yes
                            <input type="radio" name="specificPolicies" value="No" onChange={handleChange} /> No
                            <textarea className='comment-box' name="specificPoliciesComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                        </div>
                    </div>

                    <div className="form-section">
                        <label>How frequently are firewall policies reviewed and updated to ensure they remain effective against new threats and comply with evolving security standards?</label>
                        <textarea name="policyReviewFrequency" onChange={handleChange}></textarea>
                    </div>

                    {/* Implementation and Configuration */}
                    <h2>4.1.1.1.2.2 Implementation and Configuration:</h2>
                    <div className="form-section">
                        <label>What procedures are followed to implement firewall policies, and how are these policies tested for effectiveness and security before going live?</label>
                        <textarea name="implementationProcedures" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>How are exceptions to standard firewall policies handled (e.g., temporary access needs, special cases), and what controls are in place to minimize risks associated with such exceptions?</label>
                        <textarea name="policyExceptions" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>Are there automated tools or scripts used to manage and deploy firewall policies across different devices and network segments, and how are these tools maintained?</label>
                        <div>
                            <input type="radio" name="automatedTools" value="Yes" onChange={handleChange} /> Yes
                            <input type="radio" name="automatedTools" value="No" onChange={handleChange} /> No
                            <textarea className='comment-box' name="automatedToolsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                        </div>
                    </div>

                    {/* Monitoring and Incident Response */}
                    <h2>4.1.1.1.2.3 Monitoring and Incident Response:</h2>
                    <div className="form-section">
                        <label>How is firewall activity monitored to detect and respond to unauthorized access attempts or breaches, and what metrics are used to gauge the effectiveness of firewall policies?</label>
                        <textarea name="monitoringMetrics" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>Are there defined procedures for responding to incidents where firewall policies fail to prevent unauthorized access, including root cause analysis and policy adjustments?</label>
                        <textarea name="incidentResponse" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>What logging and auditing mechanisms are in place to track changes to firewall policies and access attempts, and how are these logs reviewed for signs of potential threats?</label>
                        <textarea name="loggingAuditing" onChange={handleChange}></textarea>
                    </div>

                    {/* Training and Awareness */}
                    <h2>4.1.1.1.2.4 Training and Awareness:</h2>
                    <div className="form-section">
                        <label>What training programs are provided to IT staff responsible for managing and configuring firewall policies, and how is their knowledge kept current with evolving security practices?</label>
                        <textarea name="trainingPrograms" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>Are there clear documentation and guidelines available on how to apply and modify firewall policies, and how frequently is this information reviewed for accuracy?</label>
                        <div>
                            <input type="radio" name="documentationGuidelines" value="Yes" onChange={handleChange} /> Yes
                            <input type="radio" name="documentationGuidelines" value="No" onChange={handleChange} /> No
                            <textarea className='comment-box' name="documentationGuidelinesComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                        </div>
                    </div>

                    <div className="form-section">
                        <label>How is awareness of firewall policy importance communicated across the organization, particularly to those whose activities may impact network security?</label>
                        <textarea name="awarenessCommunication" onChange={handleChange}></textarea>
                    </div>

                    {/* Compliance and Best Practices */}
                    <h2>4.1.1.1.2.5 Compliance and Best Practices:</h2>
                    <div className="form-section">
                        <label>Are firewall policies aligned with industry best practices and compliance requirements (e.g., PCI-DSS, HIPAA, GDPR), and how is compliance verified?</label>
                        <textarea name="complianceVerification" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>How are policies adapted to account for changes in network architecture, such as the addition of new devices or the implementation of cloud services?</label>
                        <textarea name="policyAdaptation" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>Is there a process for benchmarking firewall policies against peer organizations or security standards to ensure continuous improvement and adoption of best practices?</label>
                        <textarea name="benchmarkingProcess" onChange={handleChange}></textarea>
                    </div>

                    <input type="file" accept="image/*" onChange={handleImageChange} />
{uploadProgress > 0 && <p>Upload Progress: {uploadProgress.toFixed(2)}%</p>}
{imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
{uploadError && <p style={{ color: "red" }}>{uploadError}</p>}
<button type="submit">Submit</button>
                </form>
            </main>
        </div>
    );
}

export default FirewallPoliciesPage;
