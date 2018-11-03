import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { SketchComponent, Sketch1 } from '../components/P5js';
import theme from '../../config/theme';
import LayoutWrapper from '../components/LayoutWrapper';
import Listing from '../components/Listing';

const StyledSketch = styled(SketchComponent)`
position: fixed;
top: 0;
bottom: 0;
pointer-events: none;
z-index: 1000;
mix-blend-mode: screen;
`;

const Index = ({
  data: {
    allMdx: { edges: projectEdges },
  },
}) => {
  return (
    <div>
    <LayoutWrapper navType={"front"} layoutType={"main"} theme={theme.light}>
      <Listing listingType={"main"} projectEdges={projectEdges} />
    </LayoutWrapper>
      <StyledSketch
      sketch={Sketch1}
      width={'100%'}
      height={'100vh'}
      sketchProps={{ value:10}}
  />
  </div>
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
              childImageDeepAi {
                id
                fixed {
                  src
                }
              }
              childImageSharp {
                fluid(
                    quality: 80
                ){
                    ...GatsbyImageSharpFluid
                }
            }
            }
          }
        }
      }
    }
  }
`;