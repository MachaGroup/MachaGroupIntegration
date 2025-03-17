import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import Navbar from "./Navbar";
/**/
function ContactInformationDatabaseFormPage() {
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
              const formsRef = collection(db, 'forms/Emergency Preparedness/Drill Frequency');
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
    
    if(!buildingId) {
      alert('Building ID is missing. Please start the assessment from the correct page.');
      return;
    }

    try {
      // Create a document reference to the building in the 'Buildings' collection
      const buildingRef = doc(db, 'Buildings', buildingId);

      // Store the form data in the specified Firestore structure
      const formsRef = collection(db, 'forms/Emergency Preparedness/Drill Frequency');
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
            <h1>Contact Information Database Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 2.4.1.1.4 Contact Information Database */}
                <h2>Existence of Contact Information Database:</h2>
                <div className="form-section">
                    <label>Is there a centralized database or system in place to store contact information for individuals who will receive text/email alerts during emergencies?</label>
                    <div>
                        <input type="radio" name="centralizedSystem" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="centralizedSystem" value="no" onChange={handleChange} /> No
                        <textarea className='comment-box' name="centralizedSystemComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Does the database include up-to-date contact details, such as phone numbers, email addresses, and preferred communication methods, for all relevant stakeholders?</label>
                    <div>
                        <input type="radio" name="includingContactDetails" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="includingContactDetails" value="no" onChange={handleChange} /> No
                        <textarea className='comment-box' name="includingContactDetailsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Data Accuracy and Currency:</h2>
                <div className="form-section">
                    <label>How frequently is the contact information database reviewed and updated to ensure accuracy and currency?</label>
                    <div>
                        <input type="text" name="reviewedDatabase" placeholder="How frequent" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are procedures established to verify contact details periodically or in response to changes, such as staff turnover, new enrollments, or updates to contact preferences?</label>
                    <div>
                        <input type="radio" name="verifyingContactDetails" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="verifyingContactDetails" value="no" onChange={handleChange} /> No
                        <textarea className='comment-box' name="verifyingContactDetailsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Inclusion of Key Stakeholders:</h2>
                <div className="form-section">
                    <label>Does the contact information database encompass a comprehensive list of key stakeholders, including staff members, students, parents/guardians, contractors, and external partners?</label>
                    <div>
                        <input type="radio" name="contactInformationDatabaseList" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="contactInformationDatabaseList" value="no" onChange={handleChange} /> No
                        <textarea className='comment-box' name="contactInformationDatabaseListComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are contact details categorized or segmented based on roles, responsibilities, or affiliations to facilitate targeted communication during emergencies?</label>
                    <div>
                        <input type="radio" name="categorizingContactDetails" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="categorizingContactDetails" value="no" onChange={handleChange} /> No
                        <textarea className='comment-box' name="categorizingContactDetailsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Accessibility and Security:</h2>
                <div className="form-section">
                    <label>Is the contact information database accessible to authorized personnel responsible for managing and disseminating emergency alerts?</label>
                    <div>
                        <input type="radio" name="authorizedDatabaseManaging" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="authorizedDatabaseManaging" value="no" onChange={handleChange} /> No
                        <textarea className='comment-box' name="authorizedDatabaseManagingComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are appropriate security measures implemented to protect the confidentiality, integrity, and availability of contact information stored in the database?</label>
                    <div>
                        <input type="radio" name="implementedSecurityMeasures" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="implementedSecurityMeasures" value="no" onChange={handleChange} /> No
                        <textarea className='comment-box' name="implementedSecurityMeasuresComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <input type="text" name="implementedSecurityMeasuresText" placeholder="Describe the security measures" onChange={handleChange} />  
                    </div>
                </div>

                <h2>Integration with Alerting Systems:</h2>
                <div className="form-section">
                    <label>Is the contact information database integrated with text/email alerting systems to facilitate rapid and automated distribution of emergency notifications?</label>
                    <div>
                        <input type="radio" name="integratedAlertingSystems" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="integratedAlertingSystems" value="no" onChange={handleChange} /> No
                        <textarea className='comment-box' name="integratedAlertingSystemsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are procedures established for synchronizing or synchronizing contact information between the database and alerting systems to ensure consistency and reliability?</label>
                    <div>
                        <input type="radio" name="synchronizingProcedures" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="synchronizingProcedures" value="no" onChange={handleChange} /> No
                        <textarea className='comment-box' name="synchronizingProceduresComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <input type="text" name="synchronizingProceduresText" placeholder="Describe the procedures" onChange={handleChange} />  
                    </div>
                </div>

                <h2>Opt-In/Opt-Out Mechanisms:</h2>
                <div className="form-section">
                    <label>Are mechanisms in place for individuals to opt in or opt out of receiving text/email alerts, and are these preferences documented and honored?</label>
                    <div>
                        <input type="radio" name="optInOptOutMechanisms" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="optInOptOutMechanisms" value="no" onChange={handleChange} /> No
                        <textarea className='comment-box' name="optInOptOutMechanismsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <input type="text" name="optInOptOutMechanismsText" placeholder="Describe the mechanisms" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there a process for individuals to update their contact information or communication preferences, and are changes promptly reflected in the database and alerting systems?</label>
                    <div>
                        <input type="radio" name="updatingContactInformation" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="updatingContactInformation" value="no" onChange={handleChange} /> No
                        <textarea className='comment-box' name="updatingContactInformationComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <input type="text" name="updatingContactInformationProcess" placeholder="Describe the process" onChange={handleChange} />  
                    </div>
                </div>

                <h2>Training and User Support:</h2>
                <div className="form-section">
                    <label>Are staff members trained on how to access and use the contact information database for sending emergency alerts?</label>
                    <div>
                        <input type="radio" name="accessingDatabaseTraining" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="accessingDatabaseTraining" value="no" onChange={handleChange} /> No
                        <textarea className='comment-box' name="accessingDatabaseTrainingComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Is user support provided to assist personnel in navigating the database, troubleshooting issues, and managing contact lists effectively?</label>
                    <div>
                        <input type="radio" name="userSupport" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="userSupport" value="no" onChange={handleChange} /> No
                        <textarea className='comment-box' name="userSupport" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <h2>Compliance with Privacy Regulations:</h2>
                <div className="form-section">
                    <label>Does the management of contact information adhere to applicable privacy regulations, such as the Family Educational Rights and Privacy Act (FERPA) or the Health Insurance Portability and Accountability Act (HIPAA)?</label>
                    <div>
                        <input type="radio" name="applicablePrivacyRegulations" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="applicablePrivacyRegulations" value="no" onChange={handleChange} /> No
                        <textarea className='comment-box' name="applicablePrivacyRegulationsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <label>Are protocols established for safeguarding personal data and obtaining consent for the collection and use of contact information for emergency communication purposes?</label>
                    <div>
                        <input type="radio" name="safeguardingPersonalData" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="safeguardingPersonalData" value="no" onChange={handleChange} /> No
                        <textarea className='comment-box' name="safeguardingPersonalDataComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
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

export default ContactInformationDatabaseFormPage;