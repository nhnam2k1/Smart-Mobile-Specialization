import React, { useState } from 'react';
import Webcam from 'react-webcam';
import { useNavigate } from "react-router-dom";

import './App.css';

const apiKey = process.env.REACT_APP_GCLOUD;
const visionAPI = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

const FACING_MODE_ENVIRONMENT = "environment";

const CAPTURE_OPTIONS = {
  audio: false,
  video: {
    facingMode: FACING_MODE_ENVIRONMENT,
    width: 720,
    height: 1280,
  },
};

function App() {
  const webcamRef = React.useRef(null);
  let navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [zoom, setZoom] = useState(1);

  const capture = React.useCallback(() => {
    const base64ImageData = webcamRef.current.getScreenshot();
    const imgContent = base64ImageData.replace('data:image/jpeg;base64,', '');
    const requestPayload = {
        requests: [
          {
            image: { content: imgContent },
            features: [
              {
                type: 'LABEL_DETECTION', maxResults: 5
              },
              {
                type: "LOGO_DETECTION", maxResults: 5
              },
            ]
          }
        ]
    };
    
    fetch(visionAPI, {
        method: 'POST',
        body: JSON.stringify(requestPayload)
    })
    .then(response => response.json())
    .then(result => {
        let labelAnnotations = result.responses[0].labelAnnotations;
        let logoAnnotations = result.responses[0].logoAnnotations;
        navigate("/search", {
            replace: false,
            state : {labelAnnotations, logoAnnotations}
        });
    })
    .catch(err => {
        console.log(err);
        alert("Something went wrong with the camera or it is not recognizable, please try again");
    });
  }, [webcamRef]);

  const handleTouchMove = (event) => {
      if (event.touches.length === 2) {
          const distance = Math.hypot(
            event.touches[0].clientX - event.touches[1].clientX,
            event.touches[0].clientY - event.touches[1].clientY
          );
          setZoom(Math.max(1, Math.min(distance / 100, 3)));
      }
  };

  return (
    <div className="camera-container">
        <div className="header-bar">
            <h2>Camera</h2>
        </div>
        <div className="camera-view" onTouchMove={handleTouchMove}>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{...CAPTURE_OPTIONS.video}}
              style={{
                  transform: `scale(${zoom})`,
                  width: "100vw",
                  height: "100vh",
                  objectFit: "cover",
              }}
            />
        </div>
        <div className="bottom-bar">
            <button className="capture-button" onClick={capture}></button>
        </div>
    </div>
  );
}

export default App;