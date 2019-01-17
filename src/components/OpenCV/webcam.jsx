import React, { useState, useEffect, useRef } from 'react';
import { useGetSet } from 'react-use';
import Webcam from "react-webcam";

const Index = ({ startOpenCvProgram, canvasOutputRef, buttonToggleStopRef, webcamWidth }) => {
    let webcamRef = useRef();
    let [getToggleStop, setToggleStop] = useGetSet(false);
    let [cameraRunning, setCameraRunning] = useState(false);
    let [allReady, setAllReady] = useState(false);

    useEffect(() => {
        if (cameraRunning) {
            webcamRef.current.video.oncanplay = () => setAllReady(true);
            if (webcamRef.current.video.readyState > 3) setAllReady(true)
        }
    }, [cameraRunning])

    useEffect(() => {
        if (allReady) startOpenCvProgram(webcamRef.current.video, canvasOutputRef.current, getToggleStop);
    }, [allReady])

    useEffect(() => { // componentWillMount
        return () => { // componentWillUnmount
            setToggleStop(false)
        };
    }, []);

    if (buttonToggleStopRef.current) {
        console.log(buttonToggleStopRef.current)
        buttonToggleStopRef.current.onclick = () => setToggleStop(!getToggleStop())
    }

    return (
        <>
            <Webcam
                ref={webcamRef}
                onUserMedia={() => setCameraRunning(true)}
                onUserMediaError={() => setCameraRunning(false)}
                width={webcamWidth}
            />
        </>
    )
};

export default Index;

Index.propTypes = {};
