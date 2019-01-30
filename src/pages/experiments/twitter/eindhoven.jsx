import React, { useRef } from 'react';
import ApiWorld from 'components/Portfolio/ApiWorld';
import useComponentSize from '@rehooks/component-size';
import styled from "styled-components";
import Layout from "components/Layout";

const Wrapper = styled.div`
height: 100vh;
width: 100vw;
max-height: 100vh;
max-width: 100vw;
`;

const Index = () => {
    let wrapperRef = useRef(null)
    let wrapperSize = useComponentSize(wrapperRef)
    return <Layout>
        <Wrapper ref={wrapperRef}>
            <ApiWorld
                width={wrapperSize.width}
                height={wrapperSize.height}
            />
        </Wrapper>
    </Layout>
};

export default Index;

Index.propTypes = {};
