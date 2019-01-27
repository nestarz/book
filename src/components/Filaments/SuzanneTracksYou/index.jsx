import React, { useRef, useState, useEffect } from 'react';
import styled from "styled-components";
import Webcam from "react-webcam";
import * as faceapi from 'face-api.js';
import Suzanne from "../Suzanne";

const HiddenWebcam = styled(Webcam)`
position: absolute;
bottom: 10px;
right: 10px;
opacity: 0.4;
border: solid;
`;
const OverlayCanvas = styled.canvas`
position: absolute;
bottom: 10px;
right: 10px;`;

async function fetchFaces(input) {
    //console.log("detecting faces...");
    return await faceapi
    .detectSingleFace(input, new faceapi.TinyFaceDetectorOptions())
    //.withFaceLandmarks();
}

async function loadModel() {
    //console.log("loading model...")
    return await faceapi.loadTinyFaceDetectorModel('/assets/faceapi/models');
}

const Index = ({ width, height, interval = 200 }) => {
    const webcamRef = useRef();
    const overlayCanvasRef = useRef();
    const [cameraRunning, setCameraRunning] = useState(false);
    const [modelReady, setModelReady] = useState(false);
    const [detections, setDetections] = useState(null);
    const [lookAtX, setLookAtX] = useState(null);
    const [lookAtY, setLookAtY] = useState(null);
    useEffect(() => {
        loadModel().then(w => setModelReady(true))
    }, []);
    useEffect(() => {
        if (cameraRunning && modelReady) {
            setInterval(async () => {
                await fetchFaces(webcamRef.current.video)
                    .then(detections => setDetections(detections))
                    .catch(err => console.log("error", err))
            }, interval);
        }
    }, [modelReady, cameraRunning]);
    useEffect(() => {
        if (detections) {
            setLookAtX((detections.relativeBox.x + detections.relativeBox.width) / 2)
            setLookAtY((detections.relativeBox.y + detections.relativeBox.height) / 2)
            // resize the detected boxes in case your displayed image has a different size then the original
            const canvas = overlayCanvasRef.current;
            const input = webcamRef.current.video;
            const detectionsForSize = faceapi.resizeResults(detections, { width: input.width, height: input.height })
            // draw them into a canvas
            canvas.width = input.width
            canvas.height = input.height
            faceapi.drawDetection(canvas, detectionsForSize, { withScore: true })
            //faceapi.drawLandmarks(canvas, detectionsForSize, { drawLines: true })
        }
    }, [detections])
    return (
        <>
            x:{lookAtX}, y:{lookAtY}
            <HiddenWebcam
                ref={webcamRef}
                onUserMedia={() => setCameraRunning(true)}
                onUserMediaError={() => setCameraRunning(false)}
                width={640}
            />
            <Suzanne width={width} height={height} lookAt={lookAtX} />
            <OverlayCanvas ref={overlayCanvasRef}/>
        </>
    )
};

export default Index;

Index.propTypes = {};
