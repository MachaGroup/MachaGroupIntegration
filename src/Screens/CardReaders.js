import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext';
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';
import Navbar from "./Navbar";

function CardReadersPage() {
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

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!buildingId) {
      alert('Building ID is missing. Please start the assessment from the correct page.');
      return;
    }

    try {
      const buildingRef = doc(db, 'Buildings', buildingId);
      const formsRef = collection(db, 'forms/Physical Security/Card Readers');

      if (image) {
        if (!image.type.match('image/*')) {
          setUploadError('Please select a valid image file (jpg, jpeg, png, etc.)');
          return;
        }
        if (image.size > 5 * 1024 * 1024) {
          setUploadError('Image file too large (Max 5MB)');
          return;
        }

        const storageRef = ref(storage, `cardReaders_images/${Date.now()}_${image.name}`);
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
        <button className="back-button" onClick={() => navigate(-1)}>←</button>
        <h1>Card Readers Assessment</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit}>
        <h2>Functionality and Operation:</h2>
<div className="form-section">
  <label>Are the card readers operational and functioning as intended?</label>
  <div>
    <input type="radio" name="operationalCardReader" value="yes" onChange={handleChange}/> Yes
    <input type="radio" name="operationalCardReader" value="no" onChange={handleChange}/> No
    <textarea className='comment-box' name="operationalCardReaderComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
  </div>
</div>

<div className="form-section">
  <label>Do the card readers accurately read and authenticate proximity cards or other access credentials?</label>
  <div>
    <input type="radio" name="authentication" value="yes" onChange={handleChange}/> Yes
    <input type="radio" name="authentication" value="no" onChange={handleChange}/> No
    <textarea className='comment-box' name="authenticationComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
  </div>
</div>

<div className="form-section">
  <label>Are there any signs of malfunction or errors in card reader operations?</label>
  <div>
    <input type="radio" name="malfunction" value="yes" onChange={handleChange}/> Yes
    <input type="radio" name="malfunction" value="no" onChange={handleChange}/> No
    <textarea className='comment-box' name="malfunctionComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
  </div>
</div>

<div className="form-section">
  <label>Are there backup systems in place in case of power outages or malfunctions?</label>
  <div>
    <input type="radio" name="backupSystems" value="yes" onChange={handleChange}/> Yes
    <input type="radio" name="backupSystems" value="no" onChange={handleChange}/> No
    <textarea className='comment-box' name="backupSystemsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
  </div>
</div>

{/* Access Control */}
<h2>Access Control:</h2>
<div className="form-section">
  <label>How is access to the secondary entrances controlled using card readers?</label>
  <input type="text" name="accessControlMethods" placeholder="Describe the access control methods" onChange={handleChange}/>
</div>

<div className="form-section">
  <label>Are proximity cards issued to authorized personnel and visitors for access?</label>
  <div>
    <input type="radio" name="issuedCards" value="yes" onChange={handleChange}/> Yes
    <input type="radio" name="issuedCards" value="no" onChange={handleChange}/> No
    <textarea className='comment-box' name="issuedCardsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
  </div>
</div>

<div className="form-section">
  <label>Is access restricted to individuals with valid proximity cards or authorized credentials?</label>
  <div>
    <input type="radio" name="restrictedAccess" value="yes" onChange={handleChange}/> Yes
    <input type="radio" name="restrictedAccess" value="no" onChange={handleChange}/> No
    <textarea className='comment-box' name="restrictedAccessComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
  </div>
</div>

<div className="form-section">
  <label>Is there a process in place to deactivate lost or stolen proximity cards to prevent unauthorized access?</label>
  <div>
    <input type="radio" name="deactivationProcess" value="yes" onChange={handleChange}/> Yes
    <input type="radio" name="deactivationProcess" value="no" onChange={handleChange}/> No
    <textarea className='comment-box' name="deactivationProcessComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
  </div>
</div>

{/* Integration with Access Control Systems */}
<h2>Integration with Access Control Systems:</h2>
<div className="form-section">
  <label>Are the card readers integrated with the overall access control system?</label>
  <div>
    <input type="radio" name="integration" value="yes" onChange={handleChange}/> Yes
    <input type="radio" name="integration" value="no" onChange={handleChange}/> No
    <textarea className='comment-box' name="integrationComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
  </div>
</div>

<div className="form-section">
  <label>Do they communicate seamlessly with access control software and databases?</label>
  <div>
    <input type="radio" name="communication" value="yes" onChange={handleChange}/> Yes
    <input type="radio" name="communication" value="no" onChange={handleChange}/> No
    <textarea className='comment-box' name="communicationComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
  </div>
</div>

<div className="form-section">
  <label>Is there real-time monitoring and logging of access events captured by the card readers?</label>
  <div>
    <input type="radio" name="monitoring" value="yes" onChange={handleChange}/> Yes
    <input type="radio" name="monitoring" value="no" onChange={handleChange}/> No
    <textarea className='comment-box' name="monitoringComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
  </div>
</div>

<div className="form-section">
  <label>Are access rights managed centrally and synchronized with the card reader system?</label>
  <div>
    <input type="radio" name="centralManagement" value="yes" onChange={handleChange}/> Yes
    <input type="radio" name="centralManagement" value="no" onChange={handleChange}/> No
    <textarea className='comment-box' name="centralManagementComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
  </div>
</div>

{/* Security Features */}
<h2>Security Features:</h2>
<div className="form-section">
  <label>Are the card readers equipped with security features to prevent tampering or unauthorized access attempts?</label>
  <div>
    <input type="radio" name="securityFeatures" value="yes" onChange={handleChange}/> Yes
    <input type="radio" name="securityFeatures" value="no" onChange={handleChange}/> No
    <textarea className='comment-box' name="securityFeaturesComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
  </div>
</div>

<div className="form-section">
  <label>Do they support encryption and secure communication protocols to protect access credentials?</label>
  <div>
    <input type="radio" name="encryption" value="yes" onChange={handleChange}/> Yes
    <input type="radio" name="encryption" value="no" onChange={handleChange}/> No
    <textarea className='comment-box' name="encryptionComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
  </div>
</div>

<div className="form-section">
  <label>Is there physical security measures in place to prevent unauthorized access to card reader components or wiring?</label>
  <div>
    <input type="radio" name="physicalSecurity" value="yes" onChange={handleChange}/> Yes
    <input type="radio" name="physicalSecurity" value="no" onChange={handleChange}/> No
    <textarea className='comment-box' name="physicalSecurityComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
  </div>
</div>

{/* Compliance with Regulations */}
<h2>Compliance with Regulations:</h2>
<div className="form-section">
  <label>Do the card readers comply with relevant regulations, standards, and industry best practices?</label>
  <div>
    <input type="radio" name="compliance" value="yes" onChange={handleChange}/> Yes
    <input type="radio" name="compliance" value="no" onChange={handleChange}/> No
    <textarea className='comment-box' name="complianceComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
  </div>
</div>

<div className="form-section">
  <label>Are there any specific requirements or guidelines for card reader systems outlined by regulatory authorities or industry associations?</label>
  <input type="text" name="regulatoryRequirements" placeholder="Enter any regulatory requirements" onChange={handleChange}/>
</div>

<div className="form-section">
  <label>Have the card readers undergone testing or certification to verify compliance with applicable standards?</label>
  <div>
    <input type="radio" name="testingCertification" value="yes" onChange={handleChange}/> Yes
    <input type="radio" name="testingCertification" value="no" onChange={handleChange}/> No
    <textarea className='comment-box' name="testingCertificationComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
  </div>
</div>

{/* Maintenance and Upkeep */}
<h2>Maintenance and Upkeep:</h2>
<div className="form-section">
  <label>Is there a regular maintenance schedule in place for the card readers?</label>
  <div>
    <input type="radio" name="maintenanceSchedule" value="yes" onChange={handleChange}/> Yes
    <input type="radio" name="maintenanceSchedule" value="no" onChange={handleChange}/> No
    <textarea className='comment-box' name="maintenanceScheduleComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
  </div>
</div>

<div className="form-section">
  <label>Are maintenance tasks, such as cleaning, calibration, and firmware updates, performed according to schedule?</label>
  <div>
    <input type="radio" name="maintenanceTasks" value="yes" onChange={handleChange}/> Yes
    <input type="radio" name="maintenanceTasks" value="no" onChange={handleChange}/> No
    <textarea className='comment-box' name="maintenanceTasksComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
  </div>
</div>

<div className="form-section">
  <label>Are there records documenting maintenance activities, repairs, and any issues identified during inspections?</label>
  <div>
    <input type="radio" name="maintenanceRecords" value="yes" onChange={handleChange}/> Yes
    <input type="radio" name="maintenanceRecords" value="no" onChange={handleChange}/> No
    <textarea className='comment-box' name="maintenanceRecordsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
  </div>
</div>

{/* User Training and Awareness */}
<h2>User Training and Awareness:</h2>
<div className="form-section">
  <label>Have users, such as security personnel, staff, and authorized cardholders, received training on how to use the card readers properly?</label>
  <div>
    <input type="radio" name="userTraining" value="yes" onChange={handleChange}/> Yes
    <input type="radio" name="userTraining" value="no" onChange={handleChange}/> No
    <textarea className='comment-box' name="userTrainingComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
  </div>
</div>

<div className="form-section">
  <label>Are there instructions or guidelines available to users regarding proper card usage and access procedures?</label>
  <div>
    <input type="radio" name="instructions" value="yes" onChange={handleChange}/> Yes
    <input type="radio" name="instructions" value="no" onChange={handleChange}/> No
    <textarea className='comment-box' name="instructionsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
  </div>
</div>

<div className="form-section">
  <label>Is there a process for reporting malfunctions, damage, or security incidents related to the card readers?</label>
  <div>
    <input type="radio" name="reportingProcess" value="yes" onChange={handleChange}/> Yes
    <input type="radio" name="reportingProcess" value="no" onChange={handleChange}/> No
    <textarea className='comment-box' name="reportingProcessComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
  </div>
</div>
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

export default CardReadersPage;