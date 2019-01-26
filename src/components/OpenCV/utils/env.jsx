import React, { useState, useEffect, useRef, createContext } from 'react';

const Index = () => {
    let [isOpencvReady, setOpencvReady] = useState(false)
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "/assets/js/cv-wasm.js";
        script.async = true;
        script.onload = () => {
            //console.log(cv)
            try {
                let mat = new cv.Mat();
                mat.delete();
                setOpencvReady(true)
            } catch (error) {
                //console.log("Load OpenCV with onRuntimeInitialized")
                cv['onRuntimeInitialized'] = () => {
                    let mat = new cv.Mat();
                    //mat.delete();
                    setOpencvReady(true)
                    //console.log("Check OpenCV Initialized (mat.size()=", mat.size(), ")");
                };
            }
        }
        document.body.appendChild(script);
        //console.log("opencv appended !");
    }, []);

    return (
        <>
        </>
    )
};

export default Index;

Index.propTypes = {};
