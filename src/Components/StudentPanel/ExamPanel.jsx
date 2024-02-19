import React, { useState, useEffect, useRef } from 'react';
import "../../Style/StudentPanelStyle/ExamPanelStyle.css";
import { useNavigate, useLocation  } from 'react-router-dom';
import * as faceapi from 'face-api.js';
import { FaceMesh } from "@mediapipe/face_mesh";
import * as cam from "@mediapipe/camera_utils";
import Webcam from "react-webcam";
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
  const [isWebcamReady, setWebcamReady] = useState(false);
  const [refreshcam,setrefreshcam]=useState(0);
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
  }, []);
  //----------------------------------------------


  const navigate = useNavigate();
  let Submitcount=5;

 
  useEffect(() => {
    // const loadFaceApi = async () => {
    //   await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
    //   await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
    //   await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
    //   await faceapi.nets.tinyYolov2.loadFromUri('/models');
    // };

    const requestMediaPermissions = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }    
        setCameraAllowed(true);
        setMicrophoneAllowed(true);

        // Removed code related to creating a new video element, as it seems unnecessary

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
          }

          requestAnimationFrame(checkNoise);
        };

        checkNoise();

      } catch (error) {
        console.error('Error accessing camera and microphone:', error);
        // Handle error, show a message to the user, etc.
      }
    };

    const checkPermissionsAndInitialize = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setCameraAllowed(true);
        setMicrophoneAllowed(true);
        setWebcamReady(true);
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
    const listItems = document.querySelectorAll('.question-list li');
    listItems[currentQuestionIndex].style.backgroundColor = 'green';
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
    };
  
    window.addEventListener('resize', handleResize);
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  //for camera
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  let camera = null;
  const handlerefreshcam =()=>{
    setrefreshcam((pre)=>pre+1);
    console.log(refreshcam);
      }
  useEffect(() => {
    const initializeCameraAndFaceMesh = async () => {
      const faceMesh = new FaceMesh({
        locateFile: (file) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
        },
      });

      faceMesh.setOptions({
        maxNumFaces: 50,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      faceMesh.onResults(onResults);

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setCameraAllowed(true);
        setMicrophoneAllowed(true);
        setWebcamReady(true);

        if (webcamRef.current) {
          webcamRef.current.srcObject = stream;
        }

       const onFrame= async () => {
         if (webcamRef.current) {
    await faceMesh.send({ image: webcamRef.current.video });
  }
        },
        camera = new cam.Camera(webcamRef.current?.video, {
          onFrame,
          width: 640,
          height: 480,
        });

        camera.start();
      } catch (error) {
        console.error('Error accessing camera and microphone:', error);
        // Handle error, show a message to the user, etc.
      }
    };

    if (webcamRef.current) {
      initializeCameraAndFaceMesh();
    }
  }, [refreshcam]);

  const onResults = (results) => {
    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;
  
    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;
  
    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(
      results.image,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );
  
    if (results.multiFaceLandmarks) {
      console.log(`Number of faces detected: ${results.multiFaceLandmarks.length}`);
    }
  };


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
     
  <center  className="small-screen"> 
<button className="refCambutton" onClick={handlerefreshcam}>Refresh Cam</button>
          <div >
            <Webcam
              ref={webcamRef}
              style={{
                textAlign: "center",
                zIndex: 9,
                width: "300px",
                height: "auto",
                display: "none",
              }}
            />
            <canvas
              ref={canvasRef}
              className="output_canvas"
              style={{
                zIndex: 9,
                width: "300px",
                height: "auto",
              }}
            ></canvas>
          </div>
        </center>


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
