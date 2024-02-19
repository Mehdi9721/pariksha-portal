import React, { useState, useEffect, useRef } from 'react';
import "../../Style/StudentPanelStyle/ExamPanelStyle.css";
import { useNavigate, useLocation  } from 'react-router-dom';
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
  const location = useLocation();
  const { state } = location;
  const { studentName, studentPrn } = state || {};

  const videoRef=useRef(); 
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [selectedAnswerStyle, setSelectedAnswerStyle] = useState({});
  const [timer, setTimer] = useState(900);
  const [warningCount, setWarningCount] = useState(0);
  const [isCameraAllowed, setCameraAllowed] = useState(false);
  const [isMicrophoneAllowed, setMicrophoneAllowed] = useState(false);
  const [isNoiseHigh, setIsNoiseHigh] = useState(false);
  const [noiseWarningCount, setNoiseWarningCount] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  //const videoRef = useRef();
  const timeForFullScreen = useRef(null);


  const handleFullScreenClick = () => {
    if (!isFullScreen) {
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement);
    };
    if (isFullScreen) {
      clearTimeout(timeForFullScreen.current);
    }
    document.addEventListener('fullscreenchange', handleFullScreenChange);
    document.addEventListener('mozfullscreenchange', handleFullScreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullScreenChange);
    document.addEventListener('msfullscreenchange', handleFullScreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullScreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullScreenChange);
      document.removeEventListener('msfullscreenchange', handleFullScreenChange);
    };
  }, [isFullScreen]);

  useEffect(() => {
    if (!isFullScreen) {
      timeForFullScreen.current = setTimeout(() => {
        handleSubmit();
      }, 6000);
    }
    return () => {
      clearTimeout(timeForFullScreen.current);
    };
  }, [isFullScreen]);
  //----------------------------------------------


  const navigate = useNavigate();
  let Submitcount=5;
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

// i have removed this becouse user was listening his own voice
        // const video = document.createElement('video');
        // video.srcObject = stream;
        // video.play();
        // const cameraContainer = document.getElementById('camera-container');
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
          const noiseThreshold = 200; // change this on need
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
      const message = 'You want to leave the page? Your progress may be lost.';
      event.returnValue = message;
      return message;
    };

    
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        setWarningCount((prevCount) => prevCount + 1);
        alert('Warning!!!!  Exam Tab was not open');
        // changes made
        const timeoutId = setTimeout(() => {
          handleSubmit();
        }, 4000);
        const clearTimer = () => {
          clearTimeout(timeoutId);
        };
        document.addEventListener('visibilitychange', clearTimer);
        setTimeout(() => {
          document.removeEventListener('visibilitychange', clearTimer);
        }, 4000);
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
    const confirmSubmit = window.confirm('Do you want to submit the exam?');

    if (confirmSubmit) {
      handleSubmit();
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWarningCount((prevCount) => prevCount + 1);
      //alert('Changes detected on Screen Size. warning!!!!');
        //changes made
//         setTimeout(() => {
//           Submitcount--;
//         }, 4000);
// if(Submitcount<=0){
//   handleSubmit();
// }else{
//   Submitcount=5;
// }
   
    };
  
    window.addEventListener('resize', handleResize);
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={`exam-panel ${isFullScreen ? 'full-screen' : ''}`}>
      {isFullScreen ? (
        <div>
        <div className="header">
          <div className="timer">Timer: {Math.floor(timer / 60)}:{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}</div>
          <div className='warningCount'> Warning count: {warningCount} NoiseCount: {noiseWarningCount} </div>
          <div className="student-info">
            {studentName} - PRN: {studentPrn}
          </div>
        </div>

        <video ref={videoRef} autoPlay muted width={500} height={500}></video>
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
      ) : (
        <div className='before-screen'>
        <div className="fullscreen-button">
          <button onClick={handleFullScreenClick}>Enter Full Screen</button>
          
          <p> Welcome to the exam platform! Before you begin, please ensure a smooth experience by following these instructions. Click on the designated "Enter Full Screen" button to optimize your exam view. Failure to do so may affect your ability to start the exam. Additionally, grant permission for both the camera and microphone when prompted, as these are essential for exam monitoring. Please be advised that the exam will automatically submit if you switch tabs during the test. Ensure a stable and distraction-free
             environment to make the most of your exam session. Good luck!</p>

        </div>
        </div>
      )}
    </div>
  );
};

export default ExamPanel;