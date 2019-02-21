import { graphql, StaticQuery } from "gatsby";
import React from "react";

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

export default props => {
  const { children } = props;
  return (
    <StaticQuery
      query={queryProjects}
      render={data => {
        const projects = data.allMdx.edges.map((edge, i) => ({
          frontmatter: edge.node.frontmatter,
          parent: edge.node.parent,
          excerpt: edge.node.excerpt,
          fields: edge.node.fields,
        }));
        return children(projects);
      }}
    />
  );
};
