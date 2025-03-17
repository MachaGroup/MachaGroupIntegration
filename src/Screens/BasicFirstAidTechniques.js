import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; 
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function BasicFirstAidTechniquesFormPage() {
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
          navigate('/BuildingandAddress');
      }
  }, [buildingId, navigate]);

  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
          ...prevData,
          [name]: value,
      }));
  };

  const handleImageChange = (e) => {
      if (e.target.files[0]) {
          setImage(e.target.files[0]);
      }
  };

  const handleBack = async () => {
      if (formData && buildingId) {
          try {
              const buildingRef = doc(db, 'Buildings', buildingId);
              const formsRef = collection(db, 'forms/Personnel Training and Awareness/Basic First Aid Techniques');
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
          const formsRef = collection(db, 'forms/Personnel Training and Awareness/Basic First Aid Techniques');

          if (image) {
              if (!image.type.match('image/*')) {
                  setUploadError('Please select a valid image file (jpg, jpeg, png, etc.)');
                  return;
              }
              if (image.size > 5 * 1024 * 1024) {
                  setUploadError('Image file too large (Max 5MB)');
                  return;
              }

              const storageRef = ref(storage, `firstAid_images/${Date.now()}_${image.name}`);
              const uploadTask = uploadBytesResumable(storageRef, image);

              uploadTask.on('state_changed',
                  (snapshot) => {
                      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                      setUploadProgress(progress);
                  },
                  (error) => {
                      setUploadError(error);
                  },
                  async () => {
                      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                      setImageUrl(downloadURL);
                      setFormData({ ...formData, imageUrl: downloadURL });
                      setUploadError(null);
                  }
              );
          }

          await addDoc(formsRef, {
              building: buildingRef,
              formData: formData,
          });
          console.log('Form Data submitted successfully!');
          alert('Form submitted successfully!');
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
              <h1>Basic First Aid Techniques</h1>
              <img src={logo} alt="Logo" className="logo" />
          </header>
          <main className="form-container">
              <form onSubmit={handleSubmit}>
                  <div className="form-section">
                      <label>How comprehensively are basic first aid techniques covered in staff training programs?</label>
                      <input type="text" name="first-aid-comprehensiveness" placeholder="Describe..." onChange={handleChange} />
                  </div>
                  <div className="form-section">
    <label>Are training modules structured to provide a balance of theoretical knowledge, practical skills demonstrations, and hands-on practice sessions?</label>
    <div>
      <input type="radio" name="training-modules-structure" value="yes" onChange={handleChange} /> Yes
      <input type="radio" name="training-modules-structure" value="no" onChange={handleChange} /> No
      <textarea className='comment-box' name="training-modules-structureComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
    </div>
  </div>

  <div className="form-section">
    <label>To what extent do training materials and resources address the application of basic first aid techniques in various emergency scenarios encountered in the school environment?</label>
    <div>
      <input type="text" name="first-aid-materials-coverage" placeholder="Describe how it addresses the techniques" onChange={handleChange} />
    </div>
  </div>

  <div className="form-section">
    <label>Are staff members trained to recognize common signs and symptoms of medical emergencies and injuries that may require immediate first aid intervention?</label>
    <div>
      <input type="radio" name="emergency-recognition-training" value="yes" onChange={handleChange} /> Yes
      <input type="radio" name="emergency-recognition-training" value="no" onChange={handleChange} /> No
      <textarea className='comment-box' name="emergency-recognition-trainingComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
    </div>
  </div>

  <div className="form-section">
    <label>How are staff members assessed or evaluated to ensure proficiency in applying basic first aid techniques in simulated or real-life emergency situations?</label>
    <div>
      <input type="text" name="first-aid-proficiency-assessment" placeholder="Describe how they're assessed/evaluated" onChange={handleChange} />
    </div>
  </div>

  <h2>3.1.1.2.5.2 Hands-on Skills Practice:</h2>
  <div className="form-section">
    <label>What opportunities are provided for staff members to practice and demonstrate basic first aid techniques in simulated scenarios, role-playing exercises, or skills stations?</label>
    <div>
      <input type="text" name="skills-practice-opportunities" placeholder="Describe the opportunities" onChange={handleChange} />
    </div>
  </div>

  <div className="form-section">
    <label>Are hands-on practice sessions conducted using realistic training props, medical manikins, or simulated casualties to simulate various injury types and emergency scenarios?</label>
    <div>
      <input type="radio" name="hands-on-props-usage" value="yes" onChange={handleChange} /> Yes
      <input type="radio" name="hands-on-props-usage" value="no" onChange={handleChange} /> No
      <textarea className='comment-box' name="hands-on-props-usageComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
    </div>
  </div>

  <div className="form-section">
    <label>How are staff members guided and supported by certified instructors, facilitators, or subject matter experts during hands-on skills practice sessions?</label>
    <div>
      <input type="text" name="instructor-guidance" placeholder="Describe how they're guided/supported" onChange={handleChange} />
    </div>
  </div>

  <div className="form-section">
    <label>Are staff members encouraged to actively participate in skills practice activities and receive constructive feedback on their performance?</label>
    <div>
      <input type="radio" name="skills-feedback" value="yes" onChange={handleChange} /> Yes
      <input type="radio" name="skills-feedback" value="no" onChange={handleChange} /> No
      <textarea className='comment-box' name="skills-feedbackComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
    </div>
  </div>

  <div className="form-section">
    <label>What mechanisms are in place to reinforce learning and encourage ongoing skills development beyond initial training sessions?</label>
    <div>
      <input type="text" name="learning-reinforcement-mechanisms" placeholder="Describe the mechanisms" onChange={handleChange} />
    </div>
  </div>

  <h2>3.1.1.2.5.3 Integration with Emergency Response Plans:</h2>
  <div className="form-section">
    <label>How are basic first aid techniques integrated into broader emergency response plans, procedures, and protocols?</label>
    <div>
      <input type="text" name="first-aid-integration" placeholder="Describe how they're integrated" onChange={handleChange} />
    </div>
  </div>

  <div className="form-section">
    <label>Are staff members trained to recognize and prioritize life-threatening conditions and administer basic first aid interventions in accordance with established protocols and medical guidelines?</label>
    <div>
      <input type="radio" name="life-threatening-priority-training" value="yes" onChange={handleChange} /> Yes
      <input type="radio" name="life-threatening-priority-training" value="no" onChange={handleChange} /> No
      <textarea className='comment-box' name="life-threatening-priority-trainingComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
    </div>
  </div>

  <div className="form-section">
    <label>How do staff members coordinate and communicate with other responders, emergency services, or healthcare providers when providing basic first aid assistance during emergencies?</label>
    <div>
      <input type="text" name="responder-coordination" placeholder="Describe how they're coordinated/communicate" onChange={handleChange} />
    </div>
  </div>

  <div className="form-section">
    <label>What provisions are in place to ensure continuity of care and seamless transition of injured or ill individuals to higher levels of medical care?</label>
    <div>
      <input type="text" name="continuity-of-care-provisions" placeholder="Describe the provisions" onChange={handleChange} />
    </div>
  </div>

  <div className="form-section">
    <label>Are staff members trained to document and report basic first aid interventions within the school's incident reporting system or medical logbook?</label>
    <div>
      <input type="radio" name="first-aid-documentation-training" value="yes" onChange={handleChange} /> Yes
      <input type="radio" name="first-aid-documentation-training" value="no" onChange={handleChange} /> No
      <textarea className='comment-box' name="first-aid-documentation-trainingComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
    </div>
  </div>

  <h2>3.1.1.2.5.4 Continuity of Care and Follow-up Procedures:</h2>
  <div className="form-section">
    <label>How are injured or ill individuals managed and monitored following basic first aid interventions?</label>
    <div>
      <input type="text" name="post-aid-management" placeholder="Describe how they're managed" onChange={handleChange} />
    </div>
  </div>

  <div className="form-section">
    <label>What procedures are in place to ensure continuity of care and facilitate patient transport or transfer to higher levels of medical care?</label>
    <div>
      <input type="text" name="care-transfer-procedures" placeholder="Describe the procedures" onChange={handleChange} />
    </div>
  </div>

  <div className="form-section">
    <label>Are staff members trained to provide emotional support, reassurance, and ongoing monitoring to individuals receiving basic first aid interventions?</label>
    <div>
      <input type="radio" name="emotional-support-training" value="yes" onChange={handleChange} /> Yes
      <input type="radio" name="emotional-support-training" value="no" onChange={handleChange} /> No
      <textarea className='comment-box' name="emotional-support-trainingComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
    </div>
  </div>

  <div className="form-section">
    <label>How are follow-up procedures implemented to document incidents, assess outcomes, and provide post-incident debriefing or support?</label>
    <div>
      <input type="text" name="follow-up-procedures" placeholder="Describe how they're implemented" onChange={handleChange} />
    </div>
  </div>

  <div className="form-section">
    <label>Are staff members familiar with community resources and referral pathways for individuals requiring additional medical or psychological support beyond basic first aid?</label>
    <div>
      <input type="radio" name="community-resources-awareness" value="yes" onChange={handleChange} /> Yes
      <input type="radio" name="community-resources-awareness" value="no" onChange={handleChange} /> No
      <textarea className='comment-box' name="community-resources-awarenessComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
    </div>
  </div>

  <h2>3.1.1.2.5.5 Documentation and Reporting Requirements:</h2>
  <div className="form-section">
    <label>How are basic first aid interventions documented, recorded, and reported within the school's incident reporting system or electronic health record system?</label>
    <div>
      <input type="text" name="aid-intervention-documentation" placeholder="Describe how they're documented" onChange={handleChange} />
    </div>
  </div>

  <div className="form-section">
    <label>What training or guidance is provided to staff members on the importance of timely and accurate documentation, confidentiality requirements, and legal considerations?</label>
    <div>
      <input type="text" name="documentation-guidance" placeholder="Describe the training/guidance" onChange={handleChange} />
    </div>
  </div>

  <div className="form-section">
    <label>Are staff members trained to document patient assessments, treatments provided, and follow-up actions taken in a clear, concise, and objective manner?</label>
    <div>
      <input type="radio" name="clear-documentation-training" value="yes" onChange={handleChange} /> Yes
      <input type="radio" name="clear-documentation-training" value="no" onChange={handleChange} /> No
      <textarea className='comment-box' name="clear-documentation-trainingComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
    </div>
  </div>

  <div className="form-section">
    <label>How are medical records or incident reports reviewed and analyzed to identify trends, evaluate response effectiveness, and inform continuous improvement efforts?</label>
    <div>
      <input type="text" name="record-analysis" placeholder="Describe how they are reviewed and analyzed" onChange={handleChange} />
    </div>
  </div>

  <div className="form-section">
    <label>Are staff members aware of their responsibilities regarding incident reporting, documentation protocols, and data privacy regulations when documenting basic first aid treatments?</label>
    <div>
      <input type="radio" name="documentation-responsibility-awareness" value="yes" onChange={handleChange} /> Yes
      <input type="radio" name="documentation-responsibility-awareness" value="no" onChange={handleChange} /> No
      <textarea className='comment-box' name="documentation-responsibility-awarenessComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
    </div>
  </div>
                  {/* Image Upload Section */}
                  <input type="file" accept="image/*" onChange={handleImageChange} />
                  {uploadProgress > 0 && <p>Upload Progress: {uploadProgress.toFixed(2)}%</p>}
                  {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
                  {uploadError && <p style={{ color: 'red' }}>{uploadError}</p>}
                  
                  <button type="submit">Submit</button>
              </form>
          </main>
      </div>
  );
}

export default BasicFirstAidTechniquesFormPage;
