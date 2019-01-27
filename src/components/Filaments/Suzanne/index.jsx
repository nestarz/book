import React, { useRef, useEffect, useState } from 'react';
import Filament from 'filament';
import Scene from './suzanne' // tweaked tutorial_triangle.js as shown above.
import styled from 'styled-components';

const Canvas = styled.canvas`
touch-action: none;
width: 100%;
height: 100%;
`;

const Index = ({ className, children, lookAt, width, height }) => {
    var assets;
    const canvasRef = useRef();
    const [scene, setScene] = useState(null);
    useEffect(() => {
        const assets_path = "/assets/filamat"
        const ibl_suffix = Filament.getSupportedFormatSuffix('etc s3tc');
        const albedo_suffix= Filament.getSupportedFormatSuffix('astc s3tc');
        const texture_suffix= Filament.getSupportedFormatSuffix('etc');
        const environ = 'syferfontein_18d_clear_2k';
    
        assets = { // need to know document so put in mount
            ibl_url: `${assets_path}/${environ}/${environ}_ibl${ibl_suffix}.ktx`,
            sky_small_url: `${assets_path}/${environ}/${environ}_skybox_tiny.ktx`,
            sky_large_url: `${assets_path}/${environ}/${environ}_skybox.ktx`,
            albedo_url: `${assets_path}/albedo${albedo_suffix}.ktx`,
            ao_url: `${assets_path}/ao${texture_suffix}.ktx`,
            metallic_url: `${assets_path}/metallic${texture_suffix}.ktx`,
            normal_url: `${assets_path}/normal${texture_suffix}.ktx`,
            roughness_url: `${assets_path}/roughness${texture_suffix}.ktx`,
            filamat_url: `${assets_path}/textured.filamat`,
            filamesh_url: `${assets_path}/suzanne.filamesh`,
        }
        Filament.init(Object.values(assets), () => {
            setScene(new Scene(canvasRef.current, assets, lookAt));
        })
    }, [])
    useEffect(() => {
        if (scene) {
            scene.lookAt = lookAt; 
        }
    }, [lookAt, scene]);
    useEffect(() => {
        if (scene) {
            scene.resize(width, height); 
        }
    }, [width, height, scene]);
    return <Canvas ref={canvasRef} className={className}/>
};

export default Index;