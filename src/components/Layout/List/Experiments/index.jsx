import { graphql, StaticQuery } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import ListTemplate from 'components/Layout/List/Template';

const ExperimentList = ({ data, ...props }) => {
  const titleLocale = { "fr": "Expériences", "en": "Experiments" }
  return <ListTemplate
    {...props}
    edges={data.allJavascriptFrontmatter.edges}
    titleLocale={titleLocale} />
}

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
`

export default props => (
  <StaticQuery
    query={queryExperiments}
    render={data => <ExperimentList data={data} {...props} />}
  />
)

ExperimentList.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      edges: PropTypes.array.isRequired,
    }),
  }).isRequired,
};
