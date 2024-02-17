import React, { useState, useEffect } from 'react';
import "../../Style/StudentPanelStyle/ExamPanelStyle.css";
import { useNavigate } from 'react-router-dom';
import * as faceapi from 'face-api.js';

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
  {
    id: 3, 
    question: 'What is the capital of Germany?',
    options: ['Berlin', 'Paris', 'London', 'Madrid'],
    correctAnswer: 'Berlin',
  },
  {
    id: 4,  
    question: 'Which programming language is Angular built with?',
    options: ['Java', 'JavaScript', 'Python', 'TypeScript'],
    correctAnswer: 'TypeScript',
  },
];

const ExamPanel = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [selectedAnswerStyle, setSelectedAnswerStyle] = useState({});
  const [timer, setTimer] = useState(900);
  const [warningCount, setWarningCount] = useState(0);
  const [isCameraAllowed, setCameraAllowed] = useState(false);
  const [isMicrophoneAllowed, setMicrophoneAllowed] = useState(false);
  const [isNoiseHigh, setIsNoiseHigh] = useState(false);
  const [noiseWarningCount, setNoiseWarningCount] = useState(0);
  const studentName = 'Mohammad Mehdi';
  const studentPrn = '12345';
  const navigate = useNavigate();

  useEffect(() => {
    const loadFaceApi = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
      await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
    };

    const requestMediaPermissions = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setCameraAllowed(true);
        setMicrophoneAllowed(true);
        const video = document.createElement('video');
        video.srcObject = stream;
        video.play();
       
        
        const cameraContainer = document.getElementById('camera-container');
        // cameraContainer.appendChild(video);

        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(stream);
        microphone.connect(analyser);

        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const checkNoise = () => {
          analyser.getByteFrequencyData(dataArray);
          const averageAmplitude = dataArray.reduce((acc, val) => acc + val, 0) / bufferLength;
          const noiseThreshold = 55; // change this on need
             console.log(averageAmplitude);
          setIsNoiseHigh(averageAmplitude > noiseThreshold);
          
          if (averageAmplitude > noiseThreshold) {
            console.log("yes noise is high");
            setNoiseWarningCount((prevCount) => prevCount + 1); 
            alert('High noise detected!');
          }

          requestAnimationFrame(checkNoise);
        };

        checkNoise();


        ////for faces
        const detectMotion = async () => {
          try {
            const video = document.querySelector('video');
            const canvas = faceapi.createCanvasFromMedia(video);
            const displaySize = { width: video.width, height: video.height };
            faceapi.matchDimensions(canvas, displaySize);
        
            document.getElementById('camera-container').appendChild(canvas);
        
            const motionThreshold = 0.5; // Adjust this value based on your needs
        
            const motionDetection = async () => {
              const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks();
              const motionDetected = detections.length > 0;
        
              console.log('Number of faces detected:', detections.length);
        
              if (motionDetected) {
                console.log('Motion detected!');
                // Trigger your warning logic here
              }
        
              faceapi.draw.drawDetections(canvas, detections.map(det => det.detection));
              faceapi.draw.drawFaceLandmarks(canvas, detections.map(det => det.landmarks));
        
              requestAnimationFrame(motionDetection);
            };
        
            video.addEventListener('play', motionDetection);
          } catch (error) {
            console.error('Error detecting motion:', error);
          }
        };
        
        detectMotion();
      } catch (error) {
        console.error('Error accessing camera and microphone:', error);
      }
    };

//above 

    const checkPermissionsAndInitialize = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setCameraAllowed(true);
        setMicrophoneAllowed(true);
        loadFaceApi();
        requestMediaPermissions();

      } catch (error) {
        console.error('Error accessing camera and microphone:', error);
        // Handle error, show a message to the user, etc.
      }
    };

    // Check permissions and initialize
    checkPermissionsAndInitialize();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const message = 'Are you sure you want to leave the page? Your progress may be lost.';
      event.returnValue = message;
      return message;
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        setWarningCount((prevCount) => prevCount + 1);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (warningCount === 4) {
      alert('Automatic submission due to excessive warnings.');
      handleSubmit();
    }
  }, [warningCount]);

  useEffect(() => {
    if (noiseWarningCount === 10) {
      alert('Automatic submission due to excessive warnings.');
      handleSubmit();
    }
  }, [noiseWarningCount]);

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
        <div className='warningCount'> Warning count: {warningCount} NoiseCount : {noiseWarningCount}</div>
        <div className="student-info">
          {studentName} - PRN: {studentPrn}
        </div>
      </div>

      {isCameraAllowed && isMicrophoneAllowed && (
        <div className="camera-container" id="camera-container"></div>
      )}

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
      <div className='button-warning'>
        Warning!!! Do not Click on Submit Button before giving answers to all questions.
      </div>
    </div>
  );
};

export default ExamPanel;
