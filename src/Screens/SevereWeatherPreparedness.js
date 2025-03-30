import React, { useState, useEffect } from 'react';
import { getFirestore, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
import { getFunctions, httpsCallable } from "firebase/functions";

function SevereWeatherPreparednessFormPage() {
  const navigate = useNavigate();
  const { buildingId } = useBuilding();
  const db = getFirestore();
  const functions = getFunctions();
  const uploadImage = httpsCallable(functions, 'uploadSevereWeatherPreparednessImage');


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
        setLoadError(null); // Clear previous errors

        try {
            const formDocRef = doc(db, 'forms','Personnel Training and Awareness','Severe Weather Preparedness', buildingId);
            const docSnapshot = await getDoc(formDocRef);

            if (docSnapshot.exists()) {
                setFormData(docSnapshot.data().formData || {});
            } else {
                setFormData({}); // Initialize if document doesn't exist
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
        const formDocRef = doc(db, 'forms','Personnel Training and Awareness','Severe Weather Preparedness', buildingId);
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
    navigate(-1); // Just navigate back
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
        const formDocRef = doc(db, 'forms','Personnel Training and Awareness','Severe Weather Preparedness', buildingId);
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
          <h1>Severe Weather Preparedness Assessment</h1>
          <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
          <form onSubmit={handleSubmit}>
              <h2>Understanding of Severe Weather Risks:</h2>
              {[
                  { name: "weatherEducation", label: "How are students educated about the potential risks associated with severe weather events such as tornadoes, hurricanes, thunderstorms, or floods, including the specific threats posed to their geographic location and the school environment?" },
                  { name: "weatherWarningSigns", label: "Are students taught to recognize the warning signs of impending severe weather conditions, such as changes in sky color, cloud formations, temperature, or wind patterns, and to take proactive measures to stay informed and prepared for possible emergencies?" },
                  { name: "weatherAlertProcedures", label: "What procedures are in place to promptly disseminate severe weather alerts and advisories to students and staff, utilizing multiple communication channels such as public address systems, digital displays, mobile alerts, or weather radios to ensure widespread awareness and timely response?" },
                  { name: "weatherResponseTraining", label: "How are students trained to respond to severe weather alerts, including the importance of seeking shelter in designated safe areas, moving away from windows or glass doors, and assuming protective positions to minimize exposure to flying debris or potential hazards?" },
                  { name: "shelteringProtocols", label: "Are students familiarized with the specific sheltering and safety protocols associated with different types of severe weather events, such as tornado safety procedures involving seeking shelter in interior rooms or reinforced areas on lower levels of the building, away from exterior walls, doors, and windows?" },
                  { name: "weatherInstructions", label: "How are students instructed on the appropriate actions to take during severe weather events, including how to crouch low, cover their heads, and protect themselves from falling or flying objects while sheltering in place until the threat has passed or further instructions are provided?" },
                  { name: "evacuationPlans", label: "What plans are in place for evacuating students and staff from outdoor areas, temporary structures, or portable classrooms in anticipation of severe weather threats, ensuring that all individuals are directed to safe, predetermined assembly points or designated storm shelters in a prompt and orderly manner?" },
                  { name: "evacuationTraining", label: "How are students trained to navigate evacuation routes, avoid potential hazards such as downed power lines or flooded areas, and follow instructions from designated personnel or emergency responders to facilitate a safe and efficient evacuation process?" },
                  { name: "postEventEvaluation", label: "Are students given the opportunity to participate in post-event evaluations or debriefing sessions following severe weather incidents, allowing them to share their observations, experiences, and feedback on the effectiveness of sheltering procedures, communication protocols, and staff response efforts?" },
                  { name: "studentInput", label: "How are student perspectives and insights from severe weather drills and real-world events used to inform ongoing safety planning, infrastructure improvements, or emergency preparedness initiatives aimed at enhancing the school's resilience and response capabilities to future severe weather events?" },
                  { name: "concernsAddressed", label: "What measures are taken to address any concerns, questions, or misconceptions raised by students during post-event debriefings, ensuring that all participants feel supported, informed, and prepared to respond confidently in the event of future severe weather emergencies?" }
              ].map((question, index) => (
                  <div key={index} className="form-section">
                      <label>{question.label}</label>
                      <div>
                          {question.name === "weatherWarningSigns" || question.name === "shelteringProtocols" || question.name === "postEventEvaluation" ? (
                              <><>
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

                              </><div>
                                      <input
                                          type="text"
                                          name={`${question.name}Comment`}
                                          placeholder="Comments"
                                          value={formData[`${question.name}Comment`] || ''}
                                          onChange={handleChange} />
                                  </div></>
                              
                          ) : (
                            
                              <input
                                  type="text"
                                  name={question.name}
                                  value={formData[question.name] || ''}
                                  onChange={handleChange}
                              />
                          )}
                      </div>
                      
                  </div>
              ))}
              <input type="file" onChange={handleImageChange} accept="image/*" />
              {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
              {imageUploadError && <p style={{ color: 'red' }}>{imageUploadError}</p>}
              <button type="submit">Submit</button>
          </form>
      </main>
  </div>
);
}

export default SevereWeatherPreparednessFormPage;