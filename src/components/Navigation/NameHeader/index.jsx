import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import { FaInstagram, FaBehance, FaDribbble } from 'react-icons/fa'
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
`

const Name = styled.div`
  display: flex;
  flex: 1 0 auto;
  justify-content: flex-start;
  a {
    font-size: 4vmax;
    line-height: normal;
    font-weight: 500;
    color: ${props => props.theme.brand.primary};
    &:hover,
    &:focus {
      color: ${props => props.theme.colors.body_color};
      text-decoration: none;
    }
  }
  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    margin-bottom: 0.75rem;
  }
`

const SocialMedia = styled.div`
  display: flex;
  flex: 1 0 auto;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 0;
  margin-top: 1rem;
  @media print {
    display: none;
  }
  a {
    padding-right: 0.5rem;
    margin-right: 0.25rem;
    font-size: 1.25rem;
    line-height: 20px;
    margin-bottom: 1rem;
  }
`

const Navigation = () => (
  <StaticQuery
    query={query}
    render={data => (
      <Wrapper data-testid="navigation">
        <Name>
          <Link to="/" data-testid="home-title-link">
            {config.siteTitle}, {config.siteDescription}
          </Link>
        </Name>
        <SocialMedia>
          <a href={config.github} target="_blank" rel="noopener noreferrer" aria-label="Github">
            Github
          </a>
          <a
            href={config.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            Instagram
          </a>
          <a href={config.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            Twitter
          </a>
          <a href={config.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Linkedin">
            Linkedin
          </a>
          <Link to="/cv" data-testid="cv-link">
            Contact/CV
          </Link>
        </SocialMedia>
      </Wrapper>
    )}
  />
)

export default Navigation

const query = graphql`
  query NavNameLinks {
    nav: allMdx(filter: { fields: { sourceInstanceName: { eq: "pages" } } }) {
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
