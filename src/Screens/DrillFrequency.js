import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import Navbar from "./Navbar";

function DrillFrequencyFormPage() {
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
                const formsRef = collection(db, 'forms/Emergency Preparedness/Drill Frequency');
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
            const formsRef = collection(db, 'forms/Emergency Preparedness/Drill Frequency');
            await addDoc(formsRef, {
                building: buildingRef,
                formData: formData,
            });

            if (image) {
                const imageRef = ref(storage, `images/drillFrequency/${image.name}`);
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
                <h1>Drill Frequency Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <div className="form-section">
                        <label>1. What is the planned frequency of emergency drills within the facility?</label>
                        <div>
                            <input type="text" name="plannedEmergencyDrills" placeholder="Describe the plan" onChange={handleChange} />
                        </div>
                    </div>

                    <div className="form-section">
                        <label>2. Is there a predefined schedule for conducting drills, such as monthly, quarterly, or semi-annually?</label>
                        <div>
                            <input type="radio" name="predifinedSchedule" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="predifinedSchedule" value="no" onChange={handleChange} /> No
                            <textarea className='comment-box' name="predifinedSchedule-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                        </div>
                    </div>

                    <div className="form-section">
                        <label>3. Are drill frequencies determined based on regulatory requirements, organizational policies, and best practices for emergency preparedness?</label>
                        <div>
                            <input type="radio" name="Regulation-Based Frequency" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="Regulation-Based Frequency" value="no" onChange={handleChange} /> No
                            <textarea className='comment-box' name="Regulation-Based Frequency-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                        </div>
                    </div>

                    <div className="form-section">
                        <label>4. Are drills conducted consistently according to the established schedule?</label>
                        <div>
                            <input type="radio" name="Schedule Consistency" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="Schedule Consistency" value="no" onChange={handleChange} /> No
                            <textarea className='comment-box' name="Schedule Consistency-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                        </div>
                    </div>

                    <div className="form-section">
                        <label>5. Are deviations from the scheduled frequency documented and justified, such as rescheduling due to operational constraints or other priorities?</label>
                        <div>
                            <input type="radio" name="Deviation Documentation" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="Deviation Documentation" value="no" onChange={handleChange} /> No
                            <textarea className='comment-box' name="Deviation Documentation-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                        </div>
                    </div>

                    <div className="form-section">
                        <label>6. Is there a process for ensuring compliance with scheduled drill frequencies and addressing any lapses or delays?</label>
                        <div>
                            <input type="radio" name="Compliance Process" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="Compliance Process" value="no" onChange={handleChange} /> No
                            <textarea className='comment-box' name="Compliance Process-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                        </div>
                        <div>
                            <input type="text" name="complianceProcess" placeholder="Describe the process" onChange={handleChange} />
                        </div>
                    </div>

                    <div className="form-section">
                        <label>7. Are different types of emergency drills included in the drill schedule to cover a range of potential scenarios, hazards, and response actions?</label>
                        <div>
                            <input type="radio" name="Scenario Diversity" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="Scenario Diversity" value="no" onChange={handleChange} /> No
                            <textarea className='comment-box' name="Scenario Diversity-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                        </div>
                    </div>

                    <div className="form-section">
                        <label>8. Do drills address various emergency situations, such as fires, earthquakes, active threats, hazardous material spills, and medical emergencies?</label>
                        <div>
                            <input type="radio" name="Multi-Situation Coverage" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="Multi-Situation Coverage" value="no" onChange={handleChange} /> No
                            <textarea className='comment-box' name="Multi-Situation Coverage-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                        </div>
                    </div>

                    <div className="form-section">
                        <label>9. Are drills conducted in different areas of the facility to assess readiness and response capabilities across multiple locations?</label>
                        <div>
                            <input type="radio" name="Location Coverage" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="Location Coverage" value="no" onChange={handleChange} /> No
                            <textarea className='comment-box' name="Location Coverage-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                        </div>
                    </div>

                    <div className="form-section">
                        <label>10. Are all relevant stakeholders, including staff members, occupants, management personnel, and external partners, involved in drill activities?</label>
                        <div>
                            <input type="radio" name="Stakeholder Involvement" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="Stakeholder Involvement" value="no" onChange={handleChange} /> No
                            <textarea className='comment-box' name="Stakeholder Involvement-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                        </div>
                    </div>

                    <div className="form-section">
                        <label>11. Are drills coordinated with external agencies, such as emergency responders, to facilitate collaboration and mutual aid during emergencies?</label>
                        <div>
                            <input type="radio" name="Agency Coordination" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="Agency Coordination" value="no" onChange={handleChange} /> No
                            <textarea className='comment-box' name="Agency Coordination-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                        </div>
                    </div>

                    <div className="form-section">
                        <label>12. Are drills used as opportunities to engage and educate stakeholders on emergency procedures, roles, and responsibilities?</label>
                        <div>
                            <input type="radio" name="Stakeholder Engagement" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="Stakeholder Engagement" value="no" onChange={handleChange} /> No
                            <textarea className='comment-box' name="Stakeholder Engagement-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                        </div>
                    </div>

                    <div className="form-section">
                        <label>13. Are drills evaluated for their effectiveness in achieving desired learning objectives and improving emergency preparedness and response capabilities?</label>
                        <div>
                            <input type="radio" name="Drill Effectiveness" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="Drill Effectiveness" value="no" onChange={handleChange} /> No
                            <textarea className='comment-box' name="Drill Effectiveness-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                        </div>
                    </div>

                    <div className="form-section">
                        <label>14. Are feedback mechanisms in place to capture observations, insights, and lessons learned from drill participants and observers?</label>
                        <div>
                            <input type="radio" name="Feedback Mechanisms" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="Feedback Mechanisms" value="no" onChange={handleChange} /> No
                            <textarea className='comment-box' name="Feedback Mechanisms-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                        </div>
                        <div>
                            <input type="text" name="feedbackMechanisms" placeholder="Describe the feedback mechanisms" onChange={handleChange} />
                        </div>
                    </div>

                    <div className="form-section">
                        <label>15. Are drill outcomes analyzed to identify strengths, areas for improvement, and opportunities for enhancing emergency readiness?</label>
                        <div>
                            <input type="radio" name="Outcome Analysis" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="Outcome Analysis" value="no" onChange={handleChange} /> No
                            <textarea className='comment-box' name="Outcome Analysis-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                        </div>
                    </div>

                    <div className="form-section">
                        <label>16. Is the drill frequency adjusted based on changing risk factors, operational needs, regulatory requirements, and lessons learned from previous drills?</label>
                        <div>
                            <input type="radio" name="Frequency Adjustment" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="Frequency Adjustment" value="no" onChange={handleChange} /> No
                            <textarea className='comment-box' name="Frequency Adjustment-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                        </div>
                    </div>

                    <div className="form-section">
                        <label>17. Are drill schedules flexible to accommodate emerging threats, organizational changes, and feedback from stakeholders?</label>
                        <div>
                            <input type="radio" name="Schedule Flexibility" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="Schedule Flexibility" value="no" onChange={handleChange} /> No
                            <textarea className='comment-box' name="Schedule Flexibility-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                        </div>
                    </div>

                    <div className="form-section">
                        <label>18. Is there a process for incorporating feedback and recommendations from drill evaluations into future drill planning and execution?</label>
                        <div>
                            <input type="radio" name="Feedback Integration" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="Feedback Integration" value="no" onChange={handleChange} /> No
                            <textarea className='comment-box' name="Feedback Integration-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                        </div>
                        <div>
                            <input type="text" name="feedbackIntegration" placeholder="Describe the process" onChange={handleChange} />
                        </div>
                    </div>

                    <div className="form-section">
                        <label>19. Are records maintained to document the scheduling, execution, and outcomes of emergency drills?</label>
                        <div>
                            <input type="radio" name="Drill Recordkeeping" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="Drill Recordkeeping" value="no" onChange={handleChange} /> No
                            <textarea className='comment-box' name="Drill Recordkeeping-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                        </div>
                    </div>

                    <div className="form-section">
                        <label>20. Are drill records accessible for review, analysis, and reporting purposes, including compliance assessments and performance evaluations?</label>
                        <div>
                            <input type="radio" name="Records Accessibility" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="Records Accessibility" value="no" onChange={handleChange} /> No
                            <textarea className='comment-box' name="Records Accessibility-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                        </div>
                    </div>

                    <div className="form-section">
                        <label>21. Are drill schedules and records retained for auditing, training, and planning purposes, in accordance with applicable regulations and organizational policies?</label>
                        <div>
                            <input type="radio" name="Retention Policy" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="Retention Policy" value="no" onChange={handleChange} /> No
                            <textarea className='comment-box' name="Retention Policy-comment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
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

export default DrillFrequencyFormPage;