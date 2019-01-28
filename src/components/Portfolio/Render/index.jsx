import React, { useRef, useState, useEffect } from 'react';
import styled from "styled-components";
import ContainerDimensions from 'react-container-dimensions'
import SuzanneTracksYou from "components/TrackingExperiences/SuzanneTracksYou";
import { PageA3_Paysage } from '../../../styles/print';
import { Wrapper, Info } from '../styles';
import { randomTesseraeString } from '../../../styles/fonts';

const LocalWrapper = styled(Wrapper)`
`;
const CustomInfo = styled(Info)`
&:after {
    content: "${randomTesseraeString(1)}";
}
`;
const SceneContainer = styled.div`
grid-column: auto /span 4 !important;
grid-row: auto /span 2 !important;
object-fit: cover;
width: 100%;
height: 100%;
max-width: 100%;
max-height: 100%;
overflow: hidden;
`;
const render = {
    "en":<>
        <h1>Rendering and Face Detection on the Web</h1>
        <p> Web technologies now allow real-time rendering and image analysis directly on the browser.
        In addition to opening up new possibilities for the dissemination of interactive experiences, it is necessary to make sense in the design of these experiments. </p>
        <p> How to appropriate these tools and make expression of political, poetic and aesthetic sense? What can this virtual land offer us in the reinvestigation of reality?
        Here, the head of Suzanne, famous 3D model who reacts to the political disscussion of Evgeny Morozov, Suzanne is interested and follows the gaze of Morozov. We see what she sees, Morozov talking to her. </p>    </>,
    "fr":<>
        <h1>Rendu et détection de visage sur le Web</h1>
        <p>Les technologies web permettent désormais de faire du rendu et de l'analyse d'image en temps réel, directement sur le navigateur. 
        Outre l'ouverture de nouveaux possibles dans la diffusion d'expériences intéractives, il est nécessaire de faire sens dans la conception de ces expériences.</p>
        <p>Comment s'approprier ces outils et faire expression de sens politique, poétique et esthétique ? Que peut nous offrir ce terrain virtuel dans la réinvestigation du réel ?
        Ici, la tête de Suzanne, célébre modèle 3D qui réagit à la disscussion politique de Evgeny Morozov, Suzanne est intéressé et suit le regard de Morozov. On voit ce qu'elle voit, Morozov qui lui parle.</p>
    </>,
}
const Index = ({ lg = "fr" }) => {
    return (
        <LocalWrapper>
            <PageA3_Paysage />
            <SceneContainer>
            <ContainerDimensions>
                {parent => <SuzanneTracksYou width={parent.width} height={parent.height}/>}
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
