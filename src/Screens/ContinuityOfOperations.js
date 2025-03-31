import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc, getDocs, query, where, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function ContinuityOfOperationsPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadContinuityOfOperationsPageImage = httpsCallable(functions, 'uploadContinuityOfOperationsPageImage');

    const [formData, setFormData] = useState({});
    const storage = getStorage();
    const [image, setImage] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [imageUrl, setImageUrl] = useState(null);
    const [uploadError, setUploadError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!buildingId) {
            alert('No building selected. Redirecting to Building Info...');
            navigate('/BuildingandAddress');
        } else {
            loadFormData();
        }
    }, [buildingId, navigate]);

    const loadFormData = async () => {
        setLoading(true);
        try {
            const buildingRef = doc(db, 'Buildings', buildingId);
            const formsRef = collection(db, 'forms/Cybersecurity/Continuity of Operations');
            const q = query(formsRef, where('building', '==', buildingRef));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const docData = querySnapshot.docs[0].data().formData;
                setFormData(docData);
            }
        } catch (error) {
            console.error('Error loading form data:', error);
        } finally {
            setLoading(false);
        }
    };

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
                const formsRef = collection(db, 'forms/Cybersecurity/Continuity of Operations');
                const q = query(formsRef, where('building', '==', buildingRef));
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    await addDoc(formsRef, {
                        building: buildingRef,
                        formData: formData,
                    });
                } else {
                    const docId = querySnapshot.docs[0].id;
                    const formDocRef = doc(db, 'forms/Cybersecurity/Continuity of Operations', docId);
                    await setDoc(formDocRef, {
                        building: buildingRef,
                        formData: formData,
                    }, { merge: true });
                }
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
            const formsRef = collection(db, 'forms/Cybersecurity/Continuity of Operations');
            const q = query(formsRef, where('building', '==', buildingRef));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                await addDoc(formsRef, {
                    building: buildingRef,
                    formData: formData,
                });
            } else {
                const docId = querySnapshot.docs[0].id;
                const formDocRef = doc(db, 'forms/Cybersecurity/Continuity of Operations', docId);
                await setDoc(formDocRef, {
                    building: buildingRef,
                    formData: formData,
                }, { merge: true });
            }
            console.log('Form data submitted successfully!');
            alert('Form submitted successfully!');
            navigate('/Form');
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to submit the form. Please try again.');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="form-page">
            <header className="header">
                <Navbar />
                <button className="back-button" onClick={handleBack}>←</button>
                <h1>4.2.2.2.2 Continuity of Operations Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>4.2.2.2.2.1 Identification of Critical Functions:</h2>
                    {[
                        { name: "identifyCriticalCriteria", label: "What criteria are used to identify and prioritize critical functions that must continue during a disruption?", type: "textarea", securityGatesFormat: true },
                        { name: "criticalFunctionsReviewFrequency", label: "How often are critical functions reviewed and updated to reflect changes in organizational priorities or operations?", type: "textarea", securityGatesFormat: true },
                        { name: "dependenciesDocumented", label: "Are dependencies between critical functions and other business operations clearly documented and understood?", type: "radio", options: ["Yes", "No"], securityGatesFormat: true },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.type === "textarea" && <textarea name={question.name} value={formData[question.name] || ''} onChange={handleChange} />}
                                {question.options && question.options.map((option) => (
                                    <React.Fragment key={option}>
                                        <input
                                            type="radio"
                                            name={question.name}
                                            value={option}
                                            checked={formData[question.name] === option}
                                            onChange={handleChange}
                                        />
                                        {option}
                                    </React.Fragment>
                                ))}
                                {question.securityGatesFormat && <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>}
                            </div>
                        </div>
                    ))}

                    <h3>4.2.2.2.2.2 Continuity Planning and Documentation:</h3>
                    {[
                        { name: "hasCOOP", label: "Does the organization have a comprehensive continuity of operations plan (COOP) that outlines procedures for maintaining critical functions during different types of disruptions?", type: "radio", options: ["Yes", "No"], securityGatesFormat: true },
                        { name: "COOPDocumentationAccessibility", label: "How is the COOP documented, and is it easily accessible to all relevant personnel during an emergency?", type: "textarea", securityGatesFormat: true },
                        { name: "COOPGuidelines", label: "Are there specific guidelines within the COOP for short-term versus long-term continuity of operations?", type: "textarea", securityGatesFormat: true },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.type === "textarea" && <textarea name={question.name} value={formData[question.name] || ''} onChange={handleChange} />}
                                {question.options && question.options.map((option) => (
                                    <React.Fragment key={option}>
                                        <input
                                            type="radio"
                                            name={question.name}
                                            value={option}
                                            checked={formData[question.name] === option}
                                            onChange={handleChange}
                                        />
                                        {option}
                                    </React.Fragment>
                                ))}
                                {question.securityGatesFormat && <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>}
                            </div>
                        </div>
                    ))}

                    <h2>4.2.2.2.2.3 Resource Allocation and Management:</h2>
                    {[
                        { name: "resourceAllocation", label: "What resources (e.g., personnel, technology, financial) are allocated to support the continuity of critical functions during a disruption?", type: "textarea", securityGatesFormat: true },
                        { name: "resourcePrioritization", label: "How are these resources prioritized and managed to ensure they are available when needed?", type: "textarea", securityGatesFormat: true },
                        { name: "backupResourcesPrepared", label: "Are backup resources identified and prepared in advance to mitigate the impact of potential resource shortages?", type: "radio", options: ["Yes", "No"], securityGatesFormat: true },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.type === "textarea" && <textarea name={question.name} value={formData[question.name] || ''} onChange={handleChange} />}
                                {question.options && question.options.map((option) => (
                                    <React.Fragment key={option}>
                                        <input
                                            type="radio"
                                            name={question.name}
                                            value={option}
                                            checked={formData[question.name] === option}
                                            onChange={handleChange}
                                        />
                                        {option}
                                    </React.Fragment>
                                ))}
                                {question.securityGatesFormat && <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>}
                            </div>
                        </div>
                    ))}

                    <h2>4.2.2.2.2.4 Staff Training and Awareness:</h2>
                    {[
                        { name: "staffTraining", label: "Are staff members trained on their roles and responsibilities in maintaining critical functions during a disruption?", type: "radio", options: ["Yes", "No"], securityGatesFormat: true },
                        { name: "trainingFrequency", label: "How often is this training conducted, and does it include practical exercises or simulations?", type: "textarea", securityGatesFormat: true },
                        { name: "staffAwarenessMechanisms", label: "Are there mechanisms in place to ensure that all staff, including new hires and contractors, are aware of the COOP and their role in it?", type: "radio", options: ["Yes", "No"], securityGatesFormat: true },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.type === "textarea" && <textarea name={question.name} value={formData[question.name] || ''} onChange={handleChange} />}
                                {question.options && question.options.map((option) => (
                                    <React.Fragment key={option}>
                                        <input
                                            type="radio"
                                            name={question.name}
                                            value={option}
                                            checked={formData[question.name] === option}
                                            onChange={handleChange}
                                        />
                                        {option}
                                    </React.Fragment>
                                ))}
                                {question.securityGatesFormat && <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>}
                            </div>
                        </div>
                    ))}

                    <h2>4.2.2.2.2.5 Testing and Evaluation of Continuity Plans:</h2>
                    {[
                        { name: "COOPTestFrequency", label: "How often are continuity of operations plans tested to ensure they are effective and up-to-date?", type: "textarea", securityGatesFormat: true },
                        { name: "simulateDisruptionTypes", label: "Are different types of disruptions simulated during these tests to assess the plan's robustness across various scenarios?", type: "textarea", securityGatesFormat: true },
                        { name: "improvePlanFromFeedback", label: "How is feedback from these tests used to improve the continuity of operations planning and procedures?", type: "textarea", securityGatesFormat: true },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.type === "textarea" && <textarea name={question.name} value={formData[question.name] || ''} onChange={handleChange} />}
                                {question.options && question.options.map((option) => (
                                    <React.Fragment key={option}>
                                        <input
                                            type="radio"
                                            name={question.name}
                                            value={option}
                                            checked={formData[question.name] === option}
                                            onChange={handleChange}
                                        />
                                        {option}
                                    </React.Fragment>
                                ))}
                                {question.securityGatesFormat && <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>}
                            </div>
                        </div>
                    ))}

                    <h2>4.2.2.2.2.6 Coordination with External Partners:</h2>
                    {[
                        { name: "externalPartnerships", label: "Are there established partnerships with external organizations (e.g., suppliers, emergency services) to support continuity of critical functions?", type: "radio", options: ["Yes", "No"], securityGatesFormat: true },
                        { name: "partnershipMaintenance", label: "How are these partnerships maintained and reviewed to ensure they remain effective and relevant?", type: "textarea", securityGatesFormat: true },
                        { name: "partnerCoordinationProtocols", label: "Are there protocols in place to communicate and coordinate with these partners during a disruption?", type: "textarea", securityGatesFormat: true },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.type === "textarea" && <textarea name={question.name} value={formData[question.name] || ''} onChange={handleChange} />}
                                {question.options && question.options.map((option) => (
                                    <React.Fragment key={option}>
                                        <input
                                            type="radio"
                                            name={question.name}
                                            value={option}
                                            checked={formData[question.name] === option}
                                            onChange={handleChange}
                                        />
                                        {option}
                                    </React.Fragment>
                                ))}
                                {question.securityGatesFormat && <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>}
                            </div>
                        </div>
                    ))}

                    <h2>4.2.2.2.2.7 Technology and Infrastructure Resilience:</h2>
                    {[
                        { name: "resilientTechMeasures", label: "What measures are in place to ensure that the technology and infrastructure supporting critical functions are resilient to disruptions?", type: "textarea", securityGatesFormat: true },
                        { name: "redundantSystems", label: "Are there redundant systems or failover mechanisms to maintain critical functions in the event of a primary system failure?", type: "textarea", securityGatesFormat: true },
                        { name: "systemMaintenance", label: "How are these systems tested and maintained to ensure they are ready for use during an actual disruption?", type: "textarea", securityGatesFormat: true },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.type === "textarea" && <textarea name={question.name} value={formData[question.name] || ''} onChange={handleChange} />}
                                {question.options && question.options.map((option) => (
                                    <React.Fragment key={option}>
                                        <input
                                            type="radio"
                                            name={question.name}
                                            value={option}
                                            checked={formData[question.name] === option}
                                            onChange={handleChange}
                                        />
                                        {option}
                                    </React.Fragment>
                                ))}
                                {question.securityGatesFormat && <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>}
                            </div>
                        </div>
                    ))}

                    <h2>4.2.2.2.2.8 Continuous Improvement and Plan Updates:</h2>
                    {[
                        { name: "planReviewFrequency", label: "How frequently is the continuity of operations plan reviewed and updated to address new risks, changes in operations, or lessons learned from past disruptions?", type: "textarea", securityGatesFormat: true },
                        { name: "formalFeedbackProcess", label: "Is there a formal process for incorporating feedback from staff and stakeholders into the plan's revisions?", type: "textarea", securityGatesFormat: true },
                        { name: "communicationOfPlanChanges", label: "How are changes to the continuity plan communicated to ensure all relevant parties are aware and prepared?", type: "textarea", securityGatesFormat: true },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.type === "textarea" && <textarea name={question.name} value={formData[question.name] || ''} onChange={handleChange} />}
                                {question.options && question.options.map((option) => (
                                    <React.Fragment key={option}>
                                        <input
                                            type="radio"
                                            name={question.name}
                                            value={option}
                                            checked={formData[question.name] === option}
                                            onChange={handleChange}
                                        />
                                        {option}
                                    </React.Fragment>
                                ))}
                                {question.securityGatesFormat && <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>}
                            </div>
                        </div>
                    ))}

                    <h2>4.2.2.2.2.9 Performance Metrics and Reporting:</h2>
                    {[
                        { name: "performanceMetrics", label: "What performance metrics are used to evaluate the effectiveness of the continuity of operations plan?", type: "textarea", securityGatesFormat: true },
                        { name: "reportingMetrics", label: "Are there regular reports generated to monitor these metrics and identify areas for improvement?", type: "textarea", securityGatesFormat: true },
                        { name: "criticalFunctionSuccess", label: "How is the success of maintaining critical functions measured during a disruption?", type: "textarea", securityGatesFormat: true },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.type === "textarea" && <textarea name={question.name} value={formData[question.name] || ''} onChange={handleChange} />}
                                {question.options && question.options.map((option) => (
                                    <React.Fragment key={option}>
                                        <input
                                            type="radio"
                                            name={question.name}
                                            value={option}
                                            checked={formData[question.name] === option}
                                            onChange={handleChange}
                                        />
                                        {option}
                                    </React.Fragment>
                                ))}
                                {question.securityGatesFormat && <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>}
                            </div>
                        </div>
                    ))}

                    <h2>4.2.2.2.2.10 Communication Strategy During Disruptions:</h2>
                    {[
                        { name: "communicationStrategies", label: "What communication strategies are in place to keep staff and stakeholders informed about the status of critical functions during a disruption?", type: "textarea", securityGatesFormat: true },
                        { name: "predefinedCommChannels", label: "Are there predefined communication channels and messages for different types of disruptions?", type: "radio", options: ["Yes", "No"], securityGatesFormat: true },
                        { name: "communicationImprovement", label: "How is communication effectiveness evaluated and improved over time to support continuity efforts?", type: "textarea", securityGatesFormat: true },
                    ].map((question, index) => (
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                {question.type === "textarea" && <textarea name={question.name} value={formData[question.name] || ''} onChange={handleChange} />}
                                {question.options && question.options.map((option) => (
                                    <React.Fragment key={option}>
                                        <input
                                            type="radio"
                                            name={question.name}
                                            value={option}
                                            checked={formData[question.name] === option}
                                            onChange={handleChange}
                                        />
                                        {option}
                                    </React.Fragment>
                                ))}
                                {question.securityGatesFormat && <textarea className='comment-box' name={`${question.name}Comment`} placeholder="Comment (Optional)" value={formData[`${question.name}Comment`] || ''} onChange={handleChange}></textarea>}
                            </div>
                        </div>
                    ))}

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

export default ContinuityOfOperationsPage;