import React, { useState } from 'react';
import '../../Style/StudentPanelStyle/Success.css';
import { useLocation, useNavigate } from 'react-router-dom';

function ExamSuccess() {
  const [showPopup, setShowPopup] = useState(true);
  const [showThankYouMessage, setShowThankYouMessage] = useState(false);
const navigate=useNavigate();

const location = useLocation();
const { state } = location;
const { examId, adminId } = state || {};

  const handleClose = () => {
    setShowPopup(false);
    setShowThankYouMessage(true);
    setTimeout(() => {
      navigate(`/studentLogin/${examId}/${adminId}`);
    },200);
  
  };


  return (
    <>
      {showPopup && (
        <div className="exam-success-container alert alert-success">
          <button type="button" className="close" onClick={handleClose}>
            <span>&times;</span>
          </button>
          <h2 className="exam-success-text" style={{ color: 'green' }}>Exam Successfully submitted...</h2>
          <div className="future-messages">
            <p>Dear student,</p>
            <p>Congratulations on completing your exam successfully! This is just one step on your journey of learning and growth.</p>
            <p>Remember to stay curious, keep exploring, and never stop learning. Embrace challenges as opportunities for growth and improvement.</p>
            <p>Believe in yourself, set ambitious goals, and work hard to achieve them. Your efforts today will shape your future tomorrow.</p>
            <p>Best wishes for your future endeavors!</p>
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

export default ExamSuccess;
