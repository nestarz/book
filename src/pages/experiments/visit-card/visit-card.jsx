import VisitCard from "components/Content/Card";
import Layout from "components/Layout/Main";
import { useToggleGlobalLanguage } from "hooks/useLanguage";
import _ from "lodash";
import React, { useState } from "react";
import styled from "styled-components";

const ButtonWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  .button {
    border: 0;
    background-color: ${props => props.theme.brand.primary};
    color: white;
  }
`;
const VisitCardBg = styled(VisitCard)`
  .recto {
    .name {
      font-size: 100%;
    }
  }
`;
function Index({ location }) {
  const [language, toggleLanguage] = useToggleGlobalLanguage();
  const [cnt, setCount] = useState(Math.floor(Math.random(11)));
  const local = { fr: "Changer la version", en: "Change version" };
  return (
    <Layout pathname={location.pathname} withNav={true}>
      <ButtonWrapper onClick={() => setCount(cnt => cnt + 1)}>
        <VisitCardBg sketchIndex={cnt} />
        <VisitCardBg sketchIndex={cnt} />
        <VisitCardBg sketchIndex={cnt} />
        <VisitCardBg sketchIndex={cnt} />
        <VisitCardBg sketchIndex={cnt} />
        <VisitCardBg sketchIndex={cnt} />
        <VisitCardBg sketchIndex={cnt} />
        <VisitCardBg sketchIndex={cnt} />
      </ButtonWrapper>
    </Layout>
  );
}

export default Index;

Index.propTypes = {};

export const frontmatter = {
  title: "Carte de visite",
  written: "2017-05-04",
  layoutType: "post",
  path: "visitcard",
  category: "experiments",
  description: "Things about the choropleth.",
  updated: false
};
