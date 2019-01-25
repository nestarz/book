import React, { useRef, useState, useEffect } from 'react';
import styled from "styled-components";
import { PageA3_Paysage } from '../../../styles/print';
import { Wrapper, Info } from '../styles';
//Dispositif
import dispositif1 from "./img/final2.png";
import dispositif2 from "./img/final6.png";
import dispositif3 from "./img/Image_00001.jpg";
import dispositif4 from "./img/IMG_20181019_172338.jpg";
import dispositif5 from "./img/IMG_20181130_120008.jpg";
import dispositif6 from "./img/IMG_20181207_114851.jpg";

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
            <PageA3_Paysage />
            <img src={dispositif2} />
            <img src={dispositif1} />
            <img src={dispositif3} />
            <img src={dispositif4} />
            <img src={dispositif5} />
            <img src={dispositif6} />
            <Info>
                <h1>Thinking Clay</h1>
                In the spirit of generative neural network art, I hacked together a quick and dirty script that attempts to generate random art pieces by randomly assigning weights to a not-so-shallow neural network using p5.js and recurrent.js libraries, just to see what can get drawn randomly without any training of the network.
            </Info>
        </LocalWrapper>
    )
};

export default Index;

Index.propTypes = {};
