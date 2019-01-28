import React from 'react';
import FaceDetection from 'components/FaceDetection';
import Suzanne from "components/Filaments/Suzanne";


const Index = ({ width, height }) => {
    return (
        <FaceDetection>
            <Suzanne width={width} height={height} />
        </FaceDetection>
    )
};

export default Index;

Index.propTypes = {};
