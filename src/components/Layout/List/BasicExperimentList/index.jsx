import { graphql, Link, StaticQuery } from "gatsby";
import { useToggleGlobalLanguage } from 'hooks/useLanguage';
import PropTypes from "prop-types";
import React from "react";
import { Trail } from 'react-spring';

const BasicExperimentList = ({ data }) => {
  const [language, toggleLanguage] = useToggleGlobalLanguage()
  const edges = data.allJavascriptFrontmatter.edges;
  const titleLocale = {"fr": "Expériences", "en": "Experiments"}
  return <>
    <div className={"category"}>{titleLocale[language]}</div>
    <Trail
      items={edges}
      keys={edge => edge.node.fields.slug}
      from={{ opacity: '0' }}
      to={{ opacity: '1' }}
    >
      {(edge, index) => props => (
        <Link
          style={props}
          key={`${edge.node.fields.slug}-${index}`}
          to={edge.node.fields.slug}
          data-testid={`navItem-${index}`}
          activeClassName="nav-active"
        >
          {edge.node.frontmatter.title}
        </Link>
      )}
    </Trail>
  </>
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
    render={data => <BasicExperimentList data={data} {...props} />}
  />
)

BasicExperimentList.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      edges: PropTypes.array.isRequired,
    }),
  }).isRequired,
};
