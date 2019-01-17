import React, { useRef, useState } from 'react';
import Layout from 'components/Layout';
import OpenCvWebcam from "components/OpenCV/Webcam";
import startOpenCvProgram from "components/OpenCV/background_substraction";
import styled from 'styled-components';

const Wrapper = styled.div`
display: flex;
flex: 1;
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
video {
    position: fixed;
top: 0;
bottom: 0;
left: 0;
right: 0;
width: 100vw;
height: 100vh;
mix-blend-mode: difference;
pointer-events: none;
filter: saturate(0);
}
`;
const Canvas = styled.canvas`
position: fixed;
top: 0;
bottom: 0;
left: 0;
right: 0;
width: 100vw;
height: 100vh;
mix-blend-mode: multiply;
pointer-events: none;`;


const Index = () => {
    let canvasOutputRef = useRef(),
        buttonToggleStopRef = useRef(),
        OpenCvWebcamRef = useRef();
    let [stopped, setStopped] = useState(false);

    return (
        <Layout>
            <Wrapper>
                <OpenCvWebcam
                    ref={OpenCvWebcamRef}
                    startOpenCvProgram={startOpenCvProgram}
                    canvasOutputRef={canvasOutputRef}
                    buttonToggleStopRef={buttonToggleStopRef}
                    webcamWidth={640}
                />
                <Canvas ref={canvasOutputRef} />
                <button ref={buttonToggleStopRef} onClick={() => setStopped(!stopped)}>{stopped ? "Démarrer" : "Stopper"}</button>
            </Wrapper>
        </Layout>
    )
};

export default Index;

Index.propTypes = {};
