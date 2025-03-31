import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function ClassroomLockdownProtocolsFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadClassroomLockdownProtocolsImage = httpsCallable(functions, 'uploadClassroomLockdownProtocolsImage');

    const [formData, setFormData] = useState({});
    const [imageData, setImageData] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);

    useEffect(() => {
        if (!buildingId) {
            alert('No building selected. Redirecting to Building Info...');
            navigate('BuildingandAddress');
            return;
        }

        const fetchFormData = async () => {
            setLoading(true);
            setLoadError(null);

            try {
                const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Classroom Lockdown Protocols', buildingId);
                const docSnapshot = await getDoc(formDocRef);

                if (docSnapshot.exists()) {
                    setFormData(docSnapshot.data().formData || {});
                } else {
                    setFormData({});
                }
            } catch (error) {
                console.error("Error fetching form data:", error);
                setLoadError("Failed to load form data. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchFormData();
    }, [buildingId, db, navigate]);

    

const handleChange = async (e) => {
       const { name, value } = e.target;
          const newFormData = { ...formData, [name]: value };
                setFormData(newFormData);
                                 
                try {
                const buildingRef = doc(db, 'Buildings', buildingId); // Create buildingRef
                const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Classroom Lockdown Protocols', buildingId);
                    await setDoc(formDocRef, { formData: { ...newFormData, building: buildingRef } }, { merge: true }); // Use merge and add building
                    console.log("Form data saved to Firestore:", { ...newFormData, building: buildingRef });
                    } catch (error) {
                      console.error("Error saving form data to Firestore:", error);
                   alert("Failed to save changes. Please check your connection and try again.");
                                        }
                                    };  

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageData(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleBack = () => {
        navigate(-1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!buildingId) {
            alert('Building ID is missing. Please start the assessment from the correct page.');
            return;
        }

        if (imageData) {
            try {
                const uploadResult = await uploadClassroomLockdownProtocolsImage({ imageData: imageData });
                setImageUrl(uploadResult.data.imageUrl);
                setFormData({ ...formData, imageUrl: uploadResult.data.imageUrl });
                setImageUploadError(null);
            } catch (error) {
                console.error('Error uploading image:', error);
                setImageUploadError(error.message);
            }
        }

        try {
            const formDocRef = doc(db, 'forms', 'Emergency Preparedness', 'Classroom Lockdown Protocols', buildingId);
            await setDoc(formDocRef, { formData: formData }, { merge: true });
            console.log('Form data submitted successfully!');
            alert('Form submitted successfully!');
            navigate('/Form');
        } catch (error) {
            console.error("Error saving form data to Firestore:", error);
            alert("Failed to save changes. Please check your connection and try again.");
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (loadError) {
        return <div>Error: {loadError}</div>;
    }

    return (
        <div className="form-page">
            <header className="header">
                <Navbar />
                <button className="back-button" onClick={handleBack}>←</button>
                <h1>Classroom Lockdown Procedures Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>2.2.1.2.1 Door Locks:</h2>
                    {[
                        { name: "classroomDoorsLocks", label: "Are classroom doors equipped with locks that can be securely engaged from the inside?" },
                        { name: "locksSafetyStandard", label: "Do locks meet safety standards and regulations for lockdown procedures?" },
                        { name: "lockOperational", label: "Are locks easy to operate and reliably secure, even under stress or pressure?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                <input type="radio" name={question.name} value="yes" checked={formData[question.name] === 'yes'} onChange={handleChange} /> Yes
                                <input type="radio" name={question.name} value="no" checked={formData[question.name] === 'no'} onChange={handleChange} /> No
                            </div>
                            <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                        </div>
                    ))}

                    <h2>2.2.1.2.2 Barricading Mechanisms:</h2>
                    {[
                        { name: "barricadingMechanism", label: "Are there barricading mechanisms available in classrooms to reinforce door security during lockdowns?" },
                        { name: "barricadingDeviceOperational", label: "Do barricading devices effectively prevent unauthorized entry and provide additional time for occupants to seek shelter or escape?" },
                        { name: "barricadingDeviceEfficiency", label: "Are barricading devices designed to be quickly deployed and easily removed by authorized personnel?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                <input type="radio" name={question.name} value="yes" checked={formData[question.name] === 'yes'} onChange={handleChange} /> Yes
                                <input type="radio" name={question.name} value="no" checked={formData[question.name] === 'no'} onChange={handleChange} /> No
                            </div>
                            <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                        </div>
                    ))}
                    <div className="form-section">
                        <label>List the mechanisms</label>
                        <input type="text" name="barricadingMechanismsList" value={formData.barricadingMechanismsList || ''} onChange={handleChange} />
                    </div>

                    <h2>Training and Drills:</h2>
                    {[
                        { name: "lockdownProcedureTraining", label: "Are staff members and students trained in lockdown procedures, including how to barricade doors effectively?" },
                        { name: "regularLockdownDrills", label: "Are drills conducted regularly to practice lockdown scenarios and ensure familiarity with procedures?" },
                        { name: "regularlyLockdownDebriefing", label: "Are debriefings held after drills to review performance, identify areas for improvement, and reinforce best practices?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                <input type="radio" name={question.name} value="yes" checked={formData[question.name] === 'yes'} onChange={handleChange} /> Yes
                                <input type="radio" name={question.name} value="no" checked={formData[question.name] === 'no'} onChange={handleChange} /> No
                            </div>
                            <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                        </div>
                    ))}

                    <h2>Communication Systems:</h2>
                    {[
                        { name: "lockdownCommunicationSystem", label: "Is there a communication system in place to alert occupants of lockdowns and provide instructions?" },
                        { name: "emergencyCommunicationDevices", label: "Are emergency communication devices accessible in classrooms for contacting authorities or requesting assistance?" },
                        { name: "designatedProtocol", label: "Is there a designated protocol for reporting suspicious activity or potential threats to school administrators or security personnel?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                <input type="radio" name={question.name} value="yes" checked={formData[question.name] === 'yes'} onChange={handleChange} /> Yes
                                <input type="radio" name={question.name} value="no" checked={formData[question.name] === 'no'} onChange={handleChange} /> No
                            </div>
                            <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                        </div>
                    ))}
                    <div className="form-section">
                        <label>Describe the communication system</label>
                        <input type="text" name="lockdownCommunicationSystemDescription" value={formData.lockdownCommunicationSystemDescription || ''} onChange={handleChange} />
                    </div>
                    <div className="form-section">
                        <label>List the devices</label>
                        <input type="text" name="emergencyCommunicationDevicesList" value={formData.emergencyCommunicationDevicesList || ''} onChange={handleChange} />
                    </div>
                    <div className="form-section">
                        <label>Describe the protocol</label>
                        <input type="text" name="designatedProtocolDescription" value={formData.designatedProtocolDescription || ''} onChange={handleChange} />
                    </div>

                    <h2>Safe Zones and Hiding Places:</h2>
                    {[
                        { name: "designatedSafeZones", label: "Are there designated safe zones or hiding places within classrooms where occupants can seek shelter during lockdowns?" },
                        { name: "strategicSafeZones", label: "Are these areas strategically located to provide cover and concealment from potential threats?" },
                        { name: "safeZonesVulnerabilities", label: "Have safe zones been assessed for potential vulnerabilities and reinforced as needed to enhance security?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                <input type="radio" name={question.name} value="yes" checked={formData[question.name] === 'yes'} onChange={handleChange} /> Yes
                                <input type="radio" name={question.name} value="no" checked={formData[question.name] === 'no'} onChange={handleChange} /> No
                            </div>
                            <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                        </div>
                    ))}
                    <div className="form-section">
                        <label>Describe the safe zones</label>
                        <input type="text" name="designatedSafeZonesDescription" value={formData.designatedSafeZonesDescription || ''} onChange={handleChange} />
                    </div>

                    <h2>Coordination with Authorities:</h2>
                    {[
                        { name: "personelCoordination", label: "Is there coordination between school personnel and local law enforcement agencies on lockdown procedures and response protocols?" },
                        { name: "lawEnforcementFamiliarity", label: "Are law enforcement agencies familiar with school layouts and lockdown plans to facilitate their response in the event of an emergency?" },
                        { name: "lawEnforcementReview", label: "Are there regular meetings or exercises conducted with law enforcement to review and refine lockdown procedures?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                <input type="radio" name={question.name} value="yes" checked={formData[question.name] === 'yes'} onChange={handleChange} /> Yes
                                <input type="radio" name={question.name} value="no" checked={formData[question.name] === 'no'} onChange={handleChange} /> No
                            </div>
                            <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                        </div>
                    ))}

                    <h2>Parent and Guardian Communication:</h2>
                    {[
                        { name: "guardiansInformed", label: "Are parents and guardians informed of lockdown procedures and expectations for student safety?" },
                        { name: "guardiansCommunication", label: "Is there a communication plan in place for notifying parents and guardians of lockdown events and providing updates as needed?" },
                        { name: "availableSupportServices", label: "Are resources or support services available to assist families in coping with the emotional impact of lockdown situations?" }
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                <input type="radio" name={question.name} value="yes" checked={formData[question.name] === 'yes'} onChange={handleChange} /> Yes
                                <input type="radio" name={question.name} value="no" checked={formData[question.name] === 'no'} onChange={handleChange} /> No
                            </div>
                            <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>
                        </div>
                    ))}
                    <div className="form-section">
                        <label>Describe the plan</label>
                        <input type="text" name="guardiansCommunicationDescription" value={formData.guardiansCommunicationDescription || ''} onChange={handleChange} />
                    </div>

                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
                    {imageUploadError && <p style={{ color: 'red' }}>{imageUploadError}</p>}

                    <button type="submit">Submit</button>
                </form>
            </main>
        </div>
    );
}

export default ClassroomLockdownProtocolsFormPage;