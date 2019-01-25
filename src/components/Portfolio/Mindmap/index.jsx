import React, { useRef, useState, useEffect } from 'react';
import styled from "styled-components";
import CeramistMindMap from 'components/Mindmap/Ceramist'
import { PageA3_Paysage } from '../../../styles/print';
import { Wrapper, Info } from '../styles';

const LocalWrapper = styled(Wrapper)`
grid-template-areas: "pic1 pic1 pic2 pic2" "pic1 pic1 pic5 pic5" "pic4 pic4 pic5 pic5";
`;
const CustomInfo = styled(Info)`
position: absolute;
right: 2vw;
`;

const Index = () => {
    return (
        <LocalWrapper>
            <PageA3_Paysage />
            <CeramistMindMap />
            <CustomInfo>
                <h1>Ceramist Mind Map</h1>
                Volonté de rélfexion de nouvelles typologies de création de la céramique.
                 En détournant les processus dictés de l'imprimante 3D, en associant la forme et l'usage à des données numériques, en imaginant des typologies d'objets par générations paramétriques aléatoires et enfin en pensant de nouvelles intéractions dans la création avec des instruments *apriori* non liés à la céramique traditionnelle, du piano à la caméra et jusqu'aux interfaces cervaux machines.
                <ol>
                    <li>Open Source et Collaboratif (Creative Commons, Social Design, ...)</li>
                    <li>Intégration de la donnée numérique (Capteurs, Bases de données publiques, ...)</li>
                    <li>Détournement de machines (hacking) et de matériaux de l'inerte jusqu'au vivant (biohacking)</li>
                    <li>Jouer avec les sens, developper l'introspection et explorer l’entrainement cognitif à l'aide de retours haptiques etc... et d'une démarche influancé par la psychologie cognitive et comportementale (TCC), la psychologie clinique et le serious gaming.</li>
                </ol>
            </CustomInfo>
        </LocalWrapper>
    )
};

export default Index;

Index.propTypes = {};
