import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import { Trail } from 'react-spring'
import styled from 'styled-components'
import config from '../../../../config/website'

const Wrapper = styled.header`
    mix-blend-mode: multiply;
    flex-direction: column;
    display: flex;
    position: relative;
    z-index: 1000;
    a {
        color: ${props => props.theme.colors.black};
        text-decoration: none;
        transition: all 0.3s ease-in-out;
        z-index: 100;
        &:hover {
            color: ${props => props.theme.brand.primary};
        }
    }
    @media (max-width: ${props => props.theme.breakpoints.s}) {
        flex-wrap: wrap;
    }
`

const Nav = styled.nav`
  display: flex;
  flex: 1;
  justify-content: flex-start;
  padding: 0;
  flex-direction: column;
  a {
    &:hover:before {
        content: "↘ ";
    }
  }
`

const Navigation = () => (
    <StaticQuery
        query={query}
        render={data => (
            <Wrapper data-testid="projects-navigation">
                <Nav>
                    <Trail
                        items={data.nav.edges}
                        keys={project => project.node.fields.slug}
                        from={{ opacity: '0' }}
                        to={{ opacity: '1' }}>
                        {(project, index) => props => (
                            <Link
                                style={props}
                                key={project.node.fields.slug}
                                to={project.node.fields.slug}
                                data-testid={`navItem-${index}`}
                                activeClassName="nav-active"
                            >
                                {project.node.frontmatter.title}
                            </Link>
                        )}
                    </Trail>
                </Nav>
            </Wrapper>
        )}
    />
)

export default Navigation

const query = graphql`
  query NavProjectsLinks {
    nav: allMdx(filter: { fields: { sourceInstanceName: { eq: "projects" } } }) {
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
