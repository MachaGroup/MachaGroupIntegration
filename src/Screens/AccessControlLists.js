import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc, serverTimestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function AccessControlListsPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const storage = getStorage();
    const [formData, setFormData] = useState({});
    const [image, setImage] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [imageUrl, setImageUrl] = useState(null);
    const [uploadError, setUploadError] = useState(null);

    useEffect(() => {
        if (!buildingId) {
            alert('No building selected. Redirecting to Building Info...');
            navigate('BuildingandAddress');
        }
    }, [buildingId, navigate]);

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        if (type === 'radio') {
            setFormData((prevData) => ({
                ...prevData,
                [name]: checked ? value : '',
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleBack = async () => {
        if (formData && buildingId) { 
          try {
            const buildingRef = doc(db, 'Buildings', buildingId);
            const formsRef = collection(db, 'forms/Cybersecurity/Access Control Lists');
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
            const formsRef = collection(db, 'forms/Cybersecurity/Access Control Lists');

            if (image) {
                const storageRef = ref(storage, `acl_images/${Date.now()}_${image.name}`);
                const uploadTask = uploadBytesResumable(storageRef, image);

                uploadTask.on('state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        setUploadProgress(progress);
                    },
                    (error) => {
                        setUploadError(error);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            setImageUrl(downloadURL);
                            setFormData({ ...formData, imageUrl: downloadURL });
                            setUploadError(null);
                        });
                    }
                );
            }

            await addDoc(formsRef, {
                building: buildingRef,
                formData: formData,
                createdAt: serverTimestamp(),
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
                <h1>Access Control Lists Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    {/* Definition and Purpose */}
                    <h2>4.1.1.1.1.1 Definition and Purpose:</h2>
                    <div className="form-section">
                        <label>What criteria are used to define Access Control Lists (ACLs) within the firewall, and how are these criteria determined based on the organization's security policy?</label>
                        <textarea name="defineCriteria" onChange={handleChange}></textarea>
                    </div>

                    {/* ...rest of your form questions... */}
                    <div className="form-section">
                        <label>How does the firewall utilize ACLs to differentiate between authorized and unauthorized network traffic, and what are the default settings for incoming and outgoing traffic?</label>
                        <textarea name="firewallUtilization" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>Are there specific guidelines or protocols in place for creating and updating ACLs to ensure they are aligned with the latest security standards and organizational needs?</label>
                        <div>
                            <input type="radio" name="guidelinesProtocols" value="Yes" onChange={handleChange} id="guidelinesProtocolsYes" /> Yes
                            <input type="radio" name="guidelinesProtocols" value="No" onChange={handleChange} id="guidelinesProtocolsNo" /> No
                            <textarea className='comment-box' name="guidelinesProtocolsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                        </div>
                    </div>

                    {/* Configuration and Implementation */}
                    <h2>4.1.1.1.1.2 Configuration and Implementation:</h2>
                    <div className="form-section">
                        <label>How frequently are ACLs reviewed and updated to reflect changes in network architecture, user roles, or emerging security threats?</label>
                        <textarea name="reviewFrequency" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>What processes are in place to test and validate the effectiveness of ACL configurations before they are implemented in a live environment?</label>
                        <textarea name="validationProcesses" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>Are there automated tools or systems in place to assist with the management and deployment of ACLs across multiple firewall devices within the organization?</label>
                        <div>
                            <input type="radio" name="automatedTools" value="Yes" onChange={handleChange} id="automatedToolsYes" /> Yes
                            <input type="radio" name="automatedTools" value="No" onChange={handleChange} id="automatedToolsNo" /> No
                            <textarea className='comment-box' name="automatedToolsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                        </div>
                    </div>

                    {/* Monitoring and Auditing */}
                    <h2>4.1.1.1.1.3 Monitoring and Auditing:</h2>
                    <div className="form-section">
                        <label>How is the network traffic monitored to ensure ACLs are functioning as intended, and what metrics are used to evaluate their effectiveness?</label>
                        <textarea name="trafficMonitoring" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>Are there regular audits conducted on ACLs to identify any misconfigurations, redundant rules, or outdated entries that could potentially expose the network to risk?</label>
                        <div>
                            <input type="radio" name="regularAudits" value="Yes" onChange={handleChange} id="regularAuditsYes" /> Yes
                            <input type="radio" name="regularAudits" value="No" onChange={handleChange} id="regularAuditsNo" /> No
                            <textarea className='comment-box' name="regularAuditsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                        </div>
                    </div>

                    <div className="form-section">
                        <label>How are incidents involving unauthorized access or ACL breaches documented, and what corrective actions are taken to prevent similar occurrences in the future?</label>
                        <textarea name="incidentDocumentation" onChange={handleChange}></textarea>
                    </div>

                    {/* Training and Awareness */}
                    <h2>4.1.1.1.1.4 Training and Awareness:</h2>
                    <div className="form-section">
                        <label>What training programs are provided to IT staff to ensure they have the knowledge and skills necessary to configure and manage ACLs effectively?</label>
                        <textarea name="trainingPrograms" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>Are there clear documentation and guidelines available for staff responsible for maintaining ACLs, and how is this information kept up-to-date?</label>
                        <textarea name="documentationGuidelines" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>How is awareness about the importance of proper ACL management promoted across the organization, especially among those who have access to critical network resources?</label>
                        <textarea name="promoteAwareness" onChange={handleChange}></textarea>
                    </div>

                    {/* Adaptability and Scalability */}
                    <h2>4.1.1.1.1.5 Adaptability and Scalability:</h2>
                    <div className="form-section">
                        <label>How do ACLs adapt to accommodate new devices, applications, or users added to the network, and is there a process for dynamically updating ACLs in response to these changes?</label>
                        <textarea name="adaptability" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>Are there strategies in place to scale ACL configurations in larger, more complex network environments without compromising security or performance?</label>
                        <textarea name="scalingStrategies" onChange={handleChange}></textarea>
                    </div>

                    <div className="form-section">
                        <label>How are ACLs integrated with other network security measures, such as intrusion detection systems (IDS) or security information and event management (SIEM) systems, to provide a comprehensive security posture?</label>
                        <textarea name="integrationSecurityMeasures" onChange={handleChange}></textarea>
                    </div>
                    {/* Image Upload */}
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
                    {uploadError && <p style={{ color: 'red' }}>{uploadError.message}</p>}

                    <button type="submit">Submit</button>
                </form>
            </main>
        </div>
    );
}

export default AccessControlListsPage;
