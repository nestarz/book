import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import Layout from 'components/Layout';
import SEO from 'components/SEO';
import ProjectHeader from 'components/ProjectHeader';
import { PageProject } from 'print';

import config from '../../config/website';
import theme from '../../config/theme';

const Container = styled.section`
  max-width: 1120px;
  margin: auto;
  @media not print {
    padding: 0px 30px 60px 30px;
  }
  background-color: #fff;
  display: flex;
  flex-direction: column;
  page-break-before: always;
`

const MDXContent = styled.section`
  & > div > ol,
  & > div > p,
  & > div > ul {
    column-fill: balance;
    column-count: 2;
    column-gap: 10pt;
    orphans: 3;
    widows: 3;
  }

  .gatsby-resp-image-wrapper {
    margin-bottom: 20px !important;
    -webkit-column-break-inside: avoid; /* Chrome, Safari, Opera */
    page-break-inside: avoid; /* Firefox */
    break-inside: avoid; /* IE 10+ */
    break-inside: avoid-column; /* W3C */ 
    display: inline-block;
  }

  & > div div {
    page-break-inside: avoid;
  }
  & > div > h1 {
    display: block; 
    page-break-before: always;
  }

  & > div ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    li {
      margin: 0;
      margin-bottom: 0.0em;
      a {
        text-decoration: none;
        display: block;
        font-size: 120%;
        }
      a:hover {
        text-decoration: underline;
      }
    }
    li:last-child {
    }
  }
`;

const Project = ({ pageContext: { id }, data: { mdx: postNode } }) => {
  const project = postNode.frontmatter;
  return (
    <Layout theme={theme}>
      <PageProject />
      <Helmet title={`${project.title} | ${config.siteTitle}`} />
      <SEO postPath={id} postNode={postNode} postSEO />
      <ProjectHeader project={project} postNode={postNode} />
      <Container>
        <MDXContent>
          <MDXRenderer>
            {postNode.code.body}
          </MDXRenderer>
        </MDXContent>
      </Container>
    </Layout>
  );
};

export default Project

Project.propTypes = {
  pageContext: PropTypes.shape({
    slug: PropTypes.string.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    mdx: PropTypes.object.isRequired,
  }).isRequired,
}

export const pageQuery = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      code {
        body
      }
      excerpt(pruneLength: 60)
      fields {
        slug
      }
      tableOfContents
      frontmatter {
        title
        date(formatString: "DD.MM.YYYY")
        client
        subtitle
        service
        wip
        cover {
          childImageSharp {
            fluid(maxWidth: 850, maxHeight: 400, quality: 90, duotone: { highlight: "#3CD670", shadow: "#111111" }, cropFocus: CENTER) {
              ...GatsbyImageSharpFluid_withWebp
            }
            resize(width: 800) {
              src
            }
          }
        }
      }
    }
  }
`
