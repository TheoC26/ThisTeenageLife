"use client";
import { useState, useEffect } from 'react';
import { db } from "@/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import Image from 'next/image';

const EmailPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(''); // 'success', 'error', or ''
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('hasSeenEmailPopup');
    if (!hasSeenPopup) {
      // Wait a second before showing the popup
      setTimeout(() => {
        setShowPopup(true);
      }, 1000);
    }
  }, []);

  const validateEmail = (email) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset status
    setStatus('');
    setErrorMessage('');

    // Validate email format
    if (!validateEmail(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address');
      return;
    }

    try {
      // Check if email already exists
      const docRef = doc(db, "subscribers", email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setStatus('error');
        setErrorMessage('This email is already subscribed');
        return;
      }

      // Add email to Firestore
      await setDoc(docRef, {
        email: email,
        subscribedAt: new Date()
      });

      setStatus('success');
      localStorage.setItem('hasSeenEmailPopup', 'true');
      
      // Close popup after success
      setTimeout(() => {
        setShowPopup(false);
      }, 2000);

    } catch (error) {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
      console.error("Error adding subscriber:", error);
    }
  };

  if (!showPopup) return null;

  return (
    <div className="email-popup-overlay">
      <div className="email-popup">
        <button 
          className="close-button"
          onClick={() => {
            setShowPopup(false);
            localStorage.setItem('hasSeenEmailPopup', 'true');
          }}
        >
          ×
        </button>

        <div className="popup-content">
          <Image 
            src="/TTL-Mouth/ttlLogoFull.png"
            alt="TTL Logo"
            width={200}
            height={100}
            className="popup-logo"
          />
          <h2>Join Our Community!</h2>
          <p>Subscribe to get updates about new episodes and teen-created content.</p>
          
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={status}
            />
            <button type="submit">Subscribe</button>
          </form>

          {status === 'success' && (
            <div className="status-message success">
              Thanks for subscribing! 🎉
            </div>
          )}
          
          {status === 'error' && (
            <div className="status-message error">
              {errorMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailPopup; 