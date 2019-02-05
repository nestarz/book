import { useToggleGlobalLanguage } from 'hooks/useLanguage';
import React from 'react';
import styled from "styled-components";
import { randomTesseraeString } from 'styles/fonts';
import { PageA3_Paysage } from 'styles/print';
import { Info } from '../styles';
import PortfolioWrapper from '../'
//Dispositif
import dispositif1 from "./img/final2.png";
import dispositif2 from "./img/final6.png";
import dispositif3 from "./img/Image_00001.jpg";
import dispositif4 from "./img/IMG_20181019_172338.jpg";
import dispositif5 from "./img/IMG_20181130_120008.jpg";
import dispositif6 from "./img/IMG_20181207_114851.jpg";

const LocalWrapper = styled(PortfolioWrapper)`
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
const CustomInfo = styled(Info)`
&:after {
    content: "${randomTesseraeString(1)}";
}`;

const clay = {
    "fr": <>
        <h1>Penser la terre</h1>
        En partant du bagage acquis dans l'appréhension de systèmes techniques et numériques, l'idée est de faire de la technique un outil pour réfléchir la forme. Une démarche qui combine sciences et arts, sciences et design. Il est question d'ouvrir des axes de recherche sur les systèmes d'objets et leurs usages, les repenser avec ses aptitudes et appétits scientifiques, en explorant l'état de l'art en apprentissage machine, en design génératif (GAN, etc...) ou en analyse d'images. L'objectif étant d'intégrer l'objet, sa forme et son usage dans son environnement sensible et in-sensible (virtuel) de manière nouvelle et politique (éthique, responsable, social ...).
    </>,
    "en": <>
        <h1>Thinking clay</h1>
        Starting from the baggage acquired in the apprehension of technical and digital systems, the idea is to make of the technique a tool to reflect the form. An approach that combines science and arts, science and design. It is a question of opening lines of research on the systems of objects and their uses, to rethink them with their aptitudes and scientific appetites, by exploring the state of the art in machine learning, in generative design (GAN, etc.). ..) or in image analysis. The objective is to integrate the object, its form and its use in its sensitive and in-sensitive (virtual) environment in a new and political way (ethical, responsible, social ...).
    </>
}

const Index = () => {
  const [language, toggleLanguage] = useToggleGlobalLanguage()
    return (
        <LocalWrapper>
            <PageA3_Paysage />
            <div><img src={dispositif2} /></div>
            <div><img src={dispositif1} /></div>
            <div><img src={dispositif3} /></div>
            <div><img src={dispositif4} /></div>
            <div><img src={dispositif5} /></div>
            <div><img src={dispositif6} /></div>
            <CustomInfo>
                {clay[language]}
            </CustomInfo>
        </LocalWrapper>
    )
};

export default Index;

Index.propTypes = {};
