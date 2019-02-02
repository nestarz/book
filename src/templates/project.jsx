import React from 'react'
import {Helmet} from 'react-helmet'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from 'components/Layout'
import SEO from 'components/SEO';
import ProjectComponent from 'components/Content/Project'

const Project = ({ data: { mdx: postNode, site: {siteMetadata: siteConfig} }, location  }) => {
  return (
    <Layout pathname={location.pathname} customSEO>
      <Helmet pathname={location.pathname} title={`${postNode.frontmatter.title} | ${siteConfig.siteTitle}`} />
      <SEO pathname={location.pathname} postNode={postNode} article />
      <ProjectComponent
        frontmatter={postNode.frontmatter}
        tableOfContents={postNode.tableOfContents}
        body={postNode.code.body}
        birthtime={postNode.parent.birthtime}
        birthtimeTimeStamp={postNode.parent.birthtimeTimeStamp}
        mtime={postNode.parent.mtime}
        excerpt={postNode.excerpt}
        />
    </Layout>
  );
};

export default Project

Project.propTypes = {
  data: PropTypes.shape({
    mdx: PropTypes.object.isRequired,
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        siteConfig: PropTypes.shape({
          siteTitle: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  location: PropTypes.object.isRequired,
}

export const pageQuery = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        siteConfig {
          siteTitle
        }
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      code {
        body
      }
      excerpt(pruneLength: 70)
      fields {
        slug
      }
      parent {
        ... on File {
          mtime(formatString: "DD.MM.YYYY")
          birthtimeTimeStamp: birthtime
          birthtime(formatString: "DD.MM.YYYY")
        }
      }
      tableOfContents
      frontmatter {
        title
        date(formatString: "DD.MM.YYYY")
        client
        subtitle
        service
      }
    }
  }
`
