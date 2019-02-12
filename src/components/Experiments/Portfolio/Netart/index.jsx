import { SketchComponentBackground } from "components/Visual/P5js";
import ArtSketch from "components/Visual/Recurrent/netart2";
import { useToggleGlobalLanguage } from "hooks/useLanguage";
import React from "react";
import styled from "styled-components";
import { randomTesseraeString } from "styles/fonts";
import { PageA3_Paysage } from "styles/print";
import PortfolioWrapper from "../";
import { Info } from "../styles";

const LocalWrapper = styled(PortfolioWrapper)``;

const ArtContainer = styled.div`
  position: relative;
  grid-column: auto / span 4 !important;
  grid-row: auto / span 2 !important;
`;
const CustomInfo = styled(Info)`
&:after {
    content: "${randomTesseraeString(1)}";
}
`;
const neural = {
  fr: (
    <>
      <h1>Art génératif en Javascript</h1>
      <p>
        Dans l'esprit de l'art des réseaux de neurones génératifs, j'ai concocté
        un script rapide et sale qui tente de générer des œuvres d'art
        aléatoires en attribuant de manière aléatoire des poids à un réseau de
        neurones peu profond utilisant les bibliothèques p5.js et recurrent.js,
        juste pour voir. ce qui peut être dessiné au hasard sans aucune
        formation du réseau.
      </p>
    </>
  ),
  en: (
    <>
      <h1>Neural Network Generative Art in Javascript</h1>
      <p>
        In the spirit of generative neural network art, I hacked together a
        quick and dirty script that attempts to generate random art pieces by
        randomly assigning weights to a not-so-shallow neural network using
        p5.js and recurrent.js libraries, just to see what can get drawn
        randomly without any training of the network.
      </p>
    </>
  )
};

const Index = () => {
  const [language, toggleLanguage] = useToggleGlobalLanguage();
  return (
    <LocalWrapper>
      <PageA3_Paysage />
      <ArtContainer>
        <SketchComponentBackground
          sketch={ArtSketch}
          sketchProps={{ frameRate: 3 }}
        />
      </ArtContainer>
      <CustomInfo>{neural[language]}</CustomInfo>
    </LocalWrapper>
  );
};

export default Index;

Index.propTypes = {};
