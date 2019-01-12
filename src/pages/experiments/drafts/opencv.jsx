import React, { useEffect, useRef } from 'react';
import theme from '../../../../config/theme';
import styled from 'styled-components';
import Layout from 'components/Layout';
import Webcam from "react-webcam";

const Wrapper = styled.div`
display: flex;
flex-wrap: wrap;
flex-grow: 1;
justify-content: center;
align-items: center;
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
        width: width,
        height: height
    };
}

function onOpenCvReady(inputVideo, outputCanvas) {
    let video = inputVideo.video;
    let scaledVideo = videoDimensions(video);
    let src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
    let dst = new cv.Mat(video.height, video.width, cv.CV_8UC1);
    let cap = new cv.VideoCapture(video);
    const FPS = 30;
    function processVideo() {
        let streaming = true;
        try {
            if (!streaming) {
                // clean and stop.
                src.delete();
                dst.delete();
                return;
            }
            if (src.cols != video.width || src.rows != video.height) {
                src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
                dst = new cv.Mat(video.height, video.width, cv.CV_8UC1);
                scaledVideo = videoDimensions(video);
            }
            let begin = Date.now();
            // start processing.
            cap.read(src);
            cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);
            cv.resize(dst, dst, new cv.Size(scaledVideo.width, scaledVideo.height));
            cv.imshow(outputCanvas, dst);
            // schedule the next one.
            let delay = 1000 / FPS - (Date.now() - begin);
            setTimeout(processVideo, delay);
        } catch (err) {
            console.log(err);
        }
    };
    // schedule the first one.
    setTimeout(processVideo, 0);
}

const Index = () => {

    let webcamRef = useRef();
    let canvasOutputRef = useRef();

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://docs.opencv.org/master/opencv.js";
        script.async = true;
        script.onload = () => onOpenCvReady(webcamRef.current, canvasOutputRef.current);
        document.body.appendChild(script);
    }, []);

    return (
        <Layout theme={theme}>
            <Wrapper>
                <p>Basic Example. Copy Me.</p>
                <Webcam
                    ref={webcamRef}
                    width={200}
                />
                <canvas ref={canvasOutputRef} />
            </Wrapper>
        </Layout>
    )
};

export default Index;

Index.propTypes = {};
