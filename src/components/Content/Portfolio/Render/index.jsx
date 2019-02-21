import SuzanneTracksYou from "components/Content/Experiments/TrackingExperiences/SuzanneTracksYou";
import { useWebcam } from "components/Visual/Webcam";
import { useToggleGlobalLanguage } from "hooks/useLanguage";
import React, { useState } from "react";
import { GoMute, GoUnmute } from "react-icons/go";
import { useVideo } from "react-use";
import styled from "styled-components";
import { PageA3_Paysage } from "styles/print";
import PortfolioWrapper from "components/Content/Portfolio/Template";
import { Info } from "components/Content/Portfolio/Template/styles";

const LocalWrapper = styled(PortfolioWrapper)``;
const CustomInfo = styled(Info)``;
const SceneContainer = styled.div`
  grid-column: auto / span 4 !important;
  grid-row: auto / span 2 !important;
  position: relative;
  overflow: hidden;
  filter: saturate(0);
  .emotion-face {
    right: 0px;
    bottom: 0;
  }
  span {
    position: absolute;
    bottom: 1em;
    left: 1em;
    font-size: 1em;
    z-index: 999;
    background-color: ${props => props.theme.colors.bg_color};
    border: 1px solid;
    padding: 0;
    display: flex;
    cursor: pointer;
    div:first-child {
      background-color: ${props => props.theme.colors.body_color};
      color: ${props => props.theme.colors.bg_color};
      text-decoration: underline;
    }
    div {
      padding: 0.5em 1em;
    }
  }
`;
const MediaBackground = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  mix-blend-mode: overlay;
  overflow: hidden;
`;
const render = {
  en: (
    <>
      <h1>Rendering and Face Detection on the Web</h1>
      <p>
        {" "}
        Web technologies now allow real-time rendering and image analysis
        directly on the browser. In addition to opening up new possibilities for
        the dissemination of interactive experiences, it is necessary to make
        sense in the design of these experiments.{" "}
      </p>
      <p>
        {" "}
        How to appropriate these tools and make expression of political, poetic
        and aesthetic sense? What can this virtual land offer us in the
        reinvestigation of reality? Here, the head of Suzanne, famous 3D model
        who reacts to the political disscussion of Evgeny Morozov, Suzanne is
        interested and follows the gaze of Morozov. We see what she sees,
        Morozov talking to her.{" "}
      </p>{" "}
    </>
  ),
  fr: (
    <>
      <h1>Rendu et détection de visage sur le Web</h1>
      <p>
        Les technologies web permettent désormais de faire du rendu et de
        l'analyse d'image en temps réel, directement sur le navigateur. Outre
        l'ouverture de nouveaux possibles dans la diffusion d'expériences
        intéractives, il est nécessaire de faire sens dans la conception de ces
        expériences.
      </p>
      <p>
        Comment s'approprier ces outils et faire expression de sens politique,
        poétique et esthétique ? Que peut nous offrir ce terrain virtuel dans la
        réinvestigation du réel ? Ici, la tête de Suzanne, célébre modèle 3D qui
        réagit à la disscussion politique de Evgeny Morozov, Suzanne est
        intéressé et suit le regard de Morozov. On voit ce qu'elle voit, Morozov
        qui lui parle.
      </p>
    </>
  )
};
const Index = () => {
  const [language, toggleLanguage] = useToggleGlobalLanguage();
  const camraw = useWebcam();
  const videoraw = useVideo(
    <video width={"100%"} height={"100%"} autoPlay loop muted>
      <source src="/assets/videos/output3.mp4" type="video/mp4" />
    </video>
  );
  const sourceKeys = ["elt", "state", "controls", "ref"];
  let video = sourceKeys.reduce(
    (obj, k, i) => ({ ...obj, [k]: videoraw[i] }),
    {}
  );
  let cam = sourceKeys.reduce((obj, k, i) => ({ ...obj, [k]: camraw[i] }), {});
  const sources = [video, cam];
  const [indexSource, setIndexSource] = useState(0);
  const [mute, setMute] = useState(true);
  let currSource = sources[indexSource];
  if (currSource.controls && mute) currSource.controls.mute();
  if (currSource.controls && !mute) currSource.controls.unmute();
  return (
    <LocalWrapper>
      <PageA3_Paysage />
      <SceneContainer>
        <SuzanneTracksYou mediaInput={currSource.ref.current} />
        <MediaBackground>{currSource.elt}</MediaBackground>
        <span>
          <div onClick={() => setIndexSource(i => (i + 1) % sources.length)}>
            Next Source
          </div>
          <div onClick={() => setMute(!mute)}>
            {mute ? <GoMute /> : <GoUnmute />}
          </div>
        </span>
      </SceneContainer>
      <CustomInfo>{render[language]}</CustomInfo>
    </LocalWrapper>
  );
};

export default Index;

Index.propTypes = {};
