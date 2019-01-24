import React, { useRef, useState } from 'react';
import styled from "styled-components";
import OpenCvWebcam from "components/OpenCV/webcam";
import Layout from "components/Layout";
import VisitCard from 'components/VisitCard';
import startOpenCvProgram from "components/OpenCV/basic";
import { PageA3_Paysage, PageVisitCard } from '../../../styles/print';
import ContainerDimensions from 'react-container-dimensions'
import { SketchComponent } from 'components/P5js';
import ArtSketch from "components/Recurrent/netart";
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
import eeg1 from "./DSC04325.jpg";
import eeg2 from "./DSC04416.jpg";
import eeg3 from "./DSC04411.jpg";
import eeg4 from "./DSC04437.jpg";

const StyledVisitCard = styled(VisitCard)`
transform: scale(1.5) rotate(0deg);
transform-origin: left;
.verso, .recto {
border: 1px solid black;
margin: 5mm;
mix-blend-mode: darken;
overflow: hidden;
}
`;

const Wrapper = styled.div`
position: relative;
counter-increment: mon-compteur;
&:before {
    content: "Elias Rhouzlane. Page " counter(mon-compteur);
    background-color: white;
    position: absolute;
    bottom: 0;
    left: 10mm;
}
display: flex;
justify-content: center;
align-items: center;
height: 100vh;
@media not print {border-bottom: 1px solid black;}
h1 {
    margin: 0;
    font-size: 10vw;
    width: 50%;
    flex: 1;
    }
video, button {
    position: absolute;
    visibility: hidden;
}
#meVideo {
    /*flex: 1;*/
    canvas {
        border: 2px solid black;
    }
}
.info {
    padding: 10mm;
    position: absolute;
    background-color: white;
    padding: 20px;
    border: 1px solid black;
    max-width: 300px;
    h2 {
        margin: 0;
    }
}
.info2 {
    top: 0;
    right: 0;
}
.info3 {
    position: relative;
}
.info4 {
    right: 0;
}
flex-wrap: wrap;
img {
    max-height: 100mm;
    margin-top: 0;
    margin-right: 10mm;
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
            <Layout>
                <Wrapper>
                    <StyledVisitCard mode={Math.floor(Math.random() * 4)} />
                    <div id="meVideo">
                        <OpenCvWebcam
                            ref={OpenCvWebcamRef}
                            startOpenCvProgram={startOpenCvProgram}
                            canvasOutputRef={canvasOutputRef}
                            buttonToggleStopRef={buttonToggleStopRef}
                            webcamWidth={640}
                        />
                        <canvas ref={canvasOutputRef} />
                        <button ref={buttonToggleStopRef} onClick={() => setStopped(!stopped)}>{stopped ? "Démarrer" : "Stopper"}</button>
                    </div>
                </Wrapper>
                <Wrapper>
                    <ContainerDimensions>
                        {parent => (
                            <SketchComponent
                                sketch={ArtSketch}
                                width={parent.width}
                                height={parent.height}
                                sketchProps={{ frameRate: .5 }}
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
                        In the spirit of generative neural network art, I hacked together a quick and dirty script that attempts to generate random art pieces by randomly assigning weights to a not-so-shallow neural network using p5.js and recurrent.js libraries, just to see what can get drawn randomly without any training of the network.
                    </div>
                </Wrapper>
            </Layout>
        </>
    )
};

export default Index;

Index.propTypes = {};
