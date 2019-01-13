import React, { useState, useEffect, useRef } from 'react';
import theme from '../../../config/theme';
import styled from 'styled-components';
import Layout from 'components/Layout';
import Webcam from "react-webcam";
import ContainerDimensions from 'react-container-dimensions'

import Stats from 'react-canvas-stats';
import { canny, threshold } from "components/OpenCV/opencv_functions/filters";
import face2 from "./fausse3Dimgs/3Dfaces_2.png";

const Face = styled.div`
background-size: cover;
position: absolute;
top:0;
left:0;
right:0;
bottom: 0;
mix-blend-mode: difference;
background-color: #3CD670;
opacity: 1;
overflow: hidden;
`;
const Face2 = styled(Face)`
mix-blend-mode: lighten; 
`;
const Wrapper = styled.div`
    flex-grow: 1;
    color: white;
    h1 {
        z-index: 1;
    }
    &, & > div {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;
        flex-direction: column;
        flex: 1;
    }
    & > div {
        flex-direction: row;
        justify-content: space-around;
        align-items: space-around;
        width: 100%;
        .videoContainer {
            @media screen and (orientation:portrait) { width: 49.5vmin; }
            @media screen and (orientation:landscape) { width: 49.5vmin; } 
            video {
                height: 100%;
            }          
        }
    }
`;

function videoDimensions(video) {
    // Ratio of the video's intrisic dimensions
    var videoRatio = video.videoWidth / video.videoHeight;
    // The width and height of the video element
    var width = video.offsetWidth, height = video.offsetHeight;
    // The ratio of the element's width to its height
    var elementRatio = width / height;
    // If the video element is short and wide
    if (elementRatio > videoRatio) width = height * videoRatio;
    // It must be tall and thin, or exactly equal to the original ratio
    else height = width / videoRatio;
    return {
        width: width ? width : video.width,
        height: height ? height : video.height
    };
}

function onOpenCvReady(inputVideo, outputCanvas) {
    let video = inputVideo.video;
    let scaledVideo = videoDimensions(video);
    console.log(video.height, video.width, scaledVideo.height, scaledVideo.width);
    let src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
    let dst = new cv.Mat(video.height, video.width, cv.CV_8UC1);
    let cap = new cv.VideoCapture(video);
    const FPS = 28;
    function processVideo() {
        let streaming = true;
        if (!streaming) {
            // clean and stop.
            src.delete();
            dst.delete();
            return;
        }
        if (src.cols != video.width || src.rows != video.height) {
            scaledVideo = videoDimensions(video);
            src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
            dst = new cv.Mat(scaledVideo.height, scaledVideo.width, cv.CV_8UC1);
        }
        let begin = Date.now();
        // start processing.
        cap.read(src);
        cv.resize(src, src, new cv.Size(30, scaledVideo.height));
        cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);
        //dst = threshold(dst, dst, 60);
        dst = canny(src, dst, 100, 100, 3, false);
        cv.resize(dst, dst, new cv.Size(scaledVideo.width, scaledVideo.height));
        cv.imshow(outputCanvas, dst);
        // schedule the next one.
        let delay = 1000 / FPS - (Date.now() - begin);
        setTimeout(processVideo, delay);
    };
    // schedule the first one.
    setTimeout(processVideo, 100);
}

const Index = () => {
    let webcamRef = useRef();
    let canvasOutputRef = useRef();
    let [openCvRunning, setOpenCvRunning] = useState(false);
    let [cameraRunning, setCameraRunning] = useState(false);
    let [cameraReady, setCameraReady] = useState(false);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "/assets/js/opencv.js";
        script.async = true;
        script.onload = () => setOpenCvRunning(true)
        document.body.appendChild(script);
        console.log("opencv appended !")
    }, []);

    useEffect(() => {
        if (openCvRunning && cameraRunning) {
            if (webcamRef.current.video.readyState > 3) {
                onOpenCvReady(webcamRef.current, canvasOutputRef.current);
            } else {
                webcamRef.current.video.oncanplay = function () {
                    onOpenCvReady(webcamRef.current, canvasOutputRef.current);
                };
            }
        } else {
            console.log(`opencv:${openCvRunning}, webcam:${cameraRunning}`)
        }
    }, [openCvRunning, cameraRunning])

    return (
        <Layout theme={theme}>
            <Wrapper>
                <div>
                    <div className={"videoContainer"}>
                        <ContainerDimensions>
                            {parent => (
                                <Webcam
                                    ref={webcamRef}
                                    onUserMedia={() => setCameraRunning(true)}
                                    onUserMediaError={() => setCameraRunning(false)}
                                    width={parent.width}
                                />
                            )
                            }
                        </ContainerDimensions>
                    </div>
                    <canvas ref={canvasOutputRef} />
                    <Face2 />
                    <div>
                    <h1>En Clair ou Crypté ?</h1>
                    <h5>Nécessite une caméra. C'est tout.</h5>
                    </div>
                </div>
            </Wrapper>
        </Layout>
    )
};

export default Index;

Index.propTypes = {};
