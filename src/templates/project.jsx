import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import { ThemeProvider } from 'emotion-theming';
import SEO from '../components/SEO';
import sample from 'lodash/sample';
import Img from 'gatsby-image';
import config from '../../config/website';
import theme from '../../config/theme';
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import { MDXProvider } from '@mdx-js/tag'
import LayoutWrapper from '../components/LayoutWrapper/MainLayout';
import Navigation from '../components/Navigation/NavProjects';
import { Link } from 'gatsby';

//const overlayColor = sample(overlay);

const FlexHeader = styled.section`
flex-grow: 1;
padding: 30px 30px 0 30px;
`;

const Container = styled.section`
  & {
    font-size: 110%;
    letter-spacing: calc(-16 / 1000 * 1em);
  }
  a {
  text-decoration: none;
  color: ${props => props.theme.brand.primary};
  }
  h2:first-child + ul {
    column-span: all;
    margin-top: 10px;
    background-color: ${props => props.theme.colors.black};
    padding: 30px;
    margin-bottom: 30px;
    column-width: 350px;
column-fill: auto;
-webkit-perspective:1;
	-webkit-column-count: 2; /* Chrome, Safari, Opera */
	-moz-column-count:    2; /* Firefox */
	column-count:         2;
  	-webkit-column-gap:   30px; /* Chrome, Safari, Opera */ 
	-moz-column-gap:      30px; /* Firefox */
	column-gap:           30px;
	column-rule-color: #eee; /* Optional */
	column-rule-style:solid; /* Optional */
	column-rule-width: 0px; /* Optional */
    a {
      color: white;
    }
    ul {
      margin-left: 10px;
    }
  }
  ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  }
  li {
    margin: 0;
    margin-bottom: 2px;
  }
  li:last-child {
    margin-bottom:25px;
  }

  li a {
  text-decoration: none;
  color: ${props => props.theme.brand.primary};
  display: block;
  }
  li a:hover {
    text-decoration: underline;
  }
  h1 {
    column-span: all;
    font-size: 270%;
    color: ${props => props.theme.colors.black};
    margin-top: 20vh;
  }
  h1:nth-child(0),
  h1:nth-child(1),
  h1:nth-child(2),
  h1:nth-child(3),
  h1:nth-child(4){
    margin-top: 30px;
  }
  p {
    font-weight: 100;
  }
  h1,h2,h3,h4,h5,h6 {
    font-weight: 500;
  }
  h3 {
    font-size: 120%;
  }
iframe {
  max-width: 100%;
  max-height: 300px;
}
.gatsby-resp-image-wrapper {
  margin-bottom: 20px !important;
  -webkit-column-break-inside: avoid; /* Chrome, Safari, Opera */
  page-break-inside: avoid; /* Firefox */
  break-inside: avoid; /* IE 10+ */
  break-inside: avoid-column; /* W3C */ 
  display: inline-block;
}
background-color: white;
color: ${props => props.theme.colors.black};
max-width: 1120px;
margin-top: 0px;
padding: 30px;
column-width: 350px;
-webkit-perspective:1;
	-webkit-column-count: 3; /* Chrome, Safari, Opera */
	-moz-column-count:    3; /* Firefox */
	column-count:         3;
  	-webkit-column-gap:   30px; /* Chrome, Safari, Opera */ 
	-moz-column-gap:      30px; /* Firefox */
	column-gap:           30px;
	column-rule-color: #eee; /* Optional */
	column-rule-style:solid; /* Optional */
	column-rule-width: 0px; /* Optional */
  text-align: left; /* Optional */
  orphans: 3;
`;
const Wrapper = styled.section`
  text-align: left;
  position: relative;
  width: 100%;
  color: white;
  padding: 0;
  color: ${props => props.theme.colors.body_color};
  font-size: 1.5em;
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    font-size: 3.5vw;
  }
  h1 {
    font-size: 200%;
    margin-bottom: 0.5rem;
    font-weight: 500;
    letter-spacing: calc(-23 / 1000 * 1em);
  }
  p {
    font-size: 100%;
    font-weight: 500;
    letter-spacing: calc(-16 / 1000 * 1em);
  }
  display: flex;
  justify-content: space-between;
`;

const InformationWrapper = styled.div`
max-width: 1000px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem 0;
`;

const Top = styled.div`
  font-size: 80%;
  margin-bottom: 0.5rem;
  position: relative;
  text-transform: uppercase;
`;

const Bottom = styled.div`
  font-size: 125%;
`;

const ImageWrapper = styled.div`
flex-grow: 1;
display: flex;
flex-direction: column;
/* background-color: ${props => props.theme.brand.primary}; */
min-width: 20vw;
  > div { 
    margin: 0rem auto 0 auto;
    height: 100%;
    width: 100%;
    > div {
      position: static !important;
    }
  }
`;

const Project = ({ pageContext: { id }, data: { mdx: postNode } }) => {
  const project = postNode.frontmatter;
  return (
    <LayoutWrapper theme={theme.dark}>
      <Helmet title={`${project.title} | ${config.siteTitle}`} />
      <Helmet>
        <style type="text/css">{`
          body {
            background-color : ${theme.dark.colors.bg_color};
          }
    `}</style>
      </Helmet>
      <SEO postPath={id} postNode={postNode} postSEO />
      <Wrapper>
        <FlexHeader>
          <h1>{project.title}</h1>
          <p>{project.subtitle ? project.subtitle : postNode.excerpt}</p>
          <InformationWrapper>
            {project.client && 
            <InfoBlock>
              <Top>Where</Top>
              <Bottom>{project.client}</Bottom>
            </InfoBlock>
            }
            {project.date && 
            <InfoBlock>
              <Top>Date</Top>
              <Bottom>{project.date}</Bottom>
            </InfoBlock>
            }
            {project.service && 
            <InfoBlock>
              <Top>Service</Top>
              <Bottom>{project.service}</Bottom>
            </InfoBlock>
            }
          </InformationWrapper>
        </FlexHeader>
        <ImageWrapper>
          {project.cover && project.cover.childImageSharp.fluid && <Img fluid={project.cover.childImageSharp.fluid} />}
        </ImageWrapper>
      </Wrapper>
      <Navigation project={project}/>
      <Container>
        <MDXRenderer>
          {postNode.code.body}
        </MDXRenderer>
      </Container>
    </LayoutWrapper>
  );
};

export default Project;

Project.propTypes = {
  pageContext: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    mdx: PropTypes.object.isRequired,
  }).isRequired,
};

export const pageQuery = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      excerpt(pruneLength: 60)
      code {
        body
      }
      frontmatter {
        title
        date(formatString: "DD.MM.YYYY")
        client
        service
        subtitle
        cover {
          childImageSharp {
            resize(width: 800) {
              src
            }
            fluid(maxWidth: 850, maxHeight: 400, quality: 90, duotone: { highlight: "#3CD670", shadow: "#111111" }, cropFocus: CENTER) {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
      }
    }
  }
`;
