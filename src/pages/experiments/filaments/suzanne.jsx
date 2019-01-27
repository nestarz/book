import React, { useRef, useState } from 'react';
import styled from "styled-components";
import ContainerDimensions from 'react-container-dimensions'
import Layout from "components/Layout";
import Scene from "components/Filaments/SuzanneTracksYou";

const Wrapper = styled.div`
    height: 100vh;
    width: 100vw;
`;
const Index = () => {
    return (
        <Layout>
            <Wrapper>
                <ContainerDimensions>
                    {parent => <Scene width={parent.width} height={parent.height}/>}
                </ContainerDimensions>
            </Wrapper>
        </Layout>
    )
};

export default Index;

Index.propTypes = {};
