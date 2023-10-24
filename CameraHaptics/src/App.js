import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import './App.css';

import ClassicClickSound from "./Sounds/mixkit-classic-click.wav";
import CameraShutterSound from "./Sounds/mixkit-camera-shutter-click.wav";

import FrontCamara from "./img/front-camera.png";
import VideoCameraMode from "./img/video-camera.png";
import CameraMode from "./img/camera.png";

const FACING_MODE_USER = "user";
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
    const webcamRef = useRef(null);
    
    const [zoom, setZoom] = useState(1);
    const [facingMode, setFacingMode] = React.useState(FACING_MODE_USER);
    const [picureMode, setPicureMode] = React.useState(true);
    const [capturedImage, setCapturedImage] = useState(null);
    const [showPreview, setShowPreview] = useState(false);

    const cameraShutterSound = new Audio(CameraShutterSound);
    const classicClickSound = new Audio(ClassicClickSound);

    useEffect(() => {
        cameraShutterSound.loop = false;
        classicClickSound.loop = false;
        cameraShutterSound.muted = true;
    }, []);

    useEffect(() => {
        if (showPreview === false) return;
        if (cameraShutterSound.muted) cameraShutterSound.muted = false;
        window.navigator.vibrate(100);
        cameraShutterSound.play();
    }, [showPreview]);
    
    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setCapturedImage(imageSrc);
        setShowPreview(true);
        setTimeout(() => setShowPreview(false), 3000);
    }, [webcamRef]);

    const changeCameraFrontRear = React.useCallback(() => {
        setFacingMode( prevState =>
            prevState === FACING_MODE_USER
              ? FACING_MODE_ENVIRONMENT
              : FACING_MODE_USER
        );
        if (classicClickSound.muted) classicClickSound.muted = false;
        window.navigator.vibrate(100);
        classicClickSound.play();
    }, []);

    const changeCameraPhotoVideo = React.useCallback(() => {
        setPicureMode(prevState => !prevState);
        if (classicClickSound.muted) classicClickSound.muted = false;
        window.navigator.vibrate(50);
        classicClickSound.play();
    }, []);

    const handleTouchMove = (event) => {
        if (event.touches.length === 2) {
            const distance = Math.hypot(
              event.touches[0].clientX - event.touches[1].clientX,
              event.touches[0].clientY - event.touches[1].clientY
            );
            setZoom(Math.max(1, Math.min(distance / 100, 3)));
            window.navigator.vibrate(50);
        }
    };

    return (
      <div className="camera-container">
        <div className="header-bar">
            <h2>Camera Haptics</h2>
        </div>
        <div className="camera-view" onTouchMove={handleTouchMove}>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{...CAPTURE_OPTIONS.video, facingMode}}
              style={{
                transform: `scale(${zoom})`,
                width: "100vw",
                height: "100vh",
                objectFit: "cover",
              }}
            />
        </div>
        {showPreview && 
        <div className="preview-layer">
            <img src={capturedImage} alt="" className="preview-image" />
        </div>}
        <div className="bottom-bar">
            <button className="capture-button-small" onClick={changeCameraFrontRear}>
                <img src={FrontCamara} alt="" className="preview-image" />   
            </button>
            <button className="capture-button" onClick={capture}></button>
            <button className="capture-button-small" onClick={changeCameraPhotoVideo}>
                <img src={picureMode ? CameraMode : VideoCameraMode} alt="" className="preview-image" />  
            </button>
        </div>
    </div>
  );
}

export default App;