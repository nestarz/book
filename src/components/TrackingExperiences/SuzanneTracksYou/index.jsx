import React from 'react';
import styled from 'styled-components';
import FaceDetection from 'components/FaceDetection';
import Scene from "components/Three/Cube";

const StyledScene = styled(Scene)`
width: 100%;
height: 100%;
`;
const Index = ({ width, height }) => {
    return (
        <FaceDetection>
            <StyledScene />
        </FaceDetection>
    )
};

export default Index;

Index.propTypes = {};
