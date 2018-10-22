import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { ShareListing, Layout } from 'components';
import theme from '../../config/theme';

const Share = ({
  data: {
    allMdx: { edges: projectEdges },
  },
}) => (
  <Layout theme={theme.light} chart={false}>
    <ShareListing projectEdges={projectEdges} />
  </Layout>
);

export default Share;

Share.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      edges: PropTypes.array.isRequired,
    }),
  }).isRequired,
};

export const pageQuery = graphql`
  query ShareQuery {
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          parent {
            ... on File {
              name
              sourceInstanceName
            }
          }
          excerpt(pruneLength: 50)
          frontmatter {
            service
            date(formatString: "DD MMMM YYYY", locale: "en")
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
