import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getFunctions, httpsCallable } from "firebase/functions";
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function VerbalBullyingFormPage() {
  const navigate = useNavigate();
  const { buildingId } = useBuilding();
  const db = getFirestore();
  const functions = getFunctions();
  const uploadImage = httpsCallable(functions, 'uploadVerbalBullyingImage');

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
        const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Verbal Bullying', buildingId);
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
      const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Verbal Bullying', buildingId);
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
      const formDocRef = doc(db, 'forms', 'Personnel Training and Awareness', 'Verbal Bullying', buildingId);
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
        <h1>Verbal Bullying Assessment</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>Verbal Bullying</h2>
          {[
            { name: "recognizeBullying", label: "How do students learn to recognize verbal bullying behaviors, such as name-calling, teasing, or derogatory remarks, and understand the negative impact these behaviors can have on individuals' well-being and sense of belonging?" },
            { name: "interactionTypes", label: "Can you describe the curriculum or educational activities used to help students differentiate between playful banter and hurtful verbal interactions, and how students are empowered to advocate for themselves and others when faced with verbal bullying situations?" },
            { name: "fosteringEmpathy", label: "What strategies are employed to foster empathy and perspective-taking among students, helping them understand the emotional impact of their words on others and develop respectful communication skills in their interactions?" },
            { name: "bullyingIndicators", label: "What signs or indicators of verbal bullying are emphasized in the curriculum to help students identify when someone is being targeted or marginalized through verbal harassment, intimidation, or exclusion?" },
            { name: "emotionalSupport", label: "How are students encouraged to recognize and validate their own feelings and experiences when subjected to verbal bullying, and what supportive strategies or coping mechanisms are taught to help them navigate and respond to these situations effectively?" },
            { name: "reportingSystems", label: "Are there specific reporting mechanisms or support systems in place for students to confidentially report incidents of verbal bullying, and how is confidentiality ensured while addressing these concerns?" },
            { name: "bullyingImpact", label: "How does the curriculum address the emotional, psychological, and social consequences of verbal bullying on both victims and perpetrators, including feelings of shame, fear, isolation, and low self-esteem?" },
            { name: "bystanderRole", label: "Are students educated about the broader impact of verbal bullying on school climate and community cohesion, and how positive bystander intervention and collective action can help mitigate the prevalence and harmful effects of verbal harassment?" },
            { name: "supportMeasures", label: "What measures are taken to provide support and intervention for students affected by verbal bullying, including access to counseling services, peer support groups, or restorative justice practices to address underlying conflicts and promote healing and reconciliation?" },
            { name: "conflictSkills", label: "What communication skills and conflict resolution strategies are taught to students to address verbal conflicts and disagreements constructively, de-escalate tense situations, and resolve interpersonal conflicts without resorting to hurtful or demeaning language?" },
            { name: "assertiveCommunication", label: "How are students empowered to assertively communicate their boundaries and expectations in verbal interactions, express their feelings and concerns assertively, and seek support from trusted adults or peers when faced with verbal bullying incidents?" },
            { name: "roleplayPractice", label: "Are there opportunities for students to role-play or practice assertive communication techniques and conflict resolution strategies in simulated scenarios, helping them build confidence and resilience in handling verbal bullying situations?" },
            { name: "inclusiveCulture", label: "What proactive measures are taken to foster a culture of respect, empathy, and inclusivity within the school community, where differences are celebrated, and individuals feel valued, accepted, and supported regardless of their background, identity, or perceived vulnerabilities?" },
            { name: "kindnessCampaigns", label: "Can you describe any school-wide initiatives, programs, or campaigns aimed at promoting kindness, empathy, and positive peer relationships, and how these efforts contribute to preventing and addressing verbal bullying behaviors effectively?" },
            { name: "studentInvolvement", label: "How are students involved in the development and implementation of anti-bullying policies and initiatives, fostering a sense of ownership and collective responsibility for creating a safe and inclusive school environment?" },
            { name: "parentEngagement", label: "How are parents or guardians engaged as partners in bullying prevention efforts, including opportunities for parent education, workshops, or discussions on recognizing and addressing verbal bullying behaviors?" },
            { name: "parentResources", label: "Are parents provided with resources, guidance, and strategies for supporting their children who may be experiencing or witnessing verbal bullying, including communication tips, conflict resolution techniques, and referrals to community support services?" },
            { name: "parentCommunication", label: "What communication channels are utilized to keep parents informed about school-wide anti-bullying initiatives, updates on curriculum content, and resources available for addressing verbal bullying concerns at home and in the community?" },
            { name: "strategyEvaluation", label: "How is the effectiveness of bullying prevention strategies, including interventions targeting verbal bullying, regularly assessed and evaluated, and what data or metrics are used to measure progress and identify areas for improvement?" },
            { name: "feedbackMechanisms", label: "Are there mechanisms in place for gathering feedback from students, parents, and staff about their perceptions of the school's response to verbal bullying incidents, the accessibility of support services, and the overall effectiveness of anti-bullying initiatives?" },
            { name: "feedbackUse", label: "How are findings from assessments and feedback collected used to inform decision-making, adjust intervention strategies, and allocate resources to ensure ongoing improvement in preventing and addressing verbal bullying within the school community?" },
          ].map((question, index) => (
            <div key={index} className="form-section">
              <label>{question.label}</label>
              {question.name === "bystanderRole" || question.name === "roleplayPractice" ? (
                <><div>
                          <input
                              type="radio"
                              name={question.name}
                              value="yes"
                              checked={formData[question.name] === "yes"}
                              onChange={handleChange} /> Yes
                          <input
                              type="radio"
                              name={question.name}
                              value="no"
                              checked={formData[question.name] === "no"}
                              onChange={handleChange} /> No

                      </div><input
                              type="text"
                              name={`${question.name}Comment`}
                              placeholder="Comments"
                              value={formData[`${question.name}Comment`] || ''}
                              onChange={handleChange} /></>
              ) : (
                <textarea
                  name={question.name}
                  value={formData[question.name] || ''}
                  onChange={handleChange}
                  placeholder={question.label}
                />
              )}
            </div>
          ))}
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
          {imageUploadError && <p style={{ color: "red" }}>{imageUploadError}</p>}
          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}

export default VerbalBullyingFormPage;