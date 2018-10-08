import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import { ThemeProvider } from 'emotion-theming';
import { Container, SEO, Layout } from 'components';
import sample from 'lodash/sample';
import Img from 'gatsby-image';
import config from '../../config/website';
import theme from '../../config/theme';

//const overlayColor = sample(overlay);

const Wrapper = styled.section`
  text-align: center;
  position: relative;
  width: 100%;
  color: white;
  padding: 0rem ${props => props.theme.spacer.horizontal};
  margin-bottom: 5rem;
  color: ${props => props.theme.colors.body_color};
  h1 {
    font-size: 300%;
    margin-bottom: 0.5rem;
  }
  p {
    font-size: 200%;
    font-weight: 500;
    letter-spacing: calc(-16 / 1000 * 1em);
  }
`;

const InformationWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem ${props => props.theme.spacer.horizontal} 0
    ${props => props.theme.spacer.horizontal};
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
  > div { 
    margin: 5rem 6rem 0 6rem;
    > div {
      position: static !important;
    }
  }
`;

const Project = ({ pageContext: { slug }, data: { markdownRemark: postNode } }) => {
  const project = postNode.frontmatter;
  return (
    <Layout theme={theme.dark}>
      <Helmet title={`${project.title} | ${config.siteTitle}`} />
      <Helmet>
      <style type="text/css">{`
          body {
            background-color : ${theme.dark.colors.bg_color};
          }
    `}</style>
    </Helmet>
      <SEO postPath={slug} postNode={postNode} postSEO />
      <Wrapper>
        <h1>{project.title}</h1>
        <p>{postNode.excerpt}</p>
        <ImageWrapper>
          {project.cover.childImageSharp.fluid && <Img fluid={project.cover.childImageSharp.fluid} />}
        </ImageWrapper>
        <InformationWrapper>
          <InfoBlock>
            <Top>Where</Top>
            <Bottom>{project.client}</Bottom>
          </InfoBlock>
          <InfoBlock>
            <Top>Date</Top>
            <Bottom>{project.date}</Bottom>
          </InfoBlock>
          <InfoBlock>
            <Top>Service</Top>
            <Bottom>{project.service}</Bottom>
          </InfoBlock>
        </InformationWrapper>
      </Wrapper>
      <Container type="text">
        <div dangerouslySetInnerHTML={{ __html: postNode.html }} />
      </Container>
    </Layout>
  );
};

export default Project;

Project.propTypes = {
  pageContext: PropTypes.shape({
    slug: PropTypes.string.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    markdownRemark: PropTypes.object.isRequired,
  }).isRequired,
};

export const pageQuery = graphql`
  query ProjectPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      frontmatter {
        title
        date(formatString: "DD.MM.YYYY")
        client
        service
        cover {
          childImageSharp {
            resize(width: 800) {
              src
            }
            fluid(maxWidth: 850, maxHeight: 400, quality: 90, traceSVG: { color: "#f3f3f3" }, cropFocus: CENTER) {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
      }
      fields {
        slug
      }
    }
  }
`;
