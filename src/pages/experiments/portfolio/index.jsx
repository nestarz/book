import ApiWorld from 'components/Experiments/Portfolio/ApiWorld';
import DispositifPage from 'components/Experiments/Portfolio/Dispositif';
import EegPage from 'components/Experiments/Portfolio/Eeg';
import HelloPage from 'components/Experiments/Portfolio/Hello';
import MindmapPage from 'components/Experiments/Portfolio/Mindmap';
import NetartPage from 'components/Experiments/Portfolio/Netart';
import RenderPage from 'components/Experiments/Portfolio/Render';
import Layout from "components/Layout";
import PrintHeader from 'components/Layout/Header/Print';
import Pagination from 'components/Pagination';
import Clock from 'external/react-live-clock/src/Component';
import PropTypes from "prop-types";
import React, { useState } from 'react';
import styled, { createGlobalStyle } from "styled-components";
import { convertToTesserae, LocalFonts } from 'styles/fonts';
import { PageA3_Paysage } from 'styles/print';

export const frontmatter = {
  title: "Portfolio A3",
  written: "2017-05-04",
  layoutType: "post",
  path: "sd-sdd-d3v4",
  category: "experiments",
  description: "Things about the choropleth.",
  updated: false
}

const PaginationWrapper = styled.div`
font-size: 0.8vw;
display: flex;
width: 100%;
margin: 0 auto;
flex: 1;
align-items: center;
ul {
  list-style-type: none;
  margin: 0;
  padding:0;
}
@media print {
  width: 42cm;
  height: 24cm;
  ul.page-numbers {
    display: none;
  }
  li {
    page-break-after: always;
  }
}
@media not print {
  ul.pagination-content {
    margin-top: 1em;
    margin-bottom: 1em;
  }
  ul.pagination-content > li:not(:last-child) {
    margin-bottom: 3em;
  }
  ul.page-numbers {
    color: #aaa;
    padding: 20px;
    font-size: 16px;
    li {
      cursor: pointer;
      padding: 1vw;
      &.active {
        font-weight: 600;
        color: ${props => props.theme.colors.body_color};
      }
    }
  }
}
`;

const GlobalStyle = createGlobalStyle`
  ${LocalFonts}
`
const Header = styled.div`
font-size: 0.5em;
align-self: center;
margin: 0;
display:flex;
flex-direction: column;
justify-content: center;
align-items: center;
@media print {
    display: none;
}
time:first-child {
    font-family: Tesserae;
    font-size:2em;
}
span {
  transform: scale(2,1);
}
@media (max-width: 1600px) {
    time:first-child {
        font-size: 1.5em;
    }
    span {
        font-size: 1em;
    }
}
`;

const Index = ({ location }) => {
  const [continuousScroll, setContinuousScroll] = useState(false);
  return (
    <Layout pathname={location.pathname}>
      <GlobalStyle />
      <PageA3_Paysage />
      <PrintHeader>
        <Header>
          <Clock
            format={'ss:SS'}
            ticking={true}
            timezone={'Europe/Paris'}
            interval={10}
            filter={(x) => convertToTesserae(x, "0123456789")}
          />
          <span>Portfolio</span>
        </Header>
        <button onClick={() => setContinuousScroll(!continuousScroll)}>Scrolling {continuousScroll ? "ON" : "OFF"}</button>
      </PrintHeader>
      <PaginationWrapper>
        <Pagination
          amountPerPage={continuousScroll ? 7 : 1}
          keysGoPrevious={'left-arrow'}
          keysGoNext={'right-arrow'}
          >
          <HelloPage />
          <ApiWorld />
          <NetartPage />
          <RenderPage />
          <DispositifPage />
          <EegPage />
          <MindmapPage />
        </Pagination>
      </PaginationWrapper>
    </Layout>
  )
};

export default Index;

Index.propTypes = {
  location: PropTypes.object.isRequired,
}
