import React from 'react';
import theme from '../../../../config/theme';
import styled from 'styled-components';
import Layout from 'components/Layout';

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
                <p>Basic Example. Copy Me.</p>
            </Wrapper>
        </Layout>
    )
};

export default Index;

Index.propTypes = {};
