import React, { useState } from 'react';
import '../../Style/StudentPanelStyle/Success.css';
import { useLocation, useNavigate } from 'react-router-dom';

function ExamTimeOver() {
  const [showPopup, setShowPopup] = useState(true);
  const [showThankYouMessage, setShowThankYouMessage] = useState(false);
const navigate=useNavigate();

const location = useLocation();
const { state } = location;
const { ExamName} = state || {};
  const handleClose = () => {
    setShowPopup(false);
    setShowThankYouMessage(true);
  };


  return (
    <>
      {showPopup && (
        <div className="exam-success-container alert alert-success">
          <button type="button" className="close" onClick={handleClose}>
            <span>&times;</span>
          </button>
          <h2 className="exam-success-text" style={{ color: 'green' }}>Exam Successfully completed...</h2>
          <div className="future-messages">
            <h6>Exam Name: {ExamName}</h6>
            <p>Dear student,</p>
            <p>This exam is already completed, kindly contact your organization for any issue.</p>
          </div>
        </div>
      )}
      {showThankYouMessage && (
        <div className="thank-you-message">
          <h1><i>Thank you!😊</i></h1>
        </div>
      )}
    </>
  );
}

export default ExamTimeOver;
