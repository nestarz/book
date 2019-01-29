import React from 'react';
import styled from "styled-components";
import ContainerDimensions from "react-container-dimensions";
import FaceDetection from 'components/FaceDetection';
import Suzanne from "../Suzanne";

const Wrapper = styled.div`
height: 100vh;
width: 100vw;
`;
const Index = () => {
    let wrapperRef = useRef(null)
    let wrapperSize = useComponentSize(wrapperRef)
    return (
        <Wrapper ref={wrapperRef}>
            <FaceDetection>
                <Suzanne width={wrapperSize.width} height={wrapperSize.height} />
            </FaceDetection>
        </Wrapper>
    )
};

export default Index;

Index.propTypes = {};
