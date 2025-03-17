import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; // Import Firebase Storage functions
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function BackupTestingPage() {
  const navigate = useNavigate();
  const { buildingId } = useBuilding();
  const db = getFirestore();
  const storage = getStorage(); // Initialize Firebase Storage

  const [formData, setFormData] = useState({}); // Initialize as an object to store imageUrl
  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState(null); // State for image URL
  const [uploadError, setUploadError] = useState(null); // State for upload errors

  useEffect(() => {
    if (!buildingId) {
      alert('No building selected. Redirecting to Building Info...');
      navigate('/BuildingandAddress');
    }
  }, [buildingId, navigate]);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;

    if (type === 'radio') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked ? value : '',
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
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
        const formsRef = collection(db, 'forms/Cybersecurity/Backup Testing');
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
      alert('Building ID is missing. Please start from the Building Information page.');
      return;
    }

    try {
      const buildingRef = doc(db, 'Buildings', buildingId);
      const formsRef = collection(db, 'forms/Cybersecurity/Backup Testing');

      // Image upload logic
      if (image) {
        //Basic client-side validation
        if (!image.type.match('image/*')) {
          setUploadError('Please select a valid image file (jpg, jpeg, png, etc.)');
          // Disable the submit button if there's an error
          e.target.querySelector('button[type="submit"]').disabled = true;
          return;
        }
        if (image.size > 5 * 1024 * 1024) { // 5MB limit
          setUploadError('Image file too large (Max 5MB)');
          // Disable the submit button if there's an error
          e.target.querySelector('button[type="submit"]').disabled = true;
          return;
        }

        // Enable the submit button before starting the upload
        e.target.querySelector('button[type="submit"]').disabled = false;

        const storageRef = ref(storage, `backupTesting_images/${Date.now()}_${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on('state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
          },
          (error) => {
            setUploadError(error);
            // Re-enable submit button after error
            e.target.querySelector('button[type="submit"]').disabled = false;
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setImageUrl(downloadURL);
              setFormData({ ...formData, imageUrl: downloadURL });
              setUploadError(null);
            });
          }
        );
      }

      await addDoc(formsRef, {
        building: buildingRef,
        formData: formData,
      });

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
        <h1>Backup Testing Assessment</h1>
        <img src={logo} alt='Logo' className='logo' />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
          {/* Frequency and Schedule of Testing */}
          <h2>4.2.2.2.1.1 Frequency and Schedule of Testing:</h2>
          <div className="form-section">
            <label>How often are backup recovery drills conducted, and is the frequency sufficient to ensure preparedness and data integrity?</label>
            <textarea name="frequencyPreparedness" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>Are there specific times of the year when testing is scheduled to align with organizational needs or periods of lower activity?</label>
            <textarea name="scheduledTimes" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>Does the schedule for backup testing include both planned and unplanned drills to evaluate real-time response capabilities?</label>
            <div>
              <input type="radio" name="plannedUnplannedDrills" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="plannedUnplannedDrills" value="No" onChange={handleChange} /> No
              <textarea className='comment-box' name="plannedUnplannedDrillsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          {/* Testing Procedures and Scenarios */}
          <h2>4.2.2.2.1.2 Testing Procedures and Scenarios:</h2>
          <div className="form-section">
            <label>What types of scenarios are covered during backup testing to simulate various types of data loss events (e.g., cyberattacks, hardware failure, natural disasters)?</label>
            <textarea name="testingScenarios" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>Are both full-scale and partial recovery processes tested to ensure comprehensive preparedness?</label>
            <div>
              <input type="radio" name="fullPartialRecovery" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="fullPartialRecovery" value="No" onChange={handleChange} /> No
              <textarea className='comment-box' name="fullPartialRecoveryComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>
          <div className="form-section">
            <label>How are complex scenarios, such as multi-site recoveries or cross-functional dependencies, incorporated into the testing process?</label>
            <textarea name="complexScenarios" onChange={handleChange}></textarea>
          </div>

          {/* Evaluation and Documentation of Test Results */}
          <h2>4.2.2.2.1.3 Evaluation and Documentation of Test Results:</h2>
          <div className="form-section">
            <label>What criteria are used to evaluate the success or failure of a backup test, including recovery time objectives (RTOs) and recovery point objectives (RPOs)?</label>
            <textarea name="evaluationCriteria" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>Are the results of each backup test thoroughly documented, including any issues encountered and the steps taken to resolve them?</label>
            <div>
              <input type="radio" name="documentTestResults" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="documentTestResults" value="No" onChange={handleChange} /> No
              <textarea className='comment-box' name="documentTestResultsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>
          <div className="form-section">
            <label>How are lessons learned from backup testing used to improve disaster recovery plans and backup processes?</label>
            <textarea name="lessonsLearned" onChange={handleChange}></textarea>
          </div>

          {/* Roles and Responsibilities */}
          <h2>4.2.2.2.1.4 Roles and Responsibilities:</h2>
          <div className="form-section">
            <label>Who is responsible for initiating, overseeing, and evaluating backup tests within the organization?</label>
            <textarea name="responsibilityRoles" onChange={handleChange}></textarea>
          </div>

          <div className="form-section">
            <label>Are there clearly defined roles for each team member involved in the backup testing process, including IT staff, recovery coordinators, and external vendors?</label>
            <div>
              <input type="radio" name="definedRoles" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="definedRoles" value="No" onChange={handleChange} /> No
              <textarea className='comment-box' name="definedRolesComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>How are responsibilities assigned and communicated to ensure effective coordination during a backup test?</label>
            <textarea name="responsibilityCommunication" onChange={handleChange}></textarea>
          </div>

          {/* Continuous Improvement and Feedback Loop */}
          <h2>4.2.2.2.1.5 Continuous Improvement and Feedback Loop:</h2>
          <div className="form-section">
            <label>What processes are in place to gather feedback from participants in backup tests to identify areas for improvement?</label>
            <textarea name="feedbackProcesses" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>How are changes to backup testing procedures or disaster recovery plans communicated to relevant stakeholders?</label>
            <textarea name="communicatingChanges" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>Are there mechanisms to regularly review and update testing strategies based on new risks, technology changes, or organizational shifts?</label>
            <div>
              <input type="radio" name="updateMechanisms" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="updateMechanisms" value="No" onChange={handleChange} /> No
              <textarea className='comment-box' name="updateMechanismsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          {/* Integration with Overall Disaster Recovery Plan */}
          <h2>4.2.2.2.1.6 Integration with Overall Disaster Recovery Plan:</h2>
          <div className="form-section">
            <label>How does backup testing integrate with the overall disaster recovery plan, including coordination with other recovery strategies?</label>
            <textarea name="planIntegration" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>Are there specific metrics or KPIs that link backup testing results with broader disaster recovery goals and objectives?</label>
            <textarea name="metricsKPIs" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>How is the effectiveness of the entire disaster recovery plan evaluated through the lens of backup testing outcomes?</label>
            <textarea name="evaluatePlanEffectiveness" onChange={handleChange}></textarea>
          </div>

          {/* Technology and Tool Utilization */}
          <h2>4.2.2.2.1.7 Technology and Tool Utilization:</h2>
          <div className="form-section">
            <label>What tools or software are used to facilitate backup testing, and are they regularly updated to support the latest backup and recovery technologies?</label>
            <textarea name="toolsUsed" onChange={handleChange}></textarea>
          </div>
          <div className="form-section">
            <label>Are automated testing tools utilized to increase the frequency and reliability of backup testing?</label>
            <div>
              <input type="radio" name="automatedTools" value="Yes" onChange={handleChange} /> Yes
              <input type="radio" name="automatedTools" value="No" onChange={handleChange} /> No
              <textarea className='comment-box' name="automatedToolsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>
          <div className="form-section">
            <label>How are these tools configured to simulate realistic disaster scenarios and provide accurate results?</label>
            <textarea name="toolConfiguration" onChange={handleChange}></textarea>
          </div>

          {/* Image Upload */}
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
          {uploadError && <p style={{ color: 'red' }}>{uploadError}</p>}
          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}

export default BackupTestingPage;
