import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import './Pricing.css';  // Link the CSS file for styling
import logo from '../assets/MachaLogo.png';  // Adjust the path relative to the current file location

const PricingPage = () => {
  const navigate = useNavigate();  // Initialize useNavigate hook

  const handleBack = () => {
    navigate(-1);  // Navigate back to the previous page
  };

  return (
    <div className="pricing-container">
      {/* Header */}
      <header className="header">
        <button className="back-button" onClick={handleBack}>←</button>
        <h1 className="title">The MACHA Group</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>

      {/* Pricing Plans */}
      <section className="pricing-plans">
        <div className="pricing-card basic">
          <h2>Basic</h2>
          <h3>FREE</h3>
          <ul>
            <li>Building Rating</li>
            <li>Component Rating</li>
          </ul>
          <button className="get-started">Get Started</button>
        </div>

        <div className="pricing-card pro">
          <h2>Pro</h2>
          <h3>$$</h3>
          <ul>
            <li>Everything in Basic Tier</li>
            <li>Safety Breakdown</li>
            <li>Upgrade Recommendation</li>
          </ul>
          <button className="get-started">Get Started</button>
        </div>

        <div className="pricing-card personal">
          <h2>Personal</h2>
          <h3>$$$$</h3>
          <ul>
            <li>Everything in Pro Tier</li>
            <li>In-Person Assessment</li>
            <li>In-Person Rating</li>
            <li>Staff and Faculty Training</li>
          </ul>
          <button className="get-started">Get Started</button>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="comparison-table">
        <table>
          <thead>
            <tr>
              <th>Features</th>
              <th>Basic</th>
              <th>Pro</th>
              <th>Personal</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Building Rating</td>
              <td>✔</td>
              <td>✔</td>
              <td>✔</td>
            </tr>
            <tr>
              <td>Component Rating</td>
              <td>✔</td>
              <td>✔</td>
              <td>✔</td>
            </tr>
            <tr>
              <td>Safety Breakdown</td>
              <td></td>
              <td>✔</td>
              <td>✔</td>
            </tr>
            <tr>
              <td>Upgrade Recommendation</td>
              <td></td>
              <td>✔</td>
              <td>✔</td>
            </tr>
            <tr>
              <td>In-Person Assessment</td>
              <td></td>
              <td></td>
              <td>✔</td>
            </tr>
            <tr>
              <td>In-Person Rating</td>
              <td></td>
              <td></td>
              <td>✔</td>
            </tr>
            <tr>
              <td>Staff and Faculty Training</td>
              <td></td>
              <td></td>
              <td>✔</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default PricingPage;