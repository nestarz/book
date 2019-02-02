import { graphql, Link, StaticQuery } from "gatsby";
import { useToggleGlobalLanguage } from 'hooks/useLanguage';
import PropTypes from "prop-types";
import React from "react";
import { Trail } from 'react-spring';

const BasicProjectList = ({ data }) => {
  const [language, toggleLanguage] = useToggleGlobalLanguage()
  const projectEdges = data.allMdx.edges;
  const titleLocale = { "fr": "Projets", "en": "Projects" }
  return <>
    <div className={"category"}>{titleLocale[language]}</div>
    <Trail
      items={projectEdges}
      keys={project => project.node.fields.slug}
      from={{ opacity: '0' }}
      to={{ opacity: '1' }}
    >
      {(project, index) => props => (
        <Link
          style={props}
          key={`${project.node.fields.slug}-${index}`}
          to={project.node.fields.slug}
          data-testid={`navItem-${index}`}
          activeClassName="nav-active"
        >
          {project.node.frontmatter.title}
        </Link>
      )}
    </Trail>
  </>
}

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
        frontmatter {
          title
        }
      }
    }
  }
}
`

export default props => (
  <StaticQuery
    query={queryProjects}
    render={data => <BasicProjectList data={data} {...props} />}
  />
)

BasicProjectList.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      edges: PropTypes.array.isRequired,
    }),
  }).isRequired,
};
