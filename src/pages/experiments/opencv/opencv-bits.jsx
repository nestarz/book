import React, { useRef, useState } from 'react';
import OpenCvWebcam from "components/OpenCV/Webcam";
import startOpenCvProgram from "components/OpenCV/crypted";
import ContainerDimensions from 'react-container-dimensions';

import theme from '../../../../config/theme';
import styled from 'styled-components';
import Layout from 'components/Layout';

const Face = styled.div`
    background-size: cover;
    position: absolute;
    top:0;
    left:0;
    right:0;
    bottom: 0;
    mix-blend-mode: difference;
    background-color: #3CD670;
    opacity: 1;
    overflow: hidden;
    pointer-events: none;
    mix-blend-mode: lighten; 
`;
const Wrapper = styled.div`
    background-color: #3CD670;
    flex-grow: 1;
    color: white;
    button {
        background: none;
        color: inherit;
        border: none;
        padding: 0;
        font: inherit;
        cursor: pointer;
        outline: inherit;
        text-decoration: underline;
    }
    h1 {
        z-index: 1;
    }
    &, & > div {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;
        flex-direction: column;
        flex: 1;
    }
    & > div {
        flex-direction: row;
        justify-content: space-around;
        align-items: space-around;
        width: 100%;
        .videoContainer {
            @media screen and (orientation:portrait) { width: 49.5vmin; }
            @media screen and (orientation:landscape) { width: 49.5vmin; } 
            video {
                height: 100%;
            }          
        }
    }
`;


const Index = () => {
    let canvasOutputRef = useRef(),
        buttonToggleStopRef = useRef(),
        OpenCvWebcamRef = useRef();
    let [stopped, setStopped] = useState(false);

    return (
        <Layout theme={theme}>
            <Wrapper>
                <div>
                    <div className={"videoContainer"}>
                        <ContainerDimensions>
                            {parent => (
                                <OpenCvWebcam
                                    ref={OpenCvWebcamRef}
                                    startOpenCvProgram={startOpenCvProgram}
                                    canvasOutputRef={canvasOutputRef}
                                    buttonToggleStopRef={buttonToggleStopRef}
                                    webcamWidth={parent.width}
                                />
                            )
                            }
                        </ContainerDimensions>
                    </div>
                    <canvas ref={canvasOutputRef} />
                    <Face />
                    <div>
                        <h1>En Clair ou Crypté ?</h1>
                        <h5>Nécessite une caméra. C'est tout.</h5>
                        <button ref={buttonToggleStopRef} onClick={() => setStopped(!stopped)}>{stopped ? "Démarrer" : "Stopper"}</button>
                    </div>
                </div>
            </Wrapper>
        </Layout>
    )
};

export default Index;

Index.propTypes = {};
