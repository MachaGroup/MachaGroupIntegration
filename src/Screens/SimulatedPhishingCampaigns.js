import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function SimulatedPhishingCampaignsPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    const uploadImage = httpsCallable(functions, 'uploadSimulatedPhisingCampaignsImage'); // Assuming you can reuse this function

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
                const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Simulated Phishing Campaigns', buildingId);
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
            const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Simulated Phishing Campaigns', buildingId);
            await setDoc(formDocRef, { formData: newFormData }, { merge: true });
            console.log("Form data saved to Firestore:", newFormData);
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
            alert('Building ID is missing. Please start from the Building Information page.');
            return;
        }

        if (imageData) {
            try {
                const uploadResult = await uploadImage({ imageData: imageData });
                setImageUrl(uploadResult.data.imageUrl);
                setFormData({ ...formData, imageUrl: uploadResult.data.imageUrl });
                setImageUploadError(null);
            } catch (error) {
                console.error('Error uploading image:', error);
                setImageUploadError(error.message);
            }
        }

        try {
            const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Simulated Phishing Campaigns', buildingId);
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
                <h1>Simulated Phishing Campaigns Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>4.3.1.1.1.1 Design and Implementation:</h2>
                    <div className="form-section">
                        <label>How are simulated phishing campaigns designed to reflect realistic phishing threats and tactics?</label>
                        <textarea name="phishingDesign" value={formData.phishingDesign || ''} onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>What criteria are used to select the timing, frequency, and targets of these simulated phishing campaigns?</label>
                        <textarea name="phishingCriteria" value={formData.phishingCriteria || ''} onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>Are the simulated phishing emails varied in difficulty to test different levels of user awareness and susceptibility?</label>
                        <div>
                            <input type="radio" name="emailDifficultyVariety" value="Yes" checked={formData.emailDifficultyVariety === "Yes"} onChange={handleChange} /> Yes
                            <input type="radio" name="emailDifficultyVariety" value="No" checked={formData.emailDifficultyVariety === "No"} onChange={handleChange} /> No
                        </div>
                        <div>
                            <input type="text" name="emailDifficultyVarietyComment" placeholder="Comments" value={formData.emailDifficultyVarietyComment || ''} onChange={handleChange} />
                        </div>
                    </div>

                    <h2>4.3.1.1.1.2 User Response and Feedback:</h2>
                    <div className="form-section">
                        <label>How are user responses to simulated phishing attempts tracked and analyzed to identify trends and common vulnerabilities?</label>
                        <textarea name="userResponseTracking" value={formData.userResponseTracking || ''} onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>Is there an immediate feedback mechanism in place to inform users whether they have successfully identified a phishing attempt or fallen for the simulation?</label>
                        <div>
                            <input type="radio" name="feedbackMechanism" value="Yes" checked={formData.feedbackMechanism === "Yes"} onChange={handleChange} /> Yes
                            <input type="radio" name="feedbackMechanism" value="No" checked={formData.feedbackMechanism === "No"} onChange={handleChange} /> No
                        </div>
                        <div>
                            <input type="text" name="feedbackMechanismComment" placeholder="Comments" value={formData.feedbackMechanismComment || ''} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-section">
                        <label>How is user feedback incorporated into improving the design and effectiveness of future simulated phishing campaigns?</label>
                        <textarea name="userFeedbackIncorporation" value={formData.userFeedbackIncorporation || ''} onChange={handleChange}></textarea>
                    </div>

                    <h2>4.3.1.1.1.3 Training and Education:</h2>
                    <div className="form-section">
                        <label>Are users provided with training or resources after a simulated phishing campaign to help them better identify phishing attempts in the future?</label>
                        <div>
                            <input type="radio" name="trainingResources" value="Yes" checked={formData.trainingResources === "Yes"} onChange={handleChange} /> Yes
                            <input type="radio" name="trainingResources" value="No" checked={formData.trainingResources === "No"} onChange={handleChange} /> No
                        </div>
                        <div>
                            <input type="text" name="trainingResourcesComment" placeholder="Comments" value={formData.trainingResourcesComment || ''} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-section">
                        <label>How often is phishing awareness training updated to reflect the latest phishing tactics and trends?</label>
                        <textarea name="trainingUpdateFrequency" value={formData.trainingUpdateFrequency || ''} onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>Is there a follow-up process to ensure that users who fail the simulation receive additional training or support?</label>
                        <div>
                            <input type="radio" name="followUpTraining" value="Yes" checked={formData.followUpTraining === "Yes"} onChange={handleChange} /> Yes
                            <input type="radio" name="followUpTraining" value="No" checked={formData.followUpTraining === "No"} onChange={handleChange} /> No
                        </div>
                        <div>
                            <input type="text" name="followUpTrainingComment" placeholder="Comments" value={formData.followUpTrainingComment || ''} onChange={handleChange} />
                        </div>
                    </div>

                    <h2>4.3.1.1.1.4 Performance Metrics and Reporting:</h2>
                    <div className="form-section">
                        <label>What metrics are used to evaluate the effectiveness of simulated phishing campaigns (e.g., click rates, reporting rates, repeat offenders)?</label>
                        <textarea name="campaignMetrics" value={formData.campaignMetrics || ''} onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>How are these metrics reported to stakeholders, and are they used to inform cybersecurity policies and procedures?</label>
                        <textarea name="metricsReporting" value={formData.metricsReporting || ''} onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>Is there a process for benchmarking these metrics against industry standards or previous campaign results to measure improvement over time?</label>
                        <div>
                            <input type="radio" name="benchmarkingProcess" value="Yes" checked={formData.benchmarkingProcess === "Yes"} onChange={handleChange} /> Yes
                            <input type="radio" name="benchmarkingProcess" value="No" checked={formData.benchmarkingProcess === "No"} onChange={handleChange} /> No
                        </div>
                        <div>
                            <input type="text" name="benchmarkingProcessComment" placeholder="Comments" value={formData.benchmarkingProcessComment || ''} onChange={handleChange} />
                        </div>
                    </div>

                    <h2>4.3.1.1.1.5 Continuous Improvement and Adaptation:</h2>
                    <div className="form-section">
                        <label>How are the results of simulated phishing campaigns used to continuously improve phishing awareness and training programs?</label>
                        <textarea name="campaignResultsImprovement" value={formData.campaignResultsImprovement || ''} onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>Are there regular reviews and updates to the simulation content to adapt to new phishing techniques and emerging threats?</label>
                        <div>
                            <input type="radio" name="simulationUpdates" value="Yes" checked={formData.simulationUpdates === "Yes"} onChange={handleChange} /> Yes
                            <input type="radio" name="simulationUpdates" value="No" checked={formData.simulationUpdates === "No"} onChange={handleChange} /> No
                        </div>
                        <div>
                            <input type="text" name="simulationUpdatesComment" placeholder="Comments" value={formData.simulationUpdatesComment || ''} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-section">
                        <label>How does the organization ensure that the simulated phishing campaigns remain challenging and engaging for users to prevent complacency?</label>
                        <textarea name="campaignEngagement" value={formData.campaignEngagement || ''} onChange={handleChange}></textarea>
                    </div>

                    <h2>4.3.1.1.1.6 Coordination with IT and Security Teams:</h2>
                    <div className="form-section">
                        <label>How are the IT and security teams involved in the planning and execution of simulated phishing campaigns?</label>
                        <textarea name="itSecurityInvolvement" value={formData.itSecurityInvolvement || ''} onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>Is there a process for these teams to analyze data from simulations to identify potential security gaps or areas for improvement?</label>
                        <div>
                            <input type="radio" name="securityAnalysisProcess" value="Yes" checked={formData.securityAnalysisProcess === "Yes"} onChange={handleChange} /> Yes
                            <input type="radio" name="securityAnalysisProcess" value="No" checked={formData.securityAnalysisProcess === "No"} onChange={handleChange} /> No
                        </div>
                        <div>
                            <input type="text" name="securityAnalysisProcessComment" placeholder="Comments" value={formData.securityAnalysisProcessComment || ''} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-section">
                        <label>How does coordination with these teams enhance the overall effectiveness of the phishing simulation program?</label>
                        <textarea name="teamCoordination" value={formData.teamCoordination || ''} onChange={handleChange}></textarea>
                    </div>

                    <h2>4.3.1.1.1.7 Impact on Overall Security Posture:</h2>
                    <div className="form-section">
                        <label>How do simulated phishing campaigns contribute to the organization’s broader cybersecurity strategy?</label>
                        <textarea name="phishingImpactStrategy" value={formData.phishingImpactStrategy || ''} onChange={handleChange}></textarea>
                    </div>
                    <div className="form-section">
                        <label>Are there measures in place to assess the impact of these campaigns on reducing real-world phishing incidents?</label>
                        <div>
                            <input type="radio" name="impactAssessment" value="Yes" checked={formData.impactAssessment === "Yes"} onChange={handleChange} /> Yes
                            <input type="radio" name="impactAssessment" value="No" checked={formData.impactAssessment === "No"} onChange={handleChange} /> No
                        </div>
                        <div>
                            <input type="text" name="impactAssessmentComment" placeholder="Comments" value={formData.impactAssessmentComment || ''} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-section">
                        <label>How is the success of the phishing simulation program linked to other user awareness and cybersecurity initiatives within the organization?</label>
                        <textarea name="phishingProgramSuccess" value={formData.phishingProgramSuccess || ''} onChange={handleChange}></textarea>
                    </div>

                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
                    {imageUploadError && <p style={{ color: "red" }}>{imageUploadError}</p>}
                    <button type="submit">Submit</button>
                </form>
            </main>
        </div>
    );
}

export default SimulatedPhishingCampaignsPage;