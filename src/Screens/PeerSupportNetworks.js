import React, { useState, useEffect } from 'react';
import { getFirestore, collection, doc, getDoc, setDoc, } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";


function PeerSupportNetworksFormPage() {
    const navigate = useNavigate();
    const { buildingId } = useBuilding();
    const db = getFirestore();
    const functions = getFunctions();
    // Variable name and function name string already match the desired pattern
    const uploadImage = httpsCallable(functions, 'uploadPeerSupportNetworksFormPageImage');

    const [formData, setFormData] = useState({});
    const [imageData, setImageData] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);

    // Consistent Firestore path definition
    const formDocPath = 'forms/Personnel Training and Awareness/Peer Support Networks';

    useEffect(() => {
        if (!buildingId) {
            alert('No building selected. Redirecting to Building Info...');
            navigate('/BuildingandAddress'); // Adjust if route differs
            return;
        }

        const fetchFormData = async () => {
            setLoading(true);
            setLoadError(null);
            setImageUrl(null); // Reset image URL on load

            try {
                // Use direct doc path with buildingId
                const formDocRef = doc(db, formDocPath, buildingId);
                const docSnapshot = await getDoc(formDocRef);

                if (docSnapshot.exists()) {
                    const data = docSnapshot.data();
                    setFormData(data.formData || {});
                     // Load existing image URL
                    if (data.formData && data.formData.imageUrl) {
                       setImageUrl(data.formData.imageUrl);
                    }
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
    }, [buildingId, db, navigate, formDocPath]);

    // handleChange with auto-save
    const handleChange = async (e) => {
        const { name, value } = e.target;
        const newFormData = { ...formData, [name]: value };
        setFormData(newFormData);

        if (buildingId) {
            try {
                const buildingRef = doc(db, 'Buildings', buildingId);
                const formDocRef = doc(db, formDocPath, buildingId);
                // Persist current imageUrl along with other form data
                await setDoc(formDocRef, {
                     formData: { ...newFormData, building: buildingRef, imageUrl: imageUrl }
                     }, { merge: true });
                console.log("Form data auto-saved:", { ...newFormData, building: buildingRef, imageUrl: imageUrl });
            } catch (error) {
                console.error("Error auto-saving form data:", error);
                // Consider less intrusive error handling for auto-save
            }
        }
    };

    // handleImageChange using FileReader
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageData(reader.result);
                setImageUrl(null); // Clear existing final URL
                setImageUploadError(null);
            };
            reader.readAsDataURL(file);
        } else {
            setImageData(null);
        }
    };

    // handleBack simplified
    const handleBack = () => {
        navigate(-1);
    };

    // handleSubmit using httpsCallable and setDoc
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!buildingId) {
            alert('Building ID is missing. Please start from the Building Information page.');
            return;
        }

        let finalImageUrl = imageUrl; // Start with current URL

        // Upload new image if present
        if (imageData) {
            setLoading(true);
            setImageUploadError(null);
            try {
                // Pass necessary identifiers if Cloud Function needs them
                const uploadResult = await uploadImage({ imageData: imageData, buildingId: buildingId, formType: 'PeerSupportNetworks' });
                finalImageUrl = uploadResult.data.imageUrl;
                setImageUrl(finalImageUrl); // Update state with the confirmed URL
                console.log('Image uploaded successfully:', finalImageUrl);
            } catch (error) {
                console.error('Error uploading image:', error);
                setImageUploadError(`Image upload failed: ${error.message}. Please try again.`);
                setLoading(false);
                return; // Prevent form submission if image upload fails
            } finally {
                 setLoading(false);
            }
        }

        // Save final form data
        try {
            setLoading(true);
            const buildingRef = doc(db, 'Buildings', buildingId);
            const formDocRef = doc(db, formDocPath, buildingId);
            // Ensure the final data includes the correct image URL
            const finalFormData = { ...formData, imageUrl: finalImageUrl, building: buildingRef };
            await setDoc(formDocRef, { formData: finalFormData }, { merge: true });

            console.log('Form data submitted successfully!');
            alert('Form submitted successfully!');
            navigate('/Form'); // Navigate on success
        } catch (error) {
            console.error("Error submitting final form data:", error);
            alert("Failed to submit form. Please check your connection and try again.");
            setLoading(false); // Stop loading indicator on error
        }
    };

    // Conditional Loading/Error display
    if (loading && !Object.keys(formData).length) {
        return <div>Loading...</div>;
    }

    if (loadError) {
        return <div>Error: {loadError}</div>;
    }

    // Consolidate all questions into one array
    const questions = [
        // Training and Structure
        { name: "membersSelectedTrained", label: "Are peer support network members selected or trained appropriately to ensure necessary skills/knowledge?" },
        { name: "ongoingSupportMechanisms", label: "Are ongoing support or supervision mechanisms in place for peer supporters?" },
        { name: "networkStructureFacilitates", label: "Is the network structure designed to facilitate effective communication, collaboration, and coordination?" },
        { name: "confidentialityProtocolsEstablished", label: "Are established protocols/guidelines followed for confidentiality and respectful interactions?" },
        { name: "integratedWithSchoolPrograms", label: "Are peer support activities integrated with existing school mental health/well-being programs?" },
        // Accessibility and Outreach
        { name: "networkAwarenessPromoted", label: "Are efforts made to promote awareness and accessibility of the peer support network?" },
        { name: "accessBarriersAddressed", label: "Are barriers to accessing peer support addressed, especially for reluctant/challenged students?" },
        { name: "inclusivityStrategiesInPlace", label: "Are strategies in place to ensure services are inclusive and reach diverse students?" },
        { name: "feedbackUsedForEvaluation", label: "Is student feedback used to evaluate accessibility/effectiveness, leading to adjustments?" },
        { name: "partnershipsEnhanceReach", label: "Are there partnerships with other organizations to enhance visibility and reach?" },
        // Training and Skill Development
        { name: "specificTrainingProvided", label: "Are specific training/skill development opportunities provided to peer supporters?" },
        { name: "trainingTailoredToNeeds", label: "Is training tailored to address unique peer supporter needs (e.g., active listening, empathy, boundaries)?" },
        { name: "ongoingTrainingAvailable", label: "Are opportunities available for ongoing training or professional development for peer supporters?" },
        { name: "trainingEffectivenessAssessed", label: "Is the effectiveness of training assessed, with feedback incorporated into future initiatives?" },
        { name: "contributionsRecognized", label: "Are provisions made for recognizing/rewarding peer supporter contributions (e.g., certificates, leadership opps)?" },
        // Peer Support Activities and Services
        { name: "servicesTailoredToNeeds", label: "Are the types of support services/activities offered tailored to meet diverse student needs?" },
        { name: "activitiesPromoteInclusivity", label: "Are peer support activities structured to promote inclusivity, diversity, and cultural competence?" },
        { name: "proactiveOutreachExists", label: "Are there opportunities for proactive outreach to connect with students who may benefit but not seek help?" },
        { name: "servicesAlignedWithSchoolGoals", label: "Are peer support services aligned with broader school goals (mental health, bullying prevention, well-being)?" },
        { name: "impactEvaluationMechanisms", label: "Are mechanisms in place to evaluate the impact/effectiveness of activities (e.g., feedback, tracking outcomes)?" },
        // Collaboration and Referral Networks
        { name: "collaborationWithSchoolServices", label: "Does the network collaborate with other school support services (counseling, health) for coordinated care?" },
        { name: "referralProtocolsInPlace", label: "Are protocols in place for referring students beyond the scope of peer support when needed?" },
        { name: "externalPartnershipsExist", label: "Are there established partnerships/referral networks with external organizations?" },
        { name: "communicationChannelsMaintained", label: "Are communication channels maintained between peer supporters and other providers for continuity?" },
        { name: "referralTrackingExists", label: "Are mechanisms in place for tracking/monitoring referrals to ensure follow-up?" },
        // Evaluation and Continuous Improvement
        { name: "effectivenessEvaluatedMetrics", label: "Is the network's effectiveness evaluated using specific metrics/indicators?" },
        { name: "feedbackCollectedFromAll", label: "Is feedback collected from both peer supporters and recipients regarding experiences/satisfaction?" },
        { name: "findingsUsedForImprovement", label: "Are evaluation findings used to identify improvement areas and implement changes?" },
        { name: "ongoingResearchOpportunities", label: "Are there opportunities for ongoing research/evaluation to explore outcomes?" },
        { name: "networkIntegratedSustainability", label: "Is the network integrated into broader school efforts with strategies for long-term sustainability?" },
    ];


    return (
        <div className="form-page">
            <header className="header">
                <Navbar />
                <button className="back-button" onClick={handleBack}>←</button>
                <h1>Peer Support Networks Assessment</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="form-container">
                <form onSubmit={handleSubmit}>
                    {/* Single heading for the form */}
                    <h2>Peer Support Networks Questions</h2>
                    {questions.map((question, index) => (
                        // Standard question block rendering
                        <div key={index} className="form-section">
                            <label>{question.label}</label>
                            <div>
                                <input
                                    type="radio"
                                    name={question.name}
                                    value="yes"
                                    checked={formData[question.name] === "yes"}
                                    onChange={handleChange}
                                /> Yes
                                <input
                                    type="radio"
                                    name={question.name}
                                    value="no"
                                    checked={formData[question.name] === "no"}
                                    onChange={handleChange}
                                /> No
                            </div>
                            <input
                                type="text"
                                name={`${question.name}Comment`}
                                placeholder="Additional comments"
                                value={formData[`${question.name}Comment`] || ''}
                                onChange={handleChange}
                                className="comment-box" // Standard class for comments
                            />
                        </div>
                    ))}

                    {/* Image Upload Section */}
                    <div className="form-section">
                        <label>Upload Supporting Image (Optional):</label>
                        <input type="file" onChange={handleImageChange} accept="image/*" />
                         {/* Display logic for existing or preview image */}
                         {imageUrl && !imageData && <img src={imageUrl} alt="Current" style={{maxWidth: '200px', marginTop: '10px'}}/>}
                         {imageData && <img src={imageData} alt="Preview" style={{maxWidth: '200px', marginTop: '10px'}}/>}
                        {imageUploadError && <p style={{ color: 'red' }}>{imageUploadError}</p>}
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
            </main>
        </div>
    );
}

export default PeerSupportNetworksFormPage;