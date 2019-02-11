import React, { useState } from 'react';
import { useToggleGlobalLanguage } from 'hooks/useLanguage';
import VisitCard from 'components/Content/VisitCard';
import Layout from 'components/Layout';
import PrintHeader from 'components/Layout/Header/Print'
import styled from 'styled-components';
import _ from 'lodash';

const Wrapper = styled.div`
    @media not print{
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100vw;
        flex-wrap: wrap;
        & > div {
            margin: 5mm;
            & > div {
                border: 1px solid black;
                margin: 5mm;
            }
        }
    }
`;


function Index({ location }) {
  const [language, toggleLanguage] = useToggleGlobalLanguage()
  const [cnt, setCount] = useState(0);
  const local = {"fr": "Changer la version", "en": "Change version"}
  return <Layout pathname={location.pathname} withNav={true}>
    <Wrapper>
      {_.times(3, i => <VisitCard key={i} sketchIndex={cnt} />)}
    </Wrapper>
  </Layout>
};

export default Index;

Index.propTypes = {};

export const frontmatter = {
  title: "Visit card",
  written: "2017-05-04",
  layoutType: "post",
  path: "VisitCardd",
  category: "experiments",
  description: "Things about the choropleth.",
  updated: false
}
