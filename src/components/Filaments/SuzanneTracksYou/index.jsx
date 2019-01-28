import React, { useRef, useState, useEffect } from 'react';
import styled from "styled-components";
import Webcam from "react-webcam";
import { useVideo, useHover } from 'react-use';
import * as faceapi from 'face-api.js';
import Suzanne from "../Suzanne";

const Wrapper = styled.div`
position: relative;
video {
    object-fit: cover;
}
span, button {
    position: absolute;
    bottom: 10px;
    left: 10px;
    z-index: 999;
    background-color: white;
    border: 1px solid;
    padding: 0.5vw 1vw;
}
button {
    bottom: 6vw;
}
`;
const VideoContainer = styled.div`
position: absolute;
width: 100%;
height: 100%;
overflow: hidden;
top: 0;
bottom: 0;
right: 0;
left: 0;
pointer-events: none;
mix-blend-mode: darken;
filter: grayscale(1);
`;
const OverlayCanvas = styled.canvas`
position: absolute;
bottom: 0;
right: 0;
width: 100%;
height: 100%;
left: 0;
top: 0;
`;

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
    const buttonToggleStopRef = useRef();
    const overlayCanvasRef = useRef();
    const [video, state, controls, videoRef] = useVideo(
        <video width={"100%"} height={"100%"} autoPlay loop>
            <source src="/assets/videos/evgeny_morozov.mp4"
                type="video/mp4"/>
        </video>
    );
    const [cameraRunning, setCameraRunning] = useState(false);
    const [videoFallback, setVideoFallback] = useState(false);
    const [modelReady, setModelReady] = useState(false);
    const [detections, setDetections] = useState(null);
    const [lookAtX, setLookAtX] = useState(null);
    const [lookAtY, setLookAtY] = useState(null);
    const [input, setInput] = useState(null);
    const SuzanneElt = (hovered) => (<div>
        <Suzanne width={width} height={height} lookAtX={lookAtX} lookAtY={lookAtY} />
    </div>)
    const [SuzanneEltHoverable, hovered] = useHover(SuzanneElt);
    useEffect(() => {
        if (controls) hovered ? controls.unmute() : controls.mute()
        console.log(hovered);
    }, [hovered])
    useEffect(() => {
        loadModel().then(w => setModelReady(true))
    }, []);
    useEffect(() => {
        if (webcamRef.current && cameraRunning) {
            console.log("1? assigning input to", webcamRef.current.video)
            setInput(webcamRef.current.video);
        }
        else if (state.isPlaying) {
            console.log("2? assigning input to", videoRef.current)
            setInput(videoRef.current)
            controls.mute();
        }
    }, [cameraRunning, webcamRef.current, state.isPlaying])
    useEffect(() => {
        if (cameraRunning) setVideoFallback(false);
        else setVideoFallback(true);
    }, [cameraRunning])
    useEffect(() => {
        if (input && modelReady) {
            setInterval(async () => {
                await fetchFaces(input)
                    .then(detections => setDetections(detections))
                    .catch(err => console.log("error", err))
            }, interval);
        }
    }, [modelReady, input]);
    useEffect(() => {
        if (detections && typeof input !== 'undefined' && input.offsetWidth != 0 && input.offsetHeight != 0) {
            setLookAtX((detections.relativeBox.x + detections.relativeBox.width) / 2)
            setLookAtY((detections.relativeBox.y + detections.relativeBox.height) / 2)
            // resize the detected boxes in case your displayed image has a different size then the original
            const canvas = overlayCanvasRef.current;
            const detectionsForSize = faceapi.resizeResults(detections, { width: input.offsetWidth, height: input.offsetHeight })
            // draw them into a canvas
            canvas.width = input.offsetWidth
            canvas.height = input.offsetHeight
            faceapi.drawDetection(canvas, detectionsForSize, { withScore: true })
            //faceapi.drawLandmarks(canvas, detectionsForSize, { drawLines: true })
        }
        if (detections && (typeof input == 'undefined' || input.offsetWidth == 0 || input.offsetHeight == 0)){
            console.error("typeof input == 'undefined' || offsetHeight==0 || offsetWidth==0")
        }
    }, [detections])
    return (
        <Wrapper>
            {SuzanneEltHoverable}
            <VideoContainer>
                {!videoFallback && <Webcam
                    ref={webcamRef}
                    onUserMedia={() => setCameraRunning(true)}
                    onUserMediaError={() => setCameraRunning(false)}
                    width={"100%"}
                    height={"100%"}
                />}
                {videoFallback && video}
                <OverlayCanvas ref={overlayCanvasRef}/>
            </VideoContainer>
            <span>{hovered ? "Audio playing..." : "Hover to play audio!" }</span>
            <button ref={buttonToggleStopRef} onClick={() => setCameraRunning(!cameraRunning)}>{cameraRunning ? "Démarrer" : "Stopper"}</button>
        </Wrapper>
    )
};

export default Index;

Index.propTypes = {};
