import logo from '../assets/MachaLogo.png';
import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './FormQuestions.css';  // Ensure this is linked to your universal CSS
import Navbar from "./Navbar";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


function StationedGuardsPage() {
  const navigate = useNavigate();  // Initialize useNavigate hook for navigation
  const [formData, setFormData] = useState({});
  const storage = getStorage();
  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadError, setUploadError] = useState(null);
 
  // Function to handle back button
  const handleBack = () => {
    navigate(-1);  // Navigates to the previous page

  };

  
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

  return (
    <div className="form-page">
      <header className="header">
            <Navbar />
        {/* Back Button */}
        <button className="back-button" onClick={handleBack}>←</button> {/* Back button at the top */}
        <h1>Stationed Guards Assessment</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="form-container">
        <form>
          {/* Guard Presence */}
          <h2>Guard Presence:</h2>
          <div className="form-section">
            <label>Are security guards stationed at designated entrances during all operational hours?</label>
            <div>
              <input type="radio" name="guards-stationed" value="yes" /> Yes
              <input type="radio" name="guards-stationed" value="no" /> No
              <textarea className='comment-box' name="guards-stationedComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Is there continuous coverage to ensure that entrances are monitored at all times?</label>
            <div>
              <input type="radio" name="continuous-coverage" value="yes" /> Yes
              <input type="radio" name="continuous-coverage" value="no" /> No
              <textarea className='comment-box' name="continuous-coverageComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Are there backup personnel or procedures in place to cover breaks or emergencies?</label>
            <div>
              <input type="radio" name="backup-personnel" value="yes" /> Yes
              <input type="radio" name="backup-personnel" value="no" /> No
              <textarea className='comment-box' name="backup-personnelComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          {/* Qualifications and Training */}
          <h2>Qualifications and Training:</h2>
          <div className="form-section">
            <label>Are stationed guards properly trained in security procedures, emergency response protocols, and customer service?</label>
            <div>
              <input type="radio" name="training-security-procedures" value="yes" /> Yes
              <input type="radio" name="training-security-procedures" value="no" /> No
              <textarea className='comment-box' name="training-security-proceduresComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Do they possess necessary certifications or licenses required for security personnel?</label>
            <div>
              <input type="radio" name="certifications" value="yes" /> Yes
              <input type="radio" name="certifications" value="no" /> No
              <textarea className='comment-box' name="certificationsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Are guards trained in conflict resolution techniques to handle various situations professionally and effectively?</label>
            <div>
              <input type="radio" name="conflict-resolution" value="yes" /> Yes
              <input type="radio" name="conflict-resolution" value="no" /> No
              <textarea className='comment-box' name="conflict-resolutionComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          {/* Observation and Vigilance */}
          <h2>Observation and Vigilance:</h2>
          <div className="form-section">
            <label>Do stationed guards actively monitor entrances for unauthorized access, suspicious behavior, or security breaches?</label>
            <div>
              <input type="radio" name="monitor-entrances" value="yes" /> Yes
              <input type="radio" name="monitor-entrances" value="no" /> No
              <textarea className='comment-box' name="monitor-entrancesComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Are they trained to recognize and respond to potential threats, including individuals attempting to bypass security measures?</label>
            <div>
              <input type="radio" name="recognize-threats" value="yes" /> Yes
              <input type="radio" name="recognize-threats" value="no" /> No
              <textarea className='comment-box' name="recognize-threatsComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Are guards equipped with communication devices to alert response teams or authorities in case of emergencies?</label>
            <div>
              <input type="radio" name="communication-devices" value="yes" /> Yes
              <input type="radio" name="communication-devices" value="no" /> No
              <textarea className='comment-box' name="communication-devicesComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          {/* Access Control */}
          <h2>Access Control:</h2>
          <div className="form-section">
            <label>Do stationed guards enforce access control policies, verifying credentials and authorizing entry for authorized personnel?</label>
            <div>
              <input type="radio" name="enforce-access-control" value="yes" /> Yes
              <input type="radio" name="enforce-access-control" value="no" /> No
              <textarea className='comment-box' name="enforce-access-controlComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Are they trained to challenge individuals without proper identification or authorization?</label>
            <div>
              <input type="radio" name="challenge-unauthorized" value="yes" /> Yes
              <input type="radio" name="challenge-unauthorized" value="no" /> No
              <textarea className='comment-box' name="challenge-unauthorizedComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Do guards conduct thorough inspections of bags, packages, or vehicles entering the premises?</label>
            <div>
              <input type="radio" name="inspection-conduct" value="yes" /> Yes
              <input type="radio" name="inspection-conduct" value="no" /> No
              <textarea className='comment-box' name="inspection-conductComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          {/* Customer Assistance and Interaction */}
          <h2>Customer Assistance and Interaction:</h2>
          <div className="form-section">
            <label>Are stationed guards trained to provide assistance to visitors, employees, and contractors entering the premises?</label>
            <div>
              <input type="radio" name="assist-customers" value="yes" /> Yes
              <input type="radio" name="assist-customers" value="no" /> No
              <textarea className='comment-box' name="assist-customersComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Do they greet individuals in a professional and courteous manner while maintaining security awareness?</label>
            <div>
              <input type="radio" name="professional-greeting" value="yes" /> Yes
              <input type="radio" name="professional-greeting" value="no" /> No
              <textarea className='comment-box' name="professional-greetingComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Are guards trained to handle inquiries, provide directions, and offer assistance as needed?</label>
            <div>
              <input type="radio" name="handle-inquiries" value="yes" /> Yes
              <input type="radio" name="handle-inquiries" value="no" /> No
              <textarea className='comment-box' name="handle-inquiriesComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          {/* Emergency Response Preparedness */}
          <h2>Emergency Response Preparedness:</h2>
          <div className="form-section">
            <label>Are stationed guards trained to respond quickly and effectively to security incidents, medical emergencies, or other crises?</label>
            <div>
              <input type="radio" name="emergency-response" value="yes" /> Yes
              <input type="radio" name="emergency-response" value="no" /> No
              <textarea className='comment-box' name="emergency-responseComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Do they know emergency procedures, evacuation routes, and protocols for contacting emergency services?</label>
            <div>
              <input type="radio" name="know-evacuation" value="yes" /> Yes
              <input type="radio" name="know-evacuation" value="no" /> No
              <textarea className='comment-box' name="know-evacuationComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Are guards equipped with necessary first aid supplies or emergency response equipment?</label>
            <div>
              <input type="radio" name="first-aid" value="yes" /> Yes
              <input type="radio" name="first-aid" value="no" /> No
              <textarea className='comment-box' name="first-aidComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          {/* Communication and Coordination */}
          <h2>Communication and Coordination:</h2>
          <div className="form-section">
            <label>Is there effective communication between stationed guards and other security personnel, as well as with management and staff?</label>
            <div>
              <input type="radio" name="effective-communication" value="yes" /> Yes
              <input type="radio" name="effective-communication" value="no" /> No
              <textarea className='comment-box' name="effective-communicationComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Are guards trained to coordinate with response teams, law enforcement agencies, and emergency services during critical incidents?</label>
            <div>
              <input type="radio" name="coordinate-response" value="yes" /> Yes
              <input type="radio" name="coordinate-response" value="no" /> No
              <textarea className='comment-box' name="coordinate-responseComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="form-section">
            <label>Is there a centralized communication system or protocol for relaying information and coordinating responses?</label>
            <div>
              <input type="radio" name="centralized-communication" value="yes" /> Yes
              <input type="radio" name="centralized-communication" value="no" /> No
              <textarea className='comment-box' name="centralized-communicationComment" placeholder="Comment (Optional)" onChange={handleChange}></textarea>
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
  );
}

export default StationedGuardsPage;