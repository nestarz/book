const supportedExtensions = {
    jpeg: true,
    jpg: true,
    png: true,
    webp: true,
    tif: true,
    tiff: true,
  }

module.exports = async function onCreateNode({ node, actions, createNodeId }) {
    const { createNode, createParentChildLink } = actions

    // Only get MarkdownRemark nodes
    if (node.internal.type !== `File`) {
        return
    } else {  
        // Only get Images
        if (!supportedExtensions[node.extension]) {
            return
        }    
    }

    const imageNode = {
        id: createNodeId(`${node.id} >> ImageDeepAi`),
        children: [],
        parent: node.id,
        internal: {
          contentDigest: `${node.internal.contentDigest}`,
          type: `ImageDeepAi`,
        },
      }

      createNode(imageNode)
      createParentChildLink({ parent: node, child: imageNode })
  }

