import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";
/**/
function CPRCertificationFormPage() {
  const navigate = useNavigate();  // Initialize useNavigate hook for navigation
  const { buildingId } = useBuilding(); // Access buildingId from context
  const db = getFirestore();

  const [formData, setFormData] = useState();
  const storage = getStorage();
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
              const formsRef = collection(db, 'forms/Personnel Training and Awareness/CPR Certification');
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
      // Create a document reference to the building in the 'Buildings' collection
      const buildingRef = doc(db, 'Buildings', buildingId); 

      // Store the form data in the specified Firestore structure
      const formsRef = collection(db, 'forms/Personnel Training and Awareness/CPR Certification');
      await addDoc(formsRef, {
          building: buildingRef, // Reference to the building document
          formData: formData, // Store the form data as a nested object
      });

      console.log('Form data submitted successfully!');
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
    {/* Back Button */}
    <button className="back-button" onClick={handleBack}>←</button> {/* Back button at the top */}
    <h1>3.1.1.2.6 CPR Certification Assessment</h1>
    <img src={logo} alt="Logo" className="logo" />
  </header>

  <main className="form-container">
    <form onSubmit={handleSubmit}>
      {/* 3.1.1.2.6 CPR Certification */}
      <h2>3.1.1.2.6.1 Certification Requirements and Standards:</h2>
      <div className="form-section">
        <label>What certification standards or guidelines are followed for CPR training, such as those set by recognized organizations like the American Heart Association (AHA), American Red Cross (ARC), or similar accredited institutions?</label>
        <div>
          <input type="text" name="cpr-certification-standards" placeholder="Describe the standards/guidelines" onChange={handleChange} />
        </div>
      </div>

      <div className="form-section">
        <label>Are CPR certification courses aligned with the latest industry standards, guidelines, and best practices for adult, child, and infant CPR techniques, as well as automated external defibrillator (AED) use and choking relief procedures?</label>
        <div>
          <input type="radio" name="cpr-standards-alignment" value="yes" onChange={handleChange} /> Yes
          <input type="radio" name="cpr-standards-alignment" value="no" onChange={handleChange} /> No
          <textarea className='comment-box' name="cpr-standards-alignmentComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
        </div>
      </div>

      <div className="form-section">
        <label>How do certification programs address specific CPR techniques, compression-to-ventilation ratios, rescuer fatigue management, and other factors that may impact the effectiveness of CPR interventions?</label>
        <div>
          <input type="text" name="cpr-techniques-addressed" placeholder="Describe how they address techniques" onChange={handleChange} />
        </div>
      </div>

      <h2>3.1.1.2.6.2 Instructor Qualifications and Expertise:</h2>
      <div className="form-section">
        <label>What qualifications, credentials, and experience do CPR instructors possess to deliver high-quality training and ensure participant competency?</label>
        <div>
          <input type="text" name="cpr-instructor-qualifications" placeholder="Describe the qualifications/credentials/experience" onChange={handleChange} />
        </div>
      </div>

      <div className="form-section">
        <label>Are CPR instructors certified by recognized CPR training organizations and accredited to teach CPR courses to school staff members?</label>
        <div>
          <input type="radio" name="instructor-certification" value="yes" onChange={handleChange}/> Yes
          <input type="radio" name="instructor-certification" value="no" onChange={handleChange}/> No
          <textarea className='comment-box' name="instructor-certificationComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
        </div>
        <div>
          <input type="text" name="certifying-organizations" placeholder="List the organizations" onChange={handleChange} />
        </div>
      </div>

      <div className="form-section">
        <label>How do instructors stay updated on changes in CPR protocols, instructional methodologies, and training techniques to deliver relevant and effective CPR certification programs?</label>
        <div>
          <input type="text" name="instructor-updates" placeholder="Describe how they're updated" onChange={handleChange} />
        </div>
      </div>

      <h2>3.1.1.2.6.3 Training Delivery and Methodology:</h2>
      <div className="form-section">
        <label>How are CPR certification courses delivered to accommodate diverse learning styles, preferences, and scheduling constraints of school staff members?</label>
        <div>
          <input type="text" name="course-delivery-methods" placeholder="Describe how they're delivered" onChange={handleChange} />
        </div>
      </div>

      <div className="form-section">
        <label>Are training sessions conducted in-person, online, or through blended learning approaches that combine both classroom instruction and self-paced online modules?</label>
        <div>
          <input type="radio" name="training-delivery-modes" value="yes" onChange={handleChange} /> Yes
          <input type="radio" name="training-delivery-modes" value="no" onChange={handleChange} /> No
          <textarea className='comment-box' name="training-delivery-modesComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
        </div>
      </div>

      <div className="form-section">
        <label>What training resources, materials, and technologies are utilized to enhance participant engagement, skills acquisition, and knowledge retention during CPR certification courses?</label>
        <div>
          <input type="text" name="training-resources-utilized" placeholder="Describe what is utilized" onChange={handleChange} />
        </div>
      </div>

      <h2>3.1.1.2.6.4 Skills Proficiency and Assessment:</h2>
      <div className="form-section">
        <label>How are CPR skills assessed and evaluated to ensure staff members achieve and maintain proficiency in performing CPR techniques effectively?</label>
        <div>
          <input type="text" name="cpr-skills-assessment" placeholder="Describe how they're assessed/evaluated" onChange={handleChange} />
        </div>
      </div>

      <div className="form-section">
        <label>Are participants provided with opportunities for hands-on practice, skills demonstrations, and scenario-based simulations to apply CPR skills in simulated emergency situations?</label>
        <div>
          <input type="radio" name="hands-on-practice-opportunities" value="yes" onChange={handleChange} /> Yes
          <input type="radio" name="hands-on-practice-opportunities" value="no" onChange={handleChange} /> No
          <textarea className='comment-box' name="hands-on-practice-opportunitiesComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
        </div>
      </div>

      <div className="form-section">
        <label>What criteria or performance standards are used to measure participant competency, and how are assessments conducted to verify skill mastery and readiness to respond to cardiac arrest events?</label>
        <div>
          <input type="text" name="competency-criteria" placeholder="Describe the criteria/standards" onChange={handleChange} />
        </div>
      </div>

      <h2>3.1.1.2.6.5 Recertification and Continuing Education:</h2>
      <div className="form-section">
        <label>What are the recertification requirements and intervals for maintaining CPR certification among school staff members, as recommended by CPR training organizations or regulatory agencies?</label>
        <div>
          <input type="text" name="recertification-requirements" placeholder="Describe the requirements" onChange={handleChange} />
        </div>
      </div>

      <div className="form-section">
        <label>Are recertification courses offered regularly to ensure staff members renew their CPR certification within the specified timeframe and stay updated on CPR protocols and techniques?</label>
        <div>
          <input type="radio" name="recertification-course-availability" value="yes" onChange={handleChange} /> Yes
          <input type="radio" name="recertification-course-availability" value="no" onChange={handleChange} /> No
          <textarea className='comment-box' name="recertification-course-availabilityComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
        </div>
      </div>

      <div className="form-section">
        <label>How are staff members informed about recertification deadlines, renewal procedures, and opportunities for continuing education to sustain their CPR skills and knowledge over time?</label>
        <div>
          <input type="text" name="recertification-communication" placeholder="Describe how they're informed" onChange={handleChange} />
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

export default CPRCertificationFormPage;
