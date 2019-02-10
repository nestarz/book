import React from 'react';
import Cv from 'components/Content/CurriculumVitae';
import Layout from 'components/Layout'
import PrintHeader from 'components/Layout/Header/Print'

const Index = ({location}) => {
  return <Layout pathname={location.pathname}>
    <Cv withToggle={false} />
  </Layout>
};

export default Index;

Index.propTypes = {};
