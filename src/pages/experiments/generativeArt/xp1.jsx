import React, { useRef, useState } from 'react';
import Layout from "components/Layout";
import ContainerDimensions from 'react-container-dimensions'
import { SketchComponent } from 'components/P5js';
import ArtSketch from "components/Recurrent/netart";


const Index = () => {
    return (
        <Layout>
            <ContainerDimensions>
                {parent => (
                    <SketchComponent
                        sketch={ArtSketch}
                        width={parent.width}
                        height={parent.height}
                        sketchProps={{ value: 10 }}
                    />
                )
                }
            </ContainerDimensions>
        </Layout>
    )
};

export default Index;

Index.propTypes = {};
