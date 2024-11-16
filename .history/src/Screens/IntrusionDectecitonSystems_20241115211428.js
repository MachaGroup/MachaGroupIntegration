import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './AccessControl.css'; // Reuse the same CSS file for consistency in styling
import logo from '../assets/MachaLogo.png'; // Adjust the path relative to the current file location

function IntrusionDetectionSystemsPage() {
    const navigate = useNavigate(); // Initialize useNavigate

    const handleButtonClick = (section) => {
        console.log(`Button clicked for: ${section}`);
        // Navigate to the respective section's page
        switch (section) {
            case 'Network Anomaly Detection':
                navigate('/NetworkAnomalyDetection');
                break;
            case 'Signature-Based Detection':
                navigate('/SignatureBasedDetection');
                break;
            default:
                console.error('Unknown section:', section);
        }
    };

    return (
        <div className="form-page">
            {/* Header Section */}
            <header className="header">
                <button className="back-button" onClick={() => navigate(-1)}>←</button> {/* Use navigate(-1) for back navigation */}
                <h1>The MACHA Group</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            {/* Intrusion Detection Systems Section */}
            <main className="form-container">
                <h2>Intrusion Detection Systems</h2>
                <form>
                    {/* Intrusion Detection Systems Buttons */}
                    {['Network Anomaly Detection', 'Signature-Based Detection'].map((section, index) => (
                        <div key={index} className="form-section">
                            <label>{section}</label>
                            <button
                                type="button"
                                className="form-button"
                                onClick={() => handleButtonClick(section)}
                            >
                                Enter Here
                            </button>
                        </div>
                    ))}
                </form>
            </main>
        </div>
    );
}

export default IntrusionDetectionSystemsPage;
