import React, { useRef, useState, useEffect } from 'react';
import styled from "styled-components";
import { Wrapper, Info } from '../styles';
import eeg7 from "./img/DSC04325.jpg";
import eeg4 from "./img/DSC04398.jpg";
import eeg3 from "./img/DSC04416.jpg";
import eeg2 from "./img/DSC04437.jpg";
import eeg5 from "./img/DSC04411.jpg";
import eeg1 from "./img/DSC04422.jpg";
import eeg6 from "./img/DSC04413.jpg";

const LocalWrapper = styled(Wrapper)`
    display: grid;
    grid-gap: 1vw;
    grid-template-columns: repeat(5, 1fr);
    grid-auto-rows: 10vw;
    counter-reset:div;
    padding:2vw;

    & > *:nth-child(6n + 4),
    & > *:nth-child(6n + 1) {
        grid-column: auto /span 2;
        grid-row: auto /span 2;
    }
    & > *:before {
        counter-increment:div;
        content:counter(div);
        margin:auto;
    }
    img {
        object-fit: cover;
        width: 100%;
        max-height: 100%;
    }
    & > img:nth-child(2n + 1) {
        &:hover {
            filter: none;
        }
        filter: saturate(0)
    }
    & > img:nth-child(2n):hover {
        filter: saturate(0)
    }
`;

const Index = () => {
    return (
        <LocalWrapper>
            <img src={eeg1} />
            <img src={eeg2} />
            <img src={eeg3} />
            <img src={eeg4} />
            <img src={eeg5} />
            <img src={eeg6} />
            <img src={eeg7} />
            <Info>
                <h1>Frustration Detection</h1>
                In the spirit of generative neural network art, I hacked together a quick and dirty script that attempts to generate random art pieces by randomly assigning weights to a not-so-shallow neural network using p5.js and recurrent.js libraries, just to see what can get drawn randomly without any training of the network.
            </Info>
        </LocalWrapper>
    )
};

export default Index;

Index.propTypes = {};
