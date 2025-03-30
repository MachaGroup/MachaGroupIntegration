import React, { useState, useEffect, useCallback } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import debounce from 'lodash.debounce'; // Import debounce function

function SIEMSolutionsPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const storage = getStorage();

    const [formData, setFormData] = useState({});
    const [image, setImage] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [imageUrl, setImageUrl] = useState(null);
    const [uploadError, setUploadError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);
    const [saveError, setSaveError] = useState(null);


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
                const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Security Information and Event Management', buildingId);
                const docSnapshot = await getDoc(formDocRef);

                if (docSnapshot.exists()) {
                    const data = docSnapshot.data();
                    setFormData(data.formData || {});
                    setImageUrl(data.imageUrl || null);
                    console.log("Data loaded:", data);
                } else {
                    setFormData({});
                    console.log("No data found for this building.");
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


    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        let newValue = value;
        if (type === 'radio') {
            newValue = checked ? value : '';
        }

        // Update the local state *immediately*
        setFormData(prevFormData => ({ ...prevFormData, [name]: newValue }));

        // Call the debounced save function
        debouncedSaveFormData({ ...formData, [name]: newValue }, imageUrl);
    };


    const saveFormData = async (updatedFormData, currentImageUrl) => {
        try {
            const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Security Information and Event Management', buildingId);
            await setDoc(formDocRef, { formData: updatedFormData, imageUrl: currentImageUrl, updatedAt: serverTimestamp() }, { merge: true });
            setSaveError(null);
            console.log("Form data saved:", updatedFormData);
        } catch (error) {
            console.error("Error saving form data:", error);
            setSaveError("Failed to save form data. Please try again.");
        }
    };


    // Create a debounced version of the save function
    const debouncedSaveFormData = useCallback(debounce(saveFormData, 500), []);

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            const imageFile = e.target.files[0];
            setImage(imageFile);
            uploadImageToFirebase(imageFile);
        }
    };

    const uploadImageToFirebase = async (imageFile) => {
        const storageRef = ref(storage, `images/${imageFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(progress);
                console.log('Upload is ' + progress + '% done');
            },
            (error) => {
                console.error("Error uploading image:", error);
                setUploadError("Failed to upload image. Please try again.");
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setImageUrl(downloadURL);
                    handleInputChange({ target: { name: 'imageUrl', value: downloadURL } });
                });
            }
        );
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
            const formDocRef = doc(db, 'forms', 'Cybersecurity', 'Security Information and Event Management', buildingId);
            await setDoc(formDocRef, { formData: formData, imageUrl: imageUrl, updatedAt: serverTimestamp() }, { merge: true });
            console.log('Form data submitted successfully!');
            alert('Form submitted successfully!');
            navigate('/Form');
        } catch (error) {
            console.error("Error saving form data:", error);
            alert("Failed to submit form data. Please try again.");
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (loadError) {
        return <div>Error: {loadError}</div>;
    }

    if (saveError) {
        return <div>Error: {saveError}</div>;
    }

    return (
        <div className="form-page">
            <header className="header">
                <Navbar />
                <button className="back-button" onClick={handleBack}>←</button>
                <h1>Security Information and Event Management (SIEM) Solutions</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    {/* Deployment and Integration */}
                    <h2>Deployment and Integration:</h2>
                    <div className="form-section">
                        <label>How is the SIEM solution integrated with other security systems and tools within the organization (e.g., firewalls, intrusion detection systems)?</label>
                        <textarea name="siemIntegration" value={formData.siemIntegration || ''} onChange={handleInputChange} />
                    </div>
                    <div className="form-section">
                        <label>What is the scope of the SIEM deployment, and does it cover all critical systems, applications, and network segments?</label>
                        <textarea name="siemScope" value={formData.siemScope || ''} onChange={handleInputChange} />
                    </div>
                    <div className="form-section">
                        <label>Are there any gaps in coverage or areas where SIEM integration is lacking?</label>
                        <div>
                            <input type="radio" name="siemCoverageGaps" value="Yes" checked={formData.siemCoverageGaps === "Yes"} onChange={handleInputChange} /> Yes
                            <input type="radio" name="siemCoverageGaps" value="No" checked={formData.siemCoverageGaps === "No"} onChange={handleInputChange} /> No
                        </div>
                        <input type="text" name="siemCoverageGapComment" placeholder="Comments" value={formData.siemCoverageGapComment || ''} onChange={handleInputChange} />
                    </div>

                    {/* Event Collection and Correlation */}
                    <h2>Event Collection and Correlation:</h2>
                    <div className="form-section">
                        <label>What types of security events and logs are collected by the SIEM solution (e.g., network traffic, system logs, application logs)?</label>
                        <textarea name="eventLogs" value={formData.eventLogs || ''} onChange={handleInputChange} />
                    </div>
                    <div className="form-section">
                        <label>How does the SIEM solution correlate events from different sources to identify potential security incidents or threats?</label>
                        <textarea name="eventCorrelation" value={formData.eventCorrelation || ''} onChange={handleInputChange} />
                    </div>
                    <div className="form-section">
                        <label>Are there specific rules or algorithms used to prioritize and filter events based on their severity or relevance?</label>
                        <textarea name="eventPrioritizationRules" value={formData.eventPrioritizationRules || ''} onChange={handleInputChange} />
                    </div>

                    {/* Real-time Monitoring and Alerts */}
                    <h2>Real-time Monitoring and Alerts:</h2>
                    <div className="form-section">
                        <label>Does the SIEM solution provide real-time monitoring and alerting capabilities for detected security events and incidents?</label>
                        <div>
                            <input type="radio" name="realTimeMonitoring" value="Yes" checked={formData.realTimeMonitoring === "Yes"} onChange={handleInputChange} /> Yes
                            <input type="radio" name="realTimeMonitoring" value="No" checked={formData.realTimeMonitoring === "No"} onChange={handleInputChange} /> No
                        </div>
                        <input type="text" name="realTimeMonitoringComment" placeholder="Comments" value={formData.realTimeMonitoringComment || ''} onChange={handleInputChange} />
                    </div>
                    <div className="form-section">
                        <label>How are alerts configured and managed to minimize false positives and ensure timely detection of genuine threats?</label>
                        <textarea name="alertConfiguration" value={formData.alertConfiguration || ''} onChange={handleInputChange} />
                    </div>
                    <div className="form-section">
                        <label>What is the process for responding to and investigating alerts generated by the SIEM solution?</label>
                        <textarea name="alertInvestigation" value={formData.alertInvestigation || ''} onChange={handleInputChange} />
                    </div>

                    {/* Incident Detection and Response */}
                    <h2>Incident Detection and Response:</h2>
                    <div className="form-section">
                        <label>How effective is the SIEM solution in detecting and identifying various types of security incidents (e.g., malware infections, unauthorized access)?</label>
                        <textarea name="incidentDetectionEffectiveness" value={formData.incidentDetectionEffectiveness || ''} onChange={handleInputChange} />
                    </div>
                    <div className="form-section">
                        <label>Are there predefined incident response procedures and workflows integrated with the SIEM solution to guide the response to detected incidents?</label>
                        <div>
                            <input type="radio" name="incidentWorkflowsIntegrated" value="Yes" checked={formData.incidentWorkflowsIntegrated === "Yes"} onChange={handleInputChange} /> Yes
                            <input type="radio" name="incidentWorkflowsIntegrated" value="No" checked={formData.incidentWorkflowsIntegrated === "No"} onChange={handleInputChange} /> No
                        </div>
                        <input type="text" name="incidentWorkflowsIntegratedComment" placeholder="Comments" value={formData.incidentWorkflowsIntegratedComment || ''} onChange={handleInputChange} />
                    </div>
                    <div className="form-section">
                        <label>How is the effectiveness of incident detection and response measured and evaluated?</label>
                        <textarea name="incidentResponseEffectiveness" value={formData.incidentResponseEffectiveness || ''} onChange={handleInputChange} />
                    </div>

                    {/* Data Storage and Retention */}
                    <h2>Data Storage and Retention:</h2>
                    <div className="form-section">
                        <label>What is the policy for data storage and retention within the SIEM solution, including the duration for retaining logs and security events?</label>
                        <textarea name="dataRetentionPolicy" value={formData.dataRetentionPolicy || ''} onChange={handleInputChange} />
                    </div>
                    <div className="form-section">
                        <label>How is the integrity and confidentiality of stored data maintained to prevent unauthorized access or tampering?</label>
                        <textarea name="dataIntegrityMaintenance" value={formData.dataIntegrityMaintenance || ''} onChange={handleInputChange} />
                    </div>
                    <div className="form-section">
                        <label>Are there processes in place for securely archiving or deleting outdated or obsolete data?</label>
                        <div>
                            <input type="radio" name="dataArchivingProcess" value="Yes" checked={formData.dataArchivingProcess === "Yes"} onChange={handleInputChange} /> Yes
                            <input type="radio" name="dataArchivingProcess" value="No" checked={formData.dataArchivingProcess === "No"} onChange={handleInputChange} /> No
                        </div>
                        <input type="text" name="dataArchivingProcessComment" placeholder="Comments" value={formData.dataArchivingProcessComment || ''} onChange={handleInputChange} />
                    </div>

                    {/* Reporting and Analysis */}
                    <h2>Reporting and Analysis:</h2>
                    <div className="form-section">
                        <label>What types of reports and dashboards are available through the SIEM solution, and how are they used for security analysis and decision-making?</label>
                        <textarea name="siemReports" value={formData.siemReports || ''} onChange={handleInputChange} />
                    </div>
                    <div className="form-section">
                        <label>How often are reports generated, and are they reviewed by security personnel or management to assess the overall security posture?</label>
                        <textarea name="reportFrequency" value={formData.reportFrequency || ''} onChange={handleInputChange} />
                    </div>
                    <div className="form-section">
                        <label>Are there capabilities for customizing reports and analysis to address specific security concerns or requirements?</label>
                        <textarea name="customReports" value={formData.customReports || ''} onChange={handleInputChange} />
                    </div>

                    {/* Maintenance and Improvement */}
                    <h2>Maintenance and Improvement</h2>
                    <div className="form-section">
                        <label>What is the process for maintaining and updating the SIEM solution, including applying patches, updates, and new threat intelligence feeds?</label>
                        <textarea name="siemMaintenance" value={formData.siemMaintenance || ''} onChange={handleInputChange} />
                    </div>
                    <div className="form-section">
                        <label>How is the SIEM solution evaluated for effectiveness, and are there regular assessments or audits to ensure its continued relevance and performance?</label>
                        <textarea name="siemEffectivenessAudit" value={formData.siemEffectivenessAudit || ''} onChange={handleInputChange} />
                    </div>
                    <div className="form-section">
                        <label>Are there plans for upgrading or expanding the SIEM solution to enhance its capabilities or address emerging security threats?</label>
                        <div>
                            <input type="radio" name="siemUpgradePlans" value="Yes" checked={formData.siemUpgradePlans === "Yes"} onChange={handleInputChange} /> Yes
                            <input type="radio" name="siemUpgradePlans" value="No" checked={formData.siemUpgradePlans === "No"} onChange={handleInputChange} /> No
                        </div>
                        <input type="text" name="siemUpgradePlansComment" placeholder="Comments" value={formData.siemUpgradePlansComment || ''} onChange={handleInputChange} />
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

export default SIEMSolutionsPage;
