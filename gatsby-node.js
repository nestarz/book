const _ = require('lodash');
const path = require('path');
const webpack = require(`webpack`);


const wrapper = promise => promise.then(result => ({ result, error: null })).catch(error => ({ error, result: null }))

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  let slug
  // Only use MDX nodes
  if (node.internal.type === 'Mdx') {
    const fileNode = getNode(node.parent)
    // If the frontmatter contains a "slug", use it
    if (
      Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, 'slug')
    ) {
      slug = `/${_.kebabCase(node.frontmatter.slug)}`
    }
    // Otherwise use the title for the slug
    if (
      Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, 'title')
    ) {
      slug = `/${_.kebabCase(node.frontmatter.title)}`
    }
    createNodeField({ node, name: 'slug', value: slug })
    // Adds the name of "gatsby-source-filesystem" as field (in this case "projects" or "pages")
    createNodeField({ node, name: 'sourceInstanceName', value: fileNode.sourceInstanceName })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const projectPage = require.resolve('./src/templates/project.jsx')
  const letterPage = require.resolve('./src/templates/letter.jsx')
  const singlePage = require.resolve('./src/templates/single.jsx')

  const { error, result } = await wrapper(
    graphql(`
      {
        projects: allMdx(filter: { fields: { sourceInstanceName: { eq: "projects" } } }) {
          edges {
            node {
              fields {
                slug
              }
              code {
                scope
              }
            }
          }
        }
        letters: allMdx(filter: { fields: { sourceInstanceName: { eq: "letters" } } }) {
          edges {
            node {
              fields {
                slug
              }
              code {
                scope
              }
            }
          }
        }
        single: allMdx(filter: { fields: { sourceInstanceName: { eq: "pages" } } }) {
          edges {
            node {
              fields {
                slug
              }
              code {
                scope
              }
            }
          }
        }
      }
    `)
  )

  if (!error) {
    result.data.projects.edges.forEach(edge => {
      createPage({
        path: edge.node.fields.slug,
        component: projectPage,
        context: {
          slug: edge.node.fields.slug,
        },
      })
    })
    result.data.letters.edges.forEach(edge => {
      createPage({
        path: edge.node.fields.slug,
        component: letterPage,
        context: {
          slug: edge.node.fields.slug,
        },
      })
    })
    result.data.single.edges.forEach(edge => {
      createPage({
        path: edge.node.fields.slug,
        component: singlePage,
        context: {
          slug: edge.node.fields.slug,
        },
      })
    })
    return
  }

  console.log(error)
}

// Necessary changes to get gatsby-mdx and Cypress working
exports.onCreateWebpackConfig = ({ stage, actions, loaders, getConfig }) => {
  const config = getConfig()

  config.module.rules = [
    ...config.module.rules.filter(rule => String(rule.test) !== String(/\.jsx?$/)),
    {
      ...loaders.js(),
      test: /\.jsx?$/,
      exclude: modulePath => /node_modules/.test(modulePath) && !/node_modules\/gatsby-mdx/.test(modulePath),
    },
  ]

  actions.replaceWebpackConfig(config)
}

/* Allow us to use something like: import { X } from 'directory' instead of '../../folder/directory' */
exports.onCreateWebpackConfig = ({ stage, getConfig, rules, loaders, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'src', 'styles'), 'node_modules'],
      alias: {
        videojs: 'video.js',
        WaveSurfer: 'wavesurfer.js',
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        videojs: path.resolve(__dirname, 'node_modules/video.js/dist/video.cjs.js'),
      })
    ]
  });
  actions.setWebpackConfig({ //csv-loader
    module: {
      rules: [
        {
          test: /\.csv$/,
          loader: 'csv-loader',
          options: {
            dynamicTyping: true,
            header: true,
            skipEmptyLines: true
          }
        }
      ]
    }
  });
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: path.resolve(__dirname, 'node_modules/p5/lib/p5.js'),
            use: 'null-loader',
          },
        ],
      },
    })
  }
};
