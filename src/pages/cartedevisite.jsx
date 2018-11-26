import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled from 'react-emotion';
//import { SketchComponent, Sketch1 } from '../components/P5js';
import theme from '../../config/theme';
import website from '../../config/website';
import LayoutWrapper from '../components/LayoutWrapper';
import Navigation from '../components/Navigation';
import { RotateOne as Scene3D } from '../components/Scenes3D';
import ContainerDimensions from 'react-container-dimensions'

const PagedMedia = styled.div`
@page {
  size: 85mm 55mm;
  margin: 0;

  @top-left-corner {
    content: "Page " counter(page);
  }
}
`;

const Index = ({
  data: {
    allMdx: { edges: projectEdges },
  },
}) => {
  return (
    <PagedMedia>
      <LayoutWrapper navType={"front"} layoutType={"main"} theme={theme.light} style={{padding: "30px"}}>
      Elias Rhouzlane
      Elias Rhouzlane
      Elias Rhouzlane
      Elias Rhouzlane
      Elias Rhouzlane
      Elias Rhouzlane
      Elias Rhouzlane
      Elias Rhouzlane
      Elias Rhouzlane
      </LayoutWrapper>
    </PagedMedia>
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
  query OkQuery {
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          parent {
            ... on File {
              sourceInstanceName
              name
            }
          }
          excerpt(pruneLength: 200)
          frontmatter {
            service
            date(formatString: "DD MMMM YYYY", locale: "en")
            client
            title
            cover {
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