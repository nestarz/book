const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

module.exports = ({
  nodes,
  store,
  cache,
  createNode,
  createNodeId,
  _auth,
}) => {
  nodes.map(async node => {
    let fileNode
    // Ensures we are only processing Media Files
    // `wordpress__wp_media` is the media file type name for Wordpress
    console.log(node.__type);
    if (node.__type === `wordpress__wp_media`) {
      try {
        fileNode = await createRemoteFileNode({
          url: node.source_url,
          store,
          cache,
          createNode,
          createNodeId,
          auth: _auth,
        })
      } catch (e) {
        // Ignore
      }
    }

    // Adds a field `localFile` to the node
    // ___NODE appendix tells Gatsby that this field will link to another node
    if (fileNode) {
      node.localFile___NODE = fileNode.id
    }
  })
}