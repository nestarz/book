import React from "react";
import Cv from "components/Content/CurriculumVitae";
import Layout from "components/Layout";

const Index = ({ location }) => {
  return (
    <Layout withNav={true} pathname={location.pathname}>
      <Cv withToggle={false} />
    </Layout>
  );
};

export default Index;

Index.propTypes = {};
