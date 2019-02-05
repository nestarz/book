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
import React from 'react';
import { convertToTesserae } from 'styles/fonts';
import { PageA3_Paysage } from 'styles/print';
import { GlobalStyle, Header, PaginationWrapper } from './styles';

export const frontmatter = {
  title: "Portfolio 2",
  written: "2017-05-04",
  layoutType: "post",
  path: "sd-sdd-d3v4",
  category: "experiments",
  description: "Things about the choropleth.",
  updated: false
}

const Index = ({ location }) => {
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
      </PrintHeader>
      <PaginationWrapper>
        <Pagination
          amountPerPage={1}
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
