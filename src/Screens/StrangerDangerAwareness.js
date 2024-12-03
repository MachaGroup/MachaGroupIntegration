import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function StangerDangerAwarenessFormPage() {
  const navigate = useNavigate();  // Initialize useNavigate hook for navigation
  const { buildingId } = useBuilding();
  const db = getFirestore();

  const [formData, setFormData] = useState();

  useEffect(() => {
    if(!buildingId) {
      alert('No builidng selected. Redirecting to Building Info...');
      navigate('BuildingandAddress');
    }
  }, [buildingId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle back button
  const handleBack = () => {
    navigate(-1);  // Navigates to the previous page
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(!buildingId) {
      alert('Building ID is missing. Please start the assessment from the correct page.');
      return;
    }

    try {
      // Create a document reference to the building in the 'Buildings' collection
      const buildingRef = doc(db, 'Buildings', buildingId);

      // Store the form data in the specified Firestore structure
      const formsRef = collection(db, 'forms/Personnel Training and Awareness/Stranger Danger Awareness');
      await addDoc(formsRef, {
        buildling: buildingRef,
        formData: formData,
      });
      console.log('From Data submitted successfully!')
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
            {/* Back Button */}
        <button className="back-button" onClick={handleBack}>←</button> {/* Back button at the top */}
            <h1>Stranger Danger Awareness Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 3.2.3.1.1 Stranger Danger Awareness */}
                <h2>Understanding of Stranger Danger:</h2>
                <div className="form-section">
                    <label>How are students educated about the concept of stranger danger, and what specific examples or scenarios are used to illustrate potential risks associated with interacting with unfamiliar individuals?</label>
                    <div>
                        <input type="text" name="strangerDangerEducation" placeholder="Describe how they're educated" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Can you describe the curriculum or instructional materials used to teach students about stranger danger, including any age-appropriate resources or activities designed to engage students in understanding and recognizing potential threats from strangers?</label>
                    <div>
                        <input type="text" name="strangerDangerCurriculum" placeholder="Describe the curriculum/materials" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there opportunities for students to engage in discussions or role-playing exercises that simulate real-world scenarios involving encounters with strangers, allowing them to apply their knowledge and critical thinking skills to assess and respond to different situations?</label>
                    <div>
                        <input type="radio" name="engageInRolePlayingScenarios" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="engageInRolePlayingScenarios" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <h2>Identification of Safe vs. Unsafe Situations:</h2>
                <div className="form-section">
                    <label>What strategies are incorporated into the curriculum to help students differentiate between safe and unsafe situations when interacting with strangers, and how are these concepts reinforced through ongoing discussions, activities, or practical exercises?</label>
                    <div>
                        <input type="text" name="strategiesForIdentifyingSafeVsUnsafe" placeholder="Describe the strategies" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are students encouraged to assess the context and circumstances of encounters with strangers, and what specific criteria or indicators are emphasized to help them evaluate the level of risk and determine appropriate actions to ensure their safety?</label>
                    <div>
                        <input type="text" name="encouragingRiskAssessment" placeholder="Describe how they're encouraged" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Can you provide examples of how students are empowered to assert their personal boundaries and make informed decisions about how to respond to offers, requests, or invitations from strangers that may pose potential risks to their safety or well-being?</label>
                    <div>
                        <input type="text" name="assertPersonalBoundariesExamples" placeholder="Give examples" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Assertiveness and Boundary Setting:</h2>
                <div className="form-section">
                    <label>What strategies or techniques are taught to students to help them assertively communicate their boundaries and preferences when interacting with strangers, and how are these skills reinforced through role-playing activities, peer discussions, or real-world scenarios?</label>
                    <div>
                        <input type="text" name="assertiveCommunicationStrategies" placeholder="Describe the strategies/techniques" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>How do educators and school staff support students in developing confidence and self-assurance to assertively decline unwanted advances or requests from strangers, and what resources or support systems are available to students who may require additional assistance or guidance in navigating challenging situations?</label>
                    <div>
                        <input type="text" name="supportingConfidenceInDecliningAdvances" placeholder="Describe how they develop confidence" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Can you describe how students are encouraged to advocate for their own safety and well-being by asserting control over their personal space, choices, and interactions with strangers, and how these principles are integrated into broader discussions about respect, consent, and healthy relationships?</label>
                    <div>
                        <input type="text" name="advocatingForSafetyAndWellBeing" placeholder="Describe how they're encourged" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Effective Communication and Reporting:</h2>
                <div className="form-section">
                    <label>What strategies are implemented to help students effectively communicate with trusted adults or authority figures about encounters with strangers, and how are these communication skills reinforced through practice, feedback, and reflection?</label>
                    <div>
                        <input type="text" name="effectiveCommunicationWithAdults" placeholder="Describe the strategies" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are students educated about the importance of reporting suspicious or concerning encounters with strangers to school staff or other trusted individuals, and what procedures are in place to ensure that such reports are taken seriously and addressed promptly?</label>
                    <div>
                        <input type="text" name="educationOnReportingSuspiciousEncounters" placeholder="Describe they're educated" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Can you provide examples of how students are encouraged to express their concerns or discomfort openly and honestly when discussing encounters with strangers, and how school staff respond to ensure that students feel supported, validated, and empowered to take appropriate action to protect themselves?</label>
                    <div>
                        <input type="text" name="encouragingOpenExpressionAndSupport" placeholder="Give examples" onChange={handleChange}/>  
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit">Submit</button>
            </form>
        </main>
    </div>
  )
}

export default StangerDangerAwarenessFormPage;