const path = require('path');
const _ = require('lodash');

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
    },
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