import Clock from 'external/react-live-clock/src/Component';
import ApiWorld from 'components/Experiments/Portfolio/ApiWorld';
import HelloPage from 'components/Experiments/Portfolio/Hello';
import NetartPage from 'components/Experiments/Portfolio/Netart';
import Layout from "components/Layout";
import PrintHeader from 'components/Layout/Header/Print';
import PropTypes from "prop-types";
import React from 'react';
import styled, { createGlobalStyle } from "styled-components";
import { convertToTesserae, LocalFonts } from 'styles/fonts';
import { PageA3_Paysage } from 'styles/print';

const GlobalStyle = createGlobalStyle`
  ${LocalFonts}
`
const Header = styled.div`
font-size: 1vw;
align-self: center;
margin-top: 5vw;
display:flex;
flex-direction: column;
justify-content: center;
align-items: center;
@media print {
    display: none;
}
time:first-child {
    font-family: Tesserae;
    font-size:2vw;
}
span {
    transform: scale(2,1);
}
@media (max-width: 1600px) {
    time:first-child {
        font-size: 7vw;
    }
    span {
        transform: scale(2,1);
        font-size: 4vw;
    }
}
`;

const Wrapper = styled.div`
margin: 0;
padding: 0;
@media not print {
    background-color: grey;
    display: flex;
    flex-direction: column;
    padding-bottom: 5vw;
    background-color: grey;
}
`;

const Index = ({location}) => {
    return (
        <Layout pathname={location.pathname}>
            <GlobalStyle />
            <PageA3_Paysage />
            <Wrapper>
                <PrintHeader />
                <Header>
                <Clock
                        format={'SS:ss:HH:mm:ss:SS'}
                        ticking={true}
                        timezone={'Europe/Paris'}
                        interval={10}
                        filter={(x) => convertToTesserae(x, "0123456789")}
                    />
                <span>Portfolio</span>
                </Header>
                <HelloPage />
                <ApiWorld />
                <NetartPage />
                <RenderPage />
                <DispositifPage />
                <EegPage />
                <MindmapPage />
            </Wrapper>
        </Layout>
    )
};

export default Index;

Index.propTypes = {
  location: PropTypes.object.isRequired,
}

export const frontmatter = {
  title: "Portfolio",
  written: "2017-05-04",
  layoutType: "post",
  path: "sd-sdd-d3v4",
  category: "experiments",
  description: "Things about the choropleth.",
  updated: false
}
