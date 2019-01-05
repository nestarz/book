const config = require('./config/website');

const pathPrefix = config.pathPrefix === '/' ? '' : config.pathPrefix;

module.exports = {
  proxy: {
    prefix: "/api/deepdream",
    url: "https://api.deepai.org",
  },
  pathPrefix: config.pathPrefix,
  siteMetadata: {
    siteUrl: config.siteUrl + pathPrefix,
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-netlify-cms',
    {
      resolve: 'gatsby-plugin-emotion',
      options: {
        autoLabel: process.env.NODE_ENV !== 'production',
        labelFormat: '[filename]--[local]',
      },
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
        name: 'cover-letter',
        path: `${__dirname}/content/coverLetters`
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'sketches',
        path: `${__dirname}/content/sketches`,
        ignore: [`**/index.js`], // ignore files starting with a dot
      },
    },
    {
      resolve: 'gatsby-mdx',
      options: {
        extensions: [".mdx", ".md"],
        gatsbyRemarkPlugins: [
          {
            resolve: "gatsby-remark-attr",
            options: {
              allowDangerousDOMEventHandlers: true
            },
          },
          {
            resolve: 'gatsby-remark-toc',
            options: {
              mdastUtilTocOptions: {
                tight: true,
                heading: "zzzzzzzzzzzzz",
                maxDepth: 2
              },
              header: 'Table des matières', // the custom header text
              include: [
                'content/**/*.md', // an include glob to match against
                'content/**/*.mdx' // an include glob to match against
              ]
            }
          },  
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 820,
              quality: 80,
              linkImagesToOriginal: false,
              withWebp: true,
              wrapperStyle: "margin-bottom: 10rem"
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
            resolve: "gatsby-remark-embed-video",
            options: {
              width: 800,
              ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
              // height: 400, // Optional: Overrides optional.ratio
              related: false, //Optional: Will remove related videos from the end of an embedded YouTube video.
              noIframeBorder: true //Optional: Disable insertion of <style> border: 0
            }
          },
          // {
          //   resolve: "gatsby-remark-responsive-iframe",
          //   options: {}
          // },
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: config.googleAnalyticsID,
      },
    },
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: config.themeColor,
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-lodash',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography.jsx',
        omitGoogleFont: true
      },
    },
    'gatsby-plugin-catch-links',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: config.siteTitle,
        short_name: config.siteTitleAlt,
        description: config.siteDescription,
        start_url: config.pathPrefix,
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: 'standalone',
        icon: 'src/favicon.png',
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-netlify',
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [`gatsby-remark-smartypants`],
      },
    },
  ],
};
