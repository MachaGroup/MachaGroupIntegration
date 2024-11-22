import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';

function TrainingMaterialsFormPage() {
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
      const formsRef = collection(db, 'forms/Personnel Training and Awareness/Training Materials');
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
            <h1>Training Materials Assessment</h1>
      </header>

      <main className="form-container">
            <form>
                {/* 3.1.1.1.2 Training Materials */}
                <h2>Availability and Accessibility:</h2>
                <div className="form-section">
                    <label>Are appropriate training materials, such as first aid kits, AEDs (Automated External Defibrillators), and CPR manikins, readily available during training sessions?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are training materials stored and organized to ensure easy access and retrieval during training sessions?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the materials stored" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there a designated area or storage facility for training materials, and is it easily accessible to trainers and participants?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the area" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are backup supplies of essential training materials maintained to ensure availability in case of emergencies or high demand?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are participants informed about the location and availability of training materials before and during training sessions?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the materials stored" />  
                    </div>
                </div>

                <h2>Maintenance and Inspection:</h2>
                <div className="form-section">
                    <label>How often are training materials inspected to ensure they are in working condition and compliant with safety standards?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="How often" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Is there a documented maintenance schedule for training materials, including routine checks and servicing?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there protocols in place for promptly addressing any issues or deficiencies identified during inspections?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the protocols" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are maintenance and inspection records maintained for each training material, documenting dates of inspection, repairs, and replacements?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are staff members trained on proper handling and maintenance procedures for training materials?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the method" />  
                    </div>
                </div>

                <h2>Stocking and Replenishment:</h2>
                <div className="form-section">
                    <label>Are training materials regularly stocked with necessary supplies, such as bandages, gloves, and medication?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How is the inventory of training materials managed, and are there processes in place for replenishing expended or expired items?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how materials is managed" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are stock levels of training materials monitored in real-time or through periodic audits to ensure adequate supply?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there established criteria or thresholds for determining when to reorder or replenish training materials?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the criteria" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are suppliers or vendors selected for purchasing training materials, and are there agreements in place to ensure timely delivery and quality assurance?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how it's selected" />  
                    </div>
                </div>

                <h2>Quality and Suitability:</h2>
                <div className="form-section">
                    <label>Are training materials selected based on their quality, durability, and suitability for the intended training purposes?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there guidelines or criteria for selecting and procuring training materials, taking into account factors such as brand reputation and user feedback?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the guidelines" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are participant feedback and preferences considered when choosing training materials to ensure they meet the diverse needs of learners?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are training materials evaluated for effectiveness and relevance to the training objectives and curriculum?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how it's evaluated" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there mechanisms in place for monitoring and addressing any issues or concerns raised regarding the quality or suitability of training materials?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the mechanisms" />  
                    </div>
                </div>

                <h2>Training Material Usage:</h2>
                <div className="form-section">
                    <label>Are participants trained on how to use and apply various items in the training materials effectively during practical exercises and simulations?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are training materials integrated into training sessions to facilitate hands-on learning and skill development?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how it's integrated" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there opportunities for participants to provide feedback on the usability and effectiveness of training materials, and are any improvements or adjustments made based on this feedback?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there guidelines or protocols for storing, handling, and disposing of training materials safely and responsibly?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the guidelines" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are training materials adapted or customized to accommodate the specific needs or preferences of different participant groups?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how it's adapted/customized" />  
                    </div>
                </div>

                <h2>Training Material Documentation:</h2>
                <div className="form-section">
                    <label>Are records maintained for each training material, including purchase receipts, maintenance logs, and usage reports?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are training material inventories documented and updated, and are these records easily accessible for reference?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how it's documented and updated" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there procedures in place for tracking the movement and usage of training materials, including transfers between locations or departments?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the procedures" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are discrepancies or discrepancies in training material inventories identified and resolved?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how discrepancies are identified" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are there protocols for documenting incidents or accidents involving training materials and conducting investigations or corrective actions as needed?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe the protocols" />  
                    </div>
                </div>

                <h2>Training Material Security:</h2>
                <div className="form-section">
                    <label>Are measures in place to secure training materials against theft, loss, or unauthorized access?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are training materials secured during non-training hours or when not in use, such as overnight or during weekends?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how training materials are secured" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are access controls or restricted areas implemented to prevent unauthorized individuals from accessing training materials?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

                <div className="form-section">
                    <label>How are sensitive or valuable training materials protected against damage or tampering, such as by using locks or surveillance cameras?</label>
                    <div>
                        <input type="text" name="access-rights" placeholder="Describe how training materials are being secured" />  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are staff members trained on security protocols and procedures for safeguarding training materials against potential risks or threats?</label>
                    <div>
                        <input type="radio" name="gates-operational" value="yes" /> Yes
                        <input type="radio" name="gates-operational" value="no" /> No
                    </div>
                </div>

            </form>
        </main>    
    </div>
  )
}

export default TrainingMaterialsFormPage;