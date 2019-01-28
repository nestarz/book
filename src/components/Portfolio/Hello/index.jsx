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
import { convertToTesserae } from '../../../styles/fonts';

const StyledVisitCard = styled(VisitCard)`
.verso, .recto {
    border: 1px solid black;
    mix-blend-mode: darken;
    overflow: hidden;
    width: 100%;
    height: calc(50% - 2.5mm);
    padding: 3.89% 3.89%;
}
.verso {
    margin-bottom: 5mm;
}
.name {
    font-size: 1.5vw;
}
.cv_contact {
    font-size: 1vw;
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
    background-color: #3CD670;
    position: absolute;
    bottom: 0;
    left: -10vw;
    top: 0;
    right: -10vw;
    word-break: break-word;
    content: '';
    mix-blend-mode: color;
    font-size: 3vw;
    text-align:center;
    line-height: 1vw;
    z-index: 1;
}
&:after {
    mix-blend-mode: darken;    
    z-index: 2;
    content: ' ${props => props.content} ';
    line-height: 2.25vw;
    background-color: #3CD670;
    word-break: break-all;
    font-family: "Tesserae";
    padding: 0;
    margin: 0;
}
`;

const LocalWrapper = styled(Wrapper)`
`;


const Index = ({lg}) => {
    let canvasOutputRef = useRef(),
        buttonToggleStopRef = useRef(),
        OpenCvWebcamRef = useRef();
    //const geoLocation = useGeolocation();
    const randomChars = () => Array.from({length: 40}, () => Math.random()).join('');
    const xGlyphs = convertToTesserae(randomChars(), "0123456789.");
    const yGlyphs = convertToTesserae(randomChars(), "0123456789.");
    return (
        <LocalWrapper>
            <PageA3_Paysage />
            <StyledVisitCard lg={lg} mode={Math.floor(Math.random() * 4)} />
            <VideoHolder content={`${xGlyphs} ${yGlyphs}`}>
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
