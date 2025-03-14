import logo from '../assets/MachaLogo.png';
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import Navbar from "./Navbar";

function SpeakerLocationsFormPage() {
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
            <h1>Speaker Locations Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 2.4.1.1.1 Speaker Locations */}
                <h2>Coverage and Placement:</h2>
                <div className="form-section">
                    <label>Are public address (PA) system speakers strategically located throughout the school to ensure comprehensive coverage?</label>
                    <div>
                        <input type="radio" name="strategicallyLocatedSpeakers" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="strategicallyLocatedSpeakers" value="no" onChange={handleChange} /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Have speaker locations been assessed to minimize dead zones or areas with poor sound quality?</label>
                    <div>
                        <input type="radio" name="minimizingDeadZones" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="minimizingDeadZones" value="no" onChange={handleChange} /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are speakers positioned in key areas such as classrooms, hallways, common areas, and outdoor spaces to reach all occupants?</label>
                    <div>
                        <input type="radio" name="speakerPositioning" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="speakerPositioning" value="no" onChange={handleChange} /> No
                    </div>
                </div>

                <h2>Audibility and Clarity:</h2>
                <div className="form-section">
                    <label>Is the PA system capable of delivering clear and intelligible audio messages throughout the school?</label>
                    <div>
                        <input type="radio" name="deliveringAudioMessages" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="deliveringAudioMessages" value="no" onChange={handleChange} /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Have measures been taken to ensure that announcements are audible over ambient noise and distractions?</label>
                    <div>
                        <input type="radio" name="annoucementMeasures" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="annoucementMeasures" value="no" onChange={handleChange} /> No
                    </div>
                    <div>
                        <input type="text" name="annoucementMeasuresText" placeholder="Describe the measures" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are speaker volumes adjusted to appropriate levels to prevent discomfort or distortion?</label>
                    <div>
                        <input type="radio" name="adjustedSpeakerVolumes" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="adjustedSpeakerVolumes" value="no" onChange={handleChange} /> No
                    </div>
                </div>

                <h2>Redundancy and Reliability:</h2>
                <div className="form-section">
                    <label>Is the PA system equipped with redundancy features to ensure continued operation in the event of equipment failures or power outages?</label>
                    <div>
                        <input type="radio" name="redundancyFeatures" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="redundancyFeatures" value="no" onChange={handleChange} /> No
                    </div>
                    <div>
                        <input type="text" name="redundancyFeaturesText" placeholder="Describe the system" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are backup power sources, such as batteries or generators, available to support the PA system during emergencies?</label>
                    <div>
                        <input type="radio" name="backupPowerSources" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="backupPowerSources" value="no" onChange={handleChange} /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Is the PA system regularly tested to verify its reliability and functionality, including speaker performance and signal transmission?</label>
                    <div>
                        <input type="radio" name="reliabilityTesting" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="reliabilityTesting" value="no" onChange={handleChange} /> No
                    </div>
                </div>

                <h2>Message Content and Protocols:</h2>
                <div className="form-section">
                    <label>Are procedures established for drafting and delivering emergency messages over the PA system?</label>
                    <div>
                        <input type="radio" name="draftingProcedures" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="draftingProcedures" value="no" onChange={handleChange} /> No
                    </div>
                    <div>
                        <input type="text" name="draftingProceduresText" placeholder="Describe the procedures" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are PA system operators trained on message content, delivery techniques, and protocols for initiating alerts and announcements?</label>
                    <div>
                        <input type="radio" name="trainedSystemOperators" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="trainedSystemOperators" value="no" onChange={handleChange} /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there a standardized format for emergency messages to ensure clarity, consistency, and effectiveness?</label>
                    <div>
                        <input type="radio" name="standardizedEmergencyMessages" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="standardizedEmergencyMessages" value="no" onChange={handleChange} /> No
                    </div>
                    <div>
                        <input type="text" name="standardizedFormat" placeholder="Describe the standardized format" onChange={handleChange} />  
                    </div>
                </div>

                <h2>Integration with Emergency Plans:</h2>
                <div className="form-section">
                    <label>Is the PA system integrated into broader emergency communication and response plans?</label>
                    <div>
                        <input type="radio" name="integratedSystem" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="integratedSystem" value="no" onChange={handleChange} /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are PA system alerts coordinated with other communication channels and alert systems to ensure timely and coherent messaging?</label>
                    <div>
                        <input type="radio" name="coordinatedAlerts" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="coordinatedAlerts" value="no" onChange={handleChange} /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are PA system procedures aligned with emergency protocols for specific scenarios, such as evacuations, lockdowns, or sheltering?</label>
                    <div>
                        <input type="radio" name="systemProcedures" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="systemProcedures" value="no" onChange={handleChange} /> No
                    </div>
                </div>

                <h2>Accessibility Considerations:</h2>
                <div className="form-section">
                    <label>Have accommodations been made to ensure that emergency messages delivered via the PA system are accessible to individuals with disabilities?</label>
                    <div>
                        <input type="radio" name="emergencyMessagingAccommodations" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="emergencyMessagingAccommodations" value="no" onChange={handleChange} /> No
                    </div>
                    <div>
                        <input type="text" name="emergencyMessagingAccommodationsText" placeholder="Describe the accommodations" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are alternative communication methods available for individuals who may have difficulty hearing or understanding PA system announcements?</label>
                    <div>
                        <input type="radio" name="alternativeCommunicationMethods" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="alternativeCommunicationMethods" value="no" onChange={handleChange} /> No
                    </div>
                    <div>
                        <input type="text" name="alternativeCommunicationMethodsText" placeholder="Describe the alternative methods" onChange={handleChange} />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Have procedures been established to address language barriers or other communication needs during emergencies?</label>
                    <div>
                        <input type="radio" name="languageBarrierProcedures" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="languageBarrierProcedures" value="no" onChange={handleChange} /> No
                    </div>
                    <div>
                        <input type="text" name="languageBarrierProceduresText" placeholder="Describe the procedures" onChange={handleChange} />  
                    </div>
                </div>

                <h2>Maintenance and Testing:</h2>
                <div className="form-section">
                    <label>Is the PA system regularly maintained to keep speakers in good working condition and address any issues promptly?</label>
                    <div>
                        <input type="radio" name="maintainingSpeakers" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="maintainingSpeakers" value="no" onChange={handleChange} /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are routine tests and inspections conducted to verify the functionality of the PA system, including speaker performance and audio quality?</label>
                    <div>
                        <input type="radio" name="routineTests" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="routineTests" value="no" onChange={handleChange} /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are records maintained to document maintenance activities, tests, and any corrective actions taken to address deficiencies?</label>
                    <div>
                        <input type="radio" name="maintainingDocuments" value="yes" onChange={handleChange} /> Yes
                        <input type="radio" name="maintainingDocuments" value="no" onChange={handleChange} /> No
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit">Submit</button>
                
            </form>
        </main>
    </div>
  )
}

export default SpeakerLocationsFormPage;