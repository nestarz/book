import DispositifPage from "components/Content/Portfolio/Projects/Dispositif";
import EegPage from "components/Content/Portfolio/Projects/Eeg";
import HelloPage from "components/Content/Portfolio/Projects/Hello";
import MindmapPage from "components/Content/Portfolio/Projects/Mindmap";
import NetartPage from "components/Content/Portfolio/Projects/Netart";
import RenderPage from "components/Content/Portfolio/Projects/Render";
import Layout from "components/Layout/Main";
import Pagination from "components/Layout/Pagination";
import PropTypes from "prop-types";
import React, { useState } from "react";
import styled from "styled-components";
import { PageA3_Paysage } from "styles/print";
import { useFullScreen } from "hooks/useFullScreen";

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
  font-size: 0.97222vw;
  display: flex;
  margin: 0 auto;
  flex: 1;
  align-items: center;
  & > button {
    @media print {
      display: none;
    }
  }
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  @media print {
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
      <PageA3_Paysage />
      <PaginationWrapper>
        <button onClick={() => setContinuousScroll(!continuousScroll)}>continuousScroll</button>
        <Pagination
          amountPerPage={continuousScroll ? 7 : 1}
          keysGoPrevious={[37, 38]}
          keysGoNext={[39, 40]}
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
