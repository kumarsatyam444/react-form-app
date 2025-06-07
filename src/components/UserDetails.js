import React from 'react';
import './UserDetails.css';

const UserDetails = ({ userData, onBackToForm }) => {
  if (!userData) {
    return (
      <div className="details-container">
        {/* Floating Shapes */}
        <div className="floating-shapes">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>

        <div className="no-data">
          <h2>No user data found</h2>
          <button onClick={onBackToForm} className="back-btn">
            Go Back to Form
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="details-container">
      {/* Floating Shapes */}
      <div className="floating-shapes">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div className="details-wrapper">
        <div className="success-header">
          <div className="success-icon">✅</div>
          <h2>Registration Successful!</h2>
          <p>Your details have been submitted successfully.</p>
        </div>

        <div className="details-card">
          <h3>User Information</h3>
          
          <div className="details-grid">
            <div className="detail-item">
              <label>Full Name:</label>
              <span>{userData.firstName} {userData.lastName}</span>
            </div>

            <div className="detail-item">
              <label>Username:</label>
              <span>{userData.username}</span>
            </div>

            <div className="detail-item">
              <label>Email:</label>
              <span>{userData.email}</span>
            </div>

            <div className="detail-item">
              <label>Phone Number:</label>
              <span>{userData.countryCode} {userData.phoneNumber}</span>
            </div>

            <div className="detail-item">
              <label>Country:</label>
              <span>{userData.country}</span>
            </div>

            <div className="detail-item">
              <label>City:</label>
              <span>{userData.city}</span>
            </div>

            <div className="detail-item">
              <label>PAN Number:</label>
              <span>{userData.panNo}</span>
            </div>

            <div className="detail-item">
              <label>Aadhar Number:</label>
              <span>{userData.aadharNo}</span>
            </div>
          </div>

          <div className="action-buttons">
            <button onClick={onBackToForm} className="back-btn">
              Register Another User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
