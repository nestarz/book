import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import Cv from 'components/CurriculumVitae';
import { PageA4 } from '../styles/print';

const Wrapper = styled.div`
display: flex;
justify-content: center;
& > div {
  max-width: 24cm;
  .name {
    font-size: 160%;
  }
}
`;

export const CVPrint = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;  
    padding: 5mm;
    border-bottom: 1px solid black;
    font-size: 100%;
    @media print
    {   
    display: none;
    }
    button,a {
        background: none;
        color: inherit;
        border: none;
        padding: 0;
        text-decoration: underline;
        font: inherit;
        cursor: pointer;
        outline: inherit;
    }
`;

const Index = () => {
  var userLang = typeof navigator != "undefined" ? navigator.language || navigator.userLanguage : "fr";
  const [lg, setLanguage] = useState(userLang == "fr-FR" ? "fr" : "en");

  return (
    <>
      <PageA4 />
      <CVPrint>
        <Link to="/">{lg == "fr" ? 'Retour' : 'Back'}</Link>
        <button onClick={() => window.print()}>{lg == "fr" ? 'Imprimer CV' : 'Print CV'}</button>
        <button onClick={() => setLanguage(lg == "fr" ? "en" : "fr")}>
          En/Fr
        </button>
      </CVPrint>
      <Wrapper>
        <Cv lg={lg} />
      </Wrapper>
    </>
  )
};

export default Index;

Index.propTypes = {};