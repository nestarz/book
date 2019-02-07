import { graphql, Link, StaticQuery } from "gatsby";
import { useToggleGlobalLanguage } from 'hooks/useLanguage';
import PropTypes from "prop-types";
import React from "react";
import { useTrail, animated } from 'react-spring'
const config = { mass: 5, tension: 2000, friction: 200 }

const BasicProjectList = ({ data }) => {
  const [language, toggleLanguage] = useToggleGlobalLanguage()
  const edges = data.allMdx.edges;
  const titleLocale = { "fr": "Projets", "en": "Projects" }
  const trail = useTrail(edges.length, {
    config,
    opacity: 1,
    x: 0,
    height: "auto",
    from: { opacity: 0, x: 30, height: 0 },
  })
  return <>
    <div className={"category"}>{titleLocale[language]}</div>
    {trail.map(({ x, height, ...rest }, index) => (
      <animated.div
        key={index}
        className="trails-text"
        style={{ ...rest, transform: x.interpolate(x => `translate3d(0,${x}px,0)`) }}>
        <animated.div style={{ height }}>
          <Link
            style={rest.style}
            key={`${edges[index].node.fields.slug}-${index}`}
            to={edges[index].node.fields.slug}
            data-testid={`navItem-${index}`}
            activeClassName="nav-active"
          >
            {edges[index].node.frontmatter.title}
          </Link>
        </animated.div>
      </animated.div>
    ))}
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
