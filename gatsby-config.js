require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
const config = require('./config/website')
const text = require('./config/text')

const pathPrefix = config.pathPrefix === '/' ? '' : config.pathPrefix

module.exports = {
  pathPrefix: config.pathPrefix,
  siteMetadata: {
    siteUrl: config.siteUrl + pathPrefix,
    siteConfig: config,
    authorInfo: config.authorInfo,
    authorCv: text,
  },
  plugins: [
    {
      resolve: 'gatsby-remark-toc',
      options: {
        mdastUtilTocOptions: {
          tight: true,
          heading: "",
          maxDepth: 2,
          orderedList: true
        },
        orderedList: true,
        reuseExistingHeader: true,
        header: 'Table des matières', // the custom header text
        include: [
          'content/**/*.md', // an include glob to match against
          'content/**/*.mdx' // an include glob to match against
        ]
      }
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'emotion-assets',
        path: `${__dirname}/src/components/Visual/EmotionalFace/assets`,
      },
    },
    {
      resolve: `gatsby-source-twitter`,
      options: {
        q: `ceramics`,
        credentials: {
          consumer_key: process.env.TWITTER_CONSUMER_KEY,
          consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
          bearer_token: process.env.TWITTER_BEARER_TOKEN
        },
        tweet_mode: 'extended'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'projects',
        path: `${__dirname}/content/projects`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'billets',
        path: `${__dirname}/content/billets`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'letters',
        path: `${__dirname}/content/letters`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `experiments`,
        path: `${__dirname}/src/files`
      },
    },
    {
      resolve: 'gatsby-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        defaultLayouts: {
          default: require.resolve('./src/components/Layout/index.jsx'),
        },
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {}
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 500,
              maxHeight: 500,
              quality: 90,
              linkImagesToOriginal: false,
              showCaptions: true,
              withWebp: {
                quality: 80
              }
            },
          },
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'nofollow noopener noreferrer',
            },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {},
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: config.googleAnalyticsID,
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    "gatsby-transformer-javascript-frontmatter",
    'gatsby-plugin-lodash',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: config.siteTitle,
        short_name: config.siteTitleShort,
        description: config.siteDescription,
        start_url: config.pathPrefix,
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: 'standalone',
        icons: [
          {
            src: '/favicons/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/favicons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-netlify',
  ],
}
