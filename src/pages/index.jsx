import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

import theme from '../../config/theme';
import LayoutWrapper from '../components/LayoutWrapper';
import Listing from '../components/Listing';

const Index = ({
  data: {
    allMdx: { edges: projectEdges },
  },
}) => {
  return (
    <LayoutWrapper layoutType={"main"} theme={theme.light}>
      <Listing listingType={"main"} projectEdges={projectEdges} />
    </LayoutWrapper>
  )
};

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