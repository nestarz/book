import React, { useRef, useState, useEffect } from 'react';
import styled from "styled-components";
//import OpenCvWebcam from "components/OpenCV/webcam";
//import startOpenCvProgram from "components/OpenCV/basic";
import Webcam from "react-webcam";
import Layout from "components/Layout";
import VisitCard from 'components/VisitCard';
import Clock from 'react-live-clock';
import startOpenCvProgram from "components/OpenCV/basic";
import Nav from 'components/Navigation/PrintHeader'
import { PageA3_Paysage, PageVisitCard } from '../../../styles/print';
import ContainerDimensions from 'react-container-dimensions'
import { SketchComponent } from 'components/P5js';
import ArtSketch from "components/Recurrent/netart2";
import Scene from "components/Filaments/Suzanne";
import CeramistMindMap from 'components/Mindmap/Ceramist'
//Dispositif
import dispositif1 from "./final2.png";
import dispositif2 from "./final6.png";
import dispositif3 from "./Image_00001.jpg";
import dispositif4 from "./IMG_20181019_172338.jpg";
import dispositif5 from "./IMG_20181130_120008.jpg";
import dispositif6 from "./IMG_20181207_114851.jpg";
//EEG
import eeg1 from "./DSC04416.jpg";
import eeg2 from "./DSC04416.jpg";
import eeg3 from "./DSC04416.jpg";
import eeg4 from "./DSC04437.jpg";

const StyledVisitCard = styled(VisitCard)`
.verso, .recto {
border: 1px solid black;
margin: 5mm;
mix-blend-mode: darken;
overflow: hidden;
}
.verso {
    position: absolute;
    left: 0;
    top: 0;
}
.recto {
    position: absolute;
    right: 0;
    bottom: 0;
}
`;

const Header = styled.div`
font-size: 5vw;
align-self: center;
margin-top: 5vw;
@media print {
    display: none;
}
`;

const Wrapper = styled.div`
position: relative;
counter-increment: mon-compteur;
&:before {
    content: "Elias Rhouzlane. Page " counter(mon-compteur);
    background-color: #efff00;
    transform: scale(1.5, 1);
    position: absolute;
    bottom: 0;
    left: 10vw;
    font-size: 1vw;
    padding: 0 1vw;
    mix-blend-mode: luminosity;
}
display: flex;
justify-content: center;
align-items: center;
background-color: white;
@media not print {
    margin:5vw auto;
    margin-bottom:0;
    width: 90vw;
    height: calc(90vw / 1.4141);
    box-shadow: 0px 0px 0.8vw black;
}
@media print {
    width: 100vw;
    height: 297mm;
    overflow: hidden;
}
h1 {
    margin: 0;
    font-size: 10vw;
    width: 50%;
    flex: 1;
    }
#meVideo {
    /*flex: 1;*/
    position: relative;
    video {
        border: 1px solid black;
    }
}
#meVideo:after,
#meVideo:before {
    background-color: #d63c3c;
    position: absolute;
    bottom: 0;
    left: 0;
    top: 0;
    right: 0;
    content: 'WELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOMEWELCOME';
    word-break: break-word;
    mix-blend-mode: color;
    font-size: 1vw;
    line-height: 1vw;
    z-index: 1;
}
#meVideo:after {
    mix-blend-mode: lighten;
    z-index: 2;
    line-height: 2vw;
}
.info {
    position: absolute;
    background-color: white;
    padding: 1vw;
    border: 1px solid black;
    max-width: 27vw;
    font-size: 1vw;
    h2 {
        margin: 0;
        font-size: 2vw;

    }
}
.info2 {
    top: 2vw;
    right: 2vw;
}
.info3 {
    position: relative;
}
.info4 {
    right: 2vw;
}
flex-wrap: wrap;
img {
    max-height: 22.5vw;
    margin-top: 0;
    margin-right: 3vw;
    &.dessin {
        max-height: none;
        transform: scale(1.4);
        position: absolute;
        z-index: -1;
        filter: blur(1px) contrast(100);
    }
}
overflow: hidden;
`;

const Index = () => {
    let canvasOutputRef = useRef(),
        buttonToggleStopRef = useRef(),
        OpenCvWebcamRef = useRef();
    let [stopped, setStopped] = useState(false);
    return (
        <>
            <PageA3_Paysage />
            <Layout style={{ backgroundColor: "grey", paddingBottom: "5vw" }}>
                <Nav />
                <Header><div className="sub"><Clock format={'SS:HH:mm:ss:SS'} ticking={true} timezone={'Europe/Paris'} interval={10} /></div></Header>
                <Wrapper>
                    <StyledVisitCard mode={Math.floor(Math.random() * 4)} />
                    <div id="meVideo">
                        <Webcam
                            ref={OpenCvWebcamRef}
                            startOpenCvProgram={startOpenCvProgram}
                            canvasOutputRef={canvasOutputRef}
                            buttonToggleStopRef={buttonToggleStopRef}
                            webcamWidth={640}
                        />
                    </div>
                </Wrapper>
                <Wrapper>
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
                    <div className={"info"}>
                        <h2>Neural Network Generative Art in Javascript</h2>
                        In the spirit of generative neural network art, I hacked together a quick and dirty script that attempts to generate random art pieces by randomly assigning weights to a not-so-shallow neural network using p5.js and recurrent.js libraries, just to see what can get drawn randomly without any training of the network.
                    </div>
                </Wrapper>
                <Wrapper>
                    <Scene />
                    <div className={"info info2"}>
                        <h2>Rendering in Javascript</h2>
                        In the spirit of generative neural network art, I hacked together a quick and dirty script that attempts to generate random art pieces by randomly assigning weights to a not-so-shallow neural network using p5.js and recurrent.js libraries, just to see what can get drawn randomly without any training of the network.
                    </div>
                </Wrapper>
                <Wrapper>
                    <img src={dispositif2} />
                    <img src={dispositif1} />
                    <img className="dessin" src={dispositif3} />
                    <img src={dispositif4} />
                    <img src={dispositif5} />
                    <img src={dispositif6} />

                    <div className={"info info3"}>
                        <h2>Thinking Clay</h2>
                        In the spirit of generative neural network art, I hacked together a quick and dirty script that attempts to generate random art pieces by randomly assigning weights to a not-so-shallow neural network using p5.js and recurrent.js libraries, just to see what can get drawn randomly without any training of the network.
                    </div>
                </Wrapper>
                <Wrapper>
                    <img src={eeg1} />
                    <img src={eeg2} />
                    <img src={eeg3} />
                    <img src={eeg4} />

                    <div className={"info info3"}>
                        <h2>Thinking Clay</h2>
                        In the spirit of generative neural network art, I hacked together a quick and dirty script that attempts to generate random art pieces by randomly assigning weights to a not-so-shallow neural network using p5.js and recurrent.js libraries, just to see what can get drawn randomly without any training of the network.
                    </div>
                </Wrapper>
                <Wrapper>
                    <CeramistMindMap />
                    <div className={"info info4"}>
                        <h2>Ceramist Mind Map</h2>
                        Volonté de rélfexion de nouvelles typologies de création de la céramique.
 
                         En détournant les processus dictés de l'imprimante 3D, en associant la forme et l'usage à des données numériques, en imaginant des typologies d'objets par générations paramétriques aléatoires et enfin en pensant de nouvelles intéractions dans la création avec des instruments *apriori* non liés à la céramique traditionnelle, du piano à la caméra et jusqu'aux interfaces cervaux machines.
                        <ol>
                            <li>Open Source et Collaboratif (Creative Commons, Social Design, ...)</li>
                            <li>Intégration de la donnée numérique (Capteurs, Bases de données publiques, ...)</li>
                            <li>Détournement de machines (hacking) et de matériaux de l'inerte jusqu'au vivant (biohacking)</li>
                            <li>Jouer avec les sens, developper l'introspection et explorer l’entrainement cognitif à l'aide de retours haptiques etc... et d'une démarche influancé par la psychologie cognitive et comportementale (TCC), la psychologie clinique et le serious gaming.</li>
                        </ol>
                    </div>
                </Wrapper>
            </Layout>
        </>
    )
};

export default Index;

Index.propTypes = {};
