import React, { useState, useEffect } from 'react';
import "../../Style/StudentPanelStyle/ExamPanelStyle.css";
import { useNavigate } from 'react-router-dom';
const questionsData = [
  {
    id: 1,
    question: 'What is the capital of France?',
    options: ['Paris', 'Berlin', 'London', 'Madrid'],
    correctAnswer: 'Paris',
  },
  {
    id: 2,
    question: 'Which programming language is React built with?',
    options: ['Java', 'JavaScript', 'Python', 'C++'],
    correctAnswer: 'JavaScript',
  },
  // Add more questions as needed
];

const ExamPanel = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timer, setTimer] = useState(900); // 15 minutes in seconds (900 seconds)
  const studentName = 'John Doe';
  const studentPrn = '12345';
  const navigate =useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleQuestionClick = (index) => {
    setCurrentQuestionIndex(index);
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswers((prevSelectedAnswers) => ({
      ...prevSelectedAnswers,
      [currentQuestionIndex]: answer,
    }));
  };

  const handleSubmit = () => {
    // Handle the submission logic here, you can check selected answers, etc.
    // You can use the selectedAnswers state to send data to the database
    console.log('Selected Answers:', selectedAnswers);
    alert('Exam Submitted!');
    navigate("/examsuccess");
  };

  useEffect(() => {
    if (timer <= 0) {
      handleSubmit(); // Automatically submit the exam when the timer reaches 0
    }
  }, [timer]);

  return (
    <div className="exam-panel">
      <div className="header">
        <div className="timer">Timer: {Math.floor(timer / 60)}:{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}</div>
        <div className="student-info">
          {studentName} - PRN: {studentPrn}
        </div>
      </div>

      <div className="question-list">
        <ul>
          {questionsData.map((question, index) => (
            <li
              key={question.id}
              onClick={() => handleQuestionClick(index)}
              className={index === currentQuestionIndex ? 'active' : ''}
            >
              {index + 1}
            </li>
          ))}
        </ul>
      </div>

      <div className="question-container">
        <h2>{questionsData[currentQuestionIndex].question}</h2>
        <div className="answer-options">
          {questionsData[currentQuestionIndex].options.map((option, index) => (
            <div key={index} className="option">
              <input
                type="radio"
                id={`option-${index}`}
                name="answer"
                value={option}
                checked={selectedAnswers[currentQuestionIndex] === option}
                onChange={() => handleAnswerSelect(option)}
              />
              <label htmlFor={`option-${index}`}>{option}</label>
            </div>
          ))}
        </div>
        <div className='button-save-next'>
          <button className='btn1'>Previous</button>
          <button className='btn2'> Save & Next</button>
        </div>
        </div>
      <div className="submit-button">
        <button onClick={handleSubmit}>Submit Exam</button>
      </div>
      <div className='button-warning'>Warnnig!!! Do not Click on Submit Button before giving answers of all questions</div>
    </div>
  );
};

export default ExamPanel;