import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useBuilding } from '../Context/BuildingContext'; // Context for buildingId
import './FormQuestions.css';
import logo from '../assets/MachaLogo.png';

function EmergencySheltersFormPage() {
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
      const formsRef = collection(db, 'forms/Personnel Training and Awareness/Emergency Shelters');
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
            <h1>Emergency Shelters Assessment</h1>
            <img src={logo} alt="Logo" className="logo" />
        </header>

        <main className="form-container">
            <form onSubmit={handleSubmit}>
                {/* 3.3.2.2.1 Emergency Shelters */}
                <h2>Availability and Accessibility:</h2>
                <div className="form-section">
                    <label>Are there agreements or partnerships established with local emergency shelters to provide assistance in the event of community-wide emergencies, disasters, or evacuations?</label>
                    <div>
                        <input type="text" name="shelterAgreements" placeholder="Describe the agreements/partnerships" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>How are emergency shelters identified, selected, and vetted as suitable resources for providing temporary housing, support services, and basic necessities to individuals or families affected by emergencies or disasters?</label>
                    <div>
                        <input type="text" name="shelterIdentificationCriteria" placeholder="Describe how they're identified" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>What criteria are considered when assessing the accessibility, capacity, and readiness of emergency shelters to accommodate diverse populations, including individuals with disabilities, medical needs, or language barriers?</label>
                    <div>
                        <input type="text" name="shelterAccessibilityCriteria" placeholder="Describe the criteria" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Collaborative Planning and Preparedness:</h2>
                <div className="form-section">
                    <label>How do schools coordinate with local emergency management agencies, government entities, or nonprofit organizations to incorporate emergency sheltering plans into broader community preparedness efforts?</label>
                    <div>
                        <input type="text" name="emergencyCoordination" placeholder="Describe how they coordinate" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are joint tabletop exercises, drills, or simulations conducted periodically to test the effectiveness of emergency sheltering protocols, logistics, and communication procedures between schools and community partners?</label>
                    <div>
                        <input type="radio" name="emergencyDrills" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="emergencyDrills" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>What mechanisms are in place to ensure ongoing communication, coordination, and mutual aid agreements between schools, emergency shelters, and other stakeholders involved in emergency response and recovery operations?</label>
                    <div>
                        <input type="text" name="communicationCoordinationMechanisms" placeholder="Describe the mechanisms" onChange={handleChange}/>  
                    </div>
                </div>
                
                <h2>Resource Allocation and Support Services:</h2>
                <div className="form-section">
                    <label>How are resources allocated and mobilized to support emergency sheltering operations, including staffing, supplies, equipment, and facilities management?</label>
                    <div>
                        <input type="text" name="resourceAllocationMechanisms" placeholder="Describe the mechanisms" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are contingency plans developed to address potential challenges or gaps in resources, such as shortages of shelter space, specialized medical equipment, or essential supplies during prolonged emergencies or mass evacuations?</label>
                    <div>
                        <input type="text" name="contingencyPlans" placeholder="Describe the plans" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>What support services or accommodations are available at emergency shelters to meet the diverse needs of evacuees, including access to food, water, sanitation facilities, medical care, mental health support, and social services?</label>
                    <div>
                        <input type="text" name="shelterSupportServices" placeholder="Describe the services/accommodations" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Community Engagement and Outreach:</h2>
                <div className="form-section">
                    <label>How are community members informed about the availability, location, and operational status of emergency shelters during emergencies or disasters?</label>
                    <div>
                        <input type="text" name="communityShelterInformation" placeholder="Describe how they're informed" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are outreach efforts conducted to raise awareness, provide guidance, and encourage individuals and families to make informed decisions about seeking shelter, evacuation, or other protective actions in response to imminent threats or hazards?</label>
                    <div>
                        <input type="radio" name="shelterAwarenessOutreach" value="yes" onChange={handleChange}/> Yes
                        <input type="radio" name="shelterAwarenessOutreach" value="no" onChange={handleChange}/> No
                    </div>
                </div>

                <div className="form-section">
                    <label>What strategies are employed to promote inclusivity, cultural competence, and accessibility in emergency sheltering services to ensure equitable access and support for vulnerable populations?</label>
                    <div>
                        <input type="text" name="shelterInclusivityStrategies" placeholder="Describe the strategies" onChange={handleChange}/>  
                    </div>
                </div>

                <h2>Continuous Improvement and Evaluation:</h2>
                <div className="form-section">
                    <label>How is the effectiveness of emergency sheltering operations evaluated, monitored, and reviewed after incidents or exercises to identify lessons learned, best practices, and areas for improvement?</label>
                    <div>
                        <input type="text" name="shelterEffectivenessEvaluation" placeholder="Describe the effectiveness" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>Are feedback mechanisms in place to solicit input from evacuees, shelter staff, volunteers, and other stakeholders to assess the quality, responsiveness, and satisfaction with emergency sheltering services?</label>
                    <div>
                        <input type="text" name="feedbackMechanisms" placeholder="Describe the mechanisms" onChange={handleChange}/>  
                    </div>
                </div>

                <div className="form-section">
                    <label>What steps are taken to incorporate feedback, address identified challenges, and enhance the resilience, efficiency, and effectiveness of emergency sheltering systems within the community?</label>
                    <div>
                        <input type="text" name="shelterImprovementActions" placeholder="Describe the effectiveness" onChange={handleChange}/>  
                    </div>
                </div>

                <button type='submit'>Submit</button>
            </form>
        </main>
    </div>
  )
}

export default EmergencySheltersFormPage;