import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { ProjectListing, Layout } from 'components';
import theme from '../../config/theme';

const Index = ({
  data: {
    allMdx: { edges: projectEdges },
  },
}) => (
  <Layout theme={theme.light} chart={false}>
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