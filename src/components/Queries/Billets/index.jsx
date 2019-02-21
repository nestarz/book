import ListTemplate from "components/Layout/List/Template";
import { graphql, StaticQuery } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

const ProjectList = ({ data, ...props }) => {
  const titleLocale = { fr: "Derniers Billets", en: "Latest Digests" };
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
      filter: { fields: { sourceInstanceName: { eq: "billets" } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            cover {
              childImageSharp {
                fluid(
                  maxWidth: 850
                  quality: 90
                  traceSVG: { color: "#f3f3f3" }
                ) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
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
