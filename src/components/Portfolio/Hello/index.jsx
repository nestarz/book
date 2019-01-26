import React, { useRef, useState, useEffect } from 'react';
import styled from "styled-components";
//import OpenCvWebcam from "components/OpenCV/webcam";
//import startOpenCvProgram from "components/OpenCV/basic";
import Webcam from "react-webcam";
import VisitCard from 'components/VisitCard';
import startOpenCvProgram from "components/OpenCV/basic";
import { PageA3_Paysage } from '../../../styles/print';
import { Wrapper, Info } from '../styles';

const StyledVisitCard = styled(VisitCard)`
.verso, .recto {
border: 1px solid black;
margin: 5mm;
mix-blend-mode: darken;
overflow: hidden;
width: 25vw;
height: 15.4vw;
font-size: 1.2vw;
}
.verso {
    position: absolute;
    left: 0;
    top: 0;
}
.recto {
    position: absolute;
    right: 0;
    bottom: 0;
}
`;

const VideoHolder = styled.div`
position: relative;
video {
    border: 1px solid black;
}
&:after,
&:before {
    background-color: #d63c3c;
    position: absolute;
    bottom: 0;
    left: 0;
    top: 0;
    right: 0;
    content: 'WELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOME';
    word-break: break-word;
    mix-blend-mode: color;
    font-size: 1vw;
    line-height: 1vw;
    z-index: 1;
}
&:after {
    mix-blend-mode: lighten;
    z-index: 2;
    line-height: 2vw;
}
`;

const LocalWrapper = styled(Wrapper)`
grid-template-areas: ". . . . . . . . . . . . . . . . ." ". . . . . . . . . . . . . . . . ." ". . . . . . . . . . . . . . . . ." ". . . . . . . . . . . . . . . . ." ". . . . . . . . . . . . . . . . ." ". . . . . . . . . . . . . . . . ." ". . . . . . . . . . . . . . . . ." ". . . . . . . . . . . . . . . . ." ". . . . . . . . . . . . . . . . ." ". . . . . . . . . . . . . . . . ." ". . . . . . . . . . . . . . . . ." ". . . . . . . . . . . . . . . . ." ". . . . . . . . . . . . . . . . ." ". . . . . . . . . . . . . . . . ." ". . . . . . . . . . . . . . . . ." ". . . . . . . . . . . . . . . . ." ". . . . . . . . . . . . . . . . .";
`;

const Index = () => {
    let canvasOutputRef = useRef(),
        buttonToggleStopRef = useRef(),
        OpenCvWebcamRef = useRef();
    let [stopped, setStopped] = useState(false);
    return (
        <LocalWrapper>
            <PageA3_Paysage />
            <StyledVisitCard mode={Math.floor(Math.random() * 4)} />
            <VideoHolder>
                <Webcam
                    ref={OpenCvWebcamRef}
                    startOpenCvProgram={startOpenCvProgram}
                    canvasOutputRef={canvasOutputRef}
                    buttonToggleStopRef={buttonToggleStopRef}
                    webcamWidth={"10vw"}
                />
            </VideoHolder>
        </LocalWrapper>
    )
};

export default Index;

Index.propTypes = {};
