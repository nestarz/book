import React, { useRef, useState, useEffect } from 'react';
import styled from "styled-components";
import Scene from "components/Filaments/Suzanne";
import { PageA3_Paysage } from '../../../styles/print';
import { Wrapper, Info } from '../styles';

const LocalWrapper = styled(Wrapper)`
grid-template-areas: "pic1 pic1 pic2 pic2" "pic1 pic1 pic5 pic5" "pic4 pic4 pic5 pic5";
`;

const CustomInfo = styled(Info)`
position: absolute;
top: 2vw;
right: 2vw;
`;

const Index = () => {
    return (
        <LocalWrapper>
            <PageA3_Paysage />
            <Scene />
            <CustomInfo>
                <h1>Rendering in Javascript</h1>
                In the spirit of generative neural network art, I hacked together a quick and dirty script that attempts to generate random art pieces by randomly assigning weights to a not-so-shallow neural network using p5.js and recurrent.js libraries, just to see what can get drawn randomly without any training of the network.
            </CustomInfo>
        </LocalWrapper>
    )
};

export default Index;

Index.propTypes = {};
