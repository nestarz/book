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
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors);
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
      })
    );
  });
};

// exports.createPages = ({ graphql, actions }) => {
//   const { createPage } = actions;

//   return new Promise((resolve, reject) => {
//     const projectPage = path.resolve('src/templates/project.jsx');
//     resolve(
//       graphql(`
//         {
//           projects: allMarkdownRemark {
//             edges {
//               node {
//                 fields {
//                   slug
//                 }
//               }
//             }
//           }
//         }
//       `).then(result => {
//         if (result.errors) {
//           /* eslint no-console: "off" */
//           console.log(result.errors);
//           reject(result.errors);
//         }

//         result.data.projects.edges.forEach(edge => {
//           createPage({
//             path: edge.node.fields.slug,
//             component: projectPage,
//             context: {
//               slug: edge.node.fields.slug,
//             },
//           });
//         });
//       })
//     );
//   });
// };

/* Allow us to use something like: import { X } from 'directory' instead of '../../folder/directory' */
exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  });
};
