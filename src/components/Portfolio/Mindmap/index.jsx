import React, { useRef, useState, useEffect } from 'react';
import styled from "styled-components";
import CeramistMindMap from 'components/Mindmap/Ceramist'
import { PageA3_Paysage } from '../../../styles/print';
import { Wrapper, Info } from '../styles';
import { randomTesseraeString } from '../../../styles/fonts';

const LocalWrapper = styled(Wrapper)`
`;
const CustomInfo = styled(Info)`
grid-column: auto /span 1 !important;
grid-row: auto /span 2 !important;
&:after {
    content: "${randomTesseraeString(1)}";
}
`;
const CeramistMindMapGrid = styled(CeramistMindMap)`
grid-column: auto /span 4 !important;
grid-row: auto /span 3 !important;
`;

const mindmap = {
    "fr": <>
        <h1>Carte mentale de céramiste</h1>
        Volonté de rélfexion de nouvelles typologies de création de la céramique.
        En détournant les processus dictés de l'imprimante 3D, en associant la forme et l'usage à des données numériques, en imaginant des typologies d'objets par générations paramétriques aléatoires et enfin en pensant de nouvelles intéractions dans la création avec des instruments a priori non liés à la céramique traditionnelle, du piano à la caméra et jusqu'aux interfaces cervaux machines.
        <ol>
            <li>Open Source et Collaboratif (Creative Commons, Social Design, ...)</li>
            <li>Intégration de la donnée numérique (Capteurs, Bases de données publiques, ...)</li>
            <li>Détournement de machines (hacking) et de matériaux de l'inerte jusqu'au vivant (biohacking)</li>
            <li>Jouer avec les sens, developper l'introspection et explorer l’entrainement cognitif à l'aide de retours haptiques etc... et d'une démarche influancé par la psychologie cognitive et comportementale (TCC), la psychologie clinique et le serious gaming.</li>
        </ol>
    </>,
    "en": <>
        <h1>Ceramist Mind Map</h1>
        Willingness to refer new types of ceramic creation.
        By diverting the dictated processes of the 3D printer, by combining form and use with digital data, by imagining typologies of objects by random parametric generations and finally by thinking of new interactions in the creation with instruments a priori not related to traditional ceramics, from the piano to the camera and to the machine brain interfaces.
        <ol>
            <li> Open Source and Collaborative (Creative Commons, social design, ...)</li>
            <li> Integration of digital data (Sensors, Public databases, ...) </li>
            <li> Hijacking machines and materials from the inert to the living </li>
            <li> Play with the senses, develop introspection and explore cognitive training using haptic feedback, etc., and an approach influenced by cognitive and behavioral psychology (CBT), clinical psychology and serious play.</li>        
        </ol>
    </>
}

const Index = ({ lg = "fr" }) => {
    return (
        <LocalWrapper>
            <PageA3_Paysage />
            <CeramistMindMapGrid />
            <CustomInfo>
                {mindmap[lg]}
            </CustomInfo>
        </LocalWrapper>
    )
};

export default Index;

Index.propTypes = {};
