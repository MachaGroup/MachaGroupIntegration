import React, { useState } from 'react';
import { getAuth, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/MachaLogo.png';
import './PrivacyAndSecurity.css';

function PrivacyAndSecurity() {
    const navigate = useNavigate();
    const auth = getAuth();

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [reenterPassword, setReenterPassword] = useState('');

    const [authSettings, setAuthSettings] = useState({
        authToggle: false,
        twoFactorAuth: false,
        rememberDevice: false
    });

    const handleBack = () => {
        navigate(-1);
    };

    const handleSave = async () => {
        if (!auth.currentUser) {
            alert('No user is logged in.');
            return;
        }

        if (newPassword !== reenterPassword) {
            alert("New password and re-entered password do not match.");
            return;
        }

        try {
            const credential = EmailAuthProvider.credential(auth.currentUser.email, currentPassword);
            await reauthenticateWithCredential(auth.currentUser, credential);
            await updatePassword(auth.currentUser, newPassword);
            alert("Password successfully updated!");
        } catch (error) {
            alert(`Error updating password: ${error.message}`);
        }

        setCurrentPassword('');
        setNewPassword('');
        setReenterPassword('');
    };

    const toggleSetting = (setting) => {
        setAuthSettings((prev) => ({
            ...prev,
            [setting]: !prev[setting]
        }));
    };

    return (
        <div className="change-password-page">
            <header className="header">
                <button className="back-button" onClick={handleBack}>←</button>
                <h1 className="title">The MACHA Group</h1>
                <img src={logo} alt="Logo" className="logo" />
            </header>

            <main className="password-container">
                <h2>Privacy & Security</h2>

                <div className="form-group">
                    <label>Current Password</label>
                    <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Enter current password"
                    />
                </div>

                <div className="form-group">
                    <label>New Password</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                    />
                </div>

                <div className="form-group">
                    <label>Re-enter New Password</label>
                    <input
                        type="password"
                        value={reenterPassword}
                        onChange={(e) => setReenterPassword(e.target.value)}
                        placeholder="Re-enter new password"
                    />
                </div>

                <button className="save-button" onClick={handleSave}>Confirm</button>

                <h3>Authentication Settings</h3>

                <div className="toggle-group">
                    <div className="toggle-item">
                        <span>Turn On/Off Authentication Settings</span>
                        <button className={`toggle-btn ${authSettings.authToggle ? 'active' : ''}`} onClick={() => toggleSetting('authToggle')}>
                            {authSettings.authToggle ? 'On' : 'Off'}
                        </button>
                    </div>

                    <div className="toggle-item">
                        <span>Add Two-Factor Authentication</span>
                        <button className={`toggle-btn ${authSettings.twoFactorAuth ? 'active' : ''}`} onClick={() => toggleSetting('twoFactorAuth')}>
                            {authSettings.twoFactorAuth ? 'On' : 'Off'}
                        </button>
                    </div>

                    <div className="toggle-item">
                        <span>Remember On This Device</span>
                        <button className={`toggle-btn ${authSettings.rememberDevice ? 'active' : ''}`} onClick={() => toggleSetting('rememberDevice')}>
                            {authSettings.rememberDevice ? 'On' : 'Off'}
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default PrivacyAndSecurity;
