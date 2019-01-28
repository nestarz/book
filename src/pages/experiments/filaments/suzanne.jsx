import React, { useRef, useState } from 'react';
import styled from "styled-components";
import ContainerDimensions from 'react-container-dimensions'
import Layout from "components/Layout";
import SuzanneTracksYou from "components/TrackingExperiences/SuzanneTracksYou";

const Wrapper = styled.div`
height: 100vh;
width: 100vw;
max-height: 100vh;
max-width: 100vw;
`;
const Index = () => {
    return (
        <Layout>
            <Wrapper>
                <ContainerDimensions>
                    {parent => <SuzanneTracksYou width={parent.width} height={parent.height} />}
                </ContainerDimensions>
            </Wrapper>
        </Layout>
    )
};

export default Index;

Index.propTypes = {};
