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

function onOpenCvReady(webcam, canvasFrame) {
    let video = webcam.video;
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
            let begin = Date.now();
            // start processing.
            cap.read(src);
            cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);
            cv.imshow(canvasFrame, dst);
            // schedule the next one.
            let delay = 1000 / FPS - (Date.now() - begin);
            setTimeout(processVideo, delay);
        } catch (err) {
            console.log(err);
            //utils.printError(err);
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
                />
                <canvas ref={canvasOutputRef} width={640} height={425} />
            </Wrapper>
        </Layout>
    )
};

export default Index;

Index.propTypes = {};
