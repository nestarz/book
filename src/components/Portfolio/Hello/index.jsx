import React, { useRef, useState, useEffect } from 'react';
import styled from "styled-components";
//import OpenCvWebcam from "components/OpenCV/webcam";
//import startOpenCvProgram from "components/OpenCV/basic";
import Webcam from "react-webcam";
import VisitCard from 'components/VisitCard';
import startOpenCvProgram from "components/OpenCV/basic";
import { PageA3_Paysage } from '../../../styles/print';
import { Wrapper, Info } from '../styles';
import {useGeolocation} from 'react-use';

const StyledVisitCard = styled(VisitCard)`
.verso, .recto {
border: 1px solid black;
mix-blend-mode: darken;
overflow: hidden;
font-size: 1.2vw;
}
.verso {
    margin-bottom: 5mm;
}
`;

const VideoHolder = styled.div`
position: relative;
object-fit: cover;
width: 100%;
height: 100%;
overflow: hidden;
filter: saturate(1.6);
border: 1px solid black;
grid-column: 5;
grid-row: auto /span 2;
video {
    transform: rotate(90deg);
    object-fit: cover;
    width: 100%;
    height: 100%;
    overflow: hidden;
}
&:after,
&:before {
    background-color: #d63c3c;
    position: absolute;
    bottom: 0;
    left: 0;
    top: 0;
    right: 0;
    word-break: break-word;
    content: '';
    mix-blend-mode: lighten;
    font-size: 1vw;
    line-height: 1vw;
    z-index: 1;
}
&:after {
    mix-blend-mode: hue;
    z-index: 2;
    content: '${props => props.content.repeat(1000)}';
    line-height: 1vw;
    background-color: green;
}
`;

const LocalWrapper = styled(Wrapper)`
`;

const Index = () => {
    let canvasOutputRef = useRef(),
        buttonToggleStopRef = useRef(),
        OpenCvWebcamRef = useRef();
    let [stopped, setStopped] = useState(false);
    const state = useGeolocation();
    console.log(state);
    return (
        <LocalWrapper>
            <PageA3_Paysage />
            <StyledVisitCard mode={Math.floor(Math.random() * 4)} />
            <VideoHolder content={state.longitude + "°"}>
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
