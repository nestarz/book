import React from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "components/Layout";
import SEO from "components/SEO";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 1em;
  h1,
  h2,
  h3 {
    all: unset;
  }
`;

const Playlist = ({
  data: {
    mdx: postNode,
    site: { siteMetadata: siteConfig },
    graphbrainz: {
      lookup: {
        release
      }
    }
  },
  location
}) => {
  return (
    <Layout pathname={location.pathname} withNav={true} customSEO>
      <Helmet
        pathname={location.pathname}
        title={`${postNode.frontmatter.title} | ${siteConfig.siteTitle}`}
      />
      <SEO pathname={location.pathname} postNode={postNode} article />
      <Wrapper>
        {release.title}
      </Wrapper>
    </Layout>
  );
};

export default Playlist;

Playlist.propTypes = {
  data: PropTypes.shape({
    mdx: PropTypes.object.isRequired,
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        siteConfig: PropTypes.shape({
          siteTitle: PropTypes.string.isRequired
        }).isRequired
      }).isRequired
    }).isRequired
  }).isRequired,
  location: PropTypes.object.isRequired
};

export const pageQuery = graphql`
  query($slug: String!, $mbid: GraphBrainz_MBID!) {
    site {
      siteMetadata {
        siteConfig {
          siteTitle
        }
      }
    }
    graphbrainz {
      lookup {
        release(mbid: $mbid) {
          title
          date
          coverArtArchive {
            front
            back
          }
          artistCredits {
            name
          }
          recordings {
            edges {
              node {
                length
                title
              }
            }
          }
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
      }
    }
  }
`;
