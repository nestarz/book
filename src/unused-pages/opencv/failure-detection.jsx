import React, { useRef, useState } from 'react';
import Layout from 'components/Layout';
import OpenCvWebcam from "components/OpenCV/webcam";
import startOpenCvProgram from "components/OpenCV/background_substraction";
import styled from 'styled-components';

const Hover = styled.div`
position: fixed;
top: 0;
bottom: 0;
left: 0;
right: 0;
width: 100vw;
height: 100vh;
mix-blend-mode: screen;
pointer-events: none;
mix-blend-mode: color-dodge;
background-color: darkblue;
`
const Wrapper = styled.div`
display: flex;
flex: 1;
justify-content: center;
align-items: center;
flex-direction: column;
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
    filter: invert(1) blur(0px);

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
pointer-events: none;
filter: invert(1) blur(80px);
/*filter: invert(100);*/
`;


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
                    webcamWidth={400}
                />
                <Canvas ref={canvasOutputRef} />
                <button ref={buttonToggleStopRef} onClick={() => setStopped(!stopped)}>{stopped ? "Démarrer" : "Stopper"}</button>
            </Wrapper>
            <Hover/>
        </Layout>
    )
};

export default Index;

Index.propTypes = {};
