import React, { useRef, useState } from 'react';

const CameraComponent = () => {
  const videoRef = useRef();
  const [accessDenied, setAccessDenied] = useState(false);

  const handleStartCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      videoRef.current.srcObject = stream;
    } catch (error) {
      if (error.name === 'NotAllowedError') {
        console.error('Permission denied by user.');
        setAccessDenied(true);
      } else {
        console.error('Error accessing camera and microphone:', error);
      }
    }
  };

  return (
    <div>
      <button onClick={handleStartCapture}>Start Capture</button>
      {accessDenied && <p>Access to camera and microphone denied by the user.</p>}
      {<video ref={videoRef} autoPlay muted playsInline />}
    </div>
  );
};

export default CameraComponent;
