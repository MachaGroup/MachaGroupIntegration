import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png'; // Adjust the path if necessary
import Navbar from "./Navbar";
/**/
function DeviceEncryptionPage() {
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
              const formsRef = collection(db, 'forms/Cybersecurity/Device Encryption');
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
            const formsRef = collection(db, 'forms/Cybersecurity/Device Encryption');
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
                <h1>Device Encryption Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    {/* Encryption Standards and Protocols */}
                    <h2>4.1.2.2.2.1 Encryption Standards and Protocols:</h2>
                    <div className="form-section">
                        <label>What encryption algorithms and protocols are used to secure data on laptops, and do they meet industry standards (e.g., AES-256)?</label>
                        <textarea name="encryptionAlgorithms" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>Are there specific policies that dictate the minimum encryption standards required for different types of data stored on laptops?</label>
                        <div>
                            <input type="radio" name="encryptionPolicies" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="encryptionPolicies" value="no" onChange={handleChange} /> No
                            <textarea className='comment-box' name="encryptionPoliciesComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                        </div>
                    </div>

                    <div className="form-section">
                        <label>How are encryption keys managed, stored, and rotated to ensure they remain secure and uncompromised?</label>
                        <textarea name="keyManagement" onChange={handleChange}></textarea>
                    </div>

                    {/* Implementation and Coverage */}
                    <h2>4.1.2.2.2.2 Implementation and Coverage:</h2>
                    <div className="form-section">
                        <label>Is encryption automatically enabled on all laptops, or does it require manual activation by the user?</label>
                        <div>
                            <input type="radio" name="automaticEncryption" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="automaticEncryption" value="no" onChange={handleChange} /> No
                            <textarea className='comment-box' name="automaticEncryptionComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                        </div>
                    </div>

                    <div className="form-section">
                        <label>Are all storage devices on the laptops, including external drives and USB devices, encrypted by default?</label>
                        <div>
                            <input type="radio" name="defaultEncryption" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="defaultEncryption" value="no" onChange={handleChange} /> No
                            <textarea className='comment-box' name="defaultEncryptionComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                        </div>
                    </div>

                    <div className="form-section">
                        <label>What processes are in place to ensure that encryption is uniformly applied across all devices, including new and reissued laptops?</label>
                        <textarea name="encryptionProcesses" onChange={handleChange}></textarea>
                    </div>

                    {/* User Awareness and Training */}
                    <h2>4.1.2.2.2.3 User Awareness and Training:</h2>
                    <div className="form-section">
                        <label>Are users trained on the importance of device encryption and instructed on how to verify that their devices are properly encrypted?</label>
                        <div>
                            <input type="radio" name="userTraining" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="userTraining" value="no" onChange={handleChange} /> No
                            <textarea className='comment-box' name="userTrainingComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                        </div>
                    </div>

                    <div className="form-section">
                        <label>How are users informed about best practices for handling encrypted devices, such as maintaining strong passwords and avoiding unauthorized software installations?</label>
                        <textarea name="userBestPractices" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>Are there periodic refreshers or updates provided to ensure ongoing user compliance and awareness regarding encryption policies?</label>
                        <div>
                            <input type="radio" name="userRefreshers" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="userRefreshers" value="no" onChange={handleChange} /> No
                            <textarea className='comment-box' name="userRefreshersComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                        </div>
                    </div>

                    {/* Compliance and Monitoring */}
                    <h2>4.1.2.2.2.4 Compliance and Monitoring:</h2>
                    <div className="form-section">
                        <label>How is compliance with device encryption policies monitored and enforced across the organization?</label>
                        <textarea name="complianceMonitoring" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>Are there tools or systems in place to regularly audit devices to confirm that encryption is enabled and functioning correctly?</label>
                        <div>
                            <input type="radio" name="auditTools" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="auditTools" value="no" onChange={handleChange} /> No
                            <textarea className='comment-box' name="auditToolsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                        </div>
                    </div>

                    <div className="form-section">
                        <label>What steps are taken if a device is found to be non-compliant or if encryption is accidentally or deliberately disabled?</label>
                        <textarea name="nonComplianceSteps" onChange={handleChange}></textarea>
                    </div>

                    {/* Data Recovery and Contingency Planning */}
                    <h2>4.1.2.2.2.5 Data Recovery and Contingency Planning:</h2>
                    <div className="form-section">
                        <label>What procedures are in place for data recovery in the event of a lost or damaged device that is encrypted?</label>
                        <textarea name="dataRecoveryProcedures" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>How does the organization handle encryption in cases where devices are decommissioned or repurposed to ensure that sensitive data is not accessible?</label>
                        <textarea name="decommissionedDevices" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>Are there contingency plans to access encrypted data in cases where users forget their passwords or lose access to encryption keys?</label>
                        <textarea name="contingencyPlans" onChange={handleChange}></textarea>
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

export default DeviceEncryptionPage;
