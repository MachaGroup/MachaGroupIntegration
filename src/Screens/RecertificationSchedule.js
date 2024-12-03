import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';

function RecertificationScheduleFormPage() {
  const navigate = useNavigate();  // Initialize useNavigate hook for navigation
  const { buildingId } = useBuilding(); // Access buildingId from context
  const db = getFirestore();

  const [formData, setFormData] = useState();

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

  // Function to handle back button
  const handleBack = () => {
    navigate(-1);  // Navigates to the previous page
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
      const formsRef = collection(db, 'forms/Personnel Training and Awareness/Recertification Schedule');
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
    {/* Back Button */}
    <button className="back-button" onClick={handleBack}>←</button> {/* Back button at the top */}
    <h1>Recertification Schedule Assessment</h1>
    <img src={logo} alt="Logo" className="logo" />
  </header>

  <main className="form-container">
    <form onSubmit={handleSubmit}>
      {/* 3.1.1.1.3 Recertification Schedule */}
      <h2>3.1.1.1.3.1 Recertification Frequency:</h2>
      <div className="form-section">
        <label>What is the established frequency for recertifying staff members in First Aid/CPR training (e.g., every two years, annually)?</label>
        <div>
          <input type="text" name="recertificationFrequency" placeholder="Describe the method for recertifying" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>How is the recertification schedule determined, and are there specific factors or regulations guiding this decision?</label>
        <div>
          <input type="text" name="recertificationScheduleDetermination" placeholder="Describe how the schedule is determined" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>Are there variations in recertification requirements based on job roles, departmental needs, or regulatory standards?</label>
        <div>
          <input type="radio" name="recertificationVariations" value="yes" onChange={handleChange}/> Yes
          <input type="radio" name="recertificationVariations" value="no" onChange={handleChange}/> No
        </div>
      </div>

      <h2>3.1.1.1.3.2 Notification and Reminder System:</h2>
      <div className="form-section">
        <label>How are staff members notified of upcoming recertification deadlines for First Aid/CPR training?</label>
        <div>
          <input type="text" name="notificationMethods" placeholder="Describe how the staff is notified" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>Is there a reminder system in place to alert staff members well in advance of their recertification expiration dates?</label>
        <div>
          <input type="radio" name="reminderSystem" value="yes" onChange={handleChange}/> Yes
          <input type="radio" name="reminderSystem" value="no" onChange={handleChange}/> No
        </div>
      </div>

      <div className="form-section">
        <label>What communication channels are utilized to ensure that staff members receive timely reminders about recertification requirements?</label>
        <div>
          <input type="text" name="communicationChannels" placeholder="List the communication channels" onChange={handleChange}/>
        </div>
      </div>

      <h2>3.1.1.1.3.3 Recertification Process:</h2>
      <div className="form-section">
        <label>What is the process for staff members to recertify in First Aid/CPR training, and are there specific steps or procedures they need to follow?</label>
        <div>
          <input type="text" name="recertificationProcess" placeholder="Describe the process" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>Are recertification courses offered on-site, online, or through external training providers, and how are these options determined?</label>
        <div>
          <input type="radio" name="recertificationOptions" value="yes" onChange={handleChange}/> Yes
          <input type="radio" name="recertificationOptions" value="no" onChange={handleChange}/> No
        </div>
      </div>

      <div className="form-section">
        <label>How are staff members supported in completing recertification requirements, such as scheduling flexibility or financial assistance?</label>
        <div>
          <input type="text" name="recertificationSupport" placeholder="Describe how the staff is supported to complete requirements" onChange={handleChange}/>
        </div>
      </div>

      <h2>3.1.1.1.3.4 Documentation and Records:</h2>
      <div className="form-section">
        <label>How are records of staff members' recertification status and completion maintained, and are these records kept up to date?</label>
        <div>
          <input type="text" name="recertificationRecords" placeholder="Describe how the records are maintained" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>Are recertification certificates or credentials issued to staff members upon successful completion, and how are these documents distributed or stored?</label>
        <div>
          <input type="text" name="certificateDistribution" placeholder="Describe how they are distributed or stored" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>What measures are in place to ensure the accuracy and integrity of recertification records, including verification of course completion and instructor credentials?</label>
        <div>
          <input type="text" name="recordsIntegrity" placeholder="Describe the measures" onChange={handleChange}/>
        </div>
      </div>

      <h2>3.1.1.1.3.5 Evaluation and Feedback:</h2>
      <div className="form-section">
        <label>How is the effectiveness of the recertification process evaluated, and are there mechanisms for gathering feedback from staff members?</label>
        <div>
          <input type="text" name="evaluationFeedback" placeholder="Describe the mechanisms" onChange={handleChange}/>
        </div>
      </div>

      <div className="form-section">
        <label>Are staff members given the opportunity to provide input on the recertification courses, instructors, or content to identify areas for improvement?</label>
        <div>
          <input type="radio" name="staffFeedback" value="yes" onChange={handleChange}/> Yes
          <input type="radio" name="staffFeedback" value="no" onChange={handleChange}/> No
        </div>
      </div>

      <div className="form-section">
        <label>How are lessons learned from previous recertification cycles used to refine and enhance the recertification process for future iterations?</label>
        <div>
          <input type="text" name="lessonsLearned" placeholder="Describe how lessons are learned" onChange={handleChange}/>
        </div>
      </div>

      {/* Submit Button */}
      <button type='submit'>Submit</button>
    </form>
  </main>
</div>

  )
}

export default RecertificationScheduleFormPage;