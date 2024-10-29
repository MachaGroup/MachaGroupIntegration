import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import './FAQ.css'; // Ensure this links to your CSS file
import logo from '../assets/MachaLogo.png'; // Ensure this is the correct path

function FAQ() {
  const [question, setQuestion] = useState(''); // Add useState hook
  const navigate = useNavigate();  // Initialize useNavigate hook

  const handleInputChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleBack = () => {
    navigate(-1);  // Navigate back to the previous page
  };

  return (
    <div className="FAQ">
      {/* Header Section */}
      <header className="header">
        {/* Back Button */}
        <button className="back-button" onClick={handleBack}>←</button>
        <h1 className="title">The MACHA Group</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      {/* FAQ Section */}
      <main className="FAQ-container">
        <h2>Frequently Asked Questions</h2>

        <p>
          Hello! Got any questions? If so, this is the place to be. Please see the frequently
          asked questions below, and if you have a specific question, contact us!
        </p>

        {/* FAQ Placeholder */}
        <div className="faq-placeholder">
          QUESTIONS GO HERE
        </div>

        {/* Input Container */}
        <div className="input-container">
          <textarea
            value={question}
            onChange={handleInputChange}
            className="question-input"
            placeholder="Type your question here..."
          />
        </div>

        {/* Contact Us Button */}
        <button className="contact-button">Contact Us</button>
      </main>
    </div>
  );
}

export default FAQ;
