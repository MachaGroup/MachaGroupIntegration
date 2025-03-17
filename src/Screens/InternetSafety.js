import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function InternetSafetyFormPage() {
  const navigate = useNavigate();  // Initialize useNavigate hook for navigation
  const { buildingId } = useBuilding();
  const db = getFirestore();

  const [formData, setFormData] = useState();
  const storage = getStorage();
  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadError, setUploadError] = useState(null);


  useEffect(() => {
    if(!buildingId) {
      alert('No builidng selected. Redirecting to Building Info...');
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

  // Function to handle back button
  const handleBack = async () => {
      if (formData && buildingId) { // Check if formData and buildingId exist
        try {
          const buildingRef = doc(db, 'Buildings', buildingId);
          const formsRef = collection(db, 'forms/Personnel Training and Awareness/Internet Safety');
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
      const formsRef = collection(db, 'forms/Personnel Training and Awareness/Internet Safety');
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
            <h1>Internet Safety Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 3.2.3.1.2 Internet Safety */}
                <h2>Understanding of Online Risks:</h2>
                <div className="form-section">
                    <label>How are students educated about the potential risks and dangers associated with internet use, including exposure to inappropriate content, online predators, cyberbullying, identity theft, and phishing scams?</label>
                    <div>
                        <input type="text" name="internetSafetyEducation" placeholder="Describe how they're educated" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Can you describe the topics covered in the internet safety curriculum, such as privacy settings, safe browsing habits, recognizing and reporting online threats, and responsible social media use, and how these concepts are presented to students in an age-appropriate manner?</label>
                    <div>
                        <input type="text" name="internetSafetyCurriculumTopics" placeholder="Describe the topics" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Safe Online Practices:</h2>
                <div className="form-section">
                    <label>What strategies are taught to students to promote safe online practices, including the importance of creating strong, unique passwords, avoiding sharing personal information or photos with strangers, and being cautious when clicking on links or downloading files from unknown sources?</label>
                    <div>
                        <input type="text" name="strategiesForSafeOnlinePractices" placeholder="Describe the strategies" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are students encouraged to critically evaluate online information for accuracy, credibility, and potential biases, and what tools or resources are provided to help them fact-check sources, identify misinformation, and navigate digital media literacy challenges?</label>
                    <div>
                        <input type="text" name="encouragingCriticalEvaluationOnline" placeholder="Describe how they're encouraged" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Cyberbullying Prevention:</h2>
                <div className="form-section">
                    <label>How does the curriculum address the topic of cyberbullying, including defining what constitutes cyberbullying behavior, its impact on victims, and strategies for preventing and responding to cyberbullying incidents?</label>
                    <div>
                        <input type="text" name="cyberbullyingCurriculum" placeholder="Describe how it address the topic" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are students taught empathy, respect, and digital citizenship skills to foster positive online behavior and promote a culture of kindness, inclusivity, and accountability in digital spaces?</label>
                    <div>
                        <input type="radio" name="teachingEmpathyAndDigitalCitizenship" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="teachingEmpathyAndDigitalCitizenship" value="no" onChange={handleChange}/> No
                        <textarea className='comment-box' name="teachingEmpathyAndDigitalCitizenship" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>What support mechanisms are in place to assist students who experience cyberbullying, including reporting mechanisms, access to counseling or mental health services, and strategies for seeking help from trusted adults or peers?</label>
                    <div>
                        <input type="text" name="cyberbullyingSupportMechanisms" placeholder="Describe the mechanisms" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Parental Involvement and Guidance:</h2>
                <div className="form-section">
                    <label>How are parents or guardians involved in reinforcing internet safety lessons at home, and what resources or guidance materials are provided to support parents in discussing online safety topics with their children?</label>
                    <div>
                        <input type="text" name="parentalInvolvementInInternetSafety" placeholder="Describe how they're involved" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Can you describe any parent education events, workshops, or resources offered by the school to promote collaboration between educators and families in fostering a safe and responsible online environment for students?</label>
                    <div>
                        <input type="text" name="parentEducationEventsWorkshops" placeholder="Describe they events/workshops/resources" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>How does the school communicate with parents about internet safety initiatives, including updates on curriculum content, online tools and resources, and recommendations for monitoring and supervising children's online activities outside of school hours?</label>
                    <div>
                        <input type="text" name="communicationWithParentsOnInternetSafety" placeholder="Describe they events/workshops/resources" onChange={handleChange}/>  
                    </div>
                </div>

                {/* Submit Button */}
                <input type="file" accept="image/*" onChange={handleImageChange} />
{uploadProgress > 0 && <p>Upload Progress: {uploadProgress.toFixed(2)}%</p>}
{imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
{uploadError && <p style={{ color: "red" }}>{uploadError}</p>}
<button type="submit">Submit</button>
            </form>
        </main>
    </div>
  )
}

export default InternetSafetyFormPage;