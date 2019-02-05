import SuzanneTracksYou from "components/Experiments/TrackingExperiences/SuzanneTracksYou";
import { useWebcam } from 'components/Visual/Webcam';
import { useToggleGlobalLanguage } from 'hooks/useLanguage';
import React, { useState } from 'react';
import { useVideo } from 'react-use';
import styled from "styled-components";
import { randomTesseraeString } from 'styles/fonts';
import { PageA3_Paysage } from 'styles/print';
import PortfolioWrapper from '../';
import { Info } from '../styles';

const LocalWrapper = styled(PortfolioWrapper)`
`;
const CustomInfo = styled(Info)`
&:after {
    content: "${randomTesseraeString(1)}";
}
`;
const SceneContainer = styled.div`
grid-column: auto /span 4 !important;
grid-row: auto /span 2 !important;
position: relative;
.emotion-face {
  right: 0;
  bottom: 0;
}
button {
  position: absolute;
left:0;bottom:0;
}
`;
const MediaBackground = styled.div`
position: absolute;
top:0;right:0;left:0;bottom:0;
mix-blend-mode: overlay;
overflow: hidden;
`;
const render = {
  "en": <>
    <h1>Rendering and Face Detection on the Web</h1>
    <p> Web technologies now allow real-time rendering and image analysis directly on the browser.
    In addition to opening up new possibilities for the dissemination of interactive experiences, it is necessary to make sense in the design of these experiments. </p>
    <p> How to appropriate these tools and make expression of political, poetic and aesthetic sense? What can this virtual land offer us in the reinvestigation of reality?
    Here, the head of Suzanne, famous 3D model who reacts to the political disscussion of Evgeny Morozov, Suzanne is interested and follows the gaze of Morozov. We see what she sees, Morozov talking to her. </p>    </>,
  "fr": <>
    <h1>Rendu et détection de visage sur le Web</h1>
    <p>Les technologies web permettent désormais de faire du rendu et de l'analyse d'image en temps réel, directement sur le navigateur.
      Outre l'ouverture de nouveaux possibles dans la diffusion d'expériences intéractives, il est nécessaire de faire sens dans la conception de ces expériences.</p>
    <p>Comment s'approprier ces outils et faire expression de sens politique, poétique et esthétique ? Que peut nous offrir ce terrain virtuel dans la réinvestigation du réel ?
      Ici, la tête de Suzanne, célébre modèle 3D qui réagit à la disscussion politique de Evgeny Morozov, Suzanne est intéressé et suit le regard de Morozov. On voit ce qu'elle voit, Morozov qui lui parle.</p>
  </>,
}
const Index = () => {
  const [language, toggleLanguage] = useToggleGlobalLanguage()
  const detectionCanvasRef = useRef()
  const camraw = useWebcam();
  const videoraw  = useVideo(
      <video width={"100%"} height={"100%"} autoPlay loop>
          <source src="/assets/videos/output3.mp4"
              type="video/mp4" />
      </video>
  );
  const sourceKeys = ["elt", "state", "controls", "ref"]
  let video = sourceKeys.reduce((obj, k, i) => ({...obj, [k]: videoraw[i] }), {})
  let cam = sourceKeys.reduce((obj, k, i) => ({...obj, [k]: camraw[i] }), {})
  const sources = [video, cam]
  const [indexSource, setIndexSource] = useState(0)
  let currSource = sources[indexSource];
  return (
    <LocalWrapper>
      <PageA3_Paysage />
      <SceneContainer>
        <SuzanneTracksYou
          mediaInput={currSource.ref.current}
          displayCanvas={detectionCanvasRef.current}
        />
        <MediaBackground>
          {currSource.elt}
        </MediaBackground>
        <button onClick={() => setIndexSource(i => (i+1) % sources.length)}>Next</button>
      </SceneContainer>
      <CustomInfo>
        {render[language]}
      </CustomInfo>
    </LocalWrapper>
  )
};

export default Index;

Index.propTypes = {};
