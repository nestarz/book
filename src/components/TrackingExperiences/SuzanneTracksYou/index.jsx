import React from 'react';
import styled from 'styled-components';
import FaceDetection from 'components/FaceDetection';
import Scene from "components/Three/Cube";
import EmotionalFace from "components/EmotionalFace";

const StyledScene = styled(Scene)`
width: 100%;
height: 100%;
`;
const StyledEmotionalFace = styled(EmotionalFace)`
position: absolute;
right: 1vw;
bottom: 5vw;
height: 10vw;
width: 10vw;
`;
const Index = ({ width, height }) => {
    return (
        <FaceDetection>
            <StyledScene />
            <StyledEmotionalFace />
        </FaceDetection>
    )
};

export default Index;

Index.propTypes = {};
