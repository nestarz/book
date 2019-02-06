import React from 'react'
import {Helmet} from 'react-helmet'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from 'components/Layout'
import SEO from 'components/SEO';
import LetterComponent from 'components/Content/Letter'

const Letter = ({ data: { mdx: postNode, site: siteMetadata }, location }) => {
  return <Layout pathname={location.pathname} customSEO>
    <Helmet pathname={location.pathname} title={`${postNode.frontmatter.title} | ${siteMetadata.siteTitle}`} />
    <SEO pathname={location.pathname} postNode={postNode} article />
    <LetterComponent
      body={postNode.code.body}
      frontmatter={postNode.frontmatter}
    />
  </Layout>
}

export default Letter

Letter.propTypes = {
  data: PropTypes.shape({
    mdx: PropTypes.object.isRequired,
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        siteTitle: PropTypes.string.isRequired,
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
      parent {
        ... on File {
          mtime
          birthtime
        }
      }
      frontmatter {
        object
        title
        date(formatString: "DD.MM.YYYY")
        client
        service
        subtitle
        to {
            name
            address
            email
        }
        from {
            lieu
            date
        }
      }
    }
  }
`
