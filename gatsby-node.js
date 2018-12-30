const path = require('path');
const _ = require('lodash');
const webpack = require(`webpack`);

const locales = require('./src/constants/locales')
exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions

  return new Promise(resolve => {
    deletePage(page)

    Object.keys(locales).map(lang => {
      const localizedPath = locales[lang].default
        ? page.path
        : locales[lang].path + page.path

      return createPage({
        ...page,
        path: localizedPath,
        context: {
          locale: lang
        }
      })
    })

    resolve()
  })
}
exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;
  let slug;
  if (node.internal.type === 'MarkdownRemark') {
    if (
      Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, 'slug')
    ) {
      slug = `/${_.kebabCase(node.frontmatter.slug)}`;
    }
    if (
      Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, 'title')
    ) {
      slug = `/${_.kebabCase(node.frontmatter.title)}`;
    }
    createNodeField({ node, name: 'slug', value: slug });
  }
};

/* Allow us to use something like: import { X } from 'directory' instead of '../../folder/directory' */
exports.onCreateWebpackConfig = ({ stage, getConfig, rules, loaders, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
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

const componentWithMDXScope = require("gatsby-mdx/component-with-mdx-scope");
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allMdx {
              edges {
                node {
                  id
                  parent {
                    ... on File {
                      name
                      sourceInstanceName
                    }
                  }
                  code {
                    scope
                  }
                }
              }
            }
            allFile(
              filter: { sourceInstanceName: { eq: "sketches" } }
              ) {
                edges {
                  node {
                    name
                    sourceInstanceName
                  }
                }
              }
          }
        `
      ).then(result => {
        if (result.errors) {
          //console.log(result.errors);
          reject(result.errors);
        }
        // Create blog posts pages.
        result.data.allMdx.edges.forEach(({ node }) => {
          createPage({
            path: `/${node.parent.sourceInstanceName}/${node.parent.name}`,
            component: componentWithMDXScope(
              path.resolve("src/templates/project.jsx"),
              node.code.scope
            ),
            context: { 
              id: node.id, 
              name: node.parent.name 
            }
          });
        });
        // Create sketch pages.
        // result.data.allFile.edges.forEach(({ node }) => {
        //   createPage({
        //     path: `/${node.sourceInstanceName}/${node.name}`,
        //     component: path.resolve(`src/templates/sketch.jsx`),
        //     context: {
        //       name: node.name,
        //     },
        //   })
        // })
      })
    );
  });
};
