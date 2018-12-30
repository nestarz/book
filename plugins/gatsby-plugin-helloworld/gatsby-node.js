exports.onCreateNode = ({
    node, actions,
  }) => {
    const { createNodeField } = actions
    
    // Only get MarkdownRemark nodes
    if (node.internal.type !== `File`) {
        return
    } else {
        //console.log("Traitement du fichier:", node.internal.type);
    }
    createNodeField({
      node,
      name: 'fooField',
      value: 'Hello World'
    })
  }