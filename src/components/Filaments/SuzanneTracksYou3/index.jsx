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
    return (
        <Wrapper>
            <ContainerDimensions>
                {parent =>
                    <FaceDetection>
                        <Suzanne width={parent.width} height={parent.height} />
                    </FaceDetection>
                }
            </ContainerDimensions>
        </Wrapper>
    )
};

export default Index;

Index.propTypes = {};
