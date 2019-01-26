import React, { useRef, useState, useEffect } from 'react';
import styled from "styled-components";
import ContainerDimensions from 'react-container-dimensions'
import { SketchComponent } from 'components/P5js';
import ArtSketch from "components/Recurrent/netart2";
import { PageA3_Paysage } from '../../../styles/print';
import { Wrapper, Info } from '../styles';

const LocalWrapper = styled(Wrapper)`
`;

const CustomInfo = styled(Info)`
`;


const Index = () => {
    return (
        <LocalWrapper>
            <PageA3_Paysage />
            <ContainerDimensions>
                {parent => (
                    <SketchComponent
                        sketch={ArtSketch}
                        width={parent.width}
                        height={parent.height}
                        sketchProps={{ frameRate: 3 }}
                    />
                )
                }
            </ContainerDimensions>
            <CustomInfo>
                <h1>Neural Network Generative Art in Javascript</h1>
                In the spirit of generative neural network art, I hacked together a quick and dirty script that attempts to generate random art pieces by randomly assigning weights to a not-so-shallow neural network using p5.js and recurrent.js libraries, just to see what can get drawn randomly without any training of the network.
            </CustomInfo>
        </LocalWrapper>
    )
};

export default Index;

Index.propTypes = {};
