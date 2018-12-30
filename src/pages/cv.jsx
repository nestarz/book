import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import CV from '../components/CV';


const Index = ({
  data: {
    allMdx: { edges: projectEdges },
  },
}) => {
  return (
    <CV />
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