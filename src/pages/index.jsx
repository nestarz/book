import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { ProjectListing, P5Wrapper, Layout } from 'components';
import theme from '../../config/theme';
import { files } from "../../content/sketches";
import styled from 'react-emotion';

const Wrapper = styled.div`
`;

const Index = ({
  data: {
    allMdx: { edges: projectEdges },
  },
}) => (
  <Layout theme={theme.light} absoluteNav={false} chart={false}>
    {/* <Wrapper>
      <P5Wrapper sketch={files['s002']} theme={theme} />
    </Wrapper> */}
    <ProjectListing projectEdges={projectEdges} />
  </Layout>
);

export default Index;

Index.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      edges: PropTypes.array.isRequired,
    }),
  }).isRequired,
};

export const pageQuery = graphql`
  query IndexQuery {
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          parent {
            ... on File {
              sourceInstanceName
              name
            }
          }
          frontmatter {
            service
            client
            title
            cover {
              childImageSharp {
                fluid(maxWidth: 850, quality: 90, traceSVG: { color: "#f3f3f3" }) {
                  ...GatsbyImageSharpFluid_tracedSVG
                }
              }
            }
          }
        }
      }
    }
  }
`;