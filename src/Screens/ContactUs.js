import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './ContactUs.css'; // Ensure you create this CSS file
import logo from '../assets/MachaLogo.png'; // Ensure the correct logo path
import { addDoc, collection, Timestamp } from '@firebase/firestore';
import {firestore} from "../firebaseConfig";

function ContactUs() {
  const navigate = useNavigate();  // Initialize useNavigate hook
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const companyRef = useRef();
  const subjectRef = useRef();
  const messageRef = useRef();
  const ref = collection(firestore, 'contact-us');

  const handleBack = () => {
    navigate(-1);  // Navigate back to the previous page
  };

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    let data = {
      FirstName: firstNameRef.current.value,
      LastName: lastNameRef.current.value,
      Email: emailRef.current.value,
      Company: companyRef.current.value,
      Subject: subjectRef.current.value,
      Message: messageRef.current.value,
      Timestamp: Timestamp.now(),
    }
 
    try {
      addDoc(ref, data);
      navigate('/Main')
    } catch(e) {
      console.log(e)
    }
  };

  return (
    <div className="contact-us-page">
      {/* Header Section */}
      <header className="header">
        <button className="back-button" onClick={handleBack}>←</button>
        <h1 className="title">The MACHA Group</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      {/* Contact Us Form */}
      <main className="form-container">
        <h2>Contact Us</h2>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              type="text"
              ref={firstNameRef}
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              required
            />
            <input
              type="text"
              ref={lastNameRef}
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              required
            />
          </div>

          <div className="form-row">
            <input
              type="email"
              ref={emailRef}
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
            />
          </div>

          <div className="form-row">
            <input
              type="text"
              ref={companyRef}
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Your Company"
            />
            <div className="file-upload">
              <label htmlFor="fileUpload">File Attachment</label>
              <input type="file" id="fileUpload" />
            </div>
          </div>

          <div className="form-row">
            <input
              type="text"
              ref={subjectRef}
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              required
            />
          </div>

          <div className="form-row">
            <textarea
              name="message"
              ref={messageRef}
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="5"
              required
            ></textarea>
          </div>

          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </main>
    </div>
  );
}

export default ContactUs;