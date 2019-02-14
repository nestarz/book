import ListTemplate from "components/Layout/List/Template";
import { graphql, StaticQuery } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

const ProjectList = ({ data, ...props }) => {
  const titleLocale = { fr: "Derniers Projets", en: "Latest Projects" };
  return (
    <ListTemplate
      {...props}
      edges={data.allMdx.edges}
      titleLocale={titleLocale}
    />
  );
};

const queryProjects = graphql`
  query {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { sourceInstanceName: { eq: "projects" } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          parent {
            ... on File {
              mtime(formatString: "DD.MM.YYYY")
              birthtimeTimeStamp: birthtime
              birthtime(formatString: "DD.MM.YYYY")
            }
          }
          excerpt(pruneLength: 70)
          frontmatter {
            title
            cover {
              childImageSharp {
                fluid(
                  maxWidth: 450
                  quality: 60
                  duotone: { shadow: "#000000", highlight: "#FFFFFF" }
                ) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default props => (
  <StaticQuery
    query={queryProjects}
    render={data => <ProjectList data={data} {...props} />}
  />
);

ProjectList.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      edges: PropTypes.array.isRequired
    })
  }).isRequired
};
