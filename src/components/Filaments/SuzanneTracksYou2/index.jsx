import React, { useRef, useState, useEffect } from 'react';
import { useList, useVideo, useHover } from 'react-use';
import styled from "styled-components";
import { useFaceApiDetection, useFaceApiOverlay } from 'components/FaceDetection/hooks';
import { useWebcam } from 'components/Webcam';
import Suzanne from "../Suzanne";

const Wrapper = styled.div`
span {
    position: absolute;
    bottom: 10px;
    left: 10px;
    z-index: 999;
    background-color: white;
    border: 1px solid;
    padding: 0;
    display: flex;
    div:first-child {
        background-color: black;
        color: white;
        text-decoration: underline;
        cursor : pointer;
    }
    div {
        padding: 0.5vw 1vw;
    }
}
`;
const BoxCanvas = styled.canvas`
position: absolute;
bottom: 0;
right: 0;
width: 100%;
pointer-events: none;
height: 100%;
left: 0;
top: 0;
mix-blend-mode: darken;
filter: grayscale(1);
`;
const SourceWrapper = styled.div`
position: absolute;
top: 0;
left: 0;
bottom: 0;
pointer-events: none;
right: 0;
mix-blend-mode: darken;
video {
    object-fit: cover;
}`;

const Index = ({ width, height, interval = 100 }) => {
    const boxDetectionsCanvasRef = useRef();
    const [detections, setFaceApiInput] = useFaceApiDetection(interval);
    const [lookAt, setLookAt] = useState(null);
    const [camElt, camState, camControls, camRef] = useWebcam();
    const [videoElt, videoState, videoControls, videoRef] = useVideo(
        <video width={"100%"} height={"100%"} autoPlay loop>
            <source src="/assets/videos/evgeny_morozov.mp4"
                type="video/mp4" />
        </video>
    );
    const [indexSource, setIndexSource] = useState(0);
    const [source, setSource] = useState({ ref: camRef, elt: camElt });
    const [sources, setSources] = useState([{ ref: camRef, elt: camElt }, { ref: videoRef, elt: videoElt }]);
    useEffect(() => {
        setSource(sources[indexSource])
        if (sources[indexSource].ref.current) {
            // Webcam Component encapsulate video tag
            setFaceApiInput(sources[indexSource].ref.current.video ? sources[indexSource].ref.current.video : sources[indexSource].ref.current)
        }
    }, [indexSource, sources[indexSource].ref.current])
    useEffect(() => { if (detections) setLookAt(detections.lookAt) }, [detections]);
    useFaceApiOverlay(detections, boxDetectionsCanvasRef);
    const SuzanneElt = (hovered) => (<div>
        <Suzanne width={width} height={height} lookAt={lookAt} />
    </div>)
    const [SuzanneEltHoverable, hovered] = useHover(SuzanneElt);
    useEffect(() => {
        if (videoControls) hovered ? videoControls.unmute() : videoControls.mute()
        console.log(hovered);
    }, [hovered])
    return (
        <Wrapper>
            {SuzanneEltHoverable}
            <span>
                <div onClick={() => setIndexSource(i => (i + 1) % sources.length)}>Source suivante</div>
                <div>{hovered ? "Audio playing..." : "Hover to play audio!"}</div>
            </span>
            <SourceWrapper>{source.elt}</SourceWrapper>
            <BoxCanvas ref={boxDetectionsCanvasRef} />
        </Wrapper>
    )
};

export default Index;

Index.propTypes = {};
