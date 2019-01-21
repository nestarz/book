import React, { useRef, useEffect } from 'react';
import Filament from 'filament';
import TriangleScene from './triangle' // tweaked tutorial_triangle.js as shown above.
import styled from 'styled-components';
import { props } from 'bluebird';

const Canvas = styled.canvas`
touch-action: none;
width: 100%;
height: 100%;
`;

const Index = ({ className, children }) => {
    var scene;
    let canvasRef = useRef();
    let assets = ['/assets/filamat/triangle.filamat'];
    useEffect(() => Filament.init(assets, () => {
        scene = new TriangleScene(canvasRef.current, assets)
    }), [])
    return <Canvas ref={canvasRef} className={className}/>
};

export default Index;