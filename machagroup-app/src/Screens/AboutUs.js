import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import './AboutUs.css';  // Ensure the CSS file exists
import logo from '../assets/MachaLogo.png';  // Adjust the path as needed

function AboutUs() {
  const navigate = useNavigate();  // Initialize useNavigate hook

  const handleBack = () => {
    navigate(-1);  // Navigate back to the previous page
  };

  return (
    <div className="about-page">
      {/* Header Section */}
      <header className="header">
        <button className="back-button" onClick={handleBack}>←</button>
        <h1>The MACHA Group</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      {/* About Us Section */}
      <main className="about-container">
        <h2>About Us</h2>

        <section className="about-content">
          <h3>Established – 2023</h3>
          <ul>
            <li>Bobby Lambert – Retired Military</li>
            <li>Travis Valley – Active Military</li>
            <li>Schuyler Moran – USC COE IT Alumni</li>
          </ul>

          <h3>Focus</h3>
          <p>
            Focus on the standardization of Safety and Protection for public
            buildings / gathering spaces and procedural requirements.
          </p>

          <h3>Purpose</h3>
          <p>
            <strong>Identified Problem:</strong> Tons of federal, state, and
            local laws, standards and requirements (regulations) governing
            safety and protection of public buildings / gathering spaces.
          </p>
          <p>
            <strong>Solution:</strong> Develop a streamlined mechanism with the
            ability to efficiently query a massive number of regulations and
            quickly identify what's Required, Recommended, and Prohibited. This
            analysis will provide the questions needed for Assessors to
            determine if public buildings / gathering spaces comply and provide
            recommendations for non-compliance.
          </p>
        </section>
      </main>
    </div>
  );
}

export default AboutUs;

