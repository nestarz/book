import React, { useState, useEffect } from 'react';
import { useList, useVideo } from 'react-use';
import styled from "styled-components";
import { useFaceApi } from 'components/FaceDetection';
import { useWebcam } from 'components/Webcam';
import Suzanne from "../Suzanne";

const Wrapper = styled.div``;
const SourceWrapper = styled.div``;

const Index = ({ width, height, interval = 200 }) => {
    const [detections, setFaceApiInput] = useFaceApi(interval);
    const [sourceList, {sourceSet, sourcePush}] = useList();
    const [indexSource, setNextSource] = useState(-1);
    const [mainSource, setMainSource] = useState(null);
    const [camElt, camState, camControls, camRef] = useWebcam();
    const [videoElt, videoState, videoControls, videoRef] = useVideo(
        <video width={"100%"} height={"100%"} autoPlay loop>
            <source src="/assets/videos/evgeny_morozov.mp4"
                type="video/mp4"/>
        </video>
    );
    useEffect(() => {
        if(camState && camState.isPlaying) sourcePush([camElt, camState, camControls, camRef])
        if(videoState && videoState.isPlaying) sourcePush([videoElt, videoState, videoControls, videoRef])
        setNextSource(sourceList.length-1)
    }, [camState, videoState])
    useEffect(() => {
        setFaceApiInput(sourceList[indexSource % sourceList.length])
        setMainSource(sourceList[indexSource % sourceList.length])
    }, [indexSource]);
    console.log(camState, videoState)
    return (
        <Wrapper>
            <Suzanne width={width} height={height} lookAt={detections && detections.lookAt} />
            <SourceWrapper>{camElt}{videoElt}</SourceWrapper>
            <button onClick={() => setNextSource(index => index + 1)}></button>
        </Wrapper>
    )
};

export default Index;

Index.propTypes = {};
