import React, { useRef, useState } from 'react';
import OpenCvWebcam from "components/OpenCV/webcam";
import startOpenCvProgram from "components/OpenCV/basic";

const Index = () => {
    let canvasOutputRef = useRef(),
        buttonToggleStopRef = useRef(),
        OpenCvWebcamRef = useRef();
    let [stopped, setStopped] = useState(false);

    return (
        <>
            <OpenCvWebcam
                ref={OpenCvWebcamRef}
                startOpenCvProgram={startOpenCvProgram}
                canvasOutputRef={canvasOutputRef}
                buttonToggleStopRef={buttonToggleStopRef}
                webcamWidth={640}
            />
            <canvas ref={canvasOutputRef} />
            <button ref={buttonToggleStopRef} onClick={() => setStopped(!stopped)}>{stopped ? "Démarrer" : "Stopper"}</button>
        </>
    )
};

export default Index;

Index.propTypes = {};
