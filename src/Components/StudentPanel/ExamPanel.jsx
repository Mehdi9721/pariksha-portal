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
];

const ExamPanel = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [selectedAnswerStyle, setSelectedAnswerStyle] = useState({});
  const [timer, setTimer] = useState(900);
  const studentName = 'Mohammad Mehdi';
  const studentPrn = '12345';
  const navigate = useNavigate();

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

    setSelectedAnswerStyle((prevSelectedAnswerStyle) => ({
      ...prevSelectedAnswerStyle,
      [currentQuestionIndex]: 'green',
    }));
  };

  const handleSubmit = () => {
    console.log('Selected Answers:', selectedAnswers);
    alert('Exam Submitted!');
    navigate("/examsuccess");
  };

  useEffect(() => {
    if (timer <= 0) {
      handleSubmit();
    }
  }, [timer]);

  const handleFinalSubmit = () => {
    const confirmSubmit = window.confirm('Are you sure you want to submit the exam?');

    if (confirmSubmit) {
      handleSubmit();
    }
  };

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
            <div
              key={index}
              className={`option ${selectedAnswerStyle[currentQuestionIndex] === 'green' ? 'selected' : ''}`}
            >
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
          <button className='btn1' onClick={() => handleQuestionClick(Math.max(currentQuestionIndex - 1, 0))}>
            Previous!!
          </button>
          <button className='btn2' onClick={() => handleQuestionClick(Math.min(currentQuestionIndex + 1, questionsData.length - 1))}>
            Next!!
          </button>
        </div>
      </div>
      <div className="submit-button">
        <button onClick={handleFinalSubmit}>Submit Exam</button>
      </div>
      <div className='button-warning'>Warning!!! Do not Click on Submit Button before giving answers to all questions</div>
    </div>
  );
};

export default ExamPanel;
