import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/MachaLogo.png'; // Adjust this path if necessary

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const auth = getAuth();

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        if (!email) {
            setMessage('Please enter your email address.');
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            setMessage('Password reset email sent! Check your inbox.');
        } catch (error) {
            console.error('Error sending password reset email:', error);
            setMessage('Error sending password reset email. Please try again.');
        }
    };

    return (
        <div className="forgot-password-page">
            <header className="header">
                <img src={logo} alt="Logo" className="logo" />
            </header>
            <main className="forgot-password-container">
                <h2>Forgot Password</h2>
                <p>Enter your email address to reset your password.</p>
                <form onSubmit={handlePasswordReset}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <button type="submit" className="reset-button">Send Reset Email</button>
                </form>
                {message && <p className="message">{message}</p>}
                <button className="back-button" onClick={() => navigate('/login')}>
                    Back to Login
                </button>
            </main>
        </div>
    );
}

export default ForgotPassword;
