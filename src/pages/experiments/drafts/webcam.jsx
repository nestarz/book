import React from 'react';
import theme from '../../../../config/theme';
import styled from 'styled-components';
import Layout from 'components/Layout';
import Webcam from "react-webcam";

const Wrapper = styled.div`
display: flex;
flex-wrap: wrap;
flex-grow: 1;
justify-content: center;
align-items: center;
`;

const Index = ({ }) => {
    return (
        <Layout theme={theme}>
            <Wrapper>
                <Webcam />
            </Wrapper>
        </Layout>
    )
};

export default Index;

Index.propTypes = {};
