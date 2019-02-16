import { graphql, StaticQuery } from "gatsby";
import React from "react";

const queryExperiments = graphql`
query {
  allJavascriptFrontmatter {
    edges {
      node {
        fields {
          slug
        }
        frontmatter {
          error
          path
          title
          written
          category
          description
          updated
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
      query={queryExperiments}
      render={data => {
        const projects = data.allJavascriptFrontmatter.edges.map((edge, i) => ({
          frontmatter: edge.node.frontmatter,
          excerpt: edge.node.excerpt,
          fields: edge.node.fields,
        }));
        return children(projects);
      }}
    />
  );
};
