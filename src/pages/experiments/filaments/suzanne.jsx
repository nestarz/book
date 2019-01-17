import React, { useRef, useState } from 'react';
import Layout from "components/Layout";
import Scene from "components/Filaments/Suzanne";

const Index = () => {
    return (
        <Layout>
            <Scene/>
        </Layout>
    )
};

export default Index;

Index.propTypes = {};
