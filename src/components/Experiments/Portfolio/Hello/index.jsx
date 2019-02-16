import VisitCard from "components/Content/VisitCard";
import { useToggleGlobalLanguage } from "hooks/useLanguage";
import React from "react";
import styled from "styled-components";
import { PageA3_Paysage } from "styles/print";
import PortfolioWrapper from "../";

const StyledVisitCard = styled(VisitCard)`
  grid-column: auto / span 5 !important;
  .verso,
  .recto {
    mix-blend-mode: normal;
    overflow: hidden;
    width: 100%;
    height: 100%;
    font-size: 1.5em;
    padding: 0;
  }
  .verso {
    display: none;
  }
  .name {
    font-size: 1.5em;
    width: 70%;
  }
  .cv_contact {
    font-size: 1em;
    a {
      margin-right: 1em;
    }
  }
`;

const LocalWrapper = styled(PortfolioWrapper)`
`;

const Index = () => {
  const [language, toggleLanguage] = useToggleGlobalLanguage();
  return (
    <LocalWrapper>
      <PageA3_Paysage />
      <StyledVisitCard mode={Math.floor(Math.random() * 4)} />
    </LocalWrapper>
  );
};

export default Index;

Index.propTypes = {};
