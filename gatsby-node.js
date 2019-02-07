const path = require('path');
const webpack = require('webpack');
const { createFilePath } = require(`gatsby-source-filesystem`)
const wrapper = promise => promise.then(result => ({ result, error: null })).catch(error => ({ error, result: null }))

exports.onCreateWebpackConfig = ({actions}) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      alias: {
        WaveSurfer: 'wavesurfer.js',
        videojs: 'video.js',
        'window.videojs': 'video.js',
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
          videojs: 'video.js/dist/video.cjs.js'
      })
    ],
  });
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const fragments = require('./src/fragments/createPages')
  const { result } = await wrapper(graphql(fragments.pages))
  if (result.errors) throw result.errors
  const pages = [
    {
      component: require.resolve('./src/templates/project.jsx'),
      edges: result.data.projects.edges,
    },
    {
      component: require.resolve('./src/templates/letter.jsx'),
      edges: result.data.letters.edges,
    }
  ];
  pages.forEach(({component, edges}) =>
    edges.forEach((edge, index) => {
      const previous = index === edges.length - 1 ? null : edges[index + 1].node
      const next = index === 0 ? null : edges[index - 1].node
      createPage({
        path: edge.node.fields.slug,
        component: component,
        context: {
          slug: edge.node.fields.slug,
          previous,
          next,
        },
      })
    })
  )
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  switch(node.internal.type) {
    case `JavascriptFrontmatter`:
    case `Mdx`:
      createNodeField({
        name: `slug`,
        node,
        value: createFilePath({ node, getNode }),
      })
      const fileNode = getNode(node.parent)
      createNodeField({
        name: 'sourceInstanceName',
        node,
        value: fileNode.sourceInstanceName
      })
    default:
      null
  }
}
