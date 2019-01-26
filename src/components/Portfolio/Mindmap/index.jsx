import React, { useRef, useState, useEffect } from 'react';
import styled from "styled-components";
import CeramistMindMap from 'components/Mindmap/Ceramist'
import { PageA3_Paysage } from '../../../styles/print';
import { Wrapper, Info } from '../styles';

const LocalWrapper = styled(Wrapper)`
`;
const CustomInfo = styled(Info)`
grid-column: auto /span 2;
grid-row: auto /span 1;
`;
const CeramistMindMapGrid = styled(CeramistMindMap)`
grid-column: auto /span 3 !important;
grid-row: auto /span 2 !important;
`;

const Index = () => {
    return (
        <LocalWrapper>
            <PageA3_Paysage />
            <CeramistMindMapGrid />
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
