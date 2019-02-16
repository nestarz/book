import DispositifPage from "components/Experiments/Portfolio/Dispositif";
import EegPage from "components/Experiments/Portfolio/Eeg";
import HelloPage from "components/Experiments/Portfolio/Hello";
import MindmapPage from "components/Experiments/Portfolio/Mindmap";
import NetartPage from "components/Experiments/Portfolio/Netart";
import RenderPage from "components/Experiments/Portfolio/Render";
import Layout from "components/Layout";
import Pagination from "components/Pagination";
import Clock from "external/react-live-clock/src/Component";
import PropTypes from "prop-types";
import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { convertToTesserae, TesseraeFont } from "styles/fonts/Tesserae";
import { PageA3_Paysage } from "styles/print";

export const frontmatter = {
  title: "Portfolio A3",
  written: "2017-05-04",
  layoutType: "post",
  path: "sd-sdd-d3v4",
  category: "experiments",
  description: "Things about the choropleth.",
  updated: false
};

const PaginationWrapper = styled.div`
  font-size: 1vw;
  display: flex;
  width: 100%;
  margin: 0 auto;
  flex: 1;
  align-items: center;
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
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

const Index = ({ location }) => {
  const [continuousScroll, setContinuousScroll] = useState(false);
  return (
    <Layout pathname={location.pathname} withNav={true}>
      <TesseraeFont />
      <PageA3_Paysage />
      <PaginationWrapper>
        <Pagination
          amountPerPage={continuousScroll ? 7 : 1}
          keysGoPrevious={"left-arrow"}
          keysGoNext={"right-arrow"}
        >
          <HelloPage />
          <NetartPage />
          <RenderPage />
          <DispositifPage />
          <EegPage />
          <MindmapPage />
        </Pagination>
      </PaginationWrapper>
    </Layout>
  );
};

export default Index;

Index.propTypes = {
  location: PropTypes.object.isRequired
};
