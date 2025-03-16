import React from 'react';
import './AccessControl.css'; // Reuse the same CSS file for consistency in styling
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import logo from '../assets/MachaLogo.png';  // Adjust the path relative to the current file location
/**/
function FirewallConfigurationPage() { // Fixed typo in component name
    const navigate = useNavigate(); // Initialize useNavigate

    const handleButtonClick = (section) => {
        switch (section) {
            case 'Access Control Lists':
                navigate('/AccessControlLists');
                break;
            case 'Firewall Policies':
                navigate('/FirewallPolicies');
                break;
            default:
                console.error('Unknown section');
        }
    };

    return (
        <div className="form-page">
            {/* Header Section */}
            <header className="header">
                <button className="back-button" onClick={() => navigate(-1)}>←</button> {/* Updated to use navigate(-1) */}
                <h1>The MACHA Group</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            {/* Firewall Configuration Section */}
            <main className="form-container">
                <h2>Firewall Configuration</h2>
                <form>
                    {/* Firewall Configuration Buttons */}
                    {['Access Control Lists', 'Firewall Policies'].map((section, index) => (
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

export default FirewallConfigurationPage;
