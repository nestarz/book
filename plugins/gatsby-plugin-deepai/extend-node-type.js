//https://github.com/jpavlicek/gatsby-transformer-sharp/blob/da60fba5c00600a70fd42bc20b2905b2c33550d4/extend-node-type.js
"use strict";
const path = require(`path`);
const fsExtra = require(`fs-extra`);

const { fixed } = require(`./fixed`);

const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLBoolean,
    GraphQLString,
  } = require(`gatsby/graphql`);

const fixedNodeType = ({
    type,
    pathPrefix,
    getNodeAndSavePathDependency,
    reporter,
    name
  }) => {
    return {
      type: new GraphQLObjectType({
        name: name,
        fields: {
          src: {
            type: GraphQLString
          },
          originalName: {
            type: GraphQLString
          }
        }
      }),
      resolve: (image, fieldArgs, context) => {
        const file = getNodeAndSavePathDependency(image.parent, context.path);
        const args = { ...fieldArgs,
          pathPrefix
        };
        return Promise.resolve(fixed({
          file,
          args,
          reporter
        })).then(o => Object.assign({}, o, {
          fieldArgs: args,
          image,
          file
        }));
      }
    };
  };
  
module.exports = ({
  type,
  pathPrefix,
  getNodeAndSavePathDependency,
  reporter
}) => {
  if (type.name !== `ImageDeepAi`) {
    return {};
  }

  const nodeOptions = {
    type,
    pathPrefix,
    getNodeAndSavePathDependency,
    reporter // TODO: Remove resolutionsNode and sizesNode for Gatsby v3

  };
  const fixedNode = fixedNodeType({
    name: `ImageDeepAiProcessed`,
    ...nodeOptions
  });
  return {
    fixed: fixedNode,
    original: {
      type: new GraphQLObjectType({
        name: `ImageDeepAiOriginal`,
        fields: {
          src: {
            type: GraphQLString
          }
        }
      }),
      args: {},

      async resolve(image, fieldArgs, context) {
        const details = getNodeAndSavePathDependency(image.parent, context.path);
        // const dimensions = imageSize.sync(toArray(fs.readFileSync(details.absolutePath)));
        const imageName = `${details.name}-${image.internal.contentDigest}${details.ext}`;
        const publicPath = path.join(process.cwd(), `public`, `static`, imageName);

        if (!fsExtra.existsSync(publicPath)) {
          fsExtra.copy(details.absolutePath, publicPath, err => {
            if (err) {
              console.error(`error copying file from ${details.absolutePath} to ${publicPath}`, err);
            }
          });
        }

        return {
          src: `${pathPrefix}/static/${imageName}`
        };
      }

    },
  };
};