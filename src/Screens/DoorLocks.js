import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function DoorLocksPage() {
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
        if (formData && buildingId) {
            try {
                const buildingRef = doc(db, 'Buildings', buildingId);
                const formsRef = collection(db, 'forms/Physical Security/Door Locks');
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
            alert('Building ID is missing. Please start the assessment from the correct page.');
            return;
        }

        try {
            const buildingRef = doc(db, 'Buildings', buildingId);
            const formsRef = collection(db, 'forms/Physical Security/Door Locks');
            await addDoc(formsRef, {
                building: buildingRef,
                formData: formData,
            });

            if (image) {
                const imageRef = ref(storage, `images/doorLocks/${image.name}`);
                const uploadTask = uploadBytesResumable(imageRef, image);

                uploadTask.on('state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        setUploadProgress(progress);
                    },
                    (error) => {
                        setUploadError(error.message);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            setImageUrl(downloadURL);
                        });
                    }
                );
            }
            console.log('Form Data submitted successfully!');
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
                <h1>Door Locks (e.g., electronic locks) Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <div className="form-section">
                        <label>1. Are the electronic door locks operational and functioning as intended?</label>
                        <div>
                            <input type="radio" name="operational" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="operational" value="no" onChange={handleChange} /> No
                            <textarea className='comment-box' name="operationalComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                        </div>
                    </div>

                    <div className="form-section">
                        <label>2. Do the locks reliably secure doors to prevent unauthorized access?</label>
                        <div>
                            <input type="radio" name="secureLocks" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="secureLocks" value="no" onChange={handleChange} /> No
                            <textarea className='comment-box' name="secureLocksComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                        </div>
                    </div>

                    <div className="form-section">
                        <label>3. Are there any signs of malfunction or errors in the locking mechanisms?</label>
                        <div>
                            <input type="radio" name="malfunction" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="malfunction" value="no" onChange={handleChange} /> No
                            <textarea className='comment-box' name="malfunctionComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                        </div>
                    </div>

                    <div className="form-section">
                        <label>4. Are backup systems in place in case of power outages or malfunctions?</label>
                        <div>
                            <input type="radio" name="backupSystems" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="backupSystems" value="no" onChange={handleChange} /> No
                            <textarea className='comment-box' name="backupSystemsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                        </div>
                    </div>

                    <div className="form-section">
                        <label>5. What authentication methods are used with the electronic door locks (e.g., RFID cards, key codes, biometric scans)?</label>
                        <div>
                            <input type="text" name="authenticationMethods" placeholder="Enter authentication methods" onChange={handleChange} />
                        </div>
                    </div>

                    <div className="form-section">
                        <label>6. Are these authentication methods secure and resistant to unauthorized duplication or bypass?</label>
                        <div>
                            <input type="radio" name="authSecure" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="authSecure" value="no" onChange={handleChange} /> No
                            <textarea className='comment-box' name="authSecureComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                        </div>
                    </div>

                    <div className="form-section">
                        <label>7. Is multi-factor authentication implemented to enhance security (e.g., combining a PIN code with a biometric scan)?</label>
                        <div>
                            <input type="radio" name="MFA" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="MFA" value="no" onChange={handleChange} /> No
                            <textarea className='comment-box' name="MFAComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                        </div>
                    </div>

                    <div className="form-section">
                        <label>8. How are access rights managed and enforced through the electronic door locks?</label>
                        <div>
                            <input type="text" name="accessRightsManagement" placeholder="Describe access rights management" onChange={handleChange} />
                        </div>
                    </div>

                    <div className="form-section">
                        <label>9. Is access restricted to individuals with valid credentials or authorization?</label>
                        <div>
                            <input type="radio" name="validCredentials" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="validCredentials" value="no" onChange={handleChange} /> No
                            <textarea className='comment-box' name="validCredentialsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                        </div>
                    </div>

                    <div className="form-section">
                        <label>10. Is there a process for granting, modifying, or revoking access permissions as needed?</label>
                        <div>
                            <input type="radio" name="accessPermissions" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="accessPermissions" value="no" onChange={handleChange} /> No
                            <textarea className='comment-box' name="accessPermissionsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                        </div>
                    </div>

                    <div className="form-section">
                        <label>11. Are the electronic door locks integrated with other security systems, such as access control software, surveillance cameras, or alarm systems?</label>
                        <div>
                            <input type="radio" name="integrationSecuritySystems" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="integrationSecuritySystems" value="no" onChange={handleChange} /> No
                            <textarea className='comment-box' name="integrationSecuritySystemsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                        </div>
                    </div>

                    <div className="form-section">
                        <label>12. Do they communicate seamlessly with these systems to provide real-time monitoring and response to security events?</label>
                        <div>
                            <input type="radio" name="realTimeMonitoring" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="realTimeMonitoring" value="no" onChange={handleChange} /> No
                            <textarea className='comment-box' name="realTimeMonitoringComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                        </div>
                    </div>

                    <div className="form-section">
                        <label>13. Are access events logged and recorded for audit and analysis purposes?</label>
                        <div>
                            <input type="radio" name="accessEventsLogging" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="accessEventsLogging" value="no" onChange={handleChange} /> No
                            <textarea className='comment-box' name="accessEventsLoggingComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                        </div>
                    </div>

                    <div className="form-section">
                        <label>14. Are the electronic door locks made from durable materials and designed to withstand tampering or forced entry attempts?</label>
                        <div>
                            <input type="radio" name="durability" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="durability" value="no" onChange={handleChange} /> No
                            <textarea className='comment-box' name="durabilityComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                        </div>
                    </div>

                    <div className="form-section">
                        <label>15. Are there anti-tamper features or sensors to detect and respond to unauthorized manipulation?</label>
                        <div>
                            <input type="radio" name="antiTamper" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="antiTamper" value="no" onChange={handleChange} /> No
                            <textarea className='comment-box' name="antiTamperComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                        </div>
                    </div>

                    <div className="form-section">
                        <label>16. Are the locks resistant to environmental factors such as moisture, temperature extremes, or physical wear?</label>
                        <div>
                            <input type="radio" name="environmentalResistance" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="environmentalResistance" value="no" onChange={handleChange} /> No
                            <textarea className='comment-box' name="environmentalResistanceComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                        </div>
                    </div>

                    <div className="form-section">
                        <label>17. Is there a regular maintenance schedule in place for the electronic door locks?</label>
                        <div>
                            <input type="radio" name="maintenanceSchedule" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="maintenanceSchedule" value="no" onChange={handleChange} /> No
                            <textarea className='comment-box' name="maintenanceScheduleComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                        </div>
                    </div>

                    <div className="form-section">
                        <label>18. Are maintenance tasks, such as battery replacement, software updates, and inspection of locking mechanisms, performed according to schedule?</label>
                        <div>
                            <input type="radio" name="maintenanceTasks" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="maintenanceTasks" value="no" onChange={handleChange} /> No
                            <textarea className='comment-box' name="maintenanceTasksComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                        </div>
                    </div>

                    <div className="form-section">
                        <label>19. Are there records documenting maintenance activities, repairs, and any issues identified during inspections?</label>
                        <div>
                            <input type="radio" name="maintenanceRecords" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="maintenanceRecords" value="no" onChange={handleChange} /> No
                            <textarea className='comment-box' name="maintenanceRecordsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                        </div>
                    </div>

                    <div className="form-section">
                        <label>20. Have users, such as security personnel, staff, and authorized individuals, received training on how to use the electronic door locks properly?</label>
                        <div>
                            <input type="radio" name="userTraining" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="userTraining" value="no" onChange={handleChange} /> No
                            <textarea className='comment-box' name="userTrainingComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                        </div>
                    </div>

                    <div className="form-section">
                        <label>21. Are there instructions or guidelines available to users regarding proper door access procedures and security protocols?</label>
                        <div>
                            <input type="radio" name="userInstructions" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="userInstructions" value="no" onChange={handleChange} /> No
                            <textarea className='comment-box' name="userInstructionsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                        </div>
                    </div>

                    <div className="form-section">
                        <label>22. Is there a process for reporting malfunctions, damage, or security incidents related to the electronic door locks?</label>
                        <div>
                            <input type="radio" name="reportingProcess" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="reportingProcess" value="no" onChange={handleChange} /> No
                            <textarea className='comment-box' name="reportingProcessComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                        </div>
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

export default DoorLocksPage;