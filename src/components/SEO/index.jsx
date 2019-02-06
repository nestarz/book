import React from 'react'
import {Helmet} from 'react-helmet'
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'

const replaceTrailing = _path => _path.replace(/\/$/, ``)

const Head = props => {
  const { postNode, pathname, article, single, data } = props

  let title
  let description
  let image

  const { buildTime, siteMetadata } = data.site
  const { authorInfo, siteConfig } = siteMetadata
  const realPrefix = siteConfig.pathPrefix === '/' ? '' : siteConfig.pathPrefix
  const homeURL = `${siteConfig.siteUrl}${realPrefix}`
  const URL = `${siteConfig.siteUrl}${replaceTrailing(pathname) || realPrefix}`

  if (article || single) {
    const postMeta = postNode.frontmatter
    const postImage = postMeta.cover ? postMeta.cover.childImageSharp.resize.src : siteConfig.siteLogo
    title = `${postMeta.title} | ${siteConfig.siteTitle}`
    description = postNode.excerpt
    image = `${homeURL}${postImage}`
  } else {
    title = siteConfig.siteTitleAlt
    description = siteConfig.siteDescription
    image = `${homeURL}${siteConfig.siteLogo}`
  }

  // schema.org in JSONLD format
  // https://developers.google.com/search/docs/guides/intro-structured-data
  // You can fill out the 'author', 'creator' with more data or another type (e.g. 'Organization')

  const schemaOrgWebPage = {
    '@context': 'http://schema.org',
    '@type': 'WebPage',
    url: URL,
    headline: siteConfig.siteHeadline,
    inLanguage: 'en',
    mainEntityOfPage: URL,
    description: siteConfig.siteDescription,
    name: siteConfig.siteTitle,
    author: {
      '@type': 'Person',
      name: authorInfo.fullName,
    },
    copyrightHolder: {
      '@type': 'Person',
      name: authorInfo.fullName,
    },
    copyrightYear: '2018',
    creator: {
      '@type': 'Person',
      name: authorInfo.fullName,
    },
    publisher: {
      '@type': 'Person',
      name: authorInfo.fullName,
    },
    datePublished: '2019-01-07T10:30:00+01:00',
    dateModified: buildTime,
    image: {
      '@type': 'ImageObject',
      url: image,
    },
  }

  // Initial breadcrumb list

  const itemListElement = [
    {
      '@type': 'ListItem',
      item: {
        '@id': homeURL,
        name: 'Homepage',
      },
      position: 1,
    },
    {
      '@type': 'ListItem',
      item: {
        '@id': `${homeURL}/about`,
        name: 'About',
      },
      position: 2,
    },
  ]

  let schemaArticle = null

  if (article) {
    schemaArticle = {
      '@context': 'http://schema.org',
      '@type': 'Article',
      author: {
        '@type': 'Person',
        name: authorInfo.fullName,
      },
      copyrightHolder: {
        '@type': 'Person',
        name: authorInfo.fullName,
      },
      copyrightYear: postNode.parent.birthtime,
      creator: {
        '@type': 'Person',
        name: authorInfo.fullName,
      },
      publisher: {
        '@type': 'Organization',
        name: authorInfo.fullName,
        logo: {
          '@type': 'ImageObject',
          url: `${homeURL}${siteConfig.siteLogo}`,
        },
      },
      datePublished: postNode.parent.birthtime,
      dateModified: postNode.parent.mtime,
      description,
      headline: title,
      inLanguage: 'en',
      url: URL,
      name: title,
      image: {
        '@type': 'ImageObject',
        url: image,
      },
      mainEntityOfPage: URL,
    }
    // Push current blogpost into breadcrumb list
    itemListElement.push({
      '@type': 'ListItem',
      item: {
        '@id': URL,
        name: title,
      },
      position: 3,
    })
  }

  const breadcrumb = {
    '@context': 'http://schema.org',
    '@type': 'BreadcrumbList',
    description: 'Breadcrumbs list',
    name: 'Breadcrumbs',
    itemListElement,
  }

  return (
    <Helmet>
      <html lang={siteConfig.siteLanguage} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="image" content={image} />
      <link rel="apple-touch-icon" href="/favicons/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
      <link rel="shortcut icon" href="favicon.ico" />
      <meta name="msapplication-TileColor" content="#e3c05d" />
      <meta name="msapplication-config" content="browsersiteConfig.xml" />
      <meta property="og:locale" content={siteConfig.ogLanguage} />
      <meta property="og:site_name" content={siteConfig.ogSiteName ? siteConfig.ogSiteName : ''} />
      <meta property="og:url" content={URL} />
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={description} />
      <meta property="fb:app_id" content={siteConfig.siteFBAppID ? siteConfig.siteFBAppID : ''} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={siteConfig.userTwitter ? siteConfig.userTwitter : ''} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:url" content={URL} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={description} />
      {/* Insert schema.org data conditionally (webpage/article) + everytime (breadcrumbs) */}
      {!article && <script type="application/ld+json">{JSON.stringify(schemaOrgWebPage)}</script>}
      {article && <script type="application/ld+json">{JSON.stringify(schemaArticle)}</script>}
      <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
    </Helmet>
  )
}

const SEO = props => <StaticQuery query={querySEO} render={data => <Head {...props} data={data} />} />

export default SEO

Head.propTypes = {
  pathname: PropTypes.string.isRequired,
  data: PropTypes.any.isRequired,
  postNode: PropTypes.object,
  article: PropTypes.bool,
  single: PropTypes.bool,
}

Head.defaultProps = {
  postNode: null,
  article: false,
  single: false,
}

const querySEO = graphql`
  query SEO {
    site {
      buildTime(formatString: "YYYY-MM-DD")
      siteMetadata {
        authorInfo {
          fullName
        }
        siteConfig {
          siteUrl
          pathPrefix
          siteTitle
          siteTitleAlt
          siteDescription
          siteLogo
          siteHeadline
          siteLanguage
          ogLanguage
          ogSiteName
          # siteFBAppID
          userTwitter
        }
      }
    }
  }
`
