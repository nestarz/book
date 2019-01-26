import React, { useRef, useState, useEffect } from 'react';
import styled from "styled-components";
import Scene from "components/Filaments/Suzanne";
import { PageA3_Paysage } from '../../../styles/print';
import { Wrapper, Info } from '../styles';

const LocalWrapper = styled(Wrapper)`
`;
const CustomInfo = styled(Info)`
`;
const SceneGrid = styled(Scene)`
grid-column: auto /span 4 !important;
grid-row: auto /span 2 !important;
`;

const Index = () => {
    return (
        <LocalWrapper>
            <PageA3_Paysage />
            <SceneGrid />
            <CustomInfo>
                <h1>Rendering in Javascript</h1>
                In the spirit of generative neural network art, I hacked together a quick and dirty script that attempts to generate random art pieces by randomly assigning weights to a not-so-shallow neural network using p5.js and recurrent.js libraries, just to see what can get drawn randomly without any training of the network.
            </CustomInfo>
        </LocalWrapper>
    )
};

export default Index;

Index.propTypes = {};
