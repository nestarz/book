import React, { useRef, useState, useEffect } from 'react';
import styled from "styled-components";
import ContainerDimensions from 'react-container-dimensions'
import Scene from "components/Filaments/SuzanneTracksYou";
import { PageA3_Paysage } from '../../../styles/print';
import { Wrapper, Info } from '../styles';

const LocalWrapper = styled(Wrapper)`
`;
const CustomInfo = styled(Info)`
`;
const SceneContainer = styled.div`
grid-column: auto /span 4 !important;
grid-row: auto /span 2 !important;
object-fit: cover;
width: 100%;
height: 100%;
max-width: 100%;
max-height: 100%;
`;
const render = {
    "en":<>
        <h1>Rendering in Javascript</h1>
        In the spirit of generative neural network art, I hacked together a quick and dirty script that attempts to generate random art pieces by randomly assigning weights to a not-so-shallow neural network using p5.js and recurrent.js libraries, just to see what can get drawn randomly without any training of the network.
    </>,
    "fr":<>
        <h1>Rendu en Javascript</h1>
        Dans l'esprit de l'art des réseaux de neurones génératifs, j'ai concocté un script rapide et sale qui tente de générer des œuvres d'art aléatoires en attribuant de manière aléatoire des poids à un réseau de neurones peu profond utilisant les bibliothèques p5.js et recurrent.js, juste pour voir. ce qui peut être dessiné au hasard sans aucune formation du réseau.
    </>,
}
const Index = ({ lg = "fr" }) => {
    return (
        <LocalWrapper>
            <PageA3_Paysage />
            <SceneContainer>
            <ContainerDimensions>
                {parent => <Scene width={parent.width} height={parent.height}/>}
            </ContainerDimensions>
            </SceneContainer>
            <CustomInfo>
                {render[lg]}
            </CustomInfo>
        </LocalWrapper>
    )
};

export default Index;

Index.propTypes = {};
