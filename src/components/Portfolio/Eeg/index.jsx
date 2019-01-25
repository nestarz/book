import React, { useRef, useState, useEffect } from 'react';
import styled from "styled-components";
import { Wrapper, Info } from '../styles';
import eeg1 from "./img/DSC04416.jpg";
import eeg2 from "./img/DSC04416.jpg";
import eeg3 from "./img/DSC04416.jpg";
import eeg4 from "./img/DSC04437.jpg";

const LocalWrapper = styled(Wrapper)`
grid-template-areas: "pic1 pic1 pic2 pic2" "pic1 pic1 pic5 pic5" "pic4 pic4 pic5 pic5";
`;

const Index = () => {
    return (
        <LocalWrapper>
            <img src={eeg1} />
            <img src={eeg2} />
            <img src={eeg3} />
            <img src={eeg4} />
            <Info>
                <h1>Thinking Clay</h1>
                In the spirit of generative neural network art, I hacked together a quick and dirty script that attempts to generate random art pieces by randomly assigning weights to a not-so-shallow neural network using p5.js and recurrent.js libraries, just to see what can get drawn randomly without any training of the network.
            </Info>
        </LocalWrapper>
    )
};

export default Index;

Index.propTypes = {};
