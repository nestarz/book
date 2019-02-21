import Layout from "components/Layout/Main";
import TwoColumns from "components/Layout/Template/TwoColumns";
import React from "react";
import styled from "styled-components";
import PosterInternal from "components/Content/Poster/Projects/Internal";
export const frontmatter = {
  title: "Posters Collection"
};

const Wrapper = styled(TwoColumns)`
`;

const Index = ({ location }) => {
  return (
    <Layout pathname={location.pathname} withNav={true}>
      <Wrapper>
        <div>
          <header>Collection</header>
        </div>
        <div>
          <div className="body">
            <PosterInternal />
          </div>
        </div>
      </Wrapper>
    </Layout>
  );
};

export default Index;
