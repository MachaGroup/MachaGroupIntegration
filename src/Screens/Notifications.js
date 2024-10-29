import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
//import './Notifications.css';  // Ensure this links to your CSS file
import logo from '../assets/MachaLogo.png';  // Adjust the path relative to the current file location

function Notifications() {
    const navigate = useNavigate(); // Initialize useNavigate hook

     // State to manage the toggles
    const [notificationsOn, setNotificationsOn] = useState(false);
    const [emailNotifications, setEmailNotifications] = useState(false);
    const [textNotifications, setTextNotifications] = useState(false);

    // Handle back navigation
    const handleBack = () => {
        navigate(-1);  // Navigate back to the previous page
      };
    
    // Toggle handler functions
    const toggleNotificationsOn = () => {
        setNotificationsOn(prevState => !prevState);
    };

    const toggleEmailNotifications = () => {
        setEmailNotifications(prevState => !prevState);
    };

    const toggleTextNotifications = () => {
        setTextNotifications(prevState => !prevState);
    };

    return (
        <div className="notification-page">
            {/* Header Section */}
            <header className="header">
                <button className="back-button" onClick={handleBack}>←</button>
                <h1 className="title">The MACHA Group</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>
        
        
            {/* Notifications Section */}
            <main className="notifications-container">
                <h2>Notifications</h2>

                <div className="notification-item">
                    <span>Notifications On / Off</span>
                    <button
                        id="notification-toggle"
                        name="notificationsToggle"
                        className={`toggle-btn ${notificationsOn ? 'active' : ''}`}
                            onClick={toggleNotificationsOn}
                            >
                            {notificationsOn ? 'On' : 'Off'}
                    </button>
                </div>
                <div className="notification-item">
                    <span>Email Notifications</span>
                    <button
                        id="email-toggle"
                        name="emailNotificationsToggle"
                        className={`toggle-btn ${emailNotifications ? 'active' : ''}`}
                            onClick={toggleEmailNotifications}
                            >
                            {emailNotifications ? 'On' : 'Off'}
                    </button>
                </div>
                <div className="notification-item">
                    <span>Text Notifications</span>
                    <button
                        id="text-toggle"
                        name="textNotificationsToggle"
                        className={`toggle-btn ${textNotifications ? 'active' : ''}`}
                        onClick={toggleTextNotifications}
                        >
                        {textNotifications ? 'On' : 'Off'}
                    </button>
                </div>

            </main>
        </div>
    );
    
}

export default Notifications;

